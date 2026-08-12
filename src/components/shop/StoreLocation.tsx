import { Clock, MapPin, MessageCircle } from "lucide-react";
import { STORE_INFO, waMessages, whatsappLink } from "@/lib/shop/whatsapp";
import { buttonClass, Container, Eyebrow } from "./ui";

export function StoreLocation() {
  return (
    <section className="bg-ink py-16 text-ink-foreground md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Loja física</Eyebrow>
            <h2 className="mt-5 text-3xl leading-tight text-ink-foreground md:text-[2.6rem]">
              Venha conhecer a Invictos
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/65">
              Nossa loja em Nova Soure recebe você para experimentar, provar numeração e
              montar o look com a ajuda da nossa equipe.
            </p>

            <div className="mt-8 space-y-5">
              <p className="flex items-start gap-3 text-sm text-ink-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  <strong className="font-semibold">{STORE_INFO.street}</strong>
                  <br />
                  {STORE_INFO.district} — {STORE_INFO.city}, {STORE_INFO.state}
                </span>
              </p>
              <div className="flex items-start gap-3 text-sm text-ink-foreground/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <div className="space-y-1">
                  {STORE_INFO.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
              <p className="flex items-center gap-3 text-sm text-ink-foreground/80">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                Também estamos no WhatsApp.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClass("gold")}
              >
                Como chegar
              </a>
              <a
                href={whatsappLink(waMessages.location)}
                target="_blank"
                rel="noreferrer"
                className={buttonClass("outlineLight")}
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Área reservada para o mapa (Google Maps embed na versão final) */}
          <div className="relative aspect-[4/3] w-full border border-ink-foreground/15 bg-ink-soft">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <MapPin className="h-6 w-6 text-gold" strokeWidth={1.2} />
              <p className="label-xs text-[0.6rem] text-ink-foreground/60">
                Mapa da loja
              </p>
              <p className="max-w-xs px-6 text-xs leading-relaxed text-ink-foreground/45">
                {STORE_INFO.street}, {STORE_INFO.district} — {STORE_INFO.city}/
                {STORE_INFO.state}
              </p>
            </div>
            <span className="absolute inset-4 border border-ink-foreground/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
