import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/infantil")({
  head: () => ({
    meta: [
      { title: "Infantil — Invictos Calçados" },
      {
        name: "description",
        content:
          "Coleção infantil da Invictos: conforto e estilo para os pequenos.",
      },
      { property: "og:title", content: "Infantil — Invictos Calçados" },
      {
        property: "og:description",
        content: "Conforto em cada passo: a seleção infantil da Invictos Calçados.",
      },
      { property: "og:url", content: "/infantil" },
    ],
    links: [{ rel: "canonical", href: "/infantil" }],
  }),
  component: () => (
    <CatalogView
      title="Infantil"
      description="Conforto e estilo para os primeiros passos."
      lockedCategory="infantil"
    />
  ),
});