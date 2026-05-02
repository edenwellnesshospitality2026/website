import { Leaf } from "lucide-react";
import { RoomType } from "@/types/accommodation";
import { roomTypes } from "../../data/packageData";
import "@/Styles/Contact.css";
import CompactRoomCards from "./CompactRoomCards";
import PresidentialSuiteFeature from "./PresidentialSuiteFeature";

interface RoomTypeSelectorProps {
    onSelect: (roomType: RoomType) => void;
}

const RoomTypeSelector = ({ onSelect }: RoomTypeSelectorProps) => {
    const presidential = roomTypes.find((r) => r.id === "presidential")!;

    return (
        <div className="space-y-12 pt-24" id="pick-your-apartment">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif font-semibold text-eden-dark text-3xl md:text-5xl mb-6">
                    Presidential Suite
                </h2>
                <div className="w-20 h-1 bg-eden mx-auto mb-6" />
                <p className="text-eden-text text-lg leading-relaxed">
                    Distinctive stays with expansive living, premium finishes,
                    and elevated hospitality in the valley.
                </p>
            </div>

            <PresidentialSuiteFeature
                embedded
                hideHeading
                showPricing={false}
                onBookNow={() => onSelect(presidential)}
                sectionId="presidential-suite-feature"
            />

            <div className="text-center">
                <div className="customflex mb-6">
                    <Leaf className="w-8 h-8 text-eden mr-3" />
                    <h2 className="font-serif font-bold text-eden-dark text-5xl">
                        Pick Your Room/Suite
                    </h2>
                </div>
                <p className="text-stone-600 text-lg font-light max-w-3xl mx-auto">
                    Browse our Eden Haven, Eden Residence, Eden Grand, and
                    Presidential Suite residences to match your needs
                </p>
            </div>

            <CompactRoomCards
                onBook={onSelect}
                showPricing={false}
            />
        </div>
    );
};

export default RoomTypeSelector;
