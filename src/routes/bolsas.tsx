import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/shop/CatalogView";

export const Route = createFileRoute("/bolsas")({
  head: () => ({
    meta: [
      { title: "Bolsas — Invictos Calçados" },
      {
        name: "description",
        content: "Bolsas estruturadas, shoppers, crossbody e mochilas na Invictos Calçados.",
      },
      { property: "og:title", content: "Bolsas — Invictos Calçados" },
      {
        property: "og:description",
        content: "Bolsas e mochilas para trabalho, viagem e dia a dia.",
      },
      { property: "og:url", content: "/bolsas" },
    ],
    links: [{ rel: "canonical", href: "/bolsas" }],
  }),
  component: () => (
    <CatalogView
      title="Bolsas"
      description="Estruturadas, shoppers, transversais e mochilas para todos os dias."
      lockedCategory="bolsas"
    />
  ),
});
