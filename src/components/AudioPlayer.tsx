import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  hasUserInteracted: boolean;
  onTrackChange?: () => void;
}

// CRITICAL FIX: URLs cleaned to use the standard, stable raw.githubusercontent.com/user/repo/main/path format.
const AUDIO_TRACKS = [
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/aaye-na-balam.mp3',
    title: 'Aaye Na Balam - Thumri'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/abdul-karim-khan-phagwa.mp3',
    title: 'Abdul Karim Khan - Phagwa Brij Dekhanko'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/ghei-chhand.mp3',
    title: 'Ghei Chand Makrand'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/hamri-atariya-pe-aao.mp3',
    title: 'Hamari Atariya Pe'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/mi-radhika.mp3',
    title: 'Mi Radhika'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/pandit-bhimsen-joshi-miyan-ki-malhar.mp3',
    title: 'Miyan ki malhar'
  },
  {
    url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/thumri-naina-more.mp3',
    title: 'Naina More Tabas Gaye'
  }
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

export function AudioPlayer({ isPlaying, onPlayStateChange, hasUserInteracted, onTrackChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Shuffled once on load, tracks list remains constant
  const [shuffledTracks] = useState(() => shuffleArray(AUDIO_TRACKS));
  // currentTrackIndex determines which track is currently loaded/playing
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); 
  
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptedPlayRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isChangingTrackRef = useRef(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.25; // 25% volume - subtle background music
    audio.preload = 'metadata';
    
    // Start with the first track from the shuffled list
    audio.src = shuffledTracks[0].url;
    audioRef.current = audio;

    // Event listeners
    const handleCanPlay = () => {
      setIsLoaded(true);
      console.log('🎵 Audio ready:', shuffledTracks[currentTrackIndex].title);
      isChangingTrackRef.current = false;
    };

    const handlePlay = () => {
      console.log('▶️ Playing:', shuffledTracks[currentTrackIndex].title);
      wasPlayingRef.current = true;
      onPlayStateChange?.(true);
    };

    const handlePause = () => {
      console.log('⏸️ Paused');
      wasPlayingRef.current = false;
      onPlayStateChange?.(false);
    };

    const handleEnded = () => {
      console.log('🔄 Track ended, playing next...');
      // Move to next track in shuffled order (this triggers the track-change useEffect)
      const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
      setCurrentTrackIndex(nextIndex);
      onTrackChange?.();
    };

    const handleError = (e: Event) => {
      // FIX: Improved error context for debugging bad URLs
      console.error('❌ Audio error: Failed to load file. URL may be incorrect or inaccessible.', e); 
      // Try next track on error to avoid getting stuck
      const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
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
      
      // Cleanup
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
      audio.pause();
      audio.src = '';
    };
  }, []); // Only run once on mount

  // useEffect to handle track change (Called when currentTrackIndex state changes)
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    // We only auto-play if we were playing before and user has interacted
    const shouldAutoPlay = isPlaying && hasUserInteracted && wasPlayingRef.current;
    
    isChangingTrackRef.current = true;
    setIsLoaded(false);
    
    // Logic to load and potentially play the new track source
    const loadAndPlayTrack = () => {
      audio.pause();
      console.log('Loading new track from URL:', shuffledTracks[currentTrackIndex].url); 
      audio.src = shuffledTracks[currentTrackIndex].url;
      audio.load();
      
      if (shouldAutoPlay) {
        // Wait for the new track to be ready before playing
        audio.addEventListener('canplay', function playOnReady() {
          audio.removeEventListener('canplay', playOnReady);
          const promise = audio.play();
          if (promise) {
            playPromiseRef.current = promise;
            promise.catch((error) => {
              if (error.name !== 'AbortError') {
                console.log('🔇 Play prevented:', error.message);
              }
            });
          }
        }, { once: true });
      }
    };

    // Ensure any pending promises are resolved before changing the source
    if (playPromiseRef.current) {
      playPromiseRef.current.then(loadAndPlayTrack).catch(loadAndPlayTrack);
    } else {
      loadAndPlayTrack();
    }
  }, [currentTrackIndex, shuffledTracks, isPlaying, hasUserInteracted]);

  // Handle play/pause based on user preference and interaction (The random switch logic)
  useEffect(() => {
    if (!audioRef.current || !isLoaded || isChangingTrackRef.current) return;

    const audio = audioRef.current;
    const wasPlaying = wasPlayingRef.current;

    // Only attempt to play if user has interacted with the page
    if (isPlaying && hasUserInteracted) {
      // FIX: Implement Random Track Switch on Pause -> Play transition
      if (!wasPlaying && attemptedPlayRef.current) {
        const randomIndex = Math.floor(Math.random() * shuffledTracks.length);
        
        // Ensure we don't pick the exact same index if we can avoid it
        if (shuffledTracks.length > 1 && randomIndex === currentTrackIndex) {
            const newIndex = (randomIndex + 1) % shuffledTracks.length;
            setCurrentTrackIndex(newIndex);
        } else {
            setCurrentTrackIndex(randomIndex);
        }
        
        console.log('🔀 Triggered Random Track Switch.');
        onTrackChange?.();
        return; // The index change will trigger the track-change useEffect above
      }
      
      if (!attemptedPlayRef.current) {
        attemptedPlayRef.current = true;
      }
      
      // Regular play attempt (wait for any pending loads)
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            const promise = audio.play();
            if (promise) {
              playPromiseRef.current = promise;
              promise.catch(() => {});
            }
          })
          .catch(() => {
            const promise = audio.play();
            if (promise) {
              playPromiseRef.current = promise;
              promise.catch(() => {});
            }
          });
      } else {
        const promise = audio.play();
        if (promise) {
          playPromiseRef.current = promise;
          promise.catch(() => {});
        }
      }
    } else {
      // Pause
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            audio.pause();
            playPromiseRef.current = null;
          })
          .catch(() => {
            audio.pause();
            playPromiseRef.current = null;
          });
      } else {
        audio.pause();
      }
      
      if (wasPlaying) {
        attemptedPlayRef.current = true; // Mark that we've played before
      }
    }
  }, [isPlaying, hasUserInteracted, isLoaded, shuffledTracks, currentTrackIndex, onTrackChange]);

  // Handle page visibility - pause when user leaves the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        // User left the page - pause audio
        console.log('👋 User left page - pausing audio');
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => audioRef.current?.pause())
            .catch(() => audioRef.current?.pause());
        } else {
          audioRef.current.pause();
        }
      } else if (isPlaying && hasUserInteracted && !isChangingTrackRef.current) {
        // User returned - resume if it should be playing
        console.log('👀 User returned - resuming audio');
        const promise = audioRef.current.play();
        if (promise) {
          playPromiseRef.current = promise;
          promise.catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Error resuming audio:', error);
            }
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, hasUserInteracted]);

  // This component doesn't render anything - it's an invisible audio controller
  return null;
}
