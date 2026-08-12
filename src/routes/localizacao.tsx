import { createFileRoute } from "@tanstack/react-router";
import { StoreLocation } from "@/components/shop/StoreLocation";
import { Container, Eyebrow } from "@/components/shop/ui";

export const Route = createFileRoute("/localizacao")({
  head: () => ({
    meta: [
      { title: "Nossa loja em Nova Soure — Invictos Calçados" },
      {
        name: "description",
        content:
          "Invictos Calçados fica na Luiz Viana Filho, 118, Centro — Nova Soure, BA. Veja horários e como chegar.",
      },
      { property: "og:title", content: "Nossa loja em Nova Soure — Invictos Calçados" },
      {
        property: "og:description",
        content: "Endereço, horários de funcionamento e rota até a loja física.",
      },
      { property: "og:url", content: "/localizacao" },
    ],
    links: [{ rel: "canonical", href: "/localizacao" }],
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <>
      <Container className="py-12 md:py-16">
        <Eyebrow>Loja física</Eyebrow>
        <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
          Estamos no centro de Nova Soure
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Prove numerações, sinta os materiais e conte com a nossa equipe para montar o
          look completo. Quem preferir comprar de casa, atendemos pelo site e pelo
          WhatsApp.
        </p>
      </Container>
      <StoreLocation />
    </>
  );
}
