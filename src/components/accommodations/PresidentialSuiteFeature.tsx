"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Leaf, Users } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { roomTypes } from "@/data/packageData";
import { updatedRoomData } from "@/data/roomData";
import type { RoomType } from "@/types/accommodation";

const PRESIDENTIAL_GALLERY: { src: string; alt: string }[] = [
    { src: "/assets/Presidential.webp", alt: "Presidential Suite" },
    {
        src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1949-Color-Grade.jpg?updatedAt=1749653418146",
        alt: "Presidential bedroom",
    },
    {
        src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1962-Color-Grade.jpg?updatedAt=1749653417819",
        alt: "Presidential kitchen",
    },
    {
        src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1929-Color-Grade.jpg?updatedAt=1749653417734",
        alt: "Presidential suite",
    },
    {
        src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/Cover---to-be-extracted-fom-the-video-cOLOR-GRADE.jpg?updatedAt=1749653416116",
        alt: "Presidential residence",
    },
];

function getRoomData(roomId: string) {
    return (
        updatedRoomData[roomId as keyof typeof updatedRoomData] || {
            size: roomTypes.find((r) => r.id === roomId)?.size || "",
            guests: `${roomTypes.find((r) => r.id === roomId)?.guests || 1} guests`,
            maxGuests: roomTypes.find((r) => r.id === roomId)?.guests || 1,
        }
    );
}

export interface PresidentialSuiteFeatureProps {
    /** When true, shows guests + nightly rate under the description (Book Now page). */
    showPricing?: boolean;
    onBookNow: () => void;
    /** Optional anchor id for the section wrapper */
    sectionId?: string;
    /** Tighter spacing when placed below other room cards on the same page */
    embedded?: boolean;
    /** Hide the centered “Presidential Suite” + tagline (when that copy is shown above the section) */
    hideHeading?: boolean;
}

const PresidentialSuiteFeature = ({
    showPricing = false,
    onBookNow,
    sectionId = "pick-your-apartment",
    embedded = false,
    hideHeading = false,
}: PresidentialSuiteFeatureProps) => {
    const roomType = useMemo(
        () => roomTypes.find((r) => r.id === "presidential") as RoomType,
        []
    );
    const roomData = getRoomData("presidential");

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    return (
        <div
            className={
                hideHeading
                    ? embedded
                        ? "space-y-0 pt-8 md:pt-10"
                        : "space-y-12 pt-24"
                    : embedded
                      ? "space-y-8 pt-12 md:pt-16"
                      : "space-y-12 pt-24"
            }
            id={sectionId}
        >
            {!hideHeading && (
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="customflex mb-6 justify-center">
                        <Leaf className="w-8 h-8 text-eden mr-3 shrink-0" />
                        <h2 className="font-serif font-semibold text-eden-dark text-3xl md:text-5xl">
                            Presidential Suite
                        </h2>
                    </div>
                    <div className="w-20 h-1 bg-eden mx-auto mb-6" />
                    <p className="text-eden-text text-lg leading-relaxed">
                        Distinctive stays with expansive living, premium
                        finishes, and elevated hospitality in the valley.
                    </p>
                </div>
            )}

            <div className="container-custom max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-stretch gap-12 md:gap-16 bg-eden-beige/40 rounded-2xl border border-eden/20 ring-1 ring-eden/15 p-6 md:p-10 shadow-sm"
                >
                    <div className="md:w-1/2 w-full shrink-0">
                        <div
                            className="relative overflow-hidden cursor-pointer group rounded-2xl"
                            onClick={() => {
                                setLightboxOpen(true);
                                setLightboxIndex(0);
                            }}
                        >
                            <img
                                src={roomType.image}
                                alt={roomType.name}
                                className="w-full h-[280px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                <div className="flex items-center justify-center h-full">
                                    <ImageIcon className="text-white opacity-0 group-hover:opacity-90 transition-opacity w-8 h-8 drop-shadow-md" />
                                </div>
                                <div className="pb-4 flex justify-center gap-2">
                                    {[0, 1, 2].map((i) => (
                                        <span
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-white/85"
                                        />
                                    ))}
                                </div>
                            </div>
                            <Badge className="absolute top-5 left-5 bg-eden/95 text-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                {roomData.size}
                            </Badge>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-center text-left">
                        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-eden mb-4 tracking-tight">
                            {roomType.name}
                        </h3>
                        <p className="text-eden-text leading-relaxed text-base md:text-lg mb-8">
                            {roomType.description}
                        </p>

                        {showPricing && (
                            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-eden/15">
                                <div className="flex items-center space-x-2 text-eden-text">
                                    <Users className="w-5 h-5 text-eden shrink-0" />
                                    <span className="font-medium">
                                        {roomData.guests}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-stone-500 font-medium">
                                        Starting from
                                    </p>
                                    <p className="text-3xl font-serif font-bold text-emerald-700">
                                        ₹
                                        {roomType.startingPrice.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-stone-500">
                                        per night
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto">
                            <Button
                                className="w-full bg-eden hover:bg-emerald-700 text-white border-0 py-6 text-lg font-medium rounded-xl"
                                onClick={onBookNow}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={PRESIDENTIAL_GALLERY}
                index={lightboxIndex}
                on={{ view: ({ index }) => setLightboxIndex(index) }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
                    navigationPrev: { color: "#fff" },
                    navigationNext: { color: "#fff" },
                }}
            />
        </div>
    );
};

export default PresidentialSuiteFeature;
