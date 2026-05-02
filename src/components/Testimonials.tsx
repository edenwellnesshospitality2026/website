"use client";

import { useQuery } from "@tanstack/react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGuestStories, getSiteContent, youtubeVideoIdFromUrl } from "@/lib/cms-api";

const GUEST_STORY_SHORT_IDS_FALLBACK = [
  "Gyrz0rGF174",
  "OAtTYAI4AmU",
  "1bcJ9O0AAg8",
  "u3MWGJ0xgIM",
  "v5EdZho4Hp0",
  "eqYtGrJZ414",
] as const;

function embedSrc(videoId: string): string {
  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type ArrowProps = { onClick?: () => void; disabled?: boolean };

const GuestStoriesArrowLeft = ({ onClick, disabled }: ArrowProps) => (
  <button
    type="button"
    aria-label="Previous guest stories"
    onClick={onClick}
    disabled={disabled}
    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left flex !min-h-[48px] !min-w-[48px] items-center justify-center rounded-full border-0 bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-35 md:!min-h-[52px] md:!min-w-[52px]"
  >
    <ChevronLeft className="pointer-events-none h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
  </button>
);

const GuestStoriesArrowRight = ({ onClick, disabled }: ArrowProps) => (
  <button
    type="button"
    aria-label="Next guest stories"
    onClick={onClick}
    disabled={disabled}
    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right flex !min-h-[48px] !min-w-[48px] items-center justify-center rounded-full border-0 bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-35 md:!min-h-[52px] md:!min-w-[52px]"
  >
    <ChevronRight className="pointer-events-none h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
  </button>
);

type DotProps = { onClick?: () => void; active?: boolean; index?: number };

const GuestStoryDot = ({ onClick, active, index }: DotProps) => (
  <button
    type="button"
    aria-label={`Go to slide ${(index ?? 0) + 1}`}
    onClick={onClick}
    className={
      active === true
        ? "mx-1 inline-flex h-2.5 w-8 rounded-full bg-eden-dark transition-colors"
        : "mx-1 inline-flex h-2.5 w-2.5 rounded-full bg-eden-dark/25 transition-colors hover:bg-eden-dark/45"
    }
  />
);

const Testimonials = () => {
  const { data: stories } = useQuery({
    queryKey: ["cms", "guest-stories"],
    queryFn: getGuestStories,
    staleTime: 60_000,
  });

  const { data: site } = useQuery({
    queryKey: ["cms", "site-content", "homepage"],
    queryFn: () => getSiteContent("homepage"),
    staleTime: 60_000,
  });

  const videoIds: string[] =
    stories && stories.length > 0 ?
      stories
        .map((s) => youtubeVideoIdFromUrl(s.youtubeUrl))
        .filter((id): id is string => Boolean(id))
    :   [...GUEST_STORY_SHORT_IDS_FALLBACK];

  const intro =
    site?.guestStoriesIntro?.trim() ||
    "Hear from families and guests who have experienced the warmth and care at Eden Wellness and Hospitality.";

  return (
    <section className="section-padding bg-eden-beige/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
            Guest Stories
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6" />
          <p className="text-eden-text text-base md:text-lg">{intro}</p>
        </div>

        <div className="relative px-2 sm:px-6 md:px-10 lg:px-14">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay={false}
            arrows
            showDots
            renderDotsOutside
            keyBoardControl
            swipeable
            transitionDuration={400}
            customLeftArrow={<GuestStoriesArrowLeft />}
            customRightArrow={<GuestStoriesArrowRight />}
            customDot={<GuestStoryDot />}
            removeArrowOnDeviceType={[]}
            itemClass="px-2 md:px-3 flex justify-center"
            containerClass="guest-stories-carousel pb-2"
          >
            {videoIds.map((id, index) => (
              <div key={`${id}-${index}`} className="flex justify-center outline-none">
                <div className="relative z-0 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] overflow-hidden rounded-2xl border border-eden-light/30 bg-black/5 shadow-lg">
                  <div className="aspect-[9/16] w-full">
                    <iframe
                      className="relative z-0 h-full w-full object-cover"
                      src={embedSrc(id)}
                      title={`Guest story ${index + 1}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <p className="mt-3 text-center text-sm text-eden-text/80 md:hidden">
            Swipe for more, or use the arrows / dots.
          </p>
          <p className="mt-2 hidden text-center text-sm text-eden-text/80 md:block">
            Use the side arrows or dots below to see more stories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
