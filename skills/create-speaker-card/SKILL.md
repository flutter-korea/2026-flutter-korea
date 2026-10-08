---
name: create-speaker-card
description: "Create Flutter Korea 2026 4:5 speaker or session cards as PNG files from the supplied fixed template. Use for Flutter Korea speaker-card requests, not for unrelated social graphics."
---

# Create Speaker Card

Create a 1080×1350 PNG using the bundled deterministic SVG layout. The template captures the approved Flutter Korea 2026 card design; it is not a prompt for a generative image model.

## Inputs

Use the supplied source of truth for the speaker name, session title, time, and track. The renderer accepts exactly one track: `AI Track` or `Flutter Track`.

- Use a supplied or repository speaker portrait when it can be matched confidently.
- If no portrait is available, omit `--photo` and render the built-in session placeholder. Do not fabricate a person.
- Use `assets/reference.png` to judge visual fidelity. `assets/preview.png` is the skill's UI preview, not a card input.

## Render

Run `scripts/render-card.mjs` from this skill directory. It writes an SVG intermediate and, when `--png-out` is given, the final PNG.

Example:

```bash
node scripts/render-card.mjs \
  --photo /path/to/portrait.png \
  --name "Park Seungsu" \
  --title "After becoming a genius developer" \
  --time "11:50 – 12:20" \
  --track "AI Track" \
  --out /path/to/park-seungsu.svg \
  --png-out /path/to/park-seungsu.png
```

## Fixed design

`assets/card-template.svg` controls the canvas, event information, pale-blue geometry, portrait frame, track-pill dimensions, and all fixed spacing. The bundled AI and Flutter icons are part of that fixed design.

Only the portrait, name, session title, time, and selected track may vary. Preserve the template unless the user explicitly asks for a design change. Inspect the PNG before delivery: the selected chip must be the only chip shown, title text must be legible, and any portrait must be circularly cropped.

Deliver PNG by default; provide SVG only when requested.
