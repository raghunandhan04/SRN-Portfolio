import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, ExternalLink, Award, FileText, Download } from "lucide-react";
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

  // Sort by display_order first, then by issue_date
  const sorted = [...certifications].sort((a, b) => {
    if (a.display_order !== b.display_order) {
      return (a.display_order || 999) - (b.display_order || 999);
    }
    const aTime = a.issue_date ? new Date(a.issue_date).getTime() : 0;
    const bTime = b.issue_date ? new Date(b.issue_date).getTime() : 0;
    return bTime - aTime;
  });

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 w-64 mx-auto bg-muted/50 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto bg-muted/30 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl border border-border/50 p-6 h-48 animate-pulse">
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted/50" />
                  <div className="flex-1">
                    <div className="h-5 bg-muted/50 rounded mb-2" />
                    <div className="h-4 w-24 bg-muted/30 rounded" />
                  </div>
                </div>
                <div className="h-4 bg-muted/30 rounded mb-2" />
                <div className="h-4 w-3/4 bg-muted/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (sorted.length === 0) {
    return (
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Award className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">No Certifications Yet</h1>
          <p className="text-muted-foreground">Certifications will appear here once added.</p>
        </div>
      </section>
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
            <Reveal key={cert.id} delay={Math.min(idx * 0.05, 0.25)}>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        asChild
                      >
                        <a 
                          href={(cert.pdf_url || cert.certificate_file_url) as string} 
                          download={`${cert.title}.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
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
