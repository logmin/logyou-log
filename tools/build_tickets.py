"""公式サイトの公演詳細からチケット受付（抽選・先着）を集めて groups/<id>/tickets.js を作る。

使い方（毎日の自動更新から呼ぶ）:
  python "C:/Users/S19122/live-log/tools/build_tickets.py"

流れ:
  1. groups.js / 各 schedule.js を読む（tickets.js の ev は schedule.js の id）
  2. 公式スケジュール一覧（今月〜5ヶ月先）→ 公演詳細を開き、本文のチケットURLと
     本文に書かれた受付期間（例「8/24(月)12:00～受付開始（※抽選販売）〜8/30(日)23:59」）を拾う
  3. チケットサイトを開いて受付ごとの名前・期間・状態を拾う
       ぴあ(w.pia.jp/t.pia.jp) / tiget / e+ は解析する。
       それ以外（チケットビレッジ等。403で弾くサイトもある）は URL だけ載せる。
       ブロックされたサイトを回避する工夫（UA偽装の強化・別経路での取得）はしない。
  4. 前回の tickets.js とマージして書き出す
       取得に失敗したURLの受付は前回分をそのまま残す（一時的な失敗で消えないように）。

方針: 書かれていない日時は推測しない（空文字のまま）。年が省略された日付だけは
公演日から補う（公演月より後の月なら前年）。
"""
import datetime
import html
import json
import os
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = 'Mozilla/5.0'
NOW = datetime.datetime.now()
TODAY = NOW.date()
MONTHS_AHEAD = 5
LOG = []


def log(*a):
    LOG.append(' '.join(str(x) for x in a))


_last = [0.0]


def fetch(url):
    """本文テキストを返す。失敗したら None。
    連続アクセスは間を空ける（ぴあは短い間隔だと 429 を返すので長め）。429 は少し待って2回まで再試行。"""
    gap = 4.0 if 'pia.jp' in url else 1.0
    for attempt in range(3):
        wait = gap - (time.time() - _last[0])
        if wait > 0:
            time.sleep(wait)
        _last[0] = time.time()
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'ja'})
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                b = r.read()
                cs = r.headers.get_content_charset() or 'utf-8'
                return b.decode(cs, errors='replace')
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 2:
                time.sleep(20 * (attempt + 1))
                continue
            log('HTTP', e.code, url)
        except Exception as e:  # noqa: BLE001 - 通信系の失敗はすべて「取れなかった」扱い
            log('ERR', type(e).__name__, url)
        return None
    return None


def text_lines(s):
    s = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', s, flags=re.S)
    s = re.sub(r'<br\s*/?>|</p>|</div>|</dt>|</dd>|</li>|</h\d>|</span>', '\n', s)
    t = unicodedata.normalize('NFKC', html.unescape(re.sub(r'<[^>]+>', '', s)))
    lines = [re.sub(r'\s+', ' ', l).strip() for l in t.split('\n')]
    return [l for l in lines if l]


def norm(s):
    s = unicodedata.normalize('NFKC', s or '').lower()
    return re.sub(r'[^\w]', '', s)


def nfkc(s):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', s or '')).strip()


# ---------- 入力 ----------

def load_groups():
    s = open(os.path.join(ROOT, 'groups.js'), encoding='utf-8').read()
    out = []
    for b in re.findall(r'\{[^{}]*\}', s):
        gid = re.search(r"id\s*:\s*'([^']+)'", b)
        ns = re.search(r"ns\s*:\s*'([^']+)'", b)
        site = re.search(r"site\s*:\s*'([^']+)'", b)
        if gid and ns and site:
            out.append({'id': gid.group(1), 'ns': ns.group(1), 'site': site.group(1).rstrip('/')})
    return out


def load_schedule(g):
    s = open(os.path.join(ROOT, 'groups', g['id'], 'schedule.js'), encoding='utf-8').read()
    evs = []
    for m in re.finditer(r'\{\s*id:"([^"]+)",\s*date:"([^"]+)",\s*type:"([^"]+)",\s*title:"((?:[^"\\]|\\.)*)"', s):
        evs.append({'id': m.group(1), 'date': m.group(2), 'type': m.group(3), 'title': m.group(4)})
    return evs


def tickets_path(g):
    return os.path.join(ROOT, 'groups', g['id'], 'tickets.js')


def load_prev(g):
    p = tickets_path(g)
    if not os.path.exists(p):
        return []
    s = open(p, encoding='utf-8').read()
    m = re.search(r'window\.%s_TICKETS\s*=\s*(\[.*?\]);' % g['ns'], s, re.S)
    if not m:
        return []
    try:
        return json.loads(m.group(1))
    except ValueError:
        log('WARN 前回の tickets.js を読めなかった', g['id'])
        return []


# ---------- 公式サイト ----------

def month_list():
    y, m = TODAY.year, TODAY.month
    for _ in range(MONTHS_AHEAD + 1):
        yield y, m
        m += 1
        if m > 12:
            y, m = y + 1, 1


def official_events(g):
    """一覧ページから今日以降の公演詳細 [{path,date,title}] を返す。"""
    out = []
    for y, m in month_list():
        url = '%s/live_information/schedule/list/?viewMode=default&year=%d&month=%02d' % (g['site'], y, m)
        s = fetch(url)
        if s is None:
            continue
        for b in re.split(r'(?=<a href="/live_information/detail/\d+")', s)[1:]:
            path = re.match(r'<a href="(/live_information/detail/\d+)"', b).group(1)
            b = b[:b.find('</a>')] if '</a>' in b else b
            mo = re.search(r'block--date__month[^>]*>\s*(\d+)', b)
            da = re.search(r'block--date__date[^>]*>\s*(\d+)', b)
            ti = re.search(r'<p class="tit[^"]*">\s*(.*?)\s*</p>', b, re.S)
            if not (mo and da and ti):
                continue
            raw = ti.group(1).split('&#x1F4CD;')[0]  # toitoitoi は📍以降に会場が付く
            mm, dd = int(mo.group(1)), int(da.group(1))
            yy = y + 1 if mm < m - 6 else y
            try:
                d = datetime.date(yy, mm, dd)
            except ValueError:
                continue
            if d < TODAY:
                continue
            out.append({'path': path, 'date': d.isoformat(), 'title': html.unescape(re.sub(r'<[^>]+>', '', raw)).strip()})
    seen, uniq = set(), []
    for e in out:
        if e['path'] not in seen:
            seen.add(e['path'])
            uniq.append(e)
    return uniq


def match_event(oe, sched):
    """公式の公演を schedule.js の id に突合する。同日複数で決めきれなければ None。"""
    same = [e for e in sched if e['date'] == oe['date']]
    if not same:
        return None
    t = norm(oe['title'])
    exact = [e for e in same if norm(e['title']) == t]
    if len(exact) == 1:
        return exact[0]['id']
    part = [e for e in same if t and (t in norm(e['title']) or norm(e['title']) in t)]
    if len(part) == 1:
        return part[0]['id']
    # 公式一覧は「タイトル@会場…」のように後ろに付け足しがあるので、先頭一致の長さでも見る
    def pre(a, b):
        n = 0
        while n < min(len(a), len(b)) and a[n] == b[n]:
            n += 1
        return n
    sc = sorted(((pre(t, norm(e['title'])), e['id']) for e in same), reverse=True)
    if sc[0][0] >= 8 and (len(sc) == 1 or sc[1][0] < sc[0][0]):
        return sc[0][1]
    lives = [e for e in same if e['type'] == 'LIVE']
    if len(same) == 1 or len(lives) == 1 and len(same) == 2 and 'birthday' in norm(''.join(e['title'] for e in same)):
        return (lives or same)[0]['id']
    return None


TICKET_HOSTS = ('pia.jp', 'eplus.jp', 'tiget.net', 'ticketvillage.jp', 'l-tike.com', 'livepocket.jp',
                'zaiko.io', 'ticket.rakuten', 'ticketdive.com', 'teket.jp', 'confetti-web.com',
                'peatix.com', 'eventim', 'cnplayguide.com', 'tixplus.jp', 'ticketbook')

SITE_NAMES = [('pia.jp', 'ぴあ'), ('eplus.jp', 'e+'), ('tiget.net', 'tiget'), ('ticketvillage.jp', 'チケットビレッジ'),
              ('l-tike.com', 'ローチケ'), ('livepocket.jp', 'LivePocket'), ('zaiko.io', 'ZAIKO'),
              ('ticketdive.com', 'TicketDive'), ('teket.jp', 'teket'), ('confetti-web.com', 'カンフェティ'),
              ('peatix.com', 'Peatix'), ('tixplus.jp', 'tixplus'), ('cnplayguide.com', 'CNプレイガイド')]


