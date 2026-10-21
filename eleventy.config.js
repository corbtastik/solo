import { load as loadYaml } from "js-yaml";
import markdownItAnchor from "markdown-it-anchor";
import markdownItDeflist from "markdown-it-deflist";
import markdownItFootnote from "markdown-it-footnote";
import markdownItTaskLists from "markdown-it-task-lists";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

/* Languages available to fenced code blocks. Add more as needed —
   see https://prismjs.com/#supported-languages */
loadLanguages([
  "markup",
  "css",
  "clike",
  "javascript",
  "json",
  "yaml",
  "bash",
  "markdown",
  "diff",
  "git",
  "ruby",
  "python",
  "scss",
  "typescript",
  "jsx",
  "liquid",
  "nginx",
  "sql",
  "toml",
]);

/**
 * kramdown's `generate_id`, which is what produced the heading ids on the
 * original Solo pages: strip leading non-letters, drop anything outside
 * [A-Za-z0-9 -], turn spaces into hyphens, downcase.
 */
function kramdownSlug(str) {
  return str
    .replace(/^[^a-zA-Z]+/, "")
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();
}

/**
 * Pretty names for the header bar above a fenced block. A fence can override
 * it with anything after the language: ```bash Get Solo
 */
const LANG_LABELS = {
  bash: "Bash", sh: "Shell", shell: "Shell", zsh: "Zsh", console: "Console",
  js: "JavaScript", javascript: "JavaScript", jsx: "JSX", mjs: "JavaScript",
  ts: "TypeScript", typescript: "TypeScript",
  json: "JSON", yaml: "YAML", yml: "YAML", toml: "TOML",
  html: "HTML", markup: "HTML", xml: "XML", svg: "SVG",
  css: "CSS", scss: "SCSS", sass: "Sass",
  md: "Markdown", markdown: "Markdown",
  py: "Python", python: "Python", rb: "Ruby", ruby: "Ruby",
  go: "Go", java: "Java", kotlin: "Kotlin", c: "C", cpp: "C++", rust: "Rust",
  sql: "SQL", diff: "Diff", git: "Git", nginx: "nginx", make: "Make",
  liquid: "Liquid", njk: "Nunjucks", text: "Text", plain: "Text",
};

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default function (eleventyConfig) {
  /* Gallery data is YAML, the same format yolo-11ty uses, so its `ig-*.yml`
     files can be copied across unchanged. Eleventy reads .json and .js on its
     own but not .yml. */
  eleventyConfig.addDataExtension("yml,yaml", (contents) => loadYaml(contents));

  /* ---------------------------------------------------------------- *
   * Markdown: kramdown-compatible output
   * ---------------------------------------------------------------- */
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, typographer: true, linkify: false, breaks: false });

    md.use(markdownItAnchor, {
      slugify: kramdownSlug,
      tabIndex: false,
      level: [1, 2, 3, 4, 5, 6],
    });

    /* Definition lists and footnotes were kramdown features, and Solo's CSS
       already styles `dl` / `dd`. Task lists are the one GFM-ism here. */
    md.use(markdownItDeflist);
    md.use(markdownItFootnote);
    md.use(markdownItTaskLists); /* no labels: they add random ids */

    /* Eleventy turns indented code blocks off (11ty issue #2438). kramdown
       had them, and Solo-era content relies on them, so turn them back on. */
    md.enable("code");

    /* kramdown tags inline code with `highlighter-rouge` */
    md.renderer.rules.code_inline = (tokens, idx) =>
      `<code class="highlighter-rouge">${escapeHtml(tokens[idx].content)}</code>`;

    /* ...and wraps fenced blocks in the Rouge container markup, under a
       clickable header bar in the style of yolo-11ty. */
    md.renderer.rules.fence = (tokens, idx) => {
      const token = tokens[idx];
      const info = (token.info || "").trim();
      const [lang, ...rest] = info.split(/\s+/);
      const grammar = lang ? Prism.languages[lang] : undefined;

      const body = grammar
        ? Prism.highlight(token.content, grammar, lang)
        : escapeHtml(token.content);

      const outerClass = lang
        ? `language-${lang} highlighter-rouge`
        : "highlighter-rouge";

      /* Anything after the language is a custom label. */
      const label =
        rest.join(" ") || LANG_LABELS[lang] || (lang ? lang : "Text");

      const header =
        `<button type="button" class="code-header">` +
        `<span class="code-label">${escapeHtml(label)}</span>` +
        `<span class="copy-icon material-icons md-18" aria-hidden="true">copy_all</span>` +
        `</button>`;

      return (
        header +
        `<div class="${outerClass}"><div class="highlight">` +
        `<pre class="highlight"><code>${body}</code></pre>` +
        `</div></div>\n`
      );
    };
  });


  /* ---------------------------------------------------------------- *
   * Image grid — a port of yolo-11ty's `imageGrid` shortcode.
   * ---------------------------------------------------------------- */

  eleventyConfig.addShortcode("imageGrid", function (name, columns) {
    name = name || "ig-images";
    columns = columns || 4;
    const images = (this.ctx && this.ctx[name]) || [];
    if (!images.length) return "";

    /* ceil, not floor: with floor, a remainder that does not divide evenly
       across the columns drops the trailing images from the grid while
       leaving them in the expanded view, putting data-index out of sync. */
    const perCol = Math.max(1, Math.ceil(images.length / columns));
    const attrs = (index, action) =>
      `data-gallery="${name}" data-gallery-type="ig" data-action="${action}"` +
      (action === "open" ? ` data-index="${index}"` : "");

    /* The wrapper encloses ONLY the thumbnails. open() hides it to reveal the
       expanded view, so the expanded view has to sit outside it. */
    let html = `<div id="ig-${name}"><div class="columns is-mobile">`;
    for (let c = 0; c < columns; c++) {
      html += `<div class="column">`;
      for (let r = 0; r < perCol; r++) {
        const index = c * perCol + r;
        const image = images[index];
        if (!image) continue;
        html +=
          `<img class="image square" ${attrs(index, "open")}` +
          ` tabindex="0" role="button"` +
          ` alt="${escapeHtml(image.description || "")}"` +
          ` src="${escapeHtml(image.src)}" loading="lazy">`;
      }
      html += `</div>`;
    }
    html += `</div></div>`;

    html +=
      `<div id="ig-target-${name}" class="no-display">` +
      `<div class="ig-modal-content"><div class="ig-slides">`;
    images.forEach((image, i) => {
      html +=
        `<img id="${name}-image-${i}" class="image square" ${attrs(i, "close")}` +
        ` tabindex="0" role="button"` +
        ` alt="${escapeHtml(image.description || "")}"` +
        /* Same URL as the thumbnail, so by the time this is revealed the
           browser already has it; lazy keeps it off the initial load. */
        ` src="${escapeHtml(image.src)}" loading="lazy">` +
        `<div id="${name}-caption-${i}" class="ig-caption">` +
        `<p>${escapeHtml(image.description || "")}</p></div>`;
    });
    html +=
      `</div>` +
      `<a class="ig-nav ig-prev" ${attrs(0, "prev")} tabindex="0" role="button" aria-label="Previous image">&#10094;</a>` +
      `<a class="ig-nav ig-next" ${attrs(0, "next")} tabindex="0" role="button" aria-label="Next image">&#10095;</a>` +
      `</div></div>`;

    return html;
  });


  /* ---------------------------------------------------------------- *
   * Video — a port of yolo-11ty's `video` shortcode.
   * ---------------------------------------------------------------- */

  eleventyConfig.addShortcode("video", function (name) {
    const videos = (this.ctx && this.ctx[name || "videos"]) || [];
    return videos
      .map((video) => {
        const description = escapeHtml(video.description || "");
        return (
          `<div class="video-embed">` +
          `<iframe src="${escapeHtml(video.src)}" title="${description}"` +
          ` loading="lazy" allowfullscreen></iframe>` +
          (description ? `<p>${description}</p>` : "") +
          `</div>`
        );
      })
      .join("\n");
  });

  /* ---------------------------------------------------------------- *
   * Theme helpers (used by css/main.njk and the switcher include)
   * ---------------------------------------------------------------- */

  /** The Solo base theme, as CSS. Light and dark are the same palette. */
  eleventyConfig.addFilter("themeCss", (solo) => {
    const block = (mode) =>
      [
        `  color-scheme: ${mode};`,
        ...Object.entries(solo[mode]).map(
          ([name, value]) => `  --${name}: ${value};`,
        ),
      ].join("\n");

    const indent = (text) =>
      text
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");

    return [
      "/* ===========================================================",
      "   The Solo base theme — generated from src/_data/solo.js",
      "",
      "   Other palettes live in palettes.json and are applied at",
      "   runtime as custom properties on <html>, which override",
      "   everything below.",
      "   =========================================================== */",
      "",
      `:root {\n${block("light")}\n}`,
      "",
      "/* No data-mode means follow the operating system. */",
      "@media (prefers-color-scheme: dark) {",
      "  :root:not([data-mode]) {",
      indent(block("dark")),
      "  }",
      "}",
      "",
      `:root[data-mode="dark"] {\n${block("dark")}\n}`,
      "",
    ].join("\n");
  });

  /**
   * The palettes as compact inline data: id -> { light, dark }. Names stay in
   * the menu markup rather than being shipped twice.
   */
  eleventyConfig.addFilter("paletteJson", (palettes) => {
    const out = {};
    for (const group of palettes.groups) {
      for (const theme of group.themes) {
        out[theme.id] = { light: theme.light, dark: theme.dark };
      }
    }
    return JSON.stringify(out);
  });

  /* ---------------------------------------------------------------- *
   * Build
   * ---------------------------------------------------------------- */
  eleventyConfig.addWatchTarget("src/_includes/css/");
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
