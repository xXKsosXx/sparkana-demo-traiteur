const plat = {
  name: "plat",
  title: "Plat Signature",
  type: "document",
  fields: [
    {
      name: "nom",
      title: "Nom du plat",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Ordre",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
};

export default plat;
