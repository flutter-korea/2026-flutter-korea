import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/coming_soon.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// "Sponsors" — TBD panel plus the sponsor-inquiry CTA card.
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
          child: ComingSoonPanel(
            badge: t.comingSoon.badge,
            title: t.comingSoon.title,
            body: t.comingSoon.body,
          ),
        ),
        const SizedBox(height: 24),
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
