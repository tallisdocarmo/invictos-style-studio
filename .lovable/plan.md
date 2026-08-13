# Plan: Refine Product Catalog to Shoes and Sandals

The store will be updated to focus exclusively on shoes and sandals, removing all references to bags, clothing, and accessories.

## User Review Required

> [!IMPORTANT]
> This change will remove the "Bolsas", "Roupas", and "Acessórios" categories. Are you sure you want to proceed with this specialization?

## Proposed Changes

### Data and Logic
- **`src/lib/shop/mock-products.ts`**: 
    - Remove all non-footwear products (bags, clothes, watches, etc.).
    - Keep only sneakers, boots, pumps, and sandals.
    - Update constants (e.g., remove `SIZES_ROUPA`).
- **`src/lib/shop/catalog.ts`**: 
    - Update `CATEGORIES` constant to remove non-footwear slugs.

### Navigation and UI
- **`src/components/shop/Header.tsx`**: 
    - Remove "Bolsas", "Roupas", and "Acessórios" from the navigation menu.
- **`src/routes/index.tsx`**: 
    - Remove category cards for bags, clothes, and accessories from the homepage grid.
    - Update promotional text and banners if they reference the removed categories.
- **`src/routes/__root.tsx`**: 
    - Remove footer links to deleted categories.

### SEO and Metadata
- **`src/routes/*.tsx`**: 
    - Update titles and descriptions to reflect the focus on shoes/sandals.

## Technical Details
- Filter the `seeds` array in `mock-products.ts` to keep only products where `categories` includes `calcados` or if the item is clearly footwear.
- Since the store initially had 22 items and about half were footwear, I might need to slightly adjust the "Featured" or "New Arrivals" counts to ensure a full layout.
