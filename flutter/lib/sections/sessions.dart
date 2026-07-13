import 'package:flutter/widgets.dart';

import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/chips.dart';
import '../widgets/coming_soon.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';

/// "Program" — the TBD session lineup panel plus the one confirmed program
/// element, the fireside chat card.
class SessionsSection extends StatelessWidget {
  const SessionsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.sessions;
    final vw = MediaQuery.sizeOf(context).width;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(
          child: SectionHeader(kicker: t.kicker, title: t.title, lead: t.lead),
        ),
        const SizedBox(height: 40),
        Reveal(
          delayMs: 80,
          child: ComingSoonPanel(
            badge: t.comingSoon.badge,
            title: t.comingSoon.title,
            body: t.comingSoon.body,
            ctaLabel: t.cta,
            onCta: () => goSpeakers(context),
          ),
        ),
        const SizedBox(height: 24),
        Reveal(delayMs: 140, child: _FiresideCard(vw: vw)),
      ],
    );
  }
}

class _FiresideCard extends StatelessWidget {
  final double vw;
  const _FiresideCard({required this.vw});

  @override
  Widget build(BuildContext context) {
    final m = context.t.sessions.mentoring;
    final pad = (vw * 0.04).clamp(28.0, 44.0);

    return PanelSurface(
      padding: EdgeInsets.all(pad),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Confirmed badge with pulsing dot.
          PulseBadge(
            label: m.badge,
            uppercase: false,
            dotSize: 7,
            letterSpacingEm: 0.08,
            horizontalPadding: 13.6,
          ),
          const SizedBox(height: 17.6),
          ConstrainedBox(
            constraints: BoxConstraints(
                maxWidth: chWidth(FKType.h3(vw), 26, weight: 800)),
            child: Text(m.title, style: heading(size: FKType.h3(vw))),
          ),
          const SizedBox(height: 14.4),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(FKType.body(vw), 60)),
            child: Text(
              m.body,
              style: sans(
                  size: FKType.body(vw), color: FKColors.textMuted, height: 1.65),
            ),
          ),
          const SizedBox(height: 22.4),
          Wrap(
            spacing: 8.8,
            runSpacing: 8.8,
            children: [for (final tag in m.tags) FkChip(label: tag)],
          ),
        ],
      ),
    );
  }
}
