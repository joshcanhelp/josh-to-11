module.exports = function(eleventyConfig) {

  const postLayouts = [ 'post', 'link', 'quote', 'gallery', 'status' ];

  eleventyConfig.addLayoutAlias('gallery', 'layouts/gallery.njk');
  eleventyConfig.addLayoutAlias('link', 'layouts/link.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('quote', 'layouts/quote.njk');
  eleventyConfig.addLayoutAlias('status', 'layouts/status.njk');

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addCollection('postsCollection', function(collection) {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter(function(tpl) {
      if ( tpl.data.permalink && postLayouts.includes(tpl.data.layout) ) return tpl;
    });
  });

  return {
    dir: {
      input: "content",
      output: "_dist"
    }
  };
};
