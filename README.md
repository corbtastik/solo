# Yolo

Yolo is laser focused on static single page sites, and while anyone can Yolo, it's purposely built for writers,
techies, and picture taking folk.

> _I don't always use single-page sites but when I do, I [yolo](https://github.com/corbtastik/yolo)._

## Goals for Yolo

### 1. Live the best single page life.

Pamper single page sites like we pamper our pets.

### 2. Strive for simplicity.

No dependencies other than [jekyll](https://jekyllrb.com/).

### 3. Make it customizable

Bring your own colors and fonts.

---

## Yolo demo

* Yolo on Github Pages - [https://corbtastik.github.io/yolo](https://corbtastik.github.io/yolo)
* Yolo on Surge - [https://corbtastik-yolo.surge.sh](https://corbtastik-yolo.surge.sh)

---

## Getting Started

* You need [jekyll](https://jekyllrb.com/).

```bash
git clone https://github.com/corbtastik/yolo.git
cd yolo
jekyll build
jekyll serve  # open http://localhost:4000
```

---

## Next Steps

Take a gander at the [demo page](https://corbtastik.github.io/yolo/#getting-started) for info on usage, themes, and customizations.

---

## Yolo themes

There are 5 theme scss files included in `_sass/yolo/themes`, each defines color variables for dark and light modes.  Create your own scss file and configure the name in `_config.yml`.

### Corbs > Dark

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-corbs-dark-01.png" alt="Yolo Corbs Dark" style="width:384px;">

### Corbs > Light

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-corbs-light-01.png" alt="Yolo Corbs Light" style="width:384px;">

### Arcade > Dark

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-arcade-dark-01.png" alt="Yolo Arcade Dark" style="width:384px;">

### Arcade > Light

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-arcade-light-01.png" alt="Yolo Arcade Light" style="width:384px;">

### Skeletor > Dark

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-skeletor-dark-01.png" alt="Yolo Skeletor Dark" style="width:384px;">

### Skeletor > Light

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-skeletor-light-01.png" alt="Yolo Skeletor Light" style="width:384px;">

### Solo > Dark

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-solo-dark-01.png" alt="Yolo Solo Dark" style="width:384px;">

### Solo > Light

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-solo-light-01.png" alt="Yolo Solo Light" style="width:384px;">

### Weekly > Dark

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-weekly-dark-01.png" alt="Yolo Weekly Dark" style="width:384px;">

### Weekly > Light

<img src="https://storage.googleapis.com/corbs-foto/yolo/screenshots/yolo-weekly-light-01.png" alt="Yolo Weekly Light" style="width:384px;">

---

## Makefile docs

### open a single-page

The `open` target will save the current single-page on the site root and load one from `src/samples`. Every single-page will have at least two files: `index.md` and `_config.yml`. A single-page site is described by a `yolo.json` file, which contains information on what files define the single-page site.

As mentioned every single-page site will have `index.md` and `_config.yml` files, but additional files, such as `_data`, and `scss` files can be configured. The following examples document how to use the `open` target.

```bash
# parse yolo.json
cat ./src/samples/yolo-dallas/yolo.json | jq -r --arg cmd "cp " '$cmd + .data[0]'
# copy a _data file into _data/ at the site root
cat ./src/samples/yolo-dallas/yolo.json | jq -r --arg cmd "cp ./src/samples/yolo-dallas/" --arg dest " _data/" '$cmd + .data[0] + $dest'

# Execute a jq command and save output (which is a generated cp command) to shell var CP_CMD
CP_FILES=$(cat ./src/samples/yolo-dallas/yolo.json \
  | jq -r --arg source "./src/samples/yolo-dallas/" '$source + .data[]') 
CP_CMD=$(cat ./src/samples/yolo-dallas/yolo.json \
  | jq -r --arg cmd "cp ./src/samples/yolo-dallas/" \
  --arg dest " _data/ " '$cmd + .data[] + $dest')
echo $CP_CMD
# This is the output of echo $CP_CMD
cp ./src/samples/yolo-dallas/lb-dallas.yml _data/
cp ./src/samples/yolo-dallas/ig-dallas.yml _data/

# Execute the command saved in $CP_CMD by echoing its content inside a command subshell
$(echo $CP_CMD)
$($CP_CMD)

# This works
CP_FILES=$(cat ./src/samples/yolo-dallas/yolo.json \
  | jq -r --arg source "./src/samples/yolo-dallas/" '$source + .data[]')
CP_FILES="${CP_FILES//$'\n'/ }"  
cp $(echo $CP_FILES) _data/

```

## License

[MIT License](/LICENSE)
