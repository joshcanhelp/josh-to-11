const fs = require('fs');

module.exports = {
  eleventyComputed: {
    ingredients: async data => {
      const filePath = data.page.inputPath.replace("./_content/cocktails", __dirname);
      const fileContent = await fs.readFileSync(filePath, 'utf8');
      const ingredients = fileContent.matchAll(/\[\[[\w\d\s]*\]\]/gm);
      const ingredientsFlat = [...new Set([...ingredients].flat(10))];
      return ingredientsFlat.map(ingredient => ingredient.replace("[[", "").replace("]]", ""));
    },
    layout: "cocktail",
    title: data => data.page.fileSlug,
    metaTitle: data => data.page.fileSlug + " Cocktail Recipe",
    tags: data => {return [
      data.page.filePathStem.includes("/made/") ? "I Have Made This" : undefined,
      data.page.filePathStem.includes("/next/") ? "I Have Not Made This Yet" : undefined,
    ]},
    permalink: data => "cocktails/" + data.page.fileSlug
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase() + "/index.html",
  }
};

