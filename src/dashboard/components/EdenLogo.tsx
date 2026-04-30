import { cn } from "@/lib/utils";

interface EdenLogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  showTagline?: boolean;
}

export const EdenLogo = ({ className, variant = "dark", showTagline = false }: EdenLogoProps) => {
  const color =
    variant === "light" ? "text-ivory" : variant === "gold" ? "text-gradient-gold" : "text-espresso";
  const sub =
    variant === "light" ? "text-ivory/60" : "text-muted-foreground";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="relative h-10 w-10 shrink-0">
        <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="eden-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(40 60% 60%)" />
              <stop offset="100%" stopColor="hsl(32 50% 38%)" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="19" fill="none" stroke="url(#eden-gold)" strokeWidth="1" />
          <path d="M5 26 Q 14 16, 20 22 T 35 24" fill="none" stroke="url(#eden-gold)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 30 Q 16 22, 22 27 T 34 28" fill="none" stroke="url(#eden-gold)" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
          <path d="M20 8 Q 23 14, 20 18 Q 17 14, 20 8 Z" fill="url(#eden-gold)" opacity="0.85" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={cn("font-display text-2xl tracking-wide", color)}>Eden</div>
        {showTagline && (
          <div className={cn("text-[10px] uppercase tracking-[0.25em]", sub)}>
            Wellness · Hospitality
          </div>
        )}
      </div>
    </div>
  );
};
