import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'stroke_icon.dart';

/// Checklist row — top-aligned check icon + wrapping text (ticket features,
/// speaker page checklists, CFP perks).
class CheckRow extends StatelessWidget {
  final String text;
  final List<IconShape>? icon;
  final double iconSize;
  final double iconTop;
  final double gap;
  final TextStyle? style;

  const CheckRow(
    this.text, {
    super.key,
    this.icon,
    this.iconSize = 15.2,
    this.iconTop = 3,
    this.gap = 10.4,
    this.style,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(top: iconTop),
          child: StrokeIcon(
            icon ?? FkIcons.check,
            size: iconSize,
            color: FKColors.accent,
            strokeWidth: 2.2,
          ),
        ),
        SizedBox(width: gap),
        Expanded(
          child: Text(
            text,
            style: style ??
                sans(size: 15.2, color: FKColors.textMuted, height: 1.5),
          ),
        ),
      ],
    );
  }
}

/// Mono uppercase micro-label stacked over a bold value (hero facts bar,
/// timetable frame cells, speaker date chip, CFP deadline block).
class LabeledValue extends StatelessWidget {
  final String label;
  final String value;
  final TextStyle? labelStyle;
  final TextStyle? valueStyle;
  final double gap;

  const LabeledValue({
    super.key,
    required this.label,
    required this.value,
    this.labelStyle,
    this.valueStyle,
    this.gap = 6.4,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label.toUpperCase(),
          style: labelStyle ??
              mono(
                size: 11.2,
                color: FKColors.textDim,
                letterSpacing: 11.2 * 0.14,
              ),
        ),
        SizedBox(height: gap),
        Text(
          value,
          style: valueStyle ??
              sans(size: 16.8, weight: 700, color: FKColors.ink),
        ),
      ],
    );
  }
}
