# Robert Clarke — Interactive Portfolio

Seven chapters. Each one plays an audio slice with a photo/clip sequence timed to it.
The visual style deliberately evolves page to page — bland office slide at the start,
full volume in the field years, clean and precise in the office years, warm at the end.

---

## Adding your content (the only thing you do)

**1. Drop files into the right folder.**

| Page | Folder | Chapter |
|---|---|---|
| index.html | `media/p0/` | Intro |
| p1.html | `media/p1/` | 1981–1999 The Early Years |
| p2.html | `media/p2/` | 2000–2007 The Troublesome Rookie |
| p3.html | `media/p3/` | 2007–2012 The Hungry Apprentice |
| p4.html | `media/p4/` | 2013–2021 The Field Grunt |
| p5.html | `media/p5/` | 2022–2025 The Office Professional |
| p6.html | `media/p6/` | 2026– The Dreamer |

Name them `p1_audio.mp3`, `p1_01.jpg`, `p1_02.jpg`, `p1_03.mp4` and so on.

**2. List them in `assets/js/manifest.js`.**

That's the one file you edit. The order you list them is the order they appear on screen.

**3. Save, commit, push.** The live site updates on its own.

---

## Sizes — read this one

- Photos: about **1920px wide, under 500KB each**. Straight off a phone they're 5MB+ and the page will crawl.
- Clips: keep each mp4 **under 25MB**. Git keeps every version of every file forever, so fat videos you update often will permanently bloat the repo. GitHub blocks anything over 100MB outright.

---

## Previewing before you push

Double-clicking `index.html` mostly works, but browsers get fussy about local audio.
For a proper preview, in the project folder run:

```
python -m http.server 8000
```

then open `http://localhost:8000` in your browser. Ctrl+C in the terminal to stop.

---

## Controls

- **Space** — play / pause
- **← →** — previous / next chapter
- Click the era strip at the bottom to jump to any chapter
- **Skip to skills** (top right) — the Revit / Navisworks / Revizto page, one click from anywhere

Audio has to be started by a click the first time. Browsers block auto-playing sound;
nothing is broken.

---

## If a page looks empty

It'll say "Stage ready" with the folder name. That means the folder has no files listed
in the manifest yet. Not an error.
