import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Tamghart" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <span className="ornament text-xs tracking-brand">ÉCRIRE</span>
          <h1 className="mt-4 font-display text-5xl text-earth">Contact</h1>
          <p className="mt-4 text-muted-foreground">
            Une question, un projet, une collaboration ? Nous répondons sous 48h.
          </p>
          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-clay" /> contact@tamghart.ma</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-clay" /> +212 5 24 00 00 00</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-clay" /> Marrakech, Maroc</li>
          </ul>
        </div>

        <div className="rounded-sm bg-card p-8 shadow-sm">
          {sent ? (
            <div className="py-12 text-center">
              <div className="font-display text-3xl text-earth">Merci.</div>
              <p className="mt-3 text-sm text-muted-foreground">Votre message est arrivé.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4">
              <input required placeholder="Votre nom" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
              <input required type="email" placeholder="Email" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
              <input placeholder="Sujet" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
              <textarea required rows={6} placeholder="Message" className="rounded-sm border border-input bg-cream px-4 py-3 text-sm" />
              <button className="mt-2 rounded-sm bg-earth px-6 py-3 text-sm tracking-brand text-cream hover:bg-earth/90">
                ENVOYER
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
