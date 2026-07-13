import 'package:flutter/widgets.dart';

/// The original site draws its icons as inline 24×24 SVGs (thin stroke,
/// round caps — lucide style). To keep them pixel-identical, this widget
/// re-renders the same path data via a minimal SVG path parser instead of
/// substituting Material icons.
class IconShape {
  final Path path;
  final bool fill;
  final double opacity;
  final Color? color; // overrides the icon color when set

  IconShape._(this.path, {this.fill = false, this.opacity = 1, this.color});

  factory IconShape.path(String d, {bool fill = false, double opacity = 1, Color? color}) =>
      IconShape._(parseSvgPath(d), fill: fill, opacity: opacity, color: color);

  factory IconShape.circle(double cx, double cy, double r, {bool fill = false}) =>
      IconShape._(Path()..addOval(Rect.fromCircle(center: Offset(cx, cy), radius: r)),
          fill: fill);
}

class StrokeIcon extends StatelessWidget {
  final List<IconShape> shapes;
  final double size;
  final Color color;
  final double strokeWidth;

  const StrokeIcon(
    this.shapes, {
    super.key,
    required this.size,
    required this.color,
    this.strokeWidth = 2,
  });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size.square(size),
      painter: _StrokeIconPainter(shapes, color, strokeWidth),
    );
  }
}

class _StrokeIconPainter extends CustomPainter {
  final List<IconShape> shapes;
  final Color color;
  final double strokeWidth;

  _StrokeIconPainter(this.shapes, this.color, this.strokeWidth);

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 24.0;
    canvas.scale(scale);
    for (final shape in shapes) {
      final c = (shape.color ?? color).withValues(
          alpha: (shape.color ?? color).a * shape.opacity);
      final paint = Paint()
        ..color = c
        ..isAntiAlias = true;
      if (shape.fill) {
        paint.style = PaintingStyle.fill;
      } else {
        paint
          ..style = PaintingStyle.stroke
          ..strokeWidth = strokeWidth
          ..strokeCap = StrokeCap.round
          ..strokeJoin = StrokeJoin.round;
      }
      canvas.drawPath(shape.path, paint);
    }
  }

  @override
  bool shouldRepaint(_StrokeIconPainter old) =>
      old.shapes != shapes || old.color != color || old.strokeWidth != strokeWidth;
}

/// Minimal SVG path-data parser covering the commands used by the site's
/// icons: M/m, L/l, H/h, V/v, C/c, S/s, Z/z (with implicit repeated
/// coordinates after M/L).
Path parseSvgPath(String d) {
  final path = Path();
  final tokens = _tokenize(d);
  var i = 0;
  var cmd = '';
  double cx = 0, cy = 0; // current point
  double sx = 0, sy = 0; // subpath start
  double? pcx, pcy; // previous cubic control (for S/s)

  double next() => tokens[i++] as double;

  while (i < tokens.length) {
    final t = tokens[i];
    if (t is String) {
      cmd = t;
      i++;
      if (cmd == 'Z' || cmd == 'z') {
        path.close();
        cx = sx;
        cy = sy;
        pcx = pcy = null;
        continue;
      }
    } else if (cmd == 'M') {
      cmd = 'L'; // implicit lineto after moveto
    } else if (cmd == 'm') {
      cmd = 'l';
    }

    switch (cmd) {
      case 'M':
        cx = next();
        cy = next();
        sx = cx;
        sy = cy;
        path.moveTo(cx, cy);
        pcx = pcy = null;
      case 'm':
        cx += next();
        cy += next();
        sx = cx;
        sy = cy;
        path.moveTo(cx, cy);
        pcx = pcy = null;
      case 'L':
        cx = next();
        cy = next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'l':
        cx += next();
        cy += next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'H':
        cx = next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'h':
        cx += next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'V':
        cy = next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'v':
        cy += next();
        path.lineTo(cx, cy);
        pcx = pcy = null;
      case 'C':
        final x1 = next(), y1 = next(), x2 = next(), y2 = next();
        cx = next();
        cy = next();
        path.cubicTo(x1, y1, x2, y2, cx, cy);
        pcx = x2;
        pcy = y2;
      case 'c':
        final x1 = cx + next(), y1 = cy + next(), x2 = cx + next(), y2 = cy + next();
        final x = cx + next(), y = cy + next();
        path.cubicTo(x1, y1, x2, y2, x, y);
        pcx = x2;
        pcy = y2;
        cx = x;
        cy = y;
      case 'S':
        final x1 = pcx != null ? 2 * cx - pcx : cx;
        final y1 = pcy != null ? 2 * cy - pcy : cy;
        final x2 = next(), y2 = next();
        cx = next();
        cy = next();
        path.cubicTo(x1, y1, x2, y2, cx, cy);
        pcx = x2;
        pcy = y2;
      case 's':
        final x1 = pcx != null ? 2 * cx - pcx : cx;
        final y1 = pcy != null ? 2 * cy - pcy : cy;
        final x2 = cx + next(), y2 = cy + next();
        final x = cx + next(), y = cy + next();
        path.cubicTo(x1, y1, x2, y2, x, y);
        pcx = x2;
        pcy = y2;
        cx = x;
        cy = y;
      default:
        throw FormatException('Unsupported SVG path command: $cmd in "$d"');
    }
  }
  return path;
}

