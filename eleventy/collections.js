const alphaSortTitle = (a, b) => {
  if (a.data.title < b.data.title) return -1;
  if (b.data.title > a.data.title) return 1;
  return 0;
};

const isPublishedPost = (data) => data.permalink && "post" === data.layout;

const rssCollection = (collection) => {
  const tmpCollection = collection.getAllSorted();
  return tmpCollection.reverse().filter((tpl) => {
    if (isPublishedPost(tpl.data) && !tpl.data.link_to) {
      return true;
    }
  });
};

sitemapCollection = (collection) => {
  const tmpCollection = collection.getAllSorted();
  return tmpCollection.reverse().filter((tpl) => {
    if (tpl.data.permalink && !tpl.data.hidden) {
      return true;
    }
  });
};

const postsCollection = (collection) => {
  const tmpCollection = collection.getAllSorted();
  return tmpCollection.reverse().filter((tpl) => {
    if (isPublishedPost(tpl.data)) {
      return true;
    }
  });
};

const bestOfCollection = (collection) => {
  const tmpCollection = collection.getAllSorted();
  return tmpCollection.reverse().filter((tpl) => {
    if (isPublishedPost(tpl.data) && tpl.data.tags && tpl.data.tags.includes("Best Of")) {
      return true;
    }
  });
};

const ideasCollection = (collection) => {
  const tmpCollection = collection.getAllSorted();
  return tmpCollection.reverse().filter((tpl) => {
    if ("idea" === tpl.data.layout) {
      return true;
    }
  });
};

const cocktailsMadeCollection = (collection) => {
  return collection
    .getAllSorted()
    .filter((tpl) => {
      if ("cocktail" === tpl.data.layout && tpl.filePathStem.includes("/made/")) {
        return true;
      }
    })
    .sort(alphaSortTitle);
};

const cocktailsNextCollection = (collections) => {
  return collections
    .getAllSorted()
    .filter((tpl) => {
      if ("cocktail" === tpl.data.layout && tpl.filePathStem.includes("/next/")) {
        return true;
      }
    })
    .sort(alphaSortTitle);
};

const allTags = (collections) => {
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
  })
  
  allTags.sort((a, b) => {
    return tagsWithCount[a] > tagsWithCount[b] ? -1 : tagsWithCount[a] > tagsWithCount[b] ? -1 : 0;
  });

  [... new Set(allTags)].forEach(tag => {
    if (tag) {
      const count = tagsWithCount[tag];
      delete tagsWithCount[tag];
      tagsWithCount[tag] = count;
    }
  });

  return tagsWithCount;
};

module.exports = {
  allTags,
  cocktailsNextCollection,
  cocktailsMadeCollection,
  ideasCollection,
  bestOfCollection,
  postsCollection,
  sitemapCollection,
  rssCollection,
};
