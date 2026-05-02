"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Image as ImageIcon, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RoomType } from "@/types/accommodation";
import { roomTypes } from "@/data/packageData";
import { updatedRoomData } from "@/data/roomData";
import { apartmentGalleries } from "@/data/apartmentGalleries";
import type { RoomCardDoc } from "@/lib/cms-api";
import { roomTypeFromShowcaseSlug } from "@/lib/room-slug-map";

function getGalleryKey(id: string) {
    switch (id.toLowerCase()) {
        case "1bhk":
            return "onebhk";
        case "2bhk":
            return "twobhk";
        default:
            return id.toLowerCase();
    }
}

function getRoomData(roomId: string) {
    return (
        updatedRoomData[roomId as keyof typeof updatedRoomData] || {
            size: roomTypes.find((r) => r.id === roomId)?.size || "",
            guests: `${
                roomTypes.find((r) => r.id === roomId)?.guests || 1
            } guests`,
            maxGuests: roomTypes.find((r) => r.id === roomId)?.guests || 1,
        }
    );
}

export interface CompactRoomCardsProps {
    onBook: (room: RoomType) => void;
    showPricing?: boolean;
    /** Card rows from CMS; when missing or empty, uses static studio / 1BHK / 2BHK data. */
    showcases?: RoomCardDoc[] | null;
}

const CompactRoomCards = ({
    onBook,
    showPricing = false,
    showcases,
}: CompactRoomCardsProps) => {
    const staticRooms = roomTypes.filter((r) =>
        ["studio", "1bhk", "2bhk"].includes(r.id)
    );
    const usingCms = Array.isArray(showcases) && showcases.length > 0;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<
        { src: string; alt: string }[]
    >([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {(usingCms ? showcases! : staticRooms).map((item) => {
                    const roomType = usingCms
                        ? roomTypeFromShowcaseSlug(
                              (item as RoomCardDoc).slug
                          )
                        : (item as RoomType);
                    if (!roomType) return null;

                    const roomData = getRoomData(roomType.id);
                    const galleryKey = getGalleryKey(roomType.id);
                    const sc = usingCms ? (item as RoomCardDoc) : null;
                    const cmsHero =
                        sc?.images?.[0]?.secureUrl &&
                        sc.images[0].secureUrl.length > 0 ?
                            sc.images[0].secureUrl
                        :   roomType.image;
                    const cmsTitle = sc?.headline ?? roomType.name;
                    const cmsBody = sc?.description ?? roomType.description;
                    const cmsSize = sc?.sizeLabel ?? roomData.size;
                    const cmsPrice =
                        sc?.startingPrice !== undefined &&
                        sc?.startingPrice !== null ?
                            sc.startingPrice
                        :   roomType.startingPrice;
                    const showPriceRow =
                        showPricing &&
                        (sc ? sc.showPricing !== false : true);

                    return (
                        <Card
                            key={usingCms ? sc!.slug : roomType.id}
                            className="group hover:-translate-y-2 transition-all duration-700 border-0 bg-white/80 backdrop-blur-sm overflow-hidden max-w-sm mx-auto w-full"
                        >
                            <div
                                className="relative overflow-hidden cursor-pointer group"
                                onClick={() => {
                                    const imgs =
                                        sc?.images?.length ?
                                            sc.images.map((im) => ({
                                                src: im.secureUrl,
                                                alt:
                                                    im.alt ||
                                                    cmsTitle,
                                            }))
                                        :   apartmentGalleries[galleryKey]
                                              ?.images || [];
                                    setLightboxImages(imgs);
                                    setLightboxIndex(0);
                                    setLightboxOpen(true);
                                }}
                            >
                                <img
                                    src={cmsHero}
                                    alt={cmsTitle}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    <div className="flex items-center justify-center h-full">
                                        <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                                    </div>
                                    <div className="pb-4 flex justify-center gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-2 h-2 rounded-full bg-white/80"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Badge className="absolute top-6 left-6 bg-white/90 text-stone-700 border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                    {cmsSize}
                                </Badge>
                            </div>

                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif font-bold text-stone-800">
                                    {cmsTitle}
                                </CardTitle>
                                <CardDescription className="text-stone-600 text-base leading-relaxed font-light">
                                    {cmsBody}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {showPriceRow && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-stone-600">
                                            <Users className="w-5 h-5 text-eden" />
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
                                                {cmsPrice.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-stone-500">
                                                per night
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    className="w-full bg-eden hover:bg-emerald-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 rounded-xl"
                                    onClick={() => onBook(roomType)}
                                >
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxImages}
                index={lightboxIndex}
                on={{ view: ({ index }) => setLightboxIndex(index) }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
                    navigationPrev: { color: "#fff" },
                    navigationNext: { color: "#fff" },
                }}
            />
        </>
    );
};

export default CompactRoomCards;
