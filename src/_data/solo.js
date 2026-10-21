/**
 * The Solo base theme — the exact colors of the original Jekyll theme.
 *
 * This is the one palette compiled into `css/main.css`, so it renders before a
 * single line of JavaScript runs. Every other palette lives in
 * `palettes.json` and is applied at runtime as CSS custom properties.
 *
 * Light and dark are two renderings of the same palette. The sun/moon toggle
 * picks between them; the palette button picks which palette you are in.
 *
 * Token names here are the contract: `palettes.json` entries are expanded to
 * exactly this set of names (see `_includes/theme-init.njk`).
 */
export default {
  light: {
    /* page */
    "bg": "#fff",
    "text": "#333",
    "heading": "#111",
    "link": "#0074d9", /* From http://clrs.cc */
    "muted": "#666",
    "rule": "#ccc",
    "code-bg": "#eee",

    /* code block header (the bar above a fenced block) */
    "code-header-bg": "#0074d9",
    "code-header-fg": "#fff",
    "code-header-hover-bg": "#111",
    "code-header-hover-fg": "#fff",

    /* theme switcher */
    "ui-bg": "#fff",
    "ui-fg": "#333",
    "ui-border": "#ccc",
    "ui-hover-bg": "#eee",

    /* syntax highlighting */
    "syn-comment": "#999",
    "syn-comment-multi": "#0099ff",
    "syn-comment-preproc": "#009999",
    "syn-err": "#aa0000",
    "syn-err-bg": "#ffaaaa",
    "syn-generic-deleted-bg": "#ffcccc",
    "syn-generic-deleted-border": "#cc0000",
    "syn-generic-error": "#ff0000",
    "syn-generic-heading": "#003300",
    "syn-generic-inserted-bg": "#ccffcc",
    "syn-generic-inserted-border": "#00cc00",
    "syn-generic-output": "#aaa",
    "syn-generic-prompt": "#000099",
    "syn-generic-traceback": "#99cc66",

    /* syntax highlighting — the Pygments/Rouge palette shipped with Solo */
    "syn-hll-bg": "#ffffcc",
    "syn-keyword": "#006699",
    "syn-keyword-type": "#007788",
    "syn-name-attr": "#4f9fcf",
    "syn-name-builtin": "#336666",
    "syn-name-class": "#00aa88",
    "syn-name-const": "#336600",
    "syn-name-decorator": "#9999ff",
    "syn-name-entity": "#999",
    "syn-name-exception": "#cc0000",
    "syn-name-function": "#cc00ff",
    "syn-name-label": "#9999ff",
    "syn-name-namespace": "#00ccff",
    "syn-name-tag": "#2f6f9f",
    "syn-name-variable": "#003333",
    "syn-number": "#ff6600",
    "syn-operator": "#555",
    "syn-operator-word": "#000",
    "syn-string": "#cc3300",
    "syn-string-interpol": "#aa0000",
    "syn-string-literal": "#d44950",
    "syn-string-regex": "#33aaaa",
    "syn-string-symbol": "#ffcc33",
    "syn-whitespace": "#bbb",
  },
  dark: {
    /* page */
    "bg": "#111",
    "text": "#d6d6d6",
    "heading": "#fff",
    "link": "#7fdbff", /* clrs.cc aqua — the dark-mode partner of #0074d9 */
    "muted": "#9a9a9a",
    "rule": "#3d3d3d",
    "code-bg": "#1e1e1e",

    /* code block header */
    "code-header-bg": "#7fdbff",
    "code-header-fg": "#111",
    "code-header-hover-bg": "#fff",
    "code-header-hover-fg": "#111",

    /* theme switcher */
    "ui-bg": "#1a1a1a",
    "ui-fg": "#d6d6d6",
    "ui-border": "#3d3d3d",
    "ui-hover-bg": "#2a2a2a",

    /* syntax highlighting */
    "syn-comment": "#8a8a8a",
    "syn-comment-multi": "#5fb3e6",
    "syn-comment-preproc": "#5fbfbf",
    "syn-err": "#ff8080",
    "syn-err-bg": "#4a1f1f",
    "syn-generic-deleted-bg": "#3d1f1f",
    "syn-generic-deleted-border": "#cc4444",
    "syn-generic-error": "#ff6666",
    "syn-generic-heading": "#9ecb6a",
    "syn-generic-inserted-bg": "#1f3d22",
    "syn-generic-inserted-border": "#44cc55",
    "syn-generic-output": "#8a8a8a",
    "syn-generic-prompt": "#8f8fdb",
    "syn-generic-traceback": "#b3d98a",

    /* syntax highlighting */
    "syn-hll-bg": "#3a3a1f",
    "syn-keyword": "#6cb6e0",
    "syn-keyword-type": "#5fc9c9",
    "syn-name-attr": "#8fc6e8",
    "syn-name-builtin": "#7fc4b4",
    "syn-name-class": "#45d1ad",
    "syn-name-const": "#9ecb6a",
    "syn-name-decorator": "#b3b3ff",
    "syn-name-entity": "#8a8a8a",
    "syn-name-exception": "#ff8080",
    "syn-name-function": "#e07ffa",
    "syn-name-label": "#b3b3ff",
    "syn-name-namespace": "#66d9ef",
    "syn-name-tag": "#7fb5db",
    "syn-name-variable": "#86cfcf",
    "syn-number": "#ff9e5e",
    "syn-operator": "#aaa",
    "syn-operator-word": "#e6e6e6",
    "syn-string": "#f08a62",
    "syn-string-interpol": "#ff8080",
    "syn-string-literal": "#f07f8c",
    "syn-string-regex": "#5fc9c9",
    "syn-string-symbol": "#ffd966",
    "syn-whitespace": "#4a4a4a",
  },
};
