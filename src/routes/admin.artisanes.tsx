import { createFileRoute } from "@tanstack/react-router";
import { artisanes } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/artisanes")({
  component: AdminArtisanes,
});

function AdminArtisanes() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-earth">Gestion des artisanes</h1>
          <p className="mt-2 text-sm text-muted-foreground">{artisanes.length} artisanes référencées.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-sm bg-earth px-5 py-3 text-xs tracking-brand text-cream hover:bg-earth/90">
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
            {artisanes.map((a) => (
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
                  <button className="inline-flex items-center gap-1 rounded-sm border border-destructive/30 px-3 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" /> Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
