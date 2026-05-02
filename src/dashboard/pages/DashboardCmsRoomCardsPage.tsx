import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
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
  deleteRoomCard,
  getRoomCardsManage,
  postRoomCard,
  putRoomCard,
  uploadDashboardImage,
  type RoomCardDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import {
  CmsDataTable,
  CmsMediaRow,
  CmsPublishedBadge,
  CmsSectionCard,
  CMS_TABLE_HEADER_CLASS,
} from "../components/cms";

type FormState = {
  slug: string;
  headline: string;
  description: string;
  sizeLabel: string;
  images: { secureUrl: string; publicId: string; alt: string }[];
  sortOrder: number;
  published: boolean;
  bookHref: string;
  startingPrice: string;
  showPricing: boolean;
};

const emptyForm = (): FormState => ({
  slug: "",
  headline: "",
  description: "",
  sizeLabel: "",
  images: [],
  sortOrder: 0,
  published: true,
  bookHref: "/booking",
  startingPrice: "",
  showPricing: false,
});

function docToForm(d: RoomCardDoc): FormState {
  return {
    slug: d.slug,
    headline: d.headline,
    description: d.description,
    sizeLabel: d.sizeLabel ?? "",
    images: (d.images ?? []).map((im) => ({
      secureUrl: im.secureUrl,
      publicId: im.publicId,
      alt: im.alt ?? "",
    })),
    sortOrder: d.sortOrder ?? 0,
    published: d.published !== false,
    bookHref: d.bookHref ?? "/booking",
    startingPrice:
      d.startingPrice !== undefined && d.startingPrice !== null ?
        String(d.startingPrice)
      : "",
    showPricing: Boolean(d.showPricing),
  };
}

