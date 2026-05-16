import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/entretien")({
  head: () => ({
    meta: [
      { title: "Entretien des produits — Tamghart" },
      { name: "description", content: "Comment entretenir tapis, bijoux, poteries et broderies amazighes." },
    ],
  }),
  component: Care,
});

function Care() {
  const { t } = useI18n();
  const cards = [
    ["care.rug.t", "care.rug.p"], ["care.jewel.t", "care.jewel.p"],
    ["care.pot.t", "care.pot.p"], ["care.emb.t", "care.emb.p"],
  ] as const;
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("about.kicker")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("care.title")}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("care.lead")}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map(([h, p]) => (
          <article key={h} className="rounded-sm border border-border bg-card p-6">
            <Sparkles className="h-5 w-5 text-clay" />
            <h2 className="mt-3 font-display text-2xl text-earth">{t(h)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t(p)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
