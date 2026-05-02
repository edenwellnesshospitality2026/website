import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getToken } from "../auth/auth-service";
import {
  deleteGalleryCategory,
  deleteGalleryImage,
  getGalleryCategoriesManage,
  getGalleryImagesManage,
  postGalleryCategory,
  postGalleryImage,
  putGalleryCategory,
  putGalleryImage,
  uploadDashboardImage,
  type GalleryCategoryDoc,
  type GalleryImageDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import {
  CmsPublishedBadge,
  CmsSectionCard,
  CMS_TABLE_HEADER_CLASS,
} from "../components/cms";

const DashboardCmsGalleryPage = () => {
  const token = getToken() ?? "";
  const [categories, setCategories] = useState<GalleryCategoryDoc[]>([]);
  const [images, setImages] = useState<GalleryImageDoc[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [catDialog, setCatDialog] = useState(false);
  const [editingCat, setEditingCat] = useState<GalleryCategoryDoc | null>(null);
  const [catForm, setCatForm] = useState({ title: "", slug: "", sortOrder: 0 });
  const [imgDialog, setImgDialog] = useState(false);
  const [editingImg, setEditingImg] = useState<GalleryImageDoc | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [imgForm, setImgForm] = useState({
    alt: "",
    sortOrder: 0,
    published: true,
  });

  const loadCategories = useCallback(async () => {
    if (!token) return;
    const data = await getGalleryCategoriesManage(token);
    setCategories(data);
  }, [token]);

  const loadImages = useCallback(
    async (categoryId: string) => {
      if (!token) return;
      const data = await getGalleryImagesManage(token, categoryId);
      setImages(data);
    },
    [token]
  );

  const refresh = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      await loadCategories();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [loadCategories, token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (categories.length > 0 && selectedId === null) {
      setSelectedId(String(categories[0].id ?? categories[0]._id));
    }
  }, [categories, selectedId]);

  useEffect(() => {
    if (selectedId) void loadImages(selectedId);
  }, [selectedId, loadImages]);

  const openNewCategory = () => {
    setEditingCat(null);
    setCatForm({ title: "", slug: "", sortOrder: 0 });
    setCatDialog(true);
  };

  const openEditCategory = (c: GalleryCategoryDoc) => {
    setEditingCat(c);
    setCatForm({
      title: c.title,
      slug: c.slug,
      sortOrder: c.sortOrder ?? 0,
    });
    setCatDialog(true);
  };

  const saveCategory = async () => {
    if (!token) return;
    try {
      if (editingCat) {
        const id = String(editingCat.id ?? editingCat._id);
        await putGalleryCategory(token, id, {
          title: catForm.title.trim(),
          slug: catForm.slug.trim(),
          sortOrder: Number(catForm.sortOrder) || 0,
        });
        toast.success("Category updated");
      } else {
        await postGalleryCategory(token, {
          title: catForm.title.trim(),
          slug: catForm.slug.trim(),
          sortOrder: Number(catForm.sortOrder) || 0,
        });
        toast.success("Category created");
      }
      setCatDialog(false);
      await loadCategories();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const removeCategory = async (c: GalleryCategoryDoc) => {
    if (!token || !confirm("Delete this category and all its images?")) return;
    try {
      const id = String(c.id ?? c._id);
      await deleteGalleryCategory(token, id);
      toast.success("Category deleted");
      if (selectedId === id) setSelectedId(null);
      await loadCategories();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const openNewImage = () => {
    if (!selectedId) {
      toast.error("Select a category first");
      return;
    }
    setEditingImg(null);
    setPendingFile(null);
    setImgForm({ alt: "", sortOrder: 0, published: true });
    setImgDialog(true);
  };

  const openEditImage = (im: GalleryImageDoc) => {
    setEditingImg(im);
    setPendingFile(null);
    setImgForm({
      alt: im.alt ?? "",
      sortOrder: im.sortOrder ?? 0,
      published: im.published !== false,
    });
    setImgDialog(true);
  };

  const submitImage = async () => {
    if (!token || !selectedId) return;
    try {
      if (editingImg) {
        await putGalleryImage(token, editingImg._id, {
          categoryId: selectedId,
          secureUrl: editingImg.secureUrl,
          publicId: editingImg.publicId,
          alt: imgForm.alt.trim() || undefined,
          sortOrder: Number(imgForm.sortOrder) || 0,
          published: imgForm.published,
        });
        toast.success("Image updated");
      } else {
        const file = pendingFile;
        if (!file) {
          toast.error("Choose an image file");
          return;
        }
        const up = await uploadDashboardImage(token, file);
        await postGalleryImage(token, {
          categoryId: selectedId,
          secureUrl: up.secureUrl,
          publicId: up.publicId,
          alt: imgForm.alt.trim() || undefined,
          sortOrder: Number(imgForm.sortOrder) || 0,
          published: imgForm.published,
        });
        toast.success("Image added");
      }
      setImgDialog(false);
      await loadImages(selectedId);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const removeImage = async (im: GalleryImageDoc) => {
    if (!token || !confirm("Remove this image?")) return;
    try {
      await deleteGalleryImage(token, im._id);
      toast.success("Removed");
      if (selectedId) await loadImages(selectedId);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <DashboardShell
      kicker="Content"
      title="Gallery"
      subtitle="Categories and images for the public gallery page and homepage carousel."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <CmsSectionCard
          className="max-w-none"
          title="Categories"
          description="Select a row to load images for that gallery group."
          actions={
            <Button size="sm" className="bg-gradient-gold text-ivory shadow-gold" onClick={openNewCategory}>
              <Plus className="mr-1 h-4 w-4" /> Category
            </Button>
          }
          contentClassName="px-0 pb-6 pt-0"
        >
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/50">
            {loading ?
              <p className="p-6 text-center text-sm text-muted-foreground">Loading…</p>
            : categories.length === 0 ?
              <p className="p-8 text-center text-sm text-muted-foreground">
                No categories yet — create one to organize images.
              </p>
            : <Table>
                <TableHeader className={CMS_TABLE_HEADER_CLASS}>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((c) => {
                    const id = String(c.id ?? c._id);
                    const active = selectedId === id;
                    return (
                      <TableRow
                        key={id}
                        className={active ? "bg-muted/40" : "border-border/50"}
                        onClick={() => setSelectedId(id)}
                      >
                        <TableCell className="cursor-pointer font-medium">{c.title}</TableCell>
                        <TableCell className="cursor-pointer font-mono text-xs">{c.slug}</TableCell>
                        <TableCell className="space-x-1 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditCategory(c);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              void removeCategory(c);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            }
          </div>
        </CmsSectionCard>

        <CmsSectionCard
          className="max-w-none"
          title="Images"
          description="Images for the selected category."
          actions={
            <Button size="sm" variant="secondary" onClick={openNewImage} disabled={!selectedId}>
              <ImagePlus className="mr-1 h-4 w-4" /> Add image
            </Button>
          }
          contentClassName="px-0 pb-6 pt-0"
        >
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/50">
            {!selectedId ?
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-8 text-center">
                <p className="text-sm font-medium text-espresso">Select a category</p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  Choose a category on the left to view and manage its images.
                </p>
              </div>
            : <Table>
                <TableHeader className={CMS_TABLE_HEADER_CLASS}>
                  <TableRow>
                    <TableHead className="w-20">Preview</TableHead>
                    <TableHead>Alt</TableHead>
                    <TableHead className="w-28">Published</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {images.map((im) => (
                    <TableRow key={im._id} className="border-border/50">
                      <TableCell>
                        <img
                          src={im.secureUrl}
                          alt=""
                          className="h-12 w-12 rounded-md object-cover ring-1 ring-border/40"
                        />
                      </TableCell>
                      <TableCell className="max-w-[180px] truncate text-sm">
                        {im.alt || "—"}
                      </TableCell>
                      <TableCell>
                        <CmsPublishedBadge published={im.published !== false} />
                      </TableCell>
                      <TableCell className="space-x-1 text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditImage(im)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => void removeImage(im)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            }
          </div>
        </CmsSectionCard>
      </div>

      <Dialog open={catDialog} onOpenChange={setCatDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCat ? "Edit category" : "New category"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={catForm.title}
                onChange={(e) => setCatForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                value={catForm.slug}
                onChange={(e) => setCatForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={catForm.sortOrder}
                onChange={(e) =>
                  setCatForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCatDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => void saveCategory()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={imgDialog} onOpenChange={setImgDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingImg ? "Edit image" : "New image"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            {!editingImg && (
              <div className="grid gap-2">
                <Label>File</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPendingFile(e.target.files?.[0] ?? null)}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Alt text</Label>
              <Input
                value={imgForm.alt}
                onChange={(e) => setImgForm((f) => ({ ...f, alt: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={imgForm.sortOrder}
                onChange={(e) =>
                  setImgForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Published</Label>
              <Switch
                checked={imgForm.published}
                onCheckedChange={(checked) =>
                  setImgForm((f) => ({ ...f, published: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImgDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => void submitImage()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
};

export default DashboardCmsGalleryPage;
