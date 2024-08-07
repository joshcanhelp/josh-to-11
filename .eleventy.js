const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const { htmlMinifier } = require("./eleventy/transforms");
const registerShortcodes = require("./eleventy/shortcodes");

const {
  allTags,
  primaryTags,
  cocktailsCollection,
  postsCollection,
  recentPrimaryPosts,
  sitemapCollection,
  rssCollection,
  personalTags,
  archiveTags,
} = require("./eleventy/collections");

const {
  stripSquareBrackets,
  makeSlug,
  jsonStringify,
  objectKeys,
  dateformat,
  markdownToSlides,
  urlToDomain,
} = require("./eleventy/filters");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    images: "_images",
    html: "_html",
    "images/favicon": "/",
  });

  registerShortcodes(eleventyConfig);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("idea", "layouts/idea.njk");
  eleventyConfig.addLayoutAlias("anna", "layouts/anna.njk");
  eleventyConfig.addLayoutAlias("cocktail", "layouts/cocktail.njk");
  eleventyConfig.addLayoutAlias("slideshow", "layouts/slideshow.njk");

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchThrottleWaitTime(1000);

  eleventyConfig.addTransform("htmlMinifier", htmlMinifier);

  eleventyConfig.addCollection("allTags", allTags);
  eleventyConfig.addCollection("primaryTags", primaryTags);
  eleventyConfig.addCollection("personalTags", personalTags);
  eleventyConfig.addCollection("archiveTags", archiveTags);
  eleventyConfig.addCollection("recentPrimaryPosts", recentPrimaryPosts);
  eleventyConfig.addCollection("cocktailsCollection", cocktailsCollection);
  eleventyConfig.addCollection("postsCollection", postsCollection);
  eleventyConfig.addCollection("rssCollection", rssCollection);
  eleventyConfig.addCollection("sitemapCollection", sitemapCollection);

  eleventyConfig.addFilter("dateformat", dateformat);
  eleventyConfig.addFilter("json", jsonStringify);
  eleventyConfig.addFilter("keys", objectKeys);
  eleventyConfig.addFilter("markdownToSlides", markdownToSlides);
  eleventyConfig.addFilter("slug", makeSlug);
  eleventyConfig.addFilter("stripSquareBrackets", stripSquareBrackets);
  eleventyConfig.addFilter("domain", urlToDomain);

  return {
    dir: {
      input: "input",
      output: "_dist",
    },
    templateFormats: ["md", "html", "txt", "htaccess", "pdf", "toml", "njk", "webmanifest"],
    passthroughFileCopy: true,
  };
};
