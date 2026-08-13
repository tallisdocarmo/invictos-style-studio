import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useShop } from "@/lib/shop/store";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { Container } from "./ui";

const NAV = [
  { label: "Feminino", to: "/feminino" },
  { label: "Masculino", to: "/masculino" },
  { label: "Calçados", to: "/calcados" },
  { label: "Ofertas", to: "/ofertas" },
] as const;

export function Header() {
  const { count, setCartOpen, favorites } = useShop();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/loja", search: { q: term || undefined } });
  }

  return (
    <header className="sticky top-0 z-50 bg-ink text-ink-foreground">
      <AnnouncementBar />

      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-300",
            compact ? "h-16" : "h-20 md:h-24",
          )}
        >
          <button
            type="button"
            aria-label="Abrir menu"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <Logo size={compact ? "sm" : "md"} className="lg:mr-8" />

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "label-xs py-2 text-ink-foreground/80 transition-colors hover:text-gold",
                  item.label === "Ofertas" && "text-gold",
                )}
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              type="button"
              aria-label="Pesquisar"
              onClick={() => setSearchOpen((v) => !v)}
              className="transition-colors hover:text-gold"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </button>
            <Link
              to="/conta"
              aria-label="Minha conta"
              className="hidden transition-colors hover:text-gold md:block"
            >
              <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </Link>
            <Link
              to="/favoritos"
              aria-label="Favoritos"
              className="relative hidden transition-colors hover:text-gold md:block"
            >
              <Heart className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              {favorites.length > 0 ? (
                <span className="absolute -right-2 -top-1.5 min-w-4 bg-gold px-1 text-center text-[0.6rem] font-semibold leading-4 text-ink">
                  {favorites.length}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label={`Carrinho com ${count} itens`}
              onClick={() => setCartOpen(true)}
              className="relative transition-colors hover:text-gold"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              <span
                className={cn(
                  "absolute -right-2 -top-1.5 min-w-4 px-1 text-center text-[0.6rem] font-semibold leading-4",
                  count > 0 ? "bg-gold text-ink" : "hidden",
                )}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {searchOpen ? (
        <div className="border-t border-ink-foreground/10 bg-ink-soft">
          <Container>
            <form onSubmit={submitSearch} className="flex items-center gap-3 py-4">
              <Search className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Buscar por produto, marca ou categoria"
                className="w-full bg-transparent py-2 text-sm text-ink-foreground outline-none placeholder:text-ink-foreground/40"
              />
              <button type="submit" className="label-xs text-gold">
                Buscar
              </button>
            </form>
          </Container>
        </div>
      ) : null}

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden">
          <div className="flex h-20 items-center justify-between px-5">
            <Logo size="sm" />
            <button type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink-foreground/10 py-4 font-display text-2xl text-ink-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-5 pb-10 pt-8">
            {[
              { label: "Minha conta", to: "/conta" as const },
              { label: "Favoritos", to: "/favoritos" as const },
              { label: "Nossa loja", to: "/localizacao" as const },
              { label: "Contato", to: "/contato" as const },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="label-xs text-ink-foreground/70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
