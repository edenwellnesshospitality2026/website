import React, { useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePickerComponent from "@/components/ui/DatePickerComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pcrleaefqjoijrhydhis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmxlYWVmcWpvaWpyaHlkaGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTEyNzQsImV4cCI6MjA2NDc4NzI3NH0.YAU_W5cL1Y1xLJpoOCnQYGYdH4IFxwa-vOvku8l1_zU"
);

const stayList = [
  { text: "Room boarding with breakfast" },
  { text: "Food vouchers" },
  { text: "Spa sessions" },
  { text: "Yoga sessions" },
  { text: "Access to swimming pool" },
  { text: "Access to movie theatre" },
  { text: "Access to library" },
  { text: "Access to pool table" },
];

const BookingSummaryPage = () => {
  const [params] = useSearchParams();
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = (location.state ?? {}) as {
    room?: string;
    size?: string;
    price?: string;
    maxGuests?: string;
    selectedPlans?: { code: string; qty: number; current: number }[];
    selectedRooms?: number;
    totalAmount?: number;
    checkIn?: string | null;
    checkOut?: string | null;
    adults?: number;
    children?: number;
    infants?: number;
  };

  // Extract data from URL
  const room = stateData.room ?? params.get("room");
  const size = stateData.size ?? params.get("size");
  const price = stateData.price ?? params.get("price");
  const maxGuests = parseInt(stateData.maxGuests ?? params.get("maxGuests") ?? "1", 10);

  // Form State
  const [selectedGuests, setSelectedGuests] = useState<number>(
    stateData.selectedRooms && stateData.selectedRooms > 0 ? stateData.selectedRooms : 1
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const selectedPlans = stateData.selectedPlans ?? [];
  const preferredCheckIn = stateData.checkIn ?? (preferredDate?.toDateString() || "-");

  // FORM SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submission = {
      name,
      email,
      phone,
      guests: selectedGuests,
      room,
      size,
      price,
      preferredDate: preferredCheckIn,
      notes,
    };

    const Jsondata: any = {
      name: name,
      email: email,
      phone:phone,
      number_of_guests: selectedGuests,
      check_in: preferredCheckIn === "-" ? null : preferredCheckIn,
      stay_package: "BookNow",
      room_type: room,
      room_description: `${size ?? ""}${
        selectedPlans.length
          ? ` | Plans: ${selectedPlans
              .map((p) => `${p.code}x${p.qty}`)
              .join(", ")}`
          : ""
      }`,
      special_request: notes,
    };

    // Log to console
    console.log("📝 Booking Submission:", submission);
    //  Submit to Supabase

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
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* 🔙 Back Button */}
      <div>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => navigate("/book-now")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pick Apartment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200">
          <div className="flex items-center text-2xl font-semibold text-stone-800 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
            Your Stay Summary
          </div>

          <div className="bg-stone-50 rounded-lg p-5 space-y-3">
            <div className="text-stone-800 text-lg font-medium">
              {room} {roomId ? `(${roomId})` : ""}
            </div>
            <div className="flex text-sm text-stone-600 space-x-4">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {size}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {selectedGuests} of {maxGuests} guests
              </span>
            </div>
          </div>

          {selectedPlans.length > 0 ? (
            <div className="bg-stone-50 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-medium text-stone-700">Selected Rate Plans</h4>
              {selectedPlans.map((plan) => (
                <p key={plan.code} className="text-sm text-stone-600">
                  {plan.code} × {plan.qty} = ₹{(plan.qty * plan.current).toLocaleString()}
                </p>
              ))}
            </div>
          ) : null}

          <div className="pt-2">
            <ul className="space-y-1 text-sm text-stone-600">
              {stayList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <MapPin className="w-4 h-4 mr-1 mt-1" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-stone-700 mb-2">
              Your Stay Includes:
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="outline">Fully Furnished Apartment</Badge>
              <Badge variant="outline">Air Conditioning</Badge>
              <Badge variant="outline">Complimentary Wi-Fi</Badge>
              <Badge variant="outline">Access to Amenities</Badge>
              <Badge variant="outline">Complimentary Breakfast</Badge>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-medium text-sm text-stone-700 mb-1">
              Estimated Cost
            </h4>
            <div className="text-2xl font-bold text-emerald-600">
              ₹{(stateData.totalAmount && stateData.totalAmount > 0
                ? stateData.totalAmount
                : Number(price)
              ).toLocaleString()}
            </div>
            <div className="text-xs text-stone-500">*Excluding GST</div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200"
        >
          <div className="text-2xl font-semibold text-stone-800 mb-4">
            Fill Your Information
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Full Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Email Address *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Phone Number *
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Number of Guests *
              </label>
              <Select
                value={selectedGuests.toString()}
                onValueChange={(value) => setSelectedGuests(Number(value))}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num > 1 ? "Guests" : "Guest"}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Preferred Check-in Date
              </label>
              <DatePickerComponent
                title=""
                placeholder="Select your check-in date"
                selectedDate={preferredDate}
                onDateSelect={setPreferredDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Any preferences or notes? (optional)
              </label>
              <Textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any special requirements here..."
              />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-700">
                We’ll get back to you within 24 hours with a plan based on
                availability.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-eden hover:bg-emerald-700 text-white py-3 text-lg"
            >
              Submit Enquiry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSummaryPage;

//  without back button code
// <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
//   {/* SUMMARY */}
//   <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200">
//     <div className="flex items-center text-2xl font-semibold text-stone-800 mb-4">
//       <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
//       Your Stay Summary
//     </div>

//     <div className="bg-stone-50 rounded-lg p-5 space-y-3">
//       <div className="text-stone-800 text-lg font-medium">{room}</div>
//       <div className="flex text-sm text-stone-600 space-x-4">
//         <span className="flex items-center">
//           <MapPin className="w-4 h-4 mr-1" />
//           {size}
//         </span>
//         <span className="flex items-center">
//           <Users className="w-4 h-4 mr-1" />
//           {selectedGuests} of {maxGuests} guests
//         </span>
//       </div>
//     </div>

//     <div className="pt-2">
//       <ul className="space-y-1 text-sm text-stone-600">
//         {stayList.map((item, index) => (
//           <li key={index} className="flex items-start">
//             <MapPin className="w-4 h-4 mr-1 mt-1" />
//             {item.text}
//           </li>
//         ))}
//       </ul>
//     </div>

//     <div>
//       <h4 className="text-sm font-medium text-stone-700 mb-2">
//         Your Stay Includes:
//       </h4>
//       <div className="flex flex-wrap gap-2 text-xs">
//         <Badge variant="outline">Fully Furnished Apartment</Badge>
//         <Badge variant="outline">Air Conditioning</Badge>
//         <Badge variant="outline">Complimentary Wi-Fi</Badge>
//         <Badge variant="outline">Access to Amenities</Badge>
//         <Badge variant="outline">Complimentary Breakfast</Badge>
//       </div>
//     </div>

//     <div className="pt-4">
//       <h4 className="font-medium text-sm text-stone-700 mb-1">
//         Estimated Cost
//       </h4>
//       <div className="text-2xl font-bold text-emerald-600">
//         ₹{Number(price).toLocaleString()}
//       </div>
//       <div className="text-xs text-stone-500">*Excluding GST</div>
//     </div>
//   </div>

//   {/* FORM */}
//   <form
//     onSubmit={handleSubmit}
//     className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200"
//   >
//     <div className="text-2xl font-semibold text-stone-800 mb-4">
//       Fill Your Information
//     </div>

//     <div className="grid grid-cols-1 gap-5">
//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Full Name *
//         </label>
//         <Input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           placeholder="Enter your full name"
//           className="mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Email Address *
//         </label>
//         <Input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email address"
//           className="mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Phone Number *
//         </label>
//         <Input
//           type="tel"
//           required
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Enter your phone number"
//           className="mt-1"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Number of Guests *
//         </label>
//         <Select
//           value={selectedGuests.toString()}
//           onValueChange={(value) => setSelectedGuests(Number(value))}
//         >
//           <SelectTrigger className="w-full mt-1">
//             <SelectValue placeholder="Select number of guests" />
//           </SelectTrigger>
//           <SelectContent>
//             {[...Array(maxGuests)].map((_, i) => (
//               <SelectItem key={i + 1} value={(i + 1).toString()}>
//                 {i + 1} {i + 1 > 1 ? "Guests" : "Guest"}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Preferred Check-in Date
//         </label>
//         <DatePickerComponent
//           title=""
//           placeholder="Select your check-in date"
//           selectedDate={preferredDate}
//           onDateSelect={setPreferredDate}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-stone-700">
//           Any preferences or notes? (optional)
//         </label>
//         <Textarea
//           rows={4}
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           placeholder="Share any special requirements here.."
//           className="mt-1"
//         />
//       </div>

//       <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
//         <p className="text-sm text-emerald-700">
//           We’ll get back to you within 24 hours with a plan based on
//           availability.
//         </p>
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-eden hover:bg-emerald-700 text-white py-3 text-lg"
//       >
//         Submit Enquiry
//       </Button>
//     </div>
//   </form>
// </div>
