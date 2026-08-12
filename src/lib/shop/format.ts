export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

/** Parcelamento demonstrativo em até 10x sem juros. */
export function installments(value: number, times = 10) {
  const max = value >= 100 ? times : Math.max(1, Math.floor(value / 20));
  if (max <= 1) return null;
  return { times: max, value: value / max };
}

export function discountPercent(regular: number, sale: number) {
  return Math.round((1 - sale / regular) * 100);
}
