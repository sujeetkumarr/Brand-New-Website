import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { siteContent } from '../data/content';

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="toolkit" className="py-24 bg-background grid-overlay">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            {siteContent.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and methodologies for building data-driven marketing strategies.
          </p>
        </motion.div>

        {/* Compact Skills Grid */}
        <div className="max-w-6xl mx-auto space-y-6">
          {siteContent.skills.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50 overflow-visible">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 pb-5">
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Pill/Capsule Design - Always visible */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 rounded-full border border-border/30 bg-card hover:border-[#00C6FF]/50 hover:bg-[#00C6FF]/5 transition-all duration-200 cursor-default"
                        >
                          <p className="text-xs font-medium text-foreground whitespace-nowrap">
                            {skill.name}
                          </p>
                        </motion.div>

                        {/* Hover Tooltip - positioned above with proper z-index and spacing */}
                        {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 p-4 bg-popover border border-border rounded-lg shadow-2xl"
                            style={{
                              maxWidth: 'calc(100vw - 40px)'
                            }}
                          >
                            <p className="text-sm text-foreground mb-3 leading-relaxed">
                              {skill.description}
                            </p>
                            <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                              {/* Expertise Level Indicators */}
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                                      level <= skill.level
                                        ? 'bg-[#00C6FF]'
                                        : 'bg-muted/30'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground font-medium">
                                {skill.level === 5 ? 'Expert' : skill.level === 4 ? 'Advanced' : skill.level === 3 ? 'Intermediate' : skill.level === 2 ? 'Basic' : 'Beginner'}
                              </span>
                            </div>
                            {/* Arrow pointer */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-popover border-r border-b border-border rotate-45" />
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Accessibility Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-muted/50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-xs text-muted-foreground">
              <strong>Accessibility note:</strong> Hover over any tool to see its description and proficiency level.
              All interactions work with keyboard navigation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}