import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

type Status = "En attente" | "Validée" | "En cours" | "Livrée";

type Order = {
  id: string; client: string; artisane: string; item: string; date: string; status: Status;
};

const initial: Order[] = [
  { id: "CMD-2045", client: "Sophie Martin", artisane: "Fatima Azuli", item: "Tapis sur mesure 2x3m", date: "12 mai", status: "En cours" },
  { id: "CMD-2044", client: "Karim Benali", artisane: "Lalla Itto", item: "Châle brodé personnalisé", date: "10 mai", status: "Livrée" },
  { id: "CMD-2043", client: "Emma Schneider", artisane: "Khadija Amzil", item: "Parure argent corail", date: "09 mai", status: "Validée" },
  { id: "CMD-2042", client: "Yassine El Idrissi", artisane: "Tamou Bouzid", item: "Vase Ourika peint main", date: "08 mai", status: "En cours" },
  { id: "CMD-2041", client: "Olivia Romano", artisane: "Yamina Tachfin", item: "Coussins kilim x4", date: "07 mai", status: "Validée" },
  { id: "CMD-2040", client: "Hiroshi Tanaka", artisane: "Fatima Azuli", item: "Tapis Beni Ouarain 1.5x2m", date: "05 mai", status: "Livrée" },
  { id: "CMD-2039", client: "Aïcha Bennani", artisane: "Lalla Itto", item: "Caftan brodé sur mesure", date: "04 mai", status: "En cours" },
  { id: "CMD-2038", client: "Lucas Fernández", artisane: "Khadija Amzil", item: "Bracelet manchette argent", date: "02 mai", status: "En attente" },
  { id: "CMD-2037", client: "Nora El Mansouri", artisane: "Tamou Bouzid", item: "Service à thé poterie", date: "01 mai", status: "Livrée" },
  { id: "CMD-2036", client: "Charlotte Dubois", artisane: "Yamina Tachfin", item: "Tapis Azilal coloré", date: "29 avr.", status: "Validée" },
];

const statuses: Status[] = ["En attente", "Validée", "En cours", "Livrée"];

const color: Record<Status, string> = {
  "En attente": "bg-destructive/15 text-destructive border-destructive/30",
  "Validée": "bg-clay/20 text-earth border-clay/40",
  "En cours": "bg-honey text-earth border-honey",
  "Livrée": "bg-sand text-earth border-sand",
};

export const Route = createFileRoute("/admin/commandes")({
  component: AdminCommandes,
});

function AdminCommandes() {
  const [orders, setOrders] = useState<Order[]>(initial);

  const update = (id: string, status: Status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="font-display text-4xl text-earth">Commandes personnalisées</h1>
      <p className="mt-2 text-sm text-muted-foreground">{orders.length} demandes sur mesure. Cliquez sur le statut pour le modifier.</p>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border bg-card">
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
                  <label className="sr-only" htmlFor={`s-${o.id}`}>Statut de {o.id}</label>
                  <select
                    id={`s-${o.id}`}
                    value={o.status}
                    onChange={(e) => update(o.id, e.target.value as Status)}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-[0.7rem] tracking-brand focus:outline-none focus:ring-2 focus:ring-clay ${color[o.status]}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
