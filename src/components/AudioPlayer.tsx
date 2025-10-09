import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  hasUserInteracted: boolean;
  onTrackChange?: () => void;
}

// Classical Indian music tracks from Internet Archive (copyright-free)
const AUDIO_TRACKS = [
  {
    url: 'https://github.com/sujeetkumarr/mrkadam.tech/raw/refs/heads/main/assets/Aaye%20Na%20Balam%20-%20Thumri(MP3_160K).mp3',
    title: 'Aaye Na Balam - Thumri'
  },
  {
    url: 'https://github.com/sujeetkumarr/mrkadam.tech/raw/refs/heads/main/assets/Abdul%20Karim%20Khan%20_%20Phagwa%20Brij%20Dekhanko%20(Raga%20Basabt)(MP3_160K).mp3',
    title: 'Abdul Karim Khan - Phagwa Brij Dekhanko'
  },
  {
    url: 'https://github.com/sujeetkumarr/mrkadam.tech/raw/refs/heads/main/assets/Pandit%20Bhimsen%20Joshi%20-%20Explosive%20Performance%20-%201971%20-%20Miyan%20ki%20Malhar(MP3_160K).mp3',
    title: 'Pandit Bhimsen Joshi - Miyan ki Malhar'
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
  const [shuffledTracks] = useState(() => shuffleArray(AUDIO_TRACKS));
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
    
    // Start with first shuffled track
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
      // Move to next track in shuffled order
      const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
      setCurrentTrackIndex(nextIndex);
      onTrackChange?.();
    };

    const handleError = (e: Event) => {
      console.error('❌ Audio error:', e);
      // Try next track on error
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
      
      // Safely stop any pending play promises
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
      audio.pause();
      audio.src = '';
    };
  }, []); // Only run once on mount

  // Update track when index changes
  useEffect(() => {
    if (!audioRef.current || currentTrackIndex === 0) return; // Skip initial load
    
    const audio = audioRef.current;
    const shouldAutoPlay = isPlaying && hasUserInteracted && wasPlayingRef.current;
    
    isChangingTrackRef.current = true;
    setIsLoaded(false);
    
    // Wait for any pending play promises to complete
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          audio.pause();
          audio.src = shuffledTracks[currentTrackIndex].url;
          audio.load();
          
          if (shouldAutoPlay) {
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
        })
        .catch(() => {
          audio.pause();
          audio.src = shuffledTracks[currentTrackIndex].url;
          audio.load();
        });
    } else {
      audio.pause();
      audio.src = shuffledTracks[currentTrackIndex].url;
      audio.load();
      
      if (shouldAutoPlay) {
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
    }
  }, [currentTrackIndex, shuffledTracks, isPlaying, hasUserInteracted]);

  // Handle play/pause based on user preference and interaction
  useEffect(() => {
    if (!audioRef.current || !isLoaded || isChangingTrackRef.current) return;

    const audio = audioRef.current;
    const wasPlaying = wasPlayingRef.current;

    // Only attempt to play if user has interacted with the page
    if (isPlaying && hasUserInteracted) {
      // If transitioning from paused to playing, switch to random track
      if (!wasPlaying && attemptedPlayRef.current) {
        const randomIndex = Math.floor(Math.random() * shuffledTracks.length);
        console.log('🔀 Switching to random track:', shuffledTracks[randomIndex].title);
        setCurrentTrackIndex(randomIndex);
        onTrackChange?.();
        return; // Let the track change effect handle playing
      }
      
      if (!attemptedPlayRef.current) {
        attemptedPlayRef.current = true;
      }
      
      // Wait for any pending operations
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            const promise = audio.play();
            if (promise) {
              playPromiseRef.current = promise;
              promise.catch((error) => {
                if (error.name !== 'AbortError') {
                  console.log('🔇 Autoplay prevented:', error.message);
                }
              });
            }
          })
          .catch(() => {
            const promise = audio.play();
            if (promise) {
              playPromiseRef.current = promise;
              promise.catch((error) => {
                if (error.name !== 'AbortError') {
                  console.log('🔇 Autoplay prevented:', error.message);
                }
              });
            }
          });
      } else {
        const promise = audio.play();
        if (promise) {
          playPromiseRef.current = promise;
          promise.catch((error) => {
            if (error.name !== 'AbortError') {
              console.log('🔇 Autoplay prevented:', error.message);
            }
          });
        }
      }
    } else {
      // Pause - wait for pending play promises
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
  }, [isPlaying, hasUserInteracted, isLoaded, shuffledTracks]);

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
