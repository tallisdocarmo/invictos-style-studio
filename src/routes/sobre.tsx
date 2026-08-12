import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonClass, Container, Eyebrow } from "@/components/shop/ui";
import { StoreLocation } from "@/components/shop/StoreLocation";
import ela from "@/assets/editorial-ela.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Invictos — Invictos Calçados" },
      {
        name: "description",
        content:
          "Conheça a história da Invictos Calçados, loja de moda feminina e masculina em Nova Soure — Bahia.",
      },
      { property: "og:title", content: "Sobre a Invictos — Invictos Calçados" },
      {
        property: "og:description",
        content: "Uma loja física consolidada em Nova Soure, agora também online.",
      },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Nossa história</Eyebrow>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
              Moda que combina com você
            </h1>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink/80">
              <p>
                A Invictos Calçados nasceu no centro de Nova Soure com uma ideia simples:
                oferecer calçados, bolsas, roupas e acessórios de qualidade, com
                atendimento de gente que conhece o cliente pelo nome.
              </p>
              <p>
                Trabalhamos com marcas reconhecidas do mercado brasileiro e selecionamos
                cada peça pensando em conforto, durabilidade e preço justo. Nada de
                exagero: moda que se usa no dia a dia, no trabalho e nas ocasiões
                especiais.
              </p>
              <p>
                Agora nossa vitrine também é digital. Você compra online, recebe em casa
                em qualquer canto do Brasil ou passa na loja para provar com calma.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/loja" className={buttonClass("dark")}>
                Ver a loja
              </Link>
              <Link to="/contato" className={buttonClass("outline")}>
                Falar com a equipe
              </Link>
            </div>
          </div>
          <img
            src={ela}
            alt="Peça da coleção Invictos em ambiente editorial"
            loading="lazy"
            className="h-full max-h-[640px] w-full object-cover"
          />
        </div>
      </Container>
      <StoreLocation />
    </>
  );
}
