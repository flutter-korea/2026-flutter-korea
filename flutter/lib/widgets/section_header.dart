import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';

/// CSS `ch`-based max-widths. Pretendard's '0' advance was measured in the
/// original site (Chrome, variable font): 0.5957em at weight 400, 0.6602 at
/// 700, 0.6821 at 800 — CSS resolves `ch` against the styled element, so
/// bold headings need the wider factor.
double chWidth(double fontSize, double ch, {double weight = 400}) {
  final factor = weight >= 800
      ? 0.6821
      : weight >= 700
          ? 0.6602
          : 0.5957;
  return fontSize * factor * ch;
}

/// `.kicker` — mono "code label" with a 2px accent dash before it.
class Kicker extends StatelessWidget {
  final String text;
  const Kicker(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 25.6,
          height: 2,
          decoration: BoxDecoration(
            color: FKColors.accent,
            borderRadius: BorderRadius.circular(1),
          ),
        ),
        const SizedBox(width: 8.8),
        Flexible(
          child: Text(
            text.toUpperCase(),
            style: mono(
              size: FKType.kicker,
              weight: 600,
              color: FKColors.accent,
              letterSpacing: FKType.kicker * 0.14,
            ),
          ),
        ),
      ],
    );
  }
}

/// Shared section heading pattern: kicker → section-title → section-lead.
class SectionHeader extends StatelessWidget {
  final String kicker;
  final String title;
  final String? lead;

  const SectionHeader({
    super.key,
    required this.kicker,
    required this.title,
    this.lead,
  });

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    final leadSize = FKType.lead(vw);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Kicker(kicker),
        const SizedBox(height: 14.4),
        Text(title, style: heading(size: FKType.h2(vw))),
        if (lead != null) ...[
          const SizedBox(height: 17.6),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(leadSize, 46)),
            child: Text(
              lead!,
              style: sans(size: leadSize, color: FKColors.textMuted, height: 1.5),
            ),
          ),
        ],
      ],
    );
  }
}
