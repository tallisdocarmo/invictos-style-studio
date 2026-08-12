import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { buttonClass, Container, Eyebrow } from "@/components/shop/ui";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha conta — Invictos Calçados" },
      {
        name: "description",
        content: "Acesse sua conta Invictos para acompanhar pedidos, endereços e favoritos.",
      },
      { property: "og:title", content: "Minha conta — Invictos Calçados" },
      { property: "og:description", content: "Acompanhe pedidos e dados na sua conta Invictos." },
      { property: "og:url", content: "/conta" },
    ],
    links: [{ rel: "canonical", href: "/conta" }],
  }),
  component: AccountPage,
});

const FIELD =
  "mt-2 w-full border border-border bg-card px-4 py-3 text-sm text-ink outline-none focus:border-gold";

function AccountPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Área do cliente</Eyebrow>
          <h1 className="mt-5 font-display text-4xl text-ink">Minha conta</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Entre para acompanhar seus pedidos, salvar endereços e acessar seus favoritos.
            Nesta versão demonstrativa o login não está conectado — na integração com
            WooCommerce será usado o cadastro de clientes da loja.
          </p>
          <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            {[
              { label: "Meus pedidos", to: "/carrinho" as const },
              { label: "Meus favoritos", to: "/favoritos" as const },
              { label: "Trocas e devoluções", to: "/trocas-e-devolucoes" as const },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-ink transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Login demonstrativo", {
              description: "A autenticação será conectada ao WooCommerce na versão final.",
            });
          }}
          className="h-fit border border-border bg-card p-6 md:p-8"
        >
          <h2 className="label-sm text-ink">Entrar</h2>
          <label className="mt-6 block">
            <span className="label-xs text-[0.6rem] text-muted-foreground">E-mail</span>
            <input type="email" required className={FIELD} autoComplete="email" />
          </label>
          <label className="mt-5 block">
            <span className="label-xs text-[0.6rem] text-muted-foreground">Senha</span>
            <input type="password" required className={FIELD} autoComplete="current-password" />
          </label>
          <button type="submit" className={buttonClass("dark", "mt-7 w-full")}>
            Acessar minha conta
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Ainda não tem conta? Crie a sua durante o checkout.
          </p>
        </form>
      </div>
    </Container>
  );
}
