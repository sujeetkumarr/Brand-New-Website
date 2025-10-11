import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, Linkedin, Calendar, MapPin, Download, FileText, Palette, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { siteContent } from '../data/content';

interface ContactProps {
  onShowCVModal: () => void;
}

export function Contact({ onShowCVModal }: ContactProps) {
  const [showDownloadablesModal, setShowDownloadablesModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Portfolio Contact: ${formData.reason}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AReason: ${formData.reason}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
    
    window.location.href = `mailto:sujeetkumarkadam@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    toast.success('Opening your email client...');
    
    setFormData({ name: '', email: '', reason: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: siteContent.contact.email, href: `mailto:${siteContent.contact.email}`, description: 'Best for detailed inquiries' },
    { icon: MessageCircle, label: 'WhatsApp', value: siteContent.contact.phone, href: siteContent.contact.whatsapp, description: 'Quick questions & scheduling' },
    { icon: Linkedin, label: 'LinkedIn', value: 'in/sujeetkumarkadam', href: siteContent.contact.linkedin, description: 'Professional networking' },
    { icon: Phone, label: 'Phone', value: siteContent.contact.phone, href: `tel:${siteContent.contact.phone}`, description: 'Direct calls (India timezone)' }
  ];

  const downloadables = [
    { icon: FileText, label: 'Indian Market CV', description: 'For India-based opportunities', href: 'https://drive.google.com/file/d/1U6GtkpCRIUb2kVrGFS8kveLz-cFyHSPG/view?usp=sharing' },
    { icon: FileText, label: 'Dutch Market Creative CV', description: 'For European opportunities', href: 'https://drive.google.com/file/d/1VayOT7sLN5nK9wPAdtE3A2ZIeocB6l_M/view?usp=sharing' },
    { icon: Palette, label: 'Creative Portfolio', description: 'Visual showcase of work', href: 'https://drive.google.com/file/d/1jPdXTSY_83FFLMydlHUQb8xxP81AKsZg/view?usp=sharing', preview: 'https://www.canva.com/design/DAG0KkNHpJg/sgO4RYjZuxYLfSLu2yJ8iw/view?utm_content=DAG0KkNHpJg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h101a363ec4' }
  ];

  return (
    <section id="contact" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* ... (rest of the component remains the same) ... */}
        
        <Dialog open={showDownloadablesModal} onOpenChange={setShowDownloadablesModal}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-left">
                Download CV & Portfolio
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-foreground mb-3">
                  <strong>Choose the format that best fits your needs:</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All documents are updated regularly and include recent experience</li>
                  <li>• Portfolio includes detailed case studies and work samples</li>
                  <li>• CVs are tailored for specific geographic markets</li>
                </ul>
              </div>

              <div className="space-y-4">
                {downloadables.map((item, index) => (
                  <Card key={index} className="border-border/50 hover:border-[#00C6FF]/30 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-[#00C6FF] flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {item.label}
                            </h4>
                            <p className="text-xs text-muted-foreground font-normal mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                       <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-muted-foreground">Updated: 11th Oct. 2025</span>
                        </div>
                      <div className="flex gap-2">
                        {item.preview && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <a
                              href={item.preview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center space-x-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Preview</span>
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className={`${item.preview ? 'flex-1' : 'w-full'} bg-[#00C6FF] hover:bg-[#00C6FF]/90 text-black`}
                        >
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Need a specific format or have questions?{' '}
                  <button
                    onClick={() => setShowDownloadablesModal(false)}
                    className="text-[#00C6FF] hover:underline"
                  >
                    Get in touch
                  </button>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
