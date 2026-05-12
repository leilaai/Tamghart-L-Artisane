import { createFileRoute } from "@tanstack/react-router";
import { symboles } from "@/lib/data";
import textile from "@/assets/textile-amazigh.jpg";
import collection from "@/assets/creations-collection.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie culturelle amazighe — Tamghart" },
      { name: "description", content: "Symboles, motifs et traditions du peuple amazigh." },
    ],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  return (
    <div>
      <section className="bg-earth py-20 text-cream">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="ornament text-xs tracking-brand text-clay">ⵜⴰⴷⵍⵙⴰ</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Galerie culturelle amazighe</h1>
          <p className="mx-auto mt-6 max-w-2xl text-cream/80">
            Plongez dans la richesse symbolique et esthétique d'un peuple millénaire — ses motifs, ses traditions, ses voix.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 font-display text-4xl text-earth">Symboles & significations</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {symboles.map((s) => (
            <div key={s.name} className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-clay">
              <div className="font-display text-3xl text-clay">{s.name}</div>
              <p className="mt-3 text-sm text-foreground/80">{s.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 font-display text-4xl text-earth">Articles & traditions</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Le tissage, une écriture sans mots", img: textile, excerpt: "Comprendre comment les motifs des tapis Beni Ouarain se transmettent de mère en fille depuis le XVIᵉ siècle." },
              { title: "Bijoux d'argent, ancrage du féminin", img: collection, excerpt: "L'argent, le corail et l'ambre : matériaux protecteurs portés depuis l'enfance." },
            ].map((art) => (
              <article key={art.title} className="overflow-hidden bg-card">
                <img src={art.img} alt={art.title} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="p-8">
                  <h3 className="font-display text-2xl text-earth">{art.title}</h3>
                  <p className="mt-3 text-sm text-foreground/80">{art.excerpt}</p>
                  <button className="mt-5 text-xs tracking-brand text-accent hover:underline">LIRE L'ARTICLE →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
