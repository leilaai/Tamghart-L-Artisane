import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 bg-earth text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-wide">TAMGHART</div>
          <div className="font-display text-xs tracking-brand text-clay">{t("brand.tagline")}</div>
          <p className="mt-4 text-sm text-cream/70">{t("footer.brand.desc")}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">{t("footer.explore")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/artisanes" className="hover:text-clay">{t("footer.artisans")}</Link></li>
            <li><Link to="/creations" className="hover:text-clay">{t("footer.catalog")}</Link></li>
            <li><Link to="/galerie" className="hover:text-clay">{t("footer.gallery")}</Link></li>
            <li><Link to="/recherche" className="hover:text-clay">{t("footer.search")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">{t("footer.house")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/contact" className="hover:text-clay">{t("footer.contact")}</Link></li>
            <li><Link to="/admin" className="hover:text-clay">{t("footer.admin")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">ⵜⴰⵎⵖⴰⵔⵜ</h4>
          <p className="text-sm text-cream/70">{t("footer.about")}</p>
        </div>
      </div>
      <div className="border-t border-cream/15 py-5 text-center text-xs tracking-brand text-cream/60">
        ⵣ &nbsp; {t("footer.bottom")} &nbsp; ⵣ
      </div>
    </footer>
  );
}
