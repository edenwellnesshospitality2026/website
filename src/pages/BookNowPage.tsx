"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
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
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

import "@/Styles/Contact.css";

import CompactRoomCards from "@/components/accommodations/CompactRoomCards";
import PresidentialSuiteFeature from "@/components/accommodations/PresidentialSuiteFeature";
import { getPresidentialSuite, getRoomCards, getSiteContent } from "@/lib/cms-api";

function BookNowPage() {
    const navigate = useNavigate();
    const presidential = roomTypes.find((r) => r.id === "presidential")!;

    const { data: presidentialSuite } = useQuery({
        queryKey: ["cms", "presidential-suite"],
        queryFn: getPresidentialSuite,
        staleTime: 60_000,
    });
    const { data: roomCards } = useQuery({
        queryKey: ["cms", "room-cards"],
        queryFn: getRoomCards,
        staleTime: 60_000,
    });
    const { data: site } = useQuery({
        queryKey: ["cms", "site-content", "homepage"],
        queryFn: () => getSiteContent("homepage"),
        staleTime: 60_000,
    });

    const hasPresidentialCms = Boolean(presidentialSuite);
    const cards = roomCards ?? [];
    const hasRoomCardsCms = cards.length > 0;

    const pickYourRoomTitle =
        site?.pickYourRoomTitle?.trim() || "Pick Your Room/Suite";

    const pickYourRoomIntro =
        site?.pickYourRoomIntro?.trim() ||
        "Browse our Eden Haven, Eden Residence, Eden Grand, and Presidential Suite to match your needs";

    const handleBookNow = (roomType: RoomType) => {
        const room = roomType.name;
        const price = roomType.startingPrice;
        const size =
            updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.size ||
            roomType.size ||
            "";
        const guests =
            updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.guests ||
            roomType.guests ||
            1;

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
            guests: String(guests),
            maxGuests: String(maxGuests),
        });

        navigate(`/booking?${queryParams.toString()}`);
    };

    return (
        <>
            <div className="min-h-screen">
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <div className="roomselectcard">
                        <div className="room-selector-container">
                            <div
                                className="space-y-12 pt-24"
                                id="book-now"
                            >
                                {!hasPresidentialCms && (
                                    <div className="text-center max-w-3xl mx-auto">
                                        <h2 className="font-serif font-semibold text-eden-dark text-3xl md:text-5xl mb-6">
                                            Presidential Suite
                                        </h2>
                                        <div className="w-20 h-1 bg-eden mx-auto mb-6" />
                                        <p className="text-eden-text text-lg leading-relaxed">
                                            Distinctive stays with expansive living,
                                            premium finishes, and elevated hospitality
                                            in the valley.
                                        </p>
                                    </div>
                                )}

                                <PresidentialSuiteFeature
                                    embedded
                                    hideHeading={!hasPresidentialCms}
                                    suite={presidentialSuite ?? undefined}
                                    showPricing
                                    onBookNow={() =>
                                        handleBookNow(presidential)
                                    }
                                    sectionId="presidential-suite-feature"
                                />

                                <div className="text-center">
                                    <div className="customflex mb-6">
                                        <Leaf className="w-8 h-8 text-eden mr-3" />
                                        <h2 className="font-serif font-bold text-eden-dark text-5xl">
                                            {pickYourRoomTitle}
                                        </h2>
                                    </div>
                                    <p className="text-stone-600 text-lg font-light max-w-3xl mx-auto">
                                        {pickYourRoomIntro}
                                    </p>
                                </div>

                                <CompactRoomCards
                                    onBook={handleBookNow}
                                    showPricing
                                    showcases={
                                        hasRoomCardsCms ? cards : null
                                    }
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
