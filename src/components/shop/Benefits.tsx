import { MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Container, SectionHeading } from "./ui";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Compra segura",
    text: "Seus dados protegidos durante toda a compra, do carrinho ao pagamento.",
  },
  {
    icon: Truck,
    title: "Entrega para todo o Brasil",
    text: "Receba seus produtos onde estiver, com envio rastreado.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento pelo WhatsApp",
    text: "Precisa de ajuda? Nossa equipe está pronta para atender você.",
  },
];

export function Benefits() {
  return (
    <section className="border-y border-border bg-card py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Experiência Invictos" title="Compre do seu jeito" />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-4 border-t border-border pt-6">
              <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <h3 className="label-sm text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
