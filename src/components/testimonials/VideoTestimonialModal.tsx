import React from "react";
import { X } from "lucide-react";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

type VideoTestimonialModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  embedSrc: string;
  label: string;
};

const VideoTestimonialModal: React.FC<VideoTestimonialModalProps> = ({
  open,
  onOpenChange,
  embedSrc,
  label,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden border border-eden-light/50 bg-white/95 rounded-3xl shadow-sm">
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close testimonial video"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/80 hover:bg-white border border-eden-light/70 p-2 text-eden-dark transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogClose>

        <div className="relative aspect-video w-full bg-[#FFFCF7]">
          {open ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedSrc}
              title={label}
              frameBorder={0}
              loading="lazy"
              allow="encrypted-media; clipboard-write; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoTestimonialModal;

