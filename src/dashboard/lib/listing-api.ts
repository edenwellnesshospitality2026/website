import type { RatePlanCode } from "./mock-data";
import type { RatePlan, RoomListing } from "./mock-data";

/** Payload shape expected by eden-backend-service /api/listings (Listing type). */
export interface ApiListing {
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
  thumbnail?: string;
  galleryImages: string[];
  basePrice: number;
  discountPrice?: number;
  taxesInfo?: string;
  availableInventory: number;
  totalInventory: number;
  status: "active" | "inactive";
  createdAt: string;
  ratePlans: ApiRatePlan[];
}

export interface ApiRatePlan {
  id: string;
  code: RatePlanCode;
  title: string;
  description: string;
  mealInclusion: string;
  pricePerNight: number;
  discountedPrice?: number;
  availability: string;
  cancellationPolicySnippet: string;
  status: "active" | "inactive";
  availableInventory: number;
  totalInventory: number;
}

export function ratePlanToApi(rp: RatePlan): ApiRatePlan {
  return {
    id: rp.id,
    code: rp.code,
    title: rp.title?.trim() || `${rp.code} plan`,
    description: rp.description?.trim() || "—",
    mealInclusion: rp.mealInclusion?.trim() || "—",
    pricePerNight: rp.pricePerNight ?? 0,
    discountedPrice: rp.discountedPrice,
    availability: rp.availability?.trim() || "Available",
    cancellationPolicySnippet: (rp.cancellationPolicy ?? "").trim() || "See hotel policy",
    status: rp.status,
    availableInventory: rp.availableInventory ?? 0,
    totalInventory: rp.totalInventory ?? 0,
  };
}

export function roomListingToApiPayload(room: RoomListing): ApiListing {
  return {
    id: room.id,
    name: room.name,
    slug: room.slug || undefined,
    listingType: room.listingType,
    category: room.category,
    shortDescription: room.shortDescription,
    fullDescription: room.fullDescription,
    maxGuests: room.maxGuests,
    baseOccupancy: room.baseOccupancy,
    amenities: room.amenities,
    thumbnail: room.thumbnail || undefined,
    galleryImages: room.galleryImages ?? [],
    basePrice: room.basePrice,
    discountPrice: room.discountPrice,
    taxesInfo: room.taxesInfo,
    availableInventory: room.availableRooms,
    totalInventory: room.totalRooms,
    status: room.status,
    createdAt: room.createdAt?.includes("T")
      ? room.createdAt
      : new Date(room.createdAt || Date.now()).toISOString(),
    ratePlans: room.ratePlans.map(ratePlanToApi),
  };
}

export function apiListingToRoomListing(listing: Record<string, unknown>): RoomListing {
  const ratePlans = (listing.ratePlans as Record<string, unknown>[]) ?? [];
  return {
    id: String(listing.id),
    name: String(listing.name),
    slug: listing.slug ? String(listing.slug) : undefined,
    listingType: String(listing.listingType),
    category: String(listing.category),
    shortDescription: String(listing.shortDescription),
    fullDescription: listing.fullDescription ? String(listing.fullDescription) : undefined,
    maxGuests: Number(listing.maxGuests),
    baseOccupancy: Number(listing.baseOccupancy),
    amenities: (listing.amenities as string[]) ?? [],
    thumbnail: listing.thumbnail ? String(listing.thumbnail) : "",
    galleryImages: (listing.galleryImages as string[]) ?? [],
    basePrice: Number(listing.basePrice),
    discountPrice: listing.discountPrice != null ? Number(listing.discountPrice) : undefined,
    taxesInfo: listing.taxesInfo ? String(listing.taxesInfo) : undefined,
    availableRooms: Number(listing.availableInventory),
    totalRooms: Number(listing.totalInventory),
    status: listing.status as RoomListing["status"],
    createdAt: String(listing.createdAt ?? "").slice(0, 10),
    ratePlans: ratePlans.map((plan) => ({
      id: String(plan.id),
      code: plan.code as RatePlanCode,
      title: String(plan.title ?? ""),
      description: String(plan.description ?? ""),
      availability: plan.availability != null ? String(plan.availability) : undefined,
      pricePerNight: Number(plan.pricePerNight ?? 0),
      discountedPrice: plan.discountedPrice != null ? Number(plan.discountedPrice) : undefined,
      taxesInfo: "+ 18% GST",
      totalInventory: Number(plan.totalInventory ?? 0),
      availableInventory: Number(plan.availableInventory ?? 0),
      status: (plan.status as RatePlan["status"]) ?? "active",
      mealInclusion: String(plan.mealInclusion ?? ""),
      cancellationPolicy: String(plan.cancellationPolicySnippet ?? ""),
    })),
  };
}
