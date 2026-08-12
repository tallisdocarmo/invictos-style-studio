/**
 * Modelo de dados do catálogo.
 *
 * A estrutura espelha deliberadamente o schema de produto da WooCommerce REST API
 * (`/wp-json/wc/v3/products`), para que a troca dos dados mockados por chamadas
 * reais não exija reescrever a interface.
 */

export type CategorySlug =
  | "calcados"
  | "bolsas"
  | "roupas"
  | "acessorios";

export type Gender = "feminino" | "masculino" | "unissex";

export type StockStatus = "instock" | "outofstock";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  product_id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string;
  /** Preço vigente (sale_price quando houver, senão regular_price). */
  price: number;
  regular_price: number;
  sale_price: number | null;
  images: ProductImage[];
  categories: CategorySlug[];
  gender: Gender;
  brand: string;
  sizes: string[];
  colors: string[];
  stock_status: StockStatus;
  stock_quantity: number;
  rating: number;
  rating_count: number;
  featured: boolean;
  is_new: boolean;
  best_seller: number;
  created_at: string;
  attributes: { label: string; value: string }[];
  size_chart?: { size: string; equivalence: string }[];
  reviews: ProductReview[];
}

export interface ProductReview {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export type SortOption =
  | "relevancia"
  | "recentes"
  | "menor-preco"
  | "maior-preco"
  | "mais-vendidos";

export interface CatalogQuery {
  search?: string | undefined;
  categories?: CategorySlug[] | undefined;
  genders?: Gender[] | undefined;
  brands?: string[] | undefined;
  sizes?: string[] | undefined;
  colors?: string[] | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  onlyInStock?: boolean | undefined;
  onlyOnSale?: boolean | undefined;
  sort?: SortOption | undefined;
}

export interface CartLine {
  slug: string;
  size: string;
  quantity: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}
