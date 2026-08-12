import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Variantes de botão do design system Invictos. */
export const btn = {
  base: "inline-flex items-center justify-center gap-2 label-sm px-6 py-3.5 transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none",
  dark: "bg-ink text-ink-foreground hover:bg-ink-soft",
  gold: "bg-gold text-ink hover:bg-gold-light",
  outline: "border border-ink text-ink hover:bg-ink hover:text-ink-foreground",
  outlineLight:
    "border border-ink-foreground/35 text-ink-foreground hover:border-gold hover:text-gold",
  whats:
    "border border-gold/60 text-ink hover:bg-gold hover:text-ink data-[on-dark=true]:text-gold",
  ghost: "text-ink hover:text-gold",
} as const;

export function buttonClass(
  variant: keyof Omit<typeof btn, "base"> = "dark",
  className?: string,
) {
  return cn(btn.base, btn[variant], className);
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("label-xs flex items-center gap-3 text-gold", className)}>
      <i className="h-px w-6 bg-gold" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  onDark,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("space-y-3", align === "center" && "md:text-center")}>
        {eyebrow ? (
          <Eyebrow className={cn(align === "center" && "md:justify-center")}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          className={cn(
            "text-3xl leading-tight md:text-[2.6rem]",
            onDark ? "text-ink-foreground" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "max-w-xl text-sm leading-relaxed",
              onDark ? "text-ink-foreground/65" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "ink" | "muted";
}) {
  return (
    <span
      className={cn(
        "label-xs px-2.5 py-1",
        tone === "gold" && "bg-gold text-ink",
        tone === "ink" && "bg-ink text-ink-foreground",
        tone === "muted" && "bg-background text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
