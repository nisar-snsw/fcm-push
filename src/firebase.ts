import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const vapidKey ="";

export const initlialiseFirebase = async () => {
  const isFCMSupported = await isSupported();
  if (isFCMSupported) {
    // Initialize Firebase & Service worker
    initializeApp(firebaseConfig);

    // Get existing token or request permission to register service worker
    saveMessagingDeviceToken();
  } else {
    console.log("Firebase Notifications are not supported on this browser");
  }
};

const saveMessagingDeviceToken = async () => {
  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;

    const currentToken = await getToken(getMessaging(), {
      vapidKey,
      serviceWorkerRegistration,
    });

    if (currentToken) {
      console.log("App.tsx ~ line 39 ~ currentToken", currentToken);
      return currentToken;
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  } catch (error) {
    console.error("Unable to get messaging token.", error);
  }
};

// Requests permissions to show notifications.
const requestNotificationsPermissions = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await saveMessagingDeviceToken();
  } else {
    console.error("Unable to get permission to notify.");
  }
};
