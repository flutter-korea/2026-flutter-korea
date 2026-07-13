import 'package:flutter/widgets.dart';

/// Design tokens ported from the SvelteKit site's `src/app.css`.
///
/// Theme: official-Flutter-brand — white canvas, hairline-bordered paper-blue
/// cards, and ONE bold diagonal blue→violet gradient reserved for the hero
/// band and the announcement bar. Everywhere else is flat.
abstract final class FKColors {
  // Brand palette
  static const blue900 = Color(0xFF06377A); // deep navy — strong hover
  static const blue700 = Color(0xFF0553B1); // primary brand blue
  static const blue500 = Color(0xFF0A6DF2); // mid blue — gradient stop
  static const violet = Color(0xFF7C4DFF); // gradient partner, hero band only

  // Surfaces
  static const white = Color(0xFFFFFFFF);
  static const paper = Color(0xFFEEF4FD); // light blue-tinted card surface
  static const paperStrong = Color(0xFFE2ECFC); // deeper tint — hover/featured
  static const border = Color(0xFFDFE6F2);
  static const borderStrong = Color(0xFFB7CDEF);

  // Text
  static const ink = Color(0xFF0B1220);
  static const textMuted = Color(0xFF51606F);
  static const textDim = Color(0xFF6B7B8C);

  // Accents
  static const accent = blue700;
  static const glow = Color(0x290553B1); // rgba(5,83,177,.16)

  // Accent used on top of the hero gradient (light sky headline line).
  static const onGradientAccent = Color(0xFFBFE3FC);

  // Live "happening now" pulse (countdown).
  static const liveGreen = Color(0xFF4ADE80);
}

/// The ONE gradient on the whole site — hero band + announcement strip only.
/// CSS: linear-gradient(115deg, #0a3f96 0%, #0a6df2 48%, #7c4dff 100%)
const kHeroGradient = LinearGradient(
  // 115deg in CSS ⇒ direction vector (sin115°, -cos115°) ≈ (0.906, 0.423).
  begin: Alignment(-0.906, -0.423),
  end: Alignment(0.906, 0.423),
  colors: [Color(0xFF0A3F96), FKColors.blue500, FKColors.violet],
  stops: [0.0, 0.48, 1.0],
);

abstract final class FKRadii {
  static const sm = 8.0;
  static const md = 14.0;
  static const lg = 20.0;
  static const full = 999.0;
}

abstract final class FKShadows {
  // Docs-style: mostly flat with a hairline border; shadows small and crisp.
  static const card = [
    BoxShadow(
      color: Color(0x290B1220), // rgba(11,18,32,.16)
      offset: Offset(0, 10),
      blurRadius: 24,
      spreadRadius: -14,
    ),
  ];
  static const lift = [
    BoxShadow(
      color: Color(0x380B1220), // rgba(11,18,32,.22)
      offset: Offset(0, 16),
      blurRadius: 32,
      spreadRadius: -16,
    ),
  ];
}

abstract final class FKMotion {
  /// cubic-bezier(0.22, 1, 0.36, 1)
  static const ease = Cubic(0.22, 1, 0.36, 1);
  static const dur = Duration(milliseconds: 600);
  static const quick = Duration(milliseconds: 200);
  static const mid = Duration(milliseconds: 300);
  static const bar = Duration(milliseconds: 350); // header/announce `top`
}

abstract final class FKLayout {
  static const container = 1200.0;
  static const headerH = 68.0;
  static const announceH = 40.0;

  /// --gutter: clamp(1.25rem, 5vw, 3rem)
  static double gutter(double vw) => (vw * 0.05).clamp(20.0, 48.0);

  /// --section-y: clamp(4rem, 9vw, 7.5rem)
  static double sectionY(double vw) => (vw * 0.09).clamp(64.0, 120.0);

  /// Card-grid gap: clamp(1rem, 2.4vw, 1.5rem) (overview/tickets grids)
  static double gridGap(double vw) => (vw * 0.024).clamp(16.0, 24.0);

  /// Section-header → grid spacing: clamp(2.5rem, 5vw, 3.5rem)
  static double afterHeader(double vw) => (vw * 0.05).clamp(40.0, 56.0);

  /// Large-panel vertical padding: clamp(2.5rem, 6vw, 4rem)
  static double panelPadY(double vw) => (vw * 0.06).clamp(40.0, 64.0);
}

/// Viewport breakpoints used by the original stylesheet's media queries.
abstract final class Bp {
  static const sm = 560.0; // footer 3-col
  static const facts = 640.0; // hero facts wrap / overview 2-col
  static const compass = 720.0; // about compasses 1-col below
  static const twoCol = 760.0; // speaker page 2-col
  static const cfp = 860.0; // CFP panel 2-col
  static const footerWide = 880.0;
  static const nav = 900.0; // desktop nav + hero 2-col
  static const grid4 = 1024.0; // overview 4-col
}
