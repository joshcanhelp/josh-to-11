const moment = require('moment');
moment.locale('en');

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ 'images': '_images' });
  eleventyConfig.addPassthroughCopy({ 'css': '_css' });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  const postLayouts = [ 'post', 'link', 'quote', 'gallery' ];

  eleventyConfig.addLayoutAlias('gallery', 'layouts/gallery.njk');
  eleventyConfig.addLayoutAlias('link', 'layouts/link.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('quote', 'layouts/quote.njk');

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addCollection('postsCollection', function(collection) {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter(function(tpl) {
      if ( tpl.data.permalink && postLayouts.includes(tpl.data.layout) ) {
        return true;
      }
    });
  });

  eleventyConfig.addCollection('bestOfCollection', function(collection) {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter(function(tpl) {
      if ( tpl.data.permalink && tpl.data.tags && tpl.data.tags.includes('Best Of') ) {
        return true;
      }
    });
  });


  eleventyConfig.addCollection('allTags', function(collection) {
    let allTags = [];

    collection.getAllSorted().forEach(function(el) {
      allTags = allTags.concat(el.data.tags);
    });

    let tagDict = {};
    allTags.sort().forEach(function(el) {
      if (el) {
        tagDict[el] = tagDict[el] ? tagDict[el] + 1 : 1;
      }
    });

    return tagDict;
  });

  eleventyConfig.addFilter('dateformat', function(dateIn) {
    return moment(dateIn).format('MMM DD, YYYY [at] h:mm a');
  });

  return {
    dir: {
      input: "content",
      output: "_dist"
    },
    templateFormats: [
      'md', 'css', 'html', 'txt', 'ico', 'png', 'jpg', 'gif', 'htaccess', 'pdf', 'toml'
    ],
    passthroughFileCopy: true
  };
};
