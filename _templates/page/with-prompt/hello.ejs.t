---
to: input/symlinked/pages/<%= h.changeCase.param(permalink || title) %>.md
---
---
title: "<%= title %>"
<% if (locals.meta_title) { -%>
meta_title: "<%= meta_title %>"
<% } -%>
meta_description: "<%= meta_description || "" %>"
featured_img: <%= featured_img ? `${h.IMAGE_PATH}${h.getYear}/${featured_img}` : h.DEFAULT_THUMB %>
<% if (locals.canonical_link) { -%>
canonical_link: <%= canonical_link %>
<% } -%>
---

<%- include (`${templates}/_includes/formatting.ejs.t`) %>
