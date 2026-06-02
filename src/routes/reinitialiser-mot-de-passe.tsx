import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reinitialiser-mot-de-passe")({
  head: () => ({ meta: [{ title: "Réinitialiser le mot de passe — Tamghart" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash || "";
    if (hash.includes("type=recovery") || hash.includes("access_token=")) setMode("update");
  }, []);

  const onRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMsg(""); setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setMsg("Si un compte existe, un email avec un lien de réinitialisation vous a été envoyé.");
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMsg(""); setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else setMsg("Mot de passe mis à jour. Vous pouvez maintenant vous connecter.");
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
        <span className="text-xs tracking-[0.25em] text-clay">SÉCURITÉ</span>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl text-earth">
          {mode === "request" ? "Mot de passe oublié" : "Nouveau mot de passe"}
        </h1>
        {mode === "request" ? (
          <form className="mt-8 grid gap-4" onSubmit={onRequest}>
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Email</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
            </label>
            {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
            {msg && <p className="text-xs text-accent" role="status">{msg}</p>}
            <button disabled={loading} className="rounded-sm bg-earth px-6 py-3 text-sm tracking-[0.18em] text-cream hover:bg-earth/90 disabled:opacity-60">
              {loading ? "ENVOI…" : "ENVOYER LE LIEN"}
            </button>
            <p className="pt-2 text-center text-xs text-muted-foreground">
              <Link to="/connexion" className="text-clay hover:underline">Retour à la connexion</Link>
            </p>
          </form>
        ) : (
          <form className="mt-8 grid gap-4" onSubmit={onUpdate}>
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Nouveau mot de passe</span>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
            </label>
            {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
            {msg && <p className="text-xs text-accent" role="status">{msg}</p>}
            <button disabled={loading} className="rounded-sm bg-earth px-6 py-3 text-sm tracking-[0.18em] text-cream hover:bg-earth/90 disabled:opacity-60">
              {loading ? "MISE À JOUR…" : "METTRE À JOUR"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
