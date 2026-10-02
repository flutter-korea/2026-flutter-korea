---
name: create-lanyard-badge
description: Create and revise Flutter Korea 2026 lanyard name badges from role/name lists, including ORGANIZER, STAFF, SPEAKER, and similar event credentials. Use this skill whenever the user asks for 랜야드, 명찰, 네임카드, 행사 출입증, organizer/staff/speaker badges, bulk badge PNGs, or print-ready 54×86 mm badge files, even when they only say to change names or roles. Do not use it for unrelated posters or ordinary business cards.
compatibility: Requires Python 3 and Pillow. ReportLab is optional for PDF export.
---

# Create Lanyard Badge

Create consistent Flutter Korea lanyard/name badges while preserving the supplied artwork and print geometry.

## Workflow

1. Read `references/print-spec.md` before changing layout, crop, punch clearance, or export dimensions.
2. Collect the badge records. Preserve names exactly as supplied; do not invent translations unless the user explicitly asks.
3. Put records in JSON or CSV using the schema in `references/print-spec.md`.
4. Run `scripts/create_lanyard_badges.py` with the input file and an output directory.
5. Inspect the generated contact sheet. Check that role and name text remain inside the safe area, do not overlap the punch slot, mascot, track pill, slogan, or footer, and have consistent visual baselines.
6. Verify PNG pixel dimensions and DPI metadata before delivery.
7. Return direct links to the contact sheet, the 54×86 mm PNG ZIP, and the full-artwork PNG ZIP. Mention whether PDF export was available.

## Command

```bash
python3 scripts/create_lanyard_badges.py \
  --input assets/organizers.json \
  --output-dir output/lanyard-badges \
  --pdf
```

Use `--role ORGANIZER` only when every record should share one role. Per-record `role` values otherwise take precedence.

## Design rules

- Reuse the bundled background, Dash, Flutter mark, and AI Track icon. Do not redraw or substitute them when the bundled assets are appropriate.
- Keep the top punch zone clear. The compact event title belongs below the slot; the role belongs below the event title.
- Keep `AI Track` and `Flutter Track` in one equal-height pill.
- Keep the one-line slogan below the track pill.
- Center the name block in the open area between the role and Dash's head. Fit long names rather than letting them cross the safe boundary.
- Korean display names may contain deliberate spaces such as `양 우 석`; preserve those spaces exactly.
- For a single display name, leave `english_name` empty. For two-line names, use distinct display and English values.
- Use `name_offset_y` only for optical alignment after inspecting the contact sheet; positive values move the block down.

## Bundled files

- `scripts/create_lanyard_badges.py`: deterministic batch renderer and exporter.
- `assets/organizers.json`: the nine organizer records confirmed in the source conversation.
- `assets/staff_badge_background.png`: fixed badge artwork.
- `assets/flutter_dash.*`, `assets/flutter_mark.png`, `assets/ai_track_icon.*`: supplied or reconstructed artwork components.
- `references/print-spec.md`: physical size, pixel dimensions, safe-area behavior, and input schema.

When a user provides a newer guide or artwork, treat that file as the visual source of truth but keep the export sizes and validation discipline from this skill.
