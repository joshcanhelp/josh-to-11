const moment = require('moment');
moment.locale('en');

module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  const postLayouts = [ 'post', 'link', 'quote', 'gallery' ];

  eleventyConfig.addLayoutAlias('gallery', 'layouts/gallery.njk');
  eleventyConfig.addLayoutAlias('link', 'layouts/link.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('quote', 'layouts/quote.njk');
  eleventyConfig.addLayoutAlias('status', 'layouts/status.njk');

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.setTemplateFormats([ 'md', 'css' ]);

  eleventyConfig.addCollection('postsCollection', function(collection) {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter(function(tpl) {
      if ( tpl.data.permalink && postLayouts.includes(tpl.data.layout) ) return tpl;
    });
  });

  eleventyConfig.addFilter('dateformat', function(dateIn) {
      return moment(dateIn).format('MMM DD, YYYY [at] h:mm a');
  });

  return {
    dir: {
      input: "content",
      output: "_dist"
    }
  };
};
