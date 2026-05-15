import { createFileRoute } from "@tanstack/react-router";
import { artisanes as initial, type Artisane } from "@/lib/data";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/artisanes")({
  component: AdminArtisanes,
});

function AdminArtisanes() {
  const [list, setList] = useState<Artisane[]>(initial);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-earth">Gestion des artisanes</h1>
          <p className="mt-2 text-sm text-muted-foreground">{list.length} artisanes référencées.</p>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-sm bg-earth px-5 py-3 text-xs tracking-brand text-cream hover:bg-earth/90">
          <Plus className="h-4 w-4" /> AJOUTER
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-xs tracking-brand text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">ARTISANE</th>
              <th className="px-4 py-3 text-left">RÉGION</th>
              <th className="px-4 py-3 text-left">SAVOIR-FAIRE</th>
              <th className="px-4 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((a) => (
              <tr key={a.id} className="hover:bg-honey/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={a.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-display text-base text-earth">{a.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground/70">{a.region}</td>
                <td className="px-4 py-3 text-foreground/70">{a.craft}</td>
                <td className="px-4 py-3 text-right">
                  <button className="mr-2 inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1 text-xs hover:bg-sand"><Pencil className="h-3 w-3" /> Modifier</button>
                  <button onClick={() => setList((p) => p.filter((x) => x.id !== a.id))} className="inline-flex items-center gap-1 rounded-sm border border-destructive/30 px-3 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /> Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-earth/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-sm bg-card p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl text-earth">Nouvelle artisane</h2>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="rounded-sm p-1 hover:bg-sand"><X className="h-4 w-4" /></button>
            </div>
            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const firstName = String(f.get("firstName") || "");
                const lastName = String(f.get("lastName") || "");
                const newA: Artisane = {
                  id: `${firstName}-${lastName}`.toLowerCase().replace(/\s+/g, "-") || `artisane-${Date.now()}`,
                  firstName, lastName,
                  name: `${firstName} ${lastName}`,
                  region: String(f.get("region") || ""),
                  craft: String(f.get("craft") || ""),
                  bio: String(f.get("bio") || ""),
                  image: String(f.get("image") || "/placeholder.svg"),
                  experienceYears: Number(f.get("experienceYears") || 0),
                  experience: `${Number(f.get("experienceYears") || 0)} ans d'expérience`,
                };
                setList((p) => [...p, newA]);
                setOpen(false);
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <input name="firstName" required placeholder="Prénom" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
                <input name="lastName" required placeholder="Nom" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              </div>
              <input name="region" required placeholder="Région (Haut Atlas, Tiznit...)" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <input name="craft" required placeholder="Savoir-faire (Tissage, Bijoux...)" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <input name="experienceYears" type="number" min={1} max={80} required placeholder="Années d'expérience" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
              <textarea name="bio" required rows={3} maxLength={500} placeholder="Biographie courte" className="rounded-sm border border-input bg-cream px-3 py-2 text-sm" />
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
