import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-tamghart.png";
import { Search, Heart, ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
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
    <div role="group" aria-label="Language" className="hidden items-center gap-0.5 rounded-sm border border-border bg-card p-0.5 sm:inline-flex">
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

function LangGlobe() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div ref={ref} className="relative sm:hidden">
      <button
        type="button"
        aria-label="Langue"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-earth hover:bg-sand"
      >
        <Globe className="h-5 w-5" />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-1 min-w-[8rem] rounded-sm border border-border bg-cream p-1 shadow-lg">
          {LANG_LABELS.map((l) => {
            const active = lang === l.code;
            return (
              <button
                key={l.code}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2 text-xs tracking-wide transition-colors ${
                  active ? "bg-earth text-cream" : "text-earth hover:bg-sand"
                }`}
              >
                <span>{l.full}</span>
                <span className="opacity-70">{l.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BrandBlock({ size = "md" }: { size?: "sm" | "md" }) {
  const isSm = size === "sm";
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <img
        src={logo}
        alt=""
        width={84}
        height={84}
        className={isSm ? "h-10 w-10 object-contain" : "h-10 w-10 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"}
      />
      <div className="flex flex-col items-center leading-none">
        <span className={`font-display font-semibold tracking-[0.12em] text-earth ${isSm ? "text-lg" : "text-sm sm:text-2xl md:text-3xl"}`}>TAMGHART</span>
        <span className={`mt-1 flex items-center gap-1.5 font-display tracking-[0.25em] text-clay sm:gap-2 sm:tracking-[0.35em] ${isSm ? "text-[0.55rem]" : "text-[0.45rem] sm:text-[0.65rem] md:text-xs"}`}>
          <span aria-hidden>✦</span>
          L'ARTISANE
          <span aria-hidden>✦</span>
        </span>
        <span className={`mt-1 tracking-[0.15em] text-clay sm:tracking-[0.25em] ${isSm ? "text-[0.55rem]" : "text-[0.45rem] sm:text-[0.65rem] md:text-xs"}`} aria-hidden>
          ⵜⴰⵎⵖⴰⵔⵜ ⵍⴰⵕⵟⵉⵙⴰⵏ
        </span>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-4" aria-label="Tamghart l'Artisane — Accueil">
      <BrandBlock />
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
    { to: "/a-propos" as const, label: t("nav.about") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Brand />

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-2 text-foreground/70 sm:gap-4">
          <LangSwitcher />
          <LangGlobe />
          <Link to="/" hash="recherche" aria-label={t("nav.search")} className="transition-colors hover:text-accent">
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
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-earth/40 backdrop-blur-sm lg:hidden"
          />
          <nav
            aria-label="Mobile"
            className="fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] border-l border-border bg-cream shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <span className="text-xs tracking-brand text-earth/70">MENU</span>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-sand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col px-4 py-2">
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
        </>
      )}
    </header>
  );
}
