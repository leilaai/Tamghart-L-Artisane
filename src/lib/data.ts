import artisane1 from "@/assets/artisane-1.jpg";
import artisane2 from "@/assets/artisane-2.jpg";
import artisane3 from "@/assets/artisane-3.jpg";
import artisanePoterie from "@/assets/artisane-poterie.jpg";
import artisaneBijoux from "@/assets/artisane-bijoux.jpg";
import textile from "@/assets/textile-amazigh.jpg";
import collection from "@/assets/creations-collection.jpg";
import imgTapisBeni from "@/assets/creation-tapis-beni.jpg";
import imgTapisAzilal from "@/assets/creation-tapis-azilal.jpg";
import imgCollier from "@/assets/creation-collier.jpg";
import imgBoucles from "@/assets/creation-boucles.jpg";
import imgChale from "@/assets/creation-chale.jpg";
import imgCoussin from "@/assets/creation-coussin.jpg";
import imgVase from "@/assets/creation-vase.jpg";
import imgTagine from "@/assets/creation-tagine.jpg";

export type Artisane = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  region: string;
  craft: string;
  bio: string;
  image: string;
  experienceYears: number;
  experience: string;
};

const mk = (a: Omit<Artisane, "name" | "experience">): Artisane => ({
  ...a,
  name: `${a.firstName} ${a.lastName}`,
  experience: `${a.experienceYears} ans d'expérience`,
});

