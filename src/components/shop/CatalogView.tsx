import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { searchCatalog, SORT_OPTIONS } from "@/lib/shop/catalog";
import type { CatalogQuery, CategorySlug, Gender, SortOption } from "@/lib/shop/types";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { Container } from "./ui";

export function CatalogView({
  title,
  description,
  lockedCategory,
  lockedGender,
  onlyOnSale,
  initialSearch,
}: {
  title: string;
  description?: string | undefined;
  lockedCategory?: CategorySlug | undefined;
  lockedGender?: Gender | undefined;
  onlyOnSale?: boolean | undefined;
  initialSearch?: string | undefined;
}) {
  const [query, setQuery] = useState<CatalogQuery>({
    sort: "relevancia",
    search: initialSearch,
    categories: lockedCategory ? [lockedCategory] : undefined,
    genders: lockedGender ? [lockedGender] : undefined,
    onlyOnSale: onlyOnSale || undefined,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

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
