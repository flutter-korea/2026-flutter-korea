import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_korea_2026/content/content.dart';
import 'package:flutter_korea_2026/theme/typography.dart';
import 'package:flutter_korea_2026/widgets/stroke_icon.dart';

void main() {
  test('every shared icon parses without throwing', () {
    final all = [
      FkIcons.arrowRight,
      FkIcons.arrowDown,
      FkIcons.arrowUp,
      FkIcons.arrowLeftBack,
      FkIcons.chevronDown,
      FkIcons.chevronRight,
      FkIcons.upRightSmall,
      FkIcons.upRightBoxed,
      FkIcons.globe,
      FkIcons.menu,
      FkIcons.close,
      FkIcons.check,
      FkIcons.checkCircle,
      FkIcons.clock,
      FkIcons.star,
      FkIcons.heartFill,
      FkIcons.info,
      FkIcons.mail,
      FkIcons.compassDraft,
      FkIcons.forwardMotion,
      FkIcons.flutterMark,
    ];
    for (final icon in all) {
      expect(icon, isNotEmpty);
      for (final shape in icon) {
        // Straight axis-aligned lines have a degenerate bounds rect, so
        // measure contour length instead.
        final length = shape.path
            .computeMetrics()
            .fold<double>(0, (sum, m) => sum + m.length);
        expect(length, greaterThan(0),
            reason: 'shape should produce non-empty geometry');
      }
    }
  });

  test('svg path parser handles curves, S-commands and tiny dots', () {
    // Globe meridian (c/s commands) and the info "dot" (h.01).
    expect(() => parseSvgPath('M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9'), returnsNormally);
    expect(() => parseSvgPath('M12 8h.01'), returnsNormally);
  });

  test('fluid type scale clamps at both ends', () {
    expect(FKType.display(320), 41.6);
    expect(FKType.display(2000), 89.6);
    expect(FKType.h2(320), 30.4);
    expect(FKType.h2(2000), 48.0);
    expect(FKType.body(320), 16.0);
    expect(FKType.body(2000), 17.0);
  });

  test('ko/en content mirrors structurally', () {
    expect(koContent.nav.links.length, enContent.nav.links.length);
    expect(koContent.hero.facts.length, enContent.hero.facts.length);
    expect(koContent.overview.stats.length, enContent.overview.stats.length);
    expect(koContent.tickets.tiers.length, enContent.tickets.tiers.length);
    expect(koContent.speakerPage.categories.length,
        enContent.speakerPage.categories.length);
    for (var i = 0; i < koContent.nav.links.length; i++) {
      expect(koContent.nav.links[i].id, enContent.nav.links[i].id);
    }
  });
}
