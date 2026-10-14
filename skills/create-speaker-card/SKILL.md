---
name: create-speaker-card
description: "Create Flutter Korea 2026 4:5 speaker or session cards as PNG files from the supplied fixed template. Use for Flutter Korea speaker-card requests, not for unrelated social graphics."
---

# Create Speaker Card

Create a 1024×1372 PNG using the bundled deterministic HTML/CSS layout based on the supplied `card.svg` and track-chip SVG. Keep the supplied frame's aspect ratio and visual design.

## Inputs

Use the supplied source of truth for the speaker name, session title, time, and track. The renderer accepts exactly one track: `AI Track` or `Flutter Track`.

- Use a supplied or repository speaker portrait when it can be matched confidently.
- If no portrait is available, omit `--photo` and render the built-in session placeholder. Do not fabricate a person.
- The renderer accepts exactly one track: `AI Track` or `Flutter Track`, and uses the matching chip from `assets/flutter-chip.svg`.
- AI Track cards use Room 401 / 401호; Flutter Track cards use Room 300 ~ 400 / 300 ~ 400호.

## Render

Run `scripts/render-card.mjs` from this skill directory. It writes an HTML intermediate and, when `--png-out` is given, the final PNG.

Example:

```bash
node scripts/render-card.mjs \
  --photo /path/to/portrait.png \
  --name "Park Seungsu" \
  --title "After becoming a genius developer" \
  --time "11:50 – 12:20" \
  --track "AI Track" \
  --language en \
  --out /path/to/park-seungsu.html \
  --png-out /path/to/park-seungsu.png
```

## Fixed design

`assets/card-template.html` overlays the source frame at 1024×1372. `assets/card.svg` provides the frame and fixed event design; `assets/flutter-chip.svg` provides the track chips. The HTML template changes the portrait, name, session title, time, selected track, and track-specific room label.

Only the portrait, name, session title, time, selected track, and corresponding room label may vary. Preserve the template unless the user explicitly asks for a design change. Inspect the PNG before delivery: the selected chip must be the only chip shown, title text must be legible, and any portrait must be circularly cropped.

Deliver PNG by default; provide SVG only when requested.
