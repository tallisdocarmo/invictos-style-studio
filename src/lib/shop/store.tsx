import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug } from "./catalog";
import type { CartLine, CartLineView } from "./types";

const CART_KEY = "invictos.cart.v1";
const FAV_KEY = "invictos.favorites.v1";
const FREE_SHIPPING_FROM = 299.9;
const FLAT_SHIPPING = 24.9;

interface ShopContextValue {
  lines: CartLine[];
  items: CartLineView[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingFrom: number;
  addToCart: (slug: string, size: string, quantity?: number) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeLine: (slug: string, size: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  lastAdded: string | null;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(read<CartLine[]>(CART_KEY, []));
    setFavorites(read<string[]>(FAV_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const addToCart = useCallback((slug: string, size: string, quantity = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug && l.size === size);
      if (found) {
        return prev.map((l) =>
          l === found ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { slug, size, quantity }];
    });
    setLastAdded(slug);
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, quantity } : l)),
    );
  }, []);

  const removeLine = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const items: CartLineView[] = lines.flatMap((line) => {
      const product = getProductBySlug(line.slug);
      if (!product) return [];
      return [{ ...line, product, lineTotal: product.price * line.quantity }];
    });
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : FLAT_SHIPPING;
    return {
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingFrom: FREE_SHIPPING_FROM,
      addToCart,
      updateQuantity,
      removeLine,
      clearCart: () => setLines([]),
      favorites,
      toggleFavorite,
      isFavorite: (slug: string) => favorites.includes(slug),
      cartOpen,
      setCartOpen,
      lastAdded,
    };
  }, [lines, favorites, cartOpen, lastAdded, addToCart, updateQuantity, removeLine, toggleFavorite]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return ctx;
}
