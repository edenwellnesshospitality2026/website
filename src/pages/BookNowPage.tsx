import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge, Image, Leaf, Ruler, Users } from "lucide-react";
import { RoomType } from "@/types/accommodation";
import { roomTypes } from "../data/packageData";
import { updatedRoomData } from "../data/roomData";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useNavigate } from "react-router-dom";

import "@/Styles/Contact.css";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { max } from "date-fns";

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
    presidential: {
        images: [
            {
                src: "/assets/Presidential.webp",
                alt: "Presidential Suite",
            },
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
        ],
    },
};

function BookNowPage() {
    const navigate = useNavigate();
    const availableRoomTypes = roomTypes.filter((room) => room.id !== "3bhk");
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

    const getDetailPath = (roomType: RoomType) => {
        switch (roomType.id) {
            case "studio":
                return "/studio";
            case "1bhk":
                return "/1bhk";
            case "2bhk":
                return "/2bhk";
            case "presidential":
                return "/presidential";
            default:
                return "/";
        }
    };

    const handleBookNow = (roomType: RoomType) => {
        const room = roomType.name;
        const price = roomType.startingPrice;
        const size = updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.size || roomType.size || "";
        const guests =
            updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.guests || roomType.guests || 1;

        const rd = updatedRoomData[roomType.id as keyof typeof updatedRoomData];
        const maxGuests =
            rd?.maxGuests ??
            (roomType.id === "studio"
                ? 2
                : roomType.id === "1bhk"
                  ? 3
                  : roomType.id === "presidential"
                    ? 6
                    : 4);

        const queryParams = new URLSearchParams({
            room,
            price: price.toString(),
            size,
            guests: String(guests), // display as “1-2 guests” still if needed
            maxGuests: String(maxGuests), // for form dropdown
        });

        navigate(`/book-summary?${queryParams.toString()}`);
    };

    const getGalleryKey = (id: string) => {
        switch (id.toLowerCase()) {
            case "1bhk":
                return "onebhk";
            case "2bhk":
                return "twobhk";
            case "presidential":
                return "presidential";
            default:
                return id.toLowerCase(); // "studio"
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    {/* room selctor acccomodation component */}
                    <div className="roomselectcard">
                        <div className="room-selector-container">
                            <div className="space-y-12 pt-24" id="book-now">
                                <div className="text-center">
                                    <div className=" customflex  mb-6">
                                        <Leaf className="w-8 h-8 text-eden mr-3" />
                                        <h2 className="font-serif font-bold text-eden-dark text-5xl">
                                            Pick Your Room/Suite
                                        </h2>
                                    </div>
                                    <p className="text-stone-600 text-lg font-light">
                                        Browse our Eden Haven, Eden Residence,
                                        Eden Grand, and Presidential Suite to match your needs
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                                    {availableRoomTypes.map((roomType) => {
                                        const roomData = getRoomData(
                                            roomType.id
                                        );
                                        const galleryKey = getGalleryKey(
                                            roomType.id
                                        );
                                        const galleryImages =
                                            apartmentGalleries[galleryKey]
                                                ?.images || [];
                                        const isPresidential =
                                            roomType.id === "presidential";

                                        return (
                                            <Card
                                                key={roomType.id}
                                                className={`group hover:-translate-y-2 transition-all duration-700 overflow-hidden max-w-sm mx-auto w-full ${
                                                    isPresidential
                                                        ? "border border-eden/30 bg-eden-beige/60 backdrop-blur-sm ring-1 ring-eden/25 shadow-md shadow-eden/15"
                                                        : "border-0 bg-white/80 backdrop-blur-sm"
                                                }`}
                                            >
                                                <div
                                                    className="relative overflow-hidden cursor-pointer group"
                                                    onClick={() => {
                                                        const galleryImages =
                                                            apartmentGalleries[
                                                                galleryKey
                                                            ]?.images || [];
                                                        setLightboxImages(
                                                            galleryImages
                                                        );
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
                                                            {[1, 2, 3].map(
                                                                (_, index) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`w-2 h-2 rounded-full bg-white/80 animate-bounce-dot-${index}`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`absolute top-6 right-6 text-xs md:text-sm px-3 py-1 rounded-md font-medium shadow-lg backdrop-blur-sm ${
                                                            isPresidential
                                                                ? "bg-eden/95 text-white"
                                                                : "bg-black/50 text-white"
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-1">
                                                            <Ruler
                                                                className={`w-4 h-4 ${
                                                                    isPresidential
                                                                        ? "text-white"
                                                                        : "text-eden-dark"
                                                                }`}
                                                            />
                                                            <span>
                                                                {roomData.size}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardHeader className="pb-4">
                                                    <CardTitle
                                                        className={`text-2xl font-serif tracking-tight ${
                                                            isPresidential
                                                                ? "font-semibold text-eden"
                                                                : "font-bold text-stone-800"
                                                        }`}
                                                    >
                                                        {roomType.name}
                                                    </CardTitle>
                                                    <CardDescription
                                                        className={`text-base leading-relaxed font-light ${
                                                            isPresidential
                                                                ? "text-eden-text"
                                                                : "text-stone-600"
                                                        }`}
                                                    >
                                                        {roomType.description}
                                                    </CardDescription>
                                                </CardHeader>

                                                <CardContent className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2 text-stone-600">
                                                            <Users className="w-5 h-5 text-eden" />
                                                            <span className="font-medium">
                                                                {
                                                                    roomData.guests
                                                                }
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

                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            className="w-full bg-eden hover:bg-emerald-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 rounded-xl"
                                                            onClick={() => handleBookNow(roomType)}
                                                        >
                                                            Book Now
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="w-full border-stone-300 text-stone-700"
                                                            onClick={() =>
                                                                window.open(
                                                                    getDetailPath(roomType),
                                                                    "_blank"
                                                                )
                                                            }
                                                        >
                                                            View details
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
                                        view: ({ index }) =>
                                            setLightboxIndex(index),
                                    }}
                                    styles={{
                                        container: {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.85)",
                                        },
                                        navigationPrev: { color: "#fff" },
                                        navigationNext: { color: "#fff" },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Amenities />
                    <WhyChoose />
                    <Testimonials />
                    <Gallery />
                    <Contact />
                    <FAQ />
                    <Footer />
                </main>
            </div>
        </>
    );
}

export default BookNowPage;
