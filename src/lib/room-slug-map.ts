import type { RoomType } from "@/types/accommodation";
import { roomTypes } from "@/data/packageData";

/** CMS room card `slug` → `RoomType.id` for booking (Pick Your Room grid only). */
const SLUG_TO_ROOM_ID: Record<string, string> = {
  "eden-haven": "studio",
  "eden-residence": "1bhk",
  "eden-grand": "2bhk",
};

export function roomTypeFromShowcaseSlug(slug: string): RoomType | undefined {
  const id = SLUG_TO_ROOM_ID[slug];
  if (!id) return undefined;
  return roomTypes.find((r) => r.id === id);
}
