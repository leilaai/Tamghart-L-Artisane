import artisane1 from "@/assets/artisane-1.jpg";
import artisane2 from "@/assets/artisane-2.jpg";
import artisane3 from "@/assets/artisane-3.jpg";
import textile from "@/assets/textile-amazigh.jpg";
import collection from "@/assets/creations-collection.jpg";

export type Artisane = {
  id: string;
  name: string;
  region: string;
  craft: string;
  bio: string;
  image: string;
  experience: string;
};

export type Creation = {
  id: string;
  name: string;
  artisaneId: string;
  category: "Tapis" | "Bijoux" | "Broderie" | "Poterie";
  price: number;
  image: string;
  available: boolean;
};

export const artisanes: Artisane[] = [
  {
    id: "fatima-azuli",
    name: "Fatima Azuli",
    region: "Haut Atlas, Maroc",
    craft: "Tissage de tapis",
    bio: "Tisseuse depuis l'âge de douze ans, Fatima perpétue les motifs hérités de sa grand-mère. Chaque tapis raconte une histoire de la montagne.",
    image: artisane1,
    experience: "30 ans d'expérience",
  },
  {
    id: "yamina-tachfin",
    name: "Yamina Tachfin",
    region: "Aït Bouguemez",
    craft: "Filage de laine & teinture naturelle",
    bio: "Yamina cultive ses propres plantes tinctoriales. Garance, indigo, henné — ses couleurs viennent de la terre.",
    image: artisane2,
    experience: "45 ans d'expérience",
  },
  {
    id: "lalla-itto",
    name: "Lalla Itto",
    region: "Vallée du Drâa",
    craft: "Broderie & couture traditionnelle",
    bio: "Spécialiste de la broderie de fête, Lalla Itto enseigne aux jeunes femmes de son village les points anciens.",
    image: artisane3,
    experience: "20 ans d'expérience",
  },
];

export const creations: Creation[] = [
  { id: "c1", name: "Tapis Beni Ouarain", artisaneId: "fatima-azuli", category: "Tapis", price: 4500, image: textile, available: true },
  { id: "c2", name: "Collier de coral & argent", artisaneId: "lalla-itto", category: "Bijoux", price: 1200, image: collection, available: true },
  { id: "c3", name: "Châle brodé Drâa", artisaneId: "lalla-itto", category: "Broderie", price: 850, image: collection, available: false },
  { id: "c4", name: "Tapis Azilal", artisaneId: "yamina-tachfin", category: "Tapis", price: 3800, image: textile, available: true },
  { id: "c5", name: "Boucles d'oreilles berbères", artisaneId: "lalla-itto", category: "Bijoux", price: 650, image: collection, available: true },
  { id: "c6", name: "Coussin Kilim", artisaneId: "fatima-azuli", category: "Broderie", price: 450, image: textile, available: true },
];

export const symboles = [
  { name: "Yaz ⵣ", meaning: "Symbole de l'homme libre, identité amazighe." },
  { name: "Tafukt", meaning: "Le soleil, source de vie et de renaissance." },
  { name: "Tislit", meaning: "La fiancée, fertilité et union." },
  { name: "Aman", meaning: "L'eau, pureté et abondance." },
  { name: "Idurar", meaning: "Les montagnes, force et permanence." },
  { name: "Talwit", meaning: "La paix, harmonie entre les êtres." },
];
