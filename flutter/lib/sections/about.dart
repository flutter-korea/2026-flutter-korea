import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/layout.dart';
import '../widgets/lift_card.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// "Why 2026" — narrative paragraphs, the two compass cards, and the closing
/// pull-quote with its gradient left border.
class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.about;
    final vw = MediaQuery.sizeOf(context).width;
    final twoCol = vw >= Bp.compass;
    final gap = (vw * 0.03).clamp(20.0, 32.0);

    final compassCards = [
      for (var i = 0; i < t.compasses.length; i++)
        _CompassCard(compass: t.compasses[i], forward: i == 1, vw: vw),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(child: SectionHeader(kicker: t.kicker, title: t.title)),
        const SizedBox(height: 44),

        // Narrative column: 3 paragraphs, first slightly lead-like.
        Reveal(
          delayMs: 80,
          child: ConstrainedBox(
            constraints:
                BoxConstraints(maxWidth: chWidth(FKType.body(vw), 64)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < t.paragraphs.length; i++) ...[
                  if (i > 0) const SizedBox(height: 22.4),
                  Text(
                    t.paragraphs[i],
                    style: i == 0
                        ? sans(
                            size: FKType.lead(vw),
                            color: FKColors.ink,
                            height: 1.6,
                          )
                        : sans(
                            size: FKType.body(vw),
                            color: FKColors.textMuted,
                            height: 1.75,
                          ),
                  ),
                ],
              ],
            ),
          ),
        ),

        SizedBox(height: (vw * 0.06).clamp(48.0, 72.0)),

        // Two paired compass cards.
        Reveal(
          delayMs: 160,
          child: TwoCol(
            twoCol: twoCol,
            gap: gap,
            stretch: true,
            left: compassCards[0],
            right: compassCards[1],
          ),
        ),

        SizedBox(height: (vw * 0.07).clamp(52.0, 80.0)),

        // Closing pull-quote. The original declares a `border-image` with a
        // flat color, which browsers reject — the 3px left border renders
        // TRANSPARENT (verified via getComputedStyle), so no border here.
        // `max-width: 52ch` sits on the blockquote, which inherits the BODY
        // font size — not the quote's own 32px.
        Reveal(
          delayMs: 120,
          child: Center(
            child: ConstrainedBox(
              // border-box: the CSS max-width includes the left padding.
              constraints:
                  BoxConstraints(maxWidth: chWidth(FKType.body(vw), 52)),
              child: Padding(
                padding: EdgeInsets.only(
                  left: (vw * 0.03).clamp(20.0, 32.0) + 3,
                  top: 8,
                  bottom: 8,
                ),
                child: Text(
                  t.closing,
                  style: sans(
                    size: _closingSize(vw),
                    weight: 700,
                    color: FKColors.ink,
                    height: 1.3,
                    letterSpacing: -0.02 * _closingSize(vw),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  /// clamp(1.35rem, 1rem + 1.6vw, 2rem)
  double _closingSize(double vw) => (16 + 0.016 * vw).clamp(21.6, 32.0);
}

class _CompassCard extends StatelessWidget {
  final CompassCard compass;
  final bool forward;
  final double vw;

  const _CompassCard(
      {required this.compass, required this.forward, required this.vw});

  @override
  Widget build(BuildContext context) {
    final pad = (vw * 0.04).clamp(28.0, 44.0);

    return LiftCard(
      padding: EdgeInsets.all(pad),
      builder: (context, hovered) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                compass.tag.toUpperCase(),
                style: mono(
                  size: 12,
                  color: FKColors.textDim,
                  letterSpacing: 12 * 0.16,
                ),
              ),
              AnimatedContainer(
                duration: FKMotion.mid,
                curve: FKMotion.ease,
                width: 46.4,
                height: 46.4,
                decoration: BoxDecoration(
                  color: forward ? FKColors.paperStrong : FKColors.paper,
                  border: Border.all(
                    color:
                        hovered ? FKColors.borderStrong : FKColors.border,
                  ),
                  borderRadius: BorderRadius.circular(FKRadii.md),
                ),
                alignment: Alignment.center,
                child: StrokeIcon(
                  forward ? FkIcons.forwardMotion : FkIcons.compassDraft,
                  size: 22.4,
                  color: FKColors.accent,
                  strokeWidth: 1.6,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Text(compass.title, style: heading(size: FKType.h3(vw))),
          const SizedBox(height: 8.8),
          Text(
            compass.subtitle,
            style: mono(
              size: 12.8,
              color: FKColors.accent,
              letterSpacing: 12.8 * 0.08,
            ),
          ),
          const SizedBox(height: 18.4),
          Text(
            compass.body,
            style: sans(
                size: FKType.body(vw), color: FKColors.textMuted, height: 1.7),
          ),
        ],
      ),
    );
  }
}
