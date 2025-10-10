import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  hasUserInteracted: boolean;
  onTrackChange?: () => void;
  onTitleChange?: (title: string) => void;
  triggerNextTrack?: number;
  volume: number;
}

const AUDIO_TRACKS = [
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/aaye-na-balam.mp3', title: 'Aaye Na Balam - Thumri' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/abdul-karim-khan-phagwa.mp3', title: 'Abdul Karim Khan - Phagwa Brij Dekhanko' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/ghei-chhand.mp3', title: 'Ghei Chand Makrand' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/hamri-atariya-pe-aao.mp3', title: 'Hamari Atariya Pe' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/mi-radhika.mp3', title: 'Mi Radhika' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/pandit-bhimsen-joshi-miyan-ki-malhar.mp3', title: 'Miyan ki malhar' },
  { url: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/music~/thumri-naina-more.mp3', title: 'Naina More Tabas Gaye' }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function AudioPlayer({ 
  isPlaying, 
  onPlayStateChange, 
  hasUserInteracted, 
  onTrackChange,
  onTitleChange,
  triggerNextTrack,
  volume 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [shuffledTracks] = useState(() => shuffleArray(AUDIO_TRACKS));
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); 
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptedPlayRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isChangingTrackRef = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.preload = 'metadata';
    audio.src = shuffledTracks[0].url;
    audioRef.current = audio;

    const handleCanPlay = () => { setIsLoaded(true); isChangingTrackRef.current = false; };
    const handlePlay = () => { wasPlayingRef.current = true; onPlayStateChange?.(true); };
    const handlePause = () => { wasPlayingRef.current = false; onPlayStateChange?.(false); };
    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
      setCurrentTrackIndex(nextIndex);
      onTrackChange?.();
    };
    const handleError = (e: Event) => {
      console.error('❌ Audio error: Failed to load file. Check URL.', e); 
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
      if (playPromiseRef.current) playPromiseRef.current.catch(() => {});
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const shouldAutoPlay = isPlaying && hasUserInteracted && wasPlayingRef.current;
    isChangingTrackRef.current = true;
    setIsLoaded(false);

    const loadAndPlayTrack = () => {
      audio.pause();
      audio.src = shuffledTracks[currentTrackIndex].url;
      audio.load();
      if (shouldAutoPlay) {
        audio.addEventListener('canplay', function playOnReady() {
          audio.removeEventListener('canplay', playOnReady);
          const promise = audio.play();
          if (promise) {
            playPromiseRef.current = promise;
            promise.catch(err => err.name !== 'AbortError' && console.log('🔇 Play prevented:', err.message));
          }
        }, { once: true });
      }
    };
    if (playPromiseRef.current) playPromiseRef.current.then(loadAndPlayTrack).catch(loadAndPlayTrack);
    else loadAndPlayTrack();
  }, [currentTrackIndex, shuffledTracks]);

  useEffect(() => {
    if (!audioRef.current || !isLoaded || isChangingTrackRef.current) return;
    const audio = audioRef.current;
    if (isPlaying && hasUserInteracted) {
      if (!wasPlayingRef.current && attemptedPlayRef.current) {
        const randomIndex = Math.floor(Math.random() * shuffledTracks.length);
        setCurrentTrackIndex(shuffledTracks.length > 1 && randomIndex === currentTrackIndex ? (randomIndex + 1) % shuffledTracks.length : randomIndex);
        onTrackChange?.();
        return;
      }
      if (!attemptedPlayRef.current) attemptedPlayRef.current = true;
      const promise = audio.play();
      if (promise) {
        playPromiseRef.current = promise;
        promise.catch(err => err.name !== 'AbortError' && console.log('🔇 Autoplay prevented:', err.message));
      }
    } else {
      audio.pause();
      if (wasPlayingRef.current) attemptedPlayRef.current = true;
    }
  }, [isPlaying, hasUserInteracted, isLoaded]);

  // **FIX STARTS HERE**
  useEffect(() => {
    const wasPlayingBeforeHide = { current: false };

    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        // Tab is now hidden. Check if audio is playing and store that state.
        if (!audioRef.current.paused) {
          wasPlayingBeforeHide.current = true;
          audioRef.current.pause(); // Directly pause the audio
        }
      } else {
        // Tab is now visible. If it was playing before we left, resume it.
        if (wasPlayingBeforeHide.current) {
          const promise = audioRef.current.play(); // Directly play the audio
          if (promise) {
            promise.catch((error) => {
              if (error.name !== 'AbortError') {
                console.error('Error resuming audio on tab focus:', error);
              }
            });
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []); // This effect runs once and manages its own state, preventing conflicts.
  // **FIX ENDS HERE**

  useEffect(() => {
    if (triggerNextTrack > 0) {
      const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
      setCurrentTrackIndex(nextIndex);
    }
  }, [triggerNextTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    onTitleChange?.(shuffledTracks[currentTrackIndex].title);
  }, [currentTrackIndex, onTitleChange, shuffledTracks]);

  return null;
}
