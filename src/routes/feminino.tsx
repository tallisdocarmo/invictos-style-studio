import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/feminino")({
  head: () => ({
    meta: [
      { title: "Feminino — Invictos Calçados" },
      {
        name: "description",
        content:
          "Coleção feminina da Invictos: scarpins, sandálias, botas, bolsas, vestidos e acessórios.",
      },
      { property: "og:title", content: "Feminino — Invictos Calçados" },
      {
        property: "og:description",
        content: "Detalhes que fazem diferença: a seleção feminina da Invictos Calçados.",
      },
      { property: "og:url", content: "/feminino" },
    ],
    links: [{ rel: "canonical", href: "/feminino" }],
  }),
  component: () => (
    <CatalogView
      title="Feminino"
      description="Detalhes que fazem diferença. Calçados, bolsas, roupas e acessórios para acompanhar seu estilo."
      lockedGender="feminino"
    />
  ),
});
