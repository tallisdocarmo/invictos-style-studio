import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopProvider } from "@/lib/shop/store";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-6xl text-ink">404</h1>
        <h2 className="mt-4 font-display text-xl text-ink">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <Link
          to="/"
          className="label-sm mt-6 inline-flex bg-ink px-6 py-3.5 text-ink-foreground"
        >
          Voltar à home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-ink">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente recarregar ou voltar à página inicial.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label-sm bg-ink px-6 py-3.5 text-ink-foreground"
          >
            Tentar novamente
          </button>
          <a href="/" className="label-sm border border-ink px-6 py-3.5 text-ink">
            Ir para a home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Invictos Calçados — Moda que combina com você" },
      {
        name: "description",
        content:
          "Calçados, bolsas, roupas e acessórios femininos e masculinos na Invictos Calçados. Compre online com entrega para todo o Brasil ou visite nossa loja em Nova Soure — BA.",
      },
      { property: "og:site_name", content: "Invictos Calçados" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Invictos Calçados — Moda que combina com você" },
      { name: "twitter:title", content: "Invictos Calçados — Moda que combina com você" },
      { property: "og:description", content: "Calçados, bolsas, roupas e acessórios femininos e masculinos na Invictos Calçados. Compre online com entrega para todo o Brasil ou visite nossa loja em Nova Soure — BA." },
      { name: "twitter:description", content: "Calçados, bolsas, roupas e acessórios femininos e masculinos na Invictos Calçados. Compre online com entrega para todo o Brasil ou visite nossa loja em Nova Soure — BA." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34b5623b6fae92b04b8476c2c2d1d11f/id-preview-a189b735--404e48e2-c8df-4cca-b497-04239f2673ee.lovable.app-1786623455046.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34b5623b6fae92b04b8476c2c2d1d11f/id-preview-a189b735--404e48e2-c8df-4cca-b497-04239f2673ee.lovable.app-1786623455046.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "Invictos Calçados",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Luiz Viana Filho, 118",
            addressLocality: "Nova Soure",
            addressRegion: "BA",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <WhatsAppButton />
        <Toaster position="bottom-center" />
      </ShopProvider>
    </QueryClientProvider>
  );
}
