const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "titre",
      title: "Titre",
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

export default service;
