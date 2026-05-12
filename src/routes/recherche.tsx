import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { creations, artisanes } from "@/lib/data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/recherche")({
  head: () => ({ meta: [{ title: "Recherche — Tamghart" }] }),
  component: RecherchePage,
});

function RecherchePage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return { creations: [], artisanes: [] };
    return {
      creations: creations.filter((c) => c.name.toLowerCase().includes(term) || c.category.toLowerCase().includes(term)),
      artisanes: artisanes.filter((a) => a.name.toLowerCase().includes(term) || a.craft.toLowerCase().includes(term) || a.region.toLowerCase().includes(term)),
    };
  }, [q]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">EXPLORER</span>
      <h1 className="mt-4 font-display text-5xl text-earth">Recherche</h1>

      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tapis, bijoux, Fatima, Atlas..."
          className="w-full rounded-sm border border-input bg-card py-4 pl-12 pr-4 text-base placeholder:text-muted-foreground focus:border-clay focus:outline-none"
        />
      </div>

      {q && (
        <div className="mt-12 space-y-12">
          <section>
            <h2 className="mb-4 text-xs tracking-brand text-muted-foreground">CRÉATIONS · {results.creations.length}</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {results.creations.map((c) => (
                <Link key={c.id} to="/creations" className="group bg-card p-3 hover:shadow-md">
                  <img src={c.image} alt={c.name} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />
                  <div className="pt-2 font-display text-lg text-earth">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.category}</div>
                </Link>
              ))}
              {results.creations.length === 0 && <p className="text-sm text-muted-foreground">Aucune création.</p>}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-xs tracking-brand text-muted-foreground">ARTISANES · {results.artisanes.length}</h2>
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
              {results.artisanes.length === 0 && <p className="text-sm text-muted-foreground">Aucune artisane.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
