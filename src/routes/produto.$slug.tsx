import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Heart,
  MessageCircle,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { buttonClass, Container, SectionHeading } from "@/components/shop/ui";
import { cn } from "@/lib/utils";
import {
  getProductBySlug,
  getOnSale,
  getRelated,
  productJsonLd,
} from "@/lib/shop/catalog";
import { discountPercent, formatPrice, installments } from "@/lib/shop/format";
import { useShop } from "@/lib/shop/store";
import { waMessages, whatsappLink } from "@/lib/shop/whatsapp";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto indisponível — Invictos Calçados" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Invictos Calçados`;
    return {
      meta: [
        { title },
        { name: "description", content: product.short_description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.short_description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produto/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produto/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(productJsonLd(product)),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleFavorite, isFavorite, setCartOpen } = useShop();
  const [size, setSize] = useState<string>(product.sizes[0] ?? "Único");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const parcel = installments(product.price);
  const soldOut = product.stock_status === "outofstock";
  const gallery = product.images.length > 1 ? product.images : [product.images[0]!, product.images[0]!];
  const cover = product.images[activeImage] ?? product.images[0]!;
  const related = getRelated(product);

  function add(open = true) {
    if (soldOut) return;
    addToCart(product.slug, size, quantity);
    if (!open) setCartOpen(false);
    toast.success("Produto adicionado", {
      description: `${product.name} — tam. ${size}`,
    });
  }

  return (
    <>
      <Container className="py-6">
        <nav className="label-xs flex flex-wrap items-center gap-2 text-[0.6rem] text-muted-foreground">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span>/</span>
          <Link to="/loja" className="hover:text-gold">
            Loja
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        {/* GALERIA */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {gallery.map((image, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(Math.min(i, product.images.length - 1))}
                className={cn(
                  "w-20 border transition-colors",
                  activeImage === i ? "border-gold" : "border-border hover:border-ink",
                )}
              >
                <img
                  src={image?.src}
                  alt={image?.alt ?? product.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-card">
            <img
              src={cover.src}
              alt={cover.alt}
              width={900}
              height={1100}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div>
          <span className="label-xs text-[0.6rem] text-muted-foreground">
            {product.brand}
          </span>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink md:text-[2.4rem]">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    "h-3.5 w-3.5",
                    n <= Math.round(product.rating)
                      ? "fill-gold text-gold"
                      : "text-border",
                  )}
                  strokeWidth={1.5}
                />
              ))}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.rating.toFixed(1)} · {product.rating_count} avaliações
            </span>
          </div>

          <div className="mt-6 border-y border-border py-6">
            <div className="flex flex-wrap items-baseline gap-3">
              {product.sale_price ? (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.regular_price)}
                  </span>
                  <span className="label-xs bg-gold px-2 py-1 text-[0.6rem] text-ink">
                    -{discountPercent(product.regular_price, product.sale_price)}%
                  </span>
                </>
              ) : null}
              <span className="text-3xl font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
            </div>
            {parcel ? (
              <p className="mt-2 text-sm text-muted-foreground">
                ou {parcel.times}x de {formatPrice(parcel.value)} sem juros
              </p>
            ) : null}
            <p className="mt-1 text-xs text-muted-foreground">
              À vista no Pix com aprovação imediata.
            </p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink/80">
            {product.short_description}
          </p>

          <p className="mt-6 label-xs text-[0.6rem] text-muted-foreground">
            {soldOut ? (
              <span className="text-destructive">Produto esgotado</span>
            ) : (
              <>Disponível — {product.stock_quantity} unidades em estoque</>
            )}
          </p>

          {/* TAMANHO */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="label-sm text-ink">Tamanho</span>
              {product.size_chart ? (
                <span className="text-xs text-muted-foreground">
                  Tabela de medidas abaixo
                </span>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 border px-3 py-3 text-sm transition-colors",
                    size === s
                      ? "border-ink bg-ink text-ink-foreground"
                      : "border-border bg-card text-ink hover:border-ink",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTIDADE + AÇÕES */}
          <div className="mt-6 flex items-center gap-4">
            <span className="label-sm text-ink">Quantidade</span>
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Diminuir"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-3 text-ink hover:text-gold"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <span className="w-10 text-center text-sm text-ink">{quantity}</span>
              <button
                type="button"
                aria-label="Aumentar"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-3 text-ink hover:text-gold"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <button
              type="button"
              disabled={soldOut}
              onClick={() => add()}
              className={buttonClass("dark", "w-full")}
            >
              Adicionar ao carrinho
            </button>
            <Link
              to="/checkout"
              onClick={() => add(false)}
              className={buttonClass("gold", "w-full")}
            >
              Comprar agora
            </Link>
            <a
              href={whatsappLink(waMessages.product(product.name))}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("whats", "w-full")}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Comprar pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              className="label-xs flex w-full items-center justify-center gap-2 py-2 text-[0.6rem] text-muted-foreground hover:text-gold"
            >
              <Heart
                className={cn(
                  "h-3.5 w-3.5",
                  isFavorite(product.slug) && "fill-gold text-gold",
                )}
                strokeWidth={1.5}
              />
              {isFavorite(product.slug) ? "Nos favoritos" : "Tenho interesse — salvar"}
            </button>
          </div>

          <ul className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Envio para todo o Brasil" },
              { icon: ShieldCheck, label: "Compra segura" },
              { icon: RefreshCw, label: "Troca facilitada" },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-2 text-xs text-ink/75">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* DESCRIÇÃO E CARACTERÍSTICAS */}
      <section className="border-t border-border bg-card py-14">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink">Descrição</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              {product.description}
            </p>

            <h3 className="label-sm mt-10 text-ink">Características</h3>
            <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Marca</dt>
                <dd className="text-ink">{product.brand}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="text-ink">{product.sku}</dd>
              </div>
              {product.attributes.map((attr) => (
                <div key={attr.label} className="flex justify-between py-3">
                  <dt className="text-muted-foreground">{attr.label}</dt>
                  <dd className="text-ink">{attr.value}</dd>
                </div>
              ))}
            </dl>

            {product.size_chart ? (
              <>
                <h3 className="label-sm mt-10 text-ink">Tabela de tamanhos</h3>
                <table className="mt-4 w-full border border-border text-sm">
                  <thead>
                    <tr className="bg-background text-left">
                      <th className="label-xs px-4 py-3 text-[0.6rem] text-muted-foreground">
                        Numeração
                      </th>
                      <th className="label-xs px-4 py-3 text-[0.6rem] text-muted-foreground">
                        Comprimento do pé
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.size_chart.map((row) => (
                      <tr key={row.size} className="border-t border-border">
                        <td className="px-4 py-2.5 text-ink">{row.size}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {row.equivalence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">Avaliações</h2>
            {product.reviews.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Este produto ainda não recebeu avaliações. Compre e conte para nós o que
                achou.
              </p>
            ) : (
              <ul className="mt-6 space-y-6">
                {product.reviews.map((review) => (
                  <li key={review.author} className="border-b border-border pb-6">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={cn(
                              "h-3 w-3",
                              n <= review.rating ? "fill-gold text-gold" : "text-border",
                            )}
                            strokeWidth={1.5}
                          />
                        ))}
                      </span>
                      <span className="label-xs text-[0.6rem] text-ink">
                        {review.author}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/80">
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container>
          <SectionHeading eyebrow="Veja também" title="Ofertas que você pode gostar" />
          <ProductGrid products={getOnSale(4)} className="mt-10" />
          <div className="mt-10 flex justify-center">
            <Link
              to="/loja"
              search={{ onlyOnSale: true }}
              className="label-xs border-b border-gold pb-1 text-[0.6rem] text-gold transition-colors hover:text-ink hover:border-ink"
            >
              Ver todas as ofertas
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Combina com" title="Produtos relacionados" />
          <ProductGrid products={related} className="mt-10" />
          <div className="mt-10 flex justify-center">
            <Link
              to="/loja"
              search={{ categories: product.categories }}
              className="label-xs border-b border-gold pb-1 text-[0.6rem] text-gold transition-colors hover:text-ink hover:border-ink"
            >
              Ver mais do mesmo estilo
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
