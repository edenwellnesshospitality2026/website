import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CMS_PAGE_MAX = "max-w-3xl";

export function CmsPageBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(CMS_PAGE_MAX, "mr-auto space-y-8", className)}>{children}</div>
  );
}
