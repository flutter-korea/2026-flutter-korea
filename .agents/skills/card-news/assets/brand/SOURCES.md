# Brand asset sources

Only use brand assets from these verified sources. Do not redraw, recolor, or distort the Flutter logo or Dash.

| File | Source | Notes |
| --- | --- | --- |
| `flutter-logomark.svg` | Official Flutter brand kit: https://flutter.dev/brand → `flutter-brand-assets.zip` → `Flutter/icon_flutter/icon_flutter.svg` | Unmodified |
| `flutter-logomark-white.svg` | Same kit → `Flutter/icon_flutter/icon_flutter_wht.svg` | Unmodified; for dark surfaces |
| `dash.png` | Official Dash on https://flutter.dev/brand (`dashatar-dash.png`), which is `sites/www/content/brand/assets/dashatar-dash.png` in [flutter/website](https://github.com/flutter/website) (commit `367677b`) | Only the transparent padding was trimmed (`magick -trim`); no pixels changed |
| `dart-logomark.svg` | Official Dart brand kit: https://dart.dev/brand → `dart_brand_guidelines_assets.zip` → `Logomark (Icon)/icon_dart.svg` | Unmodified |
| `dash-cheer.png` | [flutter/website](https://github.com/flutter/website) `sites/docs/web/assets/images/dash/dash-contribute.png` (commit `afe82c4`) | Transparent padding trimmed only. CC BY 3.0 |
| `dash-team.png` | flutter/website `sites/docs/web/assets/images/dash/Dashatars.png` (commit `afe82c4`) | Trimmed and scaled down to 1600px wide; artwork unchanged. CC BY 3.0 |
| `dash-plush.png` | flutter/website `sites/docs/web/assets/images/dash/BigDashAndLittleDash.png` (commit `afe82c4`) | Unmodified photo. CC BY 3.0 |
| `flutter-seoul-mark.svg` | This repo: `static/assets/flutter-seoul/flutter-seoul-logo-exact-size.svg` (the Flutter Seoul community mark) | The community's own mark |

Downloaded 2026-09-29. flutter/website content is licensed under [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/)
("Except as otherwise noted…", repository LICENSE). Attribution: "Dash artwork © the Flutter project authors, CC BY 3.0".
Dart kit SHA-256 `d0494d71…e2a42b73`; dash-contribute `f67afa9f…f7c1e67a`; Dashatars `546abfcf…5849825a`; BigDashAndLittleDash `a2f7ed64…08afb0b6`. Original SHA-256 values: `dashatar-dash.png` `fa018213…aa1f30b4`, `flutter-brand-assets.zip` `7dc9d966…b79`.

## Usage rules (from https://docs.flutter.dev/brand and https://flutter.dev/brand)

- The Flutter logo must be used **unaltered**: no recoloring, no reshaping. Keep at least one "F"-height of clear space around it.
- Flutter branding must not be the most prominent element. The event and community identity (Flutter Seoul mark, event name) leads.
- Community events may use "Flutter" in the event name. Wherever the Flutter logo appears, include this notice:
  "Flutter and the related logo are trademarks of Google LLC. Flutter Korea 2026 is not affiliated with or otherwise sponsored by Google LLC."
- **Dart** (https://dart.dev/brand): never alter or distort the logo. Where it appears, include
  "Dart and the related logo are trademarks of Google LLC. We are not endorsed by or affiliated with Google LLC."
- Notices and attributions are **never drawn on the card images**; they go in the post caption or on the event website.
- The guidelines have no specific rule for Dash. Use only the official artwork above, unmodified, as a friendly supporting element.
