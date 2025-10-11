import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
  onEnter?: () => void;
  componentsLoaded?: {
    dom: boolean;
    images: boolean;
    threeJs: boolean;
  };
}

// A sharp, geometric icon to replace the star emoji
const SharpIcon = () => (
  <motion.svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.1, duration: 0.4 }}
  >
    <path
      d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.64 20.02L12 17.27L7.36 20.02L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="text-accent"
    />
  </motion.svg>
);


export function LoadingScreen({ isVisible, onComplete, onEnter, componentsLoaded }: LoadingScreenProps) {
  const [isReady, setIsReady] = useState(false);

  const loadingItems = [
    { key: 'dom', label: 'Initializing DOM', loaded: componentsLoaded?.dom || false },
    { key: 'images', label: 'Loading Assets', loaded: componentsLoaded?.images || false },
    { key: 'threeJs', label: 'Compiling Shaders', loaded: componentsLoaded?.threeJs || false },
  ];

  const progress = (loadingItems.filter(item => item.loaded).length / loadingItems.length) * 100;

  useEffect(() => {
    if (!isVisible) return;
    const allLoaded = loadingItems.every(item => item.loaded);
    if (allLoaded) {
      // A brief delay to allow the user to see 100% before switching
      setTimeout(() => setIsReady(true), 500);
    }
  }, [isVisible, componentsLoaded]);

  const handleEnter = () => {
    if (isReady) {
      onEnter?.();
      onComplete();
    }
  };

  useEffect(() => {
    if (!isReady) return;
    const handleClick = () => handleEnter();
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isReady, onEnter, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center grid-overlay"
        >
          <AnimatePresence mode="wait">
            {!isReady ? (
              <motion.div
                key="loading"
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-sm mx-auto px-6 w-full"
              >
                {/* New Loading Animation */}
                <div className="w-16 h-16 mx-auto mb-10">
                  <motion.svg viewBox="0 0 100 100" fill="none">
                    <motion.path
                      d="M50 2.5V50H97.5"
                      stroke="var(--accent)"
                      strokeWidth="4"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: "circOut" }}
                    />
                    <motion.path
                      d="M97.5 50H50V97.5"
                      stroke="var(--accent-secondary)"
                      strokeWidth="4"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
                    />
                     <motion.path
                      d="M50 97.5H2.5V50"
                      stroke="var(--accent-tertiary)"
                      strokeWidth="4"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.4, ease: "circOut" }}
                    />
                     <motion.path
                      d="M2.5 50H50V2.5"
                      stroke="var(--accent)"
                      strokeWidth="4"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.6, ease: "circOut" }}
                    />
                  </motion.svg>
                </div>

                <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-foreground rounded-full"
                  />
                </div>

                <div className="space-y-3 mt-6">
                  {loadingItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-muted-foreground font-mono">{item.label}</span>
                      <AnimatePresence mode="wait">
                        {item.loaded ? (
                          <motion.div
                            key="loaded"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center space-x-1 text-accent"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="loading-dot"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="h-2 w-2 bg-muted-foreground/50 rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center max-w-md mx-auto px-6 cursor-pointer"
                onClick={handleEnter}
              >
                <SharpIcon />
                <h2
                  className="mt-4 text-2xl text-foreground font-heading"
                >
                  Tap anywhere to enter
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
