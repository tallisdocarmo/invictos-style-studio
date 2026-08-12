import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      to="/"
      aria-label="Invictos Calçados — página inicial"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-display uppercase tracking-[0.22em]",
          size === "sm" && "text-base",
          size === "md" && "text-xl md:text-2xl",
          size === "lg" && "text-3xl",
          tone === "light" ? "text-ink-foreground" : "text-ink",
        )}
      >
        Invictos
      </span>
      <span className="label-xs mt-1 text-[0.55rem] tracking-[0.42em] text-gold">
        Calçados
      </span>
    </Link>
  );
}
