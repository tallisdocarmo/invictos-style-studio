import { Link, type LinkProps } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { STORE_INFO, waMessages, whatsappLink } from "@/lib/shop/whatsapp";
import { Logo } from "./Logo";
import { Container } from "./ui";

const COLUMNS: { title: string; links: { label: string; to: NonNullable<LinkProps["to"]> }[] }[] = [
  {
    title: "Invictos",
    links: [
      { label: "Sobre nós", to: "/sobre" },
      { label: "Nossa loja", to: "/localizacao" },
      { label: "Contato", to: "/contato" },
    ],
  },
  {
    title: "Compre",
    links: [
      { label: "Feminino", to: "/feminino" },
      { label: "Masculino", to: "/masculino" },
      { label: "Infantil", to: "/infantil" },
      { label: "Lançamentos", to: "/loja" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Trocas e devoluções", to: "/trocas-e-devolucoes" },
      { label: "Formas de pagamento", to: "/checkout" },
      { label: "Frete e entrega", to: "/trocas-e-devolucoes" },
      { label: "Privacidade", to: "/politica-de-privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
              Moda que combina com você. Sapatos e sandálias em Nova
              Soure — Bahia, e entrega para todo o Brasil.
            </p>
            <p className="mt-6 text-sm text-ink-foreground/60">
              {STORE_INFO.street}
              <br />
              {STORE_INFO.district} — {STORE_INFO.city}, {STORE_INFO.state}
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title}>
              <h3 className="label-sm text-gold">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label + link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-foreground/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="label-sm text-gold">Atendimento</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
              <li>
                <a
                  href={whatsappLink(waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} /> {STORE_INFO.instagram}
                </a>
              </li>
              <li>
                <Link
                  to="/localizacao"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.5} /> Localização
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-1 text-xs text-ink-foreground/50">
              {STORE_INFO.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-foreground/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ink-foreground/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Invictos Calçados. Todos os direitos reservados.</p>
          <p className="label-xs text-[0.6rem] text-ink-foreground/40">
            Pix · Cartão de crédito · Cartão de débito
          </p>
        </Container>
      </div>
    </footer>
  );
}
