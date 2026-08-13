import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/masculino")({
  head: () => ({
    meta: [
      { title: "Masculino — Invictos Calçados" },
      {
        name: "description",
        content:
          "Coleção masculina da Invictos: tênis, mocassins e sapatos casuais.",
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
      description="Estilo que acompanha você. Sapatos e sandálias prontos para o dia inteiro."
      lockedGender="masculino"
    />
  ),
});
