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

interface Skill {
  id?: string;
  name: string;
  category: string;
  proficiency_level?: number;
  years_experience?: number;
  is_featured: boolean;
  display_order: number;
}

interface SkillsListProps {
  userId: string;
}

export const SkillsList = ({ userId }: SkillsListProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, [userId]);

  const fetchSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId)
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });
    
    if (data) setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    
    setLoading(true);
    const skillData = { ...editingSkill, user_id: userId };

    const { error } = editingSkill.id
      ? await supabase.from("skills").update(skillData).eq("id", editingSkill.id)
      : await supabase.from("skills").insert(skillData);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Skill ${editingSkill.id ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      fetchSkills();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
      fetchSkills();
    }
  };

  const newSkill: Skill = {
    name: "",
    category: "",
    is_featured: false,
    display_order: skills.length,
  };

  const categories = ["Programming Languages", "Frameworks", "Tools", "Databases", "Cloud", "Other"];
  const proficiencyLevels = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Intermediate" },
    { value: 3, label: "Advanced" },
    { value: 4, label: "Expert" },
    { value: 5, label: "Master" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSkill(newSkill)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSkill?.id ? "Edit" : "Add"} Skill
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={editingSkill?.name || ""}
                  onChange={(e) => setEditingSkill(prev => prev ? {...prev, name: e.target.value} : null)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingSkill?.category || ""}
                  onValueChange={(value) => setEditingSkill(prev => prev ? {...prev, category: value} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="proficiency_level">Proficiency Level</Label>
                <Select
                  value={editingSkill?.proficiency_level?.toString() || ""}
                  onValueChange={(value) => setEditingSkill(prev => prev ? {...prev, proficiency_level: parseInt(value)} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value.toString()}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  value={editingSkill?.years_experience || ""}
                  onChange={(e) => setEditingSkill(prev => prev ? {...prev, years_experience: parseInt(e.target.value) || undefined} : null)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingSkill?.is_featured || false}
                  onChange={(e) => setEditingSkill(prev => prev ? {...prev, is_featured: e.target.checked} : null)}
                />
                <Label htmlFor="is_featured">Featured Skill</Label>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Skill"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Proficiency</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>
                  {skill.proficiency_level && proficiencyLevels.find(p => p.value === skill.proficiency_level)?.label}
                </TableCell>
                <TableCell>{skill.years_experience ? `${skill.years_experience} years` : "-"}</TableCell>
                <TableCell>{skill.is_featured ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => skill.id && handleDelete(skill.id)}
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