import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "sn7mthea",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documents = [
  // Chef (singleton)
  {
    _id: "chef-principal",
    _type: "chef",
    nom: "Chef Maison Saveur",
    citation:
      "La cuisine n'est pas une simple affaire de gout, c'est un moment de partage absolu ou le temps s'arrete.",
  },
  // Services
  {
    _type: "service",
    titre: "Diner Prive",
    description:
      "Un menu gastronomique en plusieurs temps servi dans l'intimite de votre demeure.",
    ordre: 1,
  },
  {
    _type: "service",
    titre: "Cocktail Reception",
    description:
      "Bouchees creatives et accords mets-vins pour vos celebrations les plus exclusives.",
    ordre: 2,
  },
  {
    _type: "service",
    titre: "Brunch & Dejeuner",
    description:
      "Le charme des matinees ensoleillees. Une cuisine genereuse et raffinee au fil des saisons.",
    ordre: 3,
  },
  // Plats signatures
  {
    _type: "plat",
    nom: "Mijote d'agneau au thym de garrigue",
    description: "Agneau du Gard longuement mijote aux herbes de la garrigue.",
    ordre: 1,
  },
  {
    _type: "plat",
    nom: "Legumes oublies en textures",
    description:
      "Legumes anciens du terroir travailles en differentes textures.",
    ordre: 2,
  },
  {
    _type: "plat",
    nom: "Souffle a la lavande et miel du Gard",
    description: "Dessert aerien aux saveurs provencales.",
    ordre: 3,
  },
  {
    _type: "plat",
    nom: "Loup de Mediterranee, emulsion d'agrumes",
    description: "Poisson noble de Mediterranee, agrumes du jardin.",
    ordre: 4,
  },
  {
    _type: "plat",
    nom: "Le jardin d'ete en canapes",
    description: "Selection de canapes frais inspires du potager.",
    ordre: 5,
  },
  // Temoignages
  {
    _type: "temoignage",
    citation:
      "Maison Saveur a transcende notre mariage. Le Chef a su capturer l'essence de notre domaine pour offrir a nos invites un voyage sensoriel inoubliable. L'elegance et la discretion etaient au rendez-vous.",
    auteur: "Elise & Marc",
    occasion: "Mariage au Domaine de Verchant",
    visible: true,
  },
  {
    _type: "temoignage",
    citation:
      "Un diner d'exception dans notre mas. Chaque assiette racontait une histoire, chaque saveur etait une decouverte. Une soiree gravee dans nos memoires.",
    auteur: "Philippe & Nathalie",
    occasion: "Diner prive a Uzes",
    visible: true,
  },
  {
    _type: "temoignage",
    citation:
      "Le brunch organise pour notre anniversaire de mariage fut un moment de pure grace. Des produits sublimes, un service impeccable.",
    auteur: "Sophie & Antoine",
    occasion: "Brunch au Pont du Gard",
    visible: true,
  },
];

async function seed() {
  console.log("Seeding Sanity...");

  for (const doc of documents) {
    try {
      if (doc._id) {
        const result = await client.createOrReplace(doc);
        console.log(`  Created/replaced: ${result._type} (${result._id})`);
      } else {
        const result = await client.create(doc);
        console.log(`  Created: ${result._type} (${result._id})`);
      }
    } catch (err) {
      console.error(`  Error creating ${doc._type}:`, err.message);
    }
  }

  console.log("Seed complete!");
}

seed();
