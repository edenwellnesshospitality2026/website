import { useState } from "react";
import {
  RoomType,
  RoomCategory,
  BookingDetails,
  InquiryForm,
} from "@/types/accommodation";
import RoomTypeSelector from "./accommodations/RoomSelector";
import RoomCategorySelector from "./accommodations/CategorySelector";
import DatePackageSelector from "./accommodations/DateSelector";
import InquiryFormComponent from "./accommodations/InquiryFormComponent";
type Step = "roomType" | "category" | "datePackage" | "inquiry";
const AccommodationFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("roomType");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    nights: 0,
    isPackage: false,
  });
  const handleRoomTypeSelect = (roomType: RoomType) => {
    setBookingDetails((prev) => ({
      ...prev,
      roomType,
      roomCategory: undefined,
    }));
    setCurrentStep("category");
  };
  const handleCategorySelect = (category: RoomCategory) => {
    setBookingDetails((prev) => ({
      ...prev,
      roomCategory: category,
    }));
    setCurrentStep("datePackage");

    setTimeout(() => {
      console.log("scrolling...");

      const element = document.getElementById("Stay_Packages");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };
  const handleDatePackageSelect = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({
      ...prev,
      ...details,
    }));
    setCurrentStep("inquiry");
  };
  const handleInquirySubmit = (formData: InquiryForm) => {
    console.log("Inquiry submitted:", {
      ...bookingDetails,
      ...formData,
    });
    // Here you would typically send this to your backend/CRM
    alert(
      "Thank you for your inquiry! Our wellness team will contact you shortly."
    );
  };
  const handleBack = () => {
    switch (currentStep) {
      case "category":
        setCurrentStep("roomType");
        break;
      case "datePackage":
        setCurrentStep("category");
        break;
      case "inquiry":
        setCurrentStep("datePackage");
        break;
    }
  };
  return (
    <section
      id="choose-your-sanctuary"
      className="space-y-8 sm:space-y-12 lg:space-y-16 "
    >
      {/* Step Content */}
      <div className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 lg:px-8 mx-0 my-[50px]">
        {currentStep === "roomType" && (
          <RoomTypeSelector onSelect={handleRoomTypeSelect} />
        )}

        {currentStep === "category" && bookingDetails.roomType && (
          <RoomCategorySelector
            roomType={bookingDetails.roomType}
            onSelect={handleCategorySelect}
            onBack={handleBack}
          />
        )}

        {currentStep === "datePackage" && bookingDetails.roomCategory && (
          <DatePackageSelector
            roomCategory={bookingDetails.roomCategory}
            onSelect={handleDatePackageSelect}
            onBack={handleBack}
          />
        )}

        {currentStep === "inquiry" && (
          <InquiryFormComponent
            bookingDetails={bookingDetails}
            onSubmit={handleInquirySubmit}
            onBack={handleBack}
          />
        )}
      </div>
    </section>
  );
};
export default AccommodationFlow;
