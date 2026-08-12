import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow } from "@/components/shop/ui";

export const Route = createFileRoute("/trocas-e-devolucoes")({
  head: () => ({
    meta: [
      { title: "Trocas, devoluções e frete — Invictos Calçados" },
      {
        name: "description",
        content:
          "Política de trocas e devoluções da Invictos Calçados, prazos de envio e condições de frete para todo o Brasil.",
      },
      { property: "og:title", content: "Trocas, devoluções e frete — Invictos Calçados" },
      {
        property: "og:description",
        content: "Prazos, condições e passo a passo para trocar ou devolver seu produto.",
      },
      { property: "og:url", content: "/trocas-e-devolucoes" },
    ],
    links: [{ rel: "canonical", href: "/trocas-e-devolucoes" }],
  }),
  component: PolicyPage,
});

const SECTIONS = [
  {
    title: "Prazo para troca ou devolução",
    body: "Você tem até 7 dias corridos após o recebimento para desistir da compra e 30 dias para trocar por outro tamanho ou modelo, desde que o produto esteja sem uso, com etiquetas e embalagem original.",
  },
  {
    title: "Como solicitar",
    body: "Fale com a nossa equipe pelo WhatsApp informando o número do pedido e o motivo. Enviaremos as instruções de postagem ou combinaremos a troca diretamente na loja física.",
  },
  {
    title: "Produto com defeito",
    body: "Em caso de defeito de fabricação, a troca é feita sem custo de frete. Basta enviar fotos do produto pelo WhatsApp para agilizarmos a análise.",
  },
  {
    title: "Frete e prazos de entrega",
    body: "Enviamos para todo o Brasil. O prazo é calculado no checkout conforme o CEP. Compras acima de R$ 299,90 têm frete grátis. Pedidos aprovados até as 12h são despachados no mesmo dia útil.",
  },
  {
    title: "Formas de pagamento",
    body: "Aceitamos Pix, cartão de crédito em até 10x sem juros e cartão de débito. Na loja física também atendemos com pagamento presencial.",
  },
];

function PolicyPage() {
  return (
    <Container className="py-12 md:py-16">
      <Eyebrow>Ajuda</Eyebrow>
      <h1 className="mt-5 font-display text-4xl text-ink">Trocas, devoluções e frete</h1>
      <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
        {SECTIONS.map((section) => (
          <section key={section.title} className="py-7">
            <h2 className="label-sm text-ink">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
