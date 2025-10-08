import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, MapPin, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { siteContent } from '../data/content';

type RoleType = typeof siteContent.experience.roles[0];
type ProjectType = typeof siteContent.projects.items[0];

export function Experience() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'contract':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'casual (15 hrs/week)':
      case 'casual':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'internship':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const groupedRoles = siteContent.experience.roles.reduce((acc, role) => {
    const type = role.type.includes('Casual') ? 'Casual' : role.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(role);
    return acc;
  }, {} as Record<string, typeof siteContent.experience.roles>);

  const renderRoleCard = (role: RoleType, index: number, keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card 
        className="group hover:border-[#00C6FF]/30 transition-all duration-300 h-full cursor-pointer"
        onClick={() => setSelectedRole(role)}
      >
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className={getTypeColor(role.type)}>
                  {role.type}
                </Badge>
              </div>
              
              <CardTitle className="text-lg mb-1 group-hover:text-[#00C6FF] transition-colors">
                {role.role}
              </CardTitle>
              
              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <div className="flex items-start gap-2"> {/* FIX: items-start */}
                  <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                    <span className="font-medium text-foreground">{role.company}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2"> {/* FIX: items-start */}
                  <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                  <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                    <span>{role.location}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2"> {/* FIX: items-start */}
                  <Calendar className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                  <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                    <span>{role.dates}</span>
                  </div>
                </div>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {role.pills?.map((pill, pIndex) => (
                  <Badge
                    key={pIndex}
                    variant="secondary"
                    className="text-xs bg-[#00C6FF]/20 text-[#00C6FF] border-0"
                  >
                    {pill}
                  </Badge>
                ))}
              </div>

              {/* Main Frame */}
              <p className="text-sm text-foreground leading-relaxed">
                {role.mainFrame}
              </p>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#00C6FF]/30 text-[#00C6FF] hover:bg-[#00C6FF]/10 hover:border-[#00C6FF]"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );

  return (
    <section id="gigs" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            {siteContent.experience.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From startup consultancy to enterprise research, I've helped organizations across 
            industries build data-driven marketing strategies that deliver measurable results.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Professional Roles - Side by Side */}
          {(groupedRoles['Full-time'] || groupedRoles['Casual'] || groupedRoles['Contract']) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">Professional Roles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Full-time', 'Casual', 'Contract'].map((type) => {
                  const roles = groupedRoles[type];
                  if (!roles || roles.length === 0) return null;
                  
                  return roles.map((role, index) => renderRoleCard(role, index, type));
                })}
              </div>
            </motion.div>
          )}

          {/* Internships - Grid Layout */}
          {groupedRoles['Internship'] && groupedRoles['Internship'].length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">Internships</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedRoles['Internship'].map((role, index) => renderRoleCard(role, index, 'internship'))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {siteContent.projects.title}
            </h3>
            <p className="text-muted-foreground">
              {siteContent.projects.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {siteContent.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group hover:border-[#00C6FF]/30 transition-all duration-300 h-full cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">
                            {project.type}
                          </Badge>
                          {project.link && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="p-1 h-auto text-muted-foreground hover:text-[#00C6FF]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        <CardTitle className="text-lg mb-2 group-hover:text-[#00C6FF] transition-colors">
                          {project.title}
                        </CardTitle>
                        
                        <div className="text-sm text-muted-foreground space-y-1 mb-3">
                          <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                            <div className="flex-1">
                              {project.course && (
                                <p className="italic">{project.course}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                            <div className="flex-1">
                              <p>{project.institution}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                            <div className="flex-1">
                              <p>{project.dates}</p>
                            </div>
                          </div>
                        </div>

                        {/* Pills */}
                        {project.pills && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.pills.map((pill, pIndex) => (
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

                        {/* Main Frame */}
                        <p className="text-sm text-foreground leading-relaxed mb-4">
                          {project.mainFrame}
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
            ))}
          </div>
        </motion.div>
      </div>

      {/* Role Details Modal */}
      <Dialog open={!!selectedRole} onOpenChange={(open) => !open && setSelectedRole(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedRole && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between pr-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className={getTypeColor(selectedRole.type)}>
                        {selectedRole.type}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl mb-2">
                      {selectedRole.role}
                    </DialogTitle>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2"> {/* FIX: items-start */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <p className="font-medium text-foreground">{selectedRole.company}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: items-start */}
                        <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <span>{selectedRole.location}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: items-start */}
                        <Calendar className="h-3 w-3 flex-shrink-0 mt-0.5" /> {/* FIX: added mt-0.5 */}
                        <div className="flex-1"> {/* FIX: wrapped text in flex-1 */}
                          <span>{selectedRole.dates}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Pills */}
                {selectedRole.pills && (
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.pills.map((pill, index) => (
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

                {/* Main Frame */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedRole.mainFrame}
                  </p>
                </div>

                {/* Expanded Content */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">The Full Story</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {selectedRole.expanded}
                  </p>
                </div>

                {/* Website Link */}
                {selectedRole.website && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-[#00C6FF] text-[#00C6FF] hover:bg-[#00C6FF] hover:text-black w-full"
                  >
                    <a
                      href={selectedRole.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>Visit Company Website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between pr-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">
                        {selectedProject.type}
                      </Badge>
                      {selectedProject.link && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-1 h-auto text-muted-foreground hover:text-[#00C6FF]"
                        >
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <DialogTitle className="text-2xl mb-2">
                      {selectedProject.title}
                    </DialogTitle>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                        <div className="flex-1">
                          {selectedProject.course && (
                            <p className="italic text-foreground">{selectedProject.course}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{selectedProject.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2"> {/* FIX: Wrapper for alignment */}
                        <div className="flex-1">
                          <p>{selectedProject.dates}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Pills */}
                {selectedProject.pills && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.pills.map((pill, index) => (
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

                {/* Main Frame */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedProject.mainFrame}
                  </p>
                </div>

                {/* Expanded Content */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Details</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {selectedProject.expanded}
                  </p>
                </div>

                {/* Project Link */}
                {selectedProject.link && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-[#00C6FF] text-[#00C6FF] hover:bg-[#00C6FF] hover:text-black w-full"
                  >
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>View Full Project</span>
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