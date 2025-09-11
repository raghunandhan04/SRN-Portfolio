import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Award } from "lucide-react";

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

      {certifications.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No certifications available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                {cert.image_url && (
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <img 
                      src={cert.image_url} 
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
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

                {cert.credential_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(cert.credential_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Credential
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}