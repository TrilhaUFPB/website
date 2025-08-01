import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7Rp9p0qlpMoHjL8NqfQmq7wDnqM83og0",
  authDomain: "trilhurna.firebaseapp.com",
  projectId: "trilhurna",
  storageBucket: "trilhurna.firebasestorage.app",
  messagingSenderId: "1063962547621",
  appId: "1:1063962547621:web:8d763751466fa24c04444c",
  measurementId: "G-7R8G1YT8RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Connect to emulator in development (optional)
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below if you want to use Firestore emulator
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

export default app; 