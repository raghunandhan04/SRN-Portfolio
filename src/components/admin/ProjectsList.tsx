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
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  description?: string;
  technologies?: string[];
  project_url?: string;
  github_url?: string;
  image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

interface ProjectsListProps {
  userId: string;
}

export const ProjectsList = ({ userId }: ProjectsListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("display_order");
    
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    setLoading(true);
    const projectData = { 
      ...editingProject, 
      user_id: userId,
      technologies: techInput.split(",").map(tech => tech.trim()).filter(Boolean)
    };

    const { error } = editingProject.id
      ? await supabase.from("projects").update(projectData).eq("id", editingProject.id)
      : await supabase.from("projects").insert(projectData);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Project ${editingProject.id ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    }
  };

  const newProject: Project = {
    title: "",
    is_featured: false,
    is_active: true,
    display_order: projects.length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProject(newProject);
              setTechInput("");
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject?.id ? "Edit" : "Add"} Project
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingProject?.title || ""}
                  onChange={(e) => setEditingProject(prev => prev ? {...prev, title: e.target.value} : null)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingProject?.description || ""}
                  onChange={(e) => setEditingProject(prev => prev ? {...prev, description: e.target.value} : null)}
                />
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project_url">Project URL</Label>
                  <Input
                    id="project_url"
                    value={editingProject?.project_url || ""}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, project_url: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={editingProject?.github_url || ""}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, github_url: e.target.value} : null)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={editingProject?.image_url || ""}
                  onChange={(e) => setEditingProject(prev => prev ? {...prev, image_url: e.target.value} : null)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingProject?.is_featured || false}
                  onChange={(e) => setEditingProject(prev => prev ? {...prev, is_featured: e.target.checked} : null)}
                />
                <Label htmlFor="is_featured">Featured Project</Label>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Project"}
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
              <TableHead>Technologies</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{project.is_featured ? "Yes" : "No"}</TableCell>
                <TableCell>{project.is_active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProject(project);
                        setTechInput(project.technologies?.join(", ") || "");
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => project.id && handleDelete(project.id)}
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