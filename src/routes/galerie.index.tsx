import { createFileRoute, Link } from "@tanstack/react-router";
import { symboles, articles } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/galerie/")({
  head: () => ({
    meta: [
      { title: "Galerie culturelle amazighe — Tamghart" },
      { name: "description", content: "Symboles, motifs et traditions du peuple amazigh." },
    ],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  const { t } = useI18n();
  return (
    <div>
      <section className="bg-earth py-20 text-cream">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="ornament text-xs tracking-brand text-clay">ⵜⴰⴷⵍⵙⴰ</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{t("culture.title")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-cream/80">{t("culture.desc")}</p>
        </div>
      </section>

      {/* ARTICLES — placés au-dessus */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 font-display text-4xl text-earth">{t("culture.articles")}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((art) => (
              <Link
                key={art.slug}
                to="/galerie/$slug"
                params={{ slug: art.slug }}
                className="group block overflow-hidden bg-card transition-shadow hover:shadow-xl"
              >
                <img src={art.image} alt={art.title} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="p-8">
                  <h3 className="font-display text-2xl text-earth">{art.title}</h3>
                  <p className="mt-3 text-sm text-foreground/80">{art.excerpt}</p>
                  <span className="mt-5 inline-block text-xs tracking-brand text-accent group-hover:underline">{t("culture.read")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SYMBOLES — placés en dessous */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 font-display text-4xl text-earth">{t("culture.symbols")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {symboles.map((s) => (
            <div key={s.name} className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-clay">
              <div className="font-display text-3xl text-clay">{s.name}</div>
              <p className="mt-3 text-sm text-foreground/80">{s.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
