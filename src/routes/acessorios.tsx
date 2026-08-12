import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/acessorios")({
  head: () => ({
    meta: [
      { title: "Acessórios — Invictos Calçados" },
      {
        name: "description",
        content: "Relógios, óculos de sol, cintos e carteiras para finalizar o look.",
      },
      { property: "og:title", content: "Acessórios — Invictos Calçados" },
      {
        property: "og:description",
        content: "Relógios, óculos, cintos e carteiras selecionados pela Invictos.",
      },
      { property: "og:url", content: "/acessorios" },
    ],
    links: [{ rel: "canonical", href: "/acessorios" }],
  }),
  component: () => (
    <CatalogView
      title="Acessórios"
      description="O detalhe que fecha o look: relógios, óculos, cintos e carteiras."
      lockedCategory="acessorios"
    />
  ),
});
