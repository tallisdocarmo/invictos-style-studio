import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, getFacets } from "@/lib/shop/catalog";
import { formatPrice } from "@/lib/shop/format";
import type { CatalogQuery, CategorySlug, Gender } from "@/lib/shop/types";

const GENDERS: { value: Gender; label: string }[] = [
  { value: "feminino", label: "Feminino" },
  { value: "masculino", label: "Masculino" },
  { value: "unissex", label: "Unissex" },
];

function toggle<T>(list: T[] | undefined, value: T): T[] | undefined {
  const current = list ?? [];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  return next.length ? next : undefined;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <h3 className="label-sm mb-4 text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink/80 transition-colors hover:text-ink">
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center border transition-colors",
          checked ? "border-gold bg-gold" : "border-border bg-card",
        )}
      >
        {checked ? <span className="h-1.5 w-1.5 bg-ink" /> : null}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

export interface FilterSidebarProps {
  query: CatalogQuery;
  onChange: (next: CatalogQuery) => void;
  lockedCategory?: CategorySlug | undefined;
  lockedGender?: Gender | undefined;
  onClose?: (() => void) | undefined;
  className?: string | undefined;
}

export function FilterSidebar({
  query,
  onChange,
  lockedCategory,
  lockedGender,
  onClose,
  className,
}: FilterSidebarProps) {
  const facets = getFacets();
  const patch = (part: Partial<CatalogQuery>) => onChange({ ...query, ...part });

  return (
    <aside className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl text-ink">Filtros</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              onChange({
                sort: query.sort,
                search: query.search,
                categories: lockedCategory ? [lockedCategory] : undefined,
                genders: lockedGender ? [lockedGender] : undefined,
              })
            }
            className="label-xs text-[0.6rem] text-muted-foreground hover:text-gold"
          >
            Limpar
          </button>
          {onClose ? (
            <button type="button" onClick={onClose} aria-label="Fechar filtros">
              <X className="h-5 w-5 text-ink" strokeWidth={1.5} />
            </button>
          ) : null}
        </div>
      </div>

      {!lockedCategory ? (
        <Group title="Categoria">
          {CATEGORIES.map((c) => (
            <Check
              key={c.slug}
              label={c.name}
              checked={Boolean(query.categories?.includes(c.slug))}
              onChange={() => patch({ categories: toggle(query.categories, c.slug) })}
            />
          ))}
        </Group>
      ) : null}

      {!lockedGender ? (
        <Group title="Gênero">
          {GENDERS.map((g) => (
            <Check
              key={g.value}
              label={g.label}
              checked={Boolean(query.genders?.includes(g.value))}
              onChange={() => patch({ genders: toggle(query.genders, g.value) })}
            />
          ))}
        </Group>
      ) : null}

      <Group title="Marca">
        <div className="max-h-56 overflow-y-auto pr-1">
          {facets.brands.map((brand) => (
            <Check
              key={brand}
              label={brand}
              checked={Boolean(query.brands?.includes(brand))}
              onChange={() => patch({ brands: toggle(query.brands, brand) })}
            />
          ))}
        </div>
      </Group>

      <Group title="Tamanho">
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => {
            const active = Boolean(query.sizes?.includes(size));
            return (
              <button
                key={size}
                type="button"
                onClick={() => patch({ sizes: toggle(query.sizes, size) })}
                className={cn(
                  "min-w-10 border px-2.5 py-2 text-xs transition-colors",
                  active
                    ? "border-ink bg-ink text-ink-foreground"
                    : "border-border bg-card text-ink hover:border-ink",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Cor">
        {facets.colors.map((color) => (
          <Check
            key={color}
            label={color}
            checked={Boolean(query.colors?.includes(color))}
            onChange={() => patch({ colors: toggle(query.colors, color) })}
          />
        ))}
      </Group>

      <Group title="Faixa de preço">
        <input
          type="range"
          min={0}
          max={facets.maxPrice}
          step={50}
          value={query.maxPrice ?? facets.maxPrice}
          onChange={(e) =>
            patch({
              maxPrice:
                Number(e.target.value) >= facets.maxPrice
                  ? undefined
                  : Number(e.target.value),
            })
          }
          className="w-full accent-[var(--gold)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Até {formatPrice(query.maxPrice ?? facets.maxPrice)}
        </p>
      </Group>

      <Group title="Disponibilidade">
        <Check
          label="Somente em estoque"
          checked={Boolean(query.onlyInStock)}
          onChange={() => patch({ onlyInStock: query.onlyInStock ? undefined : true })}
        />
        <Check
          label="Somente em oferta"
          checked={Boolean(query.onlyOnSale)}
          onChange={() => patch({ onlyOnSale: query.onlyOnSale ? undefined : true })}
        />
      </Group>
    </aside>
  );
}
