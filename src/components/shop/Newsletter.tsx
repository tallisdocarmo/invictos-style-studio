import { useState } from "react";
import { toast } from "sonner";
import { Container, Eyebrow } from "./ui";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="border-t border-border bg-card py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Eyebrow>Novidades</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink md:text-3xl">
              Receba lançamentos e ofertas antes de todo mundo
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
              toast.success("Cadastro realizado", {
                description: "Você receberá nossas novidades em primeira mão.",
              });
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              aria-label="E-mail para newsletter"
              className="flex-1 border border-border bg-background px-4 py-3.5 text-sm text-ink outline-none focus:border-gold"
            />
            <button type="submit" className="label-sm bg-ink px-7 py-3.5 text-ink-foreground transition-colors hover:bg-ink-soft">
              Cadastrar
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
