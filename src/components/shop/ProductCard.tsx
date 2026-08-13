import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { discountPercent, formatPrice, installments } from "@/lib/shop/format";
import { useShop } from "@/lib/shop/store";
import type { Product } from "@/lib/shop/types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const parcel = installments(product.price);
  const cover = product.images[0];
  const favorite = isFavorite(product.slug);
  const soldOut = product.stock_status === "outofstock";

  function quickAdd() {
    if (soldOut) return;
    addToCart(product.slug, defaultSize, 1);
    toast.success("Produto adicionado", {
      description: `${product.name} — tam. ${defaultSize}`,
    });
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden bg-card">
        <Link
          to="/produto/$slug"
          params={{ slug: product.slug }}
          aria-label={product.name}
          className="block"
        >
          <img
            src={cover?.src}
            alt={cover?.alt ?? product.name}
            width={900}
            height={1100}
            loading={priority ? "eager" : "lazy"}
            className={cn(
              "aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              soldOut && "opacity-60",
            )}
          />
        </Link>

        <div className="absolute left-0 top-3 flex flex-col gap-1">
          {product.sale_price ? (
            <span className="label-xs bg-gold px-2.5 py-1 text-[0.6rem] text-ink">
              Oferta {discountPercent(product.regular_price, product.sale_price)}%
            </span>
          ) : null}
          {product.is_new && !product.sale_price ? (
            <span className="label-xs bg-ink px-2.5 py-1 text-[0.6rem] text-ink-foreground">
              Novo
            </span>
          ) : null}
          {soldOut ? (
            <span className="label-xs bg-card px-2.5 py-1 text-[0.6rem] text-muted-foreground">
              Esgotado
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.slug)}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-3 top-3 bg-card/90 p-2 text-ink transition-colors hover:text-gold"
        >
          <Heart
            className={cn("h-4 w-4", favorite && "fill-gold text-gold")}
            strokeWidth={1.5}
          />
        </button>

        <button
          type="button"
          onClick={quickAdd}
          disabled={soldOut}
          className="label-xs absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-ink/95 py-3 text-[0.6rem] text-ink-foreground transition-transform duration-300 hover:bg-ink disabled:opacity-60 md:translate-y-full md:group-hover:translate-y-0"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
          {soldOut ? "Indisponível" : "Adicionar ao carrinho"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <span className="label-xs text-[0.6rem] text-muted-foreground">
          {product.brand}
        </span>
        <h3 className="font-sans text-sm font-medium leading-snug text-ink">
          <Link to="/produto/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          {product.sale_price ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.regular_price)}
            </span>
          ) : null}
          <span className="text-base font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
        </div>
        {parcel ? (
          <span className="text-xs text-muted-foreground">
            ou {parcel.times}x de {formatPrice(parcel.value)}
          </span>
        ) : null}
      </div>
    </article>
  );
}
