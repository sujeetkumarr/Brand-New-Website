import { useState, useEffect } from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer'; // Import the new hook
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

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState({
    dom: false,
    images: false,
    threeJs: false,
  });

  const audio = useAudioPlayer();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Asset loading logic...
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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleEnterSite = () => {
    audio.startPlaying();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingScreen
        isVisible={isLoading}
        onComplete={() => setIsLoading(false)}
        onEnter={handleEnterSite}
        componentsLoaded={componentsLoaded}
      />

      {!isLoading && (
        <Header
          isDark={isDark}
          onThemeToggle={toggleTheme}
          isAudioPlaying={audio.isPlaying}
          onAudioToggle={audio.togglePlayPause}
          onShowCVModal={() => setShowCVModal(true)}
          onNextTrack={audio.nextTrack}
          volume={audio.volume}
          onVolumeChange={audio.setVolume}
          currentTrackTitle={audio.currentTrackTitle}
        />
      )}

      <main>
        <Hero
          onScrollToContact={scrollToContact}
          onShowCVModal={() => setShowCVModal(true)}
          onHeroReady={() => setComponentsLoaded(prev => ({ ...prev, threeJs: true }))}
        />
        <ScrollVelocitySection />
        <About />
        <Testimonials />
        <Education />
        <Experience />
        <Skills />
        <Contact onShowCVModal={() => setShowCVModal(true)} />
      </main>

      <Footer />
      <CVModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
    </div>
  );
}
