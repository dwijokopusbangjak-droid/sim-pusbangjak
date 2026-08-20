import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJVSai8xBNwFhjBf6EOKhsAaF0Ykaur-w",
  authDomain: "sim-pusbangjak.firebaseapp.com",
  projectId: "sim-pusbangjak",
  storageBucket: "sim-pusbangjak.firebasestorage.app",
  messagingSenderId: "547820000412",
  appId: "1:547820000412:web:74fc993983d934968a8959",
  measurementId: "G-N3XHQ44PJ0"
};

// Initialize Firebase only if it hasn't been initialized yet (to prevent Next.js hot-reload errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
