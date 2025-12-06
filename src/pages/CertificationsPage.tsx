import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, ExternalLink, Award, FileText } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
  pdf_url?: string;
  certificate_file_url?: string;
  is_active: boolean;
  display_order: number;
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback entries
  const fallback: Certification[] = [
    {
      id: 'fallback-ml-python-foundations',
      title: 'Machine Learning with Python: Foundations',
      issuer: 'LinkedIn Learning',
      issue_date: '2024-08-11',
      credential_url: '',
      image_url: '',
      description: 'Top skills covered: Machine Learning, Python (Programming Language).',
      is_active: true,
      display_order: 100
    },
    {
      id: 'fallback-python-non-programmers',
      title: 'Python for Non-Programmers',
      issuer: 'LinkedIn Learning',
      issue_date: '2024-07-31',
      credential_url: '',
      image_url: '',
      description: 'Top skills covered: Python (Programming Language).',
      is_active: true,
      display_order: 101
    }
  ];

  const effective = certifications.length > 0 ? certifications : fallback;

  const toTime = (c: Certification) => {
    const d = c.issue_date || c.expiry_date;
    return d ? new Date(d).getTime() : -Infinity;
  };
  const sorted = [...effective].sort((a, b) => toTime(b) - toTime(a));

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4">
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Certifications</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications showcasing my expertise and commitment to continuous learning
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((cert, idx) => (
            <Reveal key={cert.id} delay={idx * 0.08}>
              <motion.div 
                className="group glass rounded-2xl border border-border/50 overflow-hidden h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient top accent */}
                <div className="h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-primary text-sm font-medium">{cert.issuer}</p>
                    </div>
                  </div>

                  {cert.description && (
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    {cert.issue_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Issued: {new Date(cert.issue_date).toLocaleDateString()}
                      </div>
                    )}
                    {cert.expiry_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Expires: {new Date(cert.expiry_date).toLocaleDateString()}
                      </div>
                    )}
                    {cert.credential_id && (
                      <div className="text-sm text-muted-foreground">
                        ID: {cert.credential_id}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.credential_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => window.open(cert.credential_url!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Credential
                      </Button>
                    )}

                    {cert.image_url && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            View Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] glass">
                          <DialogHeader>
                            <DialogTitle>{cert.title}</DialogTitle>
                          </DialogHeader>
                          <div className="w-full h-auto">
                            <img 
                              src={cert.image_url}
                              alt={`${cert.title} Certificate`}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {(cert.pdf_url || cert.certificate_file_url) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View PDF
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] glass">
                          <DialogHeader>
                            <DialogTitle>{cert.title}</DialogTitle>
                          </DialogHeader>
                          <div className="w-full h-[75vh]">
                            <iframe
                              src={(cert.pdf_url || cert.certificate_file_url) as string}
                              className="w-full h-full border-0 rounded-lg"
                              title={`${cert.title} PDF`}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
