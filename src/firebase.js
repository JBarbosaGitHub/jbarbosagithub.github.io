// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL-XscNKcMToKrhFIN7Jrj2ay0Qj8St20",
  authDomain: "contacontando.firebaseapp.com",
  projectId: "contacontando",
  storageBucket: "contacontando.firebasestorage.app",
  messagingSenderId: "917856395333",
  appId: "1:917856395333:web:4c2691281960a7239ac32c",
  measurementId: "G-XSJCFRSLJ3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);