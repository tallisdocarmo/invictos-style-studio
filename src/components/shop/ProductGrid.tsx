import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shop/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  columns = 4,
  className,
}: {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="border border-border bg-card px-6 py-16 text-center">
        <p className="font-display text-xl text-ink">Nenhum produto encontrado</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Ajuste os filtros ou fale com a nossa equipe pelo WhatsApp para consultar
          disponibilidade.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6",
        columns === 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.slug} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
