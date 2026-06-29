# 🌙 Himanshurudrakshi.world

An interactive proposal experience for Rudrakshi — a moonlit love story that
transforms into an HR recruitment portal where she evaluates Himanshu for the
lifetime role of *Husband*, ending in the real proposal.

Built with plain HTML, CSS and JavaScript. **No build step, no dependencies, no
internet required.** Just open `index.html`.

---

## ▶️ Run it locally

Double-click `index.html`, or for best results (so media loads reliably) serve
the folder:

```bash
# any one of these, from inside the project folder
python -m http.server 8000        # then open http://localhost:8000
npx serve .
```

**Secret password:** `09-10-2025` (also works as `09102025` or `09/10/2025`).

---

## ✏️ How to customise everything

Open **`assets/js/content.js`** — every word, name, date, and the password live
there. You almost never need to touch anything else.

## 🖼️ How to add your photos & videos

Drop files into these folders using the **exact names** shown as placeholders on
screen (and listed in `content.js`):

| Put the file in | Named like | Example |
|---|---|---|
| `assets/img/` | `IMAGE_PLACEHOLDER_NN.jpg` | `IMAGE_PLACEHOLDER_06.jpg` (dudu-bubu pillows) |
| `assets/video/` | `VIDEO_PLACEHOLDER_NN.mp4` | `VIDEO_PLACEHOLDER_02.mp4` (mom's reference video) |
| `assets/audio/` | `theme.mp3` | the *This Is Us* theme (welcome + the final proposal) |
| `assets/audio/` | `piano.mp3` | soft piano for the story-reading screens (use jazz here if you prefer) |
| `assets/audio/` | `bubu.mp3` | upbeat reel music for the Bubu & Dudu page |
| `assets/audio/` | `holdmusic.mp3` | quirky corporate hold music for the HR portal |
| `assets/img/` | `bubu-dudu.png` | the Dudu & Bubu characters (transparent PNG) — centerpiece of the Bubu & Dudu page |
| `assets/img/` | `FLOWERS_01..03.jpg` | Flowers album (Memories page) |
| `assets/img/` | `CHAI_01..03.jpg` | Chai album (Memories page) |
| `assets/img/` | `TRIP_01..03.jpg` | Trips & outings album (Memories page) |
| `assets/img/` | `GIFT_01..03.jpg` | Gifts album (Memories page) |
| `assets/img/` | `YOU_01..03.jpg` | "You" album (Memories page) |

Use `.jpg` for images and `.mp4` for videos (or update the path in `content.js`).
Refresh the page and they appear automatically. Until then, a labelled
placeholder is shown, so the site always looks complete.

**Priority assets:** `IMAGE_PLACEHOLDER_01, 02, 04, 06, 15, 18`,
`VIDEO_PLACEHOLDER_02` (mom), and `assets/audio/theme.mp3`.

---

## 🚀 Deploy free on GitHub Pages + custom domain

1. Create a GitHub repo and push this folder's contents.
2. **Settings → Pages →** deploy from `main`, root folder. Your site goes live.
3. The included `CNAME` file points it at `Himanshurudrakshi.world`. In your
   domain registrar's DNS, add `A` records to GitHub Pages
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and a `CNAME` for
   `www` → `<username>.github.io`. HTTPS provisions automatically.

### 🔒 Keep the surprise safe
- The site is set to `noindex` so search engines ignore it.
- **Keep the repo private until the moment**, or only deploy right before the
  trip. The password screen is the gate, but a public URL can still be guessed.

---

## 🎛️ Customization cheat-sheet

Everything below is edited in **`assets/js/content.js`** — no other files.

### Add more text to a page
Each story page's text is an array of lines (one paragraph each). Add/edit freely:
```js
beforeUs: { body: [ "First line.", "Second line.", "A new line you added." ] }
```
Text-line arrays: `welcome.lines`, `beforeUs.body`, `whenIKnew.lines`,
`bubuDudu.body`, `storm.resolution`, `offer.body`, `finalProposal.lines`.

### Add more cards
These are arrays — add an item, get a new card automatically:

| Section | Array | Card is… |
|---|---|---|
| Little things | `littleThings.cards` | a constellation star + memory |
| Our future | `future.dreams` | a dream tile |
| The storm | `storm.timeline` | a timeline node |
| Résumé | `resume.experience` | a job entry |
| Verification | `verification.items` | a checked claim |
| Stress test | `stressTest.scenarios` | a passed test |
| Culture fit | `cultureFit.metrics` | a 0–100 meter |
| Compensation | `compensation.perks` | a perk card |
| References | `references.list` | a reference (with video) |

### Add multiple photos / albums / flip cards
Give any story section a `media` block and pick a `mode`:

```js
media: {
  mode: "gallery",                 // single | gallery | shuffle | flip | reveal | wall
  items: [
    "IMAGE_PLACEHOLDER_30",                                   // shorthand: just an image
    { image: "IMAGE_PLACEHOLDER_31", caption: "Goa, 2025" },  // image + caption
    { image: "IMAGE_PLACEHOLDER_32", back: "Our first trip" },// 'back' = text on a flip card
    { video: "VIDEO_PLACEHOLDER_07", caption: "A reel" },     // a video
  ],
}
```

| `mode` | Behaviour |
|---|---|
| `single` | one photo/video |
| `gallery` | grid of photos; tap one to enlarge (lightbox) |
| `shuffle` | auto-rotating album that crossfades |
| `flip` | flip cards — photo front, your `back` text behind; tap to flip |
| `reveal` | hidden cards; tap to reveal the photo |
| `wall` | looping reel wall (videos autoplay, muted, on loop) |

Already configured: **Our future** = gallery · **Bubu & Dudu** = reel wall ·
**Keepsake home** = shuffle album. Change any `mode` to restyle instantly.

### Change the music per screen
Background music is set in `content.js` under `music`. Each screen's track is in
`music.byScreen` (set a screen to `null` for silence); everything else uses
`music.default`. The track files are listed in `music.files` — change a path to
swap a song. Tracks crossfade automatically, and screens sharing a track play it
without restarting.

## 🗂️ Project structure

```
himanshurudrakshi-world/
├── index.html
├── CNAME
├── assets/
│   ├── css/   01-variables · 02-base · 03-story · 04-hr · 05-transitions
│   ├── js/    content (← edit me) · navigation · audio · access ·
│   │          transitions · story · hr-portal · main
│   ├── img/   IMAGE_PLACEHOLDER_xx.jpg
│   ├── video/ VIDEO_PLACEHOLDER_xx.mp4
│   └── audio/ theme.mp3 · holdmusic.mp3 · unlock.mp3
```

Made with love, for the Moon and his Star. 🌙⭐
