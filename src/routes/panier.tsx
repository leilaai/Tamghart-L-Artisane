import { createFileRoute, Link } from "@tanstack/react-router";
import { creations } from "@/lib/data";
import { useStore } from "@/lib/store";
import { ShoppingBag, X } from "lucide-react";

export const Route = createFileRoute("/panier")({
  head: () => ({ meta: [{ title: "Mon panier — Tamghart" }] }),
  component: PanierPage,
});

function PanierPage() {
  const { cart, removeFromCart } = useStore();
  const items = creations.filter((c) => cart.includes(c.id));
  const total = items.reduce((s, c) => s + c.price, 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">COMMANDE</span>
      <h1 className="mt-4 font-display text-5xl text-earth">Mon panier</h1>

      {items.length === 0 ? (
        <div className="mt-12 rounded-sm border border-dashed border-border bg-card p-12 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-clay" />
          <p className="mt-4 text-foreground/80">Votre panier est vide.</p>
          <Link to="/creations" className="mt-6 inline-block rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
            Voir les créations
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((c) => (
              <div key={c.id} className="flex gap-4 bg-card p-4">
                <Link to="/creations/$id" params={{ id: c.id }} className="shrink-0">
                  <img src={c.image} alt={c.name} width={120} height={120} loading="lazy" className="h-24 w-24 object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to="/creations/$id" params={{ id: c.id }} className="font-display text-xl text-earth hover:text-accent">{c.name}</Link>
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg text-accent">{c.price} MAD</span>
                    <button onClick={() => removeFromCart(c.id)} aria-label="Retirer" className="rounded-sm p-2 text-clay hover:bg-sand">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-sm border border-border bg-honey/30 p-6">
            <h2 className="font-display text-2xl text-earth">Récapitulatif</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span>Sous-total</span><span>{total} MAD</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Livraison</span><span>Calculée à l'étape suivante</span>
            </div>
            <div className="mt-6 flex justify-between border-t border-border pt-4 font-display text-xl text-earth">
              <span>Total</span><span>{total} MAD</span>
            </div>
            <button className="mt-6 w-full rounded-sm bg-earth px-6 py-3 text-sm tracking-wide text-cream hover:bg-earth/90">
              Passer commande
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
