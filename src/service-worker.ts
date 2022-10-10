/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { initializeApp } from "firebase/app";
import { onBackgroundMessage, getMessaging } from "firebase/messaging/sw";
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// This statement must be present in our service worker file
// to avoid precaching. See https://cra.link/PWA
const ignored = self.__WB_MANIFEST;

self.addEventListener("install", (event) => {
  // forces a service worker to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // when this SW becomes activated, we claim all the opened clients
  // they can be standalone PWA windows or browser tabs
  event.waitUntil(self.clients.claim());
});

const appConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  vapidKey: "",
};

// Retrieve firebase & messaging
const firebaseApp = initializeApp(appConfig);
const messaging = getMessaging(firebaseApp);

// Show notification when the app is in the backgound
onBackgroundMessage(messaging, function ({ notification }) {
  if (notification && notification.title) {
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
    };

    return self.registration?.showNotification(
      notificationTitle,
      notificationOptions
    );
  }
});
