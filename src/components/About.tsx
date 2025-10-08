import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import DomeGallery from './DomeGallery';
// import ScrambledText from './ScrambledText'; // REMOVED: ScrambledText import

// Personal images
import portraitTraditional from 'figma:asset/1b84435a2650fdba67776cfe5cbf34931d7a6c2f.png';
import portraitProfessional from 'figma:asset/bccc63f8666a01ca1f4d873e436f2f8e7f4ce7e6.png';
import portraitCasual from 'figma:asset/3924095c87f6dd8f1f16961aa20482dbf7ff90d5.png';

export function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDomeHovered, setIsDomeHovered] = useState(false);

  const hobbies = [
    {
      icon: "🪶",
      category: "Stories & Sounds",
      moodLine: "Where words meet rhythm.",
      detail: "A quiet evening usually finds me buried in old epics or Indian classical ragas. There's something grounding about stories and melodies that have traveled through centuries, they remind me that culture isn't static, it's a living rhythm."
    },
    {
      icon: "🍳",
      category: "Kitchen & Cinema", 
      moodLine: "Cooking scenes & screenplays.",
      detail: "My kitchen and Netflix queue and designing something new look equally experimental. I love cooking for friends, mixing ingredients that shouldn't work but do, kind of like good marketing or storytelling."
    },
    {
      icon: "☁️",
      category: "Recharge Mode",
      moodLine: "Silence as inspiration.",
      detail: "I take my naps seriously. Stillness isn't laziness, it's my reset button. Some of my best ideas show up right after I stop trying to find them."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background grid-overlay">
      {/* Custom cursor styles for DomeGallery - Subtle, theme-aware */}
      <style>{`
        .dome-gallery-container {
          cursor: grab;
        }
        .dome-gallery-container:active {
          cursor: grabbing;
        }
        
        /* Light theme cursor - subtle gray pill */
        .dome-gallery-container.custom-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(0,0,0,0.6)" text-anchor="middle">drag</text></svg>') 30 14, grab !important;
        }
        .dome-gallery-container.custom-cursor:active {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(240,240,240,0.95)" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(0,0,0,0.7)" text-anchor="middle">drag</text></svg>') 30 14, grabbing !important;
        }
        
        /* Dark theme cursor - subtle dark pill */
        .dark .dome-gallery-container.custom-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(26,26,26,0.95)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(255,255,255,0.7)" text-anchor="middle">drag</text></svg>') 30 14, grab !important;
        }
        .dark .dome-gallery-container.custom-cursor:active {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(30,30,30,0.95)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(255,255,255,0.8)" text-anchor="middle">drag</text></svg>') 30 14, grabbing !important;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
            About Me
          </h2>
          <p
            className="text-xl md:text-2xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto leading-tight font-light"
            style={{ margin: '0 auto', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Hi, I'm Sujeet, and I've never been great at staying in one lane. I love those moments when different worlds collide, whether it's cultures, ideas, or people who see things completely differently than I do. Growing up between places and languages taught me that the most interesting things happen at the intersections. I spend my time exploring what makes people tick and how that shapes what we build and create. This space is simply me sharing how I see the world, which, if I'm honest, shifts a little every day.
          </p>
        </motion.div>

        {/* Interactive Photo Gallery - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-heading text-foreground mb-3">
              My Journey
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interactive <span className="text-accent-secondary font-medium">3D gallery</span> of cool moments from across the globe
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className={`w-full aspect-[16/10] md:aspect-video max-w-full lg:max-w-6xl mx-auto rounded-2xl overflow-hidden bg-background border border-border/50 shadow-2xl relative z-10 dome-gallery-container ${isDomeHovered ? 'custom-cursor' : ''}`}
            onMouseEnter={() => setIsDomeHovered(true)}
            onMouseLeave={() => setIsDomeHovered(false)}
          >
              <DomeGallery
                images={[
                  // Your personal images
                  {
                    src: portraitTraditional,
                    alt: 'Sujeet in traditional Indian attire - celebrating cultural heritage'
                  },
                  {
                    src: portraitProfessional,
                    alt: 'Professional headshot - strategic marketing consultant'
                  },
                  {
                    src: portraitCasual,
                    alt: 'Casual portrait - authentic moment with warm lighting'
                  },
                  // Placeholder images (replace these with more personal photos)
                  {
                    src: 'https://images.unsplash.com/photo-1568983268695-74a04650c8b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcHJlc2VudGF0aW9uJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU3MDgyMTkyfDA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Conference presentations and speaking engagements'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1656836476760-77c0d09257ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXNlYXJjaCUyMGZpZWxkJTIwd29ya3xlbnwxfHx8fDE3NTcwOTcyMDF8MA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Field research in Colombia with Reach Alliance'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1715807998380-dc4a84402358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTcxMTY5OTF8MA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Academic graduation and milestones'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1724018305000-616597f21304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHR0cmF2ZWwlMjBzdHVkeSUyMGFicm9hZHxlbnwxfHx8fDE3NTcxNzY5MjZ8MA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'International travel and study abroad experiences'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxuZXR3b3JraW5nJTIwYnVzaW5lc3MlMjBldmVudHxlbnwxfHx8fDE3NTcxNzY5MzB8MA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Professional networking and business events'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1732437334226-e96e72272bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdGFydHVwJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzU3MTc2OTM0fDA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Startup meetings and collaborative projects'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1667918135450-e8f2c1abd480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhY2hpZXZlbWVudCUyMGF3YXJkJTIwcmVjb2duaXRpb258ZW58MXx8fHwxNzU3MTM0NzU1fDA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Achievement awards and professional recognition'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1731983568664-9c1d8a87e7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjBhY2FkZW1pYyUyMHdvcmt8ZW58MXx8fHwxNzU3MTc2OTQxfDA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Library study sessions and academic work'
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1659080927204-de39f5fdfb02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtZW50b3JzaGlwJTIwZ3VpZGFuY2UlMjBjYXJlZXJ8ZW58MXx8fHwxNzU3MTc2OTQ2fDA&ixlib=rb-4.1.0&q=80&w=400',
                    alt: 'Mentorship and career guidance sessions'
                  },
                ]}
                fit={0.8}
                minRadius={800}
                maxVerticalRotationDeg={20}
                segments={30}
                dragDampening={2}
                grayscale={true}
                imageBorderRadius="24px"
                openedImageBorderRadius="32px"
                openedImageWidth="500px"
                openedImageHeight="500px"
              />
            </motion.div>
        </motion.div>

        {/* Personal Interests & Current Focus - Below Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-heading text-foreground mb-8 text-center">
              My Things Outside Work
            </h3>
              <div className="space-y-4">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-card to-secondary/10 rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-all duration-300 cursor-pointer overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="text-3xl"
                          animate={{ 
                            rotate: hoveredCard === index ? [0, -10, 10, -10, 0] : 0,
                            scale: hoveredCard === index ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {hobby.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {hobby.category}
                          </h4>
                          <p className="text-sm text-muted-foreground italic mb-3">
                            {hobby.moodLine}
                          </p>
                          
                          {/* Expandable detail on hover */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: hoveredCard === index ? 'auto' : 0,
                              opacity: hoveredCard === index ? 1 : 0
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 border-t border-border/30">
                              <p className="text-sm text-foreground leading-relaxed">
                                {hobby.detail}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}