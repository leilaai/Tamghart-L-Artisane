import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoreProvider } from "@/lib/store";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 py-20 text-center">
      <span className="ornament text-xs tracking-brand">ⵜⴰⵎⵖⴰⵔⵜ</span>
      <h1 className="mt-6 font-display text-7xl text-earth sm:text-8xl">404</h1>
      <h2 className="mt-4 font-display text-2xl text-earth">Page introuvable</h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre voyage.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-earth px-6 py-3 text-sm tracking-brand text-cream transition-colors hover:bg-earth/90"
      >
        RETOUR À L'ACCUEIL
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 py-20 text-center">
      <span className="ornament text-xs tracking-brand">ⵜⴰⵎⵖⴰⵔⵜ</span>
      <h1 className="mt-6 font-display text-5xl text-earth sm:text-6xl">Oups…</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="rounded-sm bg-earth px-6 py-3 text-sm tracking-brand text-cream transition-colors hover:bg-earth/90"
        >
          RÉESSAYER
        </button>
        <a
          href="/"
          className="rounded-sm border border-earth/30 px-6 py-3 text-sm tracking-brand text-earth transition-colors hover:bg-sand"
        >
          ACCUEIL
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tamghart l'Artisane — Héritage des femmes amazighes" },
      { name: "description", content: "Tamghart l'Artisane valorise le patrimoine culturel amazigh à travers le savoir-faire des femmes artisanes." },
      { name: "author", content: "Tamghart l'Artisane" },
      { property: "og:title", content: "Tamghart l'Artisane" },
      { property: "og:description", content: "Patrimoine vivant des femmes amazighes du Maroc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
      <I18nProvider>
        <StoreProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-earth focus:px-3 focus:py-2 focus:text-cream">Aller au contenu</a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
          </div>
        </StoreProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
