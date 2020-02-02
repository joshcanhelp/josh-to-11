module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias('gallery', 'layouts/gallery.njk');
  eleventyConfig.addLayoutAlias('link', 'layouts/link.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('quote', 'layouts/quote.njk');
  eleventyConfig.addLayoutAlias('status', 'layouts/status.njk');

  return {
    dir: {
      input: "content",
      output: "_dist"
    }
  };
};
