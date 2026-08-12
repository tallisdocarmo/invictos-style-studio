import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { buttonClass, Container, Eyebrow } from "@/components/shop/ui";
import { STORE_INFO, waMessages, whatsappLink } from "@/lib/shop/whatsapp";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Invictos Calçados" },
      {
        name: "description",
        content:
          "Fale com a Invictos Calçados pelo WhatsApp, Instagram ou visite a loja em Nova Soure — BA.",
      },
      { property: "og:title", content: "Contato — Invictos Calçados" },
      { property: "og:description", content: "Atendimento rápido pelo WhatsApp da Invictos." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

const FIELD =
  "mt-2 w-full border border-border bg-card px-4 py-3 text-sm text-ink outline-none focus:border-gold";

function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Atendimento</Eyebrow>
          <h1 className="mt-5 font-display text-4xl text-ink">Fale com a Invictos</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Dúvidas sobre numeração, disponibilidade, frete ou troca? Nossa equipe
            responde rápido no WhatsApp.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={whatsappLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("gold", "w-full sm:w-auto")}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Fale com a Invictos
            </a>
            <p className="flex items-start gap-3 text-sm text-ink/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {STORE_INFO.street}, {STORE_INFO.district} — {STORE_INFO.city}/
              {STORE_INFO.state}
            </p>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-ink/80 hover:text-gold"
            >
              <Instagram className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {STORE_INFO.instagram}
            </a>
            <div className="space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
              {STORE_INFO.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Mensagem enviada", {
              description: "Retornaremos pelo canal informado.",
            });
          }}
          className="h-fit border border-border bg-card p-6 md:p-8"
        >
          <h2 className="label-sm text-ink">Envie uma mensagem</h2>
          <label className="mt-6 block">
            <span className="label-xs text-[0.6rem] text-muted-foreground">Nome</span>
            <input required className={FIELD} />
          </label>
          <label className="mt-5 block">
            <span className="label-xs text-[0.6rem] text-muted-foreground">
              E-mail ou WhatsApp
            </span>
            <input required className={FIELD} />
          </label>
          <label className="mt-5 block">
            <span className="label-xs text-[0.6rem] text-muted-foreground">Mensagem</span>
            <textarea required rows={5} className={FIELD} />
          </label>
          <button type="submit" className={buttonClass("dark", "mt-7 w-full")}>
            Enviar mensagem
          </button>
        </form>
      </div>
    </Container>
  );
}
