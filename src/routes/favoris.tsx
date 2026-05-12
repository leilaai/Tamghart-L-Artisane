import { createFileRoute, Link } from "@tanstack/react-router";
import { creations, artisanes } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Heart, Trash2 } from "lucide-react";

export const Route = createFileRoute("/favoris")({
  head: () => ({ meta: [{ title: "Mes favoris — Tamghart" }] }),
  component: FavorisPage,
});

function FavorisPage() {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const items = creations.filter((c) => favorites.includes(c.id));

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">VOTRE SÉLECTION</span>
      <h1 className="mt-4 font-display text-5xl text-earth">Mes favoris</h1>
      <p className="mt-3 text-muted-foreground">{items.length} pièce{items.length > 1 ? "s" : ""} enregistrée{items.length > 1 ? "s" : ""}.</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-sm border border-dashed border-border bg-card p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-clay" />
          <p className="mt-4 text-foreground/80">Aucun favori pour le moment.</p>
          <Link to="/creations" className="mt-6 inline-block rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
            Découvrir le catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => {
            const a = artisanes.find((x) => x.id === c.artisaneId);
            return (
              <article key={c.id} className="group relative bg-card p-4">
                <Link to="/creations/$id" params={{ id: c.id }}>
                  <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover" />
                </Link>
                <div className="pt-4">
                  <h3 className="font-display text-xl text-earth">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.category}{a && ` · ${a.name}`}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-lg text-accent">{c.price} MAD</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleFavorite(c.id)} aria-label="Retirer" className="rounded-sm p-2 text-clay hover:bg-sand">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => addToCart(c.id)} className="rounded-sm bg-earth px-3 py-2 text-xs tracking-brand text-cream hover:bg-earth/90">
                        AU PANIER
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
