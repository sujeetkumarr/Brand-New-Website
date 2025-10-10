import { Play, Pause, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'musicWelcomeBannerSeen';

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
    const hasSeenBanner = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenBanner) {
      setShowWelcomeMessage(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }, []);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.5) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-lg border bg-background/80 p-2 shadow-lg backdrop-blur-md">
        {/* Controls */}
        <Button variant="ghost" size="icon" onClick={onPlayPause} className="h-9 w-9">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext} className="h-9 w-9">
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Volume */}
        <div className="flex items-center gap-2">
          {getVolumeIcon()}
          <Slider
            defaultValue={[volume * 100]}
            max={100}
            step={1}
            className="w-20"
            onValueChange={(value) => onVolumeChange(value[0] / 100)}
          />
        </div>
      </div>
      <AnimatePresence>
        {showWelcomeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full right-0 mb-2 w-64 rounded-lg border bg-card p-3 text-left shadow-xl"
          >
            <p className="text-xs font-medium text-foreground">
              🎵 Grooving to timeless classics!
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
              Classical Indian melodies from a golden era. While I appreciate modern music, this is what brings me peace.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
