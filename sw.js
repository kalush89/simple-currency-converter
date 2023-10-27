// install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("static-v1")
      .then((cache) =>
        cache.addAll([
          '/', 
          '/index.html', 
          '/js/converter.js', 
          '/js/idb.js',
          '/css/main.css', 
          '/assets/favicon-16x16.png',
          '/assets/favicon-32x32.png', 
          '/assets/apple-touch-icon.png', 
          '/assets/logoIcon192.png', 
          '/assets/logoIcon512.png', 
          '/img/currencies.jpg', 
          'https://cdn.jsdelivr.net/npm/idb@7/+esm',
          'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap'
        ]),
      ),
  );
});

// Fatch resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate service worker
self.addEventListener("activate", (event) => {
  const cacheAllowlist = ["static-v1"];

  event.waitUntil(
    caches.forEach((cacheName) => {
      if (!cacheAllowlist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    }),
  );
});