import { useState } from 'react';
import { motion } from 'motion/react';
import DomeGallery from './DomeGallery';

export function About() {
  const [isDomeHovered, setIsDomeHovered] = useState(false);

  // New, updated image list for the DomeGallery
  const galleryImages = [
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/professional-pic.jpg', alt: 'Professional headshot of Sujeetkumar Kadam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/toronto-professional.jpg', alt: 'Sujeetkumar Kadam at a professional event in Toronto' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/reach-conference-canada.jpg', alt: 'Speaking at the Reach Alliance conference in Canada' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/toronto-conference.jpg', alt: 'Presenting at a conference in Toronto' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/reach-group-pic.jpg', alt: 'Group photo with the Reach Alliance team' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/colombia-fieldtrip.jpg', alt: 'During a field trip in Colombia' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/colombia-fieldtrip2.jpg', alt: 'Collaborating with colleagues on a field trip in Colombia' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/colombia-field-break.jpg', alt: 'A break during fieldwork in Colombia' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/chile-andesBG.jpg', alt: 'Scenic view of the Andes mountains in Chile' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/chile-jesus-hilltop.jpg', alt: 'Visiting a hilltop statue in Chile' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/toronto-unioft.jpg', alt: 'At the University of Toronto' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/toronto-christmas.jpg', alt: 'Christmas season in Toronto' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/amsterdam-kingsday.jpg', alt: 'King\'s Day celebration in Amsterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-schidam.jpg', alt: 'Exploring Schiedam, Rotterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-schidam1.jpg', alt: 'Another view of Schiedam, Rotterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/schidam-windmill.jpg', alt: 'A windmill in Schiedam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-park.jpg', alt: 'Relaxing in a park in Rotterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-park1.jpg', alt: 'Enjoying the scenery in a Rotterdam park' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-park2.jpg', alt: 'Another moment from a park in Rotterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/rotterdam-casualpic.jpg', alt: 'A casual picture in Rotterdam' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/melbourne-matchday.jpg', alt: 'At a match day in Melbourne' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/melbourne-waterfront.jpg', alt: 'At the Melbourne waterfront' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/melbourne-wharf.jpg', alt: 'Exploring the wharf in Melbourne' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/Gemini_Generated_Image_63i03663i03663i0.png', alt: 'AI generated image' },
    { src: 'https://raw.githubusercontent.com/sujeetkumarr/Brand-New-Website/main/src/assets/Gemini_Generated_Image_s5mrejs5mrejs5mr.png', alt: 'Another AI generated image' }
  ];

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
      <style>{`
        .dome-gallery-container { cursor: grab; }
        .dome-gallery-container:active { cursor: grabbing; }
        .dome-gallery-container.custom-cursor { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(0,0,0,0.6)" text-anchor="middle">drag</text></svg>') 30 14, grab !important; }
        .dome-gallery-container.custom-cursor:active { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(240,240,240,0.95)" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(0,0,0,0.7)" text-anchor="middle">drag</text></svg>') 30 14, grabbing !important; }
        .dark .dome-gallery-container.custom-cursor { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(26,26,26,0.95)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(255,255,255,0.7)" text-anchor="middle">drag</text></svg>') 30 14, grab !important; }
        .dark .dome-gallery-container.custom-cursor:active { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28"><rect x="1" y="1" width="58" height="26" rx="13" fill="rgba(30,30,30,0.95)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><text x="30" y="18" font-family="system-ui, -apple-system" font-size="10" font-weight="500" fill="rgba(255,255,255,0.8)" text-anchor="middle">drag</text></svg>') 30 14, grabbing !important; }
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
                images={galleryImages}
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
                  >
                    <motion.div
                      className="bg-gradient-to-br from-card to-secondary/10 rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-all duration-300 cursor-pointer overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="text-3xl"
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
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
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
