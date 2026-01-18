---
title: Generate new Eleventy post drafts with Hygen
excerpt: 'Making new boilerplate files is one of many tiny professional pet peeves that makes me ask "what would a real engineer do?" Answer: automate it!'
tags:
  - Eleventy
  - JavaScript + TypeScript
  - Portfolio
featured_img: /_images/2022/hygen-eleventy.png
---

What do you do when you need to make a new file in a project?

If you're like me, you often duplicate an existing file that's similar and make changes from there. If you're also like me, this leads to frequent copy/pasta errors to the point where you wonder whether it would just be easier to type this stuff out each time. The term I picked up while writing this post is "boilerplate fatigue" and it's perfect.

This is one of many tiny professional pet peeves that makes me ask "what would a *real engineer* do?" The answer to that is usually the one that means the least amount of work and the most amount of consistency: "Automate it," says the voice of a real engineer in my head. 🤖

<img src="/_images/2022/xerox-sigma-9.jpg" class="aligncenter" alt="Xerox Sigma 9">
{% caption %}The Xerox Sigma 9 introduced in 1971{% endcaption %}

Enter [Hygen](https://www.hygen.io/). If you've never used a code generator before, the idea is to make creating new project files easier by providing a template that's hydrated with values from a prompt or command line flags. Instead of copying an existing file, changing what's there, remembering anything that was missing, and getting that sinking "doing it wrong" feeling, you run a command, answer a few questions, and you have a fresh, new file.

This appeals to me in my Eleventy site here because I have a number of custom fields in the front-matter that I often forget about or need to look up in layout files. These fields are a bit different for each content type and I often forget which ones can be used in a post and which in a page. I also have a number of shortcodes and patterns I use and I want a way to remind myself of what those are.

Let's see how this all comes together ...

---

Follow [the quick start](https://github.com/jondot/hygen#quick-start) to get Hygen installed on the command line. The point where this tutorial starts is where you can get the following response on the command line:

```bash
❯ hygen

Error: please specify a generator.
Hygen v6.1.0
```

Get yourself to the root of your Eleventy project and run the following:

```bash
❯ hygen init self
# ... adds generator templates

❯ hygen generator with-prompt post
# ... adds post template
```

⚠️ If you get a warning like "SyntaxError: Invalid left-hand side expression in prefix operation", the [file renaming solution here](https://github.com/jondot/hygen/issues/321#issuecomment-938449496) fixed the issue for me.

What we did here was create the templates that create templates for what we want to create (so meta). Then we created the actual templates we'll use to generate new posts. You should now be able to run the generator and get a new file:

```bash
❯ hygen post with-prompt
✔ What's your message? · Begin again

Loaded templates: _templates
       added: app/hello.js
```

At this point, I've got 7 new files and a remote idea of what is going on here. I'm going to be making one of these for each of my [content types](/eleventy-custom-content-type-collections/) and the custom fields within.

There really is a bit of meta going on here so I'm going to start with the simplest task: adjusting our post generator to create posts in the right format. In general, my posts:

- are stored in a year sub-directory in a main posts directory
- get their date and permalink from the file name
- have a number of custom fields

Let's adjust where the file name and location using [conditional rendering](http://www.hygen.io/docs/templates#conditional-rendering) and a [change case helper](http://www.hygen.io/docs/templates#change-case-helpers):

```text
// _templates/post/with-prompt/hello.ejs.t

---

to: input/posts/<%= (new Date()).getFullYear() %>/<%= (new Date()).getFullYear() %>-<%= (new Date()).getMonth() + 1 %>-<%= (new Date()).getDate() %>-<%= h.changeCase.param(message) %>.md

---
```

This takes the current year, along with the command line prompt response, and sticks a Markdown file in just the right place:

```text
input/
├─ posts/
│  ├─ 2022/
│  │  ├─ 2022-1-11-post-draft.md
```

That is a bit verbose, though, so I added a `.hygen.js` file to [extend the helper object](http://www.hygen.io/docs/extensibility) with a few handy functions:

```js
// .hygen.js

const getYear = (new Date()).getFullYear();
const getMonth = (new Date()).getMonth() + 1;
const getDay = (new Date()).getDate();

module.exports = {
	helpers: {
		getDate: () => `${getYear}-${getMonth}-${getDay}`,
		getYear
	}
}
```

... and updated the post template:

```text
<!-- _templates/post/with-prompt/hello.ejs.t -->

---
to: input/posts/<%= h.getYear %>/<%= h.getDate() %>-<%= h.changeCase.param(message) %>.md
---
```

*Much better!*

We've got a file going to the right place, next we're going to construct the front matter that goes with each post. In order to find all these different fields, I combined:

- The [include file that creates the head output](https://github.com/joshcanhelp/josh-to-11/blob/master/input/_includes/partials/head.njk)
- The [post layout template](https://github.com/joshcanhelp/josh-to-11/blob/master/input/_includes/layouts/post.njk)
- The [include file that outputs the content footer](https://github.com/joshcanhelp/josh-to-11/blob/master/input/_includes/partials/content-footer.njk)

Figuring all this out for this post made me happy that I'm collecting it all together in one place. I can add all these as prompts in the creation process and not have to go hunting down what fields are possible when I create new posts.

The list of fields I use as of this writing are:

- `title` for the main, visible title and incoming link text
- `meta_title` for the title tag (defaults to `title` in the template)
- `excerpt` for the short text on post listings
- `meta_description`  (defaults to `excerpt` in the template)
- `featured_img` for the small thumbnail image on certain listing pages
- `tags`
- `canonical_link`
- `link_to` for any post that refers or replies to another URL
- `hn_link` for [Hacker News submissions](https://news.ycombinator.com/submitted?id=joshcanhelp)

Each field needs a prompt in the `prompt.js` file for the generator. Most of these are just basic inputs but I took a look at the library Hygen uses for the prompts and ... [wow](https://github.com/enquirer/enquirer)! The number of field types is *mind-blowing*!

One great feature of this library is the ability to write custom validation code. I use this for checking to make sure I'm not skipping required fields, like the title. The logic is simple here: return `true` if it passes validation or a string error message if not. See the next code block for how I'm using it for titles.

I'll be honest, I'd like to spend a day thinking of things to add to posts just so I can use more of these prompts but that's another day. For now, everything is a basic input besides tags. Here's the start of the prompt file:

```js
// _templates/post/with-prompt/prompt.js

module.exports = [
	{
		type: 'input',
		name: 'title',
		message: "Post title",
		validate: (value) => !value ? "Title cannot be empty" : true
	},
	{
		type: 'list',
		name: 'tags',
		message: "Enter tags, separated by commas"
		// TODO: Validate against a list of existing tags
	},
]
```

... which prompts:

```bash
❯ hygen post with-prompt
✔ Post title · Generate posts in Eleventy
✔ Enter tags, separated by commas · Eleventy, JavaScript

Loaded templates: _templates
       added: input/posts/2022/2022-1-10-generate-posts-in-eleventy.md
```

... and, when combined with this template:

```text
<!-- ... front matter ... -->

---
title: <%= title %>
tags: ["<%- tags.join('\", \"') %>"]
---

## Some markdown!
```

... outputs:

```text
---
title: Generate new posts in Eleventy with Hygen
tags: ["Eleventy", "JavaScript + TypeScript"]
---

## Some markdown!
```

**So awesome!**

For things like the `meta_title` that are optional, Hygen provides a way to check whether that value was entered and then output content if it is by using [local variables](http://www.hygen.io/docs/templates#local-variables). For the `list` prompt type, like `tags`, you need to check `locals.tags.length` because an empty array is truth-y in JavaScript.

Once I had all of the post front matter outputting, I added all of the [shortcodes](https://github.com/joshcanhelp/josh-to-11/blob/master/eleventy/shortcodes.js) and other formatting options I'm able to use in the body of the template. Then I copied all of this over to a `page` generator and removed the fields that are not used in that layout. I used the EJS `include` function and a [predefined variable](https://www.hygen.io/docs/templates#predefined-variables) to import shared output to both templates.

By the end of this, I was fully in "human with a hammer" mode and thinking of all the places I could use Hygen. For now, though, just this will save time, mistakes, and annoyance!

{% h2br %}References{% endh2br %}

- [Full changeset to add Hygen to my site](https://github.com/joshcanhelp/josh-to-11/commit/b9d1507e9e791ae8a76c6b96dbd665bf6a049cb2) and [a few additional features](https://github.com/joshcanhelp/josh-to-11/commit/4fd3ab4e1fbcc89535e0eec43356b0034e2b2cf3)
- [Hygen homepage and documentation](http://www.hygen.io) and [GitHub repo](https://github.com/jondot/hygen/)
