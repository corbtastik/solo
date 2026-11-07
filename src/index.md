---
layout: layouts/default.njk
---

[Solo](http://chibicode.github.io/solo) is a Jekyll theme. It does **single-page websites** only, and it does them well. Yes, it's responsive. This page is a pixel-for-pixel port of Solo to [Eleventy](https://www.11ty.dev/) — same layout, same fonts, same elements — plus one thing Solo never had: **color themes**.

Try the two controls in the upper right corner.

## Solo is useful if...

* You want an "about me" page from one markdown file, on your own domain.
* You want a single-page website that is mostly text.
* You want to share one markdown file, but nicer looking.
* You want GitHub's [automatic page generator](http://pages.github.com/) for a repository without code.

This page runs on Solo. It comes from [one markdown file](https://github.com/corbtastik/solo/blob/main/src/index.md).

## What this port adds

The port leaves Solo's layout, type and spacing alone. Everything below is new:

* **68 color themes** on two axes. A sun/moon toggles light and dark. A palette
  picker sets the colors. Solo's own, plus all 67 from
  [yolo-11ty](https://yolo-11ty.web.app/).
* **Code block headers** — every fenced block gets a labelled bar. Click it to
  copy the code.
* **Sortable tables** — an accent header row. Click a column to sort it.
* **Image classes** — squares, circles and four aspect ratios.
* **A site logo**, round, at the right edge of the header.
* **More markdown** — definition lists, footnotes, task lists and indented code
  blocks. markdown-it handles none of these on its own.
* **An image grid** — click a thumbnail to enlarge it in place.
* **Video embeds**, from a data file.
* **A back-to-top control** in the bottom right corner.

## Usage

You need [Node.js](https://nodejs.org/). Clone the repository, then:

```bash Get Solo
npm install
npm start
```

Eleventy serves the site at `http://localhost:8080` and rebuilds on save. `npm run build` writes the finished site to `_site`.

**You edit `src/index.md`**. It becomes the page.

### Other Files

* Edit `src/_data/site.json` to change the site's title and description.
* Edit `src/_data/solo.js` for Solo's own colors, or `src/_data/palettes.json` for the rest.
* Edit `src/_includes/head.njk` to add custom code to `<head>`.
* Edit `src/_includes/scripts.njk` to add custom code before `</body>`.
* Drop anything static — images, `CNAME`, `robots.txt` — into `src/static/`.
* Edit `README.md` before pushing your code.

### Don't use `<h1>` tags

Skip `<h1>` tags in `src/index.md`. The site title owns that level.

## Color themes

Two controls sit in the upper right. They work on separate axes, the same split
[yolo-11ty](https://yolo-11ty.web.app/) uses:

* The **sun / moon** toggles light and dark. It shows the mode you would switch
  *to*, not the one on screen.
* The **palette** opens all 68 themes. Solo's own, plus the 67 from yolo-11ty,
  in the same groups.

Every palette ships a light and a dark rendering, so the two controls compose.
Pick Matrix Green, then toggle to dark, and you get Matrix Green's dark variant.
The browser keeps both choices in `localStorage`.

Solo's own palette compiles into `css/main.css`. It paints before a line of
JavaScript runs, in the exact colors of the original Jekyll theme. The other 67
live in `src/_data/palettes.json`, and a script applies them as CSS custom
properties on `<html>`. Each palette is twelve colors per mode:

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

`expand()` in `src/_includes/theme-init.njk` widens those twelve. It fills the
~50 custom properties the stylesheet uses, down to the whole Pygments/Rouge
syntax palette. Add an entry to any group in `palettes.json` and it shows up in
the menu. Delete one and it's gone.

For a different default, set `theme.default` in `src/_data/site.json` to any
palette `id`, and `theme.mode` to `light`, `dark`, or `auto`. Set
`theme.switcher` to `false` and both controls disappear. The page then matches
Solo byte for byte.

## Markdown elements

Everything below is plain markdown, and the theme renders it. Treat it as a
proving ground. Switch palettes while you scroll to see every element in every
theme.

### Headings

The site title owns `<h1>`, so headings on the page start at level 2. Level 2
has its own size. Levels 3 through 6 share a single style.

#### Heading level 4

##### Heading level 5

###### Heading level 6

### Text

A plain paragraph, with *emphasis*, **strong emphasis**, ***both at once***,
~~strikethrough~~, `inline code`, and a [link](https://www.11ty.dev/).

Typographic replacement is on, the way kramdown had it. "Double quotes" and
'single quotes' curl. An en dash -- and an em dash --- fill in. An
ellipsis... collapses to one character.

Two trailing spaces end a line  
and force a hard break, with no new paragraph.

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

A loose list puts blank lines between the items. Markdown then wraps each item
in a paragraph, which widens the spacing:

* The first item, in its own paragraph.

* The second item, likewise.

### Definition lists

Definition lists come from kramdown, and Solo styles them, so they are here:

Term
: The definition. `dd` carries a 1.5rem left margin.

A second term
: Its first definition.
: A second definition for the same term.

### Blockquotes

> A blockquote takes the muted text color and a quarter-rem rule in the border
> color.
>
> It can hold more than one paragraph. The last one drops its bottom margin, so
> the box closes tight.

> Blockquotes nest:
>
> > and the inner one picks up the same border and color again.

### Code

Inline `code` sits on the `--code-bg` background. Every fenced block gets a
header bar, borrowed from [yolo-11ty](https://yolo-11ty.web.app/#more-snippets).
The label names the language. Click anywhere on the bar to copy the block.

A fence with a language gets highlighted at build time, and takes its label
from the language:

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

Styled after [yolo-11ty](https://yolo-11ty.web.app/#tables). The header row
takes the theme's accent, the same one the code block header uses, and every
internal rule is drawn in it. **Click any column header to sort. Click again to
reverse.**

| Player | BA | HR |
|--------|----|----|
| Hank Aaron | .305 | 755 |
| Babe Ruth | .342 | 714 |
| Mookie Wilson | .274 | 67 |

Numeric columns sort as numbers. So `67` lands below `714`, not between `.305`
and `714`.

Columns take alignment from the separator row:

| Left | Centered | Right |
|:-----|:--------:|------:|
| Hank Aaron | Right-fielder | .305 |
| Babe Ruth | Outfielder | .342 |
| Mookie Wilson | Center-fielder | .274 |

And a plain reference table:

| Element | Token | Shows up in |
|---------|-------|-------------|
| Body text | `--text` | Paragraphs, lists |
| Links | `--link` | Anchors |
| Rules | `--rule` | `<hr>` and blockquote borders |
| Code | `--code-bg` | `<pre>` and `<code>` |

### Links and images

An [inline link](https://www.11ty.dev/), a [link with a title](https://www.11ty.dev/ "The Eleventy site"), a bare autolink <https://www.11ty.dev/>, and a [reference link][11ty] defined below.

[11ty]: https://www.11ty.dev/

The theme centers images and caps them at the column width:

![An example image](example.svg)

### Footnotes

Footnotes are another kramdown feature.[^note] They collect at the bottom of the
page, under a rule.[^second]

[^note]: The note itself. It can hold `code` and [links](https://www.11ty.dev/).
[^second]: A second note, to show how they stack.

### Horizontal rules

Three or more hyphens, asterisks, or underscores make a rule:

---

### Inline HTML

Raw HTML passes straight through. So <kbd>⌘</kbd> + <kbd>K</kbd>, <mark>marked
text</mark>, H<sub>2</sub>O, 2<sup>10</sup>, and <abbr title="Cascading Style
Sheets">CSS</abbr> all work.

## Markdown images

Plain markdown images take the default `<img>` styling. The theme centers them
and caps them at the column width, so a photo of any size drops in without
overflowing:

```markdown Markdown
![BIG yawn Bucky](big-tongue-bucky.jpg "Sleepy Bucky")
```

![BIG yawn Bucky](https://storage.googleapis.com/corbs-foto/broken-bow-we-go/big-tongue-bucky.jpg "Sleepy Bucky")

## Styled images

For a set size, reach for the size and ratio classes. They are the same set
[yolo-11ty](https://yolo-11ty.web.app/#styled-images) uses. Markdown's `![]()`
has nowhere to put a class, so write a raw `<img>`:

```html HTML
<img class="is-256" src="bluebonnet.jpg" alt="Bluebonnet">
```

Each class sets a width and an aspect ratio. `object-fit: cover` crops the photo
to fill the box, so nothing gets squashed.

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

## Image grid

The grid shows images inline. Click one to enlarge it, click again to shrink it.
The arrows and the left and right keys step through the set, and Escape closes
it. The grid comes from [yolo-11ty](https://yolo-11ty.web.app/#image-grid), down
to the data format — its `ig-*.yml` files drop straight in.

1. Add images to `src/_data/ig-images.yml`.
2. Use the `imageGrid` shortcode.

{% raw %}
```html Shortcode
{% imageGrid %}
```
{% endraw %}

{% imageGrid %}

### Custom file and column count

Any file in `src/_data/` with an `ig-` prefix works. The second argument sets
the column count:

{% raw %}
```html Custom data
{% imageGrid "ig-camping", 2 %}
```
{% endraw %}

{% imageGrid "ig-camping", 2 %}

## Videos

Embedded video, after [yolo-11ty](https://yolo-11ty.web.app/#videos). Add
entries to `src/_data/videos.yml`, then call the shortcode:

{% raw %}
```html Shortcode
{% video %}
```
{% endraw %}

{% video %}

Each entry is `name`, `src` and `description`. The `src` is an embed URL. For
YouTube that is `https://youtube.com/embed/<id>`. Pass a different data file as
an argument, the way the image grid does: {% raw %}`{% video "talks" %}`{% endraw %}.

## Author

[corbtastik](https://github.com/corbtastik) built this Eleventy port.

<img class="avatar" src="https://github.com/corbtastik.png?size=400" alt="corbtastik" width="200" height="200">

## Credits

**[Solo](https://github.com/chibicode/solo) is the original** — a Jekyll theme
for single-page websites. **[Shu Uesugi](https://github.com/chibicode)** wrote
it and released it under the MIT License in 2014. The layout, the 30rem column,
the type scale, the spacing, the two typefaces and the syntax palette on this
page are all his work. This port only moves them to a different generator.
None of the design is mine.

| Reference | Link |
|-----------|------|
| Original theme | [github.com/chibicode/solo](https://github.com/chibicode/solo) |
| Original demo | [chibicode.github.io/solo](https://chibicode.github.io/solo/) |
| Author | [Shu Uesugi](https://github.com/chibicode) ([@chibicode](https://twitter.com/chibicode)) |
| Successor theme | [Duo](https://chibicode.github.io/duo/), which Shu recommends over Solo |

Also carried over or borrowed:

* [normalize.css](https://necolas.github.io/normalize.css/) v2.1.3 (MIT) — shipped with Solo, copied across unchanged.
* [Inconsolata](https://fonts.google.com/specimen/Inconsolata) and [Montserrat](https://fonts.google.com/specimen/Montserrat) (Open Font License) — Solo's two typefaces. Google Fonts still serves them.
* The Pygments/Rouge syntax colors from Solo's `_sass/_syntax.scss`, kept to the hex value.
* [Prism](https://prismjs.com/) (MIT) — does the highlighting Rouge used to do, in those same colors.
* [Material Icons](https://fonts.google.com/icons) (Apache 2.0) — the sun, moon and palette in the corner.
* [yolo-11ty](https://github.com/corbtastik/yolo) — 67 of the 68 color palettes.

### License

[MIT](http://chibicode.mit-license.org/), the same license Solo carries.
