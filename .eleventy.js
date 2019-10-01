const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const UglifyJS = require("uglify-es");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const fs = require('fs')
const { exec } = require('child_process')

const Typography = require('typography');
const { theme } = require('./BaskervilleTheme');

const typography = new Typography(theme);

const minifyHtml = (content) => htmlmin.minify(content, {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true
});

const audioFileExtensions = [{ extension: 'ogg', flag: '-Ov' }, { extension: 'flac', flag: '-OF' }]

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  eleventyConfig.addShortcode('typography', () => {
    return `<style type="text/css">${typography.toString()}</style>`;
  });
  eleventyConfig.addShortcode("typographyFonts", () => {
    let fonts = []
    for (let i in theme.googleFonts) {
      let name = theme.googleFonts[i].name.replace(/\s/g, "+");
      let tempString = `${name}:${theme.googleFonts[i].styles.join(',')}`;
      fonts.push(tempString);
    }
    return `<link href="https://fonts.googleapis.com/css?family=${fonts.join('|')}" rel="stylesheet">`;
  });

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.startsWith('./posts');
    });
  });

  function generateCollection(label) {
    eleventyConfig.addCollection(label, function (collection) {
      return collection.getAll()
        .filter(function (item) {
          return item.inputPath.startsWith(`./${label}`);
        })
        .sort(function (a, b) {
          return parseInt(a.data.sortOrder) - parseInt(b.data.sortOrder);
        })
    });
  }

  generateCollection('book');
  generateCollection('appendix');
  generateCollection('exercises');

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  // eleventyConfig.addPassthroughCopy("favicon.ico");

  /* Markdown Plugins */
  const markdownIt = require("markdown-it");
  const emoji = require('markdown-it-emoji');
  const sup = require('markdown-it-sup');
  const markdownItAnchor = require("markdown-it-anchor");
  const toc = require("markdown-it-toc-done-right");
  const uslug = require('uslug');
  function slugify(s) { return uslug(s); }
  const options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  };
  const opts = {
    permalink: true,
    permalinkBefore: false,
    permalinkClass: "direct-link",
    permalinkSymbol: `<svg class="direct-link" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15" />
</svg>`,
    slugify: slugify
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
    .use(toc, { slugify: slugify })
    .use(emoji)
    .use(sup)
  );

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
