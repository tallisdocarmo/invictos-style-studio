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

const productTemplates: Seed[] = [
  { 
    name: "Tênis Esportivo Ultra", 
    slug: "tenis-esportivo-ultra-adidas", 
    sku: "AD-01", 
    brand: "Adidas", 
    short_description: "Performance máxima.", 
    description: "Tênis esportivo de alta performance com tecnologia de amortecimento.", 
    images: [{ src: img("1542291026-7eec264c27ff"), alt: "Adidas" }], 
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
    reviews: [] 
  },
  { 
    name: "Tênis Air Urban", 
    slug: "tenis-air-urban-nike", 
    sku: "NK-01", 
    brand: "Nike", 
    short_description: "Estilo urbano icônico.", 
    description: "Tênis casual com design moderno para o dia a dia.", 
    images: [{ src: img("1595950653-8556a981242d"), alt: "Nike" }], 
    categories: ["calcados", "masculino"], 
    gender: "masculino", 
    regular_price: 699.9, 
    sale_price: 549.9, 
    sizes: SIZES_MASC, 
    colors: ["Azul", "Cinza"], 
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
    reviews: [] 
  },
  { 
    name: "Scarpin Royale", 
    slug: "scarpin-royale-vizzano", 
    sku: "VZ-01", 
    brand: "Vizzano", 
    short_description: "Elegância absoluta.", 
    description: "Scarpin clássico em verniz com salto agulha.", 
    images: [{ src: img("1543163521-1bf539c55dd2"), alt: "Vizzano" }], 
    categories: ["calcados", "feminino"], 
    gender: "feminino", 
    regular_price: 199.9, 
    sale_price: null, 
    sizes: SIZES_FEM, 
    colors: ["Nude", "Preto"], 
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
    reviews: [] 
  },
  { 
    name: "Rasteira Crystal", 
    slug: "rasteira-crystal-beira-rio", 
    sku: "BR-01", 
    brand: "Beira Rio", 
    short_description: "Brilho e conforto.", 
    description: "Rasteira com pedrarias ideal para momentos relax.", 
    images: [{ src: img("1562273103-91206b77af11"), alt: "Beira Rio" }], 
    categories: ["calcados", "feminino"], 
    gender: "feminino", 
    regular_price: 89.9, 
    sale_price: null, 
    sizes: SIZES_FEM, 
    colors: ["Dourado", "Bege"], 
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
    reviews: [] 
  },
  { 
    name: "Bota Explorer", 
    slug: "bota-explorer-timberland", 
    sku: "TB-01", 
    brand: "Timberland", 
    short_description: "Aventura sem limites.", 
    description: "Bota em couro legítimo resistente à água.", 
    images: [{ src: img("1608256246200-53e635b5b65f"), alt: "Timberland" }], 
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
    reviews: [] 
  },
  { 
    name: "Mocassim Classic", 
    slug: "mocassim-classic-moleca", 
    sku: "ML-01", 
    brand: "Moleca", 
    short_description: "O básico indispensável.", 
    description: "Mocassim macio para uso prolongado.", 
    images: [{ src: img("1614252235316-8c857d38b5f4"), alt: "Moleca" }], 
    categories: ["calcados", "feminino"], 
    gender: "feminino", 
    regular_price: 149.9, 
    sale_price: 129.9, 
    sizes: SIZES_FEM, 
    colors: ["Preto", "Bege"], 
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
    reviews: [] 
  },
];

const generateSeeds = (): Seed[] => {
  const result: Seed[] = [];
  const additionalNames = [
    "Sandália", "Tênis Runner", "Sapatilha", "Bota Cano Curto", "Sandália Plataforma",
    "Chinelo Slide", "Tênis Skate", "Sapato Social", "Bota Chelsea", "Mule Confort"
  ];
  const brands = ["Puma", "Reebok", "Schutz", "Arezzo", "Olympikus", "Asics"];
  const imageIds = [
    "1525966222451-5390101f3f96", // Tênis
    "1560761274647-789498b674b0", // Tênis
    "1549298913-7d9c28a9b6d4", // Bota
    "1595950653-8556a981242d", // Nike
    "1460353005624-8ba55a12ec9a", // Adidas
    "1533681904225-837c97560a67"  // Sapato
  ];
  
  // Start with explicit templates
  result.push(...productTemplates);

  // Generate the rest to reach 30
  for (let i = result.length; i < 30; i++) {
    const base = productTemplates[i % productTemplates.length]!;
    const name = additionalNames[i % additionalNames.length]!;
    const brand = brands[i % brands.length]!;
    const imgId = imageIds[i % imageIds.length]!;
    
    result.push({
      ...base,
      name: `${name} ${brand}`,
      brand: brand,
      slug: `${name.toLowerCase().replace(' ', '-')}-${brand.toLowerCase()}-${i}`,
      sku: `INV-${1000 + i}`,
      images: [{ src: img(imgId), alt: `${name} ${brand}` }],
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
