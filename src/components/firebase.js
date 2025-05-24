import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE9hjF-hUgSR68r52Z1umEVC7BkKaSzrU",
  authDomain: "auth-aec46.firebaseapp.com",
  projectId: "auth-aec46",
  storageBucket: "auth-aec46.firebasestorage.app",
  messagingSenderId: "10337946661",
  appId: "1:10337946661:web:f347e99a9ef4f5e77a43cc",
  measurementId: "G-M4R7KRW4TV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
