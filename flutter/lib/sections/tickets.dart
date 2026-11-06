import 'package:flutter/widgets.dart';
import '../i18n/i18n.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';

class TicketsSection extends StatelessWidget {
  const TicketsSection({super.key});
  @override
  Widget build(BuildContext context) {
    final t = context.t.tickets;
    final isKo = I18nScope.of(context).lang.name == 'ko';
    return Reveal(
      child: SectionHeader(
        kicker: t.kicker,
        title: t.title,
        lead: isKo
            ? '판매가 종료되었습니다. 감사합니다.'
            : 'Ticket sales have ended. Thank you.',
      ),
    );
  }
}
