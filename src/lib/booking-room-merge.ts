import type { RoomType } from "@/types/accommodation";
import type { PresidentialSuiteDoc, RoomCardDoc } from "@/lib/cms-api";
import { roomTypes } from "@/data/packageData";

const CARD_SLUGS = ["eden-haven", "eden-residence", "eden-grand"] as const;

const SLUG_TO_PACKAGE_ID: Record<(typeof CARD_SLUGS)[number], string> = {
  "eden-haven": "studio",
  "eden-residence": "1bhk",
  "eden-grand": "2bhk",
};

/**
 * Booking page list: room cards from CMS (when present) merged with static pricing/plan base,
 * then Presidential Suite from CMS + static fallback.
 */
export function buildDisplayRoomTypes(
  cards: RoomCardDoc[] | undefined,
  presidential: PresidentialSuiteDoc | null | undefined
): RoomType[] {
  const bySlug = new Map((cards ?? []).map((c) => [c.slug, c]));
  const merged: RoomType[] = [];

  for (const slug of CARD_SLUGS) {
    const base = roomTypes.find((r) => r.id === SLUG_TO_PACKAGE_ID[slug]);
    const card = bySlug.get(slug);
    if (!base) continue;
    const img = card?.images?.[0]?.secureUrl;
    merged.push({
      ...base,
      name: card?.headline?.trim() || base.name,
      description: card?.description?.trim() || base.description,
      image: img || base.image,
      size: card?.sizeLabel?.trim() || base.size,
      startingPrice:
        typeof card?.startingPrice === "number" && !Number.isNaN(card.startingPrice)
          ? card.startingPrice
          : base.startingPrice,
      ...(typeof card?.rateEp === "number" && !Number.isNaN(card.rateEp) ? { rateEp: card.rateEp } : {}),
      ...(typeof card?.rateCp === "number" && !Number.isNaN(card.rateCp) ? { rateCp: card.rateCp } : {}),
      ...(typeof card?.rateMap === "number" && !Number.isNaN(card.rateMap) ? { rateMap: card.rateMap } : {}),
      originalPrice: base.originalPrice,
      roomsLeft: base.roomsLeft,
    });
  }

  const presBase = roomTypes.find((r) => r.id === "presidential");
  if (presBase) {
    const img = presidential?.images?.[0]?.secureUrl;
    merged.push({
      ...presBase,
      name: presidential?.headline?.trim() || presBase.name,
      description: presidential?.description?.trim() || presBase.description,
      image: img || presBase.image,
      size: presidential?.sizeLabel?.trim() || presBase.size,
      startingPrice:
        typeof presidential?.startingPrice === "number" &&
        !Number.isNaN(presidential.startingPrice)
          ? presidential.startingPrice
          : presBase.startingPrice,
      ...(typeof presidential?.rateEp === "number" && !Number.isNaN(presidential.rateEp)
        ? { rateEp: presidential.rateEp }
        : {}),
      ...(typeof presidential?.rateCp === "number" && !Number.isNaN(presidential.rateCp)
        ? { rateCp: presidential.rateCp }
        : {}),
      ...(typeof presidential?.rateMap === "number" && !Number.isNaN(presidential.rateMap)
        ? { rateMap: presidential.rateMap }
        : {}),
      originalPrice: presBase.originalPrice,
      roomsLeft: presBase.roomsLeft,
    });
  }

  return merged;
}
