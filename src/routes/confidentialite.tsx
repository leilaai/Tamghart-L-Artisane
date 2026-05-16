import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Tamghart" },
      { name: "description", content: "Comment Tamghart collecte, protège et traite vos données personnelles." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useI18n();
  const sec = [
    ["privacy.h1", "privacy.p1"], ["privacy.h2", "privacy.p2"], ["privacy.h3", "privacy.p3"],
    ["privacy.h4", "privacy.p4"], ["privacy.h5", "privacy.p5"],
  ] as const;
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("footer.legal")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("privacy.title")}</h1>
      <p className="mt-6 text-lg text-foreground/85">{t("privacy.intro")}</p>
      <div className="mt-10 space-y-8">
        {sec.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-display text-2xl text-earth">{t(h)}</h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">{t(p)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
