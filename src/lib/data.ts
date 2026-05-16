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
  { id: "fatima-azuli", firstName: "Fatima", lastName: "Azuli", region: "Haut Atlas, Maroc", craft: "Tissage de tapis", bio: "Tisseuse depuis l'âge de douze ans, Fatima perpétue les motifs hérités de sa grand-mère. Chaque tapis raconte une histoire de la montagne et un savoir transmis de mère en fille.", image: artisane1, experienceYears: 30 },
  { id: "yamina-tachfin", firstName: "Yamina", lastName: "Tachfin", region: "Aït Bouguemez", craft: "Tissage & teinture naturelle", bio: "Yamina cultive ses propres plantes tinctoriales. Garance, indigo, henné — ses couleurs viennent de la terre et donnent à chaque tapis Azilal son éclat unique.", image: artisane2, experienceYears: 45 },
  { id: "lalla-itto", firstName: "Lalla", lastName: "Itto", region: "Vallée du Drâa", craft: "Broderie & couture traditionnelle", bio: "Spécialiste de la broderie de fête, Lalla Itto enseigne aux jeunes femmes de son village les points anciens transmis de génération en génération.", image: artisane3, experienceYears: 20 },
  { id: "khadija-amzil", firstName: "Khadija", lastName: "Amzil", region: "Tiznit, Anti-Atlas", craft: "Bijoux d'argent berbères", bio: "Khadija perpétue l'art ancestral du bijou amazigh : argent ciselé, corail, ambre et émail. Chaque pièce porte un sens, une protection, une histoire.", image: artisaneBijoux, experienceYears: 28 },
  { id: "tamou-bouzid", firstName: "Tamou", lastName: "Bouzid", region: "Vallée de l'Ourika", craft: "Poterie traditionnelle", bio: "Tamou façonne l'argile à la main selon des techniques millénaires. Ses vases et tagines, cuits au feu de bois, portent les motifs sacrés de sa tribu.", image: artisanePoterie, experienceYears: 35 },
] as Omit<Artisane, "name" | "experience">[]).map(mk);

export type Review = { author: string; rating: number; text: string; date: string };

export type Creation = {
  id: string;
  name: string;
  artisaneId: string;
  category: "Tapis" | "Bijoux" | "Broderie" | "Poterie";
  price: number;
  image: string;
  available: boolean;
  description: string;
  funFact: string;
  history: string[];
  reviews: Review[];
};

const r = (author: string, rating: number, text: string, date: string): Review => ({ author, rating, text, date });

