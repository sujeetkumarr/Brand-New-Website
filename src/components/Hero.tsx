import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { siteContent } from '../data/content';
import LiquidEther from './LiquidEther';
import CircularText from './CircularText';
import { ChevronDown } from 'lucide-react';
import portraitImage from 'figma:asset/50937da2023f484c302aad0a44100f2a514a3199.png';

interface HeroProps {
  onScrollToContact: () => void;
  onShowCVModal: () => void;
  isDark: boolean;
  onHeroReady?: () => void;
}

export function Hero({ onScrollToContact, onShowCVModal, isDark, onHeroReady }: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Check if mobile device
    const isMobileDevice = window.matchMedia('(pointer: coarse)').matches || 
                          window.innerWidth < 768 ||
                          navigator.deviceMemory < 4;
    setIsMobile(isMobileDevice);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Notify when Hero is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      onHeroReady?.();
    }, 1000); // Give LiquidEther time to initialize

    return () => clearTimeout(timer);
  }, [onHeroReady]);

  const handlePrimaryCTA = () => {
    onScrollToContact();
  };

  const handleSecondaryCTA = () => {
    onScrollToContact();
    setTimeout(() => {
      onShowCVModal();
    }, 800);
  };

  const renderBackground = () => {
    // LiquidEther colors based on theme
    const etherColors = isDark 
      ? ['#5227FF', '#00ff88', '#8b5cf6'] // Dark theme: purple, green, violet
      : ['#8b5cf6', '#00ff88', '#f59e0b']; // Light theme: violet, green, amber

    return (
      <div className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'auto' }}>
        <LiquidEther
          colors={etherColors}
          mouseForce={35}
          cursorSize={45}
          isViscous={true}
          viscous={8}
          iterationsViscous={20}
          iterationsPoisson={20}
          dt={0.016}
          BFECC={true}
          resolution={isMobile ? 0.35 : 0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2.5}
          takeoverDuration={0.6}
          autoResumeDelay={3500}
          autoRampDuration={1.5}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        />
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 grid-overlay">
      {/* Background - Dither or Mobile Fallback */}
      {renderBackground()}
      
      {/* Decorative Circular Text - Top Left */}
      <div className="hidden lg:block absolute top-24 left-8 pointer-events-auto opacity-25 z-20">
        <CircularText 
          text="STRATEGY • BRANDING • MARKETING • " 
          spinDuration={20}
          onHover="goBonkers"
          className="w-40 h-40"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 border border-accent/30 mb-8"
          >
            <span className="text-sm font-mono text-accent font-medium">
              Hi, my name is
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="font-black mb-4"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff88 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              fontSize: 'clamp(2.5rem, 8vw, 6.5rem)'
            }}
          >
            <div>Sujeetkumar</div>
            <div>Kadam</div>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-8 font-mono tracking-wider"
          >
            <span className="text-accent-secondary">[</span>
            <span className="text-muted-foreground">but you can just call me </span>
            <span className="text-accent font-medium">Sujeet</span>
            <span className="text-accent-secondary">]</span>
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-16 max-w-4xl mx-auto leading-tight font-light"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {siteContent.home.hero.tagline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center pointer-events-auto"
          >
            <Button
              onClick={handlePrimaryCTA}
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-105"
            >
              {siteContent.home.hero.primary_cta.label}
            </Button>
            
            <Button
              onClick={handleSecondaryCTA}
              variant="outline"
              className="border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-white px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-secondary/25"
            >
              {siteContent.home.hero.secondary_cta.label}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Arrow - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto z-20"
        >
          <button
            onClick={() => {
              const aboutSection = document.querySelector('#about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            aria-label="Scroll to next section"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}