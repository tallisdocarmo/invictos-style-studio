// ============= Full file contents =============
import type { Product } from "./types";

import imgTenisEsportivo from "@/assets/shoe-tenis-esportivo.jpg";
import imgTenisCasual from "@/assets/shoe-tenis-casual-branco.jpg";
import imgScarpin from "@/assets/shoe-scarpin.jpg";
import imgRasteira from "@/assets/shoe-rasteira.jpg";
import imgBotaMarrom from "@/assets/shoe-bota-marrom.jpg";
import imgMocassim from "@/assets/shoe-mocassim.jpg";
import imgSandalia from "@/assets/shoe-sandalia.jpg";
import imgSapatoSocial from "@/assets/shoe-sapato-social.jpg";
import imgBotaChelsea from "@/assets/shoe-bota-chelsea.jpg";
import imgTenisRunner from "@/assets/shoe-tenis-runner.jpg";

const SIZES_FEM = ["34", "35", "36", "37", "38", "39"];
const SIZES_MASC = ["38", "39", "40", "41", "42", "43"];

const CHART_FEM = [
  { size: "34", equivalence: "22,0 cm" },
  { size: "35", equivalence: "22,8 cm" },
  { size: "36", equivalence: "23,5 cm" },
  { size: "37", equivalence: "24,3 cm" },
  { size: "38", equivalence: "25,0 cm" },
  { size: "39", equivalence: "25,8 cm" },
];

const CHART_MASC = [
  { size: "38", equivalence: "24,8 cm" },
  { size: "39", equivalence: "25,5 cm" },
  { size: "40", equivalence: "26,2 cm" },
  { size: "41", equivalence: "27,0 cm" },
  { size: "42", equivalence: "27,7 cm" },
  { size: "43", equivalence: "28,5 cm" },
];

type Seed = Omit<Product, "price" | "product_id">;

