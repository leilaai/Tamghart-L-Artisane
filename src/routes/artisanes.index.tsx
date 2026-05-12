import { createFileRoute, Link } from "@tanstack/react-router";
import { artisanes } from "@/lib/data";

export const Route = createFileRoute("/artisanes/")({
  head: () => ({
    meta: [
      { title: "Les artisanes — Tamghart" },
      { name: "description", content: "Rencontrez les femmes amazighes qui perpétuent un patrimoine vivant." },
    ],
  }),
  component: ArtisanesIndex,
});

function ArtisanesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <span className="ornament text-xs tracking-brand">CATALOGUE</span>
        <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">Les artisanes</h1>
        <p className="mt-4 text-muted-foreground">
          Chaque artisane porte une région, une technique, une mémoire. Découvrez leurs portraits et leurs créations.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {artisanes.map((a) => (
          <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group block">
            <div className="overflow-hidden">
              <img src={a.image} alt={a.name} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="pt-5">
              <h2 className="font-display text-2xl text-earth">{a.name}</h2>
              <p className="text-sm text-clay">{a.craft}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.region} · {a.experience}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
