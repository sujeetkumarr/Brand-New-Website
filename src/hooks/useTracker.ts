import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'; 

const ADMIN_KEY = 'portfolio_admin_user';

// Accepts a parameter to control if it should log the page visit automatically
export const useTracker = (trackOnMount = false) => {
  const visitDocId = useRef<string | null>(null);
  const hasLogged = useRef(false);
  const heartbeatInterval = useRef<any>(null);

  const isAdmin = () => {
    return typeof window !== 'undefined' && localStorage.getItem(ADMIN_KEY) === 'true';
  };

  const trackEvent = async (eventType: string, detail: string) => {
    if (isAdmin()) {
      console.log("Admin visit ignored.");
      return;
    }

    try {
      // 1. Get Location
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

      // 2. Create the Session Document
      const docRef = await addDoc(collection(db, "visitors"), {
        eventType,
        detail,
        location: locationData,
        timestamp: serverTimestamp(),
        lastPing: serverTimestamp(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      });
      
      visitDocId.current = docRef.id;

      // 3. Start the Heartbeat (Ping every 15 seconds)
      if (heartbeatInterval.current) clearInterval(heartbeatInterval.current);
      
      heartbeatInterval.current = setInterval(() => {
        if (visitDocId.current) {
          const sessionRef = doc(db, "visitors", visitDocId.current);
          updateDoc(sessionRef, { 
            lastPing: serverTimestamp() 
          }).catch(e => console.log("Heartbeat failed", e));
        }
      }, 15000); 

    } catch (e) {
      console.error("Error tracking:", e);
    }
  };

  useEffect(() => {
    // ONLY track if explicitly told to (trackOnMount is true)
    if (trackOnMount && !hasLogged.current) {
      trackEvent("Page Visit", window.location.pathname);
      hasLogged.current = true;
    }

    return () => {
      if (heartbeatInterval.current) clearInterval(heartbeatInterval.current);
    };
  }, [trackOnMount]);

  return { trackEvent };
};
