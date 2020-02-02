module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');

  return {
    dir: {
      input: "content",
      output: "_dist"
    }
  };
};
