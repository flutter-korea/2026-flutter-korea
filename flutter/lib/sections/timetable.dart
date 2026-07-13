import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../widgets/coming_soon.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/rows.dart';
import '../widgets/section_header.dart';

/// "Timetable" — the DATE/DOORS/PROGRAM frame strip and the TBD panel.
class TimetableSection extends StatelessWidget {
  const TimetableSection({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.t.timetable;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Reveal(
          child: SectionHeader(kicker: t.kicker, title: t.title, lead: t.lead),
        ),
        const SizedBox(height: 36),
        Reveal(delayMs: 80, child: _Frame(items: t.frame)),
        const SizedBox(height: 24),
        Reveal(
          delayMs: 160,
          child: ComingSoonPanel(
            badge: t.comingSoon.badge,
            title: t.comingSoon.title,
            body: t.comingSoon.body,
          ),
        ),
      ],
    );
  }
}

/// Hairline-separated grid (`gap: 1px` over a border-colored background).
class _Frame extends StatelessWidget {
  final List<LabelValue> items;
  const _Frame({required this.items});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(FKRadii.md),
      child: Container(
        decoration: BoxDecoration(
          color: FKColors.border, // shows through the 1px gaps as hairlines
          border: Border.all(color: FKColors.border),
          borderRadius: BorderRadius.circular(FKRadii.md),
        ),
        child: AutoGrid(
          itemCount: items.length,
          gap: 1,
          minCellWidth: 200,
          emptyCellBuilder: (_) => Container(color: FKColors.paper),
          itemBuilder: (context, i, _) => Container(
            color: FKColors.paper,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 22.4),
            child: LabeledValue(label: items[i].label, value: items[i].value),
          ),
        ),
      ),
    );
  }
}
