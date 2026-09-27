import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../content/schedule.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';

/// Mirrors the bilingual timetable in the Svelte app.
class TimetableSection extends StatelessWidget {
  const TimetableSection({super.key});

  @override
  Widget build(BuildContext context) {
    final data =
        schedule[I18nScope.of(context).lang.name] as Map<String, dynamic>;
    final rows = data['rows'] as List<dynamic>;
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth > 720;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(height: 40, color: FKColors.blue700),
            const SizedBox(height: 40),
            const Text(
              'Flutter Korea 2026',
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
            ),
            Text(
              data['title'] as String,
              style: const TextStyle(
                fontSize: 48,
                color: FKColors.blue700,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 24),
            Text(data['lead'] as String),
            const SizedBox(height: 48),
            Row(
              children: [
                Expanded(child: _trackHeader('AI Track')),
                Expanded(child: _trackHeader('Flutter Track')),
              ],
            ),
            for (final item in rows)
              _ScheduleRow(row: item as Map<String, dynamic>, wide: wide),
          ],
        );
      },
    );
  }
}

Widget _trackHeader(String title) => Container(
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(border: Border.all(color: FKColors.border)),
  child: Text(
    title,
    textAlign: TextAlign.center,
    style: const TextStyle(
      color: FKColors.blue700,
      fontWeight: FontWeight.w800,
    ),
  ),
);

class _ScheduleRow extends StatelessWidget {
  final Map<String, dynamic> row;
  final bool wide;
  const _ScheduleRow({required this.row, required this.wide});

  @override
  Widget build(BuildContext context) {
    final time = '${row['start']} – ${row['end']}';
    Widget body;
    if (row['kind'] == 'break') {
      body = Row(
        children: [
          _TimeChip(time),
          const SizedBox(width: 16),
          Text(row['label'] as String),
        ],
      );
    } else if (row['shared'] != null) {
      body = _Session(
        time: time,
        session: {'title': row['shared'], 'speaker': row['speaker']},
        shared: true,
      );
    } else {
      final cards = [
        for (final key in ['ai', 'flutter'])
          _Session(time: time, session: row[key] as Map<String, dynamic>),
      ];
      body = wide
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: cards[0]),
                const SizedBox(width: 48),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.only(left: 32),
                    decoration: const BoxDecoration(
                      border: Border(left: BorderSide(color: FKColors.border)),
                    ),
                    child: cards[1],
                  ),
                ),
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [cards[0], const SizedBox(height: 32), cards[1]],
            );
    }
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 35),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: FKColors.border)),
      ),
      child: body,
    );
  }
}

class _TimeChip extends StatelessWidget {
  final String time;
  const _TimeChip(this.time);

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 8),
    decoration: BoxDecoration(
      border: Border.all(color: FKColors.border),
      borderRadius: BorderRadius.circular(999),
    ),
    child: Text(
      time,
      style: const TextStyle(
        fontFamily: 'JetBrains Mono',
        fontSize: 12,
        fontWeight: FontWeight.w700,
      ),
    ),
  );
}

class _Session extends StatelessWidget {
  final String time;
  final Map<String, dynamic> session;
  final bool shared;
  const _Session({
    required this.time,
    required this.session,
    this.shared = false,
  });

  @override
  Widget build(BuildContext context) {
    final speaker = session['speaker'] as String? ?? '';
    final google = speaker.contains('Google');
    final image = session['image'] as String?;
    final Widget profile;
    if (google || shared) {
      profile = Padding(
        padding: const EdgeInsets.all(5),
        child: SvgPicture.asset(
          google
              ? 'assets/images/google-g.svg'
              : 'assets/images/flutter_seoul/flutter_seoul_logo_exact_size.svg',
          fit: BoxFit.contain,
        ),
      );
    } else if (image != null) {
      profile = Image.asset(
        image,
        fit: BoxFit.cover,
      );
    } else {
      profile = const SizedBox.expand();
    }
    final content = Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: FKColors.border),
          ),
          child: ClipOval(child: profile),
        ),
        const SizedBox(width: 20),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Wrap(
                spacing: 12,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(
                    speaker.isEmpty ? 'Flutter Korea 2026' : speaker,
                    style: const TextStyle(
                      color: FKColors.blue700,
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 9),
              Text(
                session['title'] as String,
                style: const TextStyle(
                  fontSize: 21,
                  height: 1.35,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ],
    );
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 360) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [_TimeChip(time), const SizedBox(height: 16), content],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _TimeChip(time),
            const SizedBox(width: 20),
            Expanded(child: content),
          ],
        );
      },
    );
  }
}
