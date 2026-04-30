import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  BookingDetails,
  InquiryForm as InquiryFormType,
} from "@/types/accommodation";
import SanctuarySelectionCard from "./SanctuarySelectionCard";
import InquiryForm from "./InquiryForm";
import { useBookingCalculations } from "@/hooks/useBookingCalculations";
import { useNavigate } from "react-router-dom";

interface InquiryFormComponentProps {
  bookingDetails: BookingDetails;
  onSubmit: (formData: InquiryFormType) => void;
  onBack: () => void;
}
const InquiryFormComponent = ({
  bookingDetails,
  onSubmit,
  onBack,
}: InquiryFormComponentProps) => {
  const [formData, setFormData] = useState<InquiryFormType>({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
    preferredCheckIn: undefined,
    specialRequests: "",
    emergencyContact: "",
    medicalConditions: "",
  });
  const { displayNights, totalPrice } = useBookingCalculations(bookingDetails);

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/thank-you");
  };
  const handleInputChange = (
    field: keyof InquiryFormType,
    value: string | Date | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="book-now">
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl px-6 py-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Stay Options
        </Button>
      </div>

      <div className="text-center mb-8">
        {/* <p className="text-stone-600 mb-8">We’ve noted your preferences. Fill in your details and we’ll help you plan the rest.</p> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SanctuarySelectionCard
          bookingDetails={bookingDetails}
          displayNights={displayNights}
          totalPrice={totalPrice}
          selectedGuests={formData.numberOfGuests}
        />

        <InquiryForm
          bookingDetails={bookingDetails}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
export default InquiryFormComponent;
