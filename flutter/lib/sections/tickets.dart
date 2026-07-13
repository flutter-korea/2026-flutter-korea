import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/chips.dart';
import '../widgets/layout.dart';
import '../widgets/lift_card.dart';
import '../widgets/reveal.dart';
import '../widgets/rows.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// "Tickets" — three pricing tiers with a non-interactive "coming soon"
/// purchase state, plus the platform/speaker notes.
class TicketsSection extends StatelessWidget {
  const TicketsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.tickets;
    final vw = MediaQuery.sizeOf(context).width;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SectionHeader(kicker: t.kicker, title: t.title, lead: t.lead),
              const SizedBox(height: 19.2),
              PulseBadge(label: t.statusBadge, background: FKColors.paper),
            ],
          ),
        ),
        SizedBox(height: FKLayout.afterHeader(vw)),
        // CSS: repeat(auto-fit, minmax(min(100%, 240px), 1fr))
        AutoGrid(
          itemCount: t.tiers.length,
          gap: FKLayout.gridGap(vw),
          minCellWidth: 240,
          itemBuilder: (context, i, cellWidth) => Reveal(
            delayMs: 80 + i * 80,
            child: _TierCard(
              tier: t.tiers[i],
              currency: t.currency,
              ctaTbd: t.ctaTbd,
              vw: vw,
              cardWidth: cellWidth,
            ),
          ),
        ),
        SizedBox(height: (vw * 0.03).clamp(25.6, 35.2)),
        Reveal(
          delayMs: 240,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _Note(icon: FkIcons.info, accent: true, text: t.platformNote),
              const SizedBox(height: 11.2),
              _Note(icon: FkIcons.star, accent: false, text: t.speakerNote),
            ],
          ),
        ),
      ],
    );
  }
}

class _TierCard extends StatelessWidget {
  final TicketTier tier;
  final String currency;
  final String ctaTbd;
  final double vw;
  final double cardWidth;

  const _TierCard({
    required this.tier,
    required this.currency,
    required this.ctaTbd,
    required this.vw,
    required this.cardWidth,
  });

  @override
  Widget build(BuildContext context) {
    final pad = (vw * 0.03).clamp(27.2, 35.2);
    final featured = tier.featured;
    final support = tier.support;
    // CSS container query: font-size clamp(2rem, 22cqi, 3.6rem). The card
    // width comes from the grid (a LayoutBuilder here would defeat
    // IntrinsicHeight's row-height calculation and collapse the card).
    final priceSize = (cardWidth * 0.22).clamp(32.0, 57.6).toDouble();

    return LiftCard(
      padding: EdgeInsets.all(pad),
      color: featured ? FKColors.paperStrong : FKColors.paper,
      borderColor: featured
          ? FKColors.accent
          : support
              ? FKColors.borderStrong
              : FKColors.border,
      hoverBorderColor: featured ? FKColors.accent : FKColors.borderStrong,
      lift: featured ? 6 : 4,
      hoverShadow: featured ? FKShadows.lift : FKShadows.card,
      topAccent: false,
      builder: (context, hovered) => Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FkChip(
                    label: tier.badge,
                    uppercase: true,
                    borderColor:
                        featured ? FKColors.accent : FKColors.border,
                    textColor:
                        featured ? FKColors.accent : FKColors.textMuted,
                  ),
                  const SizedBox(height: 13.6),
                  Text(tier.name, style: heading(size: FKType.h3(vw))),
                  const SizedBox(height: 22.4),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Text(
                          currency,
                          style: mono(
                              size: 18.4,
                              weight: 600,
                              color: FKColors.textMuted,
                              height: 1),
                        ),
                      ),
                      const SizedBox(width: 5.6),
                      Flexible(
                        child: Text(
                          tier.price,
                          maxLines: 1,
                          style: sans(
                            size: priceSize,
                            weight: 800,
                            color: (featured || support)
                                ? FKColors.blue700
                                : FKColors.ink,
                            height: 1,
                            letterSpacing: -0.03 * priceSize,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 22.4),
                  for (final feature in tier.features)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: CheckRow(feature),
                    ),
                  const Spacer(),
                  const SizedBox(height: 10.4),
                  _TbdCta(label: ctaTbd),
                ],
              ),
              // Star / heart ribbon.
              if (featured || support)
                Positioned(
                  top: 0,
                  right: 0,
                  child: Container(
                    width: 35.2,
                    height: 35.2,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: featured ? FKColors.accent : FKColors.white,
                      border: featured
                          ? null
                          : Border.all(color: FKColors.borderStrong),
                    ),
                    alignment: Alignment.center,
                    child: StrokeIcon(
                      featured ? FkIcons.star : FkIcons.heartFill,
                      size: 17.6,
                      color: featured ? FKColors.white : FKColors.accent,
                      strokeWidth: 2,
                    ),
                  ),
                ),
            ],
          ),
    );
  }
}

/// Purchase not open yet — non-interactive dashed "coming soon" state.
class _TbdCta extends StatelessWidget {
  final String label;
  const _TbdCta({required this.label});

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.forbidden,
      child: DashedBorder(
        color: FKColors.borderStrong,
        radius: FKRadii.full,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 13.6),
          decoration: BoxDecoration(
            color: FKColors.white,
            borderRadius: BorderRadius.circular(FKRadii.full),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              StrokeIcon(
                FkIcons.clock,
                size: 15.2,
                color: FKColors.textDim,
                strokeWidth: 1.9,
              ),
              const SizedBox(width: 8),
              Text(
                label,
                style: sans(size: 15.2, weight: 600, color: FKColors.textDim),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Note extends StatelessWidget {
  final List<IconShape> icon;
  final bool accent;
  final String text;

  const _Note({required this.icon, required this.accent, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 2.4),
          child: StrokeIcon(
            icon,
            size: 14,
            color: accent ? FKColors.accent : FKColors.textMuted,
            strokeWidth: 1.8,
          ),
        ),
        const SizedBox(width: 9.6),
        Expanded(
          child: Text(
            text,
            style: sans(size: 14, color: FKColors.textDim, height: 1.55),
          ),
        ),
      ],
    );
  }
}
