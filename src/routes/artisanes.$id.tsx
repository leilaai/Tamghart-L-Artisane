import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artisanes, creations } from "@/lib/data";
import { useState } from "react";

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

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <nav className="mb-8 text-xs tracking-brand text-muted-foreground">
        <Link to="/" className="hover:text-accent">ACCUEIL</Link> ›{" "}
        <Link to="/artisanes" className="hover:text-accent">ARTISANES</Link> ›{" "}
        <span className="text-earth">{artisane.name.toUpperCase()}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <img src={artisane.image} alt={artisane.name} width={800} height={1000} className="aspect-[4/5] w-full object-cover" />
        <div>
          <span className="ornament text-xs tracking-brand">{artisane.region.toUpperCase()}</span>
          <h1 className="mt-4 font-display text-5xl text-earth">{artisane.name}</h1>
          <p className="mt-2 text-clay">{artisane.craft} · {artisane.experience}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">{artisane.bio}</p>

          <div className="mt-10 rounded-sm border border-border bg-honey/30 p-6">
            <h2 className="font-display text-2xl text-earth">Création sur commande</h2>
            <p className="mt-1 text-sm text-muted-foreground">Décrivez votre projet à {artisane.name.split(" ")[0]}.</p>
            {sent ? (
              <p className="mt-4 rounded-sm bg-clay/20 p-4 text-sm text-earth">
                ✓ Demande envoyée. {artisane.name.split(" ")[0]} vous répondra sous 48h.
              </p>
            ) : (
              <form
                className="mt-4 grid gap-3"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <input required placeholder="Votre nom" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
                <input required type="email" placeholder="Email" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
                <textarea required rows={4} placeholder="Décrivez votre commande sur mesure" className="rounded-sm border border-input bg-card px-4 py-3 text-sm" />
                <button className="rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {ses.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-3xl text-earth">Ses créations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {ses.map((c) => (
              <article key={c.id} className="bg-card p-4">
                <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="flex items-end justify-between pt-4">
                  <div>
                    <h3 className="font-display text-xl text-earth">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                  </div>
                  <span className="font-display text-lg text-accent">{c.price} MAD</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
