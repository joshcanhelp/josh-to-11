module.exports = {
  gitHubLink: (page) =>
    page.inputPath.replace("./", "https://github.com/joshcanhelp/josh-to-11/edit/master/"),
  gitHubComment: (page) =>
    "https://github.com/joshcanhelp/josh-to-11/issues/new" +
    "?template=comment.md" +
    "&title=Comment on " +
    page.url +
    "&body=" +
    encodeURIComponent("❤️ Thank you for your feedback! ❤️\n\n## What would you like to say?\n\n"),
};
