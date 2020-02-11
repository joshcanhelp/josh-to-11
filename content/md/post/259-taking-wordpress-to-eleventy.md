---

title: "Taking WordPress to Eleventy"
layout: post
excerpt: "How I converted 12 years of posts in WordPress to an Eleventy static site."
date: 2020-02-09 06:00:00
permalink: taking-wordpress-to-eleventy/index.html
tags: [ "Best Of" ]
featured_img:

---

# Taking WordPress to Eleventy

For someone who likes to write, I don’t blog here a lot. I log in now and then, gasp at the number of spam comment that have piled up, maybe add or update a draft or two, then then let my session expire. Maybe it’s because I write a lot at work? Or maybe I don’t think I have much to share with the world at large? It’s hard to say.

One thing is for sure, though. This site does not accurately reflect who I am professionally and drawing any additional attention here feels disingenuous at best. I’m not a “WordPress guy” anymore and I’m not a freelancer either. The things I’ve built in the past are not the same things I’m building now. I don’t need a place to “showcase my work,” that’s what GitHub does for me these days.

I wanted to get away from plugin updates, core updates, spam comments, logins, themes, and everything else that was such a large part of my life as a developer for so long. I started to think about what I really needed out of my site:

- **It needs to be a place for my writing**. I love to write and I want to put more of what I write out there. For that to happen, it needThe next-generation editor in WordPress, Gutenberg, is way more than what I need. I want to write in Markdown, commit it, and be done.
- **It needs to be a place for other creative stuff**. I need the liberty to mess around with something outside of the box and be able to just toss it online. Right now my options are a subdomain (annoying to maintain) or a custom page template with a DB record just for the URL.
- **It needs to be dead-simple for me to maintain and change**. I want minimal dependencies, easy script deployment, no cache needed, no sudden problems.

After some digging, some grand plans, and then just wanting it to be done already, I landed on SSG, or static site generation. If you're not familiar with this family of technology, it's basically a bunch of pre-processing that starts with some kind of file and outputs HTML. So you get all the benefits of flat HTML files (performance, security, easy deployment) without the headache of maintaining all the directories and boilerplate code.

There are a number of SSG options out there but the one I kept coming back to over and over was Eleventy. I started digging through the documentation (which is fantastic) and found a number of killer features I definitely knew I wanted:

- Multiple templating languages
- Easy permalink handling
- Collections of data based on tags
- Shortcodes
- Great meta data handling

It's possible that another SSG can do all of the same stuff but the way it came together just made sense. And the docs site is kind of silly and I like it when technology doesn't take itself too seriously!

## Getting to know Eleventy

I needed to convert all of my WordPress content to Markdown at some point but I wanted to get to know Eleventy a little better first.

I knew that I would need:

- Some kind of base HTML frame that would handle the header, footer, and JS/CSS
- Layouts for each of the various post and page types I have (not many)
- Markdown for the main content with somewhat involved metadata pulled from WordPress

