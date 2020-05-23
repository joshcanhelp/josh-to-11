const moment = require('moment');
moment.locale('en');

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

  /*
   * Configuration
   */ 

  eleventyConfig.addPassthroughCopy({ 'images': '_images' });
  eleventyConfig.addPassthroughCopy({ 'css': '_css' });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('anna', 'layouts/anna.njk');

  eleventyConfig.setUseGitIgnore(false);

  /*
   * Collections
   */

  eleventyConfig.addCollection('postsCollection', function(collection) {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter(function(tpl) {
      if ( tpl.data.permalink && 'post' === tpl.data.layout ) {
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

  /*
   * Filters 
   */

  eleventyConfig.addFilter('dateformat', function(dateIn) {
    return moment(dateIn).format('MMM DD, YYYY [at] h:mm a');
  });

  eleventyConfig.addFilter('json', function(data) {
    return JSON.stringify(data, null, 2);
  });

  /*
   * Shortcodes
   */

  eleventyConfig.addPairedShortcode('h2br', (text) => `<h2 class="hr aligncenter">${text}</h6>`);

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
