import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleContactSubmit = async (e: React.FormEvent) => {
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
            const { error } = await supabase.functions.invoke('send-contact-email', {
                body: contactForm
            });

            if (error) throw error;

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
    };

    return (
        <section id="contact" className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Get In Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                        <CardHeader>
                            <CardTitle className="text-foreground">Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                                    <Input
                                        placeholder="Your Name"
                                        className="bg-background/50"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="bg-background/50"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                                    <Textarea
                                        placeholder="Your message..."
                                        className="bg-background/50 min-h-[120px]"
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Mail className="w-6 h-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Email</h3>
                                        <p className="text-foreground/80">raghunandhan04@gmail.com</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2" onClick={() => window.open('https://www.linkedin.com/in/raghunandhan04/', '_blank')}>
                                        <Linkedin className="w-4 h-4" />
                                        <span className="sm:hidden md:inline">LinkedIn</span>
                                    </Button>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2" onClick={() => window.open('https://github.com/raghunandhan04', '_blank')}>
                                        <Github className="w-4 h-4" />
                                        <span className="sm:hidden md:inline">GitHub</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <MessageCircle className="w-6 h-6 text-green-500" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">WhatsApp</h3>
                                        <a 
                                          href="https://wa.me/919962181553" 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-foreground/80 hover:text-primary transition-colors"
                                        >
                                          +91 9962181553
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
