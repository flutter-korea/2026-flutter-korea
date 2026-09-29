# Brand asset sources

Only use brand assets from these verified sources. Do not redraw, recolor, or distort the Flutter logo or Dash.

| File | Source | Notes |
| --- | --- | --- |
| `flutter-logomark.svg` | Official Flutter brand kit: https://flutter.dev/brand → `flutter-brand-assets.zip` → `Flutter/icon_flutter/icon_flutter.svg` | Unmodified |
| `flutter-logomark-white.svg` | Same kit → `Flutter/icon_flutter/icon_flutter_wht.svg` | Unmodified; for dark surfaces |
| `dash.png` | Official Dash on https://flutter.dev/brand (`dashatar-dash.png`), which is `sites/www/content/brand/assets/dashatar-dash.png` in [flutter/website](https://github.com/flutter/website) (commit `367677b`) | Only the transparent padding was trimmed (`magick -trim`); no pixels changed |
| `flutter-seoul-mark.svg` | This repo: `static/assets/flutter-seoul/flutter-seoul-logo-exact-size.svg` (the Flutter Seoul community mark) | The community's own mark |

Downloaded 2026-09-29. Original SHA-256 values: `dashatar-dash.png` `fa018213…aa1f30b4`, `flutter-brand-assets.zip` `7dc9d966…b79`.

## Usage rules (from https://docs.flutter.dev/brand and https://flutter.dev/brand)

- The Flutter logo must be used **unaltered**: no recoloring, no reshaping. Keep at least one "F"-height of clear space around it.
- Flutter branding must not be the most prominent element. The event and community identity (Flutter Seoul mark, event name) leads.
- Community events may use "Flutter" in the event name. Wherever the Flutter logo appears, include this notice:
  "Flutter and the related logo are trademarks of Google LLC. Flutter Korea 2026 is not affiliated with or otherwise sponsored by Google LLC."
- The guidelines have no specific rule for Dash. Use only the official artwork above, unmodified, as a friendly supporting element.