export const artisanes: Artisane[] = ([
  {
    id: "fatima-azuli",
    firstName: "Fatima",
    lastName: "Azuli",
    region: "Haut Atlas, Maroc",
    craft: "Tissage de tapis",
    bio: "Tisseuse depuis l'âge de douze ans, Fatima perpétue les motifs hérités de sa grand-mère. Chaque tapis raconte une histoire de la montagne et un savoir transmis de mère en fille.",
    image: artisane1,
    experienceYears: 30,
  },
  {
    id: "yamina-tachfin",
    firstName: "Yamina",
    lastName: "Tachfin",
    region: "Aït Bouguemez",
    craft: "Tissage & teinture naturelle",
    bio: "Yamina cultive ses propres plantes tinctoriales. Garance, indigo, henné — ses couleurs viennent de la terre et donnent à chaque tapis Azilal son éclat unique.",
    image: artisane2,
    experienceYears: 45,
  },
  {
    id: "lalla-itto",
    firstName: "Lalla",
    lastName: "Itto",
    region: "Vallée du Drâa",
    craft: "Broderie & couture traditionnelle",
    bio: "Spécialiste de la broderie de fête, Lalla Itto enseigne aux jeunes femmes de son village les points anciens transmis de génération en génération.",
    image: artisane3,
    experienceYears: 20,
  },
  {
    id: "khadija-amzil",
    firstName: "Khadija",
    lastName: "Amzil",
    region: "Tiznit, Anti-Atlas",
    craft: "Bijoux d'argent berbères",
    bio: "Khadija perpétue l'art ancestral du bijou amazigh : argent ciselé, corail, ambre et émail. Chaque pièce porte un sens, une protection, une histoire.",
    image: artisaneBijoux,
    experienceYears: 28,
  },
  {
    id: "tamou-bouzid",
    firstName: "Tamou",
    lastName: "Bouzid",
    region: "Vallée de l'Ourika",
    craft: "Poterie traditionnelle",
    bio: "Tamou façonne l'argile à la main selon des techniques millénaires. Ses vases et tagines, cuits au feu de bois, portent les motifs sacrés de sa tribu.",
    image: artisanePoterie,
    experienceYears: 35,
  },
];

export type Creation = {
  id: string;
  name: string;
  artisaneId: string;
  category: "Tapis" | "Bijoux" | "Broderie" | "Poterie";
  price: number;
  image: string;
  available: boolean;
  description: string;
};

export const creations: Creation[] = [
  { id: "tapis-beni", name: "Tapis Beni Ouarain", artisaneId: "fatima-azuli", category: "Tapis", price: 4500, image: imgTapisBeni, available: true, description: "Tapis en laine vierge écrue, motifs losanges noirs. 2x3m, tissé main pendant 4 mois." },
  { id: "tapis-haut-atlas", name: "Tapis Haut Atlas", artisaneId: "fatima-azuli", category: "Tapis", price: 5200, image: textile, available: true, description: "Pièce d'exception aux motifs géométriques anciens du Haut Atlas." },
  { id: "coussin-kilim", name: "Coussin Kilim", artisaneId: "fatima-azuli", category: "Broderie", price: 450, image: imgCoussin, available: true, description: "Coussin kilim 50x50cm, motifs traditionnels et finitions cousues main." },

  { id: "tapis-azilal", name: "Tapis Azilal coloré", artisaneId: "yamina-tachfin", category: "Tapis", price: 3800, image: imgTapisAzilal, available: true, description: "Tapis Azilal teint aux pigments naturels — garance, indigo, safran." },
  { id: "tapis-kilim-yamina", name: "Kilim plat tissé", artisaneId: "yamina-tachfin", category: "Tapis", price: 2400, image: collection, available: true, description: "Kilim léger, idéal pour décoration murale ou tapis d'entrée." },

  { id: "chale-draa", name: "Châle brodé Drâa", artisaneId: "lalla-itto", category: "Broderie", price: 850, image: imgChale, available: false, description: "Châle de fête brodé fil de soie, motifs floraux multicolores." },
  { id: "robe-brodee", name: "Caftan brodé main", artisaneId: "lalla-itto", category: "Broderie", price: 2200, image: collection, available: true, description: "Caftan en lin brodé à la main pendant 6 semaines." },

  { id: "collier-coral", name: "Collier corail & argent", artisaneId: "khadija-amzil", category: "Bijoux", price: 1200, image: imgCollier, available: true, description: "Collier traditionnel en argent ciselé orné de perles de corail rouge." },
  { id: "boucles-fibule", name: "Fibule & boucles d'oreilles", artisaneId: "khadija-amzil", category: "Bijoux", price: 980, image: imgBoucles, available: true, description: "Parure en argent gravé, motifs solaires amazighs." },
  { id: "bracelet-argent", name: "Bracelet argent gravé", artisaneId: "khadija-amzil", category: "Bijoux", price: 650, image: imgBoucles, available: true, description: "Manchette en argent massif, gravure à la main de symboles berbères." },

  { id: "vase-ourika", name: "Vase d'Ourika", artisaneId: "tamou-bouzid", category: "Poterie", price: 720, image: imgVase, available: true, description: "Vase en terre cuite, peint à la main avec motifs amazighs noirs." },
  { id: "tagine-decoratif", name: "Tagine peint à la main", artisaneId: "tamou-bouzid", category: "Poterie", price: 540, image: imgTagine, available: true, description: "Tagine décoratif en argile, motifs floraux peints au pinceau." },
  { id: "plat-poterie", name: "Plat berbère", artisaneId: "tamou-bouzid", category: "Poterie", price: 380, image: imgVase, available: false, description: "Plat de service en terre cuite, façonné et peint à la main." },
];

export const symboles = [
  { name: "Yaz ⵣ", meaning: "Symbole de l'homme libre, identité amazighe." },
  { name: "Tafukt", meaning: "Le soleil, source de vie et de renaissance." },
  { name: "Tislit", meaning: "La fiancée, fertilité et union." },
  { name: "Aman", meaning: "L'eau, pureté et abondance." },
  { name: "Idurar", meaning: "Les montagnes, force et permanence." },
  { name: "Talwit", meaning: "La paix, harmonie entre les êtres." },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "tissage-ecriture",
    title: "Le tissage, une écriture sans mots",
    excerpt: "Comprendre comment les motifs des tapis Beni Ouarain se transmettent de mère en fille depuis le XVIᵉ siècle.",
    image: textile,
    content: [
      "Dans les villages du Haut Atlas, le métier à tisser est le premier livre de la jeune fille. Avant même de lire l'arabe ou le tifinagh, elle apprend à reconnaître les losanges, les chevrons, les peignes — un alphabet de laine.",
      "Chaque motif raconte un fragment de vie : la naissance, la fertilité, la protection contre le mauvais œil, le voyage, la mort. Le tapis devient ainsi un journal intime tissé sur plusieurs mois, parfois plusieurs années.",
      "Les tisseuses Beni Ouarain utilisent presque exclusivement la laine non teintée — blanc cassé pour le fond, brun foncé pour les lignes. Cette sobriété chromatique amplifie la force graphique des motifs et donne à chaque pièce sa modernité intemporelle.",
      "Aujourd'hui, des collectionneurs du monde entier s'arrachent ces pièces, mais les tisseuses, elles, continuent de tisser pour leurs filles, leurs maisons, leur mémoire.",
    ],
  },
  {
    slug: "bijoux-argent",
    title: "Bijoux d'argent, ancrage du féminin",
    excerpt: "L'argent, le corail et l'ambre : matériaux protecteurs portés depuis l'enfance.",
    image: collection,
    content: [
      "Chez les Amazighs, le bijou n'est jamais un simple ornement. Il est protection, dot, mémoire, et signe d'appartenance à une tribu, une vallée, une histoire.",
      "L'argent, métal lunaire, est porté par les femmes dès le plus jeune âge. Le corail rouge éloigne le mauvais œil, l'ambre attire la chaleur et la fertilité, et l'émail vert ou jaune rappelle les couleurs de la nature.",
      "Les fibules, ces grandes broches qui retenaient autrefois le drapé du haïk, sont aujourd'hui réinventées en pendentifs — mais leur géométrie sacrée reste intacte.",
      "Khadija Amzil, à Tiznit, fait partie des dernières femmes à graver elle-même chaque pièce, sans gabarit, sans machine. Un savoir qu'elle transmet à ses nièces depuis vingt ans.",
    ],
  },
  {
    slug: "poterie-feu",
    title: "La poterie, terre et feu",
    excerpt: "Façonnée sans tour et cuite au feu de bois, la poterie amazighe est l'un des plus anciens artisanats du Maghreb.",
    image: imgVase,
    content: [
      "Avant la roue de potier, il y avait les mains. Les femmes de l'Ourika, du Rif et de l'Atlas façonnent l'argile au colombin, l'aplatissent à la pierre, la lissent à la coquille.",
      "Les motifs noirs sont peints à l'oxyde de manganèse mélangé à de la résine de lentisque. Cuite à l'air libre dans un feu de bois et de bouse séchée, la poterie acquiert sa robe ocre et ses contrastes.",
      "Chaque atelier a sa signature : à Ourika, ce sont les losanges et les peignes ; au Rif, les triangles et les croix ; au Sud, les motifs floraux stylisés.",
    ],
  },
];