final _numRe = RegExp(r'[+-]?(?:\d+\.?\d*|\.\d+)');
final _cmdRe = RegExp(r'[A-Za-z]');

List<Object> _tokenize(String d) {
  final tokens = <Object>[];
  var i = 0;
  while (i < d.length) {
    final ch = d[i];
    if (_cmdRe.hasMatch(ch)) {
      tokens.add(ch);
      i++;
    } else {
      final m = _numRe.matchAsPrefix(d, i);
      if (m != null) {
        tokens.add(double.parse(m.group(0)!));
        i = m.end;
      } else {
        i++; // whitespace / comma
      }
    }
  }
  return tokens;
}

/// Shared icon path data, lifted verbatim from the Svelte components.
abstract final class FkIcons {
  static final arrowRight = [
    IconShape.path('M5 12h14'),
    IconShape.path('m13 6 6 6-6 6'),
  ];
  static final arrowDown = [
    IconShape.path('M12 5v14'),
    IconShape.path('m6 13 6 6 6-6'),
  ];
  static final arrowUp = [
    IconShape.path('M12 19V5'),
    IconShape.path('m6 11 6-6 6 6'),
  ];
  static final arrowLeftBack = [IconShape.path('M19 12H5M11 6l-6 6 6 6')];
  static final chevronDown = [IconShape.path('m6 9 6 6 6-6')];
  static final chevronRight = [IconShape.path('m9 5 7 7-7 7')];
  static final upRightSmall = [
    IconShape.path('M7 17 17 7'),
    IconShape.path('M8 7h9v9'),
  ];
  static final upRightBoxed = [IconShape.path('M7 17 17 7M9 7h8v8')];
  static final globe = [
    IconShape.circle(12, 12, 9),
    IconShape.path('M3 12h18'),
    IconShape.path('M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9Z'),
  ];
  static final menu = [IconShape.path('M4 7h16M4 12h16M4 17h16')];
  static final close = [IconShape.path('m6 6 12 12M18 6 6 18')];
  static final check = [IconShape.path('M20 6 9 17l-5-5')];
  static final checkCircle = [
    IconShape.circle(12, 12, 9),
    IconShape.path('M8.5 12.2l2.4 2.4 4.6-4.9'),
  ];
  static final clock = [
    IconShape.circle(12, 12, 9),
    IconShape.path('M12 7v5l3.5 2'),
  ];
  static final star = [
    IconShape.path('M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z'),
  ];
  static final heartFill = [
    IconShape.path(
      'M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z',
      fill: true,
    ),
  ];
  static final info = [
    IconShape.circle(12, 12, 9),
    IconShape.path('M12 11v5'),
    IconShape.path('M12 8h.01'),
  ];
  static final mail = [IconShape.path('M4 6h16v12H4zM4 7l8 6 8-6')];
  static final compassDraft = [
    IconShape.circle(12, 12, 9),
    IconShape.path('M12 3v3M12 18v3M3 12h3M18 12h3'),
    IconShape.path('m14.5 9.5-2.5 6-2.5-6'),
    IconShape.circle(12, 12, 1.1, fill: true),
  ];
  static final forwardMotion = [
    IconShape.path('M7 17 17 7'),
    IconShape.path('M9 7h8v8'),
    IconShape.path('M3 20h4M3 15h2', opacity: 0.55),
  ];

  /// Flutter origami-fold logo mark (two filled facets).
  static final flutterMark = [
    IconShape.path('M13.9 3 6.4 10.5l2.4 2.4L18.7 3H13.9Z',
        fill: true, color: const Color(0xFFFFFFFF)),
    IconShape.path('M13.9 11.3 9.7 15.5l4.2 4.2h4.8l-4.2-4.2 4.2-4.2h-4.8Z',
        fill: true, color: const Color(0xFFBFE3FC)),
  ];
}