export const creations: Creation[] = [
  { id: "tapis-beni", name: "Tapis Beni Ouarain", artisaneId: "fatima-azuli", category: "Tapis", price: 4500, image: imgTapisBeni, available: true, description: "Tapis en laine vierge écrue, motifs losanges noirs. 2x3m, tissé main pendant 4 mois.",
    funFact: "Les losanges noirs des tapis Beni Ouarain représentent traditionnellement la fertilité féminine et protègent du mauvais œil.",
    history: [
      "Le tapis Beni Ouarain tire son nom d'une confédération de 17 tribus berbères installées dans le Moyen Atlas marocain depuis le XIIᵉ siècle.",
      "Tissés exclusivement par les femmes pendant les longs hivers, ces tapis servaient à la fois de couvertures, de literie et d'isolation contre le froid des montagnes.",
      "Le motif losange — emblématique — symbolise la matrice féminine, la fertilité et la protection du foyer. Sa simplicité chromatique (laine écrue + lignes brunes) en fait aujourd'hui un objet prisé du design contemporain.",
    ],
    reviews: [r("Sophie M.", 5, "Magnifique pièce, encore plus belle en vrai. Livraison soignée.", "Avr. 2026"), r("Yassine B.", 5, "Tissage impeccable. On sent le travail patient.", "Mars 2026")] },
  { id: "tapis-haut-atlas", name: "Tapis Haut Atlas", artisaneId: "fatima-azuli", category: "Tapis", price: 5200, image: textile, available: true, description: "Pièce d'exception aux motifs géométriques anciens du Haut Atlas.",
    funFact: "Chaque motif géométrique de ce tapis correspond à un mot du tifinagh — l'écriture amazighe vieille de plus de 2500 ans.",
    history: ["Les motifs du Haut Atlas sont une véritable écriture tissée. Les femmes y inscrivent les événements de leur vie : naissance, mariage, voyage."],
    reviews: [r("Emma L.", 4, "Couleurs chaudes, parfait dans mon salon.", "Fév. 2026")] },
  { id: "coussin-kilim", name: "Coussin Kilim", artisaneId: "fatima-azuli", category: "Broderie", price: 450, image: imgCoussin, available: true, description: "Coussin kilim 50x50cm, motifs traditionnels et finitions cousues main.",
    funFact: "Le mot kilim vient du persan « gelim » et désigne un tissage plat sans nœuds, plus ancien que le tapis noué.",
    history: ["Le kilim existe depuis le néolithique. Les femmes amazighes l'ont toujours utilisé pour tapisser leurs tentes nomades."],
    reviews: [r("Jamal O.", 5, "Très belle finition, recommandé.", "Mars 2026")] },
  { id: "tapis-azilal", name: "Tapis Azilal coloré", artisaneId: "yamina-tachfin", category: "Tapis", price: 3800, image: imgTapisAzilal, available: true, description: "Tapis Azilal teint aux pigments naturels — garance, indigo, safran.",
    funFact: "Le rouge intense provient de la racine de garance, plante cultivée par Yamina elle-même dans les jardins d'Aït Bouguemez.",
    history: ["Les tapis Azilal sont reconnaissables à leurs couleurs vives et leur narration libre. Chaque tisseuse improvise, contrairement aux Beni Ouarain plus codifiés."],
    reviews: [r("Claire D.", 5, "Couleurs vibrantes, qualité exceptionnelle.", "Avr. 2026"), r("Mehdi A.", 5, "Un cadeau parfait pour ma mère.", "Mars 2026")] },
  { id: "tapis-kilim-yamina", name: "Kilim plat tissé", artisaneId: "yamina-tachfin", category: "Tapis", price: 2400, image: collection, available: true, description: "Kilim léger, idéal pour décoration murale ou tapis d'entrée.",
    funFact: "Ce kilim peut s'accrocher au mur : c'est ainsi qu'il était traditionnellement exposé lors des grandes fêtes amazighes.",
    history: ["Le kilim mural raconte l'histoire de la maison qui le possède. On l'offrait souvent aux jeunes mariés."],
    reviews: [r("Olivia R.", 4, "Léger et bien fini.", "Fév. 2026")] },
  { id: "chale-draa", name: "Châle brodé Drâa", artisaneId: "lalla-itto", category: "Broderie", price: 850, image: imgChale, available: false, description: "Châle de fête brodé fil de soie, motifs floraux multicolores.",
    funFact: "Les fleurs brodées sur ce châle protègent symboliquement la femme qui le porte lors des mariages traditionnels.",
    history: ["La broderie du Drâa puise son inspiration dans les oasis du sud marocain. Chaque motif floral est une prière de fertilité."],
    reviews: [r("Hassan T.", 5, "Travail d'exception. Ma femme l'adore.", "Janv. 2026")] },
  { id: "robe-brodee", name: "Caftan brodé main", artisaneId: "lalla-itto", category: "Broderie", price: 2200, image: collection, available: true, description: "Caftan en lin brodé à la main pendant 6 semaines.",
    funFact: "Un caftan traditionnel demande entre 200 et 400 heures de broderie — soit l'équivalent de 10 semaines de travail.",
    history: ["Le caftan brodé est devenu un symbole de l'élégance marocaine, mêlant influences andalouses, ottomanes et amazighes."],
    reviews: [r("Aïcha B.", 5, "Sublime, je le porterai à mon mariage.", "Avr. 2026")] },
  { id: "collier-coral", name: "Collier corail & argent", artisaneId: "khadija-amzil", category: "Bijoux", price: 1200, image: imgCollier, available: true, description: "Collier traditionnel en argent ciselé orné de perles de corail rouge.",
    funFact: "Le corail rouge porté par les femmes amazighes est censé protéger contre le mauvais œil et favoriser la fertilité.",
    history: ["Les bijoux d'argent berbères sont avant tout des amulettes. Le corail, importé de la Méditerranée, traverse le Sahara depuis l'Antiquité."],
    reviews: [r("Léa P.", 5, "Pièce unique, magnifique.", "Mars 2026"), r("Said M.", 5, "Cadeau parfait pour ma fille.", "Fév. 2026")] },
  { id: "boucles-fibule", name: "Fibule & boucles d'oreilles", artisaneId: "khadija-amzil", category: "Bijoux", price: 980, image: imgBoucles, available: true, description: "Parure en argent gravé, motifs solaires amazighs.",
    funFact: "La fibule, ou tisseghnest, servait à fermer le drapé du haïk : elle est aujourd'hui portée comme symbole d'identité amazighe.",
    history: ["La fibule est l'un des plus anciens bijoux d'Afrique du Nord, attestée dès l'époque romaine en Maurétanie tingitane."],
    reviews: [r("Nora E.", 5, "Détails ciselés magnifiques.", "Avr. 2026")] },
  { id: "bracelet-argent", name: "Bracelet argent gravé", artisaneId: "khadija-amzil", category: "Bijoux", price: 650, image: imgBoucles, available: true, description: "Manchette en argent massif, gravure à la main de symboles berbères.",
    funFact: "Les motifs solaires gravés sur cette manchette étaient autrefois portés par les jeunes filles pour attirer la lumière et la chance.",
    history: ["Les manchettes lourdes étaient données en dot aux jeunes mariées : leur poids en argent constituait leur capital personnel."],
    reviews: [r("Inès G.", 4, "Belle pièce, un peu lourde mais authentique.", "Mars 2026")] },
  { id: "vase-ourika", name: "Vase d'Ourika", artisaneId: "tamou-bouzid", category: "Poterie", price: 720, image: imgVase, available: true, description: "Vase en terre cuite, peint à la main avec motifs amazighs noirs.",
    funFact: "La peinture noire est obtenue à partir d'oxyde de manganèse mélangé à de la résine de lentisque cueillie dans la vallée.",
    history: ["La poterie d'Ourika est antérieure à la roue de potier : elle est façonnée au colombin, technique vieille de 7000 ans."],
    reviews: [r("Marta V.", 5, "Pièce d'art, je suis ravie.", "Avr. 2026")] },
  { id: "tagine-decoratif", name: "Tagine peint à la main", artisaneId: "tamou-bouzid", category: "Poterie", price: 540, image: imgTagine, available: true, description: "Tagine décoratif en argile, motifs floraux peints au pinceau.",
    funFact: "Le tagine doit son nom à sa forme conique qui condense la vapeur — un principe de cuisson inventé par les Amazighs il y a plus de 1000 ans.",
    history: ["Cuit au feu de bois et de bouse séchée, ce tagine acquiert sa robe ocre caractéristique grâce aux variations de température."],
    reviews: [r("Pierre N.", 5, "Très joli en décoration.", "Mars 2026")] },
  { id: "plat-poterie", name: "Plat berbère", artisaneId: "tamou-bouzid", category: "Poterie", price: 380, image: imgVase, available: false, description: "Plat de service en terre cuite, façonné et peint à la main.",
    funFact: "Les plats berbères servaient lors des fêtes communautaires : un seul plat pouvait nourrir 8 à 10 convives.",
    history: ["Le plat de service est au cœur du repas amazigh, où l'on mange à la main, ensemble, autour d'une même pièce."],
    reviews: [] },
];

