// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL-XscNKcMToKrhFIN7Jrj2ay0Qj8St20",
  authDomain: "contacontando.firebaseapp.com",
  projectId: "contacontando",
  storageBucket: "contacontando.appspot.com",
  messagingSenderId: "917856395333",
  appId: "1:917856395333:web:4c2691281960a7239ac32c",
  measurementId: "G-XSJCFRSLJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);