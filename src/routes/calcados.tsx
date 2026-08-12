import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/calcados")({
  head: () => ({
    meta: [
      { title: "Calçados — Invictos Calçados" },
      {
        name: "description",
        content:
          "Tênis, scarpins, sandálias, botas e mocassins das melhores marcas na Invictos Calçados.",
      },
      { property: "og:title", content: "Calçados — Invictos Calçados" },
      {
        property: "og:description",
        content: "Tênis, scarpins, sandálias, botas e sapatos sociais com entrega para todo o Brasil.",
      },
      { property: "og:url", content: "/calcados" },
    ],
    links: [{ rel: "canonical", href: "/calcados" }],
  }),
  component: () => (
    <CatalogView
      title="Calçados"
      description="Do tênis do dia a dia ao scarpin de evento: numeração conferida e conforto testado na loja."
      lockedCategory="calcados"
    />
  ),
});
