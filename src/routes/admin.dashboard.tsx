import { createFileRoute } from "@tanstack/react-router";
import { artisanes, creations } from "@/lib/data";
import { Users, Package, ClipboardList, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { icon: Users, label: "Artisanes", value: artisanes.length, color: "bg-earth text-cream" },
    { icon: Package, label: "Créations", value: creations.length, color: "bg-clay text-cream" },
    { icon: ClipboardList, label: "Commandes", value: 12, color: "bg-honey text-earth" },
    { icon: TrendingUp, label: "Revenus mois", value: "24 350 MAD", color: "bg-sand text-earth" },
  ];
  return (
    <div>
      <h1 className="font-display text-4xl text-earth">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Vue d'ensemble de l'activité Tamghart.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} rounded-sm p-6`}>
            <s.icon className="h-6 w-6 opacity-70" />
            <div className="mt-6 font-display text-3xl">{s.value}</div>
            <div className="mt-1 text-xs tracking-brand opacity-80">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-sm border border-border bg-card p-6">
        <h2 className="font-display text-2xl text-earth">Activité récente</h2>
        <ul className="mt-4 divide-y divide-border text-sm">
          <li className="py-3">Nouvelle commande sur mesure — <span className="text-clay">Yamina Tachfin</span></li>
          <li className="py-3">Création ajoutée — <span className="text-clay">Tapis Azilal</span></li>
          <li className="py-3">Profil mis à jour — <span className="text-clay">Lalla Itto</span></li>
        </ul>
      </div>
    </div>
  );
}
