const { manningOidcPrompt } = require("../../../eleventy/utilities");

module.exports = {
  eleventyComputed: {
    contentPrepend: (data) => {
      return manningOidcPrompt;
    },
  },
};
