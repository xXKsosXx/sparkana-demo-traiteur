import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { occasion, contrainte, budget } = await req.json();

  const budgetLabels: Record<string, string> = {
    essentiel: "3 services (65/pers)",
    signature: "5 services (95/pers)",
    prestige: "7 services avec accords vins (145/pers)",
  };

  const prompt = `Tu es le Chef de Maison Saveur, chef gastronomique prive dans le Gard, Occitanie.

Genere un menu gastronomique pour :
- Occasion : ${occasion}
- Contraintes alimentaires : ${contrainte}
- Formule : ${budgetLabels[budget] || "5 services"}

Format de reponse STRICT — uniquement ce format, rien d'autre :

**Amuse-bouche**
[description courte et poetique]

**Entree**
[description]

**Poisson** (si 5 ou 7 services)
[description]

**Viande**
[description]

**Pre-dessert** (si 7 services)
[description]

**Dessert**
[description]

Utilise des produits du terroir gardois et mediterraneen.
Langage poetique et gastronomique.
Pas d'introduction ni de conclusion.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const menu = data.content?.[0]?.text;

    if (!menu) {
      return NextResponse.json(
        { error: "Generation impossible" },
        { status: 500 }
      );
    }

    return NextResponse.json({ menu });
  } catch {
    return NextResponse.json(
      { error: "Generation impossible" },
      { status: 500 }
    );
  }
}
