import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { getToken } from "../auth/auth-service";
import {
  deleteGuestStory,
  getGuestStoriesManage,
  postGuestStory,
  putGuestStory,
  type GuestStoryDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import {
  CmsDataTable,
  CmsPublishedBadge,
  CmsSectionCard,
  CMS_TABLE_HEADER_CLASS,
} from "../components/cms";

type FormState = {
  headline: string;
  subtitle: string;
  youtubeUrl: string;
  body: string;
  sortOrder: number;
  published: boolean;
};

const emptyForm = (): FormState => ({
  headline: "",
  subtitle: "",
  youtubeUrl: "",
  body: "",
  sortOrder: 0,
  published: true,
});

function docToForm(d: GuestStoryDoc): FormState {
  return {
    headline: d.headline,
    subtitle: d.subtitle ?? "",
    youtubeUrl: d.youtubeUrl,
    body: d.body ?? "",
    sortOrder: d.sortOrder ?? 0,
    published: d.published !== false,
  };
}

const DashboardCmsStoriesPage = () => {
  const token = getToken() ?? "";
  const [rows, setRows] = useState<GuestStoryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getGuestStoriesManage(token);
      setRows(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load stories");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: GuestStoryDoc) => {
    setEditingId(row._id);
    setForm(docToForm(row));
    setDialogOpen(true);
  };

  const save = async () => {
    if (!token) return;
    const payload = {
      headline: form.headline.trim(),
      subtitle: form.subtitle.trim() || undefined,
      youtubeUrl: form.youtubeUrl.trim(),
      body: form.body.trim() || undefined,
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };
    try {
      if (editingId) {
        await putGuestStory(token, editingId, payload);
        toast.success("Story updated");
      } else {
        await postGuestStory(token, payload);
        toast.success("Story created");
      }
      setDialogOpen(false);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this story?")) return;
    try {
      await deleteGuestStory(token, id);
      toast.success("Deleted");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const addStoryBtn = (
    <Button onClick={openCreate} className="bg-gradient-gold text-ivory shadow-gold">
      <Plus className="mr-2 h-4 w-4" /> Add story
    </Button>
  );

  return (
    <DashboardShell
      kicker="Content"
      title="Guest stories"
      subtitle="YouTube Shorts / videos embedded in the homepage carousel."
    >
      <CmsDataTable
        title="Guest stories"
        description="Video entries in the testimonial / stories carousel."
        actions={addStoryBtn}
        empty={
          !loading && rows.length === 0 ?
            "No stories yet — add a YouTube Short or embed URL."
          : undefined
        }
      >
        {loading ?
          <p className="p-8 text-center text-sm text-muted-foreground">Loading…</p>
        : rows.length === 0 ?
          null
        : <Table>
            <TableHeader className={CMS_TABLE_HEADER_CLASS}>
              <TableRow>
                <TableHead>Headline</TableHead>
                <TableHead className="max-w-[220px]">YouTube</TableHead>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-28">Published</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r._id} className="border-border/50">
                  <TableCell className="font-medium">{r.headline}</TableCell>
                  <TableCell className="max-w-[220px] truncate font-mono text-xs" title={r.youtubeUrl}>
                    {r.youtubeUrl}
                  </TableCell>
                  <TableCell>{r.sortOrder ?? 0}</TableCell>
                  <TableCell>
                    <CmsPublishedBadge published={r.published !== false} />
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => openEdit(r)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => remove(r._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </CmsDataTable>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? "Edit story" : "New story"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <CmsSectionCard className="shadow-none" title="Story content" contentClassName="space-y-4">
              <div className="grid gap-2">
                <Label>Headline</Label>
                <Input
                  value={form.headline}
                  onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Subtitle</Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>YouTube URL</Label>
                <Input
                  placeholder="https://www.youtube.com/shorts/..."
                  value={form.youtubeUrl}
                  onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
                  className="font-mono text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label>Body (optional)</Label>
                <Textarea
                  rows={3}
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  className="min-h-[88px] resize-y"
                />
              </div>
            </CmsSectionCard>

            <CmsSectionCard className="shadow-none" title="Publishing">
              <div className="grid gap-4">
                <div className="grid gap-2 sm:max-w-[140px]">
                  <Label>Sort order</Label>
                  <Input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                  <Label>Published</Label>
                  <Switch
                    checked={form.published}
                    onCheckedChange={(checked) =>
                      setForm((f) => ({ ...f, published: checked }))
                    }
                  />
                </div>
              </div>
            </CmsSectionCard>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-gold text-ivory shadow-gold" onClick={() => void save()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
};

export default DashboardCmsStoriesPage;
