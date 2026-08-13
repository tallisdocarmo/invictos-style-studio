import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { buttonClass, Container, Eyebrow } from "@/components/shop/ui";
import { cn } from "@/lib/utils";

type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  highlight?: string;
  highlightLabel?: string;
  cta: string;
  to: NonNullable<LinkProps["to"]>;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Coleção 2026",
    title: "Seu estilo.\nSua marca.",
    subtitle: "Sapatos e sandálias para transformar cada detalhe do seu look.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    alt: "Modelos vestindo peças da coleção Invictos Calçados",
    cta: "Comprar agora",
    to: "/loja",
  },
  {
    eyebrow: "Lançamentos",
    title: "Top marcas\nchegando.",
    subtitle: "Adidas, Nike, Vizzano e mais — numeração completa em estoque.",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    alt: "Lançamentos de calçados das principais marcas",
    highlightLabel: "novidades toda",
    highlight: "semana",
    cta: "Aproveite",
    to: "/loja",
  },
  {
    eyebrow: "Ofertas",
    title: "Bota fora\nde inverno.",
    subtitle: "Botas, mocassins e scarpins selecionados com preços especiais.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    alt: "Botas e calçados em promoção",
    highlightLabel: "com até",
    highlight: "50% off",
    cta: "Ver ofertas",
    to: "/ofertas",
  },
];

const INTERVAL = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <section className="relative bg-ink" aria-roledescription="carrossel" aria-label="Banners">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          className={cn(
            "transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-[70vh] min-h-[460px] w-full object-cover object-right md:h-[82vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          <Container className="absolute inset-0 flex items-center">
            <div className="max-w-lg">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              {i === 0 ? (
                <h1 className="mt-6 whitespace-pre-line font-display text-[2.75rem] leading-[1.05] text-ink-foreground md:text-[4.25rem]">
                  {slide.title}
                </h1>
              ) : (
                <p className="mt-6 whitespace-pre-line font-display text-[2.75rem] leading-[1.05] text-ink-foreground md:text-[4.25rem]">
                  {slide.title}
                </p>
              )}
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/70 md:text-base">
                {slide.subtitle}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to={slide.to} className={buttonClass("gold")}>
                  {slide.cta}
                </Link>
                <Link to="/localizacao" className={buttonClass("outlineLight")}>
                  Conheça a loja
                </Link>
              </div>
            </div>
          </Container>

          {slide.highlight ? (
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-right lg:block xl:right-16">
              <p className="label-xs text-ink-foreground/70">{slide.highlightLabel}</p>
              <p className="font-display text-5xl leading-none text-gold xl:text-6xl">
                {slide.highlight}
              </p>
              <p className="label-xs mt-3 text-ink-foreground/45">Imagem ilustrativa</p>
            </div>
          ) : null}
        </div>
      ))}

      {/* Setas */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Banner anterior"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ink-foreground/25 bg-ink/40 p-2.5 text-ink-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold md:left-5"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Próximo banner"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ink-foreground/25 bg-ink/40 p-2.5 text-ink-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold md:right-5"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* Dots + play/pause */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir para o banner ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              i === index ? "w-6 bg-gold" : "bg-ink-foreground/40 hover:bg-ink-foreground/70",
            )}
          />
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar carrossel" : "Reproduzir carrossel"}
          className="ml-1 text-ink-foreground/60 transition-colors hover:text-gold"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </section>
  );
}
