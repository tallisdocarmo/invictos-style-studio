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

const productTemplates: Omit<Seed, "name" | "slug" | "sku" | "created_at" | "best_seller">[] = [
  { brand: "Adidas", short_description: "Performance máxima.", description: "Tênis esportivo de alta performance.", images: [{ src: img("1542291026-7eec264c27ff"), alt: "Adidas" }], categories: ["calcados", "masculino"], gender: "masculino", regular_price: 599.9, sale_price: null, sizes: SIZES_MASC, colors: ["Preto", "Branco"], stock_status: "instock", stock_quantity: 20, rating: 4.8, rating_count: 10, featured: true, is_new: true, attributes: [], size_chart: CHART_MASC, reviews: [] },
  { brand: "Nike", short_description: "Estilo urbano.", description: "Tênis casual para o dia a dia.", images: [{ src: img("1595950653-8556a981242d"), alt: "Nike" }], categories: ["calcados", "masculino"], gender: "masculino", regular_price: 699.9, sale_price: 549.9, sizes: SIZES_MASC, colors: ["Azul", "Cinza"], stock_status: "instock", stock_quantity: 15, rating: 4.9, rating_count: 15, featured: true, is_new: true, attributes: [], size_chart: CHART_MASC, reviews: [] },
  { brand: "Vizzano", short_description: "Elegância diária.", description: "Scarpin clássico e confortável.", images: [{ src: img("1543163521-1bf539c55dd2"), alt: "Vizzano" }], categories: ["calcados", "feminino"], gender: "feminino", regular_price: 199.9, sale_price: null, sizes: SIZES_FEM, colors: ["Nude", "Preto"], stock_status: "instock", stock_quantity: 30, rating: 4.7, rating_count: 25, featured: true, is_new: false, attributes: [], size_chart: CHART_FEM, reviews: [] },
  { brand: "Beira Rio", short_description: "Leveza nos pés.", description: "Rasteira delicada para o verão.", images: [{ src: img("1562273103-91206b77af11"), alt: "Beira Rio" }], categories: ["calcados", "feminino"], gender: "feminino", regular_price: 89.9, sale_price: null, sizes: SIZES_FEM, colors: ["Dourado", "Bege"], stock_status: "instock", stock_quantity: 40, rating: 4.6, rating_count: 12, featured: false, is_new: true, attributes: [], size_chart: CHART_FEM, reviews: [] },
  { brand: "Timberland", short_description: "Aventura e durabilidade.", description: "Bota robusta para trilhas.", images: [{ src: img("1608256246200-53e635b5b65f"), alt: "Timberland" }], categories: ["calcados", "masculino"], gender: "masculino", regular_price: 899.9, sale_price: 799.9, sizes: SIZES_MASC, colors: ["Marrom"], stock_status: "instock", stock_quantity: 5, rating: 4.9, rating_count: 8, featured: true, is_new: false, attributes: [], size_chart: CHART_MASC, reviews: [] },
  { brand: "Moleca", short_description: "Conforto sem igual.", description: "Mocassim casual para o trabalho.", images: [{ src: img("1614252235316-8c857d38b5f4"), alt: "Moleca" }], categories: ["calcados", "feminino"], gender: "feminino", regular_price: 149.9, sale_price: 129.9, sizes: SIZES_FEM, colors: ["Preto", "Bege"], stock_status: "instock", stock_quantity: 25, rating: 4.5, rating_count: 20, featured: false, is_new: true, attributes: [], size_chart: CHART_FEM, reviews: [] },
];

const generateSeeds = (): Seed[] => {
  const result: Seed[] = [];
  const names = [
    "Tênis Esportivo", "Tênis Casual", "Scarpin", "Rasteira", "Bota", "Mocassim",
    "Sandália", "Tênis Runner", "Sapatilha", "Bota Cano Curto", "Sandália Plataforma"
  ];
  
  for (let i = 0; i < 30; i++) {
    const template = productTemplates[i % productTemplates.length];
    const name = names[i % names.length];
    const brand = template.brand;
    
    result.push({
      ...template,
      name: `${name} ${brand}`,
      slug: `${name.toLowerCase().replace(' ', '-')}-${brand.toLowerCase()}-${i}`,
      sku: `INV-${1000 + i}`,
      created_at: new Date(2026, 6, (i % 25) + 1).toISOString().split('T')[0] ?? "2026-08-01",
      best_seller: Math.floor(Math.random() * 100),
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
