import { useCallback, useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getToken } from "../auth/auth-service";
import {
  getPresidentialSuiteManage,
  putPresidentialSuite,
  uploadDashboardImage,
  type PresidentialSuiteDoc,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import {
  CmsMediaRow,
  CmsPageBody,
  CmsSectionCard,
} from "../components/cms";

type FormState = {
  headline: string;
  description: string;
  sizeLabel: string;
  images: { secureUrl: string; publicId: string; alt: string }[];
  published: boolean;
  bookHref: string;
  bookButtonLabel: string;
  startingPrice: string;
  showPricing: boolean;
};

const emptyForm = (): FormState => ({
  headline: "",
  description: "",
  sizeLabel: "",
  images: [],
  published: true,
  bookHref: "/booking",
  bookButtonLabel: "Book Now",
  startingPrice: "",
  showPricing: false,
});

function docToForm(d: PresidentialSuiteDoc): FormState {
  return {
    headline: d.headline,
    description: d.description,
    sizeLabel: d.sizeLabel ?? "",
    images: (d.images ?? []).map((im) => ({
      secureUrl: im.secureUrl,
      publicId: im.publicId,
      alt: im.alt ?? "",
    })),
    published: d.published !== false,
    bookHref: d.bookHref ?? "/booking",
    bookButtonLabel: d.bookButtonLabel?.trim() || "Book Now",
    startingPrice:
      d.startingPrice !== undefined && d.startingPrice !== null ?
        String(d.startingPrice)
      : "",
    showPricing: Boolean(d.showPricing),
  };
}

const DashboardCmsPresidentialPage = () => {
  const token = getToken() ?? "";
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const doc = await getPresidentialSuiteManage(token);
      setForm(doc ? docToForm(doc) : emptyForm());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

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

  const save = async () => {
    if (!token) return;
    const startingPrice =
      form.startingPrice.trim() === "" ? undefined : Number(form.startingPrice);
    try {
      await putPresidentialSuite(token, {
        headline: form.headline.trim(),
        description: form.description.trim(),
        sizeLabel: form.sizeLabel.trim() || undefined,
        images: form.images.map((im) => ({
          secureUrl: im.secureUrl,
          publicId: im.publicId,
          alt: im.alt.trim() || undefined,
        })),
        published: form.published,
        bookHref: form.bookHref.trim() || "/booking",
        bookButtonLabel: form.bookButtonLabel.trim() || "Book Now",
        startingPrice: Number.isFinite(startingPrice as number) ? startingPrice : undefined,
        showPricing: form.showPricing,
      });
      toast.success("Presidential Suite saved");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

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
      title="Presidential Suite"
      subtitle="The large feature block above Pick Your Room — separate from the three room cards."
    >
      {loading ?
        <p className="text-muted-foreground">Loading…</p>
      : <CmsPageBody>
          <CmsSectionCard
            title="Copy"
            description="Headline and marketing description shown in the feature block."
          >
            <div className="space-y-5">
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
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="min-h-[140px] resize-y"
                />
              </div>
              <div className="grid gap-2 sm:max-w-md">
                <Label htmlFor="sizeLabel">Size label (badge)</Label>
                <Input
                  id="sizeLabel"
                  value={form.sizeLabel}
                  onChange={(e) => setForm((f) => ({ ...f, sizeLabel: e.target.value }))}
                />
              </div>
            </div>
          </CmsSectionCard>

          <CmsSectionCard
            title="Pricing & booking"
            description="Shown on the marketing block and linked booking flow."
          >
            <div className="grid gap-5 sm:grid-cols-2">
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
                <Label htmlFor="bookButtonLabel">Book button label</Label>
                <Input
                  id="bookButtonLabel"
                  value={form.bookButtonLabel}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bookButtonLabel: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:max-w-lg">
              <Label htmlFor="bookHref">Book href</Label>
              <Input
                id="bookHref"
                value={form.bookHref}
                onChange={(e) => setForm((f) => ({ ...f, bookHref: e.target.value }))}
              />
            </div>
          </CmsSectionCard>

          <CmsSectionCard title="Visibility">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                <div>
                  <Label htmlFor="published" className="text-espresso">
                    Published
                  </Label>
                  <p className="text-xs text-muted-foreground">Show on the public site</p>
                </div>
                <Switch
                  id="published"
                  checked={form.published}
                  onCheckedChange={(checked) =>
                    setForm((f) => ({ ...f, published: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                <div>
                  <Label htmlFor="showPricing" className="text-espresso">
                    Show pricing (Book Now page)
                  </Label>
                  <p className="text-xs text-muted-foreground">Expose starting price on booking</p>
                </div>
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
            title="Carousel images"
            description="Hero imagery for the Presidential block."
            actions={uploadControl}
            contentClassName="space-y-3"
          >
            {form.images.length === 0 ?
              <p className="rounded-xl border border-dashed border-border/70 bg-muted/15 px-4 py-8 text-center text-sm text-muted-foreground">
                No images yet — use Upload to add slides.
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

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              onClick={() => void save()}
              className="h-11 bg-gradient-gold px-8 text-ivory shadow-gold sm:min-w-[200px]"
            >
              Save Presidential Suite
            </Button>
          </div>
        </CmsPageBody>
      }
    </DashboardShell>
  );
};

export default DashboardCmsPresidentialPage;
