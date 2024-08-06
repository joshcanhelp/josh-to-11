const slugifyRequire = require("slugify");
const { readFileSync } = require("fs");

const slugify = (text) => slugifyRequire(text, { lower: true, strict: true });

const manningOidcPath = "manning-openid-connect-liveproject";
const manningOidcPrompt =
  "" +
  "I wrote a online learning project for Manning Publications " +
  "called Federation and Single Sign-On with OpenID Connect! " +
  "This is a great resource for anyone who wants to learn about digital identity, " +
  "OpenID Connect, and JavaScript development. " +
  `[Read more about the project](/${manningOidcPath}/) ` +
  'or <a target="_blank" href="https://www.manning.com/liveprojectseries/federation-and-sign-on-ser">buy it now!</a>';

let tagsMetadata = [];
const getTagsMetadata = (type) => {
  if (!tagsMetadata.length) {
    const tagJson = readFileSync(`${__dirname}/../input/_data/tagsMetadata.json`);
    tagsMetadata = JSON.parse(tagJson);
  }
  if (!type) {
    return tagsMetadata;
  }

  const filteredTags = {};
  for (const tagName in tagsMetadata) {
    if (type === tagsMetadata[tagName].type) {
      filteredTags[tagName] = tagsMetadata[tagName];
    }
  }
  return filteredTags;
};

module.exports = {
  manningOidcPath,
  manningOidcPrompt,
  getTagsMetadata,
  slugify,
};
