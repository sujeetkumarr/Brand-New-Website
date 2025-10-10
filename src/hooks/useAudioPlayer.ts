import { useState, useEffect, useRef, useCallback } from 'react';

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

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracks = useRef(shuffleArray(AUDIO_TRACKS));
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackTitle, setCurrentTrackTitle] = useState(tracks.current[0].title);
  const [volume, setVolumeState] = useState(0.25);
  const trackIndexRef = useRef(0);
  const hasUserInteractedRef = useRef(false);

  const loadTrack = useCallback((shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    const track = tracks.current[trackIndexRef.current];
    audio.src = track.url;
    audio.load();
    setCurrentTrackTitle(track.title);

    if (shouldPlay) {
      audio.play().catch(e => console.warn("Autoplay was prevented:", e));
    }
  }, []);

  const nextTrack = useCallback(() => {
    const wasPlaying = !audioRef.current?.paused;
    trackIndexRef.current = (trackIndexRef.current + 1) % tracks.current.length;
    loadTrack(wasPlaying);
  }, [loadTrack]);

  const togglePlayPause = useCallback(() => {
    if (!hasUserInteractedRef.current) {
      hasUserInteractedRef.current = true;
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(e => console.warn("Play was prevented:", e));
    } else {
      audio.pause();
    }
  }, []);
  
  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
        audioRef.current.volume = newVolume;
        setVolumeState(newVolume);
    }
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const onEnded = () => nextTrack();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    loadTrack(false); // Load the first track without playing

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
    };
  }, [loadTrack, nextTrack]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        audioRef.current?.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  return {
    isPlaying,
    currentTrackTitle,
    volume,
    togglePlayPause,
    nextTrack,
    setVolume,
    startPlaying: () => {
        if (!hasUserInteractedRef.current) {
            hasUserInteractedRef.current = true;
            togglePlayPause(); // Start playback on first interaction
        }
    }
  };
};
