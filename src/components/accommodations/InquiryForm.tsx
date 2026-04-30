import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookingDetails,
  InquiryForm as InquiryFormType,
} from "@/types/accommodation";
import DatePickerComponent from "../ui/DatePickerComponent";
import { updatedRoomData } from "../../data/roomData";

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pcrleaefqjoijrhydhis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmxlYWVmcWpvaWpyaHlkaGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTEyNzQsImV4cCI6MjA2NDc4NzI3NH0.YAU_W5cL1Y1xLJpoOCnQYGYdH4IFxwa-vOvku8l1_zU"
);

interface InquiryFormProps {
  bookingDetails: any;
  formData: InquiryFormType;
  onInputChange: (
    field: keyof InquiryFormType,
    value: string | Date | number
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InquiryForm = ({
  bookingDetails,
  formData,
  onInputChange,
  onSubmit,
}: InquiryFormProps) => {
  // Get max guests based on room type

  // const [fullname, setFullname] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [phone, setPhone] = React.useState('');
  // const [guests, setGuests] = React.useState('');
  // const [checkinDate , setCheckinDate] = React.useState('');
  // const [wellness_Goals, setWellness_Goals] = React.useState('');

  const getMaxGuests = () => {
    if (!bookingDetails.roomType) return 6;

    const roomData =
      updatedRoomData[
        bookingDetails.roomType.id as keyof typeof updatedRoomData
      ];
    return roomData?.maxGuests || 6;
  };

  const maxGuests = getMaxGuests();

  async function handleDateSave(e: any) {
    e.preventDefault();
    console.log(formData);
    let Jsondata :any;

    if (bookingDetails?.isPackage) {
      Jsondata = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        number_of_guests: formData.numberOfGuests,
        check_in: formData.preferredCheckIn.toDateString(),
        stay_package: bookingDetails?.packageDetails.duration,
        room_type: bookingDetails.roomType?.name,
        room_description: bookingDetails.roomCategory?.name,
        special_request: formData.specialRequests,
      
      };
    } else {
      Jsondata = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        number_of_guests: formData.numberOfGuests,
        check_in: bookingDetails?.packageDetails.checkInDate.toDateString(),
        check_out: bookingDetails?.packageDetails.checkOutDate.toDateString(),
        stay_package: "Custom",
        room_type: bookingDetails.roomType?.name,
        room_description: bookingDetails.roomCategory?.name,
        special_request: formData.specialRequests,
      };
    }

    const { data, error } = await supabase
      .from("Leads")
      .insert([Jsondata])
      .select();

    if (error) {
      alert(error.message);
    } else {
      console.log(data);
    }
    e.preventDefault();

    let payload : any

    if (bookingDetails?.isPackage) { 
      payload = {
        fields: [
          { name: 'firstname', value: formData.name },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone },
          { name: 'number_of_guests', value: formData.numberOfGuests },
          { name: 'check_in', value: formData.preferredCheckIn.toDateString() },
          { name: 'stay_package', value: bookingDetails?.packageDetails?.duration },
          { name: 'room_type', value: bookingDetails.roomType?.name },
          { name: 'room_description', value: bookingDetails.roomCategory?.name },
          { name: 'special_request', value: formData.specialRequests },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      };
      
    }else{
      payload = {
        fields: [
          { name: 'firstname', value: formData.name },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone },
          { name: 'number_of_guests', value: formData.numberOfGuests },
          { name: 'check_in', value: bookingDetails?.packageDetails?.checkInDate.toDateString() },
          { name: 'check_out', value: bookingDetails?.packageDetails?.checkOutDate.toDateString() },
          { name: 'stay_package', value: 'Custom' },
          { name: 'room_type', value: bookingDetails.roomType?.name },
          { name: 'room_description', value: bookingDetails.roomCategory?.name },
          { name: 'special_request', value: formData.specialRequests },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      };

    }
    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/242929885/479a66d6-959a-42de-a12c-15a0afdec331",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (res.ok) {
        // alert("Form submitted successfully!");
      } else {
        console.error("Form submission error:", await res.text());
      }
  
    } catch (error) {
      console.log(error);
      
    }

    onSubmit(e);
  }

  return (
    <Card className="bg-white border-stone-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-stone-800">
          Fill Your Information
        </CardTitle>
        <p className="text-sm text-stone-600 mt-2">
          We’ve noted your preferences. Fill in your details and we’ll help you
          plan the rest.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleDateSave(e)} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-medium text-stone-700"
            >
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="mt-1 border-stone-300"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-stone-700"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className="mt-1 border-stone-300"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-stone-700"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className="mt-1 border-stone-300"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="numberOfGuests"
              className="text-sm font-medium text-stone-700"
            >
              Number of Guests *
            </Label>
            <Select
              value={formData.numberOfGuests?.toString()}
              onValueChange={(value) =>
                onInputChange("numberOfGuests", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1 border-stone-300">
                <SelectValue placeholder="1 Guest" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Check-in Date - Only show for packages */}
          {bookingDetails.isPackage && (
            <div>
              <Label className="text-sm font-medium text-stone-700">
                Preferred Check-in Date
              </Label>
              <div className="mt-1">
                <DatePickerComponent
                  title=""
                  placeholder="Select your check-in date"
                  selectedDate={formData.preferredCheckIn}
                  onDateSelect={(date) =>
                    onInputChange("preferredCheckIn", date)
                  }
                />
              </div>
            </div>
          )}

          <div>
            <Label
              htmlFor="specialRequests"
              className="text-sm font-medium text-stone-700"
            >
              Any preferences or notes? (optional)
            </Label>
            <Textarea
              id="specialRequests"
              placeholder="Share any special requirements here.."
              value={formData.specialRequests}
              onChange={(e) => onInputChange("specialRequests", e.target.value)}
              className="mt-1 border-stone-300"
              rows={4}
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            {/* <h4 className="font-medium text-emerald-800 mb-2">Your Wellness Journey Begins Here</h4> */}
            <p className="text-sm text-emerald-700">
              We’ll get back to you within 24 hours with a plan based on
              availability.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-lg font-medium"
          >
            Complete Your Enquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;
