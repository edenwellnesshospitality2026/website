import { useNavigate, useParams } from "react-router-dom";
import { roomTypes } from "../data/packageData";
import { updatedRoomData } from "../data/roomData";
import SanctuarySelectionCard from "../components/accommodations/SanctuarySelectionCard";
import InquiryForm from "../components/accommodations/InquiryForm";
import React, { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { json } from "stream/consumers";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pcrleaefqjoijrhydhis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmxlYWVmcWpvaWpyaHlkaGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTEyNzQsImV4cCI6MjA2NDc4NzI3NH0.YAU_W5cL1Y1xLJpoOCnQYGYdH4IFxwa-vOvku8l1_zU"
);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const Jsondata: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      number_of_guests: formData.numberOfGuests,
      check_in: bookingDetails?.packageDetails?.checkInDate?.toDateString(),
      check_out: bookingDetails?.packageDetails?.checkOutDate?.toDateString(),
      stay_package: "Custom",
      room_type: bookingDetails.roomType?.name,
      room_description: bookingDetails.roomCategory?.name,
      special_request: formData.specialRequests,
    };

    const { data, error } = await supabase
      .from("Leads")
      .insert([Jsondata])
      .select();

    if (error) {
      alert(error.message);
    } else {
      console.log(data);

      navigate("/thank-you");
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
