import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/qui-sommes-nous")({
  head: () => ({
    meta: [
      { title: "Qui sommes-nous — Tamghart" },
      { name: "description", content: "L'histoire et la mission de Tamghart l'Artisane." },
    ],
  }),
  component: WhoWeAre,
});

function WhoWeAre() {
  const { t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("about.kicker")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("who.title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/85">{t("who.lead")}</p>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/80">
        <p>{t("who.p1")}</p>
        <p>{t("who.p2")}</p>
        <p>{t("who.p3")}</p>
      </div>
      <h2 className="mt-12 font-display text-3xl text-earth">{t("who.values")}</h2>
      <ul className="mt-4 space-y-2 text-base text-foreground/80">
        <li className="border-l-2 border-clay pl-4">{t("who.v1")}</li>
        <li className="border-l-2 border-clay pl-4">{t("who.v2")}</li>
        <li className="border-l-2 border-clay pl-4">{t("who.v3")}</li>
      </ul>
    </article>
  );
}
