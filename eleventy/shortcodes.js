const marked = require("marked");

const { slugify } = require("./utilities");

const markdownRender = (content) => marked.parse(content);

const allShortcodes = {
  markdown: markdownRender,
  h2br: (text, anchor) =>
    `<h2 class="hr" id="${anchor || slugify(text)}">
      <span class="pink">&lt;</span>
        ${text}
      <span class="pink">&gt;</span>
    </h2>`,
  info: (text) => `<blockquote class="info-block">${markdownRender(text)}</blockquote>`,
  warning: (text) => `<blockquote class="warning-block">${markdownRender(text)}</blockquote>`,
  promo: (text) => `<blockquote class="promo-block">${markdownRender(text)}</blockquote>`,
  caption: (text) => `<figcaption><em>${markdownRender(text)}</em></figcaption>`,
  callout: (text) => `<p class="bigtext">${text}</p>`,
  taglist: (text) =>
    `<span class="display-tag">${text
      .split(",")
      .map((str) => str.trim())
      .join('</span> <span class="display-tag">')}</span>`,
  d2: (fileName) => `<img src="/_images/d2/${fileName}.png" class="aligncenter">
    <figcaption><em>Made with <a href="https://d2lang.com">D2</a></em></figcaption>`,
  projects: (text) => {
    let output = "";
    const projects = text.split("\n\n");
    for (const proj of projects) {
      const projParts = proj.split(":tags:");
      output += `<div class="project small">${markdownRender(projParts[0])}`;
      output += `<div class="display-tags"><span>${projParts[1]
        .split(",")
        .map((str) => str.trim())
        .join("</span> <span>")}</div>`;
      output += `</div>`;
    }
    output += "";
    return output;
  },
};

module.exports = (eleventyConfig) => {
  for (const code in allShortcodes) {
    eleventyConfig.addPairedShortcode(code, allShortcodes[code]);
  }
};
