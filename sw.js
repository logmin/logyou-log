// 参戦ログ - Service Worker
// network-first: オンライン時は常に最新を取得し、オフライン時のみキャッシュを使う
// グループを増やしたら ASSETS に groups/<id>/ の3ファイルを足して CACHE を上げる
const CACHE = 'live-log-v26';
const ASSETS = [
  './',
  './index.html',
  './groups.js',
  './groups/logyou/schedule.js',
  './groups/logyou/songs.js',
  './groups/logyou/members.js',
  './groups/toitoitoi/schedule.js',
  './groups/toitoitoi/songs.js',
  './groups/toitoitoi/members.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
