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

// Minimalist, sharp "SK" monogram icon.
const MonogramIcon = ({ isPulsing = false }: { isPulsing?: boolean }) => (
  <motion.svg
    width="64"
    height="64"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={isPulsing ? { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] } : {}}
    transition={isPulsing ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
  >
    {/* S Path */}
    <path d="M75 25C75 16.7157 68.2843 10 60 10H40C31.7157 10 25 16.7157 25 25V40C25 48.2843 31.7157 55 40 55H60C68.2843 55 75 61.7157 75 70V85" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    {/* K Path */}
    <path d="M25 85L25 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <path d="M75 10L40 42.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <path d="M40 42.5L75 85" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
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
    if (loadingItems.every(item => item.loaded)) {
      setTimeout(() => setIsReady(true), 500); // Brief delay to show 100%
    }
  }, [isVisible, componentsLoaded]);

  const handleEnter = () => {
    if (isReady) {
      onEnter?.();
      onComplete();
    }
  };
  
  // Setup keyboard/mouse listeners for entering the site
  useEffect(() => {
    if (!isReady) return;
    const enter = () => handleEnter();
    const keyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') enter();
    }
    window.addEventListener('click', enter);
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('click', enter);
      window.removeEventListener('keydown', keyPress);
    };
  }, [isReady]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center grid-overlay"
        >
          <AnimatePresence mode="wait">
            {!isReady ? (
              // --- LOADING STATE ---
              <motion.div
                key="loading"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-sm mx-auto px-6 w-full flex flex-col items-center"
              >
                <div className="w-16 h-16 mx-auto mb-10 text-foreground">
                  <MonogramIcon />
                </div>

                <div className="w-full bg-border/20 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-foreground rounded-full"
                  />
                </div>

                <div className="w-full mt-4">
                  {loadingItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <span className="text-muted-foreground font-mono">{item.label}</span>
                      <AnimatePresence>
                        {item.loaded && (
                          <motion.div
                            key="loaded-check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <Check className="h-3.5 w-3.5 text-accent" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // --- READY TO ENTER STATE ---
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center max-w-md mx-auto px-6 cursor-pointer"
                onClick={handleEnter}
              >
                <div className="w-20 h-20 mx-auto text-foreground">
                  <MonogramIcon isPulsing={true} />
                </div>
                <h2 className="mt-6 text-2xl text-foreground font-display">
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
