import { Play, Pause, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';

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
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <div
        className="flex items-center gap-4 rounded-lg border bg-background/80 p-3 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPlayPause} className="h-10 w-10">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="h-10 w-10">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col">
          <p className="w-36 truncate text-sm font-medium">{currentTrackTitle}</p>
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
    </motion.div>
  );
}
