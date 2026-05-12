import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-tamghart.png";
import { Search, Heart, ShoppingBag } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/artisanes", label: "Artisanes" },
  { to: "/creations", label: "Créations" },
  { to: "/galerie", label: "Culture" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Tamghart" width={44} height={44} className="h-11 w-11" />
          <div className="leading-none">
            <div className="font-display text-xl tracking-wide text-earth">TAMGHART</div>
            <div className="font-display text-[0.65rem] tracking-brand text-clay">L'ARTISANE</div>
          </div>
        </Link>

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

        <div className="flex items-center gap-4 text-foreground/70">
          <Link to="/recherche" aria-label="Recherche" className="transition-colors hover:text-accent">
            <Search className="h-5 w-5" />
          </Link>
          <button aria-label="Favoris" className="transition-colors hover:text-accent">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Panier" className="transition-colors hover:text-accent">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
