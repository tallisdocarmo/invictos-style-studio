import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/lib/shop/format";
import { useShop } from "@/lib/shop/store";
import { waMessages, whatsappLink } from "@/lib/shop/whatsapp";
import { buttonClass } from "./ui";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    items,
    subtotal,
    shipping,
    total,
    freeShippingFrom,
    updateQuantity,
    removeLine,
  } = useShop();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  const waLink = whatsappLink(
    waMessages.cart(
      items.map((i) => `• ${i.product.name} (tam. ${i.size}) x${i.quantity}`),
      formatPrice(total),
    ),
  );

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-ink/60"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-panel">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="label-sm text-ink">Sacola ({items.length})</h2>
          <button type="button" aria-label="Fechar" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5 text-ink" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="h-8 w-8 text-gold" strokeWidth={1.2} />
            <p className="font-display text-2xl text-ink">Sua sacola está vazia</p>
            <p className="text-sm text-muted-foreground">
              Explore os destaques da Invictos e encontre seu próximo look.
            </p>
            <Link
              to="/loja"
              onClick={() => setCartOpen(false)}
              className={buttonClass("dark", "mt-2")}
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {subtotal < freeShippingFrom ? (
                <p className="my-5 border border-gold/40 bg-card px-4 py-3 text-xs text-ink">
                  Faltam{" "}
                  <span className="font-semibold">
                    {formatPrice(freeShippingFrom - subtotal)}
                  </span>{" "}
                  para ganhar frete grátis.
                </p>
              ) : (
                <p className="my-5 border border-gold/40 bg-card px-4 py-3 text-xs text-ink">
                  Você garantiu <span className="font-semibold">frete grátis</span>.
                </p>
              )}

              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.slug + item.size} className="flex gap-4 py-5">
                    <Link
                      to="/produto/$slug"
                      params={{ slug: item.slug }}
                      onClick={() => setCartOpen(false)}
                      className="shrink-0"
                    >
                      <img
                        src={item.product.images[0]?.src}
                        alt={item.product.images[0]?.alt ?? item.product.name}
                        loading="lazy"
                        className="h-28 w-22 object-cover"
                        width={88}
                        height={112}
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="label-xs text-[0.6rem] text-muted-foreground">
                        {item.product.brand}
                      </span>
                      <p className="mt-1 text-sm font-medium text-ink">
                        {item.product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Tamanho {item.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            onClick={() =>
                              updateQuantity(item.slug, item.size, item.quantity - 1)
                            }
                            className="px-2.5 py-2 text-ink hover:text-gold"
                          >
                            <Minus className="h-3 w-3" strokeWidth={2} />
                          </button>
                          <span className="w-8 text-center text-xs text-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() =>
                              updateQuantity(item.slug, item.size, item.quantity + 1)
                            }
                            className="px-2.5 py-2 text-ink hover:text-gold"
                          >
                            <Plus className="h-3 w-3" strokeWidth={2} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-ink">
                            {formatPrice(item.lineTotal)}
                          </span>
                          <button
                            type="button"
                            aria-label="Remover produto"
                            onClick={() => removeLine(item.slug, item.size)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Frete</dt>
                  <dd>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-ink">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-3">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className={buttonClass("dark", "w-full")}
                >
                  Ir para checkout
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("whats", "w-full")}
                >
                  Finalizar pelo WhatsApp
                </a>
                <Link
                  to="/carrinho"
                  onClick={() => setCartOpen(false)}
                  className="label-xs block w-full py-1 text-center text-[0.6rem] text-muted-foreground hover:text-gold"
                >
                  Ver sacola completa
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
