import { cn } from "@/lib/utils";

export function CmsPublishedBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        published ?
          "border-success/30 bg-success/10 text-success"
        : "border-border bg-muted/60 text-muted-foreground"
      )}
    >
      {published ? "Yes" : "No"}
    </span>
  );
}
