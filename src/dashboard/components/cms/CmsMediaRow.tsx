import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn, truncateMiddle } from "@/lib/utils";

export function CmsMediaRow({
  secureUrl,
  publicId,
  alt,
  onAltChange,
  onRemove,
  className,
}: {
  secureUrl: string;
  publicId: string;
  alt: string;
  onAltChange: (value: string) => void;
  onRemove: () => void;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const displayId = truncateMiddle(publicId, 32);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(publicId);
      setCopied(true);
      toast.success("ID copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border/60 bg-card/80 p-3 shadow-sm",
        className
      )}
    >
      <img
        src={secureUrl}
        alt={alt || "Upload preview"}
        className="h-16 w-16 shrink-0 rounded-md object-cover ring-1 ring-border/40"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <Input
          placeholder="Alt text"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          className="h-9"
        />
        <div className="flex items-center gap-2">
          <code
            className="block min-w-0 flex-1 truncate rounded-md bg-muted/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            title={publicId}
          >
            {displayId}
          </code>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 shrink-0 gap-1 px-2 text-xs"
            onClick={() => void copyId()}
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label="Remove image"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
