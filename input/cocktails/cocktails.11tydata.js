const fs = require("fs");

module.exports = {
  layout: "cocktail",
  eleventyComputed: {
    ingredients: async (data) => {
      const filePath = data.page.inputPath.replace("./_content/cocktails", __dirname);
      const fileContent = await fs.readFileSync(filePath, "utf8");
      const ingredients = fileContent.matchAll(/\[\[[\w\d\s]*\]\]/gm);
      const ingredientsFlat = [...new Set([...ingredients].flat(10))];
      return ingredientsFlat.map((ingredient) => ingredient.replace("[[", "").replace("]]", ""));
    },
    title: (data) => data.page.fileSlug,
    metaTitle: (data) => data.page.fileSlug + " Cocktail Recipe",
    contentPrepend: (data) =>
      data.page.filePathStem.includes("/made/") ? "I Have Made This" : "I Have Not Made This Yet",
    permalink: (data) =>
      "cocktails/" +
      data.page.fileSlug
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase() +
      "/index.html",
  },
};
