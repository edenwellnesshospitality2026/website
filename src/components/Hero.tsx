"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { pushToDataLayer } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    // {
    //     title: "",
    //     subtitle: "",
    //     description: "",
    //     image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/6.png",
    // },
    // {
    //   title: "",
    //   subtitle: "",
    //   description: "",
    //   image:
    //   "https://ik.imagekit.io/sxe8qsgazl/edenwellness/1.png",
    // },
    // {
    //     title: "",
    //     subtitle: "",
    //     description: "",
    //     image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/READY%20TO%20MOVE%20IN%20only%20FEW%20UNITS%20LEFT%20(3820%20x%202160%20px)%20(9).png",
    // },
    {
        title: "Ultimate Luxury Wellness & Hospitality Retreat",
        subtitle: "in Dehradun Valley",
        description:
            "Experience premium wellness and hospitality in the Himalayas.",
        image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/READY%20TO%20MOVE%20IN%20only%20FEW%20UNITS%20LEFT%20(3820%20x%202160%20px)%20(10).png",
    },
    // {
    //     title: "",
    //     subtitle: "",
    //     description: "",
    //     image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/7.png?updatedAt=1768405900425",
    // },
];

const HeroCarousel: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <>
            <section className="relative overflow-hidden">
                <div ref={emblaRef} className="overflow-hidden border-red-500">
                    <div className="flex">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="relative min-w-full h-[80vh] md:h-[100vh]  flex items-center justify-center"
                            >
                                {/* Background */}
                                <img
                                    src={slide.image}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt=""
                                />

                                <div className="absolute inset-0" />

                                {/* Content */}
                                <div className="relative z-10 max-w-3xl text-center text-white px-6">
                                    <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
                                        {slide.title}
                                        <br />
                                        <span className="text-eden-beige">
                                            {slide.subtitle}
                                        </span>
                                    </h1>
                                    <p className="text-lg md:text-xl mb-8">
                                        {slide.description}
                                    </p>

                                    {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <a
                                            href="http://localhost:8080/booking"
                                        >
                                            <Button
                                                className="btn-primary"
                                                onClick={() =>
                                                    pushToDataLayer(
                                                        "contact_button_click",
                                                        {
                                                            button_location:
                                                                "hero-carousel",
                                                        }
                                                    )
                                                }
                                            >
                                                Book Now
                                            </Button>
                                        </a>
                                        <a href="/#choose-your-sanctuary">
                                            <Button
                                                variant="outline"
                                                className="btn-secondary"
                                            >
                                                Explore Rooms
                                            </Button>
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-3 rounded-full hover:bg-white"
                >
                    <ChevronLeft />
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-3 rounded-full hover:bg-white"
                >
                    <ChevronRight />
                </button>
            </section>
            <section className="bg-eden py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-center gap-6 px-6 sm:px-0">
                        <a
                            href="http://localhost:8080/booking"
                        >
                            <Button
                                onClick={() =>
                                    pushToDataLayer("contact_button_click", {
                                        button_location: "navbar",
                                    })
                                }
                                variant="outline"
                                className="bg-eden-dark text-white px-6 py-3 rounded-md transition-all duration-300 ease-in-out font-medium w-full sm:w-auto"
                            >
                                Book Now
                            </Button>
                        </a>

                        <a href="#contact">
                            <Button
                                onClick={() =>
                                    pushToDataLayer("contact_button_click", {
                                        button_location: "navbar",
                                    })
                                }
                                variant="outline"
                                className="bg-eden-dark text-white px-6 py-3 rounded-md transition-all duration-300 ease-in-out font-medium w-full sm:w-auto"
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
                                className="bg-eden-dark text-white px-6 py-3 rounded-md transition-all duration-300 ease-in-out font-medium w-full sm:w-auto"
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
