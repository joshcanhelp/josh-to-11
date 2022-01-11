---
to: input/posts/<%= h.getPostFileName(locals) %>.md
---
---
title: "<%= title || "TODO: Write an title" %>"
<% if (locals.meta_title) { -%>
meta_title: "<%= meta_title %>"
<% } -%>
excerpt: "<%= excerpt || "TODO: Write an excerpt" %>"
<% if (locals.meta_description) { -%>
meta_description: "<%= meta_description %>"
<% } -%>
featured_img: <%= featured_img ? `${h.IMAGE_PATH}${h.getYear}/${featured_img}` : h.DEFAULT_THUMB %>
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
---

Go forth 🙌

<img src="/_images/<%= h.getYear %>/featured_image.jpg" class="aligncenter" alt="">
{% caption %}Caption text{% endcaption %}

{% warning %}Warning panel{% endwarning %}

{% info %}Info panel{% endinfo %}

{% bigtext %}Big text{% endbigtext %}

{% h2br %}References{% endh2br %}

- 
