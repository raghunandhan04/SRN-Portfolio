import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Certification {
  id?: string;
  title: string;
  issuer: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  file_url?: string;
  description?: string;
  is_active: boolean;
  display_order: number;
}

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      const { data } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (data) setCertifications(data);
      setLoading(false);
    };
    fetchCertifications();
  }, []);

  if (loading) return <div>Loading certifications...</div>;

  return (
    <section id="certifications" className="py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          {certifications.length === 0 ? (
            <div>No certifications found.</div>
          ) : (
            <ul className="space-y-6">
              {certifications.map(cert => (
                <li key={cert.id} className="border-b pb-4">
                  <div className="font-bold text-lg">{cert.title}</div>
                  <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                  {cert.issue_date && <div>Issued: {cert.issue_date}</div>}
                  {cert.expiry_date && <div>Expires: {cert.expiry_date}</div>}
                  {cert.description && <div className="mt-2">{cert.description}</div>}
                  {cert.file_url && (
                    <div className="mt-2">
                      {cert.file_url.endsWith('.pdf') ? (
                        <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">View Certificate (PDF)</a>
                      ) : (
                        <img src={cert.file_url} alt={cert.title} className="max-w-xs max-h-40 rounded shadow" />
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
