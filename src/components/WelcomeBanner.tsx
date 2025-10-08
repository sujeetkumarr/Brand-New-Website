import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'musicWelcomeBannerSeen';
const DISPLAY_DURATION_MS = 10000; // 10 seconds

interface WelcomeBannerProps {
  showAfterEnter: boolean;
}

export function WelcomeBanner({ showAfterEnter }: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only proceed if user has entered the site
    if (!showAfterEnter) {
      return;
    }

    // Check if user has already seen the banner
    const hasSeenBanner = localStorage.getItem(STORAGE_KEY);
    
    if (hasSeenBanner) {
      // Already seen - don't show
      return;
    }

    // First time visitor - show the banner after a small delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, 500);

    // Auto-dismiss after 10 seconds
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10500); // 500ms delay + 10000ms display

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [showAfterEnter]);

  const handleManualClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-20 right-4 z-40 w-64"
        >
          <div className="bg-card border border-border rounded-lg shadow-xl p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-1">
                <p className="text-xs font-ui text-foreground">
                  🎵 Grooving to timeless classics!
                </p>
                <p className="text-[11px] leading-tight text-muted-foreground font-body">
                  Classical Indian melodies from a golden era. While I appreciate modern music, this is what brings me peace.
                </p>
                <p className="text-[10px] text-accent font-body">
                  (Toggle the music icon anytime for silence)
                </p>
              </div>
              
              <button 
                onClick={handleManualClose}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5 -mt-0.5 -mr-0.5"
                aria-label="Close notification"
              >
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
