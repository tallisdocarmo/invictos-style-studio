import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { buttonClass, Container } from "@/components/shop/ui";
import { cn } from "@/lib/utils";
import { formatPrice, installments } from "@/lib/shop/format";
import { useShop } from "@/lib/shop/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Invictos Calçados" },
      {
        name: "description",
        content: "Finalize sua compra na Invictos Calçados: identificação, entrega, pagamento e revisão.",
      },
      { property: "og:title", content: "Checkout — Invictos Calçados" },
      { property: "og:description", content: "Checkout seguro da Invictos Calçados." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const STEPS = ["Identificação", "Entrega", "Pagamento", "Revisão"] as const;

const FIELD =
  "w-full border border-border bg-card px-4 py-3 text-sm text-ink outline-none focus:border-gold";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="label-xs text-[0.6rem] text-muted-foreground">{label}</span>
      <input {...props} className={cn(FIELD, "mt-2")} />
    </label>
  );
}

function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useShop();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState<"pix" | "credito" | "debito">("pix");
  const [done, setDone] = useState(false);
  const parcel = installments(total);

  if (done) {
    return (
      <Container className="py-24 text-center">
        <Check className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-3xl text-ink">Pedido registrado</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Este é um checkout demonstrativo: nenhum pagamento foi processado. Na versão
          final, o pedido será criado diretamente no WooCommerce.
        </p>
        <Link to="/loja" className={buttonClass("dark", "mt-8")}>
          Continuar comprando
        </Link>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Sua sacola está vazia</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Adicione produtos para finalizar a compra.
        </p>
        <Link to="/loja" className={buttonClass("dark", "mt-8")}>
          Ir para a loja
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <h1 className="font-display text-4xl text-ink">Checkout</h1>

      <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center text-[0.65rem] font-semibold",
                i <= step ? "bg-ink text-ink-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "label-xs text-[0.6rem]",
                i <= step ? "text-ink" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < STEPS.length - 1) {
              setStep((s) => s + 1);
              return;
            }
            clearCart();
            setDone(true);
            toast.success("Pedido demonstrativo concluído");
          }}
          className="space-y-6"
        >
          {step === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome completo" required autoComplete="name" />
              <Field label="CPF" required inputMode="numeric" placeholder="000.000.000-00" />
              <Field label="E-mail" type="email" required autoComplete="email" />
              <Field label="Telefone / WhatsApp" required placeholder="(75) 90000-0000" />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="CEP" required placeholder="48590-000" />
              <Field label="Endereço" required className={FIELD} />
              <Field label="Número" required />
              <Field label="Complemento" />
              <Field label="Cidade" required defaultValue="Nova Soure" />
              <Field label="Estado" required defaultValue="BA" />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              {[
                { id: "pix", label: "Pix", hint: "Aprovação imediata", icon: QrCode },
                {
                  id: "credito",
                  label: "Cartão de crédito",
                  hint: parcel ? `até ${parcel.times}x de ${formatPrice(parcel.value)}` : "à vista",
                  icon: CreditCard,
                },
                {
                  id: "debito",
                  label: "Cartão de débito",
                  hint: "Débito à vista",
                  icon: CreditCard,
                },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPayment(option.id as typeof payment)}
                  className={cn(
                    "flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors",
                    payment === option.id
                      ? "border-gold bg-card"
                      : "border-border bg-card hover:border-ink",
                  )}
                >
                  <option.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink">
                      {option.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {option.hint}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "h-4 w-4 border",
                      payment === option.id ? "border-gold bg-gold" : "border-border",
                    )}
                  />
                </button>
              ))}
              {payment !== "pix" ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Número do cartão" required inputMode="numeric" />
                  <Field label="Nome impresso no cartão" required />
                  <Field label="Validade" required placeholder="MM/AA" />
                  <Field label="CVV" required inputMode="numeric" />
                </div>
              ) : (
                <p className="border border-border bg-card px-5 py-4 text-xs text-muted-foreground">
                  O QR Code do Pix será exibido após a confirmação do pedido. Ambiente
                  demonstrativo — nenhum pagamento é processado.
                </p>
              )}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="border border-border bg-card p-6">
              <h2 className="label-sm text-ink">Revisão do pedido</h2>
              <ul className="mt-4 divide-y divide-border text-sm">
                {items.map((item) => (
                  <li key={item.slug + item.size} className="flex justify-between py-3">
                    <span className="text-ink">
                      {item.product.name}{" "}
                      <span className="text-muted-foreground">
                        (tam. {item.size}) x{item.quantity}
                      </span>
                    </span>
                    <span className="text-ink">{formatPrice(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Pagamento selecionado:{" "}
                <span className="text-ink">
                  {payment === "pix"
                    ? "Pix"
                    : payment === "credito"
                      ? "Cartão de crédito"
                      : "Cartão de débito"}
                </span>
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={buttonClass("outline")}
              >
                Voltar
              </button>
            ) : null}
            <button type="submit" className={buttonClass("dark")}>
              {step === STEPS.length - 1 ? "Concluir pedido" : "Continuar"}
            </button>
          </div>
        </form>

        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="label-sm text-ink">Resumo</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Frete</dt>
              <dd>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-ink">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Checkout demonstrativo, preparado para integração com WooCommerce. Nenhum
            pagamento real é processado nesta versão.
          </p>
        </aside>
      </div>
    </Container>
  );
}
