const suiteImg = "/assets/Room Image.png";
const grandImg = "/assets/Building.jpg";
const havenImg = "/assets/Room.png";
const residenceImg = "/assets/1 BHk.png";

export type BookingStatus = "new" | "pending" | "confirmed" | "cancelled" | "checked-in" | "checked-out";
export type PaymentStatus = "paid" | "partial" | "unpaid" | "refunded";
export type RatePlanCode = "EP" | "CP" | "MAP";
export type BookingSource = "Direct" | "Website" | "MakeMyTrip" | "Booking.com" | "Agoda" | "Walk-in";

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomType: string;
  ratePlan: RatePlanCode;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  nights: number;
  pricePerNight: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  source: BookingSource;
  specialRequests?: string;
  internalNotes?: string;
  createdAt: string;
}

export interface RatePlan {
  id: string;
  code: RatePlanCode;
  title: string;
  description: string;
  availability?: string;
  pricePerNight: number;
  discountedPrice?: number;
  taxesInfo: string;
  totalInventory: number;
  availableInventory: number;
  status: "active" | "inactive";
  mealInclusion: string;
  cancellationPolicy: string;
}

export interface RoomListing {
  id: string;
  name: string;
  slug?: string;
  listingType: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  maxGuests: number;
  baseOccupancy: number;
  amenities: string[];
  thumbnail: string;
  galleryImages?: string[];
  basePrice: number;
  discountPrice?: number;
  taxesInfo?: string;
  availableRooms: number;
  totalRooms: number;
  status: "active" | "inactive";
  createdAt: string;
  ratePlans: RatePlan[];
}

export const ROOM_TYPES = [
  "Eden Haven",
  "Eden Residence",
  "Eden Suite 1BHK",
  "Eden Grand Suite 2BHK",
  "Presidential Suite",
];

export const RATE_PLANS: { code: RatePlanCode; label: string }[] = [
  { code: "EP", label: "EP - Room Only" },
  { code: "CP", label: "CP - Breakfast Included" },
  { code: "MAP", label: "MAP - Breakfast + Lunch/Dinner" },
];

const today = new Date();
const d = (offset: number) => {
  const x = new Date(today);
  x.setDate(x.getDate() + offset);
  return x.toISOString().slice(0, 10);
};

export const mockBookings: Booking[] = [
  {
    id: "EDN-2041",
    guestName: "Aarav Kapoor",
    email: "aarav.kapoor@gmail.com",
    phone: "+91 98112 44530",
    roomType: "Eden Grand Suite 2BHK",
    ratePlan: "MAP",
    checkIn: d(0),
    checkOut: d(3),
    adults: 2,
    children: 1,
    infants: 0,
    nights: 3,
    pricePerNight: 18500,
    totalAmount: 55500,
    paymentStatus: "paid",
    status: "checked-in",
    source: "Direct",
    specialRequests: "Late check-out, valley-view room preferred.",
    internalNotes: "Returning guest - offer welcome amenity.",
    createdAt: d(-5),
  },
  {
    id: "EDN-2042",
    guestName: "Meera Sundaram",
    email: "meera.s@outlook.com",
    phone: "+91 99201 78812",
    roomType: "Eden Suite 1BHK",
    ratePlan: "CP",
    checkIn: d(1),
    checkOut: d(4),
    adults: 2,
    children: 0,
    infants: 0,
    nights: 3,
    pricePerNight: 12200,
    totalAmount: 36600,
    paymentStatus: "partial",
    status: "confirmed",
    source: "Website",
    specialRequests: "Anniversary celebration - floral set-up.",
    createdAt: d(-3),
  },
  {
    id: "EDN-2043",
    guestName: "Rohan Mehta",
    email: "rohan.mehta@yahoo.com",
    phone: "+91 90015 22113",
    roomType: "Eden Haven",
    ratePlan: "EP",
    checkIn: d(2),
    checkOut: d(5),
    adults: 1,
    children: 0,
    infants: 0,
    nights: 3,
    pricePerNight: 7500,
    totalAmount: 22500,
    paymentStatus: "unpaid",
    status: "pending",
    source: "Booking.com",
    specialRequests: "Early check-in if possible.",
    createdAt: d(-1),
  },
];

