import { Play, Pause, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const WELCOME_SESSION_KEY = 'musicWelcomeMessageSeen';

interface AudioControllerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  currentTrackTitle: string;
}

export function AudioController({
  isPlaying,
  onPlayPause,
  onNext,
  volume,
  onVolumeChange,
  currentTrackTitle,
}: AudioControllerProps) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    const hasSeenMessage = sessionStorage.getItem(WELCOME_SESSION_KEY);
    if (!hasSeenMessage) {
      setShowWelcomeMessage(true);
      const timer = setTimeout(() => {
        handleCloseWelcome();
      }, 10000); // Auto-dismiss after 10 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeMessage(false);
    sessionStorage.setItem(WELCOME_SESSION_KEY, 'true');
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.5) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-lg border bg-background/80 p-2 shadow-lg backdrop-blur-md">
        {/* Controls */}
        <Button variant="ghost" size="icon" onClick={onPlayPause} className="h-9 w-9">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext} className="h-9 w-9">
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Track Title & Volume */}
        <div className="flex flex-col gap-1">
          <p className="w-36 truncate text-xs font-medium">{currentTrackTitle}</p>
          <div className="flex items-center gap-2">
            {getVolumeIcon()}
            <Slider
              defaultValue={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => onVolumeChange(value[0] / 100)}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showWelcomeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="absolute top-full right-0 mt-2 w-64 rounded-lg border bg-card p-3 text-left shadow-xl"
          >
            <button
              onClick={handleCloseWelcome}
              className="absolute top-1 right-1 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close message"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>
            <p className="text-xs font-medium text-foreground pr-4">
              🎵 Timeless Indian Classics
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted-foreground pr-4">
              These melodies from a golden era are a personal source of peace and inspiration. Enjoy!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