def site_name(url):
    for h, n in SITE_NAMES:
        if h in url:
            return n
    return re.sub(r'^https?://(www\.)?', '', url).split('/')[0]


def detail_info(g, path):
    """公演詳細の本文から (公演日, チケットURL群, 本文行) を返す。"""
    s = fetch(g['site'] + path)
    if s is None:
        return None
    m = re.search(r'<main.*?</main>', s, re.S)
    body = m.group(0) if m else s
    lines = text_lines(body)
    urls = []
    for u in re.findall(r'https?://[^\s"\'<>）)」、]+', html.unescape(re.sub(r'<[^>]+>', ' ', body)) + ' ' + ' '.join(re.findall(r'href="([^"]+)"', body))):
        u = u.rstrip('.,;')
        if any(h in u for h in TICKET_HOSTS) and u not in urls:
            urls.append(u)
    return {'lines': lines, 'urls': urls}


# 「昼12:00」「正午」のような書き方もある（正午は読み込み時に 12:00 へ置き換える）
TM = r'(?:昼|夜|朝|午前|午後)?\s*(\d{1,2}:\d{2})?'
DT_MD = r'(?<![\d/])(\d{1,2})/(\d{1,2})\s*(?:\([^)]{1,4}\))?\s*' + TM


def ymd(ev_date, mo, da):
    ey, em = int(ev_date[:4]), int(ev_date[5:7])
    y = ey - 1 if int(mo) > em + 1 else ey
    return '%04d-%02d-%02d' % (y, int(mo), int(da))


def dt(date, hm):
    if not hm:
        return date
    h, mi = hm.split(':')
    return '%sT%02d:%s' % (date, int(h), mi)


def how_of(name):
    n = nfkc(name)
    if re.search(r'先着|一般発売|一般販売|当日', n):
        return 'first'
    if re.search(r'抽選|先行|プレリク|プレオーダー|最速', n):
        return 'lottery'
    return ''


def official_periods(lines, ev_date):
    """本文に書かれた「先行予約:10/2(金) 12:00 ~ 10/7(水) 23:59」形式の受付期間を拾う。
    「8/24(月)12:00～受付開始（※抽選販売）」の次の行が「〜8/30(日)23:59」のように
    2行に割れている書き方もあるので、次の行が〜で始まるときはつなげて読む。"""
    out = []
    lines = [l.replace('正午', '12:00') for l in lines]
    for i, l in enumerate(lines):
        if re.match(r'\s*[~〜～]', l):
            continue  # 前の行とつなげて読んだ
        nxt = lines[i + 1] if i + 1 < len(lines) else ''
        cur = l + ' ' + nxt if re.match(r'\s*[~〜～]', nxt) else l
        m = re.search(DT_MD + r'\s*[~〜～][^\d~〜～]{0,20}?[~〜～]?\s*' + DT_MD, cur)
        if not m:
            continue
        near = cur + ' ' + nxt
        if not re.search(r'受付|抽選|先着|販売|発売|申込|予約|先行|期間', ' '.join(lines[max(0, i - 2):i + 2])):
            continue
        label = re.sub(r'[^\w]', '', nfkc(cur[:m.start()]))
        if label in ('', '期間', '受付期間', '販売期間'):
            label = ''
        how = how_of(label) or ('lottery' if '抽選' in near else ('first' if '先着' in near else ''))
        name = label or '公式告知の受付' + ('（抽選）' if how == 'lottery' else '')
        out.append({'name': name, 'how': how,
                    'from': dt(ymd(ev_date, m.group(1), m.group(2)), m.group(3)),
                    'to': dt(ymd(ev_date, m.group(4), m.group(5)), m.group(6))})
    return out


# ---------- チケットサイト ----------

def norm_status(text):
    t = nfkc(text)
    if re.search(r'終了|完売|締切|停止|SOLD|結果', t):  # 「抽選結果発表前」= 受付は終わっている
        return 'closed'
    if re.search(r'前|予定|近日', t) and not re.search(r'予定枚数', t):
        return 'soon'
    if re.search(r'中|受付|販売|支払|購入|申込|申し込', t):
        return 'open'
    return ''


