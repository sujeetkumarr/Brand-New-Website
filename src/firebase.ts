import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCgNx6KbqEVP2pK6fIE3qjG5LCGd7iNrmI",
  authDomain: "portfolio--visitor-tracker.firebaseapp.com",
  projectId: "portfolio--visitor-tracker",
  storageBucket: "portfolio--visitor-tracker.firebasestorage.app",
  messagingSenderId: "402378620172",
  appId: "1:402378620172:web:d0c528c0e3711991295d29",
  measurementId: "G-D06541E9VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Database (Required for your dashboard)
export const db = getFirestore(app);

// Initialize standard Analytics (Optional, but good to have)
export const analytics = getAnalytics(app);
