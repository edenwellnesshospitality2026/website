import { cn } from "@/lib/utils";
import type { BookingStatus, PaymentStatus } from "../lib/mock-data";

const bookingStyles: Record<BookingStatus, string> = {
  new: "bg-info/10 text-info border-info/30",
  pending: "bg-warning/10 text-warning border-warning/30",
  confirmed: "bg-success/10 text-success border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  "checked-in": "bg-gold/15 text-gold-deep border-gold/40",
  "checked-out": "bg-muted text-muted-foreground border-border",
};

const bookingLabels: Record<BookingStatus, string> = {
  new: "New",
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  "checked-in": "Checked In",
  "checked-out": "Checked Out",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "bg-success/10 text-success border-success/30",
  partial: "bg-warning/10 text-warning border-warning/30",
  unpaid: "bg-destructive/10 text-destructive border-destructive/30",
  refunded: "bg-muted text-muted-foreground border-border",
};

const paymentLabels: Record<PaymentStatus, string> = {
  paid: "Paid",
  partial: "Partial",
  unpaid: "Unpaid",
  refunded: "Refunded",
};

export const BookingStatusBadge = ({ status, className }: { status: BookingStatus; className?: string }) => (
  <span className={cn(
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
    bookingStyles[status], className,
  )}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {bookingLabels[status]}
  </span>
);

export const PaymentStatusBadge = ({ status, className }: { status: PaymentStatus; className?: string }) => (
  <span className={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
    paymentStyles[status], className,
  )}>
    {paymentLabels[status]}
  </span>
);
