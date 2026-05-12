import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-tamghart.png";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/artisanes", label: "Artisanes" },
  { to: "/creations", label: "Créations" },
  { to: "/galerie", label: "Culture" },
  { to: "/contact", label: "Contact" },
];

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-medium text-accent-foreground">
      {count}
    </span>
  );
}

export function SiteHeader() {
  const { favorites, cart } = useStore();
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
