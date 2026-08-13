// ============= Full file contents =============
import type { Product, ProductImage, CategorySlug, Gender, ProductReview } from "./types";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`;

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

const baseProducts: Seed[] = [
  {
    name: "Tênis Esportivo Pro",
    slug: "tenis-esportivo-pro",
    sku: "T-01",
    brand: "Invictos",
    short_description: "Performance e estilo.",
    description: "Tênis ideal para treinos.",
    images: [{ src: img("1542291026-7eec264c27ff"), alt: "Tênis" }],
    categories: ["calcados", "masculino"],
    gender: "masculino",
    regular_price: 399.9,
    sale_price: null,
    sizes: SIZES_MASC,
    colors: ["Preto"],
    stock_status: "instock",
    stock_quantity: 20,
    rating: 4.8,
    rating_count: 10,
    featured: true,
    is_new: true,
    best_seller: 10,
    created_at: "2026-08-01",
    attributes: [],
    size_chart: CHART_MASC,
    reviews: []
  },
  {
    name: "Bota Couro Urbano",
    slug: "bota-couro-urbano",
    sku: "B-01",
    brand: "Invictos",
    short_description: "Elegância rústica.",
    description: "Bota em couro legítimo.",
    images: [{ src: img("1608256246200-53e635b5b65f"), alt: "Bota" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 599.9,
    sale_price: 499.9,
    sizes: SIZES_FEM,
    colors: ["Marrom"],
    stock_status: "instock",
    stock_quantity: 10,
    rating: 4.9,
    rating_count: 5,
    featured: true,
    is_new: true,
    best_seller: 5,
    created_at: "2026-08-02",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: []
  },
  {
    name: "Scarpin Clássico Luxo",
    slug: "scarpin-classico-luxo",
    sku: "S-01",
    brand: "Invictos",
    short_description: "O toque final.",
    description: "Salto agulha premium.",
    images: [{ src: img("1543163521-1bf539c55dd2"), alt: "Scarpin" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 299.9,
    sale_price: null,
    sizes: SIZES_FEM,
    colors: ["Nude"],
    stock_status: "instock",
    stock_quantity: 15,
    rating: 4.7,
    rating_count: 20,
    featured: true,
    is_new: false,
    best_seller: 20,
    created_at: "2026-07-20",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: []
  },
  {
    name: "Mocassim Confort",
    slug: "mocassim-confort",
    sku: "M-01",
    brand: "Invictos",
    short_description: "Conforto total.",
    description: "Mocassim casual leve.",
    images: [{ src: img("1614252235316-8c857d38b5f4"), alt: "Mocassim" }],
    categories: ["calcados", "masculino"],
    gender: "masculino",
    regular_price: 249.9,
    sale_price: 199.9,
    sizes: SIZES_MASC,
    colors: ["Azul"],
    stock_status: "instock",
    stock_quantity: 12,
    rating: 4.6,
    rating_count: 8,
    featured: false,
    is_new: true,
    best_seller: 8,
    created_at: "2026-08-05",
    attributes: [],
    size_chart: CHART_MASC,
    reviews: []
  },
  {
    name: "Rasteira Summer Breeze",
    slug: "rasteira-summer-breeze",
    sku: "R-01",
    brand: "Invictos",
    short_description: "Leveza pura.",
    description: "Rasteira delicada.",
    images: [{ src: img("1562273103-91206b77af11"), alt: "Rasteira" }],
    categories: ["calcados", "feminino"],
    gender: "feminino",
    regular_price: 129.9,
    sale_price: null,
    sizes: SIZES_FEM,
    colors: ["Dourado"],
    stock_status: "instock",
    stock_quantity: 50,
    rating: 4.9,
    rating_count: 12,
    featured: false,
    is_new: true,
    best_seller: 30,
    created_at: "2026-08-06",
    attributes: [],
    size_chart: CHART_FEM,
    reviews: []
  },
];

const generateSeeds = (): Seed[] => {
  const result: Seed[] = [];
  for (let i = 0; i < 30; i++) {
    const base = baseProducts[i % baseProducts.length];
    if (base) {
      result.push({
        ...base,
        name: `${base.name} ${i + 1}`,
        slug: `${base.slug}-${i + 1}`,
        sku: `INV-${i + 100}`,
        created_at: new Date(2026, 6, (i % 25) + 1).toISOString().split('T')[0],
        best_seller: Math.floor(Math.random() * 100),
      });
    }
  }
  return result;
};

const seeds = generateSeeds();

export const MOCK_PRODUCTS: Product[] = seeds.map((seed, index) => ({
  ...seed,
  product_id: 1000 + index,
  price: seed.sale_price ?? seed.regular_price,
}));
