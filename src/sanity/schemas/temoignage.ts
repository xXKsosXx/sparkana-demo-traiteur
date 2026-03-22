const temoignage = {
  name: "temoignage",
  title: "Temoignage",
  type: "document",
  fields: [
    {
      name: "citation",
      title: "Citation",
      type: "text",
    },
    {
      name: "auteur",
      title: "Auteur",
      type: "string",
    },
    {
      name: "occasion",
      title: "Occasion",
      type: "string",
    },
    {
      name: "visible",
      title: "Visible sur le site",
      type: "boolean",
      initialValue: true,
    },
  ],
};

export default temoignage;
