var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BI6IAqUdSCshe0G3fj5ewbCp-qc8nM7eSN0FHQ9XeWXhSiemdi5IUvuHNxat1GXXSYQVfQXQouk_4yZPJC1k-jU",
   "privateKey": "h58Vptz8Ar_wK420CPamLFlq2HGqXeruSuq0-u6ISVE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ccwyo3vWzA8:APA91bHy1HvMfKE36pRjmCAxP_tdhMTFjGjH35yIhqn_aKylol99W0iFEmDGUVSXRFlFh4NAB_CfL6QeZk8aVezCfOXW56TjZv2SnnVVZQmP_BN_1DIArLKMMNqHJXCtIE912LufXR9I",
   "keys": {
       "p256dh": "BCnEGIXRPesZlRhJq67YjAIMV6kwoe+KvE0170byou5pEXrkfjMLZzGEGXg2OKsm+xBCKC9nwwqvjkFKUb5dUvg=",
       "auth": "x2Xr+mismQa65zoXOrJ/LQ=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '383627658373',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);