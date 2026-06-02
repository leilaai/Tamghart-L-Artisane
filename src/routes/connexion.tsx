import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/connexion")({
  head: () => ({ meta: [{ title: "Connexion — Tamghart l'Artisane" }] }),
  component: ConnexionPage,
});

function ConnexionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/mon-compte" });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("invalid")) setError("Email ou mot de passe incorrect.");
      else if (error.message.toLowerCase().includes("not confirmed")) setError("Veuillez confirmer votre email avant de vous connecter.");
      else setError(error.message);
      return;
    }
    navigate({ to: "/mon-compte" });
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
        <span className="text-xs tracking-[0.25em] text-clay">CONNEXION</span>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl text-earth">Bon retour parmi nous</h1>
        <p className="mt-2 text-sm text-muted-foreground">Connectez-vous à votre compte Tamghart.</p>
        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-1.5 text-sm">
            <span className="text-earth">Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-earth">Mot de passe</span>
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          </label>
          {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
          <button disabled={loading} className="rounded-sm bg-earth px-6 py-3 text-sm tracking-[0.18em] text-cream hover:bg-earth/90 disabled:opacity-60">
            {loading ? "CONNEXION…" : "SE CONNECTER"}
          </button>
          <div className="flex flex-wrap justify-between gap-2 pt-2 text-xs">
            <Link to="/reinitialiser-mot-de-passe" className="text-clay hover:underline">Mot de passe oublié ?</Link>
            <Link to="/inscription" className="text-clay hover:underline">Créer un compte</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
