import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";

interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  display_name?: string;
  icon_name?: string;
  is_active: boolean;
  display_order: number;
}

interface SocialLinksListProps {
  userId: string;
}

export const SocialLinksList = ({ userId }: SocialLinksListProps) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSocialLinks();
  }, [userId]);

  const fetchSocialLinks = async () => {
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .eq("user_id", userId)
      .order("display_order");
    
    if (data) setSocialLinks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    
    setLoading(true);
    const linkData = { ...editingLink, user_id: userId };

    const { error } = editingLink.id
      ? await supabase.from("social_links").update(linkData).eq("id", editingLink.id)
      : await supabase.from("social_links").insert(linkData);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Social link ${editingLink.id ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      fetchSocialLinks();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Social link deleted successfully",
      });
      fetchSocialLinks();
    }
  };

  const newSocialLink: SocialLink = {
    platform: "",
    url: "",
    is_active: true,
    display_order: socialLinks.length,
  };

  const platforms = [
    { value: "LinkedIn", icon: "linkedin" },
    { value: "GitHub", icon: "github" },
    { value: "Twitter", icon: "twitter" },
    { value: "Instagram", icon: "instagram" },
    { value: "Facebook", icon: "facebook" },
    { value: "YouTube", icon: "youtube" },
    { value: "Portfolio", icon: "globe" },
    { value: "Email", icon: "mail" },
    { value: "Phone", icon: "phone" },
    { value: "Other", icon: "link" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Social Links</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingLink(newSocialLink)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLink?.id ? "Edit" : "Add"} Social Link
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={editingLink?.platform || ""}
                  onValueChange={(value) => {
                    const platformData = platforms.find(p => p.value === value);
                    setEditingLink(prev => prev ? {
                      ...prev, 
                      platform: value,
                      icon_name: platformData?.icon || "link"
                    } : null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={editingLink?.url || ""}
                  onChange={(e) => setEditingLink(prev => prev ? {...prev, url: e.target.value} : null)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="display_name">Display Name (optional)</Label>
                <Input
                  id="display_name"
                  value={editingLink?.display_name || ""}
                  onChange={(e) => setEditingLink(prev => prev ? {...prev, display_name: e.target.value} : null)}
                />
              </div>

              <div>
                <Label htmlFor="icon_name">Icon Name</Label>
                <Input
                  id="icon_name"
                  value={editingLink?.icon_name || ""}
                  onChange={(e) => setEditingLink(prev => prev ? {...prev, icon_name: e.target.value} : null)}
                  placeholder="lucide icon name"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingLink?.is_active || false}
                  onChange={(e) => setEditingLink(prev => prev ? {...prev, is_active: e.target.checked} : null)}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Social Link"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.platform}</TableCell>
                <TableCell>{link.display_name || "-"}</TableCell>
                <TableCell className="max-w-xs truncate">{link.url}</TableCell>
                <TableCell>{link.is_active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingLink(link);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => link.id && handleDelete(link.id)}
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