import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech: string[];
  live_url: string | null;
  github_url: string | null;
  display_order: number;
};

const emptyForm = {
  title: "",
  description: "",
  tech: "",
  live_url: "",
  github_url: "",
  display_order: 0,
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Failed to load projects",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      live_url: project.live_url ?? "",
      github_url: project.github_url ?? "",
      display_order: project.display_order,
    });
    setImagePreview(project.image_url);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Project deleted" });
    loadProjects();
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);

    if (error) {
      toast({
        title: "Image upload failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = imagePreview;

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setSaving(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const payload = {
      title: form.title,
      description: form.description,
      tech: form.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live_url: form.live_url || null,
      github_url: form.github_url || null,
      display_order: Number(form.display_order) || 0,
      image_url: imageUrl,
    };

    const { error } = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);

    setSaving(false);

    if (error) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: editingId ? "Project updated" : "Project added" });
    resetForm();
    loadProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-outfit font-bold text-foreground">
            Manage Projects
          </h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Form */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tech Stack (comma separated)
              </label>
              <Input
                value={form.tech}
                onChange={(e) => setForm({ ...form, tech: e.target.value })}
                placeholder="React, Tailwind, Supabase"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Live URL</label>
                <Input
                  value={form.live_url}
                  onChange={(e) =>
                    setForm({ ...form, live_url: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={form.github_url}
                  onChange={(e) =>
                    setForm({ ...form, github_url: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                value={form.display_order}
                onChange={(e) =>
                  setForm({ ...form, display_order: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setImageFile(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-32 rounded-md object-cover border border-border"
                />
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Existing Projects {loading ? "" : `(${projects.length})`}
          </h2>

          {loading && <p className="text-muted-foreground">Loading...</p>}

          {!loading && projects.length === 0 && (
            <p className="text-muted-foreground">No projects yet.</p>
          )}

          {projects.map((project) => (
            <Card key={project.id} className="p-4 flex gap-4 items-start">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-20 h-20 rounded-md object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
