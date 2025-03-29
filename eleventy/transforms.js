const { minify } = require('html-minifier-terser');

const htmlMinifier = async (content, outputPath) => {
  if (!outputPath || !outputPath.endsWith(".html")) {
    return content;
  }

  if (process.env.NODE_ENV === "development") {
    return content;
  }
  
  return await minify(content, {
    removeComments: true,
    collapseWhitespace: true,
  });
};

module.exports = {
  htmlMinifier,
};
