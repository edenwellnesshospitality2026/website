"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomTypeSelector from "@/components/accommodations/RoomSelector";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Image,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getGallery } from "@/lib/cms-api";

interface GalleryImage {
  src: string;
  alt: string;
}

const GalleryPage = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["cms", "gallery"],
    queryFn: getGallery,
    staleTime: 60_000,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<GalleryImage[]>([]);
  const [overlayDirection, setOverlayDirection] = useState<"left" | "right" | null>(
    null
  );

  const sections = useMemo(() => {
    if (!categories?.length) return [];
    return categories.map((c) => ({
      key: String(c.slug || c.id),
      title: c.title,
      images: (c.images ?? []).map((im) => ({
        src: im.secureUrl,
        alt: im.alt || c.title,
      })),
    }));
  }, [categories]);

  const [openSections, setOpenSections] = useState<string[]>([]);
  const didInitSections = useRef(false);

  useEffect(() => {
    if (sections.length > 0 && !didInitSections.current) {
      didInitSections.current = true;
      setOpenSections(sections.map((s) => s.key));
    }
  }, [sections]);

  const openLightbox = (images: GalleryImage[], startIndex: number) => {
    setCurrentImages(images);
    setSelectedImageIndex(startIndex);
    setIsOpen(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? currentImages.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === currentImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId) ?
        prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const showOverlay = (dir: "left" | "right") => {
    setOverlayDirection(dir);
    setTimeout(() => setOverlayDirection(null), 150);
  };

  const renderImageGrid = (images: GalleryImage[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
          onClick={() => openLightbox(images, index)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute inset-0 bg-eden-dark/0 group-hover:bg-eden-dark/20 transition-all duration-300 flex items-center justify-center">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/sxe8qsgazl/edenwellness/Home-Page-Cover.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-serif font-bold mb-4">Gallery</h1>
          <p className="text-xl font-light">
            Explore the elegance and charm of Eden through curated images.
          </p>
        </div>
      </section>

      <main className="section-padding" id="gallery">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
              What Life at Eden Looks Like
            </h2>
            <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
            <p className="text-eden-text text-lg">
              Get a closer look at the spaces, details, and experiences that define our stays
            </p>
          </div>

          <div className="space-y-6 mb-5">
            {isLoading ? (
              <p className="text-center text-stone-600 py-12">Loading gallery…</p>
            ) : sections.length === 0 ? (
              <p className="text-center text-stone-600 py-12">Gallery coming soon.</p>
            ) : (
              sections.map((section) => (
                <Card key={section.key} className="overflow-hidden shadow-lg border-0">
                  <Collapsible
                    open={openSections.includes(section.key)}
                    onOpenChange={() => toggleSection(section.key)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="cursor-pointer hover:bg-stone-50 transition-colors bg-gradient-to-r from-stone-50 to-white p-6">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-serif text-stone-800 flex items-center space-x-3">
                            <div className="w-2 h-8 bg-eden rounded-full"></div>
                            <span>{section.title}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant="secondary"
                              className="bg-eden/10 text-eden border-0 px-3 py-1"
                            >
                              {section.images.length} photos
                            </Badge>
                            <ChevronDown
                              className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${
                                openSections.includes(section.key) ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6">
                        {section.images.length > 0 ?
                          renderImageGrid(section.images)
                        : (
                          <p className="text-stone-500 text-sm">No images in this category yet.</p>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black/95">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {currentImages.length > 1 && (
              <>
                <div
                  className="absolute left-0 top-0 h-full w-1/2 z-40 cursor-pointer"
                  onClick={() => {
                    showOverlay("left");
                    navigateImage("prev");
                  }}
                />
                <div
                  className="absolute right-0 top-0 h-full w-1/2 z-40 cursor-pointer"
                  onClick={() => {
                    showOverlay("right");
                    navigateImage("next");
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                  onClick={() => {
                    showOverlay("left");
                    navigateImage("prev");
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                  onClick={() => {
                    showOverlay("right");
                    navigateImage("next");
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
                {overlayDirection && (
                  <div className="absolute inset-0 z-30 bg-black/10 animate-fade"></div>
                )}
              </>
            )}

            <img
              src={currentImages[selectedImageIndex]?.src}
              alt={currentImages[selectedImageIndex]?.alt}
              className="w-full h-[80vh] object-cover"
            />

            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {currentImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div style={{ marginTop: "-100px", marginBottom: "100px" }}>
        <RoomTypeSelector
          onSelect={(room) => console.log("Selected Room:", room)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;