export const mockRooms: RoomListing[] = [
  {
    id: "rm-haven",
    name: "Eden Haven",
    slug: "eden-haven",
    listingType: "Room",
    category: "Studio Apartment",
    shortDescription: "An intimate studio sanctuary with valley views.",
    fullDescription: "An intimate studio sanctuary with valley views, crafted for restorative stays.",
    maxGuests: 2,
    baseOccupancy: 2,
    amenities: ["Valley View", "King Bed", "Rain Shower"],
    thumbnail: havenImg,
    galleryImages: [havenImg],
    basePrice: 8500,
    discountPrice: 7500,
    taxesInfo: "+ 12% GST",
    availableRooms: 4,
    totalRooms: 6,
    status: "active",
    createdAt: d(-45),
    ratePlans: [
      {
        id: "h-ep",
        code: "EP",
        title: "Room Only",
        description: "Stay only.",
        pricePerNight: 8500,
        discountedPrice: 7500,
        taxesInfo: "+ 12% GST",
        totalInventory: 6,
        availableInventory: 4,
        status: "active",
        mealInclusion: "None",
        cancellationPolicy: "Free cancellation up to 48h before check-in.",
      },
      {
        id: "h-cp",
        code: "CP",
        title: "Bed & Breakfast",
        description: "Includes breakfast.",
        pricePerNight: 9500,
        discountedPrice: 8400,
        taxesInfo: "+ 12% GST",
        totalInventory: 6,
        availableInventory: 3,
        status: "active",
        mealInclusion: "Breakfast",
        cancellationPolicy: "Free cancellation up to 48h before check-in.",
      },
    ],
  },
  {
    id: "rm-residence",
    name: "Eden Residence",
    slug: "eden-residence",
    listingType: "Apartment",
    category: "Premium Apartment",
    shortDescription: "Refined apartment-style living with kitchenette.",
    fullDescription: "Refined apartment-style living ideal for extended wellness stays.",
    maxGuests: 3,
    baseOccupancy: 2,
    amenities: ["Kitchenette", "Balcony", "Workspace"],
    thumbnail: residenceImg,
    galleryImages: [residenceImg],
    basePrice: 11000,
    discountPrice: 9800,
    taxesInfo: "+ 18% GST",
    availableRooms: 2,
    totalRooms: 5,
    status: "active",
    createdAt: d(-30),
    ratePlans: [],
  },
  {
    id: "rm-suite",
    name: "Eden Suite 1BHK",
    slug: "eden-suite-1bhk",
    listingType: "Suite",
    category: "One-Bedroom Suite",
    shortDescription: "Spacious 1BHK suite with separate living area.",
    fullDescription: "A spacious one-bedroom suite with private terrace.",
    maxGuests: 4,
    baseOccupancy: 2,
    amenities: ["Living Room", "Private Terrace"],
    thumbnail: suiteImg,
    galleryImages: [suiteImg],
    basePrice: 12200,
    discountPrice: 10900,
    taxesInfo: "+ 18% GST",
    availableRooms: 3,
    totalRooms: 4,
    status: "active",
    createdAt: d(-20),
    ratePlans: [],
  },
  {
    id: "rm-grand",
    name: "Eden Grand Suite 2BHK",
    slug: "eden-grand-suite-2bhk",
    listingType: "Suite",
    category: "Two-Bedroom Grand Suite",
    shortDescription: "Our flagship two-bedroom residence.",
    fullDescription: "Our flagship two-bedroom residence for families.",
    maxGuests: 6,
    baseOccupancy: 4,
    amenities: ["2 Bedrooms", "Private Dining"],
    thumbnail: grandImg,
    galleryImages: [grandImg],
    basePrice: 16500,
    discountPrice: 14900,
    taxesInfo: "+ 18% GST",
    availableRooms: 1,
    totalRooms: 3,
    status: "active",
    createdAt: d(-10),
    ratePlans: [],
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
