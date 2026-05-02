import type { RoomType } from "@/types/accommodation";

export type RoomPlanRow = {
  code: "EP" | "CP" | "MAP";
  name: string;
  original: number;
  current: number;
};

/**
 * EP/CP/MAP nightly amounts for the booking table.
 * Uses CMS `rateEp` / `rateCp` / `rateMap` when set; otherwise legacy formulas from `startingPrice` / `originalPrice`.
 * When only EP is customized, CP/MAP derive from effective EP (rateEp ?? startingPrice).
 */
export function buildRoomPlansFromRoomType(room: RoomType): RoomPlanRow[] {
  const rackBase = room.originalPrice ?? room.startingPrice + 2500;
  const effectiveEp = room.rateEp ?? room.startingPrice;
  const ep = effectiveEp;
  const cp = room.rateCp ?? effectiveEp + 525;
  const map = room.rateMap ?? effectiveEp + 1500;

  return [
    {
      code: "EP",
      name: "Room Only",
      original: rackBase,
      current: ep,
    },
    {
      code: "CP",
      name: "Breakfast Included",
      original: rackBase + 700,
      current: cp,
    },
    {
      code: "MAP",
      name: "Breakfast and lunch or dinner",
      original: rackBase + 1700,
      current: map,
    },
  ];
}
