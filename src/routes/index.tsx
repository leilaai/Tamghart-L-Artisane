import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-artisane.jpg";
import textile from "@/assets/textile-amazigh.jpg";
import { artisanes, creations } from "@/lib/data";
import { ArrowRight, Search, Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tamghart l'Artisane — Héritage des femmes amazighes" },
      { name: "description", content: "Découvrez les créations uniques des femmes artisanes amazighes du Maroc." },
    ],
  }),
  component: Home,
});

const pillars = [
  { title: "Patrimoine et tradition", desc: "Des motifs et techniques transmis depuis des siècles.", bg: "bg-earth text-cream", to: "/galerie" as const },
  { title: "Savoir-faire artisanal", desc: "Chaque pièce, faite main, est unique.", bg: "bg-clay text-cream", to: "/artisanes" as const },
  { title: "Créations authentiques", desc: "Aucun intermédiaire, aucune copie.", bg: "bg-sand text-earth", to: "/creations" as const },
  { title: "Femmes inspirantes", desc: "Soutenir leurs ateliers, c'est soutenir leurs villages.", bg: "bg-honey text-earth", to: "/artisanes" as const },
];

function Home() {
  const [q, setQ] = useState("");
  const term = q.toLowerCase().trim();
  const results = useMemo(() => {
    if (!term) return null;
    return {
      creations: creations.filter((c) => c.name.toLowerCase().includes(term) || c.category.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)),
      artisanes: artisanes.filter((a) => a.name.toLowerCase().includes(term) || a.craft.toLowerCase().includes(term) || a.region.toLowerCase().includes(term)),
    };
  }, [term]);
  const { isFavorite, toggleFavorite } = useStore();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="ornament text-xs tracking-brand">ⵜⴰⵎⵖⴰⵔⵜ</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-earth md:text-7xl">
              Célébrons le savoir-faire des femmes amazighes
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Découvrez des créations uniques, porteuses d'histoire, de traditions et d'une beauté héritée de génération en génération.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/creations" className="inline-flex items-center gap-2 rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream transition-all hover:bg-earth/90">
                Découvrir le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/galerie" className="inline-flex items-center gap-2 rounded-sm border border-earth/30 px-6 py-3 text-sm tracking-wide text-earth transition-all hover:bg-sand">
                Explorer la culture
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 amazigh-pattern" aria-hidden />
            <img src={hero} alt="Femme amazighe tissant un tapis traditionnel" width={1600} height={1200} className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 amazigh-pattern" aria-hidden />
          </div>
        </div>
      </section>

      {/* RECHERCHE FILTRÉE */}
      <section id="recherche" className="scroll-mt-24 bg-cream py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="ornament text-xs tracking-brand">EXPLORER</span>
            <h2 className="mt-4 font-display text-4xl text-earth md:text-5xl">Trouvez une création, une artisane</h2>
          </div>
          <div className="relative mx-auto mt-8 max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tapis, bijoux, poterie, Fatima, Atlas..."
              className="w-full rounded-sm border border-input bg-card py-4 pl-12 pr-4 text-base placeholder:text-muted-foreground focus:border-clay focus:outline-none"
            />
          </div>

          {results && (
            <div className="mt-10 space-y-10">
              <div>
                <h3 className="mb-4 text-xs tracking-brand text-muted-foreground">CRÉATIONS · {results.creations.length}</h3>
                {results.creations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune création trouvée.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {results.creations.slice(0, 8).map((c) => (
                      <Link key={c.id} to="/creations/$id" params={{ id: c.id }} className="group bg-card p-3 hover:shadow-md">
                        <img src={c.image} alt={c.name} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />
                        <div className="pt-2 font-display text-base text-earth">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.category} · {c.price} MAD</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="mb-4 text-xs tracking-brand text-muted-foreground">ARTISANES · {results.artisanes.length}</h3>
                {results.artisanes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune artisane trouvée.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {results.artisanes.map((a) => (
                      <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group flex gap-3 bg-card p-3 hover:shadow-md">
                        <img src={a.image} alt={a.name} width={120} height={120} loading="lazy" className="h-20 w-20 shrink-0 object-cover" />
                        <div>
                          <div className="font-display text-lg text-earth">{a.name}</div>
                          <div className="text-xs text-muted-foreground">{a.craft}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PILIERS — cliquables */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
          {pillars.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className={`${c.bg} group relative aspect-[3/4] overflow-hidden rounded-sm p-6 transition-transform hover:-translate-y-1`}
            >
              <h3 className="font-display text-2xl leading-tight">{c.title}</h3>
              <p className="mt-3 text-sm opacity-80">{c.desc}</p>
              <span className="absolute bottom-6 left-6 text-xs tracking-brand opacity-90 transition-opacity group-hover:opacity-100">DÉCOUVRIR →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ARTISANES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="ornament text-xs tracking-brand">PORTRAITS</span>
            <h2 className="mt-4 font-display text-4xl text-earth md:text-5xl">Les artisanes</h2>
          </div>
          <Link to="/artisanes" className="text-sm tracking-brand text-accent hover:underline">VOIR TOUTES →</Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {artisanes.map((a) => (
            <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group block">
              <div className="overflow-hidden rounded-sm">
                <img src={a.image} alt={a.name} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 font-display text-xl text-earth">{a.name}</h3>
              <p className="text-xs text-muted-foreground">{a.craft}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CRÉATIONS PREVIEW — cliquables + favoris */}
      <section className="bg-honey/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="ornament text-xs tracking-brand">COLLECTION</span>
              <h2 className="mt-4 font-display text-4xl text-earth md:text-5xl">Créations en vedette</h2>
            </div>
            <Link to="/creations" className="text-sm tracking-brand text-accent hover:underline">CATALOGUE COMPLET →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {creations.slice(0, 6).map((c) => {
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
                    <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
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
        </div>
      </section>

      {/* CULTURE BANNER */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 overflow-hidden rounded-sm bg-earth md:grid-cols-2">
          <img src={textile} alt="Textile amazigh aux motifs géométriques" width={1200} height={900} loading="lazy" className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-10 text-cream md:p-16">
            <span className="ornament text-xs tracking-brand text-clay">CULTURE</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Symboles, motifs et mémoire</h2>
            <p className="mt-4 text-cream/80">
              Chaque ligne tissée, chaque tatouage, chaque bijou raconte une histoire. Plongez dans l'univers amazigh.
            </p>
            <Link to="/galerie" className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-clay px-6 py-3 text-sm tracking-wide text-cream hover:bg-clay/90">
              Visiter la galerie <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
