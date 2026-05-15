import { createFileRoute } from "@tanstack/react-router";
import { creations as initial, artisanes, type Creation } from "@/lib/data";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/creations")({
  component: AdminCreations,
});

function AdminCreations() {
  const [list, setList] = useState<Creation[]>(initial);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-earth">Gestion des créations</h1>
          <p className="mt-2 text-sm text-muted-foreground">{list.length} pièces dans le catalogue.</p>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-sm bg-earth px-5 py-3 text-xs tracking-brand text-cream hover:bg-earth/90">
          <Plus className="h-4 w-4" /> AJOUTER
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
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
                    <button onClick={() => setList((p) => p.filter((x) => x.id !== c.id))} className="rounded-sm border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-earth/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-sm bg-card p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl text-earth">Nouvelle création</h2>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="rounded-sm p-1 hover:bg-sand"><X className="h-4 w-4" /></button>
            </div>
            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const newC: Creation = {
                  id: `creation-${Date.now()}`,
                  name: String(f.get("name") || ""),
                  artisaneId: String(f.get("artisaneId") || artisanes[0].id),
                  category: f.get("category") as Creation["category"],
                  price: Number(f.get("price") || 0),
                  image: String(f.get("image") || "/placeholder.svg"),
                  available: true,
                  description: String(f.get("description") || ""),
                  funFact: String(f.get("funFact") || ""),
                  history: [String(f.get("description") || "")],
                  reviews: [],
                };
                setList((p) => [newC, ...p]);
                setOpen(false);
              }}
            >
              <input name="name" required placeholder="Nom de la création" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select name="category" required className="rounded-sm border border-input bg-cream px-3 py-2 text-sm">
                  {(["Tapis","Bijoux","Broderie","Poterie"] as const).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input name="price" type="number" min={1} required placeholder="Prix (MAD)" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              </div>
              <select name="artisaneId" required className="rounded-sm border border-input bg-cream px-3 py-2 text-sm">
                {artisanes.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              <textarea name="description" required rows={3} maxLength={400} placeholder="Description" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <input name="funFact" maxLength={200} placeholder="Le saviez-vous ? (anecdote)" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <input name="image" placeholder="URL image (optionnel)" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <div className="mt-2 flex gap-3">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-sm border border-border px-4 py-2.5 text-sm hover:bg-sand">Annuler</button>
                <button type="submit" className="flex-1 rounded-sm bg-earth px-4 py-2.5 text-sm tracking-wide text-cream hover:bg-earth/90">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
