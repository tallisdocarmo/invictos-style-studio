import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/roupas")({
  head: () => ({
    meta: [
      { title: "Roupas — Invictos Calçados" },
      {
        name: "description",
        content: "Vestidos, camisetas, camisas, jeans e bermudas femininas e masculinas.",
      },
      { property: "og:title", content: "Roupas — Invictos Calçados" },
      {
        property: "og:description",
        content: "Peças de base e de festa para compor o look completo.",
      },
      { property: "og:url", content: "/roupas" },
    ],
    links: [{ rel: "canonical", href: "/roupas" }],
  }),
  component: () => (
    <CatalogView
      title="Roupas"
      description="Peças de base e de festa para compor o look completo."
      lockedCategory="roupas"
    />
  ),
});
