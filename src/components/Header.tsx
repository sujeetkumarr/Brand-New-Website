import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX, SkipForward, FileText } from 'lucide-react';
import { useTracker } from '../hooks/useTracker'; // <--- Import Tracker

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  isAudioPlaying: boolean;
  onAudioToggle: () => void;
  onShowCVModal: () => void;
  onNextTrack: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  currentTrackTitle?: string;
}

export function Header({ 
  isDark, 
  onThemeToggle, 
  isAudioPlaying, 
  onAudioToggle,
  onShowCVModal,
  onNextTrack,
  volume,
  onVolumeChange,
  currentTrackTitle
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  // Initialize the tracker
  const { trackEvent } = useTracker();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      
      // Track navigation clicks if you want
      // trackEvent("Navigation", href);
    }
  };

  // Wrapper function to track the CV Click
  const handleCVClick = () => {
    trackEvent("Download CV", "Header Button Clicked"); // <--- This sends the data
    onShowCVModal(); // Opens the actual modal
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold text-foreground">
          Sujeet<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-px h-6 bg-border mx-2" />

          {/* Audio Controls */}
          <div 
            className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1.5 border border-border/50 relative"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={onAudioToggle}
              className="p-1.5 rounded-full hover:bg-background/80 text-foreground transition-colors"
              aria-label={isAudioPlaying ? "Pause music" : "Play music"}
            >
              {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            
            <button
              onClick={onNextTrack}
              className="p-1.5 rounded-full hover:bg-background/80 text-foreground transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>

            {/* Volume Slider Popup */}
            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 80 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden flex items-center"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleCVClick} // <--- Updated handler
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm"
          >
            <FileText size={16} />
            <span>CV</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-foreground py-2"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-border my-2" />
              <button
                onClick={handleCVClick} // <--- Updated handler for mobile too
                className="flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-medium"
              >
                <FileText size={18} />
                <span>Download CV</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
