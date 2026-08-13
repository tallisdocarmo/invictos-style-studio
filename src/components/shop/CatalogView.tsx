import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { searchCatalog, SORT_OPTIONS } from "@/lib/shop/catalog";
import type { CatalogQuery, CategorySlug, Gender, SortOption } from "@/lib/shop/types";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { Container } from "./ui";
import { cn } from "@/lib/utils";

export function CatalogView({
  title,
  description,
  lockedCategory,
  lockedGender,
  onlyOnSale,
  initialSearch,
  initialCategories,
  initialOnlyOnSale,
}: {
  title: string;
  description?: string | undefined;
  lockedCategory?: CategorySlug | undefined;
  lockedGender?: Gender | undefined;
  onlyOnSale?: boolean | undefined;
  initialSearch?: string | undefined;
  initialCategories?: string[] | undefined;
  initialOnlyOnSale?: boolean | undefined;
}) {
  const [query, setQuery] = useState<CatalogQuery>({
    sort: "relevancia",
    search: initialSearch,
    categories: lockedCategory ? [lockedCategory] : (initialCategories as any),
    genders: lockedGender ? [lockedGender] : undefined,
    onlyOnSale: onlyOnSale || initialOnlyOnSale || undefined,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: searchTerm || undefined }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync internal search state if initialSearch changes
  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  const effective = useMemo<CatalogQuery>(
    () => ({
      ...query,
      categories: lockedCategory ? [lockedCategory] : query.categories,
      genders: lockedGender ? [lockedGender] : query.genders,
      onlyOnSale: onlyOnSale ? true : query.onlyOnSale,
      search: initialSearch ?? query.search,
    }),
    [query, lockedCategory, lockedGender, onlyOnSale, initialSearch],
  );

  const products = useMemo(() => searchCatalog(effective), [effective]);

  return (
    <div className="pb-20">
      <div className="border-b border-border bg-card">
        <Container className="py-10 md:py-14">
          <h1 className="font-display text-4xl text-ink md:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {initialSearch ? (
            <p className="mt-4 text-sm text-ink">
              Resultados para <span className="text-gold">“{initialSearch}”</span>
            </p>
          ) : null}
        </Container>
      </div>

      <Container className="pt-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border px-11 py-3.5 text-sm text-ink outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold/20"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              query={query}
              onChange={setQuery}
              lockedCategory={lockedCategory}
              lockedGender={lockedGender}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4">
              <p className="text-xs text-muted-foreground">
                {products.length}{" "}
                {products.length === 1 ? "produto" : "produtos"}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="label-xs flex items-center gap-2 border border-border bg-card px-3 py-2.5 text-[0.6rem] text-ink lg:hidden"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Filtros
                </button>
                <label className="flex items-center gap-2">
                  <span className="label-xs hidden text-[0.6rem] text-muted-foreground sm:block">
                    Ordenar
                  </span>
                  <select
                    value={query.sort}
                    onChange={(e) =>
                      setQuery({ ...query, sort: e.target.value as SortOption })
                    }
                    className="border border-border bg-card px-3 py-2.5 text-xs text-ink outline-none focus:border-gold"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </Container>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar filtros"
            className="absolute inset-0 bg-ink/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-background p-6">
            <FilterSidebar
              query={query}
              onChange={setQuery}
              lockedCategory={lockedCategory}
              lockedGender={lockedGender}
              onClose={() => setDrawerOpen(false)}
            />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="label-sm mt-8 w-full bg-ink py-4 text-ink-foreground"
            >
              Ver {products.length} produtos
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
