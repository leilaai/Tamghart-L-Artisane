import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-earth text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-wide">TAMGHART</div>
          <div className="font-display text-xs tracking-brand text-clay">L'ARTISANE</div>
          <p className="mt-4 text-sm text-cream/70">
            Héritage · Création · Authenticité. Une marque qui célèbre les femmes amazighes.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">EXPLORER</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/artisanes" className="hover:text-clay">Les artisanes</Link></li>
            <li><Link to="/creations" className="hover:text-clay">Catalogue</Link></li>
            <li><Link to="/galerie" className="hover:text-clay">Galerie culturelle</Link></li>
            <li><Link to="/recherche" className="hover:text-clay">Recherche</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">MAISON</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/contact" className="hover:text-clay">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-clay">Espace admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">ⵜⴰⵎⵖⴰⵔⵜ</h4>
          <p className="text-sm text-cream/70">
            Tamghart l'Artisane — Patrimoine vivant des femmes amazighes du Maroc.
          </p>
        </div>
      </div>
      <div className="border-t border-cream/15 py-5 text-center text-xs tracking-brand text-cream/60">
        ⵣ &nbsp; HÉRITAGE · CRÉATION · AUTHENTICITÉ &nbsp; ⵣ
      </div>
    </footer>
  );
}
