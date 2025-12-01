import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

export const useTracker = () => {
  const hasLogged = useRef(false);

  const trackEvent = async (eventType: string, detail: string) => {
    try {
      await addDoc(collection(db, "visitors"), {
        eventType,
        detail,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      });
    } catch (e) {
      console.error("Error adding tracking: ", e);
    }
  };

  useEffect(() => {
    if (!hasLogged.current) {
      trackEvent("Page Visit", window.location.pathname);
      hasLogged.current = true;
    }
  }, []);

  return { trackEvent };
};
