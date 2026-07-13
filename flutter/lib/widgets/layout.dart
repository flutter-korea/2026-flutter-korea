import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';

/// `.container` — centered, max-width 1200, fluid gutter.
class FkContainer extends StatelessWidget {
  final Widget child;

  const FkContainer({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: FKLayout.container),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: FKLayout.gutter(vw)),
          child: child,
        ),
      ),
    );
  }
}

/// `.section` — fluid vertical rhythm around a contained child.
class FkSection extends StatelessWidget {
  final Widget child;

  const FkSection({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    return Padding(
      padding: EdgeInsets.symmetric(vertical: FKLayout.sectionY(vw)),
      child: FkContainer(child: child),
    );
  }
}

/// CSS `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` — as many equal
/// columns as fit (or an explicit [columnsFor] rule), rows padded with
/// empty cells, equal row heights via IntrinsicHeight.
///
/// [itemBuilder] receives the computed cell width — tickets uses it for its
/// container-query price sizing. Do NOT put a LayoutBuilder inside an item:
/// it defeats IntrinsicHeight's row-height calculation and collapses the row.
class AutoGrid extends StatelessWidget {
  final int itemCount;
  final Widget Function(BuildContext context, int index, double cellWidth)
      itemBuilder;
  final double gap;
  final double? minCellWidth;
  final int Function(double maxWidth)? columnsFor;
  final WidgetBuilder? emptyCellBuilder;

  const AutoGrid({
    super.key,
    required this.itemCount,
    required this.itemBuilder,
    required this.gap,
    this.minCellWidth,
    this.columnsFor,
    this.emptyCellBuilder,
  }) : assert(minCellWidth != null || columnsFor != null,
            'Provide minCellWidth (auto-fit) or columnsFor (explicit)');

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = (columnsFor?.call(w) ??
                ((w + gap) / (minCellWidth! + gap)).floor())
            .clamp(1, itemCount);
        final cellWidth = (w - gap * (cols - 1)) / cols;
        return Column(
          children: [
            for (var row = 0; row * cols < itemCount; row++)
              Padding(
                padding: EdgeInsets.only(top: row > 0 ? gap : 0),
                child: IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      for (var c = 0; c < cols; c++) ...[
                        if (c > 0) SizedBox(width: gap),
                        Expanded(
                          child: row * cols + c < itemCount
                              ? itemBuilder(context, row * cols + c, cellWidth)
                              : emptyCellBuilder?.call(context) ??
                                  const SizedBox(),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

/// Static elevated panel (`paperStrong` tint + hairline border + lg radius) —
/// the non-hovering sibling of `LiftCard`, shared by the CFP panel, fireside
/// card, sponsor CTA and the speaker page blocks.
class PanelSurface extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color color;
  final Color borderColor;

  const PanelSurface({
    super.key,
    required this.child,
    required this.padding,
    this.color = FKColors.paperStrong,
    this.borderColor = FKColors.borderStrong,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: padding,
      decoration: BoxDecoration(
        color: color,
        border: Border.all(color: borderColor),
        borderRadius: BorderRadius.circular(FKRadii.lg),
      ),
      child: child,
    );
  }
}

/// Two columns above a breakpoint, stacked below — the recurring
/// `grid-template-columns: Xfr Yfr` + mobile fallback pattern (hero, about
/// compasses, CFP panel, speaker page two-col).
class TwoCol extends StatelessWidget {
  final bool twoCol;
  final Widget left;
  final Widget right;
  final double gap;
  final double? stackedGap;
  final int leftFlex;
  final int rightFlex;

  /// true → equal-height columns (IntrinsicHeight + stretch);
  /// false → vertically centered row.
  final bool stretch;

  const TwoCol({
    super.key,
    required this.twoCol,
    required this.left,
    required this.right,
    required this.gap,
    this.stackedGap,
    this.leftFlex = 1,
    this.rightFlex = 1,
    this.stretch = false,
  });

  @override
  Widget build(BuildContext context) {
    if (!twoCol) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [left, SizedBox(height: stackedGap ?? gap), right],
      );
    }
    final row = Row(
      crossAxisAlignment:
          stretch ? CrossAxisAlignment.stretch : CrossAxisAlignment.center,
      children: [
        Expanded(flex: leftFlex, child: left),
        SizedBox(width: gap),
        Expanded(flex: rightFlex, child: right),
      ],
    );
    return stretch ? IntrinsicHeight(child: row) : row;
  }
}

/// Paints the CSS `border: 1px dashed` look for the ComingSoon panel.
class DashedBorder extends StatelessWidget {
  final Widget child;
  final Color color;
  final double radius;

  const DashedBorder({
    super.key,
    required this.child,
    required this.color,
    this.radius = FKRadii.lg,
  });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      foregroundPainter: _DashedRRectPainter(color, radius),
      child: child,
    );
  }
}

class _DashedRRectPainter extends CustomPainter {
  final Color color;
  final double radius;

  _DashedRRectPainter(this.color, this.radius);

  @override
  void paint(Canvas canvas, Size size) {
    final rrect = RRect.fromRectAndRadius(
      (Offset.zero & size).deflate(0.5),
      Radius.circular(radius),
    );
    final path = Path()..addRRect(rrect);
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    const dash = 4.0, gap = 4.0;
    for (final metric in path.computeMetrics()) {
      var d = 0.0;
      while (d < metric.length) {
        canvas.drawPath(metric.extractPath(d, d + dash), paint);
        d += dash + gap;
      }
    }
  }

  @override
  bool shouldRepaint(_DashedRRectPainter old) =>
      old.color != color || old.radius != radius;
}
