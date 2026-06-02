import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Users, Package, ClipboardList, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Espace admin — Tamghart" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    if (path === "/admin") navigate({ to: "/admin/dashboard", replace: true });
  }, [path, navigate]);

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
          <Link
            to="/"
            className="mt-6 flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-clay hover:bg-clay/10"
          >
            <LogOut className="h-4 w-4" /> Quitter
          </Link>
        </nav>
      </aside>
      <section><Outlet /></section>
    </div>
  );
}