def parse_pia(url, ev_date):
    s = fetch(url)
    if s is None:
        return None
    sales, seen = [], set()
    for c in re.split(r'<li class="ticketSalesList-2024__item', s)[1:]:
        name = re.search(r'<meta content="([^"]+)" itemprop="name">', c)
        if not name:
            continue
        sd = re.search(r'itemprop="startDate" datetime="(\d{4}-\d{2}-\d{2})', c)
        if sd and sd.group(1) != ev_date:
            continue
        nm = nfkc(html.unescape(name.group(1)))
        if nm in seen:
            continue
        seen.add(nm)
        st = re.search(r'ticketSalesCard-2024__status[^"]*">(.*?)</p>', c, re.S)
        st_lines = text_lines(st.group(1)) if st else []
        link = re.search(r'<a href="(https://t\.pia\.jp/[^"]+)"', c)
        sale = {'name': nm, 'how': how_of(nm), 'url': html.unescape(link.group(1)) if link else url,
                'from': '', 'to': '', 'announce': '', 'statusText': st_lines[0] if st_lines else ''}
        # 「抽選結果発表前 ～ 10/24 18:00」の日時は締切ではなく発表日なので使わない
        end = None if re.search(r'結果|発表', ' '.join(st_lines)) else re.search(r'(\d{4})/(\d{1,2})/(\d{1,2})\s*\([^)]*\)\s*(?:昼|夜|朝|午前|午後)?\s*(\d{1,2}:\d{2})', ' '.join(st_lines[1:]))
        if end:
            sale['to'] = dt('%s-%02d-%02d' % (end.group(1), int(end.group(2)), int(end.group(3))), end.group(4))
        if link:
            pia_detail(sale)
        sales.append(sale)
    return sales


def pia_detail(sale):
    s = fetch(sale['url'])
    if s is None:
        return
    lines = text_lines(s.replace('正午', '12:00'))
    D = r'(\d{4})/(\d{1,2})/(\d{1,2})\s*\([^)]*\)\s*(?:昼|夜|朝|午前|午後)?\s*(\d{1,2}:\d{2})'
    for i, l in enumerate(lines[:200]):
        ctx = ' '.join(lines[i:i + 2])
        if l in ('受付期間', '発売開始', '販売期間') or l.startswith('受付期間'):
            ds = re.findall(D, ctx)
            # 詳細ページの受付期間が一番確か。カード側の値より優先する
            if ds and l != '発売開始' and len(ds) > 1:
                sale['from'] = dt('%s-%02d-%02d' % (ds[0][0], int(ds[0][1]), int(ds[0][2])), ds[0][3])
                sale['to'] = dt('%s-%02d-%02d' % (ds[1][0], int(ds[1][1]), int(ds[1][2])), ds[1][3])
            elif ds and not sale['from']:
                sale['from'] = dt('%s-%02d-%02d' % (ds[0][0], int(ds[0][1]), int(ds[0][2])), ds[0][3])
            if len(ds) > 1 and not sale['to']:
                sale['to'] = dt('%s-%02d-%02d' % (ds[1][0], int(ds[1][1]), int(ds[1][2])), ds[1][3])
        if re.match(r'(抽選)?結果(発表|確認|通知)', l) and not sale['announce']:
            ds = re.findall(D, ctx)
            if ds:
                sale['announce'] = dt('%s-%02d-%02d' % (ds[0][0], int(ds[0][1]), int(ds[0][2])), ds[0][3])


def parse_tiget(url, ev_date):
    s = fetch(url)
    if s is None:
        return None
    sales = []
    for c in re.split(r'<div class="c-ordering-btn ', s)[1:]:
        name = re.search(r"c-ordering-ticket-name'>(.*?)</span>", c, re.S)
        if not name:
            continue
        nm = nfkc(html.unescape(name.group(1)))
        dd = re.search(r"c-ordering-ticket-date'>\s*(\d{4})年(\d{1,2})月(\d{1,2})日", c)
        if dd and '%s-%02d-%02d' % (dd.group(1), int(dd.group(2)), int(dd.group(3))) != ev_date:
            continue
        st = re.search(r'c-ordering-btn__btn">(.*?)</span>', c, re.S)
        price = re.search(r'c-ordering-ticket-price">(.*?)</span>', c, re.S)
        per = re.search(r'purchase-period__value">\s*:?\s*(\d{4})\.(\d{2})\.(\d{2})\s+(\d{1,2}:\d{2})\s*~\s*(\d{4})\.(\d{2})\.(\d{2})\s+(\d{1,2}:\d{2})', c)
        sale = {'name': nm, 'how': how_of(nm), 'url': url, 'from': '', 'to': '', 'announce': '',
                'statusText': nfkc(re.sub(r'<[^>]+>', '', st.group(1))) if st else '',
                'price': nfkc(re.sub(r'<[^>]+>', '', price.group(1))) if price else ''}
        if per:
            p = per.groups()
            sale['from'] = dt('%s-%s-%s' % p[0:3], p[3])
            sale['to'] = dt('%s-%s-%s' % p[4:7], p[7])
        if c.startswith('is-available'):
            sale['statusText'] = sale['statusText'] or '受付中'
            sale['_open'] = True
        elif 'is-closed' in c[:60]:
            sale['_closed'] = True
        sales.append(sale)
    return sales


