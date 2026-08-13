import type { Product } from "./types";

const tenisBranco = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop";
const tenisPreto = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop";
const scarpin = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop";
const sandalia = "https://images.unsplash.com/photo-1562273103-91206b77af11?q=80&w=1964&auto=format&fit=crop";
const bota = "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1974&auto=format&fit=crop";
const mocassim = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1930&auto=format&fit=crop";
const bolsaPreta = "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1974&auto=format&fit=crop";
const bolsaCaramelo = "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1957&auto=format&fit=crop";
const mochila = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop";
const camiseta = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop";
const vestido = "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop";
const jeans = "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop";
const relogio = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2099&auto=format&fit=crop";
const oculos = "https://images.unsplash.com/photo-1511499767390-90342f568952?q=80&w=2080&auto=format&fit=crop";
const cinto = "https://images.unsplash.com/photo-1554990772-0bea55d510d5?q=80&w=1960&auto=format&fit=crop";

const SIZES_FEM = ["34", "35", "36", "37", "38", "39"];
const SIZES_MASC = ["38", "39", "40", "41", "42", "43"];
const SIZES_ROUPA = ["P", "M", "G", "GG"];
const SIZE_UNICO = ["Único"];

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

type Seed = Omit<Product, "price" | "product_id"> & { product_id?: number };

const seeds: Seed[] = MOCK_PRODUCTS_DATA.filter((p) => p.categories.includes("calcados"));

// [The rest of the file content needs to be carefully pruned]
// Actually, it's easier to just rebuild the array with ONLY footwear items.

export const MOCK_PRODUCTS: Product[] = seeds.map((seed, index) => ({
  ...seed,
  product_id: 1000 + index,
  price: seed.sale_price ?? seed.regular_price,
}));
