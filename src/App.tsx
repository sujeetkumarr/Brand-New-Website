import { useState, useEffect } from 'react';
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
import { WelcomeBanner } from './components/WelcomeBanner';

export default function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [showCVModal, setShowCVModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState({
    dom: false,
    images: false,
    threeJs: false
  });

  useEffect(() => {
    // Set dark theme as default
    document.documentElement.classList.add('dark');

    // DOM loaded
    const domTimer = setTimeout(() => {
      setComponentsLoaded(prev => ({ ...prev, dom: true }));
    }, 500);

    // Track when important images are loaded
    const imagePromises: Promise<void>[] = [];
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.complete) return;
      
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
      });
      imagePromises.push(promise);
    });

    Promise.all(imagePromises).then(() => {
      setComponentsLoaded(prev => ({ ...prev, images: true }));
    });

    // Wait for Three.js components (LiquidEther, DomeGallery)
    const threeJsTimer = setTimeout(() => {
      setComponentsLoaded(prev => ({ ...prev, threeJs: true }));
    }, 2000); // Give Three.js components time to initialize

    return () => {
      clearTimeout(domTimer);
      clearTimeout(threeJsTimer);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleAudio = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    localStorage.setItem('audioPlaying', JSON.stringify(newState));
    
    // Mark as interacted when user toggles audio
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowCVModal = () => {
    setShowCVModal(true);
  };

  // Note: Loading screen now handles its own completion state
  // It will show "ready to enter" when all components are loaded

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleEnterSite = () => {
    // Mark user as interacted
    setHasUserInteracted(true);
    
    // Auto-start music
    const savedAudioPref = localStorage.getItem('audioPlaying');
    if (savedAudioPref === null || JSON.parse(savedAudioPref) === true) {
      setIsAudioPlaying(true);
      localStorage.setItem('audioPlaying', 'true');
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

      {/* Background Audio Player */}
      <AudioPlayer 
        isPlaying={isAudioPlaying}
        onPlayStateChange={setIsAudioPlaying}
        hasUserInteracted={hasUserInteracted}
      />

      {/* Hide header during loading */}
      {!isLoading && (
        <Header 
          isDark={isDark} 
          onThemeToggle={toggleTheme}
          isAudioPlaying={isAudioPlaying}
          onAudioToggle={toggleAudio}
          onShowCVModal={handleShowCVModal}
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

      <CVModal 
        isOpen={showCVModal} 
        onClose={() => setShowCVModal(false)} 
      />

      <WelcomeBanner showAfterEnter={hasUserInteracted} />
    </div>
  );
}