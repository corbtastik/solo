---
layout: layouts/default.njk
---

[Solo](http://chibicode.github.io/solo) is a Jekyll theme that supports **single-page websites** only, but supports them well. Yes, it's responsive. This is a pixel-for-pixel port of it to [Eleventy](https://www.11ty.dev/) — same layout, same fonts, same elements — plus one thing Solo never had: **color themes**.

Try the two controls in the upper right corner.

## Solo is useful if...

* You want to create an "about me" page from a single markdown file and host it under a custom domain name.
* You want to create a single-page website that's mostly text.
* You want to share a single markdown file but would like something nicer-looking.
* You want something like GitHub's [automatic page generator](http://pages.github.com/) for a non-code repository.

This page itself is built with Solo. It's generated from [this markdown file](https://github.com/corbtastik/solo/blob/main/src/index.md).

## Usage

You need [Node.js](https://nodejs.org/). Clone the repository, then:

```bash Get Solo
npm install
npm start
```

Eleventy serves the site at `http://localhost:8080` and rebuilds on save. `npm run build` writes the finished site to `_site`.

**The main file you'll be editing is `src/index.md`**. This becomes the content for the page.

### Other Files

* Edit `src/_data/site.json` to change the site's title and description.
* Edit `src/_data/solo.js` for Solo's own colors, or `src/_data/palettes.json` for the rest.
* Edit `src/_includes/head.njk` to add custom code to `<head>`.
* Edit `src/_includes/scripts.njk` to add custom code before `</body>`.
* Drop anything static — images, `CNAME`, `robots.txt` — into `src/static/`.
* Edit `README.md` before pushing your code.

### Don't use `<h1>` tags

Within `src/index.md`, do not use `<h1>` tags — `<h1>` is reserved for the site title.

## Color themes

There are two controls in the upper right, and they are independent axes — the
same split [yolo-11ty](https://yolo-11ty.web.app/) uses:

* The **sun / moon** toggles light and dark directly. It shows the mode you would
  switch *to*, not the one you are looking at.
* The **palette** opens 68 color themes: Solo's own, plus all 67 from yolo-11ty,
  grouped as they are there.

Every palette supplies both a light and a dark rendering, so the two controls
compose: pick Matrix Green, then toggle to dark, and you get Matrix Green's dark
variant. Both choices are remembered in `localStorage`.

Solo's own palette is the one compiled into `css/main.css`, so it paints before
a line of JavaScript runs and holds the exact colors of the original Jekyll
theme. The other 67 live in `src/_data/palettes.json` and are applied as CSS
custom properties on `<html>`. A palette is twelve colors per mode:

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

Those twelve are widened to the ~50 custom properties the stylesheet actually
uses — including the full Pygments/Rouge syntax palette — by `expand()` in
`src/_includes/theme-init.njk`. Add an entry to any group in `palettes.json` and
it appears in the menu; delete one and it's gone.

To ship a different default, set `theme.default` in `src/_data/site.json` to any
palette `id`, and `theme.mode` to `light`, `dark`, or `auto`. Setting
`theme.switcher` to `false` drops both controls, which leaves the page
byte-for-byte identical to Solo.

## Markdown elements

Everything below is plain markdown, rendered by the theme. It is here as a
proving ground: switch palettes while you scroll and you can see every element
in every theme.

### Headings

`<h1>` is reserved for the site title, so headings on the page start at level 2.
Level 2 has its own size; levels 3 through 6 share a single uppercase style.

#### Heading level 4

##### Heading level 5

###### Heading level 6

### Text

A plain paragraph, with *emphasis*, **strong emphasis**, ***both at once***,
~~strikethrough~~, `inline code`, and a [link](https://www.11ty.dev/).

Typographic replacement is on, the way kramdown had it: "double quotes" and
'single quotes' curl, an en dash -- and an em dash --- fill in, and an
ellipsis... collapses to one character.

Two trailing spaces at the end of a line  
force a hard break without starting a new paragraph.

A backslash escapes markdown syntax, so \*this\* keeps its asterisks.

### Lists

Unordered, nested three deep:

* A first item
* A second item
  * A nested item
  * Another nested item
    * A third level
* A third item

Ordered, with a nested ordered list:

1. First
2. Second
   1. Second, first
   2. Second, second
3. Third

A list can start at any number:

7. Seven
8. Eight

Task lists work too:

* [x] Port Solo to Eleventy
* [x] Add color themes
* [ ] Write the next page

A loose list — blank lines between items — gets its text wrapped in paragraphs,
which widens the spacing:

* The first item, in its own paragraph.

* The second item, likewise.

### Definition lists

Definition lists come from kramdown and Solo styles them, so they are here:

Term
: The definition. `dd` carries a 1.5rem left margin.

A second term
: Its first definition.
: A second definition for the same term.

### Blockquotes

> A blockquote takes the muted text color and a quarter-rem rule in the border
> color.
>
> It can hold more than one paragraph, and the last one loses its bottom margin
> so the box closes tightly.

> Blockquotes nest:
>
> > and the inner one picks up the same border and color again.

### Code

Inline `code` sits on the `--code-bg` background. Every fenced block gets a
header bar, borrowed from [yolo-11ty](https://yolo-11ty.web.app/#more-snippets):
the label names the language, and clicking anywhere on the bar copies the block.

A fence with a language is highlighted at build time, and labelled from the
language:

```javascript
const palettes = require("./palettes.json");

// Widen twelve colors into the fifty the stylesheet wants.
function expand(palette) {
  return Object.assign({}, palette, {
    muted: mix(palette.text, palette.bg, 0.75),
  });
}
```

```python
def kramdown_slug(text):
    """The heading ids Solo's pages used."""
    return re.sub(r"[^a-z0-9 -]", "", text.lower()).replace(" ", "-")
```

```css
.container {
  max-width: 30rem;
  margin: 0 auto;
}
```

Anything after the language becomes a custom label, so ```` ```yaml Front matter ````
gives this:

```yaml Front matter
layout: layouts/default.njk
permalink: 404.html
```

A fence with no language gets the same frame, no highlighting, and a plain
`Text` label:

```
$ npm run build
[11ty] Wrote 3 files in 0.06 seconds
```

An indented block — four spaces — works the same way:

    git clone https://github.com/corbtastik/solo
    npm install

### Tables

| Element | Token | Shows up in |
|---------|-------|-------------|
| Body text | `--text` | Paragraphs, lists |
| Links | `--link` | Anchors |
| Rules | `--rule` | `<hr>`, table and blockquote borders |
| Code | `--code-bg` | `<pre>` and `<code>` |

Columns take alignment from the separator row:

| Left | Centered | Right |
|:-----|:--------:|------:|
| a | b | c |
| longer cell | longer cell | longer cell |

### Links and images

An [inline link](https://www.11ty.dev/), a [link with a title](https://www.11ty.dev/ "The Eleventy site"), a bare autolink <https://www.11ty.dev/>, and a [reference link][11ty] defined further down.

[11ty]: https://www.11ty.dev/

Images are centered and capped at the column width by Solo's own `.container img` rule:

![An example image](example.svg)

### Footnotes

Footnotes are another kramdown feature.[^note] They collect at the bottom of the
page with a rule above them.[^second]

[^note]: The note itself, which can hold `code` and [links](https://www.11ty.dev/).
[^second]: A second note, to show how they stack.

### Horizontal rules

Three or more hyphens, asterisks, or underscores make a rule:

---

### Inline HTML

Raw HTML passes straight through, so <kbd>⌘</kbd> + <kbd>K</kbd>, <mark>marked
text</mark>, H<sub>2</sub>O, 2<sup>10</sup>, and <abbr title="Cascading Style
Sheets">CSS</abbr> all work.

## Markdown images

Standard markdown images use the default `<img>` styling. In Solo that means
`.container img` centers them and caps them at the column width, so a photo of
any size drops in without overflowing:

```markdown Markdown
![BIG yawn Bucky](big-tongue-bucky.jpg "Sleepy Bucky")
```

![BIG yawn Bucky](https://storage.googleapis.com/corbs-foto/broken-bow-we-go/big-tongue-bucky.jpg "Sleepy Bucky")

## Styled images

For anything more deliberate there are size and ratio classes, the same set
[yolo-11ty](https://yolo-11ty.web.app/#styled-images) uses. Markdown's `![]()`
has nowhere to put a class, so reach for a raw `<img>`:

```html HTML
<img class="is-256" src="bluebonnet.jpg" alt="Bluebonnet">
```

Each class sets a width and an aspect ratio, and `object-fit: cover` crops the
photo to fill the box rather than squashing it.

### Thumbnail

128px square. Use the `thumbnail` class.

<img class="thumbnail" src="https://storage.googleapis.com/corbs-foto/broken-bow-we-go/big-tongue-bucky.jpg" alt="Bucky" loading="lazy">

### Square

Classes: `is-16` through `is-512`.

<img class="is-256" src="https://storage.googleapis.com/corbs-foto/bigd/granada-theater-greenville-1150.jpg" alt="The Granada Theater" loading="lazy">

### Circle

Classes: `is-circle-16` through `is-circle-512`.

<img class="is-circle-256" src="https://storage.googleapis.com/corbs-foto/broken-bow-we-go/big-tongue-bucky.jpg" alt="Bucky" loading="lazy">

### 4:3 ratio

Classes: `is-100-by-75` through `is-640-by-480`.

<img class="is-256-by-192" src="https://storage.googleapis.com/corbs-foto/flowerhood/bluebonnet.jpg" alt="Bluebonnet" loading="lazy">

### 3:4 ratio

Classes: `is-75-by-100` through `is-480-by-640`.

<img class="is-240-by-320" src="https://storage.googleapis.com/corbs-foto/flowerhood/bluebonnet.jpg" alt="Bluebonnet" loading="lazy">

### 16:9 ratio

Classes: `is-112-by-63` through `is-640-by-360`.

<img class="is-256-by-144" src="https://storage.googleapis.com/corbs-foto/flowerhood/bluebonnet.jpg" alt="Bluebonnet" loading="lazy">

### 9:16 ratio

Classes: `is-63-by-112` through `is-360-by-640`.

<img class="is-225-by-400" src="https://storage.googleapis.com/corbs-foto/flowerhood/bluebonnet.jpg" alt="Bluebonnet" loading="lazy">

## Author

This Eleventy port is by [corbtastik](https://github.com/corbtastik).

<img class="avatar" src="https://github.com/corbtastik.png?size=400" alt="corbtastik" width="200" height="200">

## Credits

**[Solo](https://github.com/chibicode/solo) is the original** — a Jekyll theme
for single-page websites by **[Shu Uesugi](https://github.com/chibicode)**,
released under the MIT License in 2014. The layout, the 30rem column, the type
scale, the spacing, the two typefaces and the syntax palette on this page are
all his work. This project only moves them to a different generator; nothing
about the design is mine.

| Reference | Link |
|-----------|------|
| Original theme | [github.com/chibicode/solo](https://github.com/chibicode/solo) |
| Original demo | [chibicode.github.io/solo](https://chibicode.github.io/solo/) |
| Author | [Shu Uesugi](https://github.com/chibicode) ([@chibicode](https://twitter.com/chibicode)) |
| Successor theme | [Duo](https://chibicode.github.io/duo/), which Shu recommends over Solo |

Also carried over or borrowed:

* [normalize.css](https://necolas.github.io/normalize.css/) v2.1.3 (MIT) — shipped with Solo, copied across unchanged.
* [Inconsolata](https://fonts.google.com/specimen/Inconsolata) and [Montserrat](https://fonts.google.com/specimen/Montserrat) (Open Font License) — Solo's two typefaces, still loaded from Google Fonts.
* The Pygments/Rouge syntax colors from Solo's `_sass/_syntax.scss`, kept to the hex value.
* [Prism](https://prismjs.com/) (MIT) — does the highlighting that Rouge used to, mapped onto those same colors.
* [Material Icons](https://fonts.google.com/icons) (Apache 2.0) — the sun, moon and palette in the corner.
* [yolo-11ty](https://github.com/corbtastik/yolo) — 67 of the 68 color palettes.

### License

[MIT](http://chibicode.mit-license.org/), the same license Solo carries.
