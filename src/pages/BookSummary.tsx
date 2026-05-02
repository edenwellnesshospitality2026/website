import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarRange, CheckCircle, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";

export type BookingFlowState = {
  room?: string;
  roomId?: string;
  size?: string;
  price?: string;
  maxGuests?: string;
  selectedPlans?: { code: string; qty: number; current: number }[];
  selectedRooms?: number;
  perNightSubtotal?: number;
  nights?: number;
  totalAmount?: number;
  checkIn?: string | null;
  checkOut?: string | null;
  adults?: number;
  children?: number;
  infants?: number;
};

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

function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const BookingSummaryPage = () => {
  const [params] = useSearchParams();
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = (location.state ?? {}) as BookingFlowState;

  const room = stateData.room ?? params.get("room");
  const size = stateData.size ?? params.get("size");
  const price = stateData.price ?? params.get("price");
  const maxGuests = parseInt(stateData.maxGuests ?? params.get("maxGuests") ?? "1", 10);

  const nights = Math.max(1, stateData.nights ?? 1);
  const selectedPlans = stateData.selectedPlans ?? [];

  const totalStay =
    stateData.totalAmount && stateData.totalAmount > 0
      ? stateData.totalAmount
      : Number(price ?? 0);

  const perNightSubtotal =
    stateData.perNightSubtotal ??
    selectedPlans.reduce((s, p) => s + p.qty * p.current, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const ratePlanSummaryText = useMemo(() => {
    if (!selectedPlans.length) return "";
    const parts = selectedPlans
      .filter((p) => p.qty > 0)
      .map((p) => {
        const perNight = p.qty * p.current;
        const line = perNight * nights;
        return `${p.code}×${p.qty} @ ₹${p.current.toLocaleString()}/night × ${nights} night${nights === 1 ? "" : "s"} = ₹${line.toLocaleString()}`;
      });
    return parts.join(" · ");
  }, [selectedPlans, nights]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adultsCount = stateData.adults ?? 2;
    const childrenCount = stateData.children ?? 0;
    const infantsCount = stateData.infants ?? 0;
    const totalGuestsFinal = adultsCount + childrenCount + infantsCount;

    const bookingPayload = {
      guestName: name,
      email,
      phone,
      listingName: room ?? "Unknown listing",
      roomType: [
        size,
        selectedPlans.length
          ? `Plans: ${selectedPlans.map((p) => `${p.code}×${p.qty}`).join(", ")}`
          : null,
      ]
        .filter(Boolean)
        .join(" · "),
      checkIn: stateData.checkIn ?? null,
      checkOut: stateData.checkOut ?? null,
      nights,
      adults: adultsCount,
      children: childrenCount,
      infants: infantsCount,
      totalGuests: totalGuestsFinal,
      totalAmount: totalStay,
      bookingSource: "website",
      notes,
      ratePlanSummary: ratePlanSummaryText || undefined,
      listingSlug: roomId ?? stateData.roomId ?? undefined,
    };

    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    if (response.ok) {
      void fetch(`${API_BASE}/api/booking-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          guests: totalGuestsFinal,
          checkIn: stateData.checkIn ?? undefined,
          checkOut: stateData.checkOut ?? undefined,
          listingSlug: roomId,
          roomName: room ?? undefined,
          ratePlanSummary: ratePlanSummaryText || undefined,
          estimatedTotal: totalStay,
          notes,
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      }).catch(() => undefined);
      navigate("/thank-you");
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert((errorData as { error?: string }).error || "Failed to submit booking.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 pt-28">
        <div>
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-stone-300"
            onClick={() => navigate("/booking")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to booking
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200">
            <div className="flex items-center text-2xl font-semibold text-stone-800 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
              Your Stay Summary
            </div>

            <div className="bg-stone-50 rounded-lg p-5 space-y-3">
              <div className="text-stone-800 text-lg font-medium">
                {room} {roomId ? <span className="text-stone-500">({roomId})</span> : null}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  {size}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1 shrink-0" />
                  Up to {maxGuests} guests (room max)
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-stone-700 pt-2 border-t border-stone-200">
                <span className="flex items-center gap-1">
                  <CalendarRange className="w-4 h-4" />
                  Check-in {formatIsoDate(stateData.checkIn)}
                </span>
                <span>→</span>
                <span>Check-out {formatIsoDate(stateData.checkOut)}</span>
                <span className="font-medium text-eden-dark">
                  {nights} night{nights === 1 ? "" : "s"}
                </span>
              </div>
              <p className="text-sm text-stone-600">
                Travellers: {stateData.adults ?? 2} adults
                {stateData.children ? `, ${stateData.children} children (5–12)` : ""}
                {stateData.infants ? `, ${stateData.infants} infants (under 5)` : ""}
                {" · "}
                <button
                  type="button"
                  className="text-eden-dark underline underline-offset-2"
                  onClick={() => navigate("/booking")}
                >
                  Change on booking page
                </button>
              </p>
            </div>

            {selectedPlans.length > 0 ? (
              <div className="bg-stone-50 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-medium text-stone-700">Rate plans & calculation</h4>
                <p className="text-xs text-stone-500">
                  Per-night rates × rooms × {nights} night{nights === 1 ? "" : "s"}
                </p>
                {selectedPlans
                  .filter((p) => p.qty > 0)
                  .map((plan) => (
                    <div key={plan.code} className="text-sm text-stone-700 border-b border-stone-100 pb-2 last:border-0">
                      <span className="font-medium">{plan.code}</span> — ₹
                      {plan.current.toLocaleString()}/night × {plan.qty} room
                      {plan.qty === 1 ? "" : "s"} × {nights} night{nights === 1 ? "" : "s"} = ₹
                      {(plan.qty * plan.current * nights).toLocaleString()}
                    </div>
                  ))}
                <div className="flex justify-between text-sm pt-2 font-medium text-stone-800">
                  <span>Subtotal / night (all rooms)</span>
                  <span>₹{perNightSubtotal.toLocaleString()}</span>
                </div>
              </div>
            ) : null}

            <div className="pt-2">
              <ul className="space-y-1 text-sm text-stone-600">
                {stayList.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-1 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-2">Your Stay Includes:</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">Fully Furnished Apartment</Badge>
                <Badge variant="outline">Air Conditioning</Badge>
                <Badge variant="outline">Complimentary Wi-Fi</Badge>
                <Badge variant="outline">Access to Amenities</Badge>
                <Badge variant="outline">Complimentary Breakfast</Badge>
              </div>
            </div>

            <div className="pt-4 rounded-lg bg-emerald-50/50 p-4 border border-emerald-100">
              <h4 className="font-medium text-sm text-stone-700 mb-1">Estimated stay total</h4>
              <div className="text-3xl font-bold text-emerald-700">₹{totalStay.toLocaleString()}</div>
              <div className="text-xs text-stone-500 mt-1">Before GST · excludes taxes</div>
            </div>
          </div>

          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-stone-200"
          >
            <div className="text-2xl font-semibold text-stone-800 mb-4">Guest details</div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700">Full Name *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">Email *</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">Phone *</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Notes (optional)
                </label>
                <Textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requests, dietary needs, arrival time…"
                  className="mt-1"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-800">
                  We’ll confirm availability and share payment details shortly after we receive your
                  request.
                </p>
              </div>

              <Button type="submit" className="w-full bg-eden hover:bg-emerald-800 text-white py-3 text-lg">
                Submit booking request
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSummaryPage;
