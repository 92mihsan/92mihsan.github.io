importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/", revision: '1' },
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/img/icon.png", revision: '1' },
  { url: "/img/notif.png", revision: '1' },
  { url: "/pages/home.html", revision: '1' },
  { url: "/pages/favorite.html", revision: '1' },
  { url: "/pages/jadwal.html", revision: '1' },
  { url: "/css/materialize.css", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/database.js", revision: '1' },
  { url: "/js/helper.js", revision: '1' },
  { url: "/js/idb.js", revision: '1' },
  { url: "/js/indexeddb.js", revision: '1' },
  { url: "/js/materialize.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/match.html", revision: '1' },
  { url: "/team.html", revision: '1' }
]);




workbox.routing.registerRoute(
  new RegExp('/Pages/'),
  workbox.strategies.staleWhileRevalidate()
);



workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);


workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

/*const CACHE_NAME = "football-v1";
var urlsToCache = [

];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});*/
/*
self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })

        .then(function(response) {
            return response || fetch (event.request);
        })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/

self.addEventListener('push', function(event) {
  var body;
  if(event.data) {
    body = event.data.text();
  } else {
    body = 'push message no playoad';
  }
  var options = {
    body: body,
    icon: 'img/notif.png',
    vibrate: [100,50,100],
    data: {
      dataOfArray: Date.now(),
      primaryKey:1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push notification', options)
    );
});