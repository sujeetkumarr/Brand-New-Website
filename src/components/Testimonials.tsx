import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { siteContent } from '../data/content';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = siteContent.testimonials.items;

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useState(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  });

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleCardHover = (hovered: boolean) => {
    setIsHovered(hovered);
    if (hovered) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteContent.testimonials.intro}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Carousel */}
          <div className="hidden md:block">
            <div className="relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => handleCardHover(true)}
                onMouseLeave={() => handleCardHover(false)}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-[#00C6FF]/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          {testimonials[currentIndex].author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-sm text-[#00C6FF]">
                          {testimonials[currentIndex].institution}
                        </p>
                      </div>
                      
                      {testimonials[currentIndex].source_link && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-muted-foreground hover:text-[#00C6FF]"
                        >
                          <a
                            href={testimonials[currentIndex].source_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <span className="text-xs">
                              {testimonials[currentIndex].source_label}
                            </span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="p-2 hover:bg-muted"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-[#00C6FF]' : 'bg-muted'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="p-2 hover:bg-muted"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <blockquote className="text-base text-foreground mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-[#00C6FF]">
                          {testimonial.institution}
                        </p>
                      </div>
                      
                      {testimonial.source_link && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-muted-foreground hover:text-[#00C6FF] p-1"
                        >
                          <a
                            href={testimonial.source_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1"
                          >
                            <span className="text-xs">
                              {testimonial.source_label}
                            </span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* References & Sources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-card to-secondary/10 rounded-2xl p-8 border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Full References Available
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                asChild
                className="h-auto p-4 border-accent/20 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
              >
                <a
                  href={siteContent.testimonials.linkedin_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">LinkedIn Profile</p>
                    <p className="text-sm text-muted-foreground">View all recommendations</p>
                  </div>
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-auto p-4 border-accent-secondary/20 hover:border-accent-secondary/40 hover:bg-accent-secondary/5 transition-all duration-300"
              >
                <a
                  href={siteContent.testimonials.lors_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-8 h-8 bg-accent-secondary/20 rounded-full flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Letters of Recommendation</p>
                    <p className="text-sm text-muted-foreground">Download full LORs (PDF)</p>
                  </div>
                </a>
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Additional references available upon request
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}