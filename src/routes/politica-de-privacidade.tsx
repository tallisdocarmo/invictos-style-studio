import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow } from "@/components/shop/ui";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Invictos Calçados" },
      {
        name: "description",
        content:
          "Como a Invictos Calçados coleta, usa e protege os dados pessoais dos clientes, conforme a LGPD.",
      },
      { property: "og:title", content: "Política de privacidade — Invictos Calçados" },
      {
        property: "og:description",
        content: "Transparência no uso e na proteção dos seus dados pessoais.",
      },
      { property: "og:url", content: "/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "Dados que coletamos",
    body: "Coletamos apenas o necessário para concluir sua compra e prestar atendimento: nome, CPF, e-mail, telefone e endereço de entrega, além de dados de navegação anônimos.",
  },
  {
    title: "Como usamos seus dados",
    body: "Utilizamos suas informações para processar pedidos, emitir nota fiscal, calcular frete, prestar suporte e, com sua autorização, enviar novidades e ofertas.",
  },
  {
    title: "Compartilhamento",
    body: "Compartilhamos dados apenas com parceiros essenciais à operação, como transportadoras e meios de pagamento. Não vendemos suas informações a terceiros.",
  },
  {
    title: "Segurança",
    body: "As informações trafegam em conexão criptografada e os dados de pagamento são processados pelas operadoras, sem armazenamento em nossos servidores.",
  },
  {
    title: "Seus direitos",
    body: "Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo nosso WhatsApp, conforme previsto na Lei Geral de Proteção de Dados.",
  },
];

function PrivacyPage() {
  return (
    <Container className="py-12 md:py-16">
      <Eyebrow>Transparência</Eyebrow>
      <h1 className="mt-5 font-display text-4xl text-ink">Política de privacidade</h1>
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
