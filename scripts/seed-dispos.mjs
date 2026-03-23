import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "sn7mthea",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Disponibilites mars 2026
// Le chef fait ~8 events/mois, on marque les jours bloques
const dispos = [
  // Jours complets (deja reserves)
  { date: "2026-03-07", statut: "complet", note: "Mariage famille Dupont" },
  { date: "2026-03-08", statut: "complet", note: "Cocktail entreprise Nimes" },
  { date: "2026-03-14", statut: "complet", note: "Diner prive - 12 couverts" },
  { date: "2026-03-15", statut: "complet", note: "Brunch domaine viticole" },
  { date: "2026-03-21", statut: "complet", note: "Evenement professionnel" },

  // Derniere place (presque complet)
  { date: "2026-03-28", statut: "derniere-place", note: "1 place restante" },
  { date: "2026-03-29", statut: "derniere-place", note: "" },

  // Avril 2026 - quelques dates
  { date: "2026-04-04", statut: "complet", note: "Mariage reserve" },
  { date: "2026-04-05", statut: "complet", note: "Reception privee" },
  { date: "2026-04-11", statut: "derniere-place", note: "" },
  { date: "2026-04-12", statut: "complet", note: "Brunch Paques" },
  { date: "2026-04-18", statut: "derniere-place", note: "" },
  { date: "2026-04-25", statut: "complet", note: "Cocktail anniversaire" },
  { date: "2026-04-26", statut: "complet", note: "Diner gastronomique" },
];

async function seed() {
  console.log("Seeding disponibilites...");

  for (const d of dispos) {
    try {
      const result = await client.createOrReplace({
        _id: `dispo-${d.date}`,
        _type: "disponibilite",
        date: d.date,
        statut: d.statut,
        note: d.note,
      });
      console.log(`  ${result.date} → ${result.statut}`);
    } catch (err) {
      console.error(`  Error ${d.date}:`, err.message);
    }
  }

  console.log("Seed dispos complete!");
}

seed();
