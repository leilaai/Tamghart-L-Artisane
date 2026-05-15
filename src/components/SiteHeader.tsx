import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-tamghart.png";
import { Search, Heart, ShoppingBag, Globe } from "lucide-react";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/artisanes", label: "Artisanes" },
  { to: "/creations", label: "Créations" },
  { to: "/galerie", label: "Culture" },
  { to: "/contact", label: "Contact" },
];

const langs = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "tif", label: "ⵜⵉⴼⵉⵏⴰⵖ" },
];

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-medium text-accent-foreground">
      {count}
    </span>
  );
}

function LangSwitcher() {
  const [lang, setLang] = useState("fr");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tamghart_lang") : null;
    if (saved) setLang(saved);
  }, []);
  return (
    <div className="relative inline-flex items-center gap-1 rounded-sm border border-border bg-card px-2 py-1">
      <Globe className="h-3.5 w-3.5 text-clay" />
      <select
        aria-label="Langue"
        value={lang}
        onChange={(e) => {
          const v = e.target.value;
          setLang(v);
          localStorage.setItem("tamghart_lang", v);
          document.documentElement.lang = v === "tif" ? "ber" : v;
          document.documentElement.dir = v === "ar" ? "rtl" : "ltr";
        }}
        className="cursor-pointer bg-transparent text-xs tracking-wide text-earth focus:outline-none"
      >
        {langs.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </div>
  );
}

export function SiteHeader() {
  const { favorites, cart } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Tamghart" width={52} height={52} className="h-12 w-12 object-contain" />
            <div className="leading-none">
              <div className="font-display text-2xl font-semibold tracking-[0.08em] text-earth">TAMGHART</div>
              <div className="ornament mt-1 justify-center font-display text-[0.7rem] tracking-[0.3em] text-clay">L'ARTISANE</div>
            </div>
          </Link>
          <LangSwitcher />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-foreground/70">
          <Link to="/" hash="recherche" aria-label="Recherche" className="transition-colors hover:text-accent">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/favoris" aria-label="Favoris" className="relative transition-colors hover:text-accent">
            <Heart className="h-5 w-5" />
            <Badge count={favorites.length} />
          </Link>
          <Link to="/panier" aria-label="Panier" className="relative transition-colors hover:text-accent">
            <ShoppingBag className="h-5 w-5" />
            <Badge count={cart.length} />
          </Link>
        </div>
      </div>
    </header>
  );
}
