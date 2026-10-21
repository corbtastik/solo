# Solo, ported to Eleventy

An [Eleventy](https://www.11ty.dev/) port of [Solo](https://github.com/chibicode/solo), Shu Uesugi's
Jekyll theme for single-page websites. Same layout, same fonts, same elements —
verified pixel-for-pixel against the original — plus one thing Solo never had:
**swappable color themes**. 68 of them, in light and dark: Solo's own, plus all
67 from [yolo-11ty](https://yolo-11ty.web.app/).

## Quick start

```bash
npm install
npm start      # http://localhost:8080, rebuilds on save
npm run build  # writes _site/
```

## Layout of the repo

```
src/
├── index.md                  the page
├── 404.html
├── _data/
│   ├── site.json             title, description, theme settings (≈ _config.yml)
│   ├── solo.js               the Solo palette, exact — compiled into main.css
│   └── palettes.json         the 67 yolo-11ty palettes, 12 colors per mode
├── _includes/
│   ├── layouts/default.njk   ≈ _layouts/default.html
│   ├── head.njk              custom code for <head>   (empty, as in Solo)
│   ├── scripts.njk           custom code before </body> (empty, as in Solo)
│   ├── theme-init.njk        the theme engine; runs before first paint
│   ├── theme-switcher.njk    the two controls and their menu
│   ├── code-copy.njk         copy-to-clipboard for code blocks
│   └── css/
│       ├── _normalize.css    normalize.css v2.1.3, verbatim from Solo
│       ├── _solo.css         line-for-line port of _sass/_solo.scss
│       ├── _syntax.css       port of _sass/_syntax.scss + Prism mapping
│       ├── _theme-switcher.css
│       ├── _code-header.css  the bar above fenced code blocks
│       └── _custom.css       your own styles / overrides
├── css/main.njk              assembles the above into /css/main.css
└── static/                   copied to the site root as-is
```

## Themes

Two independent axes, the same split yolo-11ty uses:

* **mode** — light or dark. The sun/moon button toggles it directly, and shows
  the mode you would switch *to*. With nothing stored, it follows the operating
  system.
* **palette** — which set of colors. The palette button opens the list.

They compose: every palette ships a light *and* a dark rendering, so choosing
Matrix Green and then toggling to dark gives you Matrix Green's dark variant.
Both choices persist in `localStorage` (`solo-mode`, `solo-palette`).

### Where the colors live

`src/_data/solo.js` holds the Solo palette as the ~50 CSS custom properties the
stylesheet actually uses, at the original's exact values. It is the only palette
compiled into `css/main.css`, so it paints before any JavaScript runs:

```css
:root                              { /* Solo, light */ }
:root[data-mode="dark"]            { /* Solo, dark  */ }
@media (prefers-color-scheme:dark) { :root:not([data-mode]) { /* Solo, dark */ } }
```

`src/_data/palettes.json` holds the other 67, in yolo-11ty's own format — twelve
colors per mode, grouped:

```json
{
  "id": "matrix-green",
  "name": "Matrix Green",
  "light": {
    "bg": "#F0FFF4", "text": "#003B00", "heading": "#006400",
    "link": "#008000", "primary": "#00C853", "surface": "#ffffff",
    "border": "#A5D6A7", "shKeyword": "#008000", "shString": "#2E7D32",
    "shFunction": "#00C853", "shVariable": "#1B5E20", "shComment": "#81C784"
  },
  "dark": { "...": "..." }
}
```

Those twelve are widened into the full ~50 — including every Pygments/Rouge
syntax token — by `expand()` in `src/_includes/theme-init.njk`, which also
derives the in-between shades (`muted`, hover backgrounds, diff backgrounds) by
mixing. The token names it emits are exactly the keys in `solo.js`; that is the
contract between the two files.

Non-Solo palettes are applied as inline custom properties on `<html>`, which
override `main.css`. Selecting Solo removes them again. This is how yolo-11ty
does it, and it keeps `main.css` at one palette instead of 68 — but unlike a
runtime `fetch`, the data is inlined in the page, so the right colors are up
before first paint rather than after.

### Adding one

Append to any group's `themes` array in `palettes.json`. It shows up in the
menu. Delete it and it's gone. To change Solo's own colors, edit `solo.js`.

### Settings

`src/_data/site.json`:

| Key | Meaning |
|-----|---------|
| `theme.default` | `"solo"`, or any palette `id` from `palettes.json` |
| `theme.mode` | `"auto"` (follow the OS), `"light"`, or `"dark"` |
| `theme.switcher` | `false` removes both controls entirely |

## Code blocks

Every fenced block gets a header bar borrowed from
[yolo-11ty](https://yolo-11ty.web.app/#more-snippets): a bold label on the left,
a `copy_all` icon on the right, and the whole bar is the button — clicking it
copies the block and reports back for two seconds.

The label is the language, prettified (`bash` to `Bash`, `scss` to `SCSS`).
Anything after the language overrides it:

    ```bash Get Solo
    npm install
    npm start
    ```

The bar's colors are four theme tokens — `code-header-bg`, `code-header-fg`,
and the two `code-header-hover-*` — which for the imported palettes derive from
`link` and `primary`. The foreground is picked per palette as whichever of
near-white or near-black reads better on that background, so the bar stays
legible in all 68. Solo's own values land on `#0074d9` / `#7fdbff`, which is
within a hair of yolo-11ty's own `#0D6FB8` / `#7FD7FF`.

Two small departures from yolo-11ty: the bar is a real `<button>` rather than a
clickable `<div>`, so it is keyboard-reachable; and it highlights on
`:focus-visible` rather than `:focus`, so it does not stay inverted after a
mouse click.

## Fidelity to the original

The switcher sits in the upper right and ships hidden, revealed by script — so a
JavaScript-free visit renders exactly what Solo rendered. Setting `theme.switcher: false` does the same
permanently.

Three deliberate differences from the Jekyll original:

* Solo's demo page carried a GitHub corner ribbon and a GitHub star button.
  Both are gone, along with the `corner-*` theme tokens that existed only to
  color the ribbon. Nothing in the theme's layout or type depended on them.
* Fenced code blocks are highlighted by [Prism](https://prismjs.com/) rather than
  Rouge. The markup is wrapped in the same `highlighter-rouge` containers, and
  `_syntax.css` maps Prism's token names onto Solo's original Pygments palette,
  so the output is pixel-identical. Rouge class names still work for
  pre-highlighted HTML.
* The controls use [Material Icons](https://fonts.google.com/icons) ligatures —
  `dark_mode` / `light_mode` / `palette`, the same set yolo-11ty uses — so
  `main.css` imports that icon font alongside Inconsolata and Montserrat. It is
  the only font Solo did not load.

## Deploying

`npm run build` produces a static `_site/`. The stylesheet is referenced
relatively (`css/main.css`), exactly as in Solo, so the site works both at a
domain root and under a GitHub Pages project path.

## Credits

**[Solo](https://github.com/chibicode/solo) is the original** — a Jekyll theme
for single-page websites by **[Shu Uesugi](https://github.com/chibicode)**,
MIT-licensed. The layout, the 30rem column, the type scale, the spacing, the
two typefaces and the syntax palette are all his; this project only moves them
to a different generator.

| Reference | Link |
|-----------|------|
| Original theme | [github.com/chibicode/solo](https://github.com/chibicode/solo) |
| Original demo | [chibicode.github.io/solo](https://chibicode.github.io/solo/) |
| Successor theme | [Duo](https://chibicode.github.io/duo/), which Shu recommends over Solo |

Also carried over or borrowed:

* [normalize.css](https://necolas.github.io/normalize.css/) v2.1.3 (MIT) — shipped with Solo, copied across unchanged.
* [Inconsolata](https://fonts.google.com/specimen/Inconsolata) and [Montserrat](https://fonts.google.com/specimen/Montserrat) (OFL) — Solo's two typefaces.
* The Pygments/Rouge syntax colors from Solo's `_sass/_syntax.scss`, kept to the hex value.
* [Prism](https://prismjs.com/) (MIT) — does the highlighting Rouge used to.
* [Material Icons](https://fonts.google.com/icons) (Apache 2.0) — the switcher glyphs.
* [yolo-11ty](https://github.com/corbtastik/yolo) — 67 of the 68 palettes.

## License

MIT, the same license Solo carries.
