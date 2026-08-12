import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { buttonClass, Container } from "@/components/shop/ui";
import { formatPrice } from "@/lib/shop/format";
import { useShop } from "@/lib/shop/store";
import { waMessages, whatsappLink } from "@/lib/shop/whatsapp";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Sacola — Invictos Calçados" },
      {
        name: "description",
        content: "Revise os itens da sua sacola e finalize a compra no site ou pelo WhatsApp.",
      },
      { property: "og:title", content: "Sacola — Invictos Calçados" },
      { property: "og:description", content: "Revise seus produtos e finalize a compra." },
      { property: "og:url", content: "/carrinho" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/carrinho" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeLine } = useShop();

  const waLink = whatsappLink(
    waMessages.cart(
      items.map((i) => `• ${i.product.name} (tam. ${i.size}) x${i.quantity}`),
      formatPrice(total),
    ),
  );

  return (
    <Container className="py-12 md:py-16">
      <h1 className="font-display text-4xl text-ink">Sua sacola</h1>

      {items.length === 0 ? (
        <div className="mt-10 border border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">Sua sacola está vazia</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Escolha seus produtos e volte aqui para finalizar.
          </p>
          <Link to="/loja" className={buttonClass("dark", "mt-6")}>
            Ir para a loja
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.slug + item.size} className="flex gap-5 py-6">
                <Link to="/produto/$slug" params={{ slug: item.slug }}>
                  <img
                    src={item.product.images[0]?.src}
                    alt={item.product.images[0]?.alt ?? item.product.name}
                    loading="lazy"
                    className="w-24 object-cover md:w-32"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <span className="label-xs text-[0.6rem] text-muted-foreground">
                    {item.product.brand}
                  </span>
                  <Link
                    to="/produto/$slug"
                    params={{ slug: item.slug }}
                    className="mt-1 text-sm font-medium text-ink hover:text-gold"
                  >
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tamanho {item.size} · {formatPrice(item.product.price)}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        className="px-3 py-2 text-ink hover:text-gold"
                      >
                        <Minus className="h-3 w-3" strokeWidth={2} />
                      </button>
                      <span className="w-9 text-center text-xs text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                        className="px-3 py-2 text-ink hover:text-gold"
                      >
                        <Plus className="h-3 w-3" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-ink">
                        {formatPrice(item.lineTotal)}
                      </span>
                      <button
                        type="button"
                        aria-label="Remover"
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

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="label-sm text-ink">Resumo do pedido</h2>
            <dl className="mt-5 space-y-3 text-sm">
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
            <Link to="/checkout" className={buttonClass("dark", "mt-6 w-full")}>
              Ir para checkout
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("whats", "mt-3 w-full")}
            >
              Finalizar pelo WhatsApp
            </a>
          </aside>
        </div>
      )}
    </Container>
  );
}
