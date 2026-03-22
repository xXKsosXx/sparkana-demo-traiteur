const chef = {
  name: "chef",
  title: "Le Chef",
  type: "document",
  fields: [
    {
      name: "nom",
      title: "Nom",
      type: "string",
    },
    {
      name: "bio",
      title: "Biographie",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "citation",
      title: "Citation",
      type: "text",
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default chef;
