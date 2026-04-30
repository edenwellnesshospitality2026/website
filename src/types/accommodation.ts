import { Numerals } from "react-day-picker";

export interface RoomType {
    id: string;
    name: string;
    description: string;
    image: string;
    size: string;
    guests: number;
    startingPrice: number;
    amenities: string[];
    originalPrice: number;
    roomsLeft: number;
    weekdayPrice: any;
}

export interface RoomCategory {
    id: string;
    name: string;
    description: string;
    image: string;
    size: string;
    guests: number;
    startingPrice: number;
    amenities: string[];
    roomTypeId: string;
}

export interface Package {
    id: string;
    name: string;
    duration: string;
    price: number;
    savings: number;
}

export interface PackageInfo {
    id: string;
    name: string;
    duration: string;
    price: number;
    savings: number;
    description: string;
    features: string[];
    addOns: string[];
    total: number;
}

export interface BookingDetails {
    roomType?: RoomType;
    roomCategory?: RoomCategory;
    checkIn?: Date;
    checkOut?: Date;
    checkInDate?: Date;
    checkOutDate?: Date;
    nights: number;
    isPackage: boolean;
    package?: Package;
    packageDetails?: PackageInfo;
    totalPrice?: number;
}

export interface InquiryForm {
    name: string;
    email: string;
    phone: string;
    message?: string;
    numberOfGuests?: number;
    preferredCheckIn?: Date;
    specialRequests: string;
    emergencyContact: string;
    medicalConditions: string;
}
