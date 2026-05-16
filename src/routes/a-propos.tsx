import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Users, FileText, Sparkles, HelpCircle, Shield, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Tamghart l'Artisane" },
      { name: "description", content: "Qui sommes-nous, conditions de vente, entretien des produits, FAQ et confidentialité." },
    ],
  }),
  component: AboutHub,
});

function AboutHub() {
  const { t } = useI18n();
  const links = [
    { to: "/qui-sommes-nous" as const, title: t("about.who"), desc: t("about.who.d"), Icon: Users },
    { to: "/conditions-generales" as const, title: t("about.cgv"), desc: t("about.cgv.d"), Icon: FileText },
    { to: "/entretien" as const, title: t("about.care"), desc: t("about.care.d"), Icon: Sparkles },
    { to: "/faq" as const, title: t("about.faq"), desc: t("about.faq.d"), Icon: HelpCircle },
    { to: "/confidentialite" as const, title: t("about.privacy"), desc: t("about.privacy.d"), Icon: Shield },
  ];
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("about.kicker")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("about.title")}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("about.desc")}</p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-clay hover:shadow-md">
              <l.Icon className="h-6 w-6 text-clay" />
              <h2 className="mt-4 font-display text-2xl text-earth">{l.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-brand text-accent">
                LIRE <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
