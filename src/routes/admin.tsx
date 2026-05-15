import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Package, ClipboardList, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Espace admin — Tamghart" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const [authed, setAuthed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setAuthed(typeof window !== "undefined" && sessionStorage.getItem("tamghart_admin") === "1");
  }, []);

  if (path === "/admin") {
    return <Login onSuccess={() => setAuthed(true)} />;
  }

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-24 md:h-fit">
        <div className="mb-6 text-xs tracking-brand text-muted-foreground">ADMINISTRATION</div>
        <nav className="flex flex-col gap-1 text-sm">
          {[
            { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { to: "/admin/artisanes", icon: Users, label: "Artisanes" },
            { to: "/admin/creations", icon: Package, label: "Créations" },
            { to: "/admin/commandes", icon: ClipboardList, label: "Commandes" },
          ].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex items-center gap-3 rounded-sm border-l-2 border-transparent px-3 py-2 text-foreground/80 transition-colors hover:bg-sand/60 hover:text-earth"
              activeProps={{ className: "border-earth bg-honey/40 text-earth font-medium" }}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          ))}
          <button
            onClick={() => { sessionStorage.removeItem("tamghart_admin"); setAuthed(false); }}
            className="mt-6 flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-clay hover:bg-clay/10"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </nav>
      </aside>
      <section><Outlet /></section>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-md px-6 py-24">
      <div className="rounded-sm border border-border bg-card p-10">
        <span className="ornament text-xs tracking-brand">RÉSERVÉ</span>
        <h1 className="mt-4 font-display text-3xl text-earth">Connexion admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">Espace de gestion Tamghart.</p>
        <form
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            if (form.get("email") === "admin@tamghart.ma" && form.get("password") === "tamghart") {
              sessionStorage.setItem("tamghart_admin", "1");
              onSuccess();
              window.location.href = "/admin/dashboard";
            } else {
              setErr("Identifiants incorrects. Démo: admin@tamghart.ma / tamghart");
            }
          }}
        >
          <input name="email" defaultValue="admin@tamghart.ma" placeholder="Email" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          <input name="password" type="password" defaultValue="tamghart" placeholder="Mot de passe" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button className="rounded-sm bg-earth px-6 py-3 text-sm tracking-brand text-cream hover:bg-earth/90">SE CONNECTER</button>
        </form>
      </div>
    </div>
  );
}
