import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXpMx7LIfOMQonbfioD-nrqj8aL-awY_g",
  authDomain: "bizinsight-24e2a.firebaseapp.com",
  projectId: "bizinsight-24e2a",
  storageBucket: "bizinsight-24e2a.firebasestorage.app",
  messagingSenderId: "1038050795367",
  appId: "1:1038050795367:web:730ee0891d7b276e28d9c2",
  measurementId: "G-E3F1NH19B6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
