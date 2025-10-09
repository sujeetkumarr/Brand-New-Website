import { ArrowLeft, ArrowRight, Music, Pause, Play, VolumeX } from 'lucide-react';
import { Button } from '../components/ui/button'; // Adjusted path for clarity in new component
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card'; // Adjusted path
import { useAudioControls } from './AudioPlayer';

interface AudioControlsProps {
  isAudioPlaying: boolean;
  onAudioToggle: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

export function AudioControls({ isAudioPlaying, onAudioToggle, onThemeToggle, isDark }: AudioControlsProps) {
  const { playNext, playPrev, trackList, currentIndex } = useAudioControls();
  const currentTrack = trackList[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioPlaying) {
        playNext();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioPlaying) {
        playPrev();
    }
  };

  // The Trigger is the main music button visible in the header
  const TriggerButton = (
    <Button
      variant="ghost"
      size="sm"
      onClick={onAudioToggle}
      className="p-2"
      aria-label="Toggle background music"
      title={isAudioPlaying ? `Now Playing: ${currentTrack?.title}` : "Play background music"}
    >
      {isAudioPlaying ? (
        <Music className="h-4 w-4 text-accent" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        {TriggerButton}
      </HoverCardTrigger>
      
      <HoverCardContent 
        className="w-64 p-3 border-border/50 bg-card" 
        side="bottom" 
        align="start" 
        sideOffset={10}
      >
        <div className="space-y-3">
          {/* Track Info */}
          <div className="text-left">
            <p className="text-xs text-muted-foreground">
              {isAudioPlaying ? 'Now Playing' : 'Background Music Paused'}
            </p>
            <p className="text-sm font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
              {currentTrack?.title || 'Loading Tracks...'}
            </p>
            <p className="text-[10px] text-accent mt-1">
              Track {currentIndex + 1} of {trackList.length}
            </p>
          </div>

          {/* Controls and Theme Toggle */}
          <div className="flex items-center justify-between border-t border-border/50 pt-3">
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8"
                onClick={handlePrev}
                disabled={!isAudioPlaying}
                aria-label="Previous track"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="default" 
                size="icon" 
                className="size-8 bg-accent text-black hover:bg-accent/90"
                onClick={onAudioToggle}
                aria-label={isAudioPlaying ? "Pause" : "Play"}
              >
                {isAudioPlaying ? (
                    <Pause className="h-4 w-4" />
                ) : (
                    <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8"
                onClick={handleNext}
                disabled={!isAudioPlaying}
                aria-label="Next track"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Theme Toggle Button (Moved here for better grouping) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="size-8"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-4 w-4"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="m2 12h2"/><path d="m20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-4 w-4"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
