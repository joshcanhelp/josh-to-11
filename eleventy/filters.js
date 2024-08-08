const moment = require("moment");
moment.locale("en");

const { slugify } = require("./utilities");

const allFilters = {
  dateformat: (dateIn) => moment(dateIn).format("MMM DD, YYYY"),
  keys: (data) => Object.keys(data),
  json: (data) => JSON.stringify(data, null, 2),
  slug: (text) => slugify(text),
  stripSquareBrackets: (text) => text.replace(/\[\[/g, "").replace(/\]\]/g, ""),
  domain: (url) => new URL(url).hostname,
  markdownToSlides: (content) =>
    content
      .replace(/<h2>/g, "<section><section><h2>")
      .replace(/<\/h2>/g, "</h2></section><section>")
      .replace(/<hr>/g, "</section></section>"),
};

module.exports = (eleventyConfig) => {
  for (const name in allFilters) {
    eleventyConfig.addFilter(name, allFilters[name]);
  }
};
