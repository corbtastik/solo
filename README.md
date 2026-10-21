# Solo, ported to Eleventy

An [Eleventy](https://www.11ty.dev/) port of [Solo](https://github.com/chibicode/solo),
Shu Uesugi's Jekyll theme for single-page websites. Same layout, same fonts,
same elements — plus 68 color themes, click-to-copy code blocks, sortable
tables, image grids and video embeds.

### [Demo and documentation →](https://solo-11ty.web.app)

## Quick start

```bash
npm install
npm start      # http://localhost:8080, rebuilds on save
npm run build  # writes _site/
```

## Where things live

```
src/
├── index.md        the page — this is the file you edit
├── 404.html
├── _data/
│   ├── site.json       title, description, logo, theme settings
│   ├── solo.js         Solo's own colors
│   ├── palettes.json   the other 67 color themes
│   ├── ig-*.yml        image grid galleries
│   └── videos.yml      video embeds
├── _includes/
│   ├── head.njk        your code for <head>      (empty)
│   ├── scripts.njk     your code before </body>  (empty)
│   └── css/            one partial per component; _custom.css is yours
├── css/main.njk    assembles the partials into /css/main.css
└── static/         copied to the site root as-is
```

## Settings

`src/_data/site.json`:

| Key | Meaning |
|-----|---------|
| `title` | browser tab title |
| `tag_text` | the big heading at the top |
| `description` | meta description |
| `logo` / `logo_alt` | round image at the right of the header; omit for no logo |
| `theme.default` | `"solo"`, or any palette `id` |
| `theme.mode` | `"auto"` (follow the OS), `"light"` or `"dark"` |
| `theme.switcher` | `false` removes both theme controls |

## Themes

Two controls in the upper right, on independent axes:

* **sun / moon** — toggles light and dark. Shows the mode you would switch *to*.
* **palette** — picks which set of colors.

They compose: choose Matrix Green, toggle to dark, and you get Matrix Green's
dark variant. Both choices persist in `localStorage`.

Solo's own colors are in `src/_data/solo.js`. The other 67 are in
`src/_data/palettes.json`, twelve colors per mode:

```json
{
  "id": "matrix-green",
  "name": "Matrix Green",
  "light": {
    "bg": "#f0fff4", "text": "#003300", "heading": "#001a00",
    "link": "#008000", "primary": "#008000", "surface": "#ffffff",
    "border": "#b3ffc1", "shKeyword": "#008000", "shString": "#008000",
    "shFunction": "#006600", "shVariable": "#00ff41", "shComment": "#a1a1a1"
  },
  "dark": { "...": "..." }
}
```

Add an entry to any group and it appears in the menu. Those twelve colors are
widened into the ~50 the stylesheet uses by `expand()` in
`src/_includes/theme-init.njk`.

## Writing

Ordinary markdown, plus definition lists, footnotes and task lists.

**Code blocks** get a header bar you can click to copy. The label is the
language; anything after it is a custom label:

    ```bash Get Solo
    npm install
    ```

**Tables** need no markup — click a column header to sort, again to reverse.

**Images** are centered and capped at the column width. For a specific size,
use a raw `<img>` with one of these classes:

| Class | |
|-------|--|
| `thumbnail` | 128px square |
| `is-16` … `is-512` | squares |
| `is-circle-16` … `is-circle-512` | the same, round |
| `is-100-by-75` … `is-640-by-480` | 4:3 |
| `is-75-by-100` … `is-480-by-640` | 3:4 |
| `is-112-by-63` … `is-640-by-360` | 16:9 |
| `is-63-by-112` … `is-360-by-640` | 9:16 |

**Image grids** and **videos** come from data files. Entries are `name`, `src`
and `description`:

```njk
{% imageGrid %}                    {# ig-images.yml, 4 columns #}
{% imageGrid "ig-camping", 2 %}    {# any ig-*.yml, 2 columns #}
{% video %}                        {# videos.yml #}
```

Click a thumbnail to enlarge it in place; arrow keys step through, Escape closes.

## Deploying

`npm run build` produces a static `_site/`. The stylesheet is referenced
relatively, so the site works at a domain root or under a project path.
`firebase.json` is set up for Firebase Hosting.

## Differences from the Jekyll original

The theme controls ship hidden and are revealed by script, so a JavaScript-free
visit renders what Solo rendered. Beyond the additions above:

* The GitHub corner ribbon and star button are gone.
* Code is highlighted by [Prism](https://prismjs.com/) rather than Rouge, mapped
  onto Solo's original Pygments colors.
* Headings are no longer uppercased, and tables use the new styling.
* [Material Icons](https://fonts.google.com/icons) is loaded for the control
  glyphs — the one font Solo did not use.

## Credits

**[Solo](https://github.com/chibicode/solo) is the original** — a Jekyll theme
by **[Shu Uesugi](https://github.com/chibicode)**, MIT-licensed. The layout, the
30rem column, the type scale, the spacing and the syntax palette are all his;
this project only moves them to a different generator. See also
[Duo](https://chibicode.github.io/duo/), which Shu recommends over Solo.

Also carried over or borrowed:

* [normalize.css](https://necolas.github.io/normalize.css/) v2.1.3 — shipped with Solo, unchanged.
* [Inconsolata](https://fonts.google.com/specimen/Inconsolata) and [Montserrat](https://fonts.google.com/specimen/Montserrat) — Solo's two typefaces.
* [Prism](https://prismjs.com/) and [Material Icons](https://fonts.google.com/icons).
* [yolo-11ty](https://github.com/corbtastik/yolo) — 67 of the 68 palettes, and
  the code header, table, image, grid and video components.

## License

MIT, the same license Solo carries.
