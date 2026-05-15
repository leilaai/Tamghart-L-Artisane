import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Lang = "fr" | "en" | "ar" | "tif";

type Dict = Record<string, string>;

const dicts: Record<Lang, Dict> = {
  fr: {
    "nav.home": "Accueil",
    "nav.artisans": "Artisanes",
    "nav.creations": "Créations",
    "nav.culture": "Culture",
    "nav.contact": "Contact",
    "nav.search": "Recherche",
    "nav.favorites": "Favoris",
    "nav.cart": "Panier",
    "brand.tagline": "L'ARTISANE",

    "hero.kicker": "ⵜⴰⵎⵖⴰⵔⵜ",
    "hero.title": "Célébrons le savoir-faire des femmes amazighes",
    "hero.desc": "Découvrez des créations uniques, porteuses d'histoire, de traditions et d'une beauté héritée de génération en génération.",
    "hero.cta1": "Découvrir le catalogue",
    "hero.cta2": "Explorer la culture",

    "regions.kicker": "TERRITOIRES",
    "regions.title": "Les régions amazighes du Maroc",
    "regions.desc": "Du Rif au Souss, chaque vallée porte ses motifs, ses teintes et ses gestes.",

    "search.kicker": "EXPLORER",
    "search.title": "Trouvez une création, une artisane",
    "search.placeholder": "Tapis, bijoux, poterie, Fatima, Atlas...",
    "search.filter": "Filtrer",
    "search.creations": "CRÉATIONS",
    "search.artisans": "ARTISANES",
    "search.none.creations": "Aucune création trouvée.",
    "search.none.artisans": "Aucune artisane trouvée.",

    "pillars.1.t": "Patrimoine et tradition",
    "pillars.1.d": "Des motifs et techniques transmis depuis des siècles.",
    "pillars.2.t": "Savoir-faire artisanal",
    "pillars.2.d": "Chaque pièce, faite main, est unique.",
    "pillars.3.t": "Créations authentiques",
    "pillars.3.d": "Aucun intermédiaire, aucune copie.",
    "pillars.4.t": "Femmes inspirantes",
    "pillars.4.d": "Soutenir leurs ateliers, c'est soutenir leurs villages.",
    "pillars.cta": "DÉCOUVRIR →",

    "artisans.kicker": "PORTRAITS",
    "artisans.title": "Les artisanes",
    "artisans.all": "VOIR TOUTES →",

    "creations.kicker": "COLLECTION",
    "creations.title": "Créations en vedette",
    "creations.all": "CATALOGUE COMPLET →",

    "culture.kicker": "CULTURE",
    "culture.title": "Symboles, motifs et mémoire",
    "culture.desc": "Chaque ligne tissée, chaque tatouage, chaque bijou raconte une histoire. Plongez dans l'univers amazigh.",
    "culture.cta": "Visiter la galerie",

    "stats.kicker": "EN CHIFFRES",
    "stats.title": "Notre impact ensemble",
    "stats.artisans": "Artisanes partenaires",
    "stats.artisans.sub": "à travers les vallées du Maroc",
    "stats.creations": "Créations uniques",
    "stats.creations.sub": "au catalogue, faites main",
    "stats.sales": "Pièces vendues",
    "stats.sales.sub": "à des passionnés du monde entier",

    "footer.explore": "EXPLORER",
    "footer.house": "MAISON",
    "footer.artisans": "Les artisanes",
    "footer.catalog": "Catalogue",
    "footer.gallery": "Galerie culturelle",
    "footer.search": "Recherche",
    "footer.contact": "Contact",
    "footer.admin": "Espace admin",
    "footer.about": "Tamghart l'Artisane — Patrimoine vivant des femmes amazighes du Maroc.",
    "footer.brand.desc": "Héritage · Création · Authenticité. Une marque qui célèbre les femmes amazighes.",
    "footer.bottom": "HÉRITAGE · CRÉATION · AUTHENTICITÉ",
  },
  en: {
    "nav.home": "Home",
    "nav.artisans": "Artisans",
    "nav.creations": "Creations",
    "nav.culture": "Culture",
    "nav.contact": "Contact",
    "nav.search": "Search",
    "nav.favorites": "Favorites",
    "nav.cart": "Cart",
    "brand.tagline": "THE ARTISAN",

    "hero.kicker": "ⵜⴰⵎⵖⴰⵔⵜ",
    "hero.title": "Celebrating the craft of Amazigh women",
    "hero.desc": "Discover unique creations, carrying history, traditions and beauty passed down through generations.",
    "hero.cta1": "Explore the catalog",
    "hero.cta2": "Discover the culture",

    "regions.kicker": "TERRITORIES",
    "regions.title": "The Amazigh regions of Morocco",
    "regions.desc": "From the Rif to the Souss, each valley carries its own motifs, colors and gestures.",

    "search.kicker": "EXPLORE",
    "search.title": "Find a creation, an artisan",
    "search.placeholder": "Rugs, jewelry, pottery, Fatima, Atlas...",
    "search.filter": "Filter",
    "search.creations": "CREATIONS",
    "search.artisans": "ARTISANS",
    "search.none.creations": "No creations found.",
    "search.none.artisans": "No artisans found.",

    "pillars.1.t": "Heritage & tradition",
    "pillars.1.d": "Motifs and techniques passed down for centuries.",
    "pillars.2.t": "Artisanal know-how",
    "pillars.2.d": "Every handmade piece is unique.",
    "pillars.3.t": "Authentic creations",
    "pillars.3.d": "No middlemen, no copies.",
    "pillars.4.t": "Inspiring women",
    "pillars.4.d": "Supporting their workshops means supporting their villages.",
    "pillars.cta": "DISCOVER →",

    "artisans.kicker": "PORTRAITS",
    "artisans.title": "The artisans",
    "artisans.all": "SEE ALL →",

    "creations.kicker": "COLLECTION",
    "creations.title": "Featured creations",
    "creations.all": "FULL CATALOG →",

    "culture.kicker": "CULTURE",
    "culture.title": "Symbols, motifs and memory",
    "culture.desc": "Each woven line, each tattoo, each jewel tells a story. Dive into the Amazigh world.",
    "culture.cta": "Visit the gallery",

    "stats.kicker": "IN NUMBERS",
    "stats.title": "Our impact together",
    "stats.artisans": "Partner artisans",
    "stats.artisans.sub": "across Morocco's valleys",
    "stats.creations": "Unique creations",
    "stats.creations.sub": "in the catalog, all handmade",
    "stats.sales": "Pieces sold",
    "stats.sales.sub": "to enthusiasts worldwide",

    "footer.explore": "EXPLORE",
    "footer.house": "HOUSE",
    "footer.artisans": "The artisans",
    "footer.catalog": "Catalog",
    "footer.gallery": "Cultural gallery",
    "footer.search": "Search",
    "footer.contact": "Contact",
    "footer.admin": "Admin area",
    "footer.about": "Tamghart l'Artisane — Living heritage of Moroccan Amazigh women.",
    "footer.brand.desc": "Heritage · Craft · Authenticity. A brand celebrating Amazigh women.",
    "footer.bottom": "HERITAGE · CRAFT · AUTHENTICITY",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.artisans": "الحرفيات",
    "nav.creations": "الإبداعات",
    "nav.culture": "الثقافة",
    "nav.contact": "اتصل بنا",
    "nav.search": "بحث",
    "nav.favorites": "المفضلة",
    "nav.cart": "السلة",
    "brand.tagline": "الحرفية",

    "hero.kicker": "ⵜⴰⵎⵖⴰⵔⵜ",
    "hero.title": "نحتفي بمهارة المرأة الأمازيغية",
    "hero.desc": "اكتشفوا إبداعات فريدة تحمل التاريخ والتقاليد وجمالاً موروثاً جيلاً بعد جيل.",
    "hero.cta1": "اكتشف الكتالوج",
    "hero.cta2": "استكشف الثقافة",

    "regions.kicker": "المناطق",
    "regions.title": "المناطق الأمازيغية في المغرب",
    "regions.desc": "من الريف إلى سوس، لكل وادٍ زخارفه وألوانه ولمساته.",

    "search.kicker": "استكشف",
    "search.title": "ابحث عن إبداع أو حرفية",
    "search.placeholder": "زرابي، حلي، فخار، فاطمة، الأطلس...",
    "search.filter": "تصفية",
    "search.creations": "الإبداعات",
    "search.artisans": "الحرفيات",
    "search.none.creations": "لا توجد إبداعات.",
    "search.none.artisans": "لا توجد حرفيات.",

    "pillars.1.t": "التراث والتقاليد",
    "pillars.1.d": "زخارف وتقنيات متوارثة منذ قرون.",
    "pillars.2.t": "المهارة الحرفية",
    "pillars.2.d": "كل قطعة مصنوعة يدوياً وفريدة.",
    "pillars.3.t": "إبداعات أصيلة",
    "pillars.3.d": "بدون وسطاء وبدون نسخ.",
    "pillars.4.t": "نساء ملهمات",
    "pillars.4.d": "دعم ورشاتهن هو دعم لقراهن.",
    "pillars.cta": "اكتشف ←",

    "artisans.kicker": "بورتريهات",
    "artisans.title": "الحرفيات",
    "artisans.all": "عرض الكل ←",

    "creations.kicker": "المجموعة",
    "creations.title": "إبداعات مميزة",
    "creations.all": "الكتالوج الكامل ←",

    "culture.kicker": "الثقافة",
    "culture.title": "رموز وزخارف وذاكرة",
    "culture.desc": "كل خيط منسوج، كل وشم، كل حلية تروي قصة. انغمسوا في عالم الأمازيغ.",
    "culture.cta": "زيارة المعرض",

    "stats.kicker": "بالأرقام",
    "stats.title": "أثرنا معاً",
    "stats.artisans": "حرفيات شريكات",
    "stats.artisans.sub": "في وديان المغرب",
    "stats.creations": "إبداعات فريدة",
    "stats.creations.sub": "في الكتالوج، صنع يدوي",
    "stats.sales": "قطع مباعة",
    "stats.sales.sub": "لمحبين في العالم",

    "footer.explore": "استكشف",
    "footer.house": "البيت",
    "footer.artisans": "الحرفيات",
    "footer.catalog": "الكتالوج",
    "footer.gallery": "المعرض الثقافي",
    "footer.search": "بحث",
    "footer.contact": "اتصل بنا",
    "footer.admin": "فضاء الإدارة",
    "footer.about": "تامغارت الحرفية — تراث حي للمرأة الأمازيغية المغربية.",
    "footer.brand.desc": "تراث · إبداع · أصالة. علامة تحتفي بالمرأة الأمازيغية.",
    "footer.bottom": "تراث · إبداع · أصالة",
  },
  tif: {
    "nav.home": "ⴰⵙⵏⵓⴱⴳ",
    "nav.artisans": "ⵜⵉⵎⵖⴰⵔⵉⵏ",
    "nav.creations": "ⵜⵉⵙⵏⵓⵍⴰ",
    "nav.culture": "ⵜⴰⴷⵍⵙⴰ",
    "nav.contact": "ⴰⵎⵢⴰⵡⴰⴹ",
    "nav.search": "ⵔⵣⵓ",
    "nav.favorites": "ⵉⵎⵓⵙⵙⵓⵜⵏ",
    "nav.cart": "ⵜⴰⵇⵕⴰⴱⵜ",
    "brand.tagline": "ⵍⴰⵕⵟⵉⵙⴰⵏ",

    "hero.kicker": "ⵜⴰⵎⵖⴰⵔⵜ",
    "hero.title": "ⴰⴷ ⵏⵙⵏⵓⴱⴳ ⵜⵓⵙⵙⵏⴰ ⵏ ⵜⵎⵖⴰⵔⵉⵏ ⵉⵎⴰⵣⵉⵖⵏ",
    "hero.desc": "ⴰⴼ ⵜⵉⵙⵏⵓⵍⴰ ⵉⵏⵎⴻⵍ ⴷ ⵓⵎⵣⵔⵓⵢ.",
    "hero.cta1": "ⴰⴼ ⴰⴽⴰⵜⴰⵍⵓⴳ",
    "hero.cta2": "ⴰⴼ ⵜⴰⴷⵍⵙⴰ",

    "regions.kicker": "ⵜⵉⵎⵏⴰⴹⵉⵏ",
    "regions.title": "ⵜⵉⵎⵏⴰⴹⵉⵏ ⵉⵎⴰⵣⵉⵖⵏ ⵏ ⵍⵎⵖⵔⵉⴱ",
    "regions.desc": "ⵙⴳ ⴰⵔⵔⵉⴼ ⴰⵔ ⵙⵓⵙⵙ.",

    "search.kicker": "ⴰⴼ",
    "search.title": "ⴰⴼ ⵜⴰⵙⵏⵓⵍⵜ ⵏⵖ ⵜⴰⵎⵖⴰⵔⵜ",
    "search.placeholder": "ⵉⵃⵏⴱⵍ, ⵉⵎⵣⵓⴹⵏ...",
    "search.filter": "ⵙⴻⵍⴽⴻⵎ",
    "search.creations": "ⵜⵉⵙⵏⵓⵍⴰ",
    "search.artisans": "ⵜⵉⵎⵖⴰⵔⵉⵏ",
    "search.none.creations": "ⵓⵔ ⵉⵍⵍⵉ.",
    "search.none.artisans": "ⵓⵔ ⵉⵍⵍⵉ.",

    "pillars.1.t": "ⴰⵎⵣⵔⵓⵢ ⴷ ⵜⴰⵏⴽⵔⴰ",
    "pillars.1.d": "ⵉⵎⴰⴳⵔⴰⴷⵏ ⴷ ⵜⵉⴽⴽⵉⵏⵉⴽⵉⵏ.",
    "pillars.2.t": "ⵜⴰⵎⴰⵙⵙⴰⵏⵜ",
    "pillars.2.d": "ⴽⵓⵍ ⵜⴰⵙⵏⵓⵍⵜ ⵜⵙⵏⵓⵍⵜ ⵙ ⵓⴼⵓⵙ.",
    "pillars.3.t": "ⵜⵉⵙⵏⵓⵍⴰ ⵜⵉⴷⵉⵜ",
    "pillars.3.d": "ⵓⵔ ⵉⵍⵍⵉ ⵓⵎⴰⵍⴽⵎ.",
    "pillars.4.t": "ⵜⵉⵎⵖⴰⵔⵉⵏ ⵏⵏⴽⵔⴰⵏ",
    "pillars.4.d": "ⴰⴽⴽⵎⵔⵏⵜ ⵉⴷⵓⴷⴰⵔ ⵏⵏⵙⵏⵜ.",
    "pillars.cta": "ⴰⴼ →",

    "artisans.kicker": "ⵉⵎⵙⵍⵉⵜⵏ",
    "artisans.title": "ⵜⵉⵎⵖⴰⵔⵉⵏ",
    "artisans.all": "ⵉⵏⵉ ⴰⴽⴽ →",

    "creations.kicker": "ⴰⵙⵉⵍⵉ",
    "creations.title": "ⵜⵉⵙⵏⵓⵍⴰ ⵜⵉⵎⵇⵔⴰⵏⵉⵏ",
    "creations.all": "ⴰⴽⴰⵜⴰⵍⵓⴳ →",

    "culture.kicker": "ⵜⴰⴷⵍⵙⴰ",
    "culture.title": "ⵉⵎⴰⴳⵔⴰⴷⵏ ⴷ ⵓⵎⴽⵜⵉ",
    "culture.desc": "ⴽⵓⵍ ⵓⴱⵔⵉⴷ ⵉⵏⵏⴰ ⴰⵎⵣⵔⵓⵢ.",
    "culture.cta": "ⴰⴼ ⵉⵎⴰⵣⵉⵖⵏ",

    "stats.kicker": "ⵙ ⵓⵎⴹⴰⵏ",
    "stats.title": "ⴰⴱⴰⵖⵓⵔ ⵏⵏⵖ",
    "stats.artisans": "ⵜⵉⵎⵖⴰⵔⵉⵏ",
    "stats.artisans.sub": "ⴳ ⵉⴷⵓⴷⴰⵔ ⵏ ⵍⵎⵖⵔⵉⴱ",
    "stats.creations": "ⵜⵉⵙⵏⵓⵍⴰ",
    "stats.creations.sub": "ⵙ ⵓⴼⵓⵙ",
    "stats.sales": "ⵜⵉⵙⵏⵓⵍⴰ ⵉⵙⵏⵓⵣⵏ",
    "stats.sales.sub": "ⵉ ⵓⵎⴰⴹⴰⵍ",

    "footer.explore": "ⴰⴼ",
    "footer.house": "ⴰⵅⴰⵎ",
    "footer.artisans": "ⵜⵉⵎⵖⴰⵔⵉⵏ",
    "footer.catalog": "ⴰⴽⴰⵜⴰⵍⵓⴳ",
    "footer.gallery": "ⴰⵙⴰⵍⵓ",
    "footer.search": "ⵔⵣⵓ",
    "footer.contact": "ⴰⵎⵢⴰⵡⴰⴹ",
    "footer.admin": "ⴰⵏⴱⴰⴹ",
    "footer.about": "ⵜⴰⵎⵖⴰⵔⵜ ⵍⴰⵕⵟⵉⵙⴰⵏ — ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⵎⵖⴰⵔⵉⵏ.",
    "footer.brand.desc": "ⴰⵎⵣⵔⵓⵢ · ⵜⴰⵙⵏⵓⵍⵜ · ⵜⵉⴷⵉⵜ.",
    "footer.bottom": "ⴰⵎⵣⵔⵓⵢ · ⵜⴰⵙⵏⵓⵍⵜ · ⵜⵉⴷⵉⵜ",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export const LANG_LABELS: { code: Lang; short: string; full: string }[] = [
  { code: "fr", short: "FR", full: "Français" },
  { code: "en", short: "EN", full: "English" },
  { code: "ar", short: "ع", full: "العربية" },
  { code: "tif", short: "ⵣ", full: "ⵜⴰⵎⴰⵣⵉⵖⵜ" },
];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tamghart_lang") as Lang | null;
      if (saved && dicts[saved]) setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "tif" ? "ber" : lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("tamghart_lang", l); } catch {}
  }, []);
  const t = useCallback((k: string) => dicts[lang][k] ?? dicts.fr[k] ?? k, [lang]);
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const v = useContext(I18nCtx);
  if (!v) throw new Error("I18nProvider missing");
  return v;
}
