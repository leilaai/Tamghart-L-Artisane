import { createFileRoute } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Tamghart l'Artisane" },
      { name: "description", content: "Questions fréquentes : vente, expédition, remboursement, qualité, paiement." },
    ],
  }),
  component: Faq,
});

type QA = { q: Record<Lang, string>; a: Record<Lang, string> };
type Section = { catKey: string; items: QA[] };

const data: Section[] = [
  {
    catKey: "faq.cat.sale",
    items: [
      {
        q: {
          fr: "Vos créations sont-elles vraiment faites à la main ?",
          en: "Are your creations really handmade?",
          ar: "هل إبداعاتكم مصنوعة يدوياً فعلاً؟",
          tif: "ⵉⵙ ⵜⵜⵓⵙⵏⵓⵍⵏ ⵙ ⵓⴼⵓⵙ?",
        },
        a: {
          fr: "Oui. Chaque pièce est entièrement réalisée à la main par une artisane amazighe. Aucune production industrielle.",
          en: "Yes. Each piece is entirely handmade by an Amazigh artisan. No industrial production.",
          ar: "نعم. كل قطعة مصنوعة بالكامل يدوياً من قبل حرفية أمازيغية.",
          tif: "ⵢⴰⵀ. ⴽⵓⵍ ⵜⴰⵙⵏⵓⵍⵜ ⵙ ⵓⴼⵓⵙ.",
        },
      },
      {
        q: { fr: "Puis-je commander une pièce sur mesure ?", en: "Can I order a custom piece?", ar: "هل يمكنني طلب قطعة حسب الطلب؟", tif: "ⵉⵙ ⵣⵎⵔⵖ ⴰⴷ ⵙⵙⵓⵜⵔⵖ?" },
        a: {
          fr: "Oui. Allez sur la fiche d'une artisane et remplissez le formulaire « Commande sur mesure ». Réponse sous 48h.",
          en: "Yes. Go to an artisan's profile and fill out the « Custom order » form. Reply within 48h.",
          ar: "نعم. اذهبوا إلى ملف الحرفية واملؤوا نموذج الطلب الخاص. الرد خلال 48 ساعة.",
          tif: "ⵢⴰⵀ. ⴰⵙⵉⵏⵙ ⵏ ⵜⵎⵖⴰⵔⵜ.",
        },
      },
    ],
  },
  {
    catKey: "faq.cat.ship",
    items: [
      {
        q: { fr: "Livrez-vous à l'international ?", en: "Do you ship internationally?", ar: "هل تشحنون دولياً؟", tif: "ⵉⵙ ⵜⵙⴱⵍⴹⵎ ⵙ ⵓⵎⴰⴹⴰⵍ?" },
        a: {
          fr: "Oui, dans le monde entier via DHL et Aramex. Livraison sous 5 à 10 jours ouvrés avec suivi.",
          en: "Yes, worldwide via DHL and Aramex. Delivery within 5 to 10 working days with tracking.",
          ar: "نعم، عبر العالم بواسطة DHL وأرامكس. التوصيل خلال 5-10 أيام عمل.",
          tif: "ⵢⴰⵀ, ⵙ ⵓⵎⴰⴹⴰⵍ.",
        },
      },
      {
        q: { fr: "Quels sont les frais de port ?", en: "What are the shipping costs?", ar: "ما هي تكاليف الشحن؟", tif: "ⵎⴰⵙⵙⴰ ⵏ ⵓⵙⴱⵍⴹ?" },
        a: {
          fr: "Calculés au moment du paiement selon le poids et la destination. Maroc : 50 MAD. Europe : à partir de 350 MAD.",
          en: "Calculated at checkout based on weight and destination. Morocco: 50 MAD. Europe: from 350 MAD.",
          ar: "تحسب عند الدفع. المغرب: 50 درهم. أوروبا: ابتداء من 350 درهم.",
          tif: "ⵍⵎⵖⵔⵉⴱ: 50.",
        },
      },
    ],
  },
  {
    catKey: "faq.cat.refund",
    items: [
      {
        q: { fr: "Quel est votre délai de rétractation ?", en: "What is your withdrawal period?", ar: "ما هي مدة التراجع؟", tif: "ⵎⴰⵏⵉ ⴰⴽⵓⴷ ⵏ ⵓⵙⵙⵓⴼⵖ?" },
        a: {
          fr: "14 jours à compter de la réception, conformément à la loi 31-08. Pièce retournée à vos frais, en état neuf.",
          en: "14 days from receipt, in accordance with law 31-08. Item returned at your cost, in new condition.",
          ar: "14 يوماً من الاستلام وفق القانون 31-08.",
          tif: "14 ⵏ ⵡⵓⵙⵙⴰⵏ.",
        },
      },
      {
        q: { fr: "Les pièces sur mesure sont-elles remboursables ?", en: "Are custom pieces refundable?", ar: "هل القطع المخصصة قابلة للاسترجاع؟", tif: "ⵉⵙ ⵜⵜⵓⵔⴰⵕ?" },
        a: {
          fr: "Non. Les créations sur commande spécifique ne peuvent être ni reprises ni remboursées, sauf défaut de fabrication.",
          en: "No. Custom orders cannot be returned or refunded, except for manufacturing defects.",
          ar: "لا، إلا في حالة عيب التصنيع.",
          tif: "ⴰⵍⴰ.",
        },
      },
    ],
  },
  {
    catKey: "faq.cat.quality",
    items: [
      {
        q: { fr: "Comment garantissez-vous la qualité ?", en: "How do you guarantee quality?", ar: "كيف تضمنون الجودة؟", tif: "ⵎⴰⵎⴽ ⵜⵙⵏⵎⴰⵍⵎ?" },
        a: {
          fr: "Chaque pièce est contrôlée à l'atelier puis à nouveau avant expédition. Un certificat d'authenticité est joint.",
          en: "Each piece is inspected at the workshop and again before shipping. A certificate of authenticity is included.",
          ar: "كل قطعة تفحص في الورشة ثم قبل الشحن. شهادة أصالة مرفقة.",
          tif: "ⴽⵓⵍ ⵜⴰⵙⵏⵓⵍⵜ ⵜⵜⵡⴰⵙⵏⵇⴻⴹ.",
        },
      },
      {
        q: { fr: "Les matières sont-elles naturelles ?", en: "Are the materials natural?", ar: "هل المواد طبيعية؟", tif: "ⵉⵙ ⴷ ⵜⵉⴳⴰⵎⴰⵏⵉⵏ?" },
        a: {
          fr: "Oui. Laine vierge, teintures végétales, argent massif, argile locale, fils de soie ou de coton naturel.",
          en: "Yes. Virgin wool, plant dyes, solid silver, local clay, natural silk or cotton threads.",
          ar: "نعم. صوف وأصباغ نباتية وفضة خالصة.",
          tif: "ⵢⴰⵀ.",
        },
      },
    ],
  },
  {
    catKey: "faq.cat.pay",
    items: [
      {
        q: { fr: "Quels moyens de paiement acceptez-vous ?", en: "Which payment methods do you accept?", ar: "ما هي وسائل الدفع المقبولة؟", tif: "ⵎⴰⵏⵉ ⵉⵙⴽⵉⵏⵏ?" },
        a: {
          fr: "Carte Visa, Mastercard, virement bancaire, et PayPal. Paiement sécurisé 3D Secure.",
          en: "Visa, Mastercard, bank transfer and PayPal. Secure 3D Secure payment.",
          ar: "فيزا، ماستر كارد، تحويل بنكي وبايبال.",
          tif: "ⴰⴽⴽ ⵜⵉⴽⴰⵕⴹⴰⵜⵉⵏ.",
        },
      },
      {
        q: { fr: "Le paiement est-il sécurisé ?", en: "Is payment secure?", ar: "هل الدفع آمن؟", tif: "ⵉⵙ ⵉⴰⴹⵎⴻⵏ?" },
        a: {
          fr: "Oui, via notre prestataire certifié PCI-DSS. Aucune donnée bancaire n'est stockée sur nos serveurs.",
          en: "Yes, via our PCI-DSS certified provider. No banking data is stored on our servers.",
          ar: "نعم، عبر مزود معتمد PCI-DSS.",
          tif: "ⵢⴰⵀ.",
        },
      },
    ],
  },
];

function Faq() {
  const { t, lang } = useI18n();
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <span className="ornament text-xs tracking-brand">{t("about.kicker")}</span>
      <h1 className="mt-4 font-display text-5xl text-earth md:text-6xl">{t("faq.title")}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("faq.desc")}</p>

      <div className="mt-12 space-y-12">
        {data.map((sec) => (
          <section key={sec.catKey}>
            <h2 className="mb-4 text-xs tracking-brand text-clay">{t(sec.catKey)}</h2>
            <div className="divide-y divide-border rounded-sm border border-border bg-card">
              {sec.items.map((qa, i) => (
                <Item key={i} q={qa.q[lang] ?? qa.q.fr} a={qa.a[lang] ?? qa.a.fr} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base text-earth hover:bg-sand/40"
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-clay transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/80">{a}</p>}
    </div>
  );
}
