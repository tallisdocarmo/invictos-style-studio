/**
 * CAMADA DE SERVIÇO DO CATÁLOGO
 *
 * A interface consome exclusivamente as funções deste arquivo. Hoje elas leem de
 * `mock-products.ts`; na integração com WordPress + WooCommerce basta trocar o
 * corpo de cada função por uma chamada à WooCommerce REST API
 * (ex.: `GET /wp-json/wc/v3/products?category=...&per_page=...`) e mapear a
 * resposta para o tipo `Product`. Nenhum componente precisa ser reescrito.
 */
import { MOCK_PRODUCTS } from "./mock-products";
import type {
  CatalogQuery,
  CategorySlug,
  Gender,
  Product,
  SortOption,
} from "./types";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  path: string;
}[] = [
  { slug: "masculino", name: "Masculino", path: "/masculino" },
  { slug: "feminino", name: "Feminino", path: "/feminino" },
  { slug: "infantil", name: "Infantil", path: "/infantil" },
  { slug: "calcados", name: "Lançamentos", path: "/loja" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "mais-vendidos", label: "Mais vendidos" },
];

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getFeatured(limit = 8): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function getByGender(gender: Gender, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.gender === gender).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return [...MOCK_PRODUCTS]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit);
}

export function getOnSale(limit?: number): Product[] {
  const list = MOCK_PRODUCTS.filter((p) => p.sale_price !== null);
  return limit ? list.slice(0, limit) : list;
}

export function getRelated(product: Product, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      p.categories.some((c) => product.categories.includes(c)),
  ).slice(0, limit);
}

export function getFacets() {
  const brands = new Set<string>();
  const sizes = new Set<string>();
  const colors = new Set<string>();
  let max = 0;
  for (const p of MOCK_PRODUCTS) {
    brands.add(p.brand);
    p.sizes.forEach((s) => sizes.add(s));
    p.colors.forEach((c) => colors.add(c));
    max = Math.max(max, p.regular_price);
  }
  return {
    brands: [...brands].sort((a, b) => a.localeCompare(b)),
    sizes: [...sizes].sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true })),
    colors: [...colors].sort((a, b) => a.localeCompare(b)),
    maxPrice: Math.ceil(max / 50) * 50,
  };
}

function matches(product: Product, query: CatalogQuery) {
  const {
    search,
    categories,
    genders,
    brands,
    sizes,
    colors,
    minPrice,
    maxPrice,
    onlyInStock,
    onlyOnSale,
  } = query;

  if (search) {
    const term = search.toLowerCase();
    const haystack = `${product.name} ${product.brand} ${product.short_description}`.toLowerCase();
    if (!haystack.includes(term)) return false;
  }
  if (categories?.length && !product.categories.some((c) => categories.includes(c)))
    return false;
  if (genders?.length && !genders.includes(product.gender)) return false;
  if (brands?.length && !brands.includes(product.brand)) return false;
  if (sizes?.length && !product.sizes.some((s) => sizes.includes(s))) return false;
  if (colors?.length && !product.colors.some((c) => colors.includes(c))) return false;
  if (minPrice !== undefined && product.price < minPrice) return false;
  if (maxPrice !== undefined && product.price > maxPrice) return false;
  if (onlyInStock && product.stock_status !== "instock") return false;
  if (onlyOnSale && product.sale_price === null) return false;
  return true;
}

function sortProducts(list: Product[], sort: SortOption = "relevancia") {
  const copy = [...list];
  switch (sort) {
    case "recentes":
      return copy.sort((a, b) => b.created_at.localeCompare(a.created_at));
    case "menor-preco":
      return copy.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return copy.sort((a, b) => b.price - a.price);
    case "mais-vendidos":
      return copy.sort((a, b) => b.best_seller - a.best_seller);
    default:
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || b.best_seller - a.best_seller,
      );
  }
}

export function searchCatalog(query: CatalogQuery = {}): Product[] {
  return sortProducts(
    MOCK_PRODUCTS.filter((p) => matches(p, query)),
    query.sort,
  );
}

/** Dados estruturados schema.org — prontos para SEO de produto. */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.short_description,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating:
      product.rating_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.rating_count,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };
}
