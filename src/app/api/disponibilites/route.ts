import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sn7mthea",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // format: 2026-03
  const year = searchParams.get("year");

  if (!month && !year) {
    return NextResponse.json({ error: "month param required (YYYY-MM)" }, { status: 400 });
  }

  const targetMonth = month || `${year}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  try {
    const client = getClient();

    // Fetch all dispos for the given month
    const dispos = await client.fetch(
      `*[_type == "disponibilite" && date >= $start && date <= $end]{
        date,
        statut,
        note
      } | order(date asc)`,
      {
        start: `${targetMonth}-01`,
        end: `${targetMonth}-31`,
      }
    );

    // Count stats for the month
    const totalSlots = 8;
    const complets = dispos.filter(
      (d: { statut: string }) => d.statut === "complet"
    ).length;
    const dernieres = dispos.filter(
      (d: { statut: string }) => d.statut === "derniere-place"
    ).length;
    const placesRestantes = Math.max(0, totalSlots - complets - dernieres);

    return NextResponse.json({
      dispos,
      stats: {
        totalSlots,
        complets,
        dernieres,
        placesRestantes,
      },
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
