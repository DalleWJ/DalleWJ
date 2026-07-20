const CACHE_NAME = 'feriequiz-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data.js',
  './manifest.webmanifest',
  './fonts/lilita-one.woff2',
  './fonts/quicksand-variable.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
  './images/cactus.png',
  './images/camping.png',
  './images/cowboy-hat-face.png',
  './images/curling-stone.png',
  './images/droplet.png',
  './images/eiffel-tower.png',
  './images/flag-france.svg',
  './images/flag-italy.svg',
  './images/flag-japan.svg',
  './images/flag-tanzania.svg',
  './images/flag-thailand.svg',
  './images/golf-flag.png',
  './images/guitar.png',
  './images/herb.png',
  './images/kitchen-knife.png',
  './images/koala.png',
  './images/lion.png',
  './images/penguin.png',
  './images/pineapple.png',
  './images/rainbow.png',
  './images/saxophone.png',
  './images/shark.png',
  './images/snow-mountain.png',
  './images/snowboard.png',
  './images/snowflake.png',
  './images/spaghetti.png',
  './images/volcano.png',
  './images/water-wave.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
