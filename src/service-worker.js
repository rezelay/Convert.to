const CACHE = 'convert-to';

const ASSETS = [
  'popup.html',
  'main.js',
  'api.js',
  'offline.js',
  'manifest.webmanifest',
  'img/icon.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js',
  'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (e) => {
  console.log("Service worker is installed");
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  console.log("Service worker is activated");

  // removes old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.map((cache) => {
        if (cache !== CACHE) {
          console.log("Clearing old caches");
          caches.delete(cache);
        }
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  // // Network-first strategy
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(CACHE).then((cache) => cache.match(event.request))
    )
  );
});

self.addEventListener('fetch', event => {
  console.log("Fetching via Service worker");
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});