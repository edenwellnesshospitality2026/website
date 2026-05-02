import { cn } from "@/lib/utils";
import { DashboardLayout } from "./DashboardLayout";

export function DashboardShell({
  title,
  subtitle,
  kicker = "Dashboard",
  headerActions,
  titleClassName,
  userRoleLabel = "Content & operations",
  children,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  headerActions?: React.ReactNode;
  titleClassName?: string;
  userRoleLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout userRoleLabel={userRoleLabel}>
      <div className="animate-fade-in space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">{kicker}</p>
            <h1
              className={cn(
                "font-display text-3xl text-espresso sm:text-4xl",
                titleClassName
              )}
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {headerActions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{headerActions}</div>
          ) : null}
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
}
