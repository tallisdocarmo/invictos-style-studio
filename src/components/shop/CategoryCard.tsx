import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryCard({
  title,
  to,
  image,
  alt,
  large = false,
}: {
  title: string;
  to: LinkProps["to"];
  image: string;
  alt: string;
  large?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative block overflow-hidden bg-ink",
        large ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5]",
      )}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <span className="font-display text-xl text-ink-foreground md:text-2xl">
          {title}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink-foreground/40 text-ink-foreground transition-colors group-hover:border-gold group-hover:text-gold">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </span>
    </Link>
  );
}