const productTemplates: Seed[] = [
  {
    name: "Tênis Esportivo Ultra",
    slug: "tenis-esportivo-ultra-adidas",
    sku: "AD-01",
    brand: "Adidas",
    short_description: "Performance máxima.",
    description: "Tênis esportivo de alta performance com tecnologia de amortecimento.",
    images: [{ src: imgTenisEsportivo, alt: "Tênis esportivo preto Adidas" }],
    categories: ["calcados", "masculino"],
    gender: "masculino",
    regular_price: 599.9,
    sale_price: null,
    sizes: SIZES_MASC,
    colors: ["Preto", "Branco"],
    stock_status: "instock",
    stock_quantity: 20,
    rating: 4.8,
    rating_count: 10,
    featured: true,
    is_new: true,
    best_seller: 80,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_MASC,
    reviews: [],
  },
  {
    name: "Tênis Court Branco",
    slug: "tenis-court-branco-nike",
    sku: "NK-01",
    brand: "Nike",
    short_description: "Estilo urbano icônico.",
    description: "Tênis casual em couro branco com design limpo para o dia a dia.",
    images: [{ src: imgTenisCasual, alt: "Tênis casual branco Nike" }],
    categories: ["calcados", "masculino"],
    gender: "masculino",
    regular_price: 699.9,
    sale_price: 549.9,
    sizes: SIZES_MASC,
    colors: ["Branco"],
    stock_status: "instock",
    stock_quantity: 15,
    rating: 4.9,
    rating_count: 15,
    featured: true,
    is_new: true,
    best_seller: 95,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_MASC,
    reviews: [],
  },
  {
    name: "Scarpin Royale",
    slug: "scarpin-royale-vizzano",
    sku: "VZ-01",
    brand: "Vizzano",
    short_description: "Elegância absoluta.",
    description: "Scarpin clássico em verniz com salto agulha.",
    images: [{ src: imgScarpin, alt: "Scarpin preto em verniz" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 199.9,
    sale_price: null,
    sizes: SIZES_FEM,
    colors: ["Preto"],
    stock_status: "instock",
    stock_quantity: 30,
    rating: 4.7,
    rating_count: 25,
    featured: true,
    is_new: false,
    best_seller: 70,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: [],
  },
  {
    name: "Rasteira Crystal",
    slug: "rasteira-crystal-beira-rio",
    sku: "BR-01",
    brand: "Beira Rio",
    short_description: "Brilho e conforto.",
    description: "Rasteira com pedrarias ideal para momentos relax.",
    images: [{ src: imgRasteira, alt: "Rasteira dourada com pedrarias" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 89.9,
    sale_price: null,
    sizes: SIZES_FEM,
    colors: ["Dourado"],
    stock_status: "instock",
    stock_quantity: 40,
    rating: 4.6,
    rating_count: 12,
    featured: false,
    is_new: true,
    best_seller: 50,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: [],
  },
  {
    name: "Bota Explorer",
    slug: "bota-explorer-timberland",
    sku: "TB-01",
    brand: "Timberland",
    short_description: "Aventura sem limites.",
    description: "Bota em couro legítimo resistente à água.",
    images: [{ src: imgBotaMarrom, alt: "Bota de couro marrom" }],
    categories: ["calcados", "masculino"],
    gender: "masculino",
    regular_price: 899.9,
    sale_price: 799.9,
    sizes: SIZES_MASC,
    colors: ["Marrom"],
    stock_status: "instock",
    stock_quantity: 5,
    rating: 4.9,
    rating_count: 8,
    featured: true,
    is_new: false,
    best_seller: 40,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_MASC,
    reviews: [],
  },
  {
    name: "Mule Classic",
    slug: "mule-classic-moleca",
    sku: "ML-01",
    brand: "Moleca",
    short_description: "O básico indispensável.",
    description: "Mule em nobuck macio para uso prolongado.",
    images: [{ src: imgMocassim, alt: "Mule preto feminino" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 149.9,
    sale_price: 129.9,
    sizes: SIZES_FEM,
    colors: ["Preto"],
    stock_status: "instock",
    stock_quantity: 25,
    rating: 4.5,
    rating_count: 20,
    featured: false,
    is_new: true,
    best_seller: 60,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: [],
  },
];

type Variant = {
  name: string;
  image: string;
  gender: "masculino" | "feminino";
  colors: string[];
};

const variants: Variant[] = [
  { name: "Sandália Bloco", image: imgSandalia, gender: "feminino", colors: ["Nude"] },
  { name: "Tênis Runner", image: imgTenisRunner, gender: "masculino", colors: ["Azul", "Branco"] },
  { name: "Sapatilha Court", image: imgTenisCasual, gender: "feminino", colors: ["Branco"] },
  { name: "Bota Chelsea", image: imgBotaChelsea, gender: "feminino", colors: ["Preto"] },
  { name: "Sandália Plataforma", image: imgSandalia, gender: "feminino", colors: ["Nude"] },
  { name: "Mule Confort", image: imgMocassim, gender: "feminino", colors: ["Preto"] },
  { name: "Tênis Skate", image: imgTenisEsportivo, gender: "masculino", colors: ["Preto"] },
  { name: "Sapato Social", image: imgSapatoSocial, gender: "masculino", colors: ["Preto"] },
  { name: "Bota Trail", image: imgBotaMarrom, gender: "masculino", colors: ["Marrom"] },
  { name: "Scarpin Bico Fino", image: imgScarpin, gender: "feminino", colors: ["Preto"] },
  { name: "Rasteira Glam", image: imgRasteira, gender: "feminino", colors: ["Dourado"] },
  { name: "Tênis Retrô", image: imgTenisRunner, gender: "masculino", colors: ["Azul"] },
];

const brands = ["Puma", "Reebok", "Schutz", "Arezzo", "Olympikus", "Asics"];

const generateSeeds = (): Seed[] => {
  const result: Seed[] = [...productTemplates];

  for (let i = result.length; i < 30; i++) {
    const base = productTemplates[i % productTemplates.length]!;
    const variant = variants[(i - productTemplates.length) % variants.length]!;
    const brand = brands[i % brands.length]!;

    result.push({
      ...base,
      name: `${variant.name} ${brand}`,
      brand,
      slug: `${variant.name.toLowerCase().replace(/\s+/g, "-")}-${brand.toLowerCase()}-${i}`,
      sku: `INV-${1000 + i}`,
      images: [{ src: variant.image, alt: `${variant.name} ${brand}` }],
      gender: variant.gender,
      categories: ["calcados", variant.gender],
      colors: variant.colors,
      sizes: variant.gender === "feminino" ? SIZES_FEM : SIZES_MASC,
      size_chart: variant.gender === "feminino" ? CHART_FEM : CHART_MASC,
      created_at: new Date(2026, 6, (i % 25) + 1).toISOString().split("T")[0] ?? "2026-08-01",
      best_seller: ((i * 37) % 100) + 1,
    });
  }
  return result;
};

const seeds = generateSeeds();

export const MOCK_PRODUCTS: Product[] = seeds.map((seed, index) => ({
  ...seed,
  product_id: 1000 + index,
  price: seed.sale_price ?? seed.regular_price,
}));
