import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getToken } from "../auth/auth-service";
import {
  DEFAULT_CORPORATE_LINK_URL,
  getSiteContentManage,
  putSiteContent,
  uploadDashboardImage,
  type SiteContentHeroSlide,
} from "@/lib/cms-api";
import { DashboardShell } from "../components/DashboardShell";
import { CmsMediaRow, CmsPageBody, CmsSectionCard } from "../components/cms";

const KEY = "homepage";

const DashboardCmsSitePage = () => {
  const token = getToken() ?? "";
  const [pickYourRoomTitle, setPickYourRoomTitle] = useState("");
  const [pickYourRoomIntro, setPickYourRoomIntro] = useState("");
  const [membershipIntro, setMembershipIntro] = useState("");
  const [guestStoriesIntro, setGuestStoriesIntro] = useState("");
  const [heroSlides, setHeroSlides] = useState<SiteContentHeroSlide[]>([]);
  const [corporateLinkUrl, setCorporateLinkUrl] = useState("");
  const [corporateLinkVisible, setCorporateLinkVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const doc = await getSiteContentManage(token, KEY);
      setPickYourRoomTitle(doc?.pickYourRoomTitle ?? "");
      setPickYourRoomIntro(doc?.pickYourRoomIntro ?? "");
      setMembershipIntro(doc?.membershipIntro ?? "");
      setGuestStoriesIntro(doc?.guestStoriesIntro ?? "");
      const slides = doc?.heroSlides ?? [];
      const sorted = [...slides].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setHeroSlides(sorted);
      setCorporateLinkUrl(doc?.corporateLinkUrl ?? "");
      setCorporateLinkVisible(doc?.corporateLinkVisible !== false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    try {
      const ordered = heroSlides.map((s, i) => ({ ...s, sortOrder: i }));
      await putSiteContent(token, {
        key: KEY,
        pickYourRoomTitle,
        pickYourRoomIntro,
        membershipIntro,
        guestStoriesIntro,
        heroSlides: ordered,
        corporateLinkUrl: corporateLinkUrl.trim(),
        corporateLinkVisible,
      });
      toast.success("Homepage settings saved");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const moveSlide = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= heroSlides.length) return;
    setHeroSlides((slides) => {
      const next = [...slides];
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const removeSlide = (index: number) => {
    setHeroSlides((s) => s.filter((_, i) => i !== index));
  };

  const updateSlide = (index: number, patch: Partial<SiteContentHeroSlide>) => {
    setHeroSlides((slides) => slides.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const addHeroSlideUpload = async (file: File | null) => {
    if (!file || !token) return;
    try {
      const up = await uploadDashboardImage(token, file);
      setHeroSlides((slides) => [
        ...slides,
        {
          secureUrl: up.secureUrl,
          publicId: up.publicId,
          alt: "",
          title: "",
          subtitle: "",
          description: "",
          sortOrder: slides.length,
        },
      ]);
      toast.success("Slide added — fill in text and save.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  return (
    <DashboardShell
      kicker="Content"
      title="Homepage"
      subtitle="Hero carousel, corporate nav link, and section intros."
    >
      {loading ?
        <p className="text-muted-foreground">Loading…</p>
      : <CmsPageBody>
          <CmsSectionCard
            title="Homepage hero"
            description="Carousel at the top of the marketing homepage. Each slide needs an image; title, subtitle, and description are optional."
            actions={
              <label className="cursor-pointer">
                <span className="inline-flex items-center rounded-lg border border-border/70 bg-card px-3 py-2 text-sm font-medium text-espresso shadow-sm transition-colors hover:bg-muted/50">
                  <ImagePlus className="mr-1.5 h-4 w-4" /> Add slide
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => addHeroSlideUpload(e.target.files?.[0] ?? null)}
                />
              </label>
            }
            contentClassName="space-y-6"
          >
            {heroSlides.length === 0 ?
              <p className="rounded-xl border border-dashed border-border/70 bg-muted/15 px-4 py-8 text-center text-sm text-muted-foreground">
                No slides yet — use Add slide to upload an image for each carousel entry.
              </p>
            : heroSlides.map((slide, index) => (
                <div key={`${slide.publicId}-${index}`} className="space-y-4 rounded-xl border border-border/60 bg-card/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-espresso">Slide {index + 1}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={index === 0}
                        onClick={() => moveSlide(index, -1)}
                        aria-label="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={index >= heroSlides.length - 1}
                        onClick={() => moveSlide(index, 1)}
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeSlide(index)}
                        aria-label="Remove slide"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CmsMediaRow
                    secureUrl={slide.secureUrl}
                    publicId={slide.publicId}
                    alt={slide.alt ?? ""}
                    onAltChange={(alt) => updateSlide(index, { alt })}
                    onRemove={() => removeSlide(index)}
                  />
                  <div className="grid gap-3 sm:grid-cols-1">
                    <div className="grid gap-2">
                      <Label>Title (optional)</Label>
                      <Input
                        value={slide.title ?? ""}
                        onChange={(e) => updateSlide(index, { title: e.target.value })}
                        placeholder="Main headline"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Subtitle (optional)</Label>
                      <Input
                        value={slide.subtitle ?? ""}
                        onChange={(e) => updateSlide(index, { subtitle: e.target.value })}
                        placeholder="Accent line under title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Description (optional)</Label>
                      <Textarea
                        rows={2}
                        value={slide.description ?? ""}
                        onChange={(e) => updateSlide(index, { description: e.target.value })}
                        placeholder="Supporting line"
                        className="resize-y min-h-[72px]"
                      />
                    </div>
                  </div>
                </div>
              ))
            }
          </CmsSectionCard>

          <CmsSectionCard
            title="Corporate link (navbar)"
            description="Opens in a new tab. Leave URL empty to use the default Google Drive view link."
            contentClassName="space-y-5"
          >
            <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-muted/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Label htmlFor="corp-vis" className="text-espresso">
                  Show &quot;Corporate&quot; in navigation
                </Label>
                <p className="text-xs text-muted-foreground">Hide to remove the link from desktop and mobile menus.</p>
              </div>
              <Switch
                id="corp-vis"
                checked={corporateLinkVisible}
                onCheckedChange={setCorporateLinkVisible}
              />
            </div>
            <div className="grid gap-2 sm:max-w-xl">
              <Label htmlFor="corp-url">Corporate URL</Label>
              <Input
                id="corp-url"
                value={corporateLinkUrl}
                onChange={(e) => setCorporateLinkUrl(e.target.value)}
                placeholder={DEFAULT_CORPORATE_LINK_URL}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Default if empty:{" "}
                <span className="break-all">{DEFAULT_CORPORATE_LINK_URL}</span>
              </p>
            </div>
          </CmsSectionCard>

          <CmsSectionCard
            title="Section copy"
            description="Pick Your Room, membership, and guest stories intros."
            contentClassName="space-y-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="pickTitle">Pick Your Room / Suite — section title</Label>
              <Input
                id="pickTitle"
                value={pickYourRoomTitle}
                onChange={(e) => setPickYourRoomTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pick">Pick Your Room / Suite — subtitle paragraph</Label>
              <Textarea
                id="pick"
                rows={3}
                value={pickYourRoomIntro}
                onChange={(e) => setPickYourRoomIntro(e.target.value)}
                className="min-h-[88px] resize-y"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mem">Membership section intro</Label>
              <Textarea
                id="mem"
                rows={4}
                value={membershipIntro}
                onChange={(e) => setMembershipIntro(e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guest">Guest stories intro</Label>
              <Textarea
                id="guest"
                rows={3}
                value={guestStoriesIntro}
                onChange={(e) => setGuestStoriesIntro(e.target.value)}
                className="min-h-[88px] resize-y"
              />
            </div>
          </CmsSectionCard>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              onClick={() => void save()}
              className="h-11 w-full bg-gradient-gold px-8 text-ivory shadow-gold sm:w-auto sm:min-w-[180px]"
            >
              Save homepage
            </Button>
          </div>
        </CmsPageBody>
      }
    </DashboardShell>
  );
};

export default DashboardCmsSitePage;
