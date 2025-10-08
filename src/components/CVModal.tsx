import { Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { siteContent } from '../data/content';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const cvOptions = [
    {
      title: 'Indian Market CV',
      description: 'Optimized for opportunities in India, includes local education details and cultural context.',
      format: 'PDF',
      size: '2.3 MB',
      updated: 'January 2025',
      href: siteContent.assets.cv_india,
      recommended: 'India, South Asia',
      icon: '🇮🇳'
    },
    {
      title: 'European Market CV',
      description: 'Formatted for Dutch/European opportunities, includes visa status and exchange details.',
      format: 'PDF',
      size: '2.1 MB',
      updated: 'Coming Soon',
      href: siteContent.assets.cv_dutch,
      recommended: 'Netherlands, Europe',
      icon: '🇳🇱',
      disabled: true
    },
    {
      title: 'Digital Portfolio',
      description: 'Comprehensive work samples, case studies, and project documentation.',
      format: 'PDF',
      size: '8.7 MB',
      updated: 'December 2024',
      href: siteContent.assets.portfolio_pdf,
      recommended: 'Creative roles, consulting',
      icon: '📁'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-[#00245D] flex-shrink-0" />
            <span>Download CV & Portfolio</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Choose the format that best fits your needs:</strong>
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• All documents are updated regularly and include recent experience</li>
              <li>• Portfolio includes detailed case studies and work samples</li>
              <li>• CVs are tailored for specific geographic markets</li>
            </ul>
          </div>

          <div className="grid gap-4">
            {cvOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`group transition-all duration-200 ${
                  option.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:border-[#00245D]/30 hover:shadow-md cursor-pointer'
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl flex-shrink-0">{option.icon}</span>
                      <div>
                        <h3 className="text-lg group-hover:text-[#00245D] transition-colors">
                          {option.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {option.format}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {option.size}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Updated: {option.updated}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {!option.disabled && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#00245D] hover:bg-[#00245D]/90 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={option.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4 flex-shrink-0" />
                          <span>Download</span>
                        </a>
                      </Button>
                    )}

                    {option.disabled && (
                      <Badge variant="outline" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Best for:</span>
                      <Badge variant="secondary" className="text-xs">
                        {option.recommended}
                      </Badge>
                    </div>
                    
                    {!option.disabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-xs text-muted-foreground hover:text-[#00245D] p-0"
                      >
                        <a
                          href={option.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <span>Preview</span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="border-t border-border pt-6">
            <h4 className="font-medium text-foreground mb-3">Additional Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                asChild
                className="justify-start h-auto p-3 text-left"
              >
                <a
                  href={siteContent.assets.lors_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-[#00245D]" />
                  <div>
                    <div className="font-medium text-sm">Letters of Recommendation</div>
                    <div className="text-xs text-muted-foreground">
                      Academic and professional references
                    </div>
                  </div>
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="justify-start h-auto p-3 text-left"
              >
                <a
                  href={siteContent.assets.thesis_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-[#00245D]" />
                  <div>
                    <div className="font-medium text-sm">Undergraduate Thesis</div>
                    <div className="text-xs text-muted-foreground">
                      Meme Marketing in Gen Z India
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              Need a specific format or have questions about my experience? 
              <Button
                variant="link"
                className="text-xs p-0 ml-1 text-[#00245D] hover:text-[#00245D]/80"
                onClick={onClose}
              >
                Get in touch
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}