import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/layout.dart';
import '../widgets/lift_card.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// "Sponsors" — sponsor card grid plus the sponsor-inquiry CTA card.
class SponsorsSection extends StatelessWidget {
  const SponsorsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.sponsors;
    final vw = MediaQuery.sizeOf(context).width;
    final pad = (vw * 0.04).clamp(28.0, 40.0);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(
          child: SectionHeader(kicker: t.kicker, title: t.title, lead: t.lead),
        ),
        const SizedBox(height: 40),
        Reveal(
          delayMs: 80,
          child: AutoGrid(
            itemCount: t.items.length,
            gap: 20,
            minCellWidth: 280,
            itemBuilder: (context, index, cellWidth) {
              final sponsor = t.items[index];
              return _SponsorCard(sponsor: sponsor, vw: vw);
            },
          ),
        ),
        const SizedBox(height: 32),
        Reveal(
          delayMs: 160,
          child: PanelSurface(
            padding: EdgeInsets.all(pad),
            borderColor: FKColors.border,
            child: Wrap(
              spacing: 24,
              runSpacing: 24,
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                ConstrainedBox(
                  constraints: BoxConstraints(
                    maxWidth: chWidth(FKType.body(vw), 52),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(t.ctaTitle, style: heading(size: FKType.h3(vw))),
                      const SizedBox(height: 9.6),
                      Text(
                        t.ctaBody,
                        style: sans(
                          size: FKType.body(vw),
                          color: FKColors.textMuted,
                          height: 1.65,
                        ),
                      ),
                    ],
                  ),
                ),
                FkButton(
                  label: t.cta,
                  onTap: () => openExternal(Links.email),
                  icon: FkIcons.mail,
                  iconSize: 16,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _SponsorCard extends StatelessWidget {
  final SponsorItem sponsor;
  final double vw;

  const _SponsorCard({required this.sponsor, required this.vw});

  @override
  Widget build(BuildContext context) {
    final pad = (vw * 0.035).clamp(24.0, 36.0);

    return LiftCard(
      padding: EdgeInsets.all(pad),
      color: FKColors.paper,
      borderColor: FKColors.border,
      hoverBorderColor: FKColors.borderStrong,
      topAccent: true,
      builder: (context, hovered) {
        return MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () => openExternal(sponsor.url),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  height: 48,
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Image.asset(
                      sponsor.logo,
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      sponsor.name,
                      style: heading(
                        size: 19.2,
                        weight: 700,
                      ),
                    ),
                    AnimatedSlide(
                      duration: FKMotion.quick,
                      curve: FKMotion.ease,
                      offset: hovered ? const Offset(0.15, -0.15) : Offset.zero,
                      child: StrokeIcon(
                        FkIcons.upRightSmall,
                        size: 15,
                        color: hovered ? FKColors.accent : FKColors.textMuted,
                        strokeWidth: 2.2,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  sponsor.description,
                  style: sans(
                    size: 14.4,
                    color: FKColors.textMuted,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