export const symboles = [
  { name: "Zay ⵣ", meaning: "Symbole de l'homme libre, identité amazighe." },
  { name: "Tafukt", meaning: "Le soleil, source de vie et de renaissance." },
  { name: "Tislit", meaning: "La fiancée, fertilité et union." },
  { name: "Aman", meaning: "L'eau, pureté et abondance." },
  { name: "Idrarn", meaning: "Les montagnes, force et permanence." },
  { name: "Tmaghart", meaning: "La femme, gardienne du foyer et de la mémoire." },
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
  {
    slug: "tatouages-memoire",
    title: "Les tatouages, mémoire de la peau",
    excerpt: "Avant le henné des mariages, les femmes amazighes portaient sur le menton, le front, les mains, les tatouages de leur tribu.",
    image: collection,
    content: [
      "Le tatouage amazigh — ticherrad — était à la fois rite de passage, marqueur d'identité tribale, et amulette protectrice.",
      "Réalisés à l'aiguille et à la suie de bois, les motifs disaient le statut, l'âge, l'origine. Une croix sur le front signalait souvent une femme mariée ; les lignes sur le menton, une jeune fille en âge de l'être.",
      "Aujourd'hui presque disparu chez les jeunes générations, le tatouage survit dans les bijoux, les broderies, les tapis — autant de prolongements graphiques du même langage.",
    ],
  },
  {
    slug: "henne-mariages",
    title: "Le henné, art éphémère des grands jours",
    excerpt: "Mariages, fêtes religieuses, naissances : le henné dessine sur la peau les motifs sacrés de la culture amazighe.",
    image: textile,
    content: [
      "La nuit du henné, deux jours avant le mariage, est un rituel féminin essentiel. Les femmes de la famille se rassemblent et la mariée reçoit les premiers motifs sur ses mains et ses pieds.",
      "Les dessins varient selon les régions : à Ouarzazate, des étoiles ; au Souss, des losanges et chevrons ; dans le Rif, des motifs floraux délicats.",
      "Le henné n'est jamais purement décoratif : il protège du mauvais œil, attire la fertilité et inscrit la femme dans la lignée des aïeules.",
    ],
  },
  {
    slug: "chant-ahidous",
    title: "L'ahidous, le chant qui rassemble",
    excerpt: "Bien plus qu'une danse, l'ahidous est la voix collective des villages du Moyen et du Haut Atlas.",
    image: imgChale,
    content: [
      "Dans les villages de l'Atlas, les soirs de fête, hommes et femmes forment un cercle. Au son du bendir, ils chantent à l'unisson — c'est l'ahidous.",
      "Les paroles, improvisées sur le moment, parlent d'amour, de saisons, de politique, de souffrance. Chaque village a son répertoire et ses meilleurs voix.",
      "Inscrit au patrimoine immatériel de l'UNESCO, l'ahidous reste l'un des rares moments où voix masculines et féminines s'entrelacent à égalité.",
    ],
  },
];

export const stats = {
  artisanes: artisanes.length,
  creations: creations.length,
  ventes: 1247,
};
