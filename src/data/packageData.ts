import { RoomType, RoomCategory, Package } from "@/types/accommodation";

export const roomTypes: RoomType[] = [
    {
        id: "studio",
        name: "Eden Haven",
        image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/studio.jpg",
        size: "400-500 sq ft",
        guests: 1,
        startingPrice: 7500,
        originalPrice: 9000,
        roomsLeft: 1,
        description:
            "Cozy Eden Haven(studio apartment) perfect for solo travelers seeking comfort and wellness",
        amenities: ["WiFi", "Kitchenette", "Balcony", "Air Conditioning"],
        weekdayPrice: {
            withoutBreakfast: 6000,
            withBreakfast: "",
        },
    },
    {
        id: "1bhk",
        name: "Eden Residence",
        image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/1bhk.jpg",
        size: "600-800 sq ft",
        guests: 2,
        startingPrice: 10000,
        roomsLeft: 1,
        originalPrice: 11000,
        description:
            "Spacious one-bedroom apartment ideal for couples or individuals",
        amenities: [
            "WiFi",
            "Full Kitchen",
            "Living Room",
            "Balcony",
            "Air Conditioning",
        ],
        weekdayPrice: {
            withoutBreakfast: 7500,
            withBreakfast: "",
        },
    },
    {
        id: "2bhk",
        name: "Eden Grand",
        image: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/2bhk.jpg",
        size: "900-1200 sq ft",
        guests: 4,
        startingPrice: 15000,
        originalPrice: 18000,
        roomsLeft: 2,
        description: "Premium two-bedroom apartment perfect for families",
        amenities: [
            "WiFi",
            "Full Kitchen",
            "Living Room",
            "Multiple Balconies",
            "Air Conditioning",
        ],
        weekdayPrice: {
            withoutBreakfast: 12000,
            withBreakfast: "",
        },
    },
    {
        id: "3bhk",
        name: "3 BHK Apartment",
        image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80",
        size: "1200-1600 sq ft",
        guests: 6,
        startingPrice: 50000,
        originalPrice: 50000,
        description:
            "Luxurious three-bedroom apartment for large families or groups",
        amenities: [
            "WiFi",
            "Full Kitchen",
            "Spacious Living Room",
            "Multiple Balconies",
            "Air Conditioning",
            "Study Room",
        ],
        roomsLeft: 1,
        weekdayPrice: {},
    },
];

export const roomCategories: RoomCategory[] = [
    // Studio Categories
    {
        id: "crest",
        name: "Crest",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        size: "350 sq ft",
        guests: 2,
        startingPrice: 3500,
        roomTypeId: "studio",
        description: "Modern studio with city views",
        amenities: [
            "City View",
            "Modern Kitchen",
            "High-Speed WiFi",
            "Air Conditioning",
        ],
    },
    {
        id: "hamilton",
        name: "Hamilton",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
        size: "400 sq ft",
        guests: 2,
        startingPrice: 3800,
        roomTypeId: "studio",
        description: "Premium studio with luxury amenities",
        amenities: ["Premium Furnishing", "Smart TV", "Kitchenette", "Balcony"],
    },
    {
        id: "skyline",
        name: "Skyline",
        image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&h=600&fit=crop",
        size: "450 sq ft",
        guests: 2,
        startingPrice: 4200,
        roomTypeId: "studio",
        description: "Top-floor studio with panoramic views",
        amenities: [
            "Panoramic Views",
            "Premium Kitchen",
            "Work Desk",
            "Premium Bedding",
        ],
    },
    // 1BHK Categories
    {
        id: "regency",
        name: "Regency 1BHK",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
        size: "600 sq ft",
        guests: 3,
        startingPrice: 5500,
        roomTypeId: "1bhk",
        description: "Elegant 1BHK with separate living area",
        amenities: [
            "Separate Bedroom",
            "Living Area",
            "Full Kitchen",
            "Dining Space",
        ],
    },
    // 2BHK Categories
    {
        id: "victoria",
        name: "Victoria",
        image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop",
        size: "850 sq ft",
        guests: 5,
        startingPrice: 8500,
        roomTypeId: "2bhk",
        description: "Spacious 2BHK with modern amenities",
        amenities: [
            "Two Bedrooms",
            "Large Living Room",
            "Full Kitchen",
            "Two Bathrooms",
        ],
    },
    {
        id: "renaissance",
        name: "Renaissance",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        size: "1000 sq ft",
        guests: 5,
        startingPrice: 9800,
        roomTypeId: "2bhk",
        description: "Luxury 2BHK with premium finishes",
        amenities: [
            "Premium Interiors",
            "Master Bedroom",
            "Guest Bedroom",
            "Luxury Bathroom",
        ],
    },
];

export const packages: Package[] = [
    {
        id: "1week",
        name: "1 Week Stay",
        duration: "7 nights",
        price: 0.9, // 10% discount
        savings: 10,
    },
    {
        id: "2week",
        name: "2 Week Stay",
        duration: "14 nights",
        price: 0.85, // 15% discount
        savings: 15,
    },
    {
        id: "4week",
        name: "4 Week Stay",
        duration: "28 nights",
        price: 0.75, // 25% discount
        savings: 25,
    },
];

// Legacy export for backward compatibility
export const packageData = {
    roomTypes,
    roomCategories,
    packages,
};
