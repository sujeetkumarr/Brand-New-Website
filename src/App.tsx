import { useState, useEffect } from 'react';
import { useScrollingTitle } from './hooks/useScrollingTitle'; // Import the new hook
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollVelocitySection } from './components/ScrollVelocitySection';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { LoadingScreen } from './components/LoadingScreen';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const scrollingTitleText = "Sujeetkumar Kadam • Marketing & Strategy Consultant • Living at the intersection of branding, strategy, and culture • ";
  useScrollingTitle(scrollingTitleText, 250);

  const [isDark, setIsDark] = useState(true);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState({
    dom: false,
    images: false,
    threeJs: false
  });
  const [currentTrackTitle, setCurrentTrackTitle] = useState('');
  const [triggerNextTrack, setTriggerNextTrack] = useState(0);
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const domTimer = setTimeout(() => setComponentsLoaded(prev => ({ ...prev, dom: true })), 500);
    const imagePromises = Array.from(document.querySelectorAll('img')).map(img => 
      !img.complete ? new Promise(resolve => { img.onload = img.onerror = resolve; }) : Promise.resolve()
    );
    Promise.all(imagePromises).then(() => setComponentsLoaded(prev => ({ ...prev, images: true })));
    const threeJsTimer = setTimeout(() => setComponentsLoaded(prev => ({ ...prev, threeJs: true })), 2000);
    return () => { clearTimeout(domTimer); clearTimeout(threeJsTimer); };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleAudio = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    if (!hasUserInteracted) setHasUserInteracted(true);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowCVModal = () => setShowCVModal(true);
  const handleLoadingComplete = () => setIsLoading(false);
  const handleNextTrack = () => setTriggerNextTrack(c => c + 1);

  const handleEnterSite = () => {
    setHasUserInteracted(true);
    const savedAudioPref = sessionStorage.getItem('audioPlaying');
    if (savedAudioPref === null || JSON.parse(savedAudioPref)) {
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen 
        isVisible={isLoading} 
        onComplete={handleLoadingComplete}
        onEnter={handleEnterSite}
        componentsLoaded={componentsLoaded}
      />

      <AudioPlayer 
        isPlaying={isAudioPlaying}
        onPlayStateChange={setIsAudioPlaying}
        hasUserInteracted={hasUserInteracted}
        onTitleChange={setCurrentTrackTitle}
        triggerNextTrack={triggerNextTrack}
        volume={volume}
      />

      {!isLoading && (
        <Header 
          isDark={isDark} 
          onThemeToggle={toggleTheme}
          isAudioPlaying={isAudioPlaying}
          onAudioToggle={toggleAudio}
          onShowCVModal={handleShowCVModal}
          onNextTrack={handleNextTrack}
          volume={volume}
          onVolumeChange={setVolume}
          currentTrackTitle={currentTrackTitle}
        />
      )}
      
      <main>
        <Hero 
          onScrollToContact={scrollToContact}
          onShowCVModal={handleShowCVModal}
          isDark={isDark}
          onHeroReady={() => setComponentsLoaded(prev => ({ ...prev, threeJs: true }))}
        />
        <ScrollVelocitySection />
        <About />
        <Testimonials />
        <Education />
        <Experience />
        <Skills />
        <Contact onShowCVModal={handleShowCVModal} />
      </main>
      
      <Footer />
      <CVModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
    </div>
  );
}
