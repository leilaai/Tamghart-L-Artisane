import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artisanes, creations } from "@/lib/data";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/artisanes/$id")({
  component: ArtisaneDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-earth">Artisane introuvable</h1>
      <Link to="/artisanes" className="mt-6 inline-block text-accent underline">Retour au catalogue</Link>
    </div>
  ),
});

function ArtisaneDetail() {
  const { id } = Route.useParams();
  const artisane = artisanes.find((a) => a.id === id);
  if (!artisane) throw notFound();
  const ses = creations.filter((c) => c.artisaneId === id);
  const [sent, setSent] = useState(false);
  const { isFavorite, toggleFavorite } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <nav className="mb-8 text-xs tracking-brand text-muted-foreground">
        <Link to="/" className="hover:text-accent">ACCUEIL</Link> ›{" "}
        <Link to="/artisanes" className="hover:text-accent">ARTISANES</Link> ›{" "}
        <span className="text-earth">{artisane.name.toUpperCase()}</span>
      </nav>

      {/* IDENTITÉ */}
      <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
        <img src={artisane.image} alt={artisane.name} width={800} height={1000} className="aspect-[4/5] w-full object-cover" />
        <div>
          <span className="ornament text-xs tracking-brand">{artisane.region.toUpperCase()}</span>
          <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{artisane.firstName} <span className="text-clay">{artisane.lastName}</span></h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs tracking-brand">
            <span className="rounded-full bg-sand px-3 py-1 text-earth">{artisane.craft.toUpperCase()}</span>
            <span className="rounded-full bg-honey px-3 py-1 text-earth">{artisane.experienceYears} ANS D'EXPÉRIENCE</span>
          </div>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">{artisane.bio}</p>
        </div>
      </div>

      {/* CRÉATIONS — directement sous le profil */}
      {ses.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="ornament text-xs tracking-brand">SES PIÈCES</span>
              <h2 className="mt-3 font-display text-4xl text-earth">Créations de {artisane.firstName}</h2>
            </div>
            <span className="text-xs tracking-brand text-muted-foreground">{ses.length} CRÉATION{ses.length > 1 ? "S" : ""}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {ses.map((c) => {
              const fav = isFavorite(c.id);
              return (
                <article key={c.id} className="group relative bg-card p-4 transition-shadow hover:shadow-lg">
                  <button
                    onClick={() => toggleFavorite(c.id)}
                    aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className="absolute right-6 top-6 z-10 rounded-full bg-cream/90 p-2 backdrop-blur transition-colors hover:bg-cream"
                  >
                    <Heart className={`h-4 w-4 ${fav ? "fill-accent text-accent" : "text-earth"}`} />
                  </button>
                  <Link to="/creations/$id" params={{ id: c.id }}>
                    <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover" />
                    <div className="flex items-end justify-between pt-4">
                      <div>
                        <h3 className="font-display text-xl text-earth">{c.name}</h3>
                        <p className="text-xs text-muted-foreground">{c.category}</p>
                      </div>
                      <span className="font-display text-lg text-accent">{c.price} MAD</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* COMMANDE SUR MESURE — en bas */}
      <section className="mt-24 rounded-sm border border-border bg-honey/30 p-8 md:p-12">
        <span className="ornament text-xs tracking-brand">SUR MESURE</span>
        <h2 className="mt-3 font-display text-4xl text-earth">Création sur commande</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Décrivez votre projet à {artisane.firstName}. Elle vous répondra avec une estimation de prix et de délais.
        </p>
        {sent ? (
          <p className="mt-6 rounded-sm bg-clay/20 p-4 text-sm text-earth">
            ✓ Demande envoyée. {artisane.firstName} vous répondra sous 48h.
          </p>
        ) : (
          <form
            className="mt-6 grid max-w-2xl gap-3"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <input required placeholder="Votre nom" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
            <input required type="email" placeholder="Email" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
            <textarea required rows={4} placeholder="Décrivez votre commande sur mesure (matières, dimensions, motifs souhaités...)" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
            <button className="w-fit rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
              Envoyer la demande
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
