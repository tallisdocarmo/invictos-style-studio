import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CatalogView } from "@/components/shop/CatalogView";

const lojaSearchSchema = z.object({
  q: z.string().optional(),
  categories: z.array(z.string()).optional(),
  onlyOnSale: z.boolean().optional(),
});

export const Route = createFileRoute("/loja")({
  validateSearch: (search) => lojaSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Loja — Invictos Calçados" },
      {
        name: "description",
        content:
          "Catálogo completo da Invictos Calçados: sapatos e sandálias com filtros por marca, tamanho, cor e preço.",
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
      description="Todo o catálogo da Invictos: sapatos e sandálias."
      initialSearch={q}
    />
  );
}
