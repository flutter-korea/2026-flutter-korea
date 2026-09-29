---
name: create-speaker-card
description: "Create consistent Flutter Korea 4:5 speaker cards from a fixed SVG template. Use when the user asks to create a speaker card; do not use generative image layout for the card chrome."
---

# Flutter Korea Speaker Card

Create 4:5 speaker cards with a deterministic SVG layout. Keep the reference file unchanged.

## Workflow

1. Read `artifact-template.json` and use `assets/reference.png` only as the visual reference.
2. Use `scripts/render-card.mjs` with a supplied speaker photo when available. It writes an SVG intermediate from `assets/card-template.svg`; pass `--png-out` to export the final 1080×1350 PNG. Omitting `--photo` creates a session card with the fixed track badge in the portrait frame.
3. Supply the exact speaker name, talk title, time, and one track (`AI Track` or `Flutter Track`) from the user's sources. Do not invent factual claims or portraits.
4. For a missing portrait, create a session card without `--photo`; do not invent a portrait or use image generation to redraw the card layout.
5. Inspect the rendered card. Confirm that the chosen track chip is present, the other chip is absent, static elements have not changed, all dynamic text is legible, and the portrait is circularly cropped.

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

## Fidelity

`assets/card-template.svg` fixes the 1080×1350 canvas, event title, date, venue, pale-blue geometry, circular portrait frame, clock, track-pill dimensions, icon dimensions, and all spacing. Never redraw, resize, omit, or regenerate these elements.

Only these values vary: speaker photo, name, talk title, time, and active track. User instructions control explicit deviations; otherwise, the fixed template controls the layout and formatting. Deliver PNG files unless the user explicitly asks for SVG.
