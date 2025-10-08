import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { siteContent } from '../data/content';
import CircularText from './CircularText';
import unimelbLogo from 'figma:asset/67a0bdf9b6bc908410bb78cefca834db33f39b5e.png';
import rsmLogo from 'figma:asset/536c5334d816efc022e7175c0e8c93031d1db035.png';
import osmaniaLogo from 'figma:asset/a9be73384ffe0cf9eb5aceb6b851e8583a0b237e.png';

type DegreeType = typeof siteContent.education.degrees[0];

export function Education() {
  const [selectedDegree, setSelectedDegree] = useState<DegreeType | null>(null);

  return (
    <section id="creds" className="py-24 bg-background grid-overlay relative overflow-hidden">
      {/* Decorative Circular Text - Top Right (3 circles) */}
      <div className="hidden lg:block absolute top-16 right-6 pointer-events-auto opacity-40">
        <CircularText 
          text="STRATEGY • DATA • INNOVATION • " 
          spinDuration={22}
          onHover="goBonkers"
          className="w-32"
        />
      </div>
      <div className="hidden lg:block absolute top-8 right-28 pointer-events-auto opacity-35">
        <CircularText 
          text="RESEARCH • INSIGHTS • ANALYTICS • " 
          spinDuration={18}
          onHover="goBonkers"
          className="w-32"
        />
      </div>
      <div className="hidden lg:block absolute top-32 right-24 pointer-events-auto opacity-38">
        <CircularText 
          text="GROWTH • MARKETING • BRAND • " 
          spinDuration={25}
          onHover="goBonkers"
          className="w-32"
        />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            My Creds
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation built across three countries, with research published internationally 
            and recognition through competitive scholarships.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {siteContent.education.degrees.map((degree, index) => {
            // Get the right logo based on institution
            let logo = null;
            if (degree.institution.includes('Melbourne')) logo = unimelbLogo;
            else if (degree.institution.includes('Rotterdam') || degree.institution.includes('Erasmus')) logo = rsmLogo;
            else if (degree.institution.includes('Osmania')) logo = osmaniaLogo;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group hover:border-[#00C6FF]/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedDegree(degree)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Institution Logo */}
                        {logo && (
                          <div className="mb-4 w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-border/30 p-2 flex items-center justify-center">
                            <img 
                              src={logo} 
                              alt={`${degree.institution} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        
                        <CardTitle className="text-xl mb-2 group-hover:text-[#00C6FF] transition-colors">
                          {degree.degree}
                        </CardTitle>
                        
                        <div className="space-y-1 text-sm text-muted-foreground mb-3">
                          <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                            <Award className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                            <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                              <span className="font-medium text-foreground">{degree.institution}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                            <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                            <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                              <span>{degree.location}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                            <Calendar className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                            <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                              <span>{degree.dates}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pills */}
                        {degree.pills && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {degree.pills.map((pill, pIndex) => (
                              <Badge
                                key={pIndex}
                                variant="secondary"
                                className="text-xs bg-[#00C6FF]/20 text-[#00C6FF] border-0"
                              >
                                {pill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Main Frame - Visible on Card */}
                        <p className="text-sm text-foreground leading-relaxed mb-4">
                          {degree.mainFrame}
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#00C6FF]/30 text-[#00C6FF] hover:bg-[#00C6FF]/10 hover:border-[#00C6FF]"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Degree Details Modal */}
      <Dialog open={!!selectedDegree} onOpenChange={(open) => !open && setSelectedDegree(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedDegree && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between pr-6">
                  <div className="flex-1">
                    {/* Institution Logo */}
                    {(() => {
                      let logo = null;
                      if (selectedDegree.institution.includes('Melbourne')) logo = unimelbLogo;
                      else if (selectedDegree.institution.includes('Rotterdam') || selectedDegree.institution.includes('Erasmus')) logo = rsmLogo;
                      else if (selectedDegree.institution.includes('Osmania')) logo = osmaniaLogo;
                      
                      return logo ? (
                        <div className="mb-4 w-20 h-20 rounded-lg overflow-hidden bg-white/5 border border-border/30 p-2 flex items-center justify-center">
                          <img 
                            src={logo} 
                            alt={`${selectedDegree.institution} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : null;
                    })()}
                    
                    <DialogTitle className="text-2xl mb-3">
                      {selectedDegree.degree}
                    </DialogTitle>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                        <Award className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <span className="font-medium text-foreground">{selectedDegree.institution}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                        <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <span>{selectedDegree.location}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: items-start for top alignment */}
                        <Calendar className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <span>{selectedDegree.dates}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Pills */}
                {selectedDegree.pills && (
                  <div className="flex flex-wrap gap-2">
                    {selectedDegree.pills.map((pill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#00C6FF]/20 text-[#00C6FF] border-0"
                      >
                        {pill}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="bg-card/50 border border-border/30 rounded-lg p-5">
                  <h4 className="font-semibold text-foreground mb-3 text-lg">Overview</h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedDegree.mainFrame}
                  </p>
                </div>

                {/* Expanded Content */}
                <div className="bg-muted/30 rounded-lg p-5">
                  <h4 className="font-semibold text-foreground mb-3 text-lg">The Full Story</h4>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {selectedDegree.expanded}
                  </div>
                </div>

                {/* Highlights */}
                {selectedDegree.highlights && (
                  <div className="border border-border/30 rounded-lg p-5">
                    <h4 className="font-semibold text-foreground mb-3 text-lg">Key Highlights</h4>
                    <ul className="space-y-2">
                      {selectedDegree.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-foreground">
                          <span className="text-[#00C6FF] mt-1">•</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Link */}
                {selectedDegree.link && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-[#00C6FF] text-[#00C6FF] hover:bg-[#00C6FF] hover:text-black w-full"
                  >
                    <a
                      href={selectedDegree.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>View More Details</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}