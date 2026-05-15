import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-tamghart.png";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { useI18n, LANG_LABELS, type Lang } from "@/lib/i18n";

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-medium text-accent-foreground">
      {count}
    </span>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div role="group" aria-label="Language" className="inline-flex items-center gap-0.5 rounded-sm border border-border bg-card p-0.5">
      {LANG_LABELS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code as Lang)}
            aria-label={l.full}
            aria-pressed={active}
            className={`rounded-[2px] px-2 py-1 text-xs font-medium tracking-wide transition-colors ${
              active ? "bg-earth text-cream" : "text-earth/70 hover:bg-sand"
            }`}
          >
            {l.short}
          </button>
        );
      })}
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 sm:gap-4" aria-label="Tamghart l'Artisane — Accueil">
      <img src={logo} alt="" width={84} height={84} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-2xl font-semibold tracking-[0.12em] text-earth sm:text-3xl">TAMGHART</span>
        <span className="mt-1 flex items-center gap-2 font-display text-[0.65rem] tracking-[0.35em] text-clay sm:text-xs">
          <span aria-hidden className="text-clay">✦</span>
          L'ARTISANE
          <span aria-hidden className="text-clay">✦</span>
        </span>
        <span className="mt-1 text-[0.65rem] tracking-[0.25em] text-clay sm:text-xs" aria-hidden>
          ⵜⴰⵎⵖⴰⵔⵜ ⵍⴰⵕⵟⵉⵙⴰⵏ
        </span>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const { favorites, cart } = useStore();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/" as const, label: t("nav.home"), exact: true },
    { to: "/artisanes" as const, label: t("nav.artisans") },
    { to: "/creations" as const, label: t("nav.creations") },
    { to: "/galerie" as const, label: t("nav.culture") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Brand />

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2"
              activeProps={{ className: "text-accent font-medium" }}
              activeOptions={{ exact: n.exact }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-foreground/70 sm:gap-4">
          <LangSwitcher />
          <Link to="/" hash="recherche" aria-label={t("nav.search")} className="hidden transition-colors hover:text-accent sm:inline-flex">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/favoris" aria-label={t("nav.favorites")} className="relative transition-colors hover:text-accent">
            <Heart className="h-5 w-5" />
            <Badge count={favorites.length} />
          </Link>
          <Link to="/panier" aria-label={t("nav.cart")} className="relative transition-colors hover:text-accent">
            <ShoppingBag className="h-5 w-5" />
            <Badge count={cart.length} />
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-sand lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border/60 bg-cream lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm tracking-wide text-earth hover:text-accent"
                  activeProps={{ className: "text-accent font-medium" }}
                  activeOptions={{ exact: n.exact }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
