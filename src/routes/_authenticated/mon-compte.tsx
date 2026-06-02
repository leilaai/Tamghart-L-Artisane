import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, LogOut, User as UserIcon, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import { creations } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/mon-compte")({
  head: () => ({ meta: [{ title: "Mon compte — Tamghart l'Artisane" }] }),
  component: MonComptePage,
});

function MonComptePage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { favorites } = useStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    setFirstName(profile?.first_name ?? "");
    setLastName(profile?.last_name ?? "");
  }, [profile]);

  const favItems = creations.filter((c) => favorites.includes(c.id));

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setSavedMsg("");
    const { error } = await supabase.from("profiles").update({ first_name: firstName, last_name: lastName }).eq("id", user.id);
    setSaving(false);
    if (!error) { setSavedMsg("Modifications enregistrées."); await refreshProfile(); }
    else setSavedMsg(error.message);
  };

  const onLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <span className="text-xs tracking-[0.25em] text-clay">ESPACE PERSONNEL</span>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-earth">Mon compte</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-earth"><UserIcon className="h-4 w-4" /><h2 className="font-display text-lg">Informations</h2></div>
          <form className="mt-5 grid gap-4" onSubmit={onSave}>
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Prénom</span>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-2.5 text-sm" />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Nom</span>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-2.5 text-sm" />
            </label>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="h-3.5 w-3.5" /> {user?.email}</div>
            {savedMsg && <p className="text-xs text-accent" role="status">{savedMsg}</p>}
            <button disabled={saving} className="justify-self-start rounded-sm bg-earth px-5 py-2.5 text-xs tracking-[0.18em] text-cream hover:bg-earth/90 disabled:opacity-60">
              {saving ? "ENREGISTREMENT…" : "ENREGISTRER"}
            </button>
          </form>
          <button onClick={onLogout} className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.18em] text-clay hover:underline">
            <LogOut className="h-4 w-4" /> SE DÉCONNECTER
          </button>
        </section>

        <section className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-earth"><Heart className="h-4 w-4" /><h2 className="font-display text-lg">Mes favoris</h2></div>
          {favItems.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Vous n'avez pas encore de favoris. <Link to="/creations" className="text-clay hover:underline">Découvrir le catalogue</Link></p>
          ) : (
            <ul className="mt-5 grid gap-3">
              {favItems.map((c) => (
                <li key={c.id}>
                  <Link to="/creations/$id" params={{ id: c.id }} className="flex items-center gap-3 rounded-sm border border-border bg-cream p-2 hover:bg-sand">
                    <img src={c.image} alt="" className="h-14 w-14 rounded-sm object-cover" />
                    <span className="text-sm text-earth">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
