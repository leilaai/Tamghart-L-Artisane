import { createFileRoute } from "@tanstack/react-router";
import { creations, artisanes } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/creations")({
  component: AdminCreations,
});

function AdminCreations() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-earth">Gestion des créations</h1>
          <p className="mt-2 text-sm text-muted-foreground">{creations.length} pièces dans le catalogue.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-sm bg-earth px-5 py-3 text-xs tracking-brand text-cream hover:bg-earth/90">
          <Plus className="h-4 w-4" /> AJOUTER
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creations.map((c) => {
          const a = artisanes.find((x) => x.id === c.artisaneId);
          return (
            <article key={c.id} className="overflow-hidden rounded-sm border border-border bg-card">
              <img src={c.image} alt={c.name} className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-lg text-earth">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.category} · {a?.name}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-base text-accent">{c.price} MAD</span>
                  <div className="flex gap-1">
                    <button className="rounded-sm border border-border p-1.5 hover:bg-sand"><Pencil className="h-3.5 w-3.5" /></button>
                    <button className="rounded-sm border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
