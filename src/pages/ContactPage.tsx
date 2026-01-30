import { useState, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, MessageCircle, Send, MapPin, ArrowUpRight, LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/raghunandhan04/",
    color: "from-blue-600 to-blue-500"
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/raghunandhan04",
    color: "from-gray-700 to-gray-600"
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/919962181553",
    color: "from-green-600 to-green-500"
  }
];

const SocialLinkCard = memo(function SocialLinkCard({ link }: { link: SocialLink }) {
  const Icon = link.icon;
  
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group"
      whileHover={{ x: 4 }}
      aria-label={`Connect on ${link.name}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <span className="font-medium text-foreground">{link.name}</span>
      </div>
      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
    </motion.a>
  );
});

function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = useCallback((field: 'name' | 'email' | 'message', value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message
        });

      if (dbError) throw dbError;

      // Also send email notification
      await supabase.functions.invoke('send-contact-email', {
        body: contactForm
      });

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [contactForm, toast]);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 id="contact-heading" className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Get In Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing research opportunities, collaborations, or just having a chat
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Form */}
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-border/50 p-8 h-full">
              <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
                Send a Message
              </h2>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                    <Input
                      id="contact-name"
                      placeholder="Your Name"
                      className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your message..."
                    className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors min-h-[150px] resize-none"
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 py-6 text-base group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        aria-hidden="true"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Contact Info */}
          <div className="space-y-6">
            <Reveal delay={0.15}>
              <div className="glass rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a 
                      href="mailto:raghunandhan04@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      raghunandhan04@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground text-sm">Chennai, India</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-2xl border border-border/50 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Connect With Me
                </h3>
                <div className="space-y-3" role="list" aria-label="Social links">
                  {socialLinks.map((link) => (
                    <SocialLinkCard key={link.name} link={link} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactPage);
