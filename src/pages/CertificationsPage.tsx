import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, ExternalLink, Award, FileText } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

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
  // Optional PDF fields (support either name)
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

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">Loading certifications...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Certifications
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional certifications and achievements that showcase my expertise and commitment to continuous learning.
        </p>
      </div>

      {(() => {
        // Fallback entries (static) shown when DB is empty
        const fallback: Certification[] = [
          {
            id: 'fallback-ml-python-foundations',
            title: 'Machine Learning with Python: Foundations',
            issuer: 'LinkedIn Learning',
            issue_date: '2024-08-11',
            credential_url: '', // add LinkedIn credential URL if available
            image_url: '', // add public image path if available (e.g., /lovable-uploads/ml-python-foundations.png)
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
            image_url: '', // add public image path if available
            description: 'Top skills covered: Python (Programming Language).',
            is_active: true,
            display_order: 101
          }
        ];

        const effective = certifications.length > 0 ? certifications : fallback;

        // Sort by date descending: prefer issue_date, fallback to expiry_date; unknown dates last
        const toTime = (c: Certification) => {
          const d = c.issue_date || c.expiry_date;
          return d ? new Date(d).getTime() : -Infinity;
        };
        const sorted = [...effective].sort((a, b) => toTime(b) - toTime(a));

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((cert, idx) => (
            <Reveal key={cert.id} delay={idx * 0.04}>
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                  <p className="text-primary font-medium">{cert.issuer}</p>
                </CardHeader>
                <CardContent>
                {cert.description && (
                  <p className="text-muted-foreground mb-4 text-sm">{cert.description}</p>
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

                  <div className="flex flex-col sm:flex-row gap-2">
                  {cert.credential_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
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
                          className="w-full sm:w-auto"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>{cert.title}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-auto">
                          <img 
                            src={cert.image_url}
                            alt={`${cert.title} Certificate`}
                            className="w-full h-auto object-contain"
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
                          className="w-full sm:w-auto"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View PDF
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>{cert.title}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-[75vh]">
                          <iframe
                            src={(cert.pdf_url || cert.certificate_file_url) as string}
                            className="w-full h-full border-0"
                            title={`${cert.title} PDF`}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
            ))}
          </div>
        );
      })()}
    </div>
  );
}