def parse_eplus(url, ev_date, ev_title):
    """e+ の主催者ページ（多数の公演が並ぶ）から、公演日と名前が合う販売だけ拾う。"""
    s = fetch(url)
    if s is None:
        return None
    sales = []
    t = norm(ev_title)
    for c in re.split(r'<a class="ticket-item', s)[1:]:
        j = re.search(r'<script type="application/ld\+json">(.*?)</script>', c, re.S)
        lab = re.search(r'<span class="label-ticket">(.*?)</span>', c)
        if not j:
            continue
        try:
            d = json.loads(j.group(1))
        except ValueError:
            continue
        if not str(d.get('startDate', '')).startswith(ev_date):
            continue
        nm = nfkc(d.get('name', ''))
        base = norm(nm.split('／')[0])
        if not (base and (base in t or t in base)):
            continue
        part = nm.split('／', 1)[1] if '／' in nm else nm
        label = nfkc(lab.group(1)) if lab else ''
        sales.append({'name': part, 'how': 'first' if '先着' in label else ('lottery' if '抽選' in label else how_of(part)),
                      'url': d.get('url') or url, 'from': '', 'to': '', 'announce': '', 'statusText': label})
    for sale in sales:
        eplus_detail(sale)
    return sales


def eplus_detail(sale):
    s = fetch(sale['url'])
    if s is None:
        return
    lines = text_lines(s.replace('正午', '12:00'))
    D = r'(\d{4})/(\d{1,2})/(\d{1,2})\s*\([^)]*\)\s*(?:昼|夜|朝|午前|午後)?\s*(\d{1,2}:\d{2})'
    for i, l in enumerate(lines):
        if re.match(r'(受付期間|販売期間|発売日|申込期間)', l):
            ds = re.findall(D, ' '.join(lines[i:i + 3]))
            if ds:
                sale['from'] = sale['from'] or dt('%s-%02d-%02d' % (ds[0][0], int(ds[0][1]), int(ds[0][2])), ds[0][3])
                if len(ds) > 1:
                    sale['to'] = sale['to'] or dt('%s-%02d-%02d' % (ds[1][0], int(ds[1][1]), int(ds[1][2])), ds[1][3])
            break


# ---------- 組み立て ----------

def final_status(sale):
    now = NOW.strftime('%Y-%m-%dT%H:%M')
    if sale['to'] and sale['to'] < now:
        return 'closed'
    if sale.get('_closed'):
        return 'closed'
    st = norm_status(sale.get('statusText', ''))
    if st == 'closed':
        return 'closed'
    if sale['from'] and sale['from'] > now:
        return 'soon'
    if sale.get('_open') or (sale['from'] and sale['to'] and sale['from'] <= now <= sale['to']):
        return 'open'
    return st


def sale_id(ev, url, name):
    host = site_name(url)
    return '%s|%s|%s' % (ev, norm(host), norm(name)[:60])


