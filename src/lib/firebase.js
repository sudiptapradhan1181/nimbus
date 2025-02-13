// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace this with your actual config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD3pJvgUdMcj1Io_FQ3KvgsBcXMBrZ2Ok0",
  authDomain: "nimbus-94d1a.firebaseapp.com",
  projectId: "nimbus-94d1a",
  storageBucket: "nimbus-94d1a.firebasestorage.app",
  messagingSenderId: "1009330807179",
  appId: "1:1009330807179:web:6fe8e6f54d1e6899efcf8e",
  measurementId: "G-QMLT6BBBVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // For authentication
export const db = getFirestore(app); // For Firestore database
