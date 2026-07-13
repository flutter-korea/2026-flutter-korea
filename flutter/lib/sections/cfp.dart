import 'package:flutter/widgets.dart';

import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/rows.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// "Call for Speakers" — elevated panel with the perks list and the action
/// card routing to the /speakers overview page.
class CfpSection extends StatelessWidget {
  const CfpSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.cfp;
    final vw = MediaQuery.sizeOf(context).width;
    final twoCol = vw >= Bp.cfp;
    final pad = (vw * 0.05).clamp(28.0, 60.0);
    final gap = (vw * 0.05).clamp(32.0, 56.0);

    final copy = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Reveal(
          delayMs: 80,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Kicker(t.kicker),
              const SizedBox(height: 14.4),
              ConstrainedBox(
                constraints: BoxConstraints(
                    maxWidth: chWidth(FKType.h2(vw), 18, weight: 800)),
                child: Text(t.title, style: heading(size: FKType.h2(vw))),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        Reveal(
          delayMs: 160,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(FKType.lead(vw), 52)),
            child: Text(
              t.body,
              style: sans(
                  size: FKType.lead(vw), color: FKColors.textMuted, height: 1.55),
            ),
          ),
        ),
        const SizedBox(height: 28),
        Reveal(
          delayMs: 240,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (final perk in t.perks)
                Padding(
                  padding: const EdgeInsets.only(bottom: 13.6),
                  child: CheckRow(
                    perk,
                    icon: FkIcons.checkCircle,
                    iconSize: 16.8,
                    iconTop: 1,
                    gap: 12,
                    style: sans(
                        size: FKType.body(vw),
                        weight: 500,
                        color: FKColors.ink,
                        height: 1.5),
                  ),
                ),
            ],
          ),
        ),
      ],
    );

    final action = Reveal(
      delayMs: 200,
      child: Container(
        padding: EdgeInsets.all((vw * 0.03).clamp(24.0, 32.0)),
        decoration: BoxDecoration(
          color: FKColors.white,
          border: Border.all(color: FKColors.border),
          borderRadius: BorderRadius.circular(FKRadii.md),
        ),
        child: Column(
          crossAxisAlignment:
              twoCol ? CrossAxisAlignment.stretch : CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            LabeledValue(
              label: t.deadlineLabel,
              value: t.deadline,
              labelStyle: mono(
                size: 11.2,
                weight: 500,
                color: FKColors.textDim,
                letterSpacing: 11.2 * 0.16,
              ),
              valueStyle: sans(
                  size: 16.8, weight: 700, color: FKColors.ink, height: 1.35),
            ),
            const SizedBox(height: 18.4),
            FkButton(
              label: t.cta,
              onTap: () => goSpeakers(context),
              icon: FkIcons.arrowRight,
              iconSize: 18.4,
              iconSlides: true,
              fontSize: 16.8,
              expand: true,
              padding:
                  const EdgeInsets.symmetric(horizontal: 24, vertical: 16.8),
            ),
            const SizedBox(height: 18.4),
            Text(
              t.ctaNote,
              textAlign: twoCol ? TextAlign.center : TextAlign.left,
              style: sans(size: 13.6, color: FKColors.textDim),
            ),
          ],
        ),
      ),
    );

    return Reveal(
      child: PanelSurface(
        padding: EdgeInsets.all(pad),
        child: TwoCol(
          twoCol: twoCol,
          gap: gap,
          leftFlex: 135,
          rightFlex: 100,
          left: copy,
          right: action,
        ),
      ),
    );
  }
}
