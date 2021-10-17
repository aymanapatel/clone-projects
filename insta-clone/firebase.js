// Import the functions you need from the SDKs you need
// Firebase v9 supports tree-shaking
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk34dh915kjbqibIuwOnQN87_kGPY9wf8",
  authDomain: "insta-clone-cacf2.firebaseapp.com",
  projectId: "insta-clone-cacf2",
  storageBucket: "insta-clone-cacf2.appspot.com",
  messagingSenderId: "1046842016781",
  appId: "1:1046842016781:web:632b0085ba3f7ec368c144",
  measurementId: "G-SPPP582KN6",
};

// Initialize Firebase iff App is not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

// Analystics
const analytics = getAnalytics(app);

console.log(`${analytics}`);

export { app, db, storage };
