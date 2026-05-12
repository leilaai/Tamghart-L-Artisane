import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { creations, artisanes } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/creations/$id")({
  component: CreationDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-earth">Création introuvable</h1>
      <Link to="/creations" className="mt-6 inline-block text-accent underline">Retour au catalogue</Link>
    </div>
  ),
});

function CreationDetail() {
  const { id } = Route.useParams();
  const c = creations.find((x) => x.id === id);
  if (!c) throw notFound();
  const a = artisanes.find((x) => x.id === c.artisaneId);
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const fav = isFavorite(c.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <nav className="mb-8 text-xs tracking-brand text-muted-foreground">
        <Link to="/" className="hover:text-accent">ACCUEIL</Link> ›{" "}
        <Link to="/creations" className="hover:text-accent">CRÉATIONS</Link> ›{" "}
        <span className="text-earth">{c.name.toUpperCase()}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative">
          <img src={c.image} alt={c.name} width={1200} height={1200} className="aspect-square w-full object-cover" />
          <button
            onClick={() => toggleFavorite(c.id)}
            aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute right-4 top-4 rounded-full bg-cream/90 p-3 backdrop-blur transition-colors hover:bg-cream"
          >
            <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : "text-earth"}`} />
          </button>
        </div>

        <div>
          <span className="ornament text-xs tracking-brand">{c.category.toUpperCase()}</span>
          <h1 className="mt-4 font-display text-5xl text-earth">{c.name}</h1>
          {a && (
            <p className="mt-2 text-clay">
              par <Link to="/artisanes/$id" params={{ id: a.id }} className="hover:underline">{a.name}</Link> · {a.region}
            </p>
          )}
          <p className="mt-6 text-base leading-relaxed text-foreground/80">{c.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-3xl text-accent">{c.price} MAD</span>
            <span className={`rounded-full px-3 py-1 text-[0.65rem] tracking-brand ${c.available ? "bg-honey text-earth" : "bg-clay text-cream"}`}>
              {c.available ? "DISPONIBLE" : "SUR COMMANDE"}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => addToCart(c.id)} className="rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
              Ajouter au panier
            </button>
            <button onClick={() => toggleFavorite(c.id)} className="inline-flex items-center gap-2 rounded-sm border border-earth/30 px-6 py-3 text-sm tracking-wide text-earth hover:bg-sand">
              <Heart className={`h-4 w-4 ${fav ? "fill-accent text-accent" : ""}`} />
              {fav ? "Dans les favoris" : "Ajouter aux favoris"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
