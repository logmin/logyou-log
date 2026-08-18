/* log you 公式スケジュール（公式サイトより取得）
   出典: https://logyou.asobisystem.com/live_information/schedule/list/ 各公演の詳細ページ
   更新方法: この配列を書き換えるだけ。id は「YYYY-MM-DD-N」（同日内の通し番号）で固定。
   type: LIVE / TV / RADIO / OTHER（特典会・お渡し会などは OTHER）
   ※参加率の計算は type:"LIVE" のみが対象。会場は公式詳細ページの記載に基づく。
*/
window.LOGYOU_SCHEDULE_UPDATED = "2026-08-17";
window.LOGYOU_SCHEDULE = [
  // ===== 2025-11（デビュー） =====
  { id:"2025-11-15-1", date:"2025-11-15", type:"LIVE",  title:"PEAK SPOT JOIN Vol.1（デビュー公演）", venue:"恵比寿LIQUIDROOM" },

  // ===== 2025-12 =====
  { id:"2025-12-09-1", date:"2025-12-09", type:"LIVE",  title:"MARQUEE祭 Vol.166", venue:"Spotify O-EAST" },
  { id:"2025-12-10-1", date:"2025-12-10", type:"LIVE",  title:"TOKYO GIRLS GIRLS", venue:"品川ステラボール" },
  { id:"2025-12-12-1", date:"2025-12-12", type:"RADIO", title:"ybsラジオ『髭男爵 山田ルイ53世のキックス』", venue:"" },
  { id:"2025-12-13-1", date:"2025-12-13", type:"TV",    title:"1DAY PASS めざせ満点サポーター（さとふる編）", venue:"" },
  { id:"2025-12-15-1", date:"2025-12-15", type:"LIVE",  title:"うるトラすフェスタ vol.40", venue:"SHIBUYA CLUB QUATTRO" },
  { id:"2025-12-17-1", date:"2025-12-17", type:"LIVE",  title:"HYPE IDOL！年末大感謝無銭Special", venue:"有楽町ヒューリックホール" },
  { id:"2025-12-18-1", date:"2025-12-18", type:"LIVE",  title:"ふぉにコレ!vol.2 X'mas Special", venue:"豊洲PIT" },
  { id:"2025-12-21-1", date:"2025-12-21", type:"LIVE",  title:"PEAK SPOT JOIN Vol.2 -Xmas SP-", venue:"白金高輪SELENE b2" },
  { id:"2025-12-21-2", date:"2025-12-21", type:"LIVE",  title:"ONE AND ONLY Vol.28", venue:"白金高輪SELENE b2" },
  { id:"2025-12-24-1", date:"2025-12-24", type:"LIVE",  title:"Appare!クリスマス2025", venue:"品川インターシティホール" },
  { id:"2025-12-26-1", date:"2025-12-26", type:"OTHER", title:"2ショットチャット会", venue:"オンライン" },
  { id:"2025-12-28-1", date:"2025-12-28", type:"LIVE",  title:"LEADING PREMIUM 年末感謝祭'25", venue:"duo MUSIC EXCHANGE（渋谷）" },
  { id:"2025-12-29-1", date:"2025-12-29", type:"TV",    title:"1DAY PASS めざせ満点サポーター", venue:"" },

  // ===== 2026-01 =====
  { id:"2026-01-05-1", date:"2026-01-05", type:"LIVE",  title:"PEAK SPOT JOIN Vol.3", venue:"Spotify O-WEST" },
  { id:"2026-01-07-1", date:"2026-01-07", type:"LIVE",  title:"フクフェス番外編", venue:"Spotify O-WEST" },
  { id:"2026-01-11-1", date:"2026-01-11", type:"LIVE",  title:"sound stock Vol.6", venue:"Spotify O-Crest" },
  { id:"2026-01-12-1", date:"2026-01-12", type:"OTHER", title:"VDC Magazine 037 お渡し会&サイン会", venue:"タワーレコード錦糸町パルコ店" },
  { id:"2026-01-15-1", date:"2026-01-15", type:"LIVE",  title:"MARQUEE祭 vol.168", venue:"Spotify O-WEST" },
  { id:"2026-01-17-1", date:"2026-01-17", type:"OTHER", title:"振袖2ショットチャット会", venue:"オンライン" },
  { id:"2026-01-17-2", date:"2026-01-17", type:"OTHER", title:"振袖オンライン特典会", venue:"オンライン" },
  { id:"2026-01-18-1", date:"2026-01-18", type:"LIVE",  title:"ッスッゴイライブ", venue:"品川インターシティホール" },
  { id:"2026-01-20-1", date:"2026-01-20", type:"LIVE",  title:"HANIKAMI Vol.1", venue:"Spotify O-EAST" },
  { id:"2026-01-20-2", date:"2026-01-20", type:"LIVE",  title:"PEAK SPOT JOIN vol.4", venue:"am HALL（大阪）" },
  { id:"2026-01-22-1", date:"2026-01-22", type:"LIVE",  title:"ONE AND ONLY Vol.29 SP", venue:"豊洲PIT" },
  { id:"2026-01-24-1", date:"2026-01-24", type:"LIVE",  title:"miniちかっぱ祭ver.26.0 in NAGOYA", venue:"ZephyrHall（名古屋）" },
  { id:"2026-01-25-1", date:"2026-01-25", type:"LIVE",  title:"EVOLUTION POP！ Vol.81", venue:"Spotify O-WEST" },
  { id:"2026-01-27-1", date:"2026-01-27", type:"LIVE",  title:"UTAGE FES Vol.4", venue:"Zepp Shinjuku" },

  // ===== 2026-02 =====
  { id:"2026-02-01-1", date:"2026-02-01", type:"LIVE",  title:"sound stock Vol.7 × iCON DOLL LOUNGE 2026", venue:"豊洲PIT" },
  { id:"2026-02-02-1", date:"2026-02-02", type:"LIVE",  title:"TOKYO GIRLS GIRLS", venue:"Spotify O-EAST" },
  { id:"2026-02-03-1", date:"2026-02-03", type:"LIVE",  title:"EVOLUTION POP! Vol.81", venue:"Spotify O-WEST" },
  { id:"2026-02-11-1", date:"2026-02-11", type:"LIVE",  title:"小浜菜摘生誕祭2026〜なちゃんにろぐいん！", venue:"表参道GROUND" },
  { id:"2026-02-12-1", date:"2026-02-12", type:"LIVE",  title:"MARQUEE祭 vol.169", venue:"Spotify O-WEST" },
  { id:"2026-02-18-1", date:"2026-02-18", type:"RADIO", title:"YBSラジオ『うるさごぜん』", venue:"" },
  { id:"2026-02-22-1", date:"2026-02-22", type:"LIVE",  title:"Merry Made vol.2 Happy Valentine!!", venue:"EBiSU 303" },
  { id:"2026-02-25-1", date:"2026-02-25", type:"LIVE",  title:"HANIKAMI Vol.2", venue:"豊洲PIT" },

  // ===== 2026-03 =====
  { id:"2026-03-03-1", date:"2026-03-03", type:"LIVE",  title:"ッスッゴイライブ -ひなまつりSP-", venue:"Zepp Shinjuku" },
  { id:"2026-03-05-1", date:"2026-03-05", type:"LIVE",  title:"MARQUEE祭 vol.171", venue:"Spotify O-EAST" },
  { id:"2026-03-06-1", date:"2026-03-06", type:"LIVE",  title:"IDORISE!! FESTIVAL 2026 前夜祭", venue:"Spotify O-EAST" },
  { id:"2026-03-07-1", date:"2026-03-07", type:"LIVE",  title:"IDORISE!! FESTIVAL 2026", venue:"Spotify O-WEST" },
  { id:"2026-03-08-1", date:"2026-03-08", type:"LIVE",  title:"IDORISE!! FESTIVAL 2026", venue:"WOMB" },
  { id:"2026-03-13-1", date:"2026-03-13", type:"OTHER", title:"POP UP SHOP BY iCON DOLL LOUNGE 2026 〜SPRING COLLECTION〜", venue:"ラフォーレ原宿 MAKE THE STAGE" },
  { id:"2026-03-13-2", date:"2026-03-13", type:"OTHER", title:"sound stock × iCON DOLL LOUNGE 2026", venue:"ラフォーレ原宿 MAKE THE STAGE" },
  { id:"2026-03-14-1", date:"2026-03-14", type:"LIVE",  title:"ONE AND ONLY Vol.31", venue:"飛行船シアター" },
  { id:"2026-03-15-1", date:"2026-03-15", type:"OTHER", title:"IDOL RUNWAY COLLECTION 2026", venue:"国立代々木競技場第一体育館" },
  { id:"2026-03-21-1", date:"2026-03-21", type:"LIVE",  title:"BEEEEM FES Vol.2", venue:"BLAZE GOTANDA" },
  { id:"2026-03-22-1", date:"2026-03-22", type:"LIVE",  title:"PEAK SPOT JOIN Vol.6 -東名阪 PEAK SPOT TOUR- 東京公演", venue:"池袋harevutai" },
  { id:"2026-03-26-1", date:"2026-03-26", type:"LIVE",  title:"MARQUEE祭 Vol.172", venue:"Spotify O-WEST" },
  { id:"2026-03-29-1", date:"2026-03-29", type:"LIVE",  title:"sound stock Vol.9", venue:"BLAZE GOTANDA" },
  { id:"2026-03-31-1", date:"2026-03-31", type:"LIVE",  title:"LadySteady Premium 1周年SP", venue:"EX THEATER ROPPONGI" },

  // ===== 2026-04 =====
  { id:"2026-04-01-1", date:"2026-04-01", type:"LIVE",  title:"超iLiVE! supported by refrear", venue:"国立代々木競技場第一体育館" },
  { id:"2026-04-04-1", date:"2026-04-04", type:"LIVE",  title:"ONE AND ONLY Vol.32 NAGOYA SP", venue:"DIAMOND HALL（名古屋）" },
  { id:"2026-04-05-1", date:"2026-04-05", type:"LIVE",  title:"ろぐゆーにろぐいん！〜でっかい奇跡巻き起こそ！〜", venue:"飛行船シアター" },
  { id:"2026-04-09-1", date:"2026-04-09", type:"LIVE",  title:"HANiKAMi Vol.3", venue:"豊洲PIT" },
  { id:"2026-04-13-1", date:"2026-04-13", type:"LIVE",  title:"sound stock Vol.10", venue:"LIQUIDROOM" },
  { id:"2026-04-19-1", date:"2026-04-19", type:"LIVE",  title:"PEAK SPOT JOIN EXTRA", venue:"SHIBUYA PLEASURE PLEASURE" },
  { id:"2026-04-26-1", date:"2026-04-26", type:"LIVE",  title:"福本れみ生誕祭2026〜Welcome to Remiland〜", venue:"表参道GROUND" },
  { id:"2026-04-27-1", date:"2026-04-27", type:"LIVE",  title:"MARQUEE祭 vol.174", venue:"duo MUSIC EXCHANGE" },
  { id:"2026-04-30-1", date:"2026-04-30", type:"LIVE",  title:"JAPAN IDOL SUPER LIVE 2026", venue:"Zepp Shinjuku" },

  // ===== 2026-05 =====
  { id:"2026-05-03-1", date:"2026-05-03", type:"LIVE",  title:"PEAK SPOT JOIN Vol.8", venue:"恵比寿LIQUIDROOM" },
  { id:"2026-05-05-1", date:"2026-05-05", type:"LIVE",  title:"歌舞伎町UP GATE↑↑2026", venue:"新宿サーキット" },
  { id:"2026-05-10-1", date:"2026-05-10", type:"LIVE",  title:"MAWA LOOP OSAKA 2026", venue:"心斎橋エリア8会場（大阪）" },
  { id:"2026-05-16-1", date:"2026-05-16", type:"LIVE",  title:"TIF ASIA TOUR 2026 in TOKYO", venue:"白金高輪SELENE b2" },
  { id:"2026-05-17-1", date:"2026-05-17", type:"LIVE",  title:"マリアージュ vol.1 ＜Lunch Time＞", venue:"Spotify O-WEST" },
  { id:"2026-05-20-1", date:"2026-05-20", type:"LIVE",  title:"MARQUEE Fes day2", venue:"Spotify O-EAST" },
  { id:"2026-05-23-1", date:"2026-05-23", type:"LIVE",  title:"Merry Made Vol.3", venue:"Zepp Shinjuku" },
  { id:"2026-05-28-1", date:"2026-05-28", type:"LIVE",  title:"MARQUEE祭 vol.175", venue:"Spotify O-WEST" },

  // ===== 2026-06 =====
  { id:"2026-06-01-1", date:"2026-06-01", type:"LIVE",  title:"sound stock Vol.12", venue:"Spotify O-EAST" },
  { id:"2026-06-04-1", date:"2026-06-04", type:"LIVE",  title:"THE ORCHESTRA TOKYO主催公演『楠ろあ生誕祭2026』", venue:"渋谷Spotify O-WEST" },
  { id:"2026-06-10-1", date:"2026-06-10", type:"LIVE",  title:"log you 1stワンマンライブ〜call you log〜", venue:"Spotify O-EAST" },
  { id:"2026-06-11-1", date:"2026-06-11", type:"RADIO", title:"FM NACK5『FAV FOUR』", venue:"" },
  { id:"2026-06-14-1", date:"2026-06-14", type:"OTHER", title:"KAWAII LAB.&PEAK SPOT 大特典会", venue:"有明アリーナ" },
  { id:"2026-06-18-1", date:"2026-06-18", type:"LIVE",  title:"MARQUEE祭 vol.176", venue:"Spotify O-WEST" },
  { id:"2026-06-21-1", date:"2026-06-21", type:"LIVE",  title:"ちゃやまちアイドルパーク2026", venue:"グラングリーン大阪 うめきた（大阪）" },
  { id:"2026-06-21-2", date:"2026-06-21", type:"RADIO", title:"PEAK SPOT RADIO in ちゃいぱ", venue:"" },
  { id:"2026-06-27-1", date:"2026-06-27", type:"LIVE",  title:"UP-T presents HERO SONIC 2026", venue:"赤レンガパーク（横浜）" },
  { id:"2026-06-27-2", date:"2026-06-27", type:"TV",    title:"まるどりっ！UP", venue:"" },

  // ===== 2026-07 =====
  { id:"2026-07-09-1", date:"2026-07-09", type:"LIVE",  title:"MARQUEE祭 Vol.178", venue:"Spotify O-WEST" },
  { id:"2026-07-11-1", date:"2026-07-11", type:"LIVE",  title:"SPARK 2026 渋谷納涼祭", venue:"渋谷ベルサールガーデン" },
  { id:"2026-07-11-2", date:"2026-07-11", type:"LIVE",  title:"GMO 渋谷エンタメ祭2026 JAMEエンタメステージ", venue:"代々木公園 野外ステージ" },
  { id:"2026-07-12-1", date:"2026-07-12", type:"TV",    title:"カバン持ちさせてください★アイドル【log you】のお手伝い！", venue:"" },
  { id:"2026-07-12-2", date:"2026-07-12", type:"RADIO", title:"原口あきまさとlog youのそれ！頂きっ", venue:"" },
  { id:"2026-07-14-1", date:"2026-07-14", type:"LIVE",  title:"うるトラすフェスタ vol.45", venue:"渋谷CLUB QUATTRO" },
  { id:"2026-07-15-1", date:"2026-07-15", type:"LIVE",  title:"ONE AND ONLY 2nd Anniversary day1", venue:"Spotify O-EAST" },
  { id:"2026-07-18-1", date:"2026-07-18", type:"LIVE",  title:"ッスッゴイライブ", venue:"新宿 KABUKICHO TOWER STAGE" },
  { id:"2026-07-19-1", date:"2026-07-19", type:"LIVE",  title:"OMUTA BIG FESTIVAL 2026", venue:"イオンモール大牟田 野外特設ステージ（福岡）" },
  { id:"2026-07-19-2", date:"2026-07-19", type:"RADIO", title:"原口あきまさとlog youのそれ！頂きっ", venue:"" },
  { id:"2026-07-20-1", date:"2026-07-20", type:"LIVE",  title:"Fuku Kawa Gig", venue:"DRUM Be-1（福岡）" },
  { id:"2026-07-20-2", date:"2026-07-20", type:"OTHER", title:"推しサマDAYS 配信スタート", venue:"" },
  { id:"2026-07-22-1", date:"2026-07-22", type:"LIVE",  title:"UTAGE FES Vol.5", venue:"品川インターシティホール" },
  { id:"2026-07-25-1", date:"2026-07-25", type:"LIVE",  title:"PEAK SPOT JOIN Vol.9 -summer special-", venue:"Zepp Shinjuku" },
  { id:"2026-07-26-1", date:"2026-07-26", type:"LIVE",  title:"六本木アイドルフェスティバル2026", venue:"TFTホール" },
  { id:"2026-07-26-2", date:"2026-07-26", type:"RADIO", title:"原口あきまさとlog youのそれ！頂きっ", venue:"" },
  { id:"2026-07-29-1", date:"2026-07-29", type:"LIVE",  title:"もしもの世界 -夏-", venue:"有楽町ヒューリックホール" },
  { id:"2026-07-31-1", date:"2026-07-31", type:"LIVE",  title:"TOKYO IDOL FESTIVAL 2026 (Day1)", venue:"お台場" },

  // ===== 2026-08 =====
  { id:"2026-08-02-1", date:"2026-08-02", type:"LIVE",  title:"TOKYO IDOL FESTIVAL 2026 (Day3)", venue:"お台場" },
  { id:"2026-08-02-2", date:"2026-08-02", type:"RADIO", title:"原口あきまさとlog youのそれ！頂きっ", venue:"" },
  { id:"2026-08-08-1", date:"2026-08-08", type:"LIVE",  title:"IDOL SUMMER JUNGLE 2026", venue:"お台場R地区" },
  { id:"2026-08-08-2", date:"2026-08-08", type:"OTHER", title:"#8 fav meの今日もふぁぼっちゃう？", venue:"" },
  { id:"2026-08-09-1", date:"2026-08-09", type:"LIVE",  title:"月代来実生誕祭2026〜月代学園〜", venue:"Spotify O-WEST" },
  { id:"2026-08-09-2", date:"2026-08-09", type:"OTHER", title:"💙月代来実 BIRTHDAY💙", venue:"" },
  { id:"2026-08-10-1", date:"2026-08-10", type:"LIVE",  title:"NEO KASSEN 2026", venue:"Spotify O-EAST（他全12会場）" },
  { id:"2026-08-11-1", date:"2026-08-11", type:"LIVE",  title:"STARNOTE★デビュー祭", venue:"神田明神ホール" },
  { id:"2026-08-15-1", date:"2026-08-15", type:"LIVE",  title:"TOKYO GIRLS GIRLS", venue:"ステラボール" },
  { id:"2026-08-16-1", date:"2026-08-16", type:"LIVE",  title:"超宴祭！", venue:"Spotify O-WEST／duo／WOMB／SHIBUYA RING" },
  { id:"2026-08-18-1", date:"2026-08-18", type:"LIVE",  title:"ASOBIEXPO 2026", venue:"TOYOTA ARENA TOKYO" },
  { id:"2026-08-19-1", date:"2026-08-19", type:"LIVE",  title:"ONE AND ONLY vol.39 SP", venue:"LIQUIDROOM" },
  { id:"2026-08-21-1", date:"2026-08-21", type:"LIVE",  title:"俺フェス！ Vol.2", venue:"白金高輪SELENE b2" },
  { id:"2026-08-22-1", date:"2026-08-22", type:"LIVE",  title:"ふぁぼフェス♡", venue:"Zepp Shinjuku" },
  { id:"2026-08-23-1", date:"2026-08-23", type:"LIVE",  title:"Fruits Showcase Vol.12", venue:"Spotify O-WEST" },
  { id:"2026-08-25-1", date:"2026-08-25", type:"LIVE",  title:"エンドレスサマー2026", venue:"Spotify O-EAST／O-WEST（他8会場）" },
  { id:"2026-08-28-1", date:"2026-08-28", type:"LIVE",  title:"HANiKAMi vol.5", venue:"Zepp Shinjuku" },
  // ↓公式サイト未掲載・Eventernote等の外部情報（出演可否は要確認）
  { id:"2026-08-30-1", date:"2026-08-30", type:"LIVE",  title:"@JAM EXPO 2026 supported by UP-T Day2", venue:"横浜アリーナ" },

  // ===== 2026-09 =====
  { id:"2026-09-01-1", date:"2026-09-01", type:"LIVE",  title:"ONE AND ONLY Vol.41 Pickup Edition", venue:"Spotify O-nest" },
  { id:"2026-09-05-1", date:"2026-09-05", type:"LIVE",  title:"ナナフェス2026 supported by「SUNTORY オールフリー」", venue:"なんばHatch（大阪）" },
  { id:"2026-09-07-1", date:"2026-09-07", type:"LIVE",  title:"LadySteady supported by BUZZチケ", venue:"Spotify O-EAST" },
  { id:"2026-09-09-1", date:"2026-09-09", type:"LIVE",  title:"赤レンガスプラッシュ祭-Day2-", venue:"横浜赤レンガ倉庫イベント広場B（横浜）" },
  { id:"2026-09-10-1", date:"2026-09-10", type:"LIVE",  title:"BEEEEM FES Vol.8 Supported by michellMacaron", venue:"Spotify O-EAST" },
  { id:"2026-09-16-1", date:"2026-09-16", type:"LIVE",  title:"MARQUEE Fes day2", venue:"渋谷O-EAST" },
  { id:"2026-09-22-1", date:"2026-09-22", type:"LIVE",  title:"PEAK SPOT JOIN Vol.10", venue:"Zepp Shinjuku" },
  { id:"2026-09-28-1", date:"2026-09-28", type:"LIVE",  title:"iCON DOLL LOUNGE 2026 ～ AUTUMN COLLECTION ～", venue:"Zepp Shinjuku" },

  // ===== 2026-10 =====
  { id:"2026-10-03-1", date:"2026-10-03", type:"LIVE",  title:"かがやきフェス2026", venue:"Eight Hall他 金沢市内7会場（石川）" },
  { id:"2026-10-04-1", date:"2026-10-04", type:"LIVE",  title:"かがやきフェス2026", venue:"Eight Hall他 金沢市内7会場（石川）" },
  { id:"2026-10-05-1", date:"2026-10-05", type:"LIVE",  title:"松本玲奈 生誕祭2026", venue:"Spotify O-WEST" },
  { id:"2026-10-05-2", date:"2026-10-05", type:"OTHER", title:"💜松本玲奈 BIRTHDAY💜", venue:"" },
  // ↓公式サイト未掲載・Eventernote等の外部情報（出演可否は要確認）
  { id:"2026-10-12-1", date:"2026-10-12", type:"LIVE",  title:"ぐんまちゃんアイドルフェスティバル 2026", venue:"群馬県庁県民広場・群馬会館ほか（群馬）" },
  { id:"2026-10-24-1", date:"2026-10-24", type:"LIVE",  title:"井出叶 生誕祭2026", venue:"Spotify O-WEST" },
  { id:"2026-10-24-2", date:"2026-10-24", type:"LIVE",  title:"山下うみ 生誕祭2026", venue:"Spotify O-WEST" },

  // ===== 2026-11 =====
  { id:"2026-11-02-1", date:"2026-11-02", type:"OTHER", title:"💚井出叶 BIRTHDAY💚", venue:"" },
  { id:"2026-11-05-1", date:"2026-11-05", type:"OTHER", title:"🧡山下うみ BIRTHDAY🧡", venue:"" },
  { id:"2026-11-19-1", date:"2026-11-19", type:"OTHER", title:"🩵竹内月音 BIRTHDAY🩵", venue:"" },
  { id:"2026-11-20-1", date:"2026-11-20", type:"LIVE",  title:"log you 1st ANNIVERSARY LIVE 〜 Beyond the log 〜", venue:"Zepp Shinjuku" },
  { id:"2026-11-20-2", date:"2026-11-20", type:"OTHER", title:"❤️久保怜音 BIRTHDAY❤️", venue:"" },
  { id:"2026-11-29-1", date:"2026-11-29", type:"LIVE",  title:"久保怜音 生誕祭2026", venue:"Spotify O-WEST" },
  { id:"2026-11-29-2", date:"2026-11-29", type:"LIVE",  title:"竹内月音 生誕祭2026", venue:"Spotify O-WEST" }
];
