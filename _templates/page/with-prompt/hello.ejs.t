---
to: input/pages/<%= h.changeCase.param(permalink || title) %>.md
---
---
title: "<%= title %>"
<% if (locals.meta_title) { -%>
meta_title: "<%= meta_title %>"
<% } -%>
meta_description: "<%= meta_description || "TODO: Write a description" %>"
featured_img: <%= featured_img ? `${h.IMAGE_PATH}${h.getYear}/${featured_img}` : h.DEFAULT_THUMB %>
<% if (locals.canonical_link) { -%>
canonical_link: <%= canonical_link %>
<% } -%>
---

Go forth 🙌

{% warning %}Warning panel{% endwarning %}

{% info %}Info panel{% endinfo %}

{% bigtext %}Big text{% endbigtext %}

{% caption %}Caption text{% endcaption %}
