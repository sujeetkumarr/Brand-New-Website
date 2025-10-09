import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// 1. IMPORT YOUR AUDIO FILES HERE (Must match files in src/assets/music)
import trackMiRadhika from '@/assets/music/mi-radhika.mp3';
import trackHamriAtariya from '@/assets/music/hamri-atariya-pe-aao.mp3';
import trackGheiChhand from '@/assets/music/ghei-chhand.mp3';
import trackAbdulKarim from '@/assets/music/abdul-karim-khan-phagwa.mp3';
import trackAayeNaBalam from '@/assets/music/aaye-na-balam.mp3';
import trackThumriNaina from '@/assets/music/thumri-naina-more.mp3';
import trackBhimsen from '@/assets/music/pandit-bhimsen-joshi-miyan-ki-malhar.mp3';
// --------------------------------------------------------------------

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  hasUserInteracted: boolean;
}

export interface Track {
  url: string;
  title: string;
}

// Full, static track list
const STATIC_AUDIO_TRACKS: Track[] = [
  { url: trackMiRadhika, title: 'Mi Radhika - Shridhar Phadke' },
  { url: trackHamriAtariya, title: 'Hamri Atariya Pe Aao - Dadra' },
  { url: trackGheiChhand, title: 'Ghei Chhand - Katyar Kaljat Ghusli' },
  { url: trackAbdulKarim, title: 'Abdul Karim Khan - Phagwa Brij Dekhanko' },
  { url: trackAayeNaBalam, title: 'Aaye Na Balam - Thumri' },
  { url: trackThumriNaina, title: 'Thumri Naina More Tabas Rahe - Ustad Ghulam Ali Khan' },
  { url: trackBhimsen, title: 'Pandit Bhimsen Joshi - Miyan ki Malhar' },
];

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- Singleton Context for External Controls ---
const AudioControlsContext = (function() {
  let audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  let shuffledTracksRef: React.MutableRefObject<Track[]>;
  let currentTrackIndexRef: React.MutableRefObject<number>;
  let setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  let isPlayingRef: React.MutableRefObject<boolean>;

  const playPromiseRef = useRef<Promise<void> | null>(null);

  const safePlay = (audio: HTMLAudioElement) => {
    const promise = audio.play();
    if (promise) {
      playPromiseRef.current = promise;
      promise.catch((error) => {
        if (error.name !== 'AbortError') {
          console.log('🔇 Play prevented:', error.message);
        }
      });
    }
  };

  const playNext = () => {
    if (!audioRef.current || !isPlayingRef.current) return;
    const nextIndex = (currentTrackIndexRef.current + 1) % shuffledTracksRef.current.length;
    setCurrentTrackIndex(nextIndex);
  };

  const playPrev = () => {
    if (!audioRef.current || !isPlayingRef.current) return;
    const prevIndex = (currentTrackIndexRef.current - 1 + shuffledTracksRef.current.length) % shuffledTracksRef.current.length;
    setCurrentTrackIndex(prevIndex);
  };

  return {
    init: (
      aRef: React.MutableRefObject<HTMLAudioElement | null>,
      sRef: React.MutableRefObject<Track[]>,
      cRef: React.MutableRefObject<number>,
      sC: React.Dispatch<React.SetStateAction<number>>,
      iPRef: React.MutableRefObject<boolean>
    ) => {
      audioRef = aRef;
      shuffledTracksRef = sRef;
      currentTrackIndexRef = cRef;
      setCurrentTrackIndex = sC;
      isPlayingRef = iPRef;
    },
    playNext,
    playPrev,
    safePlay,
    trackList: STATIC_AUDIO_TRACKS,
  };
})();

export function useAudioControls() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentIndex, setIndex] = useState(0);

  // Poll for changes in the internal player state
  useEffect(() => {
    const updateState = () => {
      setCurrentTrack(AudioControlsContext.trackList[AudioControlsContext.currentTrackIndexRef?.current || 0] || null);
      setIndex(AudioControlsContext.currentTrackIndexRef?.current || 0);
    };

    // Update once immediately
    updateState();

    // Set up a listener for continuous updates (re-using AudioPlayer's component logic)
    const interval = setInterval(updateState, 500); // Poll every half second
    return () => clearInterval(interval);

  }, [AudioControlsContext.trackList]);

  const controls = useMemo(() => ({
    ...AudioControlsContext,
    currentTrack,
    currentIndex,
  }), [currentTrack, currentIndex]);


  return controls;
}
// ---------------------------------------------


