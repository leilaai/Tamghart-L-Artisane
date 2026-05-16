import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/conditions-generales")({
  head: () => ({
    meta: [
      { title: "Conditions générales de vente — Tamghart" },
      { name: "description", content: "CGV de Tamghart l'Artisane : prix, expédition, droit de rétractation." },
    ],
  }),
  component: CGV,
});

function CGV() {
  const { t } = useI18n();
  const sections = [
    ["cgv.h1", "cgv.p1"], ["cgv.h2", "cgv.p2"], ["cgv.h3", "cgv.p3"],
    ["cgv.h4", "cgv.p4"], ["cgv.h5", "cgv.p5"], ["cgv.h6", "cgv.p6"],
  ] as const;
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("footer.legal")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("cgv.title")}</h1>
      <div className="mt-10 space-y-8">
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-display text-2xl text-earth">{t(h)}</h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">{t(p)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
