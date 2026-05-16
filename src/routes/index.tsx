import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-artisane.jpg";
import textile from "@/assets/textile-amazigh.jpg";
import { artisanes, creations, stats } from "@/lib/data";
import { ArrowRight, Search, Heart, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { AmazighOrnament } from "@/components/AmazighOrnament";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tamghart l'Artisane — Héritage des femmes amazighes" },
      { name: "description", content: "Découvrez les créations uniques des femmes artisanes amazighes du Maroc." },
    ],
  }),
  component: Home,
});

const categories = ["Tous", "Tapis", "Bijoux", "Broderie", "Poterie"] as const;

function Home() {
  const { t, ti } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("Tous");
  const term = q.toLowerCase().trim();
  const hasFilter = term.length > 0 || cat !== "Tous";

  const results = useMemo(() => {
    if (!hasFilter) return null;
    const matchTerm = (s: string) => !term || s.toLowerCase().includes(term);
    return {
      creations: creations.filter((c) => (cat === "Tous" || c.category === cat) && (matchTerm(c.name) || matchTerm(c.category) || matchTerm(c.description))),
      artisanes: artisanes.filter((a) => matchTerm(a.name) || matchTerm(a.craft) || matchTerm(a.region)),
    };
  }, [term, cat, hasFilter]);
  const { isFavorite, toggleFavorite } = useStore();

  const pillars = [
    { title: t("pillars.1.t"), desc: t("pillars.1.d"), bg: "bg-earth text-cream", to: "/galerie" as const },
    { title: t("pillars.2.t"), desc: t("pillars.2.d"), bg: "bg-clay text-cream", to: "/artisanes" as const },
    { title: t("pillars.3.t"), desc: t("pillars.3.d"), bg: "bg-sand text-earth", to: "/creations" as const },
    { title: t("pillars.4.t"), desc: t("pillars.4.d"), bg: "bg-honey text-earth", to: "/artisanes" as const },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="ornament text-xs tracking-brand">{t("hero.kicker")}</span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-earth sm:text-5xl md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("hero.desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/creations" className="inline-flex items-center gap-2 rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream transition-all hover:bg-earth/90">
                {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/galerie" className="inline-flex items-center gap-2 rounded-sm border border-earth/30 px-6 py-3 text-sm tracking-wide text-earth transition-all hover:bg-sand">
                {t("hero.cta2")}
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

      {/* RECHERCHE FILTRÉE — entonnoir */}
      <section id="recherche" aria-labelledby="search-title" className="scroll-mt-24 bg-cream py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="ornament text-xs tracking-brand">{t("search.kicker")}</span>
            <h2 id="search-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("search.title")}</h2>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="home-search" className="sr-only">{t("search.title")}</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" aria-hidden />
              <input
                id="home-search"
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 100))}
                maxLength={100}
                placeholder={t("search.placeholder")}
                className="w-full rounded-sm border border-input bg-card py-4 pl-12 pr-4 text-base placeholder:text-muted-foreground focus:border-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              />
            </div>
            <div className="relative">
              <label htmlFor="home-filter" className="sr-only">{t("search.filter")}</label>
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" aria-hidden />
              <select
                id="home-filter"
                value={cat}
                onChange={(e) => setCat(e.target.value as typeof cat)}
                className="h-full w-full appearance-none rounded-sm border border-input bg-card py-4 pl-11 pr-8 text-sm tracking-wide text-earth focus:border-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:w-48"
              >
                {categories.map((c) => <option key={c} value={c}>{t("search.filter")} : {ti("cat", c)}</option>)}
              </select>
            </div>
          </div>

          {results && (
            <div className="mt-10 space-y-10">
              <div>
                <h3 className="mb-4 text-xs tracking-brand text-muted-foreground">{t("search.creations")} · {results.creations.length}</h3>
                {results.creations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("search.none.creations")}</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {results.creations.slice(0, 8).map((c) => (
                      <Link key={c.id} to="/creations/$id" params={{ id: c.id }} className="group bg-card p-3 hover:shadow-md">
                        <img src={c.image} alt={c.name} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />
                        <div className="pt-2 font-display text-base text-earth">{ti("name", c.name)}</div>
                        <div className="text-xs text-muted-foreground">{ti("cat", c.category)} · {c.price} MAD</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {cat === "Tous" && (
                <div>
                  <h3 className="mb-4 text-xs tracking-brand text-muted-foreground">{t("search.artisans")} · {results.artisanes.length}</h3>
                  {results.artisanes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("search.none.artisans")}</p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {results.artisanes.map((a) => (
                        <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group flex gap-3 bg-card p-3 hover:shadow-md">
                          <img src={a.image} alt={a.name} width={120} height={120} loading="lazy" className="h-20 w-20 shrink-0 object-cover" />
                          <div>
                            <div className="font-display text-lg text-earth">{a.name}</div>
                            <div className="text-xs text-muted-foreground">{ti("craft", a.craft)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* PILIERS — rectangles plus courts */}
      <section aria-label="Nos valeurs" className="bg-sand/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className={`${c.bg} group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-sm p-5 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <div>
                <h3 className="font-display text-xl leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm opacity-85">{c.desc}</p>
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <AmazighOrnament className="h-5 w-24 opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-xs tracking-brand opacity-90">{t("pillars.cta")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ARTISANES */}
      <section aria-labelledby="artisans-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="ornament text-xs tracking-brand">{t("artisans.kicker")}</span>
            <h2 id="artisans-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("artisans.title")}</h2>
          </div>
          <Link to="/artisanes" className="text-sm tracking-brand text-accent hover:underline">{t("artisans.all")}</Link>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {artisanes.map((a) => (
            <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group block">
              <div className="overflow-hidden rounded-sm">
                <img src={a.image} alt={a.name} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 font-display text-lg text-earth md:text-xl">{a.name}</h3>
              <p className="text-xs text-muted-foreground">{ti("craft", a.craft)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CRÉATIONS PREVIEW */}
      <section aria-labelledby="creations-title" className="bg-honey/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="ornament text-xs tracking-brand">{t("creations.kicker")}</span>
              <h2 id="creations-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("creations.title")}</h2>
            </div>
            <Link to="/creations" className="text-sm tracking-brand text-accent hover:underline">{t("creations.all")}</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {creations.slice(0, 6).map((c) => {
              const fav = isFavorite(c.id);
              return (
                <article key={c.id} className="group relative bg-card p-4 transition-shadow hover:shadow-lg">
                  <button
                    onClick={() => toggleFavorite(c.id)}
                    aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
                    aria-pressed={fav}
                    className="absolute right-6 top-6 z-10 rounded-full bg-cream/90 p-2 backdrop-blur transition-colors hover:bg-cream"
                  >
                    <Heart className={`h-4 w-4 ${fav ? "fill-accent text-accent" : "text-earth"}`} />
                  </button>
                  <Link to="/creations/$id" params={{ id: c.id }}>
                    <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    <div className="flex items-end justify-between pt-4">
                      <div>
                        <h3 className="font-display text-xl text-earth">{ti("name", c.name)}</h3>
                        <p className="text-xs text-muted-foreground">{ti("cat", c.category)}</p>
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
      <section aria-labelledby="culture-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 overflow-hidden rounded-sm bg-earth md:grid-cols-2">
          <img src={textile} alt="Textile amazigh aux motifs géométriques" width={1200} height={900} loading="lazy" className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-8 text-cream md:p-16">
            <span className="ornament text-xs tracking-brand text-clay">{t("culture.kicker")}</span>
            <h2 id="culture-title" className="mt-4 font-display text-3xl md:text-5xl">{t("culture.title")}</h2>
            <p className="mt-4 text-cream/80">{t("culture.desc")}</p>
            <Link to="/galerie" className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-clay px-6 py-3 text-sm tracking-wide text-cream hover:bg-clay/90">
              {t("culture.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTIQUES — déplacé sous Culture */}
      <section aria-labelledby="stats-title" className="bg-sand/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="ornament text-xs tracking-brand">{t("stats.kicker")}</span>
            <h2 id="stats-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("stats.title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { n: stats.artisanes, label: t("stats.artisans"), sub: t("stats.artisans.sub") },
              { n: stats.creations, label: t("stats.creations"), sub: t("stats.creations.sub") },
              { n: stats.ventes, label: t("stats.sales"), sub: t("stats.sales.sub") },
            ].map((s) => (
              <div key={s.label} className="rounded-sm border border-border bg-card p-8 text-center">
                <div className="font-display text-5xl text-earth md:text-6xl">{s.n.toLocaleString("fr-FR")}</div>
                <div className="mt-3 text-xs tracking-brand text-clay">{s.label.toUpperCase()}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
