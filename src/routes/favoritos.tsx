import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { buttonClass, Container } from "@/components/shop/ui";
import { getProductsBySlugs } from "@/lib/shop/catalog";
import { useShop } from "@/lib/shop/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Invictos Calçados" },
      {
        name: "description",
        content: "Os produtos que você salvou para comprar depois na Invictos Calçados.",
      },
      { property: "og:title", content: "Favoritos — Invictos Calçados" },
      { property: "og:description", content: "Sua lista de desejos na Invictos." },
      { property: "og:url", content: "/favoritos" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/favoritos" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useShop();
  const products = getProductsBySlugs(favorites);

  return (
    <Container className="py-12 md:py-16">
      <h1 className="font-display text-4xl text-ink">Favoritos</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Salve os produtos que você quer comprar depois.
      </p>
      {products.length === 0 ? (
        <div className="mt-10 border border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">Nenhum favorito ainda</p>
          <Link to="/loja" className={buttonClass("dark", "mt-6")}>
            Explorar a loja
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} className="mt-10" />
      )}
    </Container>
  );
}
