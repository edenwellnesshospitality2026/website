import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatINR, type Booking } from "../lib/mock-data";
import { BookingStatusBadge, PaymentStatusBadge } from "./StatusBadge";
import { CalendarDays, Mail, MapPin, Phone, Sparkles, Users } from "lucide-react";

interface Props {
  booking: Booking | null;
  onClose: () => void;
  onEdit: (booking: Booking) => void;
}

export const BookingDetails = ({ booking, onClose, onEdit }: Props) => {
  if (!booking) return null;

  return (
    <Dialog open={!!booking} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border/60 p-0 overflow-hidden">
        <div className="bg-gradient-luxe px-8 pt-8 pb-6 border-b border-border/60">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-deep font-mono">{booking.id}</p>
              <BookingStatusBadge status={booking.status} />
            </div>
            <DialogTitle className="font-display text-3xl text-espresso">{booking.guestName}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-cocoa/80">
              <MapPin className="h-3.5 w-3.5" /> {booking.roomType} · Rate Plan {booking.ratePlan}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <Row icon={<Mail className="h-4 w-4" />} label="Email">{booking.email}</Row>
          <Row icon={<Phone className="h-4 w-4" />} label="Phone">{booking.phone}</Row>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <Stat icon={<CalendarDays className="h-4 w-4" />} label="Check-in" value={booking.checkIn} />
            <Stat icon={<CalendarDays className="h-4 w-4" />} label="Check-out" value={booking.checkOut} />
            <Stat icon={<Users className="h-4 w-4" />} label="Guests" value={`${booking.adults} adult${booking.adults>1?"s":""}, ${booking.children} child, ${booking.infants} infant`} />
            <Stat icon={<Sparkles className="h-4 w-4" />} label="Source" value={booking.source} />
          </div>

          <Separator />

          <div className="rounded-xl border border-gold/30 bg-gradient-luxe p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-cocoa">{booking.nights} night{booking.nights>1?"s":""} · {formatINR(booking.pricePerNight)}/night</p>
                <p className="font-display text-3xl text-espresso mt-1">{formatINR(booking.totalAmount)}</p>
              </div>
              <PaymentStatusBadge status={booking.paymentStatus} />
            </div>
          </div>

          {booking.specialRequests && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Special Requests</p>
              <p className="text-sm text-foreground/90 leading-relaxed italic">"{booking.specialRequests}"</p>
            </div>
          )}
          {booking.internalNotes && (
            <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-deep mb-1">Internal Note</p>
              <p className="text-sm text-foreground/80">{booking.internalNotes}</p>
            </div>
          )}
        </div>

        <div className="border-t border-border/60 bg-muted/30 px-8 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => { onEdit(booking); onClose(); }} className="bg-gradient-gold text-ivory shadow-gold hover:opacity-95">
            Edit Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">{icon}{label}</span>
    <span className="text-sm font-medium text-foreground">{children}</span>
  </div>
);

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div>
    <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1">{icon}{label}</p>
    <p className="font-display text-lg text-espresso">{value}</p>
  </div>
);
