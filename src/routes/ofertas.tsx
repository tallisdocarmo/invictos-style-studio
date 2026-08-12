import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas — Invictos Calçados" },
      {
        name: "description",
        content: "Produtos com preço promocional na Invictos Calçados, enquanto durarem os estoques.",
      },
      { property: "og:title", content: "Ofertas — Invictos Calçados" },
      {
        property: "og:description",
        content: "Seleção de produtos com desconto na Invictos Calçados.",
      },
      { property: "og:url", content: "/ofertas" },
    ],
    links: [{ rel: "canonical", href: "/ofertas" }],
  }),
  component: () => (
    <CatalogView
      title="Ofertas"
      description="Seleção com preço promocional, enquanto durarem os estoques."
      onlyOnSale
    />
  ),
});
