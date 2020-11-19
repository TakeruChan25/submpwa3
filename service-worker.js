importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

// if (workbox) console.log("workbox ok");
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/favicon.ico", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/detailteam.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
], {
ignoreUrlParametersMatching: [/. */]
});

//js file
workbox.routing.registerRoute(
  new RegExp("/js/"),
  new workbox.strategies.CacheFirst({
    cacheName: "js",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // cache 1/2 bulan
        maxAgeSeconds: 60 * 60 * 24 * 15,
      }),
    ],
  })
);

//assets url
workbox.routing.registerRoute(
  new RegExp("/images/"),
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // cache sebulan
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

//pages file
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "pages",
  })
);

// css assets from material icon
// workbox.routing.registerRoute(
//   /^https:\/\/fonts\.googleapis\.com/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: "google-fonts-stylesheets",
//   })
// );

// material icon file font cache
// workbox.routing.registerRoute(
//   /^https:\/\/fonts\.gstatic\.com/,
//   new workbox.strategies.CacheFirst({
//     cacheName: "google-fonts-webfonts",
//     plugins: [
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new workbox.expiration.ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 365,
//         maxEntries: 30,
//       }),
//     ],
//   })
// );

//api file
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "football-data",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("push", (e) => {
  const title = "OneStopFootball";
  let body = "";
  body = e.data ? e.data.text() : "No Payload";
  const options = {
    body,
    icon: "/images/icons/icon.png",
    badge: "/images/icons/icon.png",
    vibrate: [100, 50, 100, 50],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  e.waitUntil(self.registration.showNotification(title, options));
});


// const CACHE_NAME = "submpwa2";
// var urlsToCache = [
//   "/",
//   "/manifest.json",
//   "/favicon.ico",
//   "/images/icons/icon-72x72.png",
//   "/images/icons/icon-96x96.png",
//   "/images/icons/icon-128x128.png",
//   "/images/icons/icon-144x144.png",
//   "/images/icons/icon-152x152.png",
//   "/images/icons/icon-192x192.png",
//   "/images/icons/icon-384x384.png",
//   "/images/icons/icon-512x512.png",
//   "/images/ban.png",
//   "/images/logo-2.png",
//   "/images/laliga.png",
//   "/images/klasemenn.jpg",
//   "/images/liga1.png",
//   "/images/team.jpg",
//   "/images/banner1.jpg",
//   "/nav.html",
//   "/index.html",
//   "/pages/home.html",
//   "/pages/jadwal.html",
//   "/pages/team.html",
//   "/pages/klasemen.html",
//   "/pages/saved.html",
//   "/detailteam.html",
//   '/css/style.css',
//   "/css/materialize.min.css",
//   "/css/materialize.css",
//   "/js/materialize.js",
//   "/js/materialize.min.js",
//   "/js/jquery.min.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/serviceworker.js"
// ];

// self.addEventListener('install', function(event){
// 	event.waitUntil(
// 		caches.open(CACHE_NAME)
// 		.then(function(cache) {
// 			return cache.addAll(urlsToCache);
// 		})
// 	);
// })

// self.addEventListener('activate', function(event){
//   clients.claim();
// 	event.waitUntil(
// 		caches.keys()
// 		.then(function(cacheNames) {
// 			return Promise.all(
// 				cacheNames.map(function(cacheName){
// 					if(cacheName != CACHE_NAME){	
// 						console.log("ServiceWorker: cache " + cacheName + " dihapus");
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// })


// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.football-data.org/v2/";
//   const online = navigator.onLine;

//   if (event.request.url.indexOf(base_url) > -1 && online) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//             return response || fetch (event.request);
//         })
//     )
// }
// });

// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'img/notification.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });