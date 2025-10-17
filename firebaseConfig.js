// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1QTiJkXA2qy0iClgJGQ2-anpL0oU2TkM",
  authDomain: "wabtech-23365.firebaseapp.com",
  projectId: "wabtech-23365",
  storageBucket: "wabtech-23365.appspot.com", // <-- corrected
  messagingSenderId: "319350705253",
  appId: "1:319350705253:web:c1e7567dadb37eb7b98a8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
