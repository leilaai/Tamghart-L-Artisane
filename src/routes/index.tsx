import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-artisane.jpg";
import collection from "@/assets/creations-collection.jpg";
import textile from "@/assets/textile-amazigh.jpg";
import { artisanes, creations } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tamghart l'Artisane — Héritage des femmes amazighes" },
      { name: "description", content: "Découvrez les créations uniques des femmes artisanes amazighes du Maroc." },
    ],
  }),
  component: Home,
});

function Home() {
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

      {/* PILIERS */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
          {[
            { title: "Patrimoine et tradition", desc: "Des motifs et techniques transmis depuis des siècles.", bg: "bg-earth text-cream" },
            { title: "Savoir-faire artisanal", desc: "Chaque pièce, faite main, est unique.", bg: "bg-clay text-cream" },
            { title: "Créations authentiques", desc: "Aucun intermédiaire, aucune copie.", bg: "bg-sand text-earth" },
            { title: "Femmes inspirantes", desc: "Soutenir leurs ateliers, c'est soutenir leurs villages.", bg: "bg-honey text-earth" },
          ].map((c) => (
            <article key={c.title} className={`${c.bg} group relative aspect-[3/4] overflow-hidden rounded-sm p-6`}>
              <h3 className="font-display text-2xl leading-tight">{c.title}</h3>
              <p className="mt-3 text-sm opacity-80">{c.desc}</p>
              <span className="absolute bottom-6 left-6 text-xs tracking-brand opacity-90">DÉCOUVRIR →</span>
            </article>
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
        <div className="grid gap-8 md:grid-cols-3">
          {artisanes.map((a) => (
            <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group block">
              <div className="overflow-hidden rounded-sm">
                <img src={a.image} alt={a.name} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-earth">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.craft} · {a.region}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CRÉATIONS PREVIEW */}
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
            {creations.slice(0, 3).map((c) => (
              <article key={c.id} className="bg-card p-4 transition-shadow hover:shadow-lg">
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
