import type { ReactNode } from "react";
import { CmsSectionCard } from "./CmsSectionCard";
import { cn } from "@/lib/utils";

export function CmsDataTable({
  title,
  description,
  actions,
  className,
  tableClassName,
  children,
  empty,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  tableClassName?: string;
  children: ReactNode;
  empty?: ReactNode;
}) {
  return (
    <CmsSectionCard
      className={cn("max-w-none", className)}
      title={title}
      description={description}
      actions={actions}
      contentClassName="space-y-0 px-0 pb-6 pt-0"
    >
      {empty ? (
        <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      ) : (
        <div
          className={cn(
            "overflow-x-auto rounded-xl border border-border/50 bg-card/50",
            tableClassName
          )}
        >
          {children}
        </div>
      )}
    </CmsSectionCard>
  );
}
