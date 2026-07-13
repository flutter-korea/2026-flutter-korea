import 'package:flutter/widgets.dart';

import 'tokens.dart';

/// Fluid type scale ported from `src/app.css`. Each function mirrors a CSS
/// `clamp(min, base + factor·vw, max)` expression; `vw` is the viewport width.
abstract final class FKType {
  static const kicker = 13.0; // --fs-kicker: 0.8125rem

  /// --fs-body: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)
  static double body(double vw) => (15.36 + 0.002 * vw).clamp(16.0, 17.0);

  /// --fs-lead: clamp(1.125rem, 1.02rem + 0.5vw, 1.35rem)
  static double lead(double vw) => (16.32 + 0.005 * vw).clamp(18.0, 21.6);

  /// --fs-h3: clamp(1.25rem, 1.1rem + 0.7vw, 1.6rem)
  static double h3(double vw) => (17.6 + 0.007 * vw).clamp(20.0, 25.6);

  /// --fs-h2: clamp(1.9rem, 1.4rem + 2.2vw, 3rem)
  static double h2(double vw) => (22.4 + 0.022 * vw).clamp(30.4, 48.0);

  /// --fs-display: clamp(2.6rem, 1.3rem + 5.6vw, 5.6rem)
  static double display(double vw) => (20.8 + 0.056 * vw).clamp(41.6, 89.6);
}

const kFontSans = 'Pretendard';
const kFontMono = 'JetBrains Mono';

/// Both bundled fonts are variable fonts; weight must be driven through the
/// `wght` axis as well as [FontWeight] (which some shaping paths still read).
List<FontVariation> _wght(double w) => [FontVariation('wght', w)];

FontWeight _closestWeight(double w) =>
    FontWeight.values[((w / 100).round() - 1).clamp(0, 8)];

/// Body/sans text style. Defaults mirror the site's body text.
TextStyle sans({
  double size = 16,
  double weight = 400,
  Color color = FKColors.ink,
  double? height,
  double? letterSpacing,
}) {
  return TextStyle(
    fontFamily: kFontSans,
    fontSize: size,
    fontVariations: _wght(weight),
    fontWeight: _closestWeight(weight),
    color: color,
    height: height,
    letterSpacing: letterSpacing,
  );
}

/// Mono "code label" style — kickers, chips, small metadata.
TextStyle mono({
  double size = 12,
  double weight = 500,
  Color color = FKColors.textDim,
  double? height,
  double? letterSpacing,
}) {
  return TextStyle(
    fontFamily: kFontMono,
    fontSize: size,
    fontVariations: _wght(weight),
    fontWeight: _closestWeight(weight),
    color: color,
    height: height,
    letterSpacing: letterSpacing,
    fontFeatures: const [FontFeature.tabularFigures()],
  );
}

/// Heading style — h1–h4 share line-height 1.14, weight 800, tight tracking.
TextStyle heading({
  required double size,
  double weight = 800,
  Color color = FKColors.ink,
  double height = 1.14,
}) {
  return sans(
    size: size,
    weight: weight,
    color: color,
    height: height,
    letterSpacing: -0.02 * size,
  );
}
