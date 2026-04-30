import { useNavigate, useParams } from "react-router-dom";
import { roomTypes } from "../data/packageData";
import { updatedRoomData } from "../data/roomData";
import SanctuarySelectionCard from "../components/accommodations/SanctuarySelectionCard";
import InquiryForm from "../components/accommodations/InquiryForm";
import React, { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";

const BookingSummaryPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const { roomId } = useParams();
  const roomType = roomTypes.find((r) => r.id === roomId);
  const roomData = updatedRoomData[roomId] || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
    preferredCheckIn: new Date(),
    preferredCheckOut: null,
    specialRequests: "",
  });

  const checkInDate = formData.preferredCheckIn;
  const checkOutDate = new Date(
    new Date(checkInDate).setDate(new Date(checkInDate).getDate() + 7)
  );

  const bookingDetails = {
    roomType,
    roomCategory: roomType,
    packageDetails: {
      duration: "14 nights",
      price: roomType?.startingPrice || 0,
      orignal_per_night: roomType?.startingPrice || 0,
      days: 14,
      voucher: 0,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    },
    isPackage: true,
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const bookingPayload = {
      guestName: formData.name,
      email: formData.email,
      phone: formData.phone,
      listingName: bookingDetails.roomType?.name || "Unknown listing",
      roomType: bookingDetails.roomCategory?.name || "Unknown room",
      checkIn: bookingDetails?.packageDetails?.checkInDate?.toDateString(),
      checkOut: bookingDetails?.packageDetails?.checkOutDate?.toDateString(),
      adults: formData.numberOfGuests,
      children: 0,
      infants: 0,
      totalGuests: formData.numberOfGuests,
      totalAmount: bookingDetails?.packageDetails?.price || 0,
      bookingSource: "website",
      notes: formData.specialRequests,
    };

    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    if (response.ok) {
      navigate("/thank-you");
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.error || "Failed to submit booking.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto pt-12">
      <div className="flex-1">
        <SanctuarySelectionCard
          bookingDetails={bookingDetails}
          formData={formData}
        />
      </div>
      <></>
      <div className="flex-1">
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

export default BookingSummaryPage;
