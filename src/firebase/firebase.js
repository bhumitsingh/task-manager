// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'your-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'your-auth-domain',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'your-storage-bucket',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'your-app-id'
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Fallback to a mock implementation
  db = {
    collection: () => ({
      where: () => ({
        orderBy: () => ({})
      }),
      orderBy: () => ({})
    }),
    getDocs: async () => ({ docs: [] }),
    addDoc: async () => ({ id: 'mock-id' }),
    updateDoc: async () => {},
    deleteDoc: async () => {}
  };
}

export { db };