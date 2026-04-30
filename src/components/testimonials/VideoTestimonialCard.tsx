import React, { useMemo } from "react";
import { Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type EdenVideoTestimonial = {
  embedSrc: string;
  watchUrl: string;
  quote: string;
  label: string;
};

function extractYouTubeIdFromEmbed(embedSrc: string) {
  // Example: https://www.youtube.com/embed/VIDEO_ID?...
  const marker = "/embed/";
  const idx = embedSrc.indexOf(marker);
  if (idx === -1) return null;
  const after = embedSrc.slice(idx + marker.length);
  const id = after.split(/[?&#]/)[0];
  return id || null;
}

function posterFromEmbed(embedSrc: string) {
  const id = extractYouTubeIdFromEmbed(embedSrc);
  if (!id) return null;
  // hqdefault is widely available and consistent for preview thumbnails.
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

type VideoTestimonialCardProps = {
  testimonial: EdenVideoTestimonial;
  onOpen: () => void;
};

const VideoTestimonialCard: React.FC<VideoTestimonialCardProps> = ({
  testimonial,
  onOpen,
}) => {
  const posterSrc = useMemo(() => posterFromEmbed(testimonial.embedSrc), [
    testimonial.embedSrc,
  ]);

  return (
    <Card className="border border-eden-light/50 shadow-sm rounded-3xl overflow-hidden bg-white/90">
      <CardContent className="p-0">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Play testimonial video: ${testimonial.quote}`}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-eden focus-visible:ring-offset-2"
        >
          <div className="relative bg-[#FFFCF7] aspect-[9/12] w-full">
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={testimonial.label}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-eden-beige/50 via-white to-eden-light/20" />
            )}

            {/* Elegant, branded play interaction */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/80 backdrop-blur-sm border border-white/60 p-4 shadow-sm">
                <Play className="text-eden-dark" size={28} fill="#8A9A5B" />
              </div>
            </div>

            {/* Subtle dark overlay to keep quote crisp when thumbnails are bright */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors" />
          </div>

          <div className="p-6">
            <p className="font-serif text-lg font-semibold text-eden-dark leading-6">
              “{testimonial.quote}”
            </p>
            <p className="mt-3 text-sm text-stone-600 leading-6">
              {testimonial.label}
            </p>
          </div>
        </button>
      </CardContent>
    </Card>
  );
};

export default VideoTestimonialCard;

