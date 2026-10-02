# Flutter Korea lanyard badge print specification

## Geometry

| Item | Size |
| --- | --- |
| Full artwork including bleed | 58.18 × 90.18 mm |
| Finished trim | 54 × 86 mm |
| Working preview | 1374 × 2126 px at 600 dpi |
| Full-artwork export | 2749 × 4260 px at 1200 dpi |
| Trim export | 2551 × 4063 px at 1200 dpi |
| Working-canvas trim crop | `(49, 49, 1325, 2077)` |
| PDF page | 164.91 × 255.618 pt |

The background artwork should extend through bleed. Important text and identity data must stay inside the safe boundary. Keep the top-center punch slot and its clearance area free of logos and names.

## Fixed copy

- Event: `Flutter Korea 2026`
- Tracks: `AI Track` and `Flutter Track`
- Slogan: `Back to Basics. Move Forward.`
- Footer: `2026.11.07 (Sat)` and `Seoul, Korea`

## Input schema

JSON input is an array of objects:

```json
[
  {
    "slug": "kaae",
    "role": "ORGANIZER",
    "korean_name": "가애KAAE",
    "english_name": "Serim Jeon",
    "affiliation": "",
    "name_offset_y": 0
  }
]
```

CSV input uses the same headers. `slug`, `role`, and `korean_name` are required. The remaining fields are optional. Keep user-provided spelling, capitalization, punctuation, and spacing unchanged.

If the English name is missing, leave it blank unless the user explicitly asks for translation or romanization. Do not guess identity data in a production badge.

## Visual validation

- Event title is below the punch zone and role text is clearly dominant.
- Name block is horizontally centered and optically centered between the role and Dash's head.
- No important text crosses the 54×86 mm trim crop or collides with artwork.
- AI and Flutter labels share one pill with equal top and bottom edges.
- Footer stays above the safe boundary.
- All batch cards use the same geometry; only role, names, affiliation, and deliberate optical offset vary.
