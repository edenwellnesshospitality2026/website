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
  deleteMembershipTier,
  getMembershipTiersManage,
  postMembershipTier,
  putMembershipTier,
  type MembershipTierDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import {
  CmsDataTable,
  CmsSectionCard,
  CMS_TABLE_HEADER_CLASS,
} from "../components/cms";

type FormState = {
  title: string;
  description: string;
  priceLabel: string;
  featuresText: string;
  isPopular: boolean;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  sortOrder: number;
  published: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  description: "",
  priceLabel: "On request",
  featuresText: "",
  isPopular: false,
  primaryCtaLabel: "Talk to our team",
  primaryCtaHref: "#contact",
  secondaryCtaLabel: "",
  secondaryCtaHref: "",
  sortOrder: 0,
  published: true,
});

function docToForm(d: MembershipTierDoc): FormState {
  return {
    title: d.title,
    description: d.description,
    priceLabel: d.priceLabel ?? "On request",
    featuresText: (d.features ?? []).join("\n"),
    isPopular: Boolean(d.isPopular),
    primaryCtaLabel: d.primaryCtaLabel ?? "",
    primaryCtaHref: d.primaryCtaHref ?? "",
    secondaryCtaLabel: d.secondaryCtaLabel ?? "",
    secondaryCtaHref: d.secondaryCtaHref ?? "",
    sortOrder: d.sortOrder ?? 0,
    published: d.published !== false,
  };
}

const DashboardCmsMembershipPage = () => {
  const token = getToken() ?? "";
  const [rows, setRows] = useState<MembershipTierDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getMembershipTiersManage(token);
      setRows(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load tiers");
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

  const openEdit = (row: MembershipTierDoc) => {
    setEditingId(row._id);
    setForm(docToForm(row));
    setDialogOpen(true);
  };

  const save = async () => {
    if (!token) return;
    const features = form.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priceLabel: form.priceLabel.trim() || undefined,
      features,
      isPopular: form.isPopular,
      primaryCtaLabel: form.primaryCtaLabel.trim() || undefined,
      primaryCtaHref: form.primaryCtaHref.trim() || undefined,
      secondaryCtaLabel: form.secondaryCtaLabel.trim() || undefined,
      secondaryCtaHref: form.secondaryCtaHref.trim() || undefined,
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };
    try {
      if (editingId) {
        await putMembershipTier(token, editingId, payload);
        toast.success("Tier updated");
      } else {
        await postMembershipTier(token, payload);
        toast.success("Tier created");
      }
      setDialogOpen(false);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this tier?")) return;
    try {
      await deleteMembershipTier(token, id);
      toast.success("Deleted");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const addTierBtn = (
    <Button onClick={openCreate} className="bg-gradient-gold text-ivory shadow-gold">
      <Plus className="mr-2 h-4 w-4" /> Add tier
    </Button>
  );

  return (
    <DashboardShell
      kicker="Content"
      title="Membership tiers"
      subtitle="Plans shown on the homepage membership section."
    >
      <CmsDataTable
        title="Membership tiers"
        description="Editable cards on the homepage membership band."
        actions={addTierBtn}
        empty={
          !loading && rows.length === 0 ?
            "No tiers yet — add your first membership plan."
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
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r._id} className="border-border/50">
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{r.priceLabel}</TableCell>
                  <TableCell>
                    {r.isPopular ?
                      <span className="inline-flex rounded-full border border-gold/35 bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold-deep">
                        Popular
                      </span>
                    : <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>{r.sortOrder ?? 0}</TableCell>
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
              {editingId ? "Edit tier" : "New tier"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <CmsSectionCard
              className="shadow-none"
              title="Copy & pricing"
              contentClassName="space-y-4"
            >
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="min-h-[88px] resize-y"
                />
              </div>
              <div className="grid gap-2">
                <Label>Price label</Label>
                <Input
                  value={form.priceLabel}
                  onChange={(e) => setForm((f) => ({ ...f, priceLabel: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  rows={5}
                  value={form.featuresText}
                  onChange={(e) => setForm((f) => ({ ...f, featuresText: e.target.value }))}
                  className="min-h-[120px] resize-y font-mono text-sm"
                />
              </div>
            </CmsSectionCard>

            <CmsSectionCard className="shadow-none" title="Calls to action" contentClassName="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Primary CTA label</Label>
                  <Input
                    value={form.primaryCtaLabel}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, primaryCtaLabel: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Primary CTA href</Label>
                  <Input
                    value={form.primaryCtaHref}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, primaryCtaHref: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Secondary CTA label</Label>
                  <Input
                    value={form.secondaryCtaLabel}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, secondaryCtaLabel: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Secondary CTA href</Label>
                  <Input
                    value={form.secondaryCtaHref}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, secondaryCtaHref: e.target.value }))
                    }
                  />
                </div>
              </div>
            </CmsSectionCard>

            <CmsSectionCard className="shadow-none" title="Order & visibility">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2 sm:max-w-xs">
                  <Label>Sort order</Label>
                  <Input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3 sm:col-span-2">
                  <Label>Popular badge</Label>
                  <Switch
                    checked={form.isPopular}
                    onCheckedChange={(checked) =>
                      setForm((f) => ({ ...f, isPopular: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3 sm:col-span-2">
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

export default DashboardCmsMembershipPage;