def build_group(g):
    sched = load_schedule(g)
    prev = load_prev(g)
    out, failed_urls, done_ev = [], set(), set()
    for oe in official_events(g):
        ev = match_event(oe, sched)
        if not ev:
            log('SKIP 突合できず', g['id'], oe['date'], oe['title'])
            continue
        info = detail_info(g, oe['path'])
        if info is None:
            failed_urls.add('ev:' + ev)
            continue
        done_ev.add(ev)
        title = next(e['title'] for e in sched if e['id'] == ev)
        periods = official_periods(info['lines'], oe['date'])
        for url in info['urls']:
            sales = None
            if 'pia.jp' in url:
                sales = parse_pia(url, oe['date'])
            elif 'tiget.net' in url:
                sales = parse_tiget(url, oe['date'])
            elif 'eplus.jp' in url:
                sales = parse_eplus(url, oe['date'], title)
            elif any(h in url for h in TICKET_HOSTS):
                sales = []  # 解析しないサイトは URL だけ
            if sales is None:
                failed_urls.add(url)
                continue
            # 同日の別公演（生誕祭2本など）が同じ販売ページを共有していることがあるので、
            # 受付名に別公演の名前が入っていて自分の名前が入っていないものは除く
            own = norm(title)[:3]
            sibs = [norm(e['title'])[:3] for e in sched if e['date'] == oe['date'] and e['id'] != ev and e['type'] == 'LIVE']
            sales = [x for x in sales if own in norm(x['name']) or not any(k and k in norm(x['name']) for k in sibs)]
            # 本文の受付期間は、期間が空の抽選に入れる（無ければ別行として足す）
            for p in periods:
                tgt = next((x for x in sales if not x['from'] and not x['to'] and (not p['how'] or x['how'] == p['how'])), None)
                if tgt:
                    tgt['from'], tgt['to'] = p['from'], p['to']
                    tgt['how'] = tgt['how'] or p['how']
                elif not any(x['from'] == p['from'] and x['to'] == p['to'] for x in sales):
                    sales.append({'name': p['name'], 'how': p['how'],
                                  'url': url, 'from': p['from'], 'to': p['to'], 'announce': '', 'statusText': ''})
            periods = []
            if not sales:
                sales = [{'name': 'チケット', 'how': '', 'url': url, 'from': '', 'to': '', 'announce': '', 'statusText': ''}]
            for x in sales:
                rec = {'id': sale_id(ev, url, x['name']), 'ev': ev, 'name': x['name'], 'how': x['how'],
                       'site': site_name(url), 'url': x['url'], 'from': x['from'], 'to': x['to'],
                       'announce': x.get('announce', ''), 'status': final_status(x),
                       'statusText': x.get('statusText', ''), 'price': x.get('price', '')}
                if not any(r['id'] == rec['id'] for r in out):
                    out.append(rec)
    # 取得失敗分は前回の内容を残す
    for r in prev:
        keep = (('ev:' + r['ev']) in failed_urls) or any(r['url'].startswith(u) or u in r['url'] for u in failed_urls if not u.startswith('ev:'))
        if keep and r['ev'] not in [o['ev'] for o in out if o['url'] == r['url']] and not any(o['id'] == r['id'] for o in out):
            out.append(r)
    ev_date = {e['id']: e['date'] for e in sched}
    out.sort(key=lambda r: (ev_date.get(r['ev'], ''), r['ev'], r['site'], r['from'] or '9', r['name']))
    return out


def write_group(g, rows):
    p = tickets_path(g)
    head = ('/* %s チケット受付（自動生成: tools/build_tickets.py。手で書き換えない）\n'
            '   出典: 公式サイトの公演詳細に載っているチケットURL → 各チケットサイトの受付情報。\n'
            '   ev は schedule.js の id。from/to/announce は "YYYY-MM-DDTHH:MM"（不明は空文字。推測しない）。\n'
            '   how: lottery=抽選 / first=先着 / ""=不明。status: open / soon / closed / ""=不明（statusText はサイトの表記そのまま）。\n'
            '   id は受付ごとに固定（アプリ側のチェック状態がこれに紐づく）。\n'
            '*/\n') % g['id']
    body = ',\n'.join('  ' + json.dumps(r, ensure_ascii=False) for r in rows)
    new = '%swindow.%s_TICKETS_UPDATED = "%s";\nwindow.%s_TICKETS = [\n%s\n];\n' % (
        head, g['ns'], TODAY.isoformat(), g['ns'], body)
    old = open(p, encoding='utf-8').read() if os.path.exists(p) else ''
    # 日付以外に変化が無ければ書き換えない（無駄コミットを出さない）
    strip = lambda s: re.sub(r'_TICKETS_UPDATED = "[^"]*"', '', s)
    if strip(old) == strip(new):
        return False
    open(p, 'w', encoding='utf-8', newline='\n').write(new)
    return True


def main():
    report = []
    for g in load_groups():
        rows = build_group(g)
        changed = write_group(g, rows)
        report.append('%s: %d件 (open %d / soon %d) %s' % (
            g['id'], len(rows), sum(r['status'] == 'open' for r in rows), sum(r['status'] == 'soon' for r in rows),
            '更新' if changed else '変更なし'))
    out = os.path.join(ROOT, 'tools', 'last_run.txt')
    open(out, 'w', encoding='utf-8').write('\n'.join(report + [''] + LOG) + '\n')
    sys.stdout.write('done. see tools/last_run.txt\n')


if __name__ == '__main__':
    main()
