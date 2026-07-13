import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'buttons.dart';
import 'chips.dart';
import 'layout.dart';
import 'section_header.dart';
import 'stroke_icon.dart';

/// Reusable "to be announced" panel for sections whose content isn't final:
/// dashed hairline card with badge / clock icon / title / body / optional CTA.
class ComingSoonPanel extends StatelessWidget {
  final String badge;
  final String title;
  final String body;
  final String? ctaLabel;
  final VoidCallback? onCta;

  const ComingSoonPanel({
    super.key,
    required this.badge,
    required this.title,
    required this.body,
    this.ctaLabel,
    this.onCta,
  });

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;

    return DashedBorder(
      color: FKColors.borderStrong,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(
          vertical: FKLayout.panelPadY(vw),
          horizontal: FKLayout.gutter(vw),
        ),
        decoration: BoxDecoration(
          color: FKColors.paper,
          borderRadius: BorderRadius.circular(FKRadii.lg),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            PulseBadge(label: badge, letterSpacingEm: 0.14),
            const SizedBox(height: 22.4),
            // Clock icon disc
            Container(
              width: 54.4,
              height: 54.4,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: FKColors.paperStrong,
                border: Border.all(color: FKColors.borderStrong),
              ),
              alignment: Alignment.center,
              child: StrokeIcon(
                FkIcons.clock,
                size: 26,
                color: FKColors.accent,
                strokeWidth: 1.6,
              ),
            ),
            const SizedBox(height: 14.4),
            Text(
              title,
              textAlign: TextAlign.center,
              style: heading(size: FKType.h3(vw)),
            ),
            const SizedBox(height: 8),
            ConstrainedBox(
              constraints: BoxConstraints(maxWidth: chWidth(FKType.body(vw), 46)),
              child: Text(
                body,
                textAlign: TextAlign.center,
                style: sans(
                  size: FKType.body(vw),
                  color: FKColors.textMuted,
                  height: 1.65,
                ),
              ),
            ),
            if (ctaLabel != null && onCta != null) ...[
              // CSS: 1.4rem margin + the flex column's 0.5rem gap.
              const SizedBox(height: 30.4),
              FkButton(
                label: ctaLabel!,
                onTap: onCta!,
                icon: FkIcons.arrowRight,
                iconSize: 16,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
