import { createFileRoute, Link } from "@tanstack/react-router";
import { creations, artisanes } from "@/lib/data";
import { useState } from "react";

const categories = ["Tout", "Tapis", "Bijoux", "Broderie", "Poterie"] as const;

export const Route = createFileRoute("/creations")({
  head: () => ({
    meta: [
      { title: "Catalogue des créations — Tamghart" },
      { name: "description", content: "Tapis, bijoux, broderies — pièces uniques faites main par les femmes amazighes." },
    ],
  }),
  component: CreationsPage,
});

function CreationsPage() {
  const [filter, setFilter] = useState<typeof categories[number]>("Tout");
  const list = filter === "Tout" ? creations : creations.filter((c) => c.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <span className="ornament text-xs tracking-brand">COLLECTION</span>
        <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">Catalogue des créations</h1>
        <p className="mt-4 text-muted-foreground">Filtrez par type d'artisanat. Chaque pièce est unique et faite main.</p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2 text-xs tracking-brand transition-colors ${
              filter === c ? "bg-earth text-cream" : "bg-sand text-earth hover:bg-clay/30"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const a = artisanes.find((x) => x.id === c.artisaneId);
          return (
            <article key={c.id} className="group bg-card p-4 transition-shadow hover:shadow-xl">
              <div className="relative overflow-hidden">
                <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] tracking-brand ${c.available ? "bg-honey text-earth" : "bg-clay text-cream"}`}>
                  {c.available ? "DISPONIBLE" : "SUR COMMANDE"}
                </span>
              </div>
              <div className="pt-5">
                <h3 className="font-display text-xl text-earth">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.category} · par{" "}
                  {a && <Link to="/artisanes/$id" params={{ id: a.id }} className="text-clay hover:underline">{a.name}</Link>}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl text-accent">{c.price} MAD</span>
                  <button className="rounded-sm bg-earth px-4 py-2 text-xs tracking-brand text-cream hover:bg-earth/90">VOIR LE DÉTAIL</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
