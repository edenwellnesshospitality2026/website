import { useEffect, useMemo, useState } from "react";
import {
  Bell, Calendar, CheckCircle2, Clock, DoorOpen, Filter, MoreHorizontal,
  Pencil, Plus, Search, Sparkles, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { BookingDetails } from "../components/BookingDetails";
import { BookingForm } from "../components/BookingForm";
import { BookingStatusBadge, PaymentStatusBadge } from "../components/StatusBadge";
import { DashboardShell } from "../components/DashboardShell";
import {
  type Booking, type BookingStatus, type RoomListing,
  mockBookings, mockRooms, formatINR,
} from "../lib/mock-data";
import { RoomListingPanel } from "../components/RoomListingPanel";
import { getToken } from "../auth/auth-service";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";

function ratePlanBadgeFromSummary(summary: unknown): Booking["ratePlan"] {
  if (typeof summary !== "string") return "EP";
  const m = /\b(EP|CP|MAP)\b/.exec(summary);
  const code = m?.[1];
  if (code === "CP" || code === "MAP" || code === "EP") return code;
  return "EP";
}

const DashboardBookingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [rooms, setRooms] = useState<RoomListing[]>(mockRooms);

  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState("");

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewing, setViewing] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [bookingsRes, listingsRes] = await Promise.all([
          fetch(`${API_BASE}/api/bookings`, { headers }),
          fetch(`${API_BASE}/api/listings`),
        ]);

        if (bookingsRes.ok) {
          const bookingsPayload = await bookingsRes.json();
          const mappedBookings: Booking[] = (bookingsPayload.data ?? []).map((booking: any) => ({
            id: booking.bookingId,
            guestName: booking.guestName,
            email: booking.email ?? "",
            phone: booking.phone,
            roomType: booking.roomType,
            ratePlan: ratePlanBadgeFromSummary(booking.ratePlanSummary),
            ratePlanSummary: booking.ratePlanSummary,
            listingSlug: booking.listingSlug,
            checkIn: booking.checkIn ?? "",
            checkOut: booking.checkOut ?? "",
            adults: booking.adults ?? 0,
            children: booking.children ?? 0,
            infants: booking.infants ?? 0,
            nights: booking.nights ?? 1,
            pricePerNight: booking.nights && booking.nights > 0
              ? Math.round((booking.totalAmount ?? 0) / booking.nights)
              : booking.totalAmount ?? 0,
            totalAmount: booking.totalAmount ?? 0,
            paymentStatus: booking.paymentStatus ?? "unpaid",
            status: booking.bookingStatus ?? "new",
            source: (booking.bookingSource ?? "Website") as Booking["source"],
            specialRequests: booking.notes ?? "",
            internalNotes: booking.internalRemarks ?? "",
            createdAt: new Date().toISOString().slice(0, 10),
          }));
          setBookings(mappedBookings);
        }

        if (listingsRes.ok) {
          const listingsPayload = await listingsRes.json();
          const mappedRooms: RoomListing[] = (listingsPayload.data ?? []).map((listing: any) => ({
            id: listing.id,
            name: listing.name,
            slug: listing.slug,
            listingType: listing.listingType,
            category: listing.category,
            shortDescription: listing.shortDescription,
            fullDescription: listing.fullDescription,
            maxGuests: listing.maxGuests,
            baseOccupancy: listing.baseOccupancy,
            amenities: listing.amenities ?? [],
            thumbnail: listing.thumbnail ?? "",
            galleryImages: listing.galleryImages ?? [],
            basePrice: listing.basePrice ?? 0,
            discountPrice: listing.discountPrice,
            taxesInfo: listing.taxesInfo,
            availableRooms: listing.availableInventory ?? 0,
            totalRooms: listing.totalInventory ?? 0,
            status: listing.status ?? "active",
            createdAt: listing.createdAt ?? new Date().toISOString().slice(0, 10),
            ratePlans: (listing.ratePlans ?? []).map((plan: any) => ({
              id: plan.id,
              code: plan.code,
              title: plan.title,
              description: plan.description,
              availability: plan.availability,
              pricePerNight: plan.pricePerNight ?? 0,
              discountedPrice: plan.discountedPrice,
              taxesInfo: "+ 18% GST",
              totalInventory: plan.totalInventory ?? 0,
              availableInventory: plan.availableInventory ?? 0,
              status: plan.status ?? "active",
              mealInclusion: plan.mealInclusion ?? "",
              cancellationPolicy: plan.cancellationPolicySnippet ?? "",
            })),
          }));
          setRooms(mappedRooms);
        }
      } catch {
        // Keep fallback mock data for local resilience
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);
  const roomTypes = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.name))),
    [rooms]
  );


  const today = new Date().toISOString().slice(0, 10);

  const summary = useMemo(() => ({
    new: bookings.filter(b => b.status === "new").length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    checkInsToday: bookings.filter(b => b.checkIn === today && b.status !== "cancelled").length,
    checkOutsToday: bookings.filter(b => b.checkOut === today && b.status !== "cancelled").length,
  }), [bookings, today]);

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      if (search) {
        const s = search.toLowerCase();
        if (![b.id, b.guestName, b.phone, b.email].some(f => f.toLowerCase().includes(s))) return false;
      }
      if (roomFilter !== "all" && b.roomType !== roomFilter) return false;
      if (planFilter !== "all" && b.ratePlan !== planFilter) return false;
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (paymentFilter !== "all" && b.paymentStatus !== paymentFilter) return false;
      if (dateFilter && b.checkIn !== dateFilter && b.checkOut !== dateFilter) return false;
      return true;
    });
  }, [bookings, search, roomFilter, planFilter, statusFilter, paymentFilter, dateFilter]);

  const onSave = (booking: Booking) => {
    setBookings(curr => {
      const idx = curr.findIndex(x => x.id === booking.id);
      if (idx >= 0) { const next = [...curr]; next[idx] = booking; return next; }
      return [booking, ...curr];
    });
  };

  const updateStatus = (id: string, status: BookingStatus, msg: string) => {
    setBookings(curr => curr.map(b => b.id === id ? { ...b, status } : b));
    toast.success(msg);
  };

  const openNew = () => { setEditingBooking(null); setFormOpen(true); };
  const openEdit = (b: Booking) => { setEditingBooking(b); setFormOpen(true); };

  return (
    <DashboardShell
      kicker="Operations Panel"
      title="Review Bookings"
      subtitle="A calm overview of every reservation across the retreat."
      titleClassName="text-4xl sm:text-5xl"
      userRoleLabel="Operations"
      headerActions={
        <>
          <Button variant="ghost" size="icon" className="relative text-cocoa hover:text-espresso">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
          </Button>
          <Button
            onClick={openNew}
            className="h-11 bg-gradient-gold px-5 text-ivory shadow-gold hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> New Booking
          </Button>
        </>
      }
    >
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <SummaryCard icon={<Sparkles />} label="New" value={summary.new} tone="info" loading={loading} />
          <SummaryCard icon={<Clock />} label="Pending" value={summary.pending} tone="warning" loading={loading} />
          <SummaryCard icon={<CheckCircle2 />} label="Confirmed" value={summary.confirmed} tone="success" loading={loading} />
          <SummaryCard icon={<DoorOpen />} label="Check-ins today" value={summary.checkInsToday} tone="gold" loading={loading} />
          <SummaryCard icon={<DoorOpen className="rotate-180" />} label="Check-outs today" value={summary.checkOutsToday} tone="cocoa" loading={loading} />
        </section>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-card border border-border/60 p-1 h-auto rounded-full shadow-soft">
            <TabsTrigger value="bookings" className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-gradient-gold data-[state=active]:text-ivory data-[state=active]:shadow-gold">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="rooms" className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-gradient-gold data-[state=active]:text-ivory data-[state=active]:shadow-gold">
              Rooms & Rate Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="luxe-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-gold-deep" />
                <h3 className="font-display text-lg text-espresso">Filter & Search</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, guest or phone..." className="pl-9 h-10" />
                </div>
                <FilterSelect value={roomFilter} onChange={setRoomFilter} placeholder="Room type" options={[["all", "All rooms"], ...roomTypes.map(r => [r, r] as [string, string])]} />
                <FilterSelect value={planFilter} onChange={setPlanFilter} placeholder="Rate plan" options={[["all","All plans"],["EP","EP"],["CP","CP"],["MAP","MAP"]]} />
                <FilterSelect value={statusFilter} onChange={setStatusFilter} placeholder="Status" options={[["all","All status"],["new","New"],["pending","Pending"],["confirmed","Confirmed"],["checked-in","Checked In"],["checked-out","Checked Out"],["cancelled","Cancelled"]]} />
                <div className="flex gap-2">
                  <FilterSelect value={paymentFilter} onChange={setPaymentFilter} placeholder="Payment" options={[["all","All payment"],["paid","Paid"],["partial","Partial"],["unpaid","Unpaid"],["refunded","Refunded"]]} />
                </div>
                <div className="lg:col-span-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="h-10" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="luxe-card p-5">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <EmptyState onCreate={openNew} />
              ) : (
                filtered.map((b, i) => (
                  <BookingRow
                    key={b.id} booking={b} index={i}
                    onView={() => setViewing(b)}
                    onEdit={() => openEdit(b)}
                    onConfirm={() => updateStatus(b.id, "confirmed", `${b.id} confirmed`)}
                    onPending={() => updateStatus(b.id, "pending", `${b.id} marked pending`)}
                    onCancel={() => updateStatus(b.id, "cancelled", `${b.id} cancelled`)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-espresso">Room Listings & Rate Plans</h2>
                <p className="text-sm text-muted-foreground">Manage inventory, pricing and meal plans across all four residences.</p>
              </div>
              <Button variant="outline" className="border-gold/40 text-gold-deep hover:bg-gold/10">
                <Plus className="h-4 w-4" /> New Listing
              </Button>
            </div>
            <RoomListingPanel rooms={rooms} />
          </TabsContent>
        </Tabs>

      <BookingForm open={formOpen} onOpenChange={setFormOpen} booking={editingBooking} onSave={onSave} />
      <BookingDetails booking={viewing} onClose={() => setViewing(null)} onEdit={openEdit} />

      <footer className="mt-16 border-t border-border/60">
        <div className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Eden Wellness & Hospitality · Dehradun Valley</p>
          <p className="tracking-[0.2em] uppercase">Crafted with calm</p>
        </div>
      </footer>
    </DashboardShell>
  );
};

const FilterSelect = ({ value, onChange, placeholder, options }: {
  value: string; onChange: (v: string) => void; placeholder: string; options: [string, string][];
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10"><SelectValue placeholder={placeholder} /></SelectTrigger>
    <SelectContent>
      {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
    </SelectContent>
  </Select>
);

const tones: Record<string, string> = {
  info: "from-info/20 to-info/5 text-info",
  warning: "from-warning/20 to-warning/5 text-warning",
  success: "from-success/20 to-success/5 text-success",
  gold: "from-gold/30 to-gold/5 text-gold-deep",
  cocoa: "from-cocoa/20 to-cocoa/5 text-cocoa",
};

const SummaryCard = ({ icon, label, value, tone, loading }: {
  icon: React.ReactNode; label: string; value: number; tone: keyof typeof tones; loading: boolean;
}) => (
  <div className="luxe-card relative overflow-hidden p-5 group">
    <div className={`absolute inset-0 bg-gradient-to-br ${tones[tone]} opacity-50 transition-opacity group-hover:opacity-80`} />
    <div className="relative">
      <div className={`h-9 w-9 rounded-lg bg-card border border-border/60 flex items-center justify-center ${tones[tone].split(" ").pop()} mb-4`}>
        {icon}
      </div>
      {loading ? <Skeleton className="h-9 w-16" /> : (
        <p className="font-display text-4xl text-espresso animate-scale-in">{value}</p>
      )}
      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</p>
    </div>
  </div>
);

const BookingRow = ({ booking: b, index, onView, onEdit, onConfirm, onPending, onCancel }: {
  booking: Booking; index: number;
  onView: () => void; onEdit: () => void;
  onConfirm: () => void; onPending: () => void; onCancel: () => void;
}) => (
  <article
    className="luxe-card p-5 animate-fade-up"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-5 items-start">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-luxe border border-gold/30 flex items-center justify-center font-display text-lg text-espresso shadow-soft shrink-0">
          {b.guestName.split(" ").map(s => s[0]).slice(0, 2).join("")}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-deep">{b.id}</p>
          <h3 className="font-display text-xl text-espresso leading-tight">{b.guestName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{b.email} · {b.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-l-0 lg:border-l lg:border-border/60 lg:pl-6">
        <Cell label="Room">
          <span className="text-espresso">{b.roomType}</span>
          <span className="ml-1.5 inline-flex h-5 items-center rounded bg-gold/15 px-1.5 text-[10px] font-bold text-gold-deep">{b.ratePlan}</span>
        </Cell>
        <Cell label="Stay">
          {b.checkIn} → {b.checkOut}
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">{b.nights} night{b.nights>1?"s":""}</span>
        </Cell>
        <Cell label="Guests">
          {b.adults}A · {b.children}C · {b.infants}I
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">via {b.source}</span>
        </Cell>
        <Cell label="Total">
          <span className="font-display text-lg text-espresso">{formatINR(b.totalAmount)}</span>
        </Cell>
      </div>

      <div className="flex items-center justify-between lg:justify-end gap-2 lg:flex-col lg:items-end">
        <div className="flex flex-wrap gap-1.5 lg:justify-end">
          <BookingStatusBadge status={b.status} />
          <PaymentStatusBadge status={b.paymentStatus} />
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={onView} className="text-xs">View</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Booking actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEdit}><Pencil className="h-3.5 w-3.5 mr-2" /> Edit booking</DropdownMenuItem>
              <DropdownMenuItem onClick={onConfirm}><CheckCircle2 className="h-3.5 w-3.5 mr-2" /> Confirm</DropdownMenuItem>
              <DropdownMenuItem onClick={onPending}><Clock className="h-3.5 w-3.5 mr-2" /> Mark pending</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onCancel} className="text-destructive focus:text-destructive">
                <XCircle className="h-3.5 w-3.5 mr-2" /> Cancel booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>

    {b.specialRequests && (
      <div className="mt-4 pt-4 border-t border-dashed border-border/60 flex items-start gap-2 text-xs text-muted-foreground italic">
        <Sparkles className="h-3.5 w-3.5 text-gold-deep shrink-0 mt-0.5" />
        <span>"{b.specialRequests}"</span>
      </div>
    )}
  </article>
);

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
    <div className="text-sm text-foreground">{children}</div>
  </div>
);

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="luxe-card p-16 text-center">
    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-luxe border border-gold/30 flex items-center justify-center mb-5 shadow-soft">
      <Search className="h-6 w-6 text-gold-deep" />
    </div>
    <h3 className="font-display text-2xl text-espresso">No bookings match these filters</h3>
    <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">Try adjusting your search or date range - or capture a new reservation.</p>
    <Button onClick={onCreate} className="mt-6 bg-gradient-gold text-ivory shadow-gold hover:opacity-95">
      <Plus className="h-4 w-4" /> Add Booking
    </Button>
  </div>
);

export default DashboardBookingsPage;
