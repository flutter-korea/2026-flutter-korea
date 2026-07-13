import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/layout.dart';
import '../widgets/lift_card.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';

/// "Event Overview" — the 1/2/4-column stats grid with compass-style hover.
class OverviewSection extends StatelessWidget {
  const OverviewSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.overview;
    final vw = MediaQuery.sizeOf(context).width;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(
          child: SectionHeader(kicker: t.kicker, title: t.title, lead: t.lead),
        ),
        SizedBox(height: FKLayout.afterHeader(vw)),
        // 1 → 2 → 4 columns only: with 4 cards, a 3-column state would strand
        // the last card alone on a second row.
        AutoGrid(
          itemCount: t.stats.length,
          gap: FKLayout.gridGap(vw),
          columnsFor: (_) => vw >= Bp.grid4 ? 4 : (vw >= Bp.facts ? 2 : 1),
          itemBuilder: (context, i, _) => Reveal(
            delayMs: 80 + i * 80,
            child: _StatCard(stat: t.stats[i], vw: vw),
          ),
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final OverviewStat stat;
  final double vw;
  const _StatCard({required this.stat, required this.vw});

  @override
  Widget build(BuildContext context) {
    // --fs num: clamp(2.4rem, 1.8rem + 2.6vw, 3.4rem)
    final numSize = (28.8 + 0.026 * vw).clamp(38.4, 54.4).toDouble();
    final pad = (vw * 0.03).clamp(24.0, 32.0);

    return LiftCard(
      padding: EdgeInsets.all(pad),
      builder: (context, hovered) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            stat.label.toUpperCase(),
            style: mono(
              size: 12,
              weight: 500,
              color: FKColors.textDim,
              letterSpacing: 12 * 0.14,
            ),
          ),
          const SizedBox(height: 14.4),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.end,
            spacing: 8,
            children: [
              Text(
                stat.value,
                style: sans(
                  size: numSize,
                  weight: 800,
                  color: FKColors.blue700,
                  height: 1.05,
                  letterSpacing: -0.03 * numSize,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Text(
                  stat.unit,
                  style: sans(
                    size: 15.2,
                    weight: 500,
                    color: FKColors.textMuted,
                    letterSpacing: -0.15,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14.4),
          Expanded(
            child: Align(
              alignment: Alignment.bottomLeft,
              child: Text(
                stat.note,
                style: sans(size: 14.4, color: FKColors.textMuted, height: 1.5),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
