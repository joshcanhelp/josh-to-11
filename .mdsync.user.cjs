module.exports = {
  sourceDir: "/Users/joshcanhelp/Notes",
  requireTags: ["project/joshcanhelp"],
  transformations: {
    urlProperty: "link_to",
    wikilinkBehavior: "resolve",
    passthroughProperties: [
      "title", "excerpt", "modified", "wpid", "tags", "featured_img", 
      "hn_link", "meta_description", "meta_title", "twitter", "permalink",
      "link_to"
    ],
    filenameTransform: (filename, context) => {
      const date = filename.slice(0,10);
      return date + "-" +context.frontmatter.url_path
    },
    propertyTransforms: {
      tags: (tags) => tags
        .filter(tag => tag.startsWith("topic/joshcanhelp/"))
        .map(tag => tag
          .replace("topic/joshcanhelp/", "")
          .replace("-and-", " + ")
          .replace("-", " ")
          .replace("seo", "SEO")
          .replace("javascript", "JavaScript")
          .replace("typescript", "TypeScript")
          .replace("wordpress", "WordPress")
          .replace("linkedin", "LinkedIn")
          .replace("joshcanhelp", "JoshCanHelp")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        ),
    }
  },
  routes: [
    { 
      sourcePath: "Logs/**/*.md",
      tag: "artifact/post", 
      outputPath: "symlinked/posts",
    }
  ],
};
