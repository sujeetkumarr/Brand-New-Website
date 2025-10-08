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

export function LoadingScreen({ isVisible, onComplete, onEnter, componentsLoaded }: LoadingScreenProps) {
  const [isReady, setIsReady] = useState(false);

  const loadingItems = [
    { key: 'dom', label: 'DOM Elements', loaded: componentsLoaded?.dom || false },
    { key: 'images', label: 'Images & Assets', loaded: componentsLoaded?.images || false },
    { key: 'threeJs', label: '3D Components', loaded: componentsLoaded?.threeJs || false },
  ];

  const progress = loadingItems.filter(item => item.loaded).length / loadingItems.length * 100;

  // Check if all components are loaded
  useEffect(() => {
    if (!isVisible) return;
    
    const allLoaded = loadingItems.every(item => item.loaded);
    if (allLoaded) {
      setIsReady(true);
    }
  }, [isVisible, componentsLoaded]);

  const handleEnter = () => {
    if (isReady) {
      onEnter?.(); // Trigger music and user interaction
      setTimeout(onComplete, 300); // Hide loading screen with slight delay
    }
  };

  useEffect(() => {
    if (!isReady) return;

    const handleClick = () => handleEnter();
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [isReady]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center grid-overlay"
        >
          <AnimatePresence mode="wait">
            {!isReady ? (
              // Frame 1: Loading Screen with Progress
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-md mx-auto px-6"
              >
                {/* Loading Icon */}
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border-4 border-accent/20 rounded-full"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full border-t-4 border-accent rounded-full"
                    />
                  </motion.div>
                  
                  {/* Center dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full"
                  />
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary rounded-full"
                    />
                  </div>
                  
                  <div className="text-right mb-6">
                    <span className="text-sm font-medium text-accent">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  {/* Component Loading Status */}
                  <div className="space-y-3">
                    {loadingItems.map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          {item.loaded ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center space-x-1 text-accent"
                            >
                              <Check className="h-4 w-4" />
                              <span className="text-xs">Loaded</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-muted-foreground/50 text-xs"
                            >
                              Loading...
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              // Frame 2: Ready to Enter
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md mx-auto px-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="text-6xl mb-4">✨</div>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl text-foreground"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Tap anywhere to enter
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}