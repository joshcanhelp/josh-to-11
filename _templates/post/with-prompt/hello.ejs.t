---
to: input/symlinked/posts/<%= h.getPostFileName(locals, true) %>.md
---
---
title: "<%= title %>"
<% if (locals.meta_title) { -%>
meta_title: "<%= meta_title %>"
<% } -%>
meta_description: "<%= meta_description || excerpt %>"
featured_img: <%= featured_img ? `${h.IMAGE_PATH}${h.getYear}/${featured_img}` : h.DEFAULT_THUMB %>
<% if (locals.canonical_link) { -%>
canonical_link: <%= canonical_link %>
<% } -%>
excerpt: "<%= excerpt || "TODO: Write an excerpt" %>"
<% if (locals.tags.length) { -%>
tags: ["<%- tags.join('\", \"') %>"]
<% } -%>
<% if (locals.link_to) { -%>
link_to: <%= link_to %>
<% } -%>
<% if (locals.canonical_link) { -%>
canonical_link: <%= canonical_link %>
<% } -%>
<% if (locals.isDraft === "yes") { -%>
eleventyExcludeFromCollections: true
<% } -%>
hn_link:
---

<%- include (`${templates}/_includes/formatting.ejs.t`) %>
