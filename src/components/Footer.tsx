import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { siteContent } from '../data/content';
import CircularText from './CircularText';
import TextPressure from './TextPressure';

export function Footer() {
  const [isAvailable] = useState(true); // Toggle this manually: true = Available, false = Currently full

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Schema Markup for SEO/AEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sujeetkumar Kadam",
          "email": "mailto:sujeetkumarkadam@gmail.com",
          "jobTitle": "Marketing Strategist",
          "description": "Marketing & Strategy Consultant specializing in data-driven marketing, brand strategy, and research",
          "url": "https://www.mrkadam.tech",
          "sameAs": [
            "https://linkedin.com/in/sujeetkumarkadam",
            "https://www.mrkadam.tech"
          ],
          "alumniOf": [
            {
              "@type": "CollegeOrUniversity",
              "name": "The University of Melbourne"
            },
            {
              "@type": "CollegeOrUniversity",
              "name": "Rotterdam School of Management, Erasmus University"
            }
          ],
          "knowsAbout": [
            "Marketing Strategy",
            "Digital Marketing",
            "Brand Consulting",
            "Data Analytics",
            "Consumer Research"
          ]
        })}
      </script>

      <footer className="bg-background border-t border-border relative overflow-hidden">
        {/* Decorative Circular Text - repositioned to top right */}
        <div className="hidden lg:block absolute top-8 right-12 pointer-events-auto opacity-30 hover:opacity-50 transition-opacity duration-300">
          <CircularText 
            text="BUILT FOR AND BY SUJEETKUMAR • " 
            spinDuration={35}
            onHover="speedUp"
            className="w-40"
          />
        </div>
        
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Let's build something that feels like it <span className="text-[#00C6FF]">matters</span>.
                </h3>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                  I'm drawn to ideas that connect people — through stories, design, or strategy.
                  If you've got one waiting to be told, I'd love to help bring it to life.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="bg-[#00C6FF] hover:bg-[#00C6FF]/90 text-black"
                  >
                    Let's work together
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection('#about')}
                    className="border-border hover:border-[#00C6FF]/30"
                  >
                    Learn more about me
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Site Map</h4>
              <nav className="space-y-2.5">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About Me', href: '#about' },
                  { label: 'My Creds', href: '#creds' },
                  { label: 'My Gigs', href: '#gigs' },
                  { label: 'Toolkit', href: '#toolkit' },
                  { label: 'Ping Me', href: '#contact' },
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-sm text-muted-foreground hover:text-[#00C6FF] transition-colors text-left w-full"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Connect & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <div className="space-y-2.5 mb-6">
                <a
                  href={siteContent.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-[#00C6FF] transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="block text-sm text-muted-foreground hover:text-[#00C6FF] transition-colors"
                >
                  Email
                </a>
                <a
                  href={siteContent.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-[#00C6FF] transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              {/* Availability Status */}
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg border border-border/50">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-2 h-2 rounded-full ${
                    isAvailable ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                />
                <span className="text-xs font-medium text-foreground">
                  {isAvailable ? 'Available for projects' : 'Currently full'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* TextPressure Interactive Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 mb-8"
          >
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
              <TextPressure
                text="SUJEETKUMAR"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="currentColor"
                strokeColor="#00C6FF"
                minFontSize={36}
                className="text-foreground opacity-10 hover:opacity-20 transition-opacity duration-500"
              />
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-border pt-8 mt-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left side content */}
              <div className="flex flex-col items-start space-y-2 text-sm text-muted-foreground flex-1">
                <span>© {currentYear} Sujeetkumar Kadam</span>
                <span className="text-xs">
                  Built without any techie, assembled with AI and stubbornness!
                </span>
              </div>

              {/* Right side content */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="text-left md:text-right">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This site uses minimal JavaScript and respects your privacy.<br />
                    <strong>No tracking. No cookies. No nonsense.</strong>
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-[#00C6FF] p-2 self-start md:self-center"
                  aria-label="Back to top"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}