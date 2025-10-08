import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Download, Music, VolumeX } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  isAudioPlaying: boolean;
  onAudioToggle: () => void;
  onShowCVModal: () => void;
}

export function Header({ isDark, onThemeToggle, isAudioPlaying, onAudioToggle, onShowCVModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update background state
      setIsScrolled(currentScrollY > 50);
      
      // Show/hide based on scroll direction
      if (currentScrollY < 50) {
        // Always show at top of page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCVClick = () => {
    // Scroll to contact first, then show CV modal
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Small delay to let scroll complete, then show modal
      setTimeout(() => {
        onShowCVModal();
      }, 500);
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'My Creds', href: '#creds' },
    { label: 'My Gigs', href: '#gigs' },
    { label: 'Ping Me', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out, background-color 0.3s, backdrop-filter 0.3s'
      }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-lg font-bold text-foreground hover:text-accent transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              SK
            </button>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={onAudioToggle}
                className="p-2"
                aria-label="Toggle background music"
                title={isAudioPlaying ? "Pause music" : "Play music"}
              >
                {isAudioPlaying ? (
                  <Music className="h-4 w-4 text-accent" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="p-2"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCVClick}
              className="border-accent text-accent hover:bg-accent hover:text-black flex items-center gap-2"
            >
              <Download className="h-3 w-3 flex-shrink-0" />
              <span>Download CV</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
