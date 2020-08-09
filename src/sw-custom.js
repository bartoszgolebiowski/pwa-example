if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );

  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded");

    // Disable logging
    workbox.setConfig({ debug: false });

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    self.addEventListener("notificationclose", function (e) {
      var notification = e.notification;
      var data = notification.data || {};
      var primaryKey = data.primaryKey;
      console.debug("Closed notification: " + primaryKey);
    });

    self.addEventListener("notificationclick", function (e) {
      var notification = e.notification;
      var data = notification.data || {};
      var primaryKey = data.primaryKey;
      var action = e.action;
      console.debug("Clicked notification: " + primaryKey);
      if (action === "close") {
        console.debug("Notification clicked and closed", primaryKey);
        notification.close();
      } else {
        console.debug("Notification actioned", primaryKey);
        clients.openWindow("/");
        notification.close();
      }
    });

    // Image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // JS, CSS caching
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );
  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
}
