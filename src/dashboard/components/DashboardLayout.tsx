import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthContext";
import { EdenLogo } from "./EdenLogo";
import { DashboardNavLinks } from "./DashboardNavLinks";

export function DashboardLayout({
  children,
  userRoleLabel = "Operations",
}: {
  children: React.ReactNode;
  userRoleLabel?: string;
}) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const profileName = user?.email || "Eden";
  const profileInitials = (user?.email?.slice(0, 2) || "ED").toUpperCase();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const signOutAndRedirect = () => {
    signOut();
    toast.success("Signed out");
    navigate("/admin");
  };

  const SidebarFooter = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/90 px-3 py-2.5 shadow-soft">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-xs font-semibold text-ivory shadow-gold">
          {profileInitials}
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-medium text-espresso">{profileName}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{userRoleLabel}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full justify-center gap-2 border-border/70 text-espresso"
        onClick={signOutAndRedirect}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );

  return (
    <div className="dashboard-theme flex min-h-screen w-full bg-background contour-bg">
      <aside className="dashboard-sidebar hidden w-[260px] shrink-0 flex-col border-r border-border/60 bg-[hsla(40,35%,98%,0.92)] backdrop-blur-xl lg:flex">
        <div className="border-b border-border/50 p-5">
          <Link
            to="/dashboard/bookings"
            className="block rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-gold/40"
          >
            <EdenLogo showTagline className="origin-left scale-[0.97]" />
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="px-3 pt-5">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <DashboardNavLinks variant="vertical" />
          </nav>
        </div>
        <div className="border-t border-border/50 p-4">
          <SidebarFooter />
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border/60 bg-background/92 px-4 backdrop-blur-xl lg:hidden">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 border-border/60"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[min(100vw-2rem,280px)] flex-col gap-0 border-border/60 p-0">
              <div className="border-b border-border/50 p-5">
                <Link
                  to="/dashboard/bookings"
                  onClick={() => setMobileNavOpen(false)}
                  className="block outline-none"
                >
                  <EdenLogo showTagline />
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto p-3 pt-4">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Navigate
                </p>
                <DashboardNavLinks
                  variant="vertical"
                  onNavigate={() => setMobileNavOpen(false)}
                />
              </div>
              <div className="border-t border-border/50 p-4">
                <SidebarFooter />
              </div>
            </SheetContent>
          </Sheet>
          <Link
            to="/dashboard/bookings"
            className="min-w-0 flex-1 flex justify-center"
          >
            <EdenLogo showTagline={false} className="scale-90" />
          </Link>
          <div className="w-10 shrink-0" aria-hidden />
        </header>

        <main className="flex-1">
          <div className="container py-8 sm:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