I figured the best way to handle this is to [define a "layout alias"](https://github.com/joshcanhelp/josh-to-11/blob/0.0.1/.eleventy.js#L3-L8) for each of the types that would come out of WordPress and then give them each [their own template](https://github.com/joshcanhelp/josh-to-11/tree/0.0.1/content/_includes/layouts). Then I could create a post like this:

```md
---
layout: post
---
# This is a Post
```

... and it would be clear what the template hierarchy is:

```
post.md > layouts/post.njk > _html.njk
```

I'm using Nunjucks for the first time here. I like that it's from Mozilla, a lot of it looks familiar, and I'm not really expecting to do a lot in the templating engine itself. If I need to do something really different than the structure I have, it will likely be in plain HTML.

I had a [sample Markdown page](https://github.com/joshcanhelp/josh-to-11/blob/0.0.2/content/index.md) compiling through the template hierarchy [to HTML](https://github.com/joshcanhelp/josh-to-11/blob/0.0.2/_dist/index.html) without issues in under an hour! Everything just worked, configuration was really simple, and the defaults were all sane. I wrote a few npm scripts to simplify things and start looking at converting the WordPress content over.

One thing I learned after some flailing around is that Eleventy ignores everything in your `.gitignore` so when I added a directive to keep the content MD files out of the repo, it said that that processed 0 files. I just had to modify the Eleventy config and I was back in business:

```
// .eleventy.js

module.exports = function(eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false);
	// ...
};
```

## WordPress to Markdown

I was really looking forward to this part. I have done a number of migrations to, from, and within WordPress using custom WP-CLI scripts and it's fun to try to handle all the different edge cases that come up.

The conversion here breaks down into 2 parts:

- The metadata, or "front matter", which is used in parts of the template and in collections of content.
- The page or post content itself, which is mainly the partially formatted `post_content` field from the database but could also include metadata that is output in the WP template files.

Before I get too far into the explanation here, I published the WP-CLI scripts I made here [[TODO: GITHUB LINK]]. The walk-through below is the thought process I went through to get there in case you wanted to write your own script or modify mine for your purposes.

### What to get

What you pull out of your WordPress database and convert will depend on how your site was built. I used the following query:

```php
$get_post_args = [
	// Get everything ...
   'posts_per_page' => - 1,
   /// ... that is a page or a post ...
   'post_type'      => [ 'post', 'page' ],
   // ... regardless of publishing status ...
   'post_status'    => 'any',
   // ... and sort it oldest to newest.
   'orderby'        => 'date',
   'order'          => 'ASC',
];
```

The `posts_per_page` needs to be there are is (but can be adjusted if you're testing out the conversion). The `post_type` needs to be set so you exclude `attachment` types (uploads) but should be expanded to include others that you might be using. If you've had the site up for a while and mutliple people have worked on it, there might be types there that you've forgotten about!

**Note:** If you're using my WP-CLI script, you can run `wp all-post-types` to output all of the post types in your database.

As you're taking inventory of what's there, it might be time to start looking at your WP theme files as well to see if there is any content being output from custom fields/postmeta. Look for `get_post_meta()` in theme files to figure out what fields are used and how. You'll want to figure out early whether these need to go in data fields (these can be used in listings and outside of the MD file) or above/below the main content.

I had a few extra fields I wanted to keep:

- Links to external sites (I put this in a `link_to` data field)
- Quote attribution for special post formats (I added this below the post content, which contained the quote)
- SEO plugin metadata (meta title was added to a data field and the meta description replaced the post excerpt)

### Metadata

I started with the metadata section to get more of a feel for Eleventy's built-in data handling. There are a number of data fields that Eleventy uses internally, [all of which are listed here](https://www.11ty.dev/docs/data-configuration/). There were a few other fields that I wanted to use in templates and listings as well.

#### `permalink`

This is an important one to get right as I wanted to keep as many of the existing URLs as possible without redirects. I also wanted a file naming and organizing scheme that could be different than the URL. To that end, I wanted to use the `post_name` field from the `posts` table.

As I was trying out the conversion process, I realized that I was pulling all posts and pages of any post status. There were a few that were pending or draft that I wanted to keep but didn't want to be published. It turns out, you can set `permalink: false` and an output file is not created.

I also noticed that some non-published content was not given a `post_name` and, when converted, would create a MD file with no name (several, in fact, so they would be over-written). It was easy enough to just use the `post_title` field and convert with `sanitize_title()`.

Finally, in order to generate HTML files that would load on the same URL, I needed to append `/index.html`. Without that, text files with no extension were being created.

Here's where I landed with the permalink:

```php
foreach( $posts as $post ) {

	// Change the object so it can be used later.
	if ( empty( $post->post_name ) ) {
		$post->post_name = sanitize_title( $post->post_title );
	}

	$meta = [
		// If it's published, set the URL; if not, no output file.
		'permalink' => 'publish' === $post->post_status ?
			$post->post_name . '/index.html' :
			'false',
	];
}
```

#### `layout`

This determines what template will used when compiling. As I mentioned above, I added layout aliases to Eleventy so I could just use a word like `post` or `page` and the appropriate layout file would be used. It also makes it easy to change the file location at some point in the future and only making the change once.

I only had `page` and `post` types to migrate but I was using post formats as well. On my WordPress site, I would change the output slightly based on the format. On the Eleventy-built site, I wanted to use separate layout files for that so I converted the mix of types and formats to `layout`:

```php
foreach( $posts as $post ) {

	// Anything that is a post with a format gets a value ...
	$meta['layout'] = get_post_format( $post->ID );
	if ( empty( $meta['layout'] ) ) {
		// ... then pages and standard posts fall back to type.
		$meta['layout'] = $post->post_type;
	}
}
```

#### `tags`

Things can get a bit confusing here as we're going to start to overlap terminology a bit between the two platforms. In Eleventy, `tags` are used to construct collections of content. In WordPress, `tags` are just a type of taxonomy with no hierarchy.

In my experience, how tags and categories are used differs from site to site. Some use tags, some categories, some both. I've used both over the years, typically leaning on categories to do the heavy lifting.

Since I didn't want to lose anything and was not using a hierarchy, I just combined the tags and categories together into `tags` in Eleventy. I used the term's slug so I could easily generate URLs and convert the slug to the name. If you have descriptions you want to keep, you'll probably want to generate a [global data file](https://www.11ty.dev/docs/data-global/).

The code to pull a term out and convert to the format Eleventy wants is straight-forward:

```php
foreach( $posts as $post ) {

	// Get the post tags and normalize to an array.
	$tags = get_the_terms( $pid, 'post_tag' );
	$tags = is_array( $tags ) ? $tags : [];

	$term_names = array_map( function ( $wp_term ) {
		return '"' . strtolower( $wp_term->slug ) . '"';
	}, $terms );

	$meta['tags'] = '[' . implode( ', ', $term_names ) . ']';
}
```

#### `date`

I used `post_date_gmt` for the `date` field as Eleventy can handle localization of dates. I also stored `post_modified_gmt` in a `modified` field to keep that piece of data around. This means that I'm making posts with dates in GMT going forward, which I'm not wild about, but probably the best way to go about it.

The GMT date is converted to local time during the build so the HTML being output is in Pacific time, which is what I want. By default, it's about the longest date I've ever seen so I added a filter to format the date into something more managable.

```js
// .eleventy.js
const moment = require('moment');
moment.locale('en');

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter('dateformat', function(dateIn) {
		return moment(dateIn).format('MMM DD, YYYY [at] h:mm a');
	});
	// ...
};
```

#### The rest

WordPress, by default, stores a lot of additional information you can use in your posts. Beyond what WordPress does, you might have additional postmeta fields that you use, either through the default UI or through a plugin like ACF. There's two ways to handle all of this additional data:

- In the front matter fields to be used in template files
- Appended to the Markdown content

All of the extra data I had was template-level, as opposed to large chunks of text or HTML stored in fields. I have seen plenty of sites, though, that use postmeta heavily. Your best bet here is walking through the page templates and look for where `get_post_meta()` or `get_field()` is used, then figure out what to do with that field.

Here are a few pieces of data I found useful to store in the template data for output later on:

- `title` - I pulled this straight from the `WP_Post` object, passing it through `strip_tags()`, then `htmlspecialchars()`. It's probably best to apply the `the_title` filter as well but I knew I didn't have any transformations that needed to be applied. Make sure you sure you surround the value in quotes as well, in case any YAML-unsafe characters (like colons) are there. If you use an SEO plugin of some kind, you'll want to check for any additional meta fields being used for this.
- `excerpt` - I handled this the same as the title, including surrounding quotes. The filter for this value is `the_excerpt`.
- `modified` - I added the `post_modified_gmt` to keep the data around. I believe you can use `Last Modified` here to start using the file edit date going forward.
- `featured_img` - This seemed like another good piece of data to keep around. I used `get_the_post_thumbnail_url()` here, along with the `thumbnail` size. If you keep all of your images in the `wp-content/year/month` folders when you launch the new site, everything should work well. Otherwise, you'll want to transform this URL to whatever new path you're using.
- `wpid` - I stored the WordPress post ID here in case I ever needed to go back and check the database for some reason.

That was everything in the template data fields. The rest was dealing with the post content.

### The content

The content portion of this was far less involved for my site. Mostly everything displayed on the page was stored in the `post_content` field without a lot going on in filters or anywhere else. In fact, compared to the meta creation above, this was a breeze!

We want to get decent HTML to convert to Markdown so the order of operations I followed here was:

#### 1. Pass through the `the_content` filter, add meta

This is definitely step 1 of the process. WordPress stores content as whatever was entered into the editor, then coverts that to viewable HTML in `the_content` filter. There's a lot of magic going on there, including shortcode processing, so it's best to work with the HTML post-conversion.

Depending on how your theme is setup, this might also bring in addition content at the top and bottom of the post, possibly stored in postmeta. You'll want to examine your converted content and make sure that the HTML you see on your WP-powered site is more-or-less the same as what you see in your converted Markdown files. If you're missing chunks of content, look at the theme files to see where that content it coming from. This is **great** reason to have a repeatable script!

#### 2. Convert HTML to Markdown

I used the [PHP League's HTML to Markdown converter](https://github.com/thephpleague/html-to-markdown/), which worked on the WordPress-generated HTML with zero configuration. Install with Composer and use like so:

```php
require 'vendor/autoload.php';

use League\HTMLToMarkdown\HtmlConverter;

$converter = new HtmlConverter();

foreach( $posts as $post ) {
	// ...
	$the_content = apply_filters( 'the_content', $post->post_content );
	$the_content_md = $converter->convert( $the_content );
}
```

#### 3. Replace URLs

The next step I took was replacing URLs. This is not necessary but to make life easier developing locally, I:

- Converted `wp-content` direct URLs to `_images` relative ones
- Converted all the other direct URLs to relative ones

This step could come before or after converting to Markdown, it should not mattter much either way.

#### 4. Strip additional tags

Finally, I stripped all the remaining HTML with `strip_tags()`, keeping anything that would display well in the new template. Remember that, at this point, the content is converted to Markdown so the remaining tags are just ones that could not be converted. 

You'll want to be careful here as you can potentially lose layout that you want to keep. Since `strip_tags()` lets you indicate what you keep, instead of what you want to remove, you'll need to be explicit. I processed the content through once without the tag stripping, then searched the processed content for the first part of a closing tag:

```bash
❯ grep -H -r "</" ./content/md
```

That found a number of ones I wanted to delete, like `<figure>` and `<figcaption>` used for images, and ones I wanted to keep, like `<span>` tags with styling. I ended up stripping the Markdown like so:

```php
$the_content_md = strip_tags( 
	$the_content_md, 
	'<a><span><object><param><embed><del>' 
);
``` 

### Create the file

At this point, you should have an array of template data and a chunk of content that need to be combined into a `.md` file. The format of the Markdown file should be about like so:

```md
---
title: post_title
layout: post_type
permalink: relative get_permalink()
---

# post_title or remove to add the title in the template

converted post_content
```

Once you have the content in a string and ready to save, you'll need to generate a file name, find a place to output it, and see what happens next. I used the post name appended with `.md` and output to a temporary directory a few times before I started outputting into my Eleventy file structure:

```php
$fh = fopen( '~/path/to/dir/' . $post->post_name . '.md', 'w+' );
fwrite( $fh, $the_content_md );
fclose( $fh );
```

## First Run

I tied this whole process into a WP-CLI script to make this easy to run multiple times. I figured this would need a lot of tweaking so having a reliable way to make changes and see the output made a world of difference.

The best way I found to have a quick iteration cycle was to output the Markdown files into the folder where Eleventy is watching so the processing happens right after the conversion run.

On your first (or second or 100th) run, you might find a number of things to tweak:

- You might want to exclude certain pages
- You might find tags or categories to remove
- You might adjust your file name
- You might find addition DB-stored content to include
- You might figure out additional content conversions you want to make
- You might change the directory structure of what you output

... and you might hit a lot of errors in Eleventy as you figure out how the templating language and data cascade works. This is all completely normal! I probably ran the script 40-50 times before I had the output I wanted to keep. 

The trick here is to "let the robots do their job." In other words, don't start manually adjusting any of the content in the Markdown before you're sure all the repetitive stuff has been taken care of. I was running this on a local copy of my site so if I had a tag to delete or a permalink to change on a single post, I would make that change in the WP database, then keep running the script to make changes. In fact, I'm probably 95% done with the site for now and I just started making manual changes and corrections (tag curation, spelling/URL errors, etc).  

## Additional Resources

- [A fine post by @efjspencer about a difference approach to the same problem](https://edspencer.me.uk/posts/2019-10-16-migrating-from-wordpress-to-eleventy/)
- [WP-CLI Commands Cookbook](https://make.wordpress.org/cli/handbook/commands-cookbook/)
