import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Calendar,
  CreditCard,
  Home,
  Image,
  LayoutGrid,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS: readonly {
  to: string;
  label: string;
  end: boolean;
  icon: LucideIcon;
}[] = [
  { to: "/dashboard/account", label: "Account", end: true, icon: UserCircle },
  { to: "/dashboard/bookings", label: "Bookings", end: true, icon: Calendar },
  { to: "/dashboard/cms/presidential-suite", label: "Presidential", end: false, icon: Building2 },
  { to: "/dashboard/cms/room-cards", label: "Room cards", end: false, icon: LayoutGrid },
  { to: "/dashboard/cms/gallery", label: "Gallery", end: false, icon: Image },
  { to: "/dashboard/cms/membership", label: "Membership", end: false, icon: CreditCard },
  { to: "/dashboard/cms/stories", label: "Stories", end: false, icon: BookOpen },
  { to: "/dashboard/cms/site", label: "Homepage copy", end: false, icon: Home },
] as const;

export function DashboardNavLinks({
  className,
  variant = "horizontal",
  onNavigate,
}: {
  className?: string;
  variant?: "horizontal" | "vertical";
  /** Close mobile sheet after navigation */
  onNavigate?: () => void;
}) {
  const baseInactive = "text-muted-foreground hover:bg-muted/70 hover:text-espresso";
  const baseActive = "bg-espresso/12 text-espresso shadow-inner";

  if (variant === "vertical") {
    return (
      <nav className={cn("flex flex-col gap-0.5", className)}>
        {LINKS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => onNavigate?.()}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? baseActive : baseInactive
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav className={cn("flex flex-wrap items-center gap-1", className)}>
      {LINKS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive ? "bg-espresso/10 text-espresso" : baseInactive
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
