import { createFileRoute, Link } from "@tanstack/react-router";
import { artisanes } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/artisanes/")({
  head: () => ({
    meta: [
      { title: "Les artisanes — Tamghart" },
      { name: "description", content: "Rencontrez les femmes amazighes qui perpétuent un patrimoine vivant." },
    ],
  }),
  component: ArtisanesIndex,
});

function ArtisanesIndex() {
  const { t, ti, lang } = useI18n();
  const yrs = lang === "en" ? "yrs" : lang === "ar" ? "سنة" : "ans";
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <span className="ornament text-xs tracking-brand">{t("artisans.kicker")}</span>
        <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("artisans.title")}</h1>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {artisanes.map((a) => (
          <Link key={a.id} to="/artisanes/$id" params={{ id: a.id }} className="group block">
            <div className="overflow-hidden">
              <img src={a.image} alt={a.name} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="pt-5">
              <h2 className="font-display text-2xl text-earth">{a.name}</h2>
              <p className="text-sm text-clay">{ti("craft", a.craft)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{ti("region", a.region)} · {a.experienceYears} {yrs}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
