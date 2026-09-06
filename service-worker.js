/* ShiftFit service worker — retired.
 *
 * The app now loads its HTML and JavaScript directly from Vercel.
 * The previous worker intercepted navigation requests and maintained
 * a transformed HTML cache, which could leave Safari showing a page
 * that had visually rendered while the document was still loading.
 *
 * Keep this file temporarily so browsers that still have the old worker
 * installed can update it, remove the old caches, and unregister cleanly.
 */
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      self.registration.unregister(),
      caches.keys().then(keys =>
        Promise.all(keys.map(key => caches.delete(key)))
      )
    ]).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  // No navigation interception. Let Safari/Vercel handle requests normally.
  return;
});
