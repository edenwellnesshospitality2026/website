import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ROOM_TYPES, RATE_PLANS, type Booking, type BookingStatus, type PaymentStatus,
  type RatePlanCode, type BookingSource, formatINR,
} from "../lib/mock-data";
import { toast } from "sonner";
import { RotateCcw, Save, X } from "lucide-react";

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking?: Booking | null;
  onSave: (b: Booking) => void;
}

const empty = (): Booking => ({
  id: `EDN-${2049 + Math.floor(Math.random() * 900)}`,
  guestName: "", email: "", phone: "",
  roomType: ROOM_TYPES[0], ratePlan: "CP",
  checkIn: new Date().toISOString().slice(0, 10),
  checkOut: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
  adults: 2, children: 0, infants: 0, nights: 1,
  pricePerNight: 12000, totalAmount: 12000,
  paymentStatus: "unpaid", status: "new", source: "Direct",
  specialRequests: "", internalNotes: "",
  createdAt: new Date().toISOString().slice(0, 10),
});

export const BookingForm = ({ open, onOpenChange, booking, onSave }: BookingFormProps) => {
  const isEdit = !!booking;
  const [form, setForm] = useState<Booking>(empty());

  useEffect(() => {
    setForm(booking ? { ...booking } : empty());
  }, [booking, open]);

  // auto compute nights & total
  useEffect(() => {
    const ci = new Date(form.checkIn).getTime();
    const co = new Date(form.checkOut).getTime();
    const nights = Math.max(1, Math.round((co - ci) / 86400000));
    const total = nights * form.pricePerNight;
    if (nights !== form.nights || total !== form.totalAmount) {
      setForm(f => ({ ...f, nights, totalAmount: total }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.checkIn, form.checkOut, form.pricePerNight]);

  const set = <K extends keyof Booking>(k: K, v: Booking[K]) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guestName || !form.email || !form.phone) {
      toast.error("Please fill guest name, email and phone.");
      return;
    }
    onSave(form);
    toast.success(isEdit ? "Booking updated" : "Booking saved", {
      description: `${form.id} · ${form.guestName}`,
    });
    onOpenChange(false);
  };

  const totalGuests = form.adults + form.children + form.infants;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto bg-card border-l border-border/60 p-0"
      >
        <form onSubmit={handleSave}>
          <SheetHeader className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border/60 px-8 py-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-deep">
              {isEdit ? "Edit Booking" : "New Booking"}
            </p>
            <SheetTitle className="font-display text-3xl text-espresso">
              {isEdit ? form.guestName : "Add a new booking"}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              {isEdit ? `Booking ${form.id}` : "Capture every detail of this guest's stay."}
            </SheetDescription>
          </SheetHeader>

          <div className="px-8 py-6 space-y-8">
            <Section title="Booking Identity">
              <Field label="Booking ID">
                <Input value={form.id} onChange={e => set("id", e.target.value)} className="font-mono" />
              </Field>
              <Field label="Booking Source">
                <Select value={form.source} onValueChange={(v: BookingSource) => set("source", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["Direct","Website","MakeMyTrip","Booking.com","Agoda","Walk-in"] as BookingSource[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </Section>

            <Section title="Guest Details">
              <Field label="Guest Full Name" full>
                <Input value={form.guestName} onChange={e => set("guestName", e.target.value)} placeholder="e.g. Aarav Kapoor" />
              </Field>
              <Field label="Email">
                <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="guest@email.com" />
              </Field>
              <Field label="Phone Number">
                <Input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 ..." />
              </Field>
            </Section>

            <Section title="Stay Details">
              <Field label="Room Type">
                <Select value={form.roomType} onValueChange={v => set("roomType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROOM_TYPES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Rate Plan">
                <Select value={form.ratePlan} onValueChange={(v: RatePlanCode) => set("ratePlan", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RATE_PLANS.map(r => <SelectItem key={r.code} value={r.code}>{r.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Check-in Date">
                <Input type="date" value={form.checkIn} onChange={e => set("checkIn", e.target.value)} />
              </Field>
              <Field label="Check-out Date">
                <Input type="date" value={form.checkOut} onChange={e => set("checkOut", e.target.value)} />
              </Field>
            </Section>

            <Section title="Guests">
              <Field label="Adults">
                <Input type="number" min={1} value={form.adults} onChange={e => set("adults", +e.target.value)} />
              </Field>
              <Field label="Children">
                <Input type="number" min={0} value={form.children} onChange={e => set("children", +e.target.value)} />
              </Field>
              <Field label="Infants">
                <Input type="number" min={0} value={form.infants} onChange={e => set("infants", +e.target.value)} />
              </Field>
              <Field label="Total Guests">
                <Input value={totalGuests} readOnly className="bg-muted/60" />
              </Field>
            </Section>

            <Section title="Pricing">
              <Field label="Price per Night (₹)">
                <Input type="number" value={form.pricePerNight} onChange={e => set("pricePerNight", +e.target.value)} />
              </Field>
              <Field label="Nights">
                <Input value={form.nights} readOnly className="bg-muted/60" />
              </Field>
              <Field label="Total Amount" full>
                <div className="flex items-center justify-between rounded-lg border border-gold/40 bg-gradient-luxe px-4 py-3">
                  <span className="text-xs uppercase tracking-wider text-cocoa">Grand Total</span>
                  <span className="font-display text-2xl text-espresso">{formatINR(form.totalAmount)}</span>
                </div>
              </Field>
            </Section>

            <Section title="Status">
              <Field label="Booking Status">
                <Select value={form.status} onValueChange={(v: BookingStatus) => set("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["new","pending","confirmed","checked-in","checked-out","cancelled"] as BookingStatus[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Payment Status">
                <Select value={form.paymentStatus} onValueChange={(v: PaymentStatus) => set("paymentStatus", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["paid","partial","unpaid","refunded"] as PaymentStatus[]).map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </Section>

            <Section title="Notes">
              <Field label="Special Requests" full>
                <Textarea rows={3} value={form.specialRequests || ""} onChange={e => set("specialRequests", e.target.value)} placeholder="Late check-in, dietary preference, celebration set-up..." />
              </Field>
              <Field label="Internal Notes" full>
                <Textarea rows={3} value={form.internalNotes || ""} onChange={e => set("internalNotes", e.target.value)} placeholder="Visible to staff only" />
              </Field>
            </Section>
          </div>

          <Separator />
          <div className="sticky bottom-0 bg-card/95 backdrop-blur-md border-t border-border/60 px-8 py-4 flex flex-wrap gap-3 justify-end">
            <Button type="button" variant="ghost" onClick={() => setForm(booking ? { ...booking } : empty())}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" className="bg-gradient-gold text-ivory shadow-gold hover:opacity-95">
              <Save className="h-4 w-4" /> {isEdit ? "Update Booking" : "Save Booking"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <h3 className="font-display text-lg text-espresso">{title}</h3>
      <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
    {children}
  </div>
);
