module.exports = {
  eleventyComputed: {
    layout: "cocktail",
    title: data => data.page.fileSlug,
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