export function AudioPlayer({ isPlaying, onPlayStateChange, hasUserInteracted }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [shuffledTracks] = useState(() => shuffleArray(STATIC_AUDIO_TRACKS));
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptedPlayRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isChangingTrackRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  
  isPlayingRef.current = isPlaying;

  // Initialize context for external control
  const currentTrackIndexRef = useRef(currentTrackIndex);
  currentTrackIndexRef.current = currentTrackIndex;

  const shuffledTracksRef = useRef(shuffledTracks);
  shuffledTracksRef.current = shuffledTracks;

  AudioControlsContext.init(audioRef, shuffledTracksRef, currentTrackIndexRef, setCurrentTrackIndex, isPlayingRef);

  const safePlay = (audio: HTMLAudioElement) => {
    const promise = audio.play();
    if (promise) {
      playPromiseRef.current = promise;
      promise.catch((error) => {
        if (error.name !== 'AbortError') {
          console.log('🔇 Play prevented:', error.message);
        }
      });
    }
  };

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.25; // 25% volume - subtle background music
    audio.preload = 'metadata';
    
    // Start with first shuffled track
    audio.src = shuffledTracks[0].url;
    audioRef.current = audio;

    // Event listeners
    const handleCanPlay = () => {
      setIsLoaded(true);
      isChangingTrackRef.current = false;
    };

    const handlePlay = () => {
      wasPlayingRef.current = true;
      onPlayStateChange?.(true);
    };

    const handlePause = () => {
      wasPlayingRef.current = false;
      onPlayStateChange?.(false);
    };

    const handleEnded = () => {
      // Move to next track in shuffled order
      const nextIndex = (currentTrackIndexRef.current + 1) % shuffledTracks.current.length;
      setCurrentTrackIndex(nextIndex);
    };

    const handleError = (e: Event) => {
      console.error('❌ Audio error:', e);
      // Try next track on error
      const nextIndex = (currentTrackIndexRef.current + 1) % shuffledTracks.current.length;
      setCurrentTrackIndex(nextIndex);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
      audio.pause();
      audio.src = '';
    };
  }, []); 

  // Update track when index changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    const shouldAutoPlay = isPlaying && hasUserInteracted && wasPlayingRef.current;
    
    isChangingTrackRef.current = true;
    setIsLoaded(false);
    
    // Use the exposed safePlay function from the context for simplicity
    const handleTrackChange = () => {
        audio.pause();
        audio.src = shuffledTracks[currentTrackIndex].url;
        audio.load();
        
        if (shouldAutoPlay) {
          audio.addEventListener('canplay', function playOnReady() {
            audio.removeEventListener('canplay', playOnReady);
            safePlay(audio);
          }, { once: true });
        }
    };

    // Ensure previous play promise is settled before changing track
    if (playPromiseRef.current) {
      playPromiseRef.current.then(handleTrackChange).catch(handleTrackChange);
    } else {
      handleTrackChange();
    }
    
  }, [currentTrackIndex, shuffledTracks, isPlaying, hasUserInteracted]);

  // Handle play/pause based on user preference and interaction
  useEffect(() => {
    if (!audioRef.current || !isLoaded || isChangingTrackRef.current) return;

    const audio = audioRef.current;
    const wasPlaying = wasPlayingRef.current;

    if (isPlaying && hasUserInteracted) {
      // If transitioning from paused to playing, switch to random track for variety
      if (!wasPlaying && attemptedPlayRef.current) {
        const randomIndex = Math.floor(Math.random() * shuffledTracks.length);
        setCurrentTrackIndex(randomIndex);
        return; // Let the track change effect handle playing
      }
      
      if (!attemptedPlayRef.current) {
        attemptedPlayRef.current = true;
      }
      
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => safePlay(audio)).catch(() => safePlay(audio));
      } else {
        safePlay(audio);
      }
    } else {
      // Pause
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          audio.pause();
          playPromiseRef.current = null;
        }).catch(() => {
          audio.pause();
          playPromiseRef.current = null;
        });
      } else {
        audio.pause();
      }
      
      if (wasPlaying) {
        attemptedPlayRef.current = true;
      }
    }
  }, [isPlaying, hasUserInteracted, isLoaded, shuffledTracks]);

  // Handle page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => audioRef.current?.pause()).catch(() => audioRef.current?.pause());
        } else {
          audioRef.current.pause();
        }
      } else if (isPlayingRef.current && hasUserInteracted && !isChangingTrackRef.current) {
        safePlay(audioRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hasUserInteracted]);

  return null;
}
