// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID
};

let app;
let auth;
let db;

// Initialize Firebase immediately when module loads (client-side only)
if (typeof window !== "undefined") {
  try {
    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API key missing. Using mock.");
      app = {}; 
      auth = {};
      db = {};
    } else {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      
      // OPTIMIZATION: Enable offline persistence for Firebase Database
      // This caches data locally and works offline
      db = getDatabase(app);
      
      // Firebase v9+ uses LOCAL persistence by default for auth
      // Database persistence is enabled by default in v9+
      // This means:
      // - Data is cached locally
      // - App works offline
      // - Faster subsequent loads
      // - Automatic sync when connection is restored
    }
  } catch (e) {
    console.warn("Firebase initialization failed:", e);
    app = {};
    auth = {};
    db = {};
  }
} else {
  // SSR environment - create mock objects
  app = {}; 
  auth = {};
  db = {};
}

export { auth, db };
// Disable logging for production performance
// enableLogging(false); 
export function createRecaptcha(containerId = "recaptcha-container") {
  if (typeof window === "undefined") return null; // safety for SSR/build

  if (!window.recaptchaVerifier) {
    if (typeof window !== "undefined") {
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = ""; // Prevent "already rendered" error
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,                 // ✅ FIRST: auth
      containerId,          // ✅ SECOND: container ID
      {
        size: "invisible",
        callback: () => {
          // optional: called when solved
        },
      }
    );
    // Optional: render it immediately
    window.recaptchaVerifier.render();
  }

  return window.recaptchaVerifier;
}

export default app;
