import { Instagram } from "lucide-react";
import { STORE_INFO } from "@/lib/shop/whatsapp";
import { Container, SectionHeading } from "./ui";

const POSTS = [
  { 
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", 
    alt: "Look feminino com bolsa de couro" 
  },
  { 
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", 
    alt: "Tênis branco em destaque" 
  },
  { 
    src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop", 
    alt: "Bolsa shopper caramelo" 
  },
  { 
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop", 
    alt: "Look masculino minimalista" 
  },
  { 
    src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop", 
    alt: "Scarpin nude clássico" 
  },
  { 
    src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2099&auto=format&fit=crop", 
    alt: "Relógio dourado" 
  },
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
