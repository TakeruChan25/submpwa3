importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

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
  })
);

// cache offline
workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName:'api-images',
  })
);

//assets url
workbox.routing.registerRoute(
  new RegExp("/images/"),
  new workbox.strategies.CacheFirst({
    cacheName: "images",
  })
);

//pages file
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "pages",
  })
);

//api file
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "football-data",
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