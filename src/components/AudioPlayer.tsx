import { useEffect, useRef } from 'react';

// --- PROPS INTERFACE ---
interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
  hasUserInteracted: boolean;
  onTitleChange: (title: string) => void;
  triggerNextTrack: number;
  volume: number;
}

// --- AUDIO TRACKS ---
const AUDIO_TRACKS = [
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/aaye-na-balam.mp3', title: 'Aaye Na Balam - Thumri' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/abdul-karim-khan-phagwa.mp3', title: 'Abdul Karim Khan - Phagwa Brij Dekhanko' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/ghei-chhand.mp3', title: 'Ghei Chand Makrand' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/hamri-atariya-pe-aao.mp3', title: 'Hamari Atariya Pe' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/mi-radhika.mp3', title: 'Mi Radhika' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/pandit-bhimsen-joshi-miyan-ki-malhar.mp3', title: 'Miyan ki malhar' },
    { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/thumri-naina-more.mp3', title: 'Naina More Tabas Gaye' }
];

// --- SHUFFLE UTILITY ---
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- THE COMPONENT ---
export function AudioPlayer({
  isPlaying,
  onPlayStateChange,
  hasUserInteracted,
  onTitleChange,
  triggerNextTrack,
  volume,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracksRef = useRef(shuffleArray(AUDIO_TRACKS));
  const trackIndexRef = useRef(0);

  // 1. Setup Audio Element and Event Listeners (Runs only once)
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleEnded = () => {
      // Autoplay next track when one finishes
      trackIndexRef.current = (trackIndexRef.current + 1) % tracksRef.current.length;
      loadTrack(true);
    };

    const handleError = (e: Event) => {
      console.error('Audio Player Error:', e);
      // Skip to next track on error
      trackIndexRef.current = (trackIndexRef.current + 1) % tracksRef.current.length;
      loadTrack(true);
    };
    
    // Bind events
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', () => onPlayStateChange(true));
    audio.addEventListener('pause', () => onPlayStateChange(false));

    // Initial track load
    loadTrack(false);

    // Cleanup on component unmount
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', () => onPlayStateChange(true));
      audio.removeEventListener('pause', () => onPlayStateChange(false));
      audio.pause();
    };
  }, []);

  // 2. Load and play a track
  const loadTrack = (shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    const track = tracksRef.current[trackIndexRef.current];
    audio.src = track.url;
    audio.load();
    onTitleChange(track.title);

    if (shouldPlay) {
      audio.addEventListener('canplaythrough', () => {
        audio.play().catch(e => console.error("Autoplay was prevented:", e));
      }, { once: true });
    }
  };

  // 3. Control Play/Pause based on state from App.tsx
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasUserInteracted) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Play was prevented:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, hasUserInteracted]);

  // 4. Handle "Next Track" command from controller
  useEffect(() => {
    if (triggerNextTrack > 0) { // triggerNextTrack is a counter that increments
      trackIndexRef.current = (trackIndexRef.current + 1) % tracksRef.current.length;
      loadTrack(isPlaying); // Play if it was already playing
    }
  }, [triggerNextTrack]);

  // 5. Handle Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // 6. Handle Tab Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (document.hidden) {
            // If tab is hidden, pause the audio
            if (!audio.paused) {
                audio.pause();
            }
        } else {
            // If tab is visible and it was supposed to be playing, resume it
            if (isPlaying) {
                audio.play().catch(e => console.error("Resume play was prevented:", e));
            }
        }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]); // Rerun this effect if isPlaying state changes


  return null; // This component is invisible
}
