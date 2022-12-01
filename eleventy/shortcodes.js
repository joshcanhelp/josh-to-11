const markdown = require("markdown-it")({
  html: true,
});

const { slugify } = require("./utilities");

const h2br = (text, anchor) =>
  `<h2 class="hr" id="${anchor || slugify(text)}">
    <span class="pink">&lt;</span>
      ${text}
    <span class="pink">&gt;</span>
  </h2>`;

const info = (text) => `<blockquote class="info-block">${markdownRender(text)}</blockquote>`;

const warning = (text) => `<blockquote class="warning-block">${markdownRender(text)}</blockquote>`;

const promo = (text) => `<blockquote class="promo-block">${markdownRender(text)}</blockquote>`;

const caption = (text) => `<figcaption><em>${markdownRender(text)}</em></figcaption>`;

const bigtext = (text) => `<p class="bigtext">${markdownRender(text)}</p>`;

const markdownRender = (content) => markdown.render(content);

module.exports = {
  bigtext,
  caption,
  h2br,
  info,
  markdownRender,
  promo,
  warning,
};
