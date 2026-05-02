"use client";

import { Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { RoomType } from "@/types/accommodation";
import { roomTypes } from "../../data/packageData";
import "@/Styles/Contact.css";
import { getPresidentialSuite, getRoomCards, getSiteContent } from "@/lib/cms-api";
import CompactRoomCards from "./CompactRoomCards";
import PresidentialSuiteFeature from "./PresidentialSuiteFeature";

interface RoomTypeSelectorProps {
    onSelect: (roomType: RoomType) => void;
}

const RoomTypeSelector = ({ onSelect }: RoomTypeSelectorProps) => {
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
        "Browse our Eden Haven, Eden Residence, Eden Grand, and Presidential Suite residences to match your needs";

    return (
        <div className="space-y-12 pt-24" id="pick-your-apartment">
            {!hasPresidentialCms && (
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-serif font-semibold text-eden-dark text-3xl md:text-5xl mb-6">
                        Presidential Suite
                    </h2>
                    <div className="w-20 h-1 bg-eden mx-auto mb-6" />
                    <p className="text-eden-text text-lg leading-relaxed">
                        Distinctive stays with expansive living, premium
                        finishes, and elevated hospitality in the valley.
                    </p>
                </div>
            )}

            <PresidentialSuiteFeature
                embedded
                hideHeading={!hasPresidentialCms}
                suite={presidentialSuite ?? undefined}
                showPricing={false}
                onBookNow={() => onSelect(presidential)}
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
                onBook={onSelect}
                showPricing={false}
                showcases={hasRoomCardsCms ? cards : null}
            />
        </div>
    );
};

export default RoomTypeSelector;
