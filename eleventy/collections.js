const { getTagsMetadata } = require("./utilities");

const buildTagCollection = (type, collections) => {
  const tagsMetadata = getTagsMetadata(type);
  const filteredTags = {};
  for (const tagName in tagsMetadata) {
    filteredTags[tagName] = {
      name: tagName,
      count: collections.getFilteredByTag(tagName).length,
      description: tagsMetadata[tagName].description || "",
    };
  }
  return filteredTags;
};

const alphaSortTitle = (a, b) => {
  if (a.data.title < b.data.title) return -1;
  if (b.data.title > a.data.title) return 1;
  return 0;
};

const isPublishedPost = (data) => data.permalink && "post" === data.layout;

const allCollections = {
  primaryTags: (collections) => buildTagCollection("primary", collections),
  personalTags: (collections) => buildTagCollection("personal", collections),
  archiveTags: (collections) => buildTagCollection("archive", collections),
  rssCollection: (collection) => {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter((tpl) => {
      if (isPublishedPost(tpl.data) && !tpl.data.link_to) {
        return true;
      }
    });
  },
  sitemapCollection: (collection) => {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter((tpl) => {
      if (tpl.data.permalink && !tpl.data.hidden) {
        return true;
      }
    });
  },
  postsCollection: (collection) => {
    const tmpCollection = collection.getAllSorted();
    return tmpCollection.reverse().filter((tpl) => {
      if (isPublishedPost(tpl.data)) {
        return true;
      }
    });
  },
  recentPrimaryPosts: (collection) => {
    const primaryTags = Object.keys(getTagsMetadata("primary"));
    return collection
      .getAllSorted()
      .reverse()
      .filter((tpl) => isPublishedPost(tpl.data))
      .filter((tpl) => tpl.data.tags && tpl.data.tags.length)
      .filter((tpl) => tpl.data.tags.filter((tag) => primaryTags.includes(tag)).length)
      .slice(0, 6);
  },
  cocktailsCollection: (collection) => {
    return collection
      .getAllSorted()
      .filter((tpl) => "cocktail" === tpl.data.layout)
      .sort(alphaSortTitle);
  },
  allTags: (collections) => {
    let allTags = [];

    collections.getAllSorted().forEach((el) => {
      allTags = allTags.concat(el.data.tags);
    });

    const tagsWithCount = {};
    allTags.sort().forEach((tag) => {
      if (tag) {
        tagsWithCount[tag] = tagsWithCount[tag] ? tagsWithCount[tag] + 1 : 1;
      }
      return tag;
    });

    allTags.sort((a, b) => {
      return tagsWithCount[a] > tagsWithCount[b]
        ? -1
        : tagsWithCount[a] > tagsWithCount[b]
          ? -1
          : 0;
    });

    [...new Set(allTags)].forEach((tag) => {
      if (tag) {
        const count = tagsWithCount[tag];
        delete tagsWithCount[tag];
        tagsWithCount[tag] = count;
      }
    });

    return tagsWithCount;
  },
};

module.exports = (eleventyConfig) => {
  for (const name in allCollections) {
    eleventyConfig.addCollection(name, allCollections[name]);
  }
};
