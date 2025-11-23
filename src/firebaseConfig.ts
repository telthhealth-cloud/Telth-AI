// src/firebase/client.ts - FIXED VERSION
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your CORRECTED Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
// Test if Firebase is properly configured
// console.log('Firebase Project:', auth.app.options.projectId);
// console.log('Auth Domain:', auth.app.options.authDomain);
// Export everything
export { auth };
export { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
export default app;