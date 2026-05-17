import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Instagram, Facebook } from "lucide-react";
import { BrandBlock } from "@/components/SiteHeader";

// Custom TikTok glyph (no lucide icon)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M16.5 3a5.7 5.7 0 0 0 4.5 4.5v3a8.6 8.6 0 0 1-4.5-1.3v6.9a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.1a3.1 3.1 0 1 0 2.2 3v-13Z"/>
    </svg>
  );
}

// Authentic WhatsApp glyph
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="currentColor">
      <path d="M16.003 3C9.376 3 4 8.376 4 15c0 2.367.69 4.566 1.876 6.422L4 29l7.79-1.82A11.94 11.94 0 0 0 16.003 27C22.63 27 28 21.624 28 15S22.63 3 16.003 3Zm0 21.6a9.59 9.59 0 0 1-4.882-1.336l-.35-.21-4.62 1.08 1.097-4.502-.228-.36A9.6 9.6 0 1 1 16.003 24.6Zm5.49-7.18c-.3-.15-1.78-.88-2.057-.98-.276-.1-.477-.15-.68.15-.2.3-.78.98-.957 1.18-.176.2-.353.225-.654.075-.3-.15-1.27-.467-2.42-1.49-.894-.797-1.498-1.78-1.674-2.08-.176-.3-.019-.462.132-.612.135-.135.3-.353.45-.53.15-.176.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.68-1.638-.933-2.245-.246-.59-.497-.51-.683-.52l-.583-.01a1.12 1.12 0 0 0-.81.376c-.276.3-1.057 1.033-1.057 2.52 0 1.487 1.08 2.924 1.23 3.124.15.2 2.13 3.255 5.17 4.564.722.312 1.286.498 1.726.638.725.23 1.385.198 1.906.12.582-.088 1.78-.728 2.032-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.2-.577-.35Z"/>
    </svg>
  );
}

const socials = [
  { href: "https://instagram.com/tamghart.artisane", Icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/tamghart.artisane", Icon: Facebook, label: "Facebook" },
  { href: "https://tiktok.com/@tamghart.artisane", Icon: TikTokIcon, label: "TikTok" },
  { href: "https://wa.me/212600000000", Icon: WhatsAppIcon, label: "WhatsApp" },
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
