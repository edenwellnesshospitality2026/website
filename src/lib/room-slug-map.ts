import type { RoomType } from "@/types/accommodation";
import { roomTypes } from "@/data/packageData";

/** CMS room card `slug` → `RoomType.id` for booking (Pick Your Room grid only). */
const SLUG_TO_ROOM_ID: Record<string, string> = {
  "eden-haven": "studio",
  "eden-residence": "1bhk",
  "eden-grand": "2bhk",
};

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferRoomIdFromSlug(rawSlug: string): string | undefined {
  const slug = normalizeSlug(rawSlug);
  const direct = SLUG_TO_ROOM_ID[slug];
  if (direct) return direct;

  // Accept dashboard-friendly variants to avoid blank cards if editors change slug text.
  if (slug.includes("haven") || slug.includes("studio")) return "studio";
  if (slug.includes("residence") || slug.includes("1-bhk") || slug.includes("1bhk")) return "1bhk";
  if (slug.includes("grand") || slug.includes("2-bhk") || slug.includes("2bhk")) return "2bhk";

  return undefined;
}

export function roomTypeFromShowcaseSlug(slug: string): RoomType | undefined {
  const id = inferRoomIdFromSlug(slug);
  if (!id) return undefined;
  return roomTypes.find((r) => r.id === id);
}
