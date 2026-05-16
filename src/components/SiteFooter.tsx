import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { BrandBlock } from "@/components/SiteHeader";

// Custom TikTok glyph (no lucide icon)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M16.5 3a5.7 5.7 0 0 0 4.5 4.5v3a8.6 8.6 0 0 1-4.5-1.3v6.9a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.1a3.1 3.1 0 1 0 2.2 3v-13Z"/>
    </svg>
  );
}

const socials = [
  { href: "https://instagram.com/tamghart.artisane", Icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/tamghart.artisane", Icon: Facebook, label: "Facebook" },
  { href: "https://tiktok.com/@tamghart.artisane", Icon: TikTokIcon, label: "TikTok" },
  { href: "https://wa.me/212600000000", Icon: MessageCircle, label: "WhatsApp" },
];

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 bg-earth text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="-ml-1 [&_*]:!text-cream"><BrandBlock size="sm" /></div>
          <p className="mt-5 max-w-xs text-sm text-cream/70">{t("footer.brand.desc")}</p>

          <div className="mt-6">
            <h4 className="mb-3 text-xs font-medium tracking-brand text-clay">{t("footer.follow")}</h4>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/85 transition-all hover:-translate-y-0.5 hover:border-clay hover:bg-clay/20 hover:text-clay"
                  >
                    <s.Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">{t("footer.explore")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/artisanes" className="hover:text-clay">{t("footer.artisans")}</Link></li>
            <li><Link to="/creations" className="hover:text-clay">{t("footer.catalog")}</Link></li>
            <li><Link to="/galerie" className="hover:text-clay">{t("footer.gallery")}</Link></li>
            <li><Link to="/" hash="recherche" className="hover:text-clay">{t("footer.search")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">{t("footer.house")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/qui-sommes-nous" className="hover:text-clay">{t("footer.about")}</Link></li>
            <li><Link to="/faq" className="hover:text-clay">{t("footer.faq")}</Link></li>
            <li><Link to="/contact" className="hover:text-clay">{t("footer.contact")}</Link></li>
            <li><Link to="/admin" className="hover:text-clay">{t("footer.admin")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium tracking-brand text-clay">{t("footer.legal")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/conditions-generales" className="hover:text-clay">{t("footer.cgv")}</Link></li>
            <li><Link to="/entretien" className="hover:text-clay">{t("footer.care")}</Link></li>
            <li><Link to="/confidentialite" className="hover:text-clay">{t("footer.privacy")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15 py-5 text-center text-xs tracking-brand text-cream/60">
        ⵣ &nbsp; {t("footer.copyright")} &nbsp; ⵣ
      </div>
    </footer>
  );
}
