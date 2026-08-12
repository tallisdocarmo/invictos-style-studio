import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/masculino")({
  head: () => ({
    meta: [
      { title: "Masculino — Invictos Calçados" },
      {
        name: "description",
        content:
          "Coleção masculina da Invictos: tênis, mocassins, camisetas, camisas e acessórios.",
      },
      { property: "og:title", content: "Masculino — Invictos Calçados" },
      {
        property: "og:description",
        content: "Estilo que acompanha você: a seleção masculina da Invictos Calçados.",
      },
      { property: "og:url", content: "/masculino" },
    ],
    links: [{ rel: "canonical", href: "/masculino" }],
  }),
  component: () => (
    <CatalogView
      title="Masculino"
      description="Estilo que acompanha você. Peças sóbrias e confortáveis para o dia inteiro."
      lockedGender="masculino"
    />
  ),
});
