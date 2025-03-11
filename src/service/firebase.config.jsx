// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_FIRESTORE_API_KEY,
  authDomain: "ai-trip-planner-285bc.firebaseapp.com",
  projectId: "ai-trip-planner-285bc",
  storageBucket: "ai-trip-planner-285bc.firebasestorage.app",
  messagingSenderId: "555311134023",
  appId: "1:555311134023:web:35b16cf3bf6fdbd3fa0862"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);