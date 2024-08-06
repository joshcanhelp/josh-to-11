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

const callout = (text) => `<p class="bigtext">${text}</p>`;

const markdownRender = (content) => markdown.render(content);

const d2 = (fileName) => `
<img src="/_images/d2/${fileName}.png" class="aligncenter">
<figcaption><em>Made with <a href="https://d2lang.com">D2</a></em></figcaption>
`;

module.exports = {
  callout,
  caption,
  d2,
  h2br,
  info,
  markdownRender,
  promo,
  warning,
};
