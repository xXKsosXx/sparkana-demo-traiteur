const disponibilite = {
  name: "disponibilite",
  title: "Disponibilite",
  type: "document",
  fields: [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "statut",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Derniere place", value: "derniere-place" },
          { title: "Complet", value: "complet" },
        ],
      },
      initialValue: "complet",
    },
    {
      name: "note",
      title: "Note interne (optionnel)",
      type: "string",
      description: "Ex: Mariage famille Dupont, Cocktail entreprise...",
    },
  ],
  preview: {
    select: {
      title: "date",
      subtitle: "statut",
    },
  },
  orderings: [
    {
      title: "Par date",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
};

export default disponibilite;
