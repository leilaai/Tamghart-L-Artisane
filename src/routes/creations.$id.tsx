import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { creations, artisanes, type Review } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Heart, Star, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { PaymentDialog } from "@/components/PaymentDialog";

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
  const [showHistory, setShowHistory] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(c.reviews);
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
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
          <h1 className="mt-4 font-display text-4xl text-earth sm:text-5xl">{c.name}</h1>
          {a && (
            <Link
              to="/artisanes/$id"
              params={{ id: a.id }}
              className="mt-4 flex items-center gap-3 rounded-sm border border-border bg-sand/40 p-3 transition-colors hover:bg-sand"
            >
              <img
                src={a.image}
                alt={a.name}
                width={96}
                height={96}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="text-[0.65rem] tracking-brand text-clay">CRÉÉ PAR</div>
                <div className="font-display text-lg text-earth">{a.name}</div>
                <div className="text-xs text-muted-foreground truncate">{a.craft} · {a.region}</div>
              </div>
            </Link>
          )}
          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.round(avg) ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{avg.toFixed(1)} · {reviews.length} avis</span>
            </div>
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
            <PaymentDialog
              amount={c.price}
              title={`Acheter — ${c.name}`}
              trigger={
                <button className="rounded-sm bg-clay px-6 py-3 text-sm tracking-wide text-cream hover:bg-clay/90">
                  Acheter maintenant
                </button>
              }
            />
            <button onClick={() => toggleFavorite(c.id)} className="inline-flex items-center gap-2 rounded-sm border border-earth/30 px-6 py-3 text-sm tracking-wide text-earth hover:bg-sand">
              <Heart className={`h-4 w-4 ${fav ? "fill-accent text-accent" : ""}`} />
              {fav ? "Dans les favoris" : "Ajouter aux favoris"}
            </button>
          </div>

          {/* LE SAVIEZ-VOUS */}
          <div className="mt-10 rounded-sm border border-border bg-honey/40 p-5">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="flex w-full items-start justify-between gap-3 text-left"
              aria-expanded={showHistory}
            >
              <div>
                <span className="text-xs tracking-brand text-clay">LE SAVIEZ-VOUS ?</span>
                <p className="mt-2 text-sm text-foreground/80">{c.funFact}</p>
                <span className="mt-2 inline-block text-xs tracking-brand text-accent">
                  {showHistory ? "MASQUER L'ARTICLE" : "LIRE L'ARTICLE COMPLET →"}
                </span>
              </div>
              <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-clay transition-transform ${showHistory ? "rotate-180" : ""}`} />
            </button>
            {showHistory && (
              <article className="mt-5 space-y-3 border-t border-border pt-5 text-sm leading-relaxed text-foreground/80">
                <h3 className="font-display text-2xl text-earth">L'histoire de {c.name}</h3>
                {c.history.map((p, i) => <p key={i}>{p}</p>)}
              </article>
            )}
          </div>
        </div>
      </div>

      {/* AVIS */}
      <section className="mt-20 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <span className="ornament text-xs tracking-brand">AVIS CLIENTS</span>
          <h2 className="mt-3 font-display text-4xl text-earth">Ce qu'ils en pensent</h2>
          <div className="mt-8 space-y-5">
            {reviews.length === 0 && <p className="text-sm text-muted-foreground">Aucun avis pour le moment. Soyez le premier !</p>}
            {reviews.map((rv, i) => (
              <article key={i} className="rounded-sm border border-border bg-card p-5">
                <header className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-earth">{rv.author}</div>
                    <div className="text-xs text-muted-foreground">{rv.date}</div>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map((i2) => (
                      <Star key={i2} className={`h-4 w-4 ${i2 <= rv.rating ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                </header>
                <p className="mt-3 text-sm text-foreground/80">{rv.text}</p>
              </article>
            ))}
          </div>
        </div>

        <ReviewForm onSubmit={(r) => setReviews((prev) => [r, ...prev])} />
      </section>
    </div>
  );
}

function ReviewForm({ onSubmit }: { onSubmit: (r: Review) => void }) {
  const [rating, setRating] = useState(5);
  return (
    <aside className="h-fit rounded-sm border border-border bg-honey/30 p-6">
      <div className="flex items-center gap-2 text-clay">
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs tracking-brand">LAISSER UN AVIS</span>
      </div>
      <form
        className="mt-4 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          onSubmit({
            author: String(f.get("author") || "Anonyme").slice(0, 80),
            text: String(f.get("text") || "").slice(0, 600),
            rating,
            date: new Date().toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
          });
          (e.target as HTMLFormElement).reset();
          setRating(5);
        }}
      >
        <input name="author" required maxLength={80} placeholder="Votre nom" className="rounded-sm border border-input bg-card px-3 py-2 text-sm" />
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map((i) => (
            <button key={i} type="button" onClick={() => setRating(i)} aria-label={`${i} étoile`} className="p-1">
              <Star className={`h-5 w-5 ${i <= rating ? "fill-accent text-accent" : "text-border"}`} />
            </button>
          ))}
        </div>
        <textarea name="text" required maxLength={600} rows={4} placeholder="Votre commentaire..." className="rounded-sm border border-input bg-card px-3 py-2 text-sm" />
        <button className="rounded-sm bg-earth px-4 py-2.5 text-sm tracking-wide text-cream hover:bg-earth/90">Publier</button>
      </form>
    </aside>
  );
}
