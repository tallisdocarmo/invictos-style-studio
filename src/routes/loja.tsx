import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/loja")({
  validateSearch: (search: Record<string, unknown>): { q?: string | undefined } => {
    const raw = search["q"];
    return typeof raw === "string" && raw ? { q: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "Loja — Invictos Calçados" },
      {
        name: "description",
        content:
          "Catálogo completo da Invictos Calçados: calçados, bolsas, roupas e acessórios com filtros por marca, tamanho, cor e preço.",
      },
      { property: "og:title", content: "Loja — Invictos Calçados" },
      {
        property: "og:description",
        content:
          "Todo o catálogo da Invictos em um só lugar, com entrega para todo o Brasil.",
      },
      { property: "og:url", content: "/loja" },
    ],
    links: [{ rel: "canonical", href: "/loja" }],
  }),
  component: LojaPage,
});

function LojaPage() {
  const { q } = Route.useSearch();
  return (
    <CatalogView
      title="Loja"
      description="Todo o catálogo da Invictos: calçados, bolsas, roupas e acessórios."
      initialSearch={q}
    />
  );
}
