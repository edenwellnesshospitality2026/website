import React, { useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { EdenVideoTestimonial } from "./VideoTestimonialCard";
import VideoTestimonialCard from "./VideoTestimonialCard";
import VideoTestimonialModal from "./VideoTestimonialModal";

type VideoTestimonialsCarouselProps = {
  testimonials: EdenVideoTestimonial[];
};

const VideoTestimonialsCarousel: React.FC<
  VideoTestimonialsCarouselProps
> = ({ testimonials }) => {
  const responsive = useMemo(
    () => ({
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    }),
    []
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeTestimonial = activeIndex === null
    ? null
    : testimonials[activeIndex] || null;

  const closeModal = () => setActiveIndex(null);
  const openModal = (index: number) => setActiveIndex(index);

  type ArrowButtonProps = {
    onClick?: () => void;
  };

  const CustomLeftArrow = ({ onClick }: ArrowButtonProps) => (
    <button
      type="button"
      aria-label="Previous testimonial"
      onClick={onClick}
      className="bg-white/90 hover:bg-white border border-eden-light/50 text-eden-dark rounded-full p-3 shadow-sm"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );

  const CustomRightArrow = ({ onClick }: ArrowButtonProps) => (
    <button
      type="button"
      aria-label="Next testimonial"
      onClick={onClick}
      className="bg-white/90 hover:bg-white border border-eden-light/50 text-eden-dark rounded-full p-3 shadow-sm"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );

  type CustomDotProps = {
    onClick?: () => void;
    active?: boolean;
    index?: number;
  };

  const CustomDot = (props: CustomDotProps) => {
    const { onClick, active, index } = props;

    return (
      <button
        type="button"
        aria-label={`Go to testimonial ${(index ?? 0) + 1}`}
        onClick={onClick}
        className={
          active === true
            ? "bg-eden-dark w-10 h-2 rounded-full transition-colors"
            : "bg-eden/30 w-6 h-2 rounded-full transition-colors"
        }
      />
    );
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        ssr
        infinite
        autoPlay={false}
        arrows
        showDots
        keyBoardControl
        transitionDuration={500}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customDot={<CustomDot />}
        // Keep arrows away from the cards as much as possible.
        removeArrowOnDeviceType={[]}
        renderDotsOutside={false}
        itemClass="px-2"
        containerClass="px-1"
      >
        {testimonials.map((t, idx) => (
          <div key={t.embedSrc}>
            <VideoTestimonialCard
              testimonial={t}
              onOpen={() => openModal(idx)}
            />
          </div>
        ))}
      </Carousel>

      {activeTestimonial ? (
        <VideoTestimonialModal
          open={activeIndex !== null}
          onOpenChange={(next) => {
            if (!next) closeModal();
          }}
          embedSrc={activeTestimonial.embedSrc}
          label={activeTestimonial.label}
        />
      ) : null}
    </>
  );
};

export default VideoTestimonialsCarousel;

