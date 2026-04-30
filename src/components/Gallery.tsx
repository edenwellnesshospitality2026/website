import React, { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../Styles/Global.css";

const Gallery: React.FC = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const galleryImages = [
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-rooftop?updatedAt=1763400790090",
            alt: "Eden roof top view",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-garden-view?updatedAt=1763400858110",
            alt: "Eden garden view",
        },

        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/Copy%20of%20Screenshot-2025-06-06-180147.jpg?updatedAt=1757394157818",
            alt: "Garden pathway at Eden",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-hero-background.JPG?updatedAt=1764326353690",
            alt: "Wellness center",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/2bhk.jpg?updatedAt=1764655706011",
            alt: "Peaceful surroundings",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/DJI_0625.JPG?updatedAt=1765965688341",
            alt: "Eden Haven",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/WhatsApp%20Image%202025-11-25%20at%2012.36.33%20PM.jpeg?updatedAt=1765965687501",
            alt: "Eden Residence ",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-resturant?updatedAt=1763400287475",
            alt: "Eden Grand",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-spa.jpg?updatedAt=1763401551156",
            alt: "Nature view from Eden",
        },
        {
            src: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-bakery-nook-cafe?updatedAt=1763400266284",
            alt: "Community living area",
        },
    ];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleExploreGallery = () => {
        window.open("/gallery", "_blank");
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
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
    return (
        <section id="gallery" className="section-padding">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
                        Photo Gallery
                    </h2>
                    <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
                    <p className="text-eden-text">
                        Take a visual journey through our thoughtfully designed
                        spaces and serene environments.
                    </p>
                </div>
                <Carousel
                    responsive={responsive}
                    autoPlay
                    infinite
                    autoPlaySpeed={2000}
                    arrows
                    showDots={false}
                    itemClass="px-2"
                >
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/3] md:aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group p-4"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="rounded-xl w-full h-full transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-eden-dark/0 group-hover:bg-eden-dark/30 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Image size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>

                <div className="text-center mt-6">
                    <Button
                        onClick={handleExploreGallery}
                        className="bg-eden hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 md:mt-8"
                    >
                        Explore Gallery
                    </Button>
                </div>
            </div>

            {/* Lightbox with swipe and arrows */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={galleryImages.map((img) => ({
                    src: img.src,
                    alt: img.alt,
                }))}
                index={lightboxIndex}
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
                // All controls (arrows, swipe, close) are built-in and mobile friendly!
                styles={{
                    container: { backgroundColor: "rgba(0,0,0,0.83)" },
                    navigationPrev: { color: "#fff" },
                    navigationNext: { color: "#fff" },
                }}
            />
        </section>
    );
};

export default Gallery;
