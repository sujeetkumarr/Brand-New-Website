import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'; 

// Key to identify you as the admin in local storage
const ADMIN_KEY = 'portfolio_admin_user';

export const useTracker = () => {
  const visitDocId = useRef<string | null>(null);
  const hasLogged = useRef(false);

  // 1. Helper to check if current user is Admin
  const isAdmin = () => {
    return typeof window !== 'undefined' && localStorage.getItem(ADMIN_KEY) === 'true';
  };

  // 2. Main Tracking Function
  const trackEvent = async (eventType: string, detail: string) => {
    // STOP if it's you (The Admin)
    if (isAdmin()) {
      console.log("Admin visit ignored.");
      return;
    }

    try {
      // Fetch location data (City, Country) from IP
      let locationData = "Unknown";
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.city && data.country_name) {
          locationData = `${data.city}, ${data.country_name}`;
        }
      } catch (err) {
        console.warn("Could not fetch location");
      }

      // Send to Firebase
      const docRef = await addDoc(collection(db, "visitors"), {
        eventType,
        detail,
        location: locationData,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        duration: "Active" // Initial state
      });
      
      // Save ID to update duration later
      visitDocId.current = docRef.id;

    } catch (e) {
      console.error("Error tracking:", e);
    }
  };

  // 3. Auto-track Page Visit & Duration
  useEffect(() => {
    if (!hasLogged.current) {
      trackEvent("Page Visit", window.location.pathname);
      hasLogged.current = true;
    }

    // Cleanup: Try to mark session end when user leaves
    return () => {
      if (visitDocId.current) {
        // We can't easily calculate exact seconds on close without a beacon, 
        // but we can mark the timestamp of exit to calculate it in dashboard later.
        const exitRef = doc(db, "visitors", visitDocId.current);
        updateDoc(exitRef, { 
          exitTime: serverTimestamp(),
          duration: "Ended"
        }).catch(e => console.log("Exit log failed", e));
      }
    };
  }, []);

  // 4. Return function to manually track clicks (Downloads, etc)
  return { trackEvent };
};
