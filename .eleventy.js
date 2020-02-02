module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias('gallery', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('link', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('quote', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('status', 'layouts/home.njk');

  return {
    dir: {
      input: "content",
      output: "_dist"
    }
  };
};
