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
    
    // Compose email content
    const subject = `Portfolio Contact: ${formData.reason}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AReason: ${formData.reason}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
    
    // Open default email client with pre-filled content
    window.location.href = `mailto:sujeetkumarkadam@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Show toast
    toast.success('Opening your email client...');
    
    // Reset form
    setFormData({ name: '', email: '', reason: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
      description: 'Best for detailed inquiries'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: siteContent.contact.phone,
      href: siteContent.contact.whatsapp,
      description: 'Quick questions & scheduling'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'in/sujeetkumarkadam',
      href: siteContent.contact.linkedin,
      description: 'Professional networking'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteContent.contact.phone,
      href: `tel:${siteContent.contact.phone}`,
      description: 'Direct calls (India timezone)'
    }
  ];

  const downloadables = [
    {
      icon: FileText,
      label: 'Indian CV',
      description: 'For India-based opportunities',
      href: 'https://drive.google.com/file/d/1U6GtkpCRIUb2kVrGFS8kveLz-cFyHSPG/view?usp=sharing'
    },
    {
      icon: FileText,
      label: 'EU/Dutch CV',
      description: 'For European opportunities',
      href: 'https://drive.google.com/file/d/1VayOT7sLN5nK9wPAdtE3A2ZIeocB6l_M/view?usp=sharing'
    },
    {
      icon: Palette,
      label: 'Creative Portfolio',
      description: 'Visual showcase of work',
      href: 'https://drive.google.com/file/d/1jPdXTSY_83FFLMydlHUQb8xxP81AKsZg/view?usp=sharing',
      preview: 'https://www.canva.com/design/DAG0KkNHpJg/sgO4RYjZuxYLfSLu2yJ8iw/view?utm_content=DAG0KkNHpJg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h101a363ec4'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            Ping Me
          </h2>
          <p className="text-base text-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always up for a good conversation — whether it's a brand challenge, a research idea, or a role that sounds like a match.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-2">
            Let's connect and build something meaningful, measurable, and maybe even a little magical.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Contact Methods Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-ui text-foreground mb-6">
              Get in Touch
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full h-auto p-4 hover:bg-[#00C6FF]/10 hover:border-[#00C6FF]/30 border border-transparent transition-all text-left justify-start"
                  >
                    <a
                      href={method.href}
                      target={method.label === 'Email' ? undefined : '_blank'}
                      rel={method.label === 'Email' ? undefined : 'noopener noreferrer'}
                      className="flex flex-col items-start space-y-2 w-full"
                    >
                      <method.icon className="h-5 w-5 text-[#00C6FF]" />
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {method.label}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {method.value}
                        </div>
                      </div>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Full-Width Availability & Downloadables Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Availability */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#00C6FF] flex-shrink-0" />
                  <span>Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed mb-2">
                  Currently available for remote projects and full-time roles in India.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From August 2025, open to Europe (Orientation Year Visa) and global collaborations.
                </p>
              </CardContent>
            </Card>

            {/* Downloadables - With Modal Button */}
            <Card className="border-border/50 bg-gradient-to-br from-[#00C6FF]/5 to-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#00C6FF] flex-shrink-0" />
                    <span>Download CV</span>
                  </div>
                  <Badge className="bg-[#00C6FF]/20 text-[#00C6FF] border-0">
                    Featured
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Access my CV, portfolio, and supporting documents tailored for different markets.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowDownloadablesModal(true)}
                    className="flex-1 bg-[#00C6FF] hover:bg-[#00C6FF]/90 text-black"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View All Documents
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-[#00C6FF]/30 text-[#00C6FF] hover:bg-[#00C6FF]/10"
                  >
                    <a
                      href="https://drive.google.com/file/d/1U6GtkpCRIUb2kVrGFS8kveLz-cFyHSPG/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send a Message</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and it'll open in your email client — just hit send!
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">What brings you here? *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange('reason', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {siteContent.contact.reasons.map((reason, index) => (
                          <SelectItem key={index} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, role, or how I can help..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00C6FF] hover:bg-[#00C6FF]/90 text-black"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Open in Email Client
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This will open your default email app with the message pre-filled. 
                    Just review and hit send!
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Downloadables Modal */}
        <Dialog open={showDownloadablesModal} onOpenChange={setShowDownloadablesModal}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-[#00C6FF] flex-shrink-0" />
                <span>Downloadable Documents</span>
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