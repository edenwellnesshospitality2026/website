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
import { Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Users, Leaf } from "lucide-react";
import { RoomType } from "@/types/accommodation";
import { roomTypes } from "../../data/packageData";
import { updatedRoomData } from "../../data/roomData";
// import { useNavigate } from "react-router-dom";
import "@/Styles/Contact.css";
import { useState } from "react";

const apartmentGalleries: Record<
    string,
    { images: { src: string; alt: string }[] }
> = {
    studio: {
        images: [
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/Cover-Color-Grade.jpg?updatedAt=1749652804837",
                alt: "1BHK kitchen",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/_DSC1548-Color-Grade.jpg?updatedAt=1749652804815",
                alt: "Studio living area",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/_DSC1588-Color-Grade.jpg?updatedAt=1749652804799",
                alt: "Studio bedroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/_DSC1559-Color-Grade.jpg?updatedAt=1749652804567",
                alt: "Studio bathroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/_DSC1583.jpg?updatedAt=1749652804323",
                alt: "Studio kitchen",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/Studio%20Appartment/Screenshot-2025-06-06-170502-Color-Grade.jpg?updatedAt=1749652802781",
                alt: "Studio balcony",
            },
        ],
    },
    onebhk: {
        images: [
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/1BHK/_DSC6686-Color-Grade.jpg?updatedAt=1749653239184",
                alt: "1BHK kitchen",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/1BHK/_DSC6684-Color-Grade.jpg?updatedAt=1749653239126",
                alt: "1BHK balcony",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/1BHK/Cover-1.1-Color-Grade.jpg?updatedAt=1749653239013",
                alt: "1BHK bathroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/1BHK/_DSC6678-Color-Grade.jpg?updatedAt=1749653238641",
                alt: "1BHK bathroom",
            },
        ],
    },
    twobhk: {
        images: [
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1946%20Color%20Grade.jpg?updatedAt=1749653423612",
                alt: "2BHK living room",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1949-Color-Grade.jpg?updatedAt=1749653418146",
                alt: "2BHK master bedroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1962-Color-Grade.jpg?updatedAt=1749653417819",
                alt: "2BHK kitchen",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1929-Color-Grade.jpg?updatedAt=1749653417734",
                alt: "2BHK bathroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC1972-Color-Grade.jpg?updatedAt=1749653417708",
                alt: "2BHK balcony",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/_DSC6637-Color-Grade.jpg?updatedAt=1749653417374",
                alt: "2BHK master bathroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/006-Color-Grade.jpg?updatedAt=1749653417022",
                alt: "2BHK master bathroom",
            },
            {
                src: "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Gallery/2BHK/Cover---to-be-extracted-fom-the-video-cOLOR-GRADE.jpg?updatedAt=1749653416116",
                alt: "2BHK master bathroom",
            },
        ],
    },
};

