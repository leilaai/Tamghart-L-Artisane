import { useState, ReactNode } from "react";
import { CreditCard, Lock, Check } from "lucide-react";

type Props = {
  trigger: ReactNode;
  amount: number;
  title?: string;
  onSuccess?: () => void;
};

export function PaymentDialog({ trigger, amount, title = "Paiement sécurisé", onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents">{trigger}</span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-earth/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-sm bg-card p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-honey">
                  <Check className="h-8 w-8 text-earth" />
                </div>
                <h3 className="mt-6 font-display text-3xl text-earth">Paiement confirmé</h3>
                <p className="mt-3 text-sm text-muted-foreground">Vous recevrez un email de confirmation. Tanmirt — merci !</p>
                <button onClick={() => { setOpen(false); setDone(false); onSuccess?.(); }} className="mt-6 rounded-sm bg-earth px-6 py-2 text-sm tracking-wide text-cream hover:bg-earth/90">Fermer</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="ornament text-xs tracking-brand">SÉCURISÉ</span>
                    <h3 className="mt-2 font-display text-3xl text-earth">{title}</h3>
                  </div>
                  <Lock className="h-5 w-5 text-clay" />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Montant à payer : <span className="font-display text-lg text-accent">{amount} MAD</span></div>
                <form className="mt-6 grid gap-3" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                  <label className="block text-xs tracking-brand text-muted-foreground">NOM SUR LA CARTE
                    <input required placeholder="Fatima El Mansouri" className="mt-1 w-full rounded-sm border border-input bg-cream px-3 py-2 text-sm normal-case tracking-normal text-foreground" />
                  </label>
                  <label className="block text-xs tracking-brand text-muted-foreground">NUMÉRO DE CARTE
                    <div className="relative mt-1">
                      <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
                      <input required inputMode="numeric" pattern="[0-9 ]{13,19}" maxLength={19} placeholder="4242 4242 4242 4242" className="w-full rounded-sm border border-input bg-cream px-3 py-2 pl-9 text-sm tracking-normal" />
                    </div>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-xs tracking-brand text-muted-foreground">EXPIRATION
                      <input required placeholder="MM/AA" maxLength={5} className="mt-1 w-full rounded-sm border border-input bg-cream px-3 py-2 text-sm tracking-normal" />
                    </label>
                    <label className="block text-xs tracking-brand text-muted-foreground">CVV
                      <input required inputMode="numeric" maxLength={4} placeholder="123" className="mt-1 w-full rounded-sm border border-input bg-cream px-3 py-2 text-sm tracking-normal" />
                    </label>
                  </div>
                  <label className="block text-xs tracking-brand text-muted-foreground">ADRESSE DE LIVRAISON
                    <input required placeholder="Adresse complète" className="mt-1 w-full rounded-sm border border-input bg-cream px-3 py-2 text-sm normal-case tracking-normal text-foreground" />
                  </label>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-sm border border-border px-4 py-2.5 text-sm hover:bg-sand">Annuler</button>
                    <button type="submit" className="flex-1 rounded-sm bg-earth px-4 py-2.5 text-sm tracking-wide text-cream hover:bg-earth/90">Payer {amount} MAD</button>
                  </div>
                  <p className="text-center text-[0.65rem] text-muted-foreground">Démo — aucune transaction réelle n'est effectuée.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
