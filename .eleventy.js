const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const { htmlMinifier } = require("./eleventy/transforms");

const registerShortcodes = require("./eleventy/shortcodes");
const registerCollections = require("./eleventy/collections");
const registerFilters = require("./eleventy/filters");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    images: "_images",
    html: "_html",
    "images/favicon": "/",
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchThrottleWaitTime(1000);
  eleventyConfig.addTransform("htmlMinifier", htmlMinifier);

  registerShortcodes(eleventyConfig);
  registerCollections(eleventyConfig);
  registerFilters(eleventyConfig);

  ["page", "post", "anna", "cocktail", "slideshow"].forEach((layout) => {
    eleventyConfig.addLayoutAlias(layout, `layouts/${layout}.njk`);
  });

  return {
    dir: {
      input: "input",
      output: "_dist",
    },
    templateFormats: ["md", "html", "txt", "htaccess", "pdf", "toml", "njk", "webmanifest"],
    passthroughFileCopy: true,
  };
};
