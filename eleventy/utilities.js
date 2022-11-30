const slugifyRequire = require("slugify");

const slugify = (text) => slugifyRequire(text, { lower: true, strict: true });

const manningOidcPath = "manning-openid-connect-liveproject";

const manningOidcPrompt = "" + 
  "I wrote a online learning project for Manning Publications " + 
  "called Federation and Single Sign-On with OpenID Connect! " + 
  "This is a great resource for anyone who wants to learn about digital identity, " + 
  "OpenID Connect, and JavaScript development. " +
  `<a href="/${manningOidcPath}/">Read more about the project</a> ` + 
  'or <a target="_blank" href="https://www.manning.com/liveprojectseries/federation-and-sign-on-ser">buy it now!</a>.';

module.exports = {
  manningOidcPath,
  manningOidcPrompt,
  slugify,
};
