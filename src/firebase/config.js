// Firebase configuration for global visitor tracking
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config - these are public and safe to expose
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKey-ReplaceWithYourRealKey",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "portfolio-tracking-demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "portfolio-tracking-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "portfolio-tracking-demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789000",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789000:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
