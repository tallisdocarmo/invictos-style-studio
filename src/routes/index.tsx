import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Benefits } from "@/components/shop/Benefits";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { InstagramGrid } from "@/components/shop/InstagramGrid";
import { Newsletter } from "@/components/shop/Newsletter";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { StoreLocation } from "@/components/shop/StoreLocation";
import { buttonClass, Container, Eyebrow, SectionHeading } from "@/components/shop/ui";
import { getByGender, getFeatured, getNewArrivals } from "@/lib/shop/catalog";

const hero = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop";
const ela = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop";
const ele = "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop";
const banner = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop";
const catCalcados = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";
const catBolsas = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop";
const catRoupas = "https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=2071&auto=format&fit=crop";
const catAcessorios = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Invictos Calçados — Moda que combina com você" },
      {
        name: "description",
        content:
          "Calçados, bolsas, roupas e acessórios femininos e masculinos na Invictos Calçados. Compre online com entrega para todo o Brasil ou visite nossa loja em Nova Soure — BA.",
      },
      { property: "og:title", content: "Invictos Calçados — Moda que combina com você" },
      {
        property: "og:description",
        content:
          "Calçados, bolsas, roupas e acessórios femininos e masculinos na Invictos Calçados. Compre online com entrega para todo o Brasil ou visite nossa loja em Nova Soure — BA.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = getFeatured(8);
  const feminino = getByGender("feminino", 4);
  const masculino = getByGender("masculino", 4);
  const novidades = getNewArrivals(4);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink">
        <img
          src={hero}
          alt="Modelos vestindo peças da coleção Invictos Calçados"
          width={1920}
          height={1088}
          className="h-[70vh] min-h-[460px] w-full object-cover object-right md:h-[82vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <Container className="absolute inset-0 flex items-center">
          <div className="max-w-lg">
            <Eyebrow>Coleção 2026</Eyebrow>
            <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] text-ink-foreground md:text-[4.25rem]">
              Seu estilo.
              <br />
              Sua marca.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/70 md:text-base">
              Calçados, bolsas, roupas e acessórios para transformar cada detalhe do seu
              look.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/loja" className={buttonClass("gold")}>
                Comprar agora
              </Link>
              <Link to="/localizacao" className={buttonClass("outlineLight")}>
                Conheça a loja
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORIAS */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Categorias"
            title="Encontre seu estilo"
            description="Navegue pelas seleções da Invictos e monte o look completo."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            <CategoryCard title="Feminino" to="/feminino" image={ela} alt="Coleção feminina" />
            <CategoryCard title="Masculino" to="/masculino" image={ele} alt="Coleção masculina" />
            <CategoryCard title="Calçados" to="/calcados" image={catCalcados} alt="Calçados" />
            <CategoryCard title="Bolsas" to="/bolsas" image={catBolsas} alt="Bolsas" />
            <CategoryCard title="Roupas" to="/roupas" image={catRoupas} alt="Roupas" />
            <CategoryCard
              title="Acessórios"
              to="/acessorios"
              image={catAcessorios}
              alt="Acessórios"
            />
          </div>
        </Container>
      </section>

      {/* DESTAQUES */}
      <section className="pb-16 md:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Seleção da equipe"
            title="Destaques da Invictos"
            action={
              <Link
                to="/loja"
                className="label-sm inline-flex items-center gap-2 text-ink hover:text-gold"
              >
                Ver toda a loja <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            }
          />
          <ProductGrid products={featured} className="mt-10" />
        </Container>
      </section>

      {/* PARA ELA */}
      <section className="bg-card">
        <div className="grid lg:grid-cols-2">
          <img
            src={ela}
            alt="Look feminino com bolsa e scarpin"
            loading="lazy"
            className="h-full max-h-[680px] w-full object-cover"
          />
          <div className="flex items-center px-6 py-14 md:px-14 lg:py-20">
            <div>
              <Eyebrow>Para ela</Eyebrow>
              <h2 className="mt-5 text-3xl leading-tight text-ink md:text-[2.6rem]">
                Detalhes que fazem diferença.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Encontre bolsas, calçados, roupas e acessórios para acompanhar seu estilo.
              </p>
              <Link to="/feminino" className={buttonClass("dark", "mt-8")}>
                Ver coleção feminina
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Feminino" title="Selecionados para ela" />
          <ProductGrid products={feminino} className="mt-10" />
        </Container>
      </section>

      {/* PARA ELE */}
      <section className="bg-ink">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-14 md:px-14 lg:order-1 lg:py-20">
            <div>
              <Eyebrow>Para ele</Eyebrow>
              <h2 className="mt-5 text-3xl uppercase leading-tight tracking-tight text-ink-foreground md:text-[2.6rem]">
                Estilo que acompanha você.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/60">
                Peças sóbrias, confortáveis e prontas para o dia inteiro.
              </p>
              <Link to="/masculino" className={buttonClass("gold", "mt-8")}>
                Ver coleção masculina
              </Link>
            </div>
          </div>
          <img
            src={ele}
            alt="Look masculino minimalista"
            loading="lazy"
            className="h-full max-h-[680px] w-full object-cover"
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Masculino" title="Selecionados para ele" />
          <ProductGrid products={masculino} className="mt-10" />
        </Container>
      </section>

      {/* BANNER PROMOCIONAL */}
      <section className="relative bg-ink">
        <img
          src={banner}
          alt="Composição com tênis, bolsa e óculos"
          loading="lazy"
          className="h-[320px] w-full object-cover opacity-60 md:h-[420px]"
        />
        <Container className="absolute inset-0 flex flex-col items-start justify-center">
          <h2 className="max-w-xl text-3xl leading-tight text-ink-foreground md:text-[2.9rem]">
            Seu próximo look começa aqui.
          </h2>
          <Link to="/ofertas" className={buttonClass("gold", "mt-7")}>
            Ver novidades
          </Link>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Acabaram de chegar" title="Novidades" />
          <ProductGrid products={novidades} className="mt-10" />
        </Container>
      </section>

      <Benefits />
      <InstagramGrid />
      <StoreLocation />
      <Newsletter />
    </>
  );
}
