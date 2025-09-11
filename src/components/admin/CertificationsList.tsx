import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface Certification {
  id?: string;
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

interface CertificationsListProps {
  userId: string;
}

export const CertificationsList = ({ userId }: CertificationsListProps) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCertifications();
  }, [userId]);

  const fetchCertifications = async () => {
    const { data } = await supabase
      .from("certifications")
      .select("*")
      .eq("user_id", userId)
      .order("display_order");
    
    if (data) setCertifications(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    
    setLoading(true);
    const certData = { ...editingCert, user_id: userId };

    const { error } = editingCert.id
      ? await supabase.from("certifications").update(certData).eq("id", editingCert.id)
      : await supabase.from("certifications").insert(certData);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Certification ${editingCert.id ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      fetchCertifications();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("certifications").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Certification deleted successfully",
      });
      fetchCertifications();
    }
  };

  const newCertification: Certification = {
    title: "",
    issuer: "",
    is_active: true,
    display_order: certifications.length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certifications</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCert(newCertification)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCert?.id ? "Edit" : "Add"} Certification
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingCert?.title || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, title: e.target.value} : null)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuer</Label>
                  <Input
                    id="issuer"
                    value={editingCert?.issuer || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, issuer: e.target.value} : null)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issue_date">Issue Date</Label>
                  <Input
                    id="issue_date"
                    type="date"
                    value={editingCert?.issue_date || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, issue_date: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry_date">Expiry Date</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={editingCert?.expiry_date || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, expiry_date: e.target.value} : null)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credential_id">Credential ID</Label>
                  <Input
                    id="credential_id"
                    value={editingCert?.credential_id || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, credential_id: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="credential_url">Credential URL</Label>
                  <Input
                    id="credential_url"
                    value={editingCert?.credential_url || ""}
                    onChange={(e) => setEditingCert(prev => prev ? {...prev, credential_url: e.target.value} : null)}
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  bucketName="certificates"
                  accept="image/*"
                  maxSize={5}
                  label="Certificate Image"
                  existingUrl={editingCert?.image_url || ""}
                  onUploadComplete={(url) => setEditingCert(prev => prev ? {...prev, image_url: url} : null)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingCert?.description || ""}
                  onChange={(e) => setEditingCert(prev => prev ? {...prev, description: e.target.value} : null)}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Certification"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.title}</TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>{cert.issue_date}</TableCell>
                <TableCell>{cert.is_active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCert(cert);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => cert.id && handleDelete(cert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};