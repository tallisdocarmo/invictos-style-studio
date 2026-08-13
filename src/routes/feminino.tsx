import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/feminino")({
  head: () => ({
    meta: [
      { title: "Feminino — Invictos Calçados" },
      {
        name: "description",
        content:
          "Coleção feminina da Invictos: scarpins, sandálias, botas e muito mais.",
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
      description="Detalhes que fazem diferença. Sapados e sandálias para acompanhar seu estilo."
      lockedGender="feminino"
    />
  ),
});
