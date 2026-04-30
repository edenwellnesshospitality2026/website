import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Snowflake,
  Tv,
  Wifi,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roomTypes } from "@/data/packageData";
import { updatedRoomData } from "@/data/roomData";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarCell = {
  date: Date;
  inCurrentMonth: boolean;
};

const getMonthGrid = (baseDate: Date): CalendarCell[] => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    cells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      inCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(year, month, day), inCurrentMonth: true });
  }

  while (cells.length < 42) {
    const nextDay = cells.length - (startWeekday + daysInMonth) + 1;
    cells.push({ date: new Date(year, month + 1, nextDay), inCurrentMonth: false });
  }

  return cells;
};

const isSameDate = (a: Date | null, b: Date) =>
  !!a &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDate = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

const BookingEngineStylePage: React.FC = () => {
  const navigate = useNavigate();
  const displayRooms = roomTypes.filter((room) => room.id !== "3bhk");
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [checkIn, setCheckIn] = useState<Date | null>(today);
  const [checkOut, setCheckOut] = useState<Date | null>(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [planSelections, setPlanSelections] = useState<Record<string, number>>({});

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffMs = checkOut.getTime() - checkIn.getTime();
    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const calendarCells = useMemo(() => getMonthGrid(viewMonth), [viewMonth]);

  const handleDayClick = (day: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }

    if (day.getTime() <= checkIn.getTime()) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }

    setCheckOut(day);
  };

  const changeGuest = (
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    min = 0
  ) => {
    setValue((prev) => Math.max(min, prev + value));
  };

  const checkAvailability = () => {
    if (!checkIn || !checkOut || nights < 1) {
      window.alert("Please select a valid check-in and check-out date.");
      return;
    }
  };

  const buildBookingPayload = (
    roomType: (typeof roomTypes)[number],
    selectedPlanRows: { code: string; qty: number; current: number }[]
  ) => {
    const size = updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.size || roomType.size;
    const guests =
      updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.guests ||
      `${roomType.guests} guests`;
    const maxGuests =
      updatedRoomData[roomType.id as keyof typeof updatedRoomData]?.maxGuests ||
      roomType.guests;
    const totalRoomsSelected = selectedPlanRows.reduce((sum, row) => sum + row.qty, 0);
    const totalAmount = selectedPlanRows.reduce(
      (sum, row) => sum + row.qty * row.current,
      0
    );

    return {
      room: roomType.name,
      roomId: roomType.id,
      size,
      guests: String(guests),
      maxGuests: String(maxGuests),
      price: roomType.startingPrice.toString(),
      selectedPlans: selectedPlanRows,
      selectedRooms: totalRoomsSelected,
      totalAmount,
      checkIn: checkIn ? checkIn.toISOString().slice(0, 10) : null,
      checkOut: checkOut ? checkOut.toISOString().slice(0, 10) : null,
      adults,
      children,
      infants,
    };
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC]">
      <Navbar />
      <main className="pt-24 pb-12">
        <section className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-5 items-start">
            <aside className="rounded-lg border border-[#d6c8a7] bg-[#f8f6f0] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e8dec8]">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                      )
                    }
                    className="text-[#8e7a4d]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex items-center gap-2">
                    <select
                      value={viewMonth.getMonth()}
                      onChange={(e) =>
                        setViewMonth(
                          new Date(viewMonth.getFullYear(), Number(e.target.value), 1)
                        )
                      }
                      className="border border-[#d6c8a7] bg-white px-2 py-1 text-sm"
                    >
                      {monthNames.map((month, idx) => (
                        <option key={month} value={idx}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={viewMonth.getFullYear()}
                      onChange={(e) =>
                        setViewMonth(
                          new Date(Number(e.target.value), viewMonth.getMonth(), 1)
                        )
                      }
                      className="border border-[#d6c8a7] bg-white px-2 py-1 text-sm"
                    >
                      {Array.from({ length: 4 }).map((_, i) => {
                        const y = today.getFullYear() + i;
                        return (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                      )
                    }
                    className="text-[#8e7a4d]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#6f675a] mb-2">
                  {weekdayNames.map((name) => (
                    <div key={name} className="py-1">
                      {name}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((cell) => {
                    const selectedCheckIn = isSameDate(checkIn, cell.date);
                    const selectedCheckOut = isSameDate(checkOut, cell.date);
                    const selectedRange =
                      checkIn &&
                      checkOut &&
                      cell.date.getTime() > checkIn.getTime() &&
                      cell.date.getTime() < checkOut.getTime();

                    return (
                      <button
                        type="button"
                        key={`${cell.date.toISOString()}-${cell.inCurrentMonth}`}
                        onClick={() => handleDayClick(cell.date)}
                        className={`h-9 text-sm border ${
                          selectedCheckIn || selectedCheckOut
                            ? "bg-[#e1ab3d] text-white border-[#e1ab3d]"
                            : selectedRange
                            ? "bg-[#f2e4c5] border-[#f2e4c5] text-[#5a4d36]"
                            : "bg-white border-[#e6ded0] text-[#6f675a]"
                        } ${!cell.inCurrentMonth ? "opacity-45" : ""}`}
                      >
                        {cell.date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-1 text-sm text-[#575043]">
                  <div className="flex justify-between">
                    <span>CHECKIN</span>
                    <strong>{formatDate(checkIn)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>CHECKOUT</span>
                    <strong>{formatDate(checkOut)}</strong>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-[#4f483f]">
                  <p className="text-base font-medium">Room 1:</p>
                  <CounterRow
                    label="Adults"
                    value={adults}
                    onMinus={() => changeGuest(-1, setAdults, 1)}
                    onPlus={() => changeGuest(1, setAdults, 1)}
                  />
                  <CounterRow
                    label="Children"
                    value={children}
                    hint="(5-12yrs)"
                    onMinus={() => changeGuest(-1, setChildren)}
                    onPlus={() => changeGuest(1, setChildren)}
                  />
                  <CounterRow
                    label="Infants"
                    value={infants}
                    hint="(<5yrs)"
                    onMinus={() => changeGuest(-1, setInfants)}
                    onPlus={() => changeGuest(1, setInfants)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-[#5f5649]">
                  <span>Rooms</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 border border-[#d6c8a7] rounded"
                      onClick={() => setRoomsCount((r) => Math.max(1, r - 1))}
                    >
                      <Minus size={14} className="mx-auto" />
                    </button>
                    <span className="w-6 text-center">{roomsCount}</span>
                    <button
                      type="button"
                      className="h-7 w-7 border border-[#d6c8a7] rounded"
                      onClick={() => setRoomsCount((r) => r + 1)}
                    >
                      <Plus size={14} className="mx-auto" />
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={checkAvailability}
                  className="mt-4 w-full bg-[#4b2500] hover:bg-[#5a2f03] text-white rounded-sm"
                >
                  CHECK AVAILABILITY
                </Button>

                <div className="mt-3 flex">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE"
                    className="rounded-none border-[#d6c8a7] border-r-0"
                  />
                  <button
                    type="button"
                    className="px-4 bg-[#4b2500] text-white border border-[#d6c8a7]"
                  >
                    ✓
                  </button>
                </div>
              </div>
            </aside>

            <section className="space-y-3">
              <div className="rounded-lg border border-[#d6c8a7] bg-[#f7f5ef] p-3">
                <h1 className="text-xl font-medium text-[#4f483f]">
                  Select the accomodation that suits you best
                </h1>
                <p className="text-xs text-[#6f675a] mt-1">
                  Adults: {adults} • {formatDate(checkIn)} to {formatDate(checkOut)} •{" "}
                  {nights} night{nights === 1 ? "" : "s"}
                </p>
              </div>

              {displayRooms.map((room) => {
                const roomData =
                  updatedRoomData[room.id as keyof typeof updatedRoomData];
                const maxGuests = roomData?.maxGuests ?? room.guests;
                const isExpanded = expandedRoomId === room.id;
                const discountPercent = room.originalPrice
                  ? Math.round(
                      ((room.originalPrice - room.startingPrice) /
                        room.originalPrice) *
                        100
                    )
                  : 0;
                const roomPlans = [
                  {
                    code: "EP",
                    name: "Room Only",
                    original: room.originalPrice ?? room.startingPrice + 2500,
                    current: room.startingPrice,
                  },
                  {
                    code: "CP",
                    name: "Breakfast Included",
                    original: (room.originalPrice ?? room.startingPrice + 2500) + 700,
                    current: room.startingPrice + 525,
                  },
                  {
                    code: "MAP",
                    name: "Breakfast and lunch or dinner",
                    original: (room.originalPrice ?? room.startingPrice + 2500) + 1700,
                    current: room.startingPrice + 1500,
                  },
                ];

                const selectedRooms = roomPlans.reduce((sum, plan) => {
                  const key = `${room.id}-${plan.code}`;
                  return sum + (planSelections[key] ?? 0);
                }, 0);

                return (
                  <article
                    key={room.id}
                    className="rounded-lg border border-[#d6c8a7] bg-[#f7f5ef] overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)_220px]">
                      <div className="relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="h-full w-full object-cover min-h-[180px]"
                        />
                        <span className="absolute top-0 left-0 bg-[#3a1d00] text-white text-xs px-3 py-2 tracking-wide">
                          SPECIAL
                          <br />
                          OFFER
                        </span>
                      </div>

                      <div className="p-4 border-l border-[#ddd0b4]">
                        <h2 className="text-[30px] md:text-[32px] leading-none font-bold text-[#d5a337] uppercase">
                          {room.name}
                        </h2>
                        <p className="text-sm text-[#6f675a] mt-1">
                          Max Guests: {Array.from({ length: maxGuests })
                            .map(() => "🧍")
                            .join(" ")}
                        </p>
                        <p className="text-[#5f5649] mt-3 text-sm leading-6">
                          {room.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-[#d5a337]">
                          <Snowflake size={20} />
                          <Wifi size={20} />
                          <Tv size={20} />
                        </div>
                        <div className="mt-3 inline-flex items-center border border-[#d5a337] text-xs">
                          <span className="px-2 py-1 bg-white text-[#4f483f]">
                            {room.roomsLeft ?? 1}
                          </span>
                          <span className="px-2 py-1 bg-[#e1ab3d] text-white font-semibold">
                            ONLY {room.roomsLeft ?? 1} ROOMS AVAILABLE
                          </span>
                        </div>
                      </div>

                      <div className="p-4 border-l border-[#ddd0b4] flex flex-col">
                        <p className="text-[#4f483f] text-sm">Starting From</p>
                        {room.originalPrice ? (
                          <p className="text-sm text-[#a44]">
                            -{discountPercent}%{" "}
                            <span className="line-through">
                              ₹{room.originalPrice.toLocaleString()}
                            </span>
                          </p>
                        ) : null}
                        <p className="text-5xl font-bold text-[#1e1b16] mt-1">
                          ₹{room.startingPrice.toLocaleString()}
                        </p>
                        <p className="text-sm text-[#6f675a]">Avg per night</p>
                        <p className="text-sm text-[#6f675a] mb-5">taxes excluded</p>

                        <Button
                          type="button"
                          variant="outline"
                          className="mt-auto border-[#d5a337] text-[#b48524] hover:bg-[#f8efd7]"
                          onClick={() =>
                            setExpandedRoomId((prev) => (prev === room.id ? null : room.id))
                          }
                        >
                          {isExpanded ? "Close" : "Details & Book"}
                        </Button>
                      </div>
                    </div>

                    {isExpanded ? (
                      <div className="border-t border-[#ddd0b4] grid grid-cols-1 md:grid-cols-[1.1fr_0.45fr_0.45fr_0.6fr]">
                        <div className="p-4 border-r border-[#ddd0b4]">
                          <p className="text-[#4f483f] font-semibold mb-3">Rate Plan</p>
                          <div className="space-y-4">
                            {roomPlans.map((plan) => (
                              <div key={plan.code}>
                                <p className="font-semibold text-[#4f483f]">{plan.code}</p>
                                <p className="text-[#5f5649]">{plan.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 border-r border-[#ddd0b4]">
                          <p className="text-[#4f483f] font-semibold mb-3">Price for 1 night</p>
                          <div className="space-y-4">
                            {roomPlans.map((plan) => (
                              <div key={plan.code}>
                                <p className="text-sm text-[#a44] line-through">
                                  ₹{plan.original.toLocaleString()}
                                </p>
                                <p className="font-semibold text-[#1e1b16]">
                                  ₹{plan.current.toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 border-r border-[#ddd0b4]">
                          <p className="text-[#4f483f] font-semibold mb-3">Rooms</p>
                          <div className="space-y-4">
                            {roomPlans.map((plan) => {
                              const key = `${room.id}-${plan.code}`;
                              const selected = planSelections[key] ?? 0;
                              const maxSelectable = Math.max(
                                1,
                                roomsCount,
                                room.roomsLeft ?? 1
                              );
                              return (
                                <select
                                  key={plan.code}
                                  value={selected}
                                  onChange={(e) =>
                                    setPlanSelections((prev) => ({
                                      ...prev,
                                      [key]: Number(e.target.value),
                                    }))
                                  }
                                  className="w-full border border-[#d6c8a7] bg-white px-2 py-2"
                                >
                                  <option value={0}>0</option>
                                  {Array.from({ length: maxSelectable }).map((_, i) => {
                                    const qty = i + 1;
                                    const total = qty * plan.current;
                                    return (
                                      <option key={qty} value={qty}>
                                        {qty} (₹{total.toLocaleString()})
                                      </option>
                                    );
                                  })}
                                </select>
                              );
                            })}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col justify-between">
                          <p className="text-[#5f5649] text-sm">
                            {selectedRooms > 0
                              ? `${selectedRooms} room(s) selected`
                              : "Please select one or more Rooms"}
                          </p>
                          <Button
                            type="button"
                            disabled={selectedRooms < 1}
                            onClick={() => {
                              const selectedPlanRows = roomPlans
                                .map((plan) => {
                                  const key = `${room.id}-${plan.code}`;
                                  const qty = planSelections[key] ?? 0;
                                  return { code: plan.code, qty, current: plan.current };
                                })
                                .filter((row) => row.qty > 0);

                              const payload = buildBookingPayload(room, selectedPlanRows);
                              navigate(`/book-summary/${room.id}`, {
                                state: payload,
                              });
                            }}
                            className="bg-[#4b2500] hover:bg-[#5a2f03] text-white disabled:bg-stone-300"
                          >
                            Reserve
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const CounterRow = ({
  label,
  value,
  hint,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  hint?: string;
  onMinus: () => void;
  onPlus: () => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-base">{label}</span>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onMinus}
        className="h-7 w-7 rounded-full border border-[#d6c8a7] text-[#b38b33]"
      >
        <Minus size={14} className="mx-auto" />
      </button>
      <span className="min-w-5 text-center">{value}</span>
      <button
        type="button"
        onClick={onPlus}
        className="h-7 w-7 rounded-full border border-[#d6c8a7] text-[#b38b33]"
      >
        <Plus size={14} className="mx-auto" />
      </button>
    </div>
    <span className="text-sm text-[#6f675a] min-w-[70px] text-right">{hint ?? ""}</span>
  </div>
);

export default BookingEngineStylePage;

