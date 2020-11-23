var CACHE_NAME = 'task-manager-pwa';
var urlsToCache = [
 
];

// Install service worker
self.addEventListener('install', event => {
  // Perform the install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return the requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return response as Cache is hit 
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['task-manager-pwa'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("push",e=>{
  const data = JSON.parse(e.data.text());
  console.log(data);
  const title = data.titulo;
  const options = {
      body:data.cuerpo,
      icon:"icons/logo.png"
  };

  e.waitUntil(self.registration.showNotification(title,options));
});