interface RoomTypeSelectorProps {
    onSelect: (roomType: RoomType) => void;
}
const RoomTypeSelector = ({ onSelect }: RoomTypeSelectorProps) => {
    // Filter out 3BHK option
    const availableRoomTypes = roomTypes.filter((room) => room.id !== "3bhk");
    const handleKnowMore = (roomType: RoomType) => {
        // Open in new tab based on room type
        let url = "";
        switch (roomType.name.toLowerCase()) {
            case "studio apartment":
                url = "/studio";
                break;
            case "1 bhk apartment":
                url = "/1bhk";
                break;
            case "2 bhk apartment":
                url = "/2bhk";
                break;
            default:
                url = "/";
        }
        window.open(url, "_blank");
    };

    // const RoomTypeSelector = () => {
    //   const navigate = useNavigate();
    //   const availableRoomTypes = roomTypes.filter((room) => room.id !== "3bhk");

    // const handleKnowMore = (roomType) => {
    //   navigate(`/booking-summary/${roomType.id}`);
    // };

    const getRoomData = (roomId) => {
        return (
            updatedRoomData[roomId] || {
                size: roomTypes.find((r) => r.id === roomId)?.size || "",
                guests: `${
                    roomTypes.find((r) => r.id === roomId)?.guests || 1
                } guests`,
                maxGuests: roomTypes.find((r) => r.id === roomId)?.guests || 1,
            }
        );
    };

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState<
        { src: string; alt: string }[]
    >([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // const getRoomData = (roomId: string) => {
    //   return updatedRoomData[roomId as keyof typeof updatedRoomData] || {
    //     size: roomTypes.find(r => r.id === roomId)?.size || "",
    //     guests: `${roomTypes.find(r => r.id === roomId)?.guests || 1} guests`,
    //     maxGuests: roomTypes.find(r => r.id === roomId)?.guests || 1
    //   };
    // };

    const getGalleryKey = (id: string) => {
        switch (id.toLowerCase()) {
            case "1bhk":
                return "onebhk";
            case "2bhk":
                return "twobhk";
            default:
                return id.toLowerCase(); // "studio"
        }
    };
    return (
        <div className="space-y-12 pt-24" id="pick-your-apartment">
            <div className="text-center">
                <div className=" customflex  mb-6">
                    <Leaf className="w-8 h-8 text-eden mr-3" />
                    <h2 className="font-serif font-bold text-eden-dark text-5xl">
                        Pick Your Room/Suite
                    </h2>
                </div>
                <p className="text-stone-600 text-lg font-light">
                    Browse our Eden Haven, Eden Residence, and Eden Grand
                    Apartments to match your needs
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {availableRoomTypes.map((roomType) => {
                    const roomData = getRoomData(roomType.id);
                    const galleryKey = getGalleryKey(roomType.id);
                    const galleryImages =
                        apartmentGalleries[galleryKey]?.images || [];
                    return (
                        <Card
                            key={roomType.id}
                            className="group hover:-translate-y-2 transition-all duration-700 border-0 bg-white/80 backdrop-blur-sm overflow-hidden max-w-sm mx-auto w-full"
                        >
                            {/* <div className="relative overflow-hidden">
                <img
                  src={roomType.image}
                  alt={roomType.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <Badge className="absolute top-6 left-6 bg-white/90 text-stone-700 hover:bg-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  {roomData.size}
                </Badge>
              </div> */}
                            <div
                                className="relative overflow-hidden cursor-pointer group"
                                onClick={() => {
                                    const galleryImages =
                                        apartmentGalleries[galleryKey]
                                            ?.images || [];
                                    setLightboxImages(galleryImages);
                                    setLightboxIndex(0);
                                    setLightboxOpen(true);
                                }}
                            >
                                <img
                                    src={roomType.image}
                                    alt={roomType.name}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    <div className="flex items-center justify-center h-full">
                                        <Image className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                                    </div>
                                    {/* Dots container */}
                                    <div className="pb-4 flex justify-center gap-2">
                                        {[1, 2, 3].map((_, index) => (
                                            <span
                                                key={index}
                                                className={`w-2 h-2 rounded-full bg-white/80 animate-bounce-dot-${index}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Badge className="absolute top-6 left-6 bg-white/90 text-stone-700 border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                    {roomData.size}
                                </Badge>
                            </div>

                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif font-bold text-stone-800">
                                    {roomType.name}
                                </CardTitle>
                                <CardDescription className="text-stone-600 text-base leading-relaxed font-light">
                                    {roomType.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {false && <>
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

                                        {/* Original Price with strike-through */}
                                        <p className="text-lg text-stone-400 line-through">
                                            ₹
                                            {roomType.originalPrice.toLocaleString()}
                                        </p>

                                        {/* Discounted Price */}
                                        {(() => {
                                            const today = new Date();
                                            const day = today.getDay(); // 0 = Sunday, 6 = Saturday
                                            const isWeekday =
                                                day >= 1 && day <= 5;

                                            return (
                                                <div className="mt-3 space-y-2">
                                                    {/* Pricing based on weekday/weekend */}
                                                    {isWeekday &&
                                                    roomType?.weekdayPrice ? (
                                                        <div className="flex flex-col space-y-1">
                                                            {roomType
                                                                ?.weekdayPrice
                                                                ?.withoutBreakfast && (
                                                                <div>
                                                                    <p className="text-2xl font-serif font-bold text-emerald-700">
                                                                        ₹
                                                                        {roomType.weekdayPrice.withoutBreakfast.toLocaleString()}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        + taxes
                                                                        EP
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {roomType
                                                                ?.weekdayPrice
                                                                ?.withBreakfast && (
                                                                <div>
                                                                    <p className="text-2xl font-serif font-bold text-emerald-700">
                                                                        ₹
                                                                        {roomType.weekdayPrice.withBreakfast.toLocaleString()}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        + taxes
                                                                        (with
                                                                        breakfast)
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col space-y-1">
                                                            <p className="text-2xl font-serif font-bold text-emerald-700">
                                                                ₹
                                                                {roomType?.startingPrice?.toLocaleString()}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                + taxes (with
                                                                breakfast)
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}

                                        <p className="text-sm text-stone-500">
                                            per night
                                        </p>
                                    </div>
                                </div>
                                *//

                             
                                </>}
                                
                                   {/* Rooms left info */}
                                {/* <div className="text-center">
                                    <p className="text-sm font-semibold text-red-600">
                                        {roomType.roomsLeft} room
                                        {roomType.roomsLeft > 1 ? "s" : ""} left
                                    </p>
                                </div> */}

                                <div className="flex justify-center">
                                    <Button
                                        className="w-full bg-eden hover:bg-emerald-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 rounded-xl"
                                        onClick={() => {
                                            window.location.href =
                                                "http://localhost:8080/booking";
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                </div>
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
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
                    navigationPrev: { color: "#fff" },
                    navigationNext: { color: "#fff" },
                }}
            />
        </div>
    );
};
export default RoomTypeSelector;
