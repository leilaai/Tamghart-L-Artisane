import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/inscription")({
  head: () => ({ meta: [{ title: "Inscription — Tamghart l'Artisane" }] }),
  component: InscriptionPage,
});

function passwordChecks(pwd: string) {
  return {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    digit: /\d/.test(pwd),
  };
}

function InscriptionPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const checks = useMemo(() => passwordChecks(password), [password]);
  const score = (checks.length ? 1 : 0) + (checks.upper ? 1 : 0) + (checks.digit ? 1 : 0);
  const allOk = score === 3;
  const strengthLabel = ["Très faible", "Faible", "Moyen", "Fort"][score];
  const strengthColor = ["bg-destructive", "bg-destructive", "bg-honey", "bg-accent"][score];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!allOk) { setError("Le mot de passe ne respecte pas les critères de sécurité."); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/connexion`,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("registered")) setError("Un compte existe déjà avec cet email.");
      else setError(error.message);
      return;
    }
    setSuccess("Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse avant de vous connecter.");
    setTimeout(() => navigate({ to: "/connexion" }), 3000);
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
        <span className="text-xs tracking-[0.25em] text-clay">INSCRIPTION</span>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl text-earth">Rejoignez Tamghart</h1>
        <p className="mt-2 text-sm text-muted-foreground">Créez votre compte pour suivre vos commandes et favoris.</p>
        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Prénom</span>
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="text-earth">Nom</span>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm">
            <span className="text-earth">Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-earth">Mot de passe</span>
            <input type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
          </label>
          {password && (
            <div aria-live="polite">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
                <div className={`h-full transition-all ${strengthColor}`} style={{ width: `${(score / 3) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Force : <span className="font-medium text-earth">{strengthLabel}</span></p>
              <ul className="mt-2 grid gap-1 text-xs">
                <li className={checks.length ? "text-accent" : "text-muted-foreground"}>• Au moins 8 caractères</li>
                <li className={checks.upper ? "text-accent" : "text-muted-foreground"}>• Au moins une majuscule</li>
                <li className={checks.digit ? "text-accent" : "text-muted-foreground"}>• Au moins un chiffre</li>
              </ul>
            </div>
          )}
          {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
          {success && <p className="text-xs text-accent" role="status">{success}</p>}
          <button disabled={loading} className="rounded-sm bg-earth px-6 py-3 text-sm tracking-[0.18em] text-cream hover:bg-earth/90 disabled:opacity-60">
            {loading ? "CRÉATION…" : "CRÉER MON COMPTE"}
          </button>
          <p className="pt-2 text-center text-xs text-muted-foreground">
            Déjà un compte ? <Link to="/connexion" className="text-clay hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