const DashboardCmsRoomCardsPage = () => {
  const token = getToken() ?? "";
  const [rows, setRows] = useState<RoomCardDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getRoomCardsManage(token);
      setRows(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load room cards");
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

  const openEdit = (row: RoomCardDoc) => {
    setEditingId(row._id);
    setForm(docToForm(row));
    setDialogOpen(true);
  };

  const removeImageAt = (index: number) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));
  };

  const updateImageAlt = (index: number, alt: string) => {
    setForm((f) => ({
      ...f,
      images: f.images.map((im, i) => (i === index ? { ...im, alt } : im)),
    }));
  };

  const addUpload = async (file: File | null) => {
    if (!file || !token) return;
    try {
      const up = await uploadDashboardImage(token, file);
      setForm((f) => ({
        ...f,
        images: [...f.images, { secureUrl: up.secureUrl, publicId: up.publicId, alt: "" }],
      }));
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  const buildPayload = () => {
    const startingPrice =
      form.startingPrice.trim() === "" ? undefined : Number(form.startingPrice);
    return {
      slug: form.slug.trim(),
      headline: form.headline.trim(),
      description: form.description.trim(),
      sizeLabel: form.sizeLabel.trim() || undefined,
      images: form.images.map((im) => ({
        secureUrl: im.secureUrl,
        publicId: im.publicId,
        alt: im.alt.trim() || undefined,
      })),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
      bookHref: form.bookHref.trim() || "/booking",
      startingPrice: Number.isFinite(startingPrice as number) ? startingPrice : undefined,
      showPricing: form.showPricing,
    };
  };

  const save = async () => {
    if (!token) return;
    try {
      const payload = buildPayload();
      if (editingId) {
        await putRoomCard(token, editingId, payload);
        toast.success("Room card updated");
      } else {
        await postRoomCard(token, payload);
        toast.success("Room card created");
      }
      setDialogOpen(false);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this room card?")) return;
    try {
      await deleteRoomCard(token, id);
      toast.success("Deleted");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const addCardBtn = (
    <Button onClick={openCreate} className="bg-gradient-gold text-ivory shadow-gold">
      <Plus className="mr-2 h-4 w-4" /> Add card
    </Button>
  );

  const uploadControl = (
    <label className="cursor-pointer">
      <span className="inline-flex items-center rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-espresso shadow-sm transition-colors hover:bg-muted/50">
        <ImagePlus className="mr-1.5 h-4 w-4" /> Upload
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => addUpload(e.target.files?.[0] ?? null)}
      />
    </label>
  );

  return (
    <DashboardShell
      kicker="Content"
      title="Pick Your Room cards"
      subtitle="Eden Haven, Eden Residence, Eden Grand grid on the marketing site (not the Presidential Suite block)."
    >
      <CmsDataTable
        title="Room cards"
        description="Three showcase cards on the accommodations grid."
        actions={addCardBtn}
        empty={
          !loading && rows.length === 0 ?
            "No room cards yet — add your first card."
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
                <TableHead>Slug</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-28">Published</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r._id} className="border-border/50">
                  <TableCell className="font-mono text-sm">{r.slug}</TableCell>
                  <TableCell className="max-w-[240px] truncate">{r.headline}</TableCell>
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
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? "Edit room card" : "New room card"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <CmsSectionCard
              className="shadow-none"
              title="Identity & order"
              description="URL slug and sort position in the grid."
              contentClassName="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="eden-haven"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sortOrder">Sort order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
                    }
                  />
                </div>
              </div>
            </CmsSectionCard>

            <CmsSectionCard
              className="shadow-none"
              title="Copy"
              contentClassName="space-y-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={form.headline}
                  onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="min-h-[100px] resize-y"
                />
              </div>
              <div className="grid gap-2 sm:max-w-md">
                <Label htmlFor="sizeLabel">Size label</Label>
                <Input
                  id="sizeLabel"
                  value={form.sizeLabel}
                  onChange={(e) => setForm((f) => ({ ...f, sizeLabel: e.target.value }))}
                />
              </div>
            </CmsSectionCard>

            <CmsSectionCard
              className="shadow-none"
              title="Pricing & booking"
              contentClassName="space-y-4"
            >
              <div className="grid gap-4 sm:max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="startingPrice">Starting price (₹)</Label>
                  <Input
                    id="startingPrice"
                    value={form.startingPrice}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startingPrice: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bookHref">Book href</Label>
                  <Input
                    id="bookHref"
                    value={form.bookHref}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bookHref: e.target.value }))
                    }
                  />
                </div>
              </div>
            </CmsSectionCard>

            <CmsSectionCard className="shadow-none" title="Visibility">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                  <Label htmlFor="published" className="text-espresso">
                    Published
                  </Label>
                  <Switch
                    id="published"
                    checked={form.published}
                    onCheckedChange={(checked) =>
                      setForm((f) => ({ ...f, published: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                  <Label htmlFor="showPricing" className="text-espresso">
                    Show pricing (Book Now page)
                  </Label>
                  <Switch
                    id="showPricing"
                    checked={form.showPricing}
                    onCheckedChange={(checked) =>
                      setForm((f) => ({ ...f, showPricing: checked }))
                    }
                  />
                </div>
              </div>
            </CmsSectionCard>

            <CmsSectionCard
              className="shadow-none"
              title="Images"
              description="Gallery thumbnails for this card."
              actions={uploadControl}
              contentClassName="space-y-3"
            >
              {form.images.length === 0 ?
                <p className="rounded-xl border border-dashed border-border/70 bg-muted/15 px-4 py-6 text-center text-sm text-muted-foreground">
                  No images — upload to add visuals.
                </p>
              : form.images.map((im, i) => (
                  <CmsMediaRow
                    key={`${im.publicId}-${i}`}
                    secureUrl={im.secureUrl}
                    publicId={im.publicId}
                    alt={im.alt}
                    onAltChange={(v) => updateImageAlt(i, v)}
                    onRemove={() => removeImageAt(i)}
                  />
                ))
              }
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

export default DashboardCmsRoomCardsPage;
