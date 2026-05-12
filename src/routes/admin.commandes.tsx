import { createFileRoute } from "@tanstack/react-router";

const orders = [
  { id: "CMD-2041", client: "Sophie M.", artisane: "Fatima Azuli", item: "Tapis sur mesure 2x3m", date: "12 mai", status: "En cours", color: "bg-honey text-earth" },
  { id: "CMD-2040", client: "Karim B.", artisane: "Lalla Itto", item: "Châle brodé personnalisé", date: "10 mai", status: "Livrée", color: "bg-sand text-earth" },
  { id: "CMD-2039", client: "Amina R.", artisane: "Yamina Tachfin", item: "Coussins kilim x4", date: "08 mai", status: "Validée", color: "bg-clay/30 text-earth" },
  { id: "CMD-2038", client: "Léa T.", artisane: "Fatima Azuli", item: "Tapis Beni Ouarain", date: "05 mai", status: "En attente", color: "bg-destructive/15 text-destructive" },
];

export const Route = createFileRoute("/admin/commandes")({
  component: AdminCommandes,
});

function AdminCommandes() {
  return (
    <div>
      <h1 className="font-display text-4xl text-earth">Commandes personnalisées</h1>
      <p className="mt-2 text-sm text-muted-foreground">{orders.length} demandes sur mesure.</p>

      <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-xs tracking-brand text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">RÉF.</th>
              <th className="px-4 py-3 text-left">CLIENT</th>
              <th className="px-4 py-3 text-left">ARTISANE</th>
              <th className="px-4 py-3 text-left">CRÉATION</th>
              <th className="px-4 py-3 text-left">DATE</th>
              <th className="px-4 py-3 text-left">STATUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-honey/20">
                <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                <td className="px-4 py-3">{o.client}</td>
                <td className="px-4 py-3 text-clay">{o.artisane}</td>
                <td className="px-4 py-3">{o.item}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                <td className="px-4 py-3">
                  <span className={`${o.color} rounded-full px-3 py-1 text-[0.65rem] tracking-brand`}>{o.status.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
