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

function Home() {
  const { t, ti } = useI18n();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("Tous");

  // Build filter options: categories + regions + artisan names
  const filterGroups = useMemo(() => {
    const regions = Array.from(new Set(artisanes.map((a) => a.region)));
    const names = artisanes.map((a) => a.name);
    return {
      cats: ["Tous", "Tapis", "Bijoux", "Broderie", "Poterie"],
      regions,
      names,
    };
  }, []);

  const term = q.toLowerCase().trim();
  const hasFilter = term.length > 0 || filter !== "Tous";

  const results = useMemo(() => {
    if (!hasFilter) return null;
    const matchTerm = (s: string) => !term || s.toLowerCase().includes(term);
    const isCat = filterGroups.cats.includes(filter);
    const isRegion = filterGroups.regions.includes(filter);
    const isName = filterGroups.names.includes(filter);

    const matchedArtisanes = artisanes.filter((a) => {
      if (isRegion && a.region !== filter) return false;
      if (isName && a.name !== filter) return false;
      return matchTerm(a.name) || matchTerm(a.craft) || matchTerm(a.region);
    });
    const allowedArtisanIds = new Set(matchedArtisanes.map((a) => a.id));

    const matchedCreations = creations.filter((c) => {
      if (isCat && filter !== "Tous" && c.category !== filter) return false;
      if (isRegion && !allowedArtisanIds.has(c.artisaneId)) return false;
      if (isName && !allowedArtisanIds.has(c.artisaneId)) return false;
      return matchTerm(c.name) || matchTerm(c.category) || matchTerm(c.description);
    });

    return { creations: matchedCreations, artisanes: matchedArtisanes };
  }, [term, filter, hasFilter, filterGroups]);

  const { isFavorite, toggleFavorite } = useStore();

  const pillars = [
    { title: t("pillars.1.t"), desc: t("pillars.1.d"), bg: "bg-earth text-cream", to: "/galerie" as const },
    { title: t("pillars.2.t"), desc: t("pillars.2.d"), bg: "bg-clay text-cream", to: "/artisanes" as const },
    { title: t("pillars.3.t"), desc: t("pillars.3.d"), bg: "bg-sand text-earth", to: "/creations" as const },
    { title: t("pillars.4.t"), desc: t("pillars.4.d"), bg: "bg-honey text-earth", to: "/artisanes" as const },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="ornament text-xs tracking-brand">{t("hero.kicker")}</span>
            <h1 className="mt-6 font-display text-3xl leading-[1.1] text-earth sm:text-5xl md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("hero.desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/creations" className="inline-flex items-center gap-2 rounded-sm bg-earth px-5 py-3 text-sm tracking-wide text-cream transition-all hover:bg-earth/90 sm:px-6">
                {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/galerie" className="inline-flex items-center gap-2 rounded-sm border border-earth/30 px-5 py-3 text-sm tracking-wide text-earth transition-all hover:bg-sand sm:px-6">
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 amazigh-pattern sm:-left-6 sm:-top-6 sm:h-32 sm:w-32" aria-hidden />
            <img src={hero} alt="Femme amazighe tissant un tapis traditionnel" width={1600} height={1200} className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-2xl" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 amazigh-pattern sm:-bottom-6 sm:-right-6 sm:h-32 sm:w-32" aria-hidden />
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section aria-label="Nos valeurs" className="bg-sand/40 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:gap-5 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className={`${c.bg} group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-sm p-5 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <div>
                <h3 className="font-display text-xl leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm opacity-85">{c.desc}</p>
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <AmazighOrnament className="h-5 w-20 opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-xs tracking-brand opacity-90">{t("pillars.cta")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ARTISANES */}
      <section aria-labelledby="artisans-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="ornament text-xs tracking-brand">{t("artisans.kicker")}</span>
            <h2 id="artisans-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("artisans.title")}</h2>
          </div>
          <Link to="/artisanes" className="text-sm tracking-brand text-accent hover:underline">{t("artisans.all")}</Link>
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
      <section aria-labelledby="creations-title" className="bg-honey/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="ornament text-xs tracking-brand">{t("creations.kicker")}</span>
              <h2 id="creations-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("creations.title")}</h2>
            </div>
            <Link to="/creations" className="text-sm tracking-brand text-accent hover:underline">{t("creations.all")}</Link>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
      <section aria-labelledby="culture-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-0 overflow-hidden rounded-sm bg-earth md:grid-cols-2">
          <img src={textile} alt="Textile amazigh aux motifs géométriques" width={1200} height={900} loading="lazy" className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-6 text-cream sm:p-8 md:p-16">
            <span className="ornament text-xs tracking-brand text-clay">{t("culture.kicker")}</span>
            <h2 id="culture-title" className="mt-4 font-display text-3xl md:text-5xl">{t("culture.title")}</h2>
            <p className="mt-4 text-cream/80">{t("culture.desc")}</p>
            <Link to="/galerie" className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-clay px-5 py-3 text-sm tracking-wide text-cream hover:bg-clay/90 sm:px-6">
              {t("culture.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTIQUES — cards harmonisées (cream + bordure marron) */}
      <section aria-labelledby="stats-title" className="bg-sand/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="ornament text-xs tracking-brand">{t("stats.kicker")}</span>
            <h2 id="stats-title" className="mt-4 font-display text-3xl text-earth md:text-5xl">{t("stats.title")}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { n: stats.artisanes, label: t("stats.artisans"), sub: t("stats.artisans.sub") },
              { n: stats.creations, label: t("stats.creations"), sub: t("stats.creations.sub") },
              { n: stats.ventes, label: t("stats.sales"), sub: t("stats.sales.sub") },
            ].map((s) => (
              <div key={s.label} className="rounded-sm border-2 border-earth/70 bg-cream p-8 text-center shadow-sm">
                <div className="font-display text-5xl text-earth md:text-6xl">{s.n.toLocaleString("fr-FR")}</div>
                <div className="mt-3 text-xs tracking-brand text-earth/80">{s.label.toUpperCase()}</div>
                <div className="mt-2 text-sm text-earth/60">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉO — héritage en mouvement */}
      <section aria-label="Vidéo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="ornament text-xs tracking-brand">VIDÉO</span>
          <h2 className="mt-4 font-display text-3xl text-earth md:text-5xl">Le geste, la main, la mémoire</h2>
        </div>
        <div className="mx-auto mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-sm bg-earth shadow-xl">
          <video
            controls
            preload="metadata"
            poster={textile}
            className="h-full w-full object-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-a-craftswoman-weaving-a-rug-2483/1080p.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* RECHERCHE — déplacée avant le footer */}
      <section id="recherche" aria-labelledby="search-title" className="scroll-mt-24 bg-cream py-16 sm:py-20">
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
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-full w-full appearance-none rounded-sm border border-input bg-card py-4 pl-11 pr-8 text-sm tracking-wide text-earth focus:border-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:w-64"
              >
                <optgroup label={t("search.filter")}>
                  {filterGroups.cats.map((c) => <option key={c} value={c}>{ti("cat", c)}</option>)}
                </optgroup>
                <optgroup label="Régions">
                  {filterGroups.regions.map((r) => <option key={r} value={r}>{ti("region", r)}</option>)}
                </optgroup>
                <optgroup label={t("search.artisans")}>
                  {filterGroups.names.map((n) => <option key={n} value={n}>{n}</option>)}
                </optgroup>
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
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
              <div>
                <h3 className="mb-4 text-xs tracking-brand text-muted-foreground">{t("search.artisans")} · {results.artisanes.length}</h3>
                {results.artisanes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("search.none.artisans")}</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {results.artisanes.map((a) => (
                      <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group flex gap-3 bg-card p-3 hover:shadow-md">
                        <img src={a.image} alt={a.name} width={120} height={120} loading="lazy" className="h-20 w-20 shrink-0 object-cover" />
                        <div className="min-w-0">
                          <div className="font-display text-lg text-earth">{a.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{ti("craft", a.craft)}</div>
                          <div className="text-xs text-muted-foreground truncate">{ti("region", a.region)}</div>
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
    </div>
  );
}
