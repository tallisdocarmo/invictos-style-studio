import { Instagram } from "lucide-react";
import { STORE_INFO } from "@/lib/shop/whatsapp";
import { Container, SectionHeading } from "./ui";

import ela from "@/assets/editorial-ela.jpg";
import ele from "@/assets/editorial-ele.jpg";
import bolsa from "@/assets/p-bolsa-caramelo.jpg";
import tenis from "@/assets/p-tenis-branco.jpg";
import relogio from "@/assets/p-relogio.jpg";
import scarpin from "@/assets/p-scarpin.jpg";

const POSTS = [
  { src: ela, alt: "Look feminino com bolsa de couro" },
  { src: tenis, alt: "Tênis branco em destaque" },
  { src: bolsa, alt: "Bolsa shopper caramelo" },
  { src: ele, alt: "Look masculino minimalista" },
  { src: scarpin, alt: "Scarpin nude clássico" },
  { src: relogio, alt: "Relógio dourado" },
];

export function InstagramGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Inspiração"
          title="Siga a Invictos"
          description="Moda, novidades e inspirações todos os dias."
          action={
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="label-sm inline-flex items-center gap-2 text-ink transition-colors hover:text-gold"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
              {STORE_INFO.instagram}
            </a>
          }
        />
        <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {POSTS.map((post) => (
            <a
              key={post.alt}
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden bg-ink"
            >
              <img
                src={post.src}
                alt={post.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
