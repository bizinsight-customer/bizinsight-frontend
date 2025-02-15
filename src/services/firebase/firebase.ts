import { initializeApp } from "firebase/app";

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

export default app;
