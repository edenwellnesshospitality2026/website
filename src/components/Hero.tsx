"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { pushToDataLayer } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHomepageSiteContent } from "@/hooks/useHomepageSiteContent";

type SlideView = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const FALLBACK_SLIDES: SlideView[] = [
  {
    title: "Ultimate Luxury Wellness & Hospitality Retreat",
    subtitle: "in Dehradun Valley",
    description: "Experience premium wellness and hospitality in the Himalayas.",
    image:
      "https://ik.imagekit.io/sxe8qsgazl/edenwellness/READY%20TO%20MOVE%20IN%20only%20FEW%20UNITS%20LEFT%20(3820%20x%202160%20px)%20(10).png",
  },
  {
    title: "Curated Wellness Living",
    subtitle: "for mindful getaways",
    description: "Stay in thoughtfully designed residences with curated amenities.",
    image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/6.png",
  },
  {
    title: "Premium Suites & Residences",
    subtitle: "crafted for comfort",
    description: "Choose from studio to grand suites tailored for every stay style.",
    image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/1.png",
  },
  {
    title: "Where Nature Meets Hospitality",
    subtitle: "in the lap of the hills",
    description: "Wake up to valley views and elevate your retreat experience.",
    image:
      "https://ik.imagekit.io/sxe8qsgazl/edenwellness/READY%20TO%20MOVE%20IN%20only%20FEW%20UNITS%20LEFT%20(3820%20x%202160%20px)%20(9).png",
  },
];

const HeroCarousel: React.FC = () => {
  const { data } = useHomepageSiteContent();

  const slides = useMemo((): SlideView[] => {
    const raw = data?.heroSlides;
    if (raw && raw.length > 0) {
      return [...raw]
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((s) => ({
          title: s.title?.trim() ?? "",
          subtitle: s.subtitle?.trim() ?? "",
          description: s.description?.trim() ?? "",
          image: s.secureUrl,
        }));
    }
    return FALLBACK_SLIDES;
  }, [data]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, slides]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={`${slide.image}-${index}`}
                className="relative flex h-[80vh] min-w-full items-center justify-center md:h-[100vh]"
              >
                <img
                  src={slide.image}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt={slide.title || "Eden hero"}
                />

                <div className="absolute inset-0" />

                <div className="relative z-10 max-w-3xl px-6 text-center text-white">
                  {slide.title || slide.subtitle ?
                    <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl">
                      {slide.title ?
                        <>
                          {slide.title}
                          {slide.subtitle ? <br /> : null}
                        </>
                      : null}
                      {slide.subtitle ?
                        <span className="text-eden-beige">{slide.subtitle}</span>
                      : null}
                    </h1>
                  : null}
                  {slide.description ?
                    <p className="mb-8 text-lg md:text-xl">{slide.description}</p>
                  : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-3 hover:bg-white"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-3 hover:bg-white"
        >
          <ChevronRight />
        </button>
      </section>
      <section className="bg-eden py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-center gap-6 px-6 sm:flex-row sm:px-0">
            <Button
              variant="outline"
              className="w-full rounded-md bg-eden-dark px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out sm:w-auto"
              asChild
            >
              <Link
                to="/booking"
                onClick={() =>
                  pushToDataLayer("contact_button_click", {
                    button_location: "hero-strip-book-now",
                  })
                }
              >
                Book Now
              </Link>
            </Button>

            <a href="#contact">
              <Button
                onClick={() =>
                  pushToDataLayer("contact_button_click", {
                    button_location: "navbar",
                  })
                }
                variant="outline"
                className="w-full rounded-md bg-eden-dark px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out sm:w-auto"
              >
                Book a Table
              </Button>
            </a>

            <a href="/#choose-your-sanctuary">
              <Button
                onClick={() =>
                  pushToDataLayer("contact_button_click", {
                    button_location: "navbar",
                  })
                }
                variant="outline"
                className="w-full rounded-md bg-eden-dark px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out sm:w-auto"
              >
                Explore Rooms
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCarousel;
