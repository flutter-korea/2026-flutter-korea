import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../content/schedule.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/reveal.dart';

/// Mirrors the bilingual timetable in the Svelte app (`src/lib/components/Timetable.svelte`).
class TimetableSection extends StatelessWidget {
  const TimetableSection({super.key});

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    final langKey = I18nScope.of(context).lang.name;
    final data = schedule[langKey] as Map<String, dynamic>;
    final rows = data['rows'] as List<dynamic>;
    final trackAi = (data['trackAi'] as String?) ?? 'AI Track';
    final trackFlutter = (data['trackFlutter'] as String?) ?? 'Flutter Track';

    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth > 720;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top gradient band mirroring .timeline-band in Timetable.svelte
            Container(
              height: (constraints.maxWidth * 0.04).clamp(32.0, 56.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(FKRadii.sm),
                gradient: const LinearGradient(
                  begin: Alignment(-1.0, -0.17),
                  end: Alignment(1.0, 0.17),
                  colors: [
                    Color(0xFF1955C5),
                    Color(0xFF087DF0),
                    Color(0xFF1660CE),
                  ],
                  stops: [0.0, 0.55, 1.0],
                ),
              ),
            ),
            SizedBox(height: (vw * 0.04).clamp(28.0, 48.0)),
            Reveal(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Flutter Korea 2026',
                    style: heading(
                      size: (vw * 0.007 + 16.0).clamp(20.0, 26.4),
                      weight: 700,
                      color: FKColors.ink,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    data['title'] as String,
                    style: heading(
                      size: (vw * 0.03 + 37.6).clamp(44.0, 76.0),
                      color: const Color(0xFF147CE5),
                      weight: 800,
                      height: 1.02,
                    ),
                  ),
                  const SizedBox(height: 18),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 720),
                    child: Text(
                      data['lead'] as String,
                      style: sans(
                        size: FKType.lead(vw),
                        color: FKColors.textMuted,
                        height: 1.6,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: (vw * 0.05).clamp(36.0, 56.0)),
            if (wide)
              Reveal(
                delayMs: 80,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    children: [
                      Expanded(child: _TrackHeader(trackAi)),
                      const SizedBox(width: 48),
                      Expanded(child: _TrackHeader(trackFlutter)),
                    ],
                  ),
                ),
              ),
            for (int i = 0; i < rows.length; i++)
              Reveal(
                delayMs: (i * 20).clamp(0, 300),
                child: _ScheduleRow(
                  row: rows[i] as Map<String, dynamic>,
                  wide: wide,
                  trackAi: trackAi,
                  trackFlutter: trackFlutter,
                  isFirst: i == 0,
                ),
              ),
          ],
        );
      },
    );
  }
}

class _TrackHeader extends StatelessWidget {
  final String title;
  const _TrackHeader(this.title);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: const BoxDecoration(
        color: FKColors.paper,
        borderRadius: BorderRadius.vertical(top: Radius.circular(FKRadii.sm)),
        border: Border(
          top: BorderSide(color: FKColors.accent, width: 3),
          left: BorderSide(color: FKColors.border),
          right: BorderSide(color: FKColors.border),
          bottom: BorderSide(color: FKColors.border),
        ),
      ),
      alignment: Alignment.center,
      child: Text(
        title,
        textAlign: TextAlign.center,
        style: sans(
          color: FKColors.accent,
          size: 13.6,
          weight: 800,
          letterSpacing: 0.4,
        ),
      ),
    );
  }
}

class _ScheduleRow extends StatelessWidget {
  final Map<String, dynamic> row;
  final bool wide;
  final String trackAi;
  final String trackFlutter;
  final bool isFirst;

  const _ScheduleRow({
    required this.row,
    required this.wide,
    required this.trackAi,
    required this.trackFlutter,
    this.isFirst = false,
  });

  @override
  Widget build(BuildContext context) {
    final time = '${row['start']} – ${row['end']}';
    Widget body;
    if (row['kind'] == 'break') {
      body = Row(
        children: [
          _TimeChip(time),
          const SizedBox(width: 16),
          Text(
            row['label'] as String,
            style: sans(
              size: 13.5,
              weight: 700,
              color: FKColors.textDim,
            ),
          ),
        ],
      );
    } else if (row['shared'] != null) {
      body = _Session(
        time: time,
        session: {
          'title': row['shared'],
          'speaker': row['speaker'],
        },
        shared: true,
      );
    } else {
      final aiSession = row['ai'] as Map<String, dynamic>?;
      final flutterSession = row['flutter'] as Map<String, dynamic>?;

      final cardAi = _Session(
        time: time,
        session: aiSession ?? const {},
        trackLabel: wide ? null : trackAi,
      );
      final cardFlutter = _Session(
        time: time,
        session: flutterSession ?? const {},
        trackLabel: wide ? null : trackFlutter,
      );

      body = wide
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: cardAi),
                const SizedBox(width: 48),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.only(left: 32),
                    decoration: const BoxDecoration(
                      border: Border(left: BorderSide(color: FKColors.border)),
                    ),
                    child: cardFlutter,
                  ),
                ),
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                cardAi,
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.only(top: 24),
                  decoration: const BoxDecoration(
                    border: Border(top: BorderSide(color: FKColors.border)),
                  ),
                  child: cardFlutter,
                ),
              ],
            );
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 28),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: isFirst ? const Color(0x00000000) : FKColors.border,
          ),
        ),
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
        padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 5),
        decoration: BoxDecoration(
          color: FKColors.white,
          border: Border.all(color: FKColors.border),
          borderRadius: BorderRadius.circular(FKRadii.full),
        ),
        child: Text(
          time,
          style: mono(
            size: 11.5,
            weight: 700,
            color: const Color(0xFF3A3F48),
          ),
        ),
      );
}

class _Session extends StatelessWidget {
  final String time;
  final Map<String, dynamic> session;
  final bool shared;
  final String? trackLabel;

  const _Session({
    required this.time,
    required this.session,
    this.shared = false,
    this.trackLabel,
  });

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    final title = (session['title'] as String?) ?? '';
    if (title.isEmpty || title == 'X') {
      return const SizedBox(height: 40);
    }
    final speaker = (session['speaker'] as String?) ?? '';
    final org = (session['org'] as String?) ?? '';
    final room = session['room'] as String?;
    final isGoogle = speaker.contains('Google');
    final image = session['image'] as String?;

    Widget avatar;
    if (isGoogle) {
      avatar = Padding(
        padding: const EdgeInsets.all(7),
        child: SvgPicture.asset(
          'assets/images/google-g.svg',
          fit: BoxFit.contain,
        ),
      );
    } else if (shared) {
      avatar = Padding(
        padding: const EdgeInsets.all(7),
        child: SvgPicture.asset(
          'assets/images/flutter_seoul/flutter_seoul_logo_exact_size.svg',
          fit: BoxFit.contain,
        ),
      );
    } else if (image != null && image.isNotEmpty) {
      avatar = Image.asset(
        image,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) => Container(
          color: FKColors.paperStrong,
          alignment: Alignment.center,
          child: Text(
            speaker.isNotEmpty ? speaker[0] : 'F',
            style: sans(size: 18, weight: 700, color: FKColors.accent),
          ),
        ),
      );
    } else {
      avatar = Container(
        color: FKColors.paper,
        alignment: Alignment.center,
        child: Text(
          speaker.isNotEmpty ? speaker[0] : 'F',
          style: sans(size: 18, weight: 700, color: FKColors.accent),
        ),
      );
    }

    final content = Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: FKColors.white,
            border: Border.all(color: FKColors.border),
          ),
          clipBehavior: Clip.antiAlias,
          child: avatar,
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (trackLabel != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: FKColors.paperStrong,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: FKColors.borderStrong),
                    ),
                    child: Text(
                      trackLabel!,
                      style: sans(
                        size: 11,
                        weight: 700,
                        color: FKColors.accent,
                      ),
                    ),
                  ),
                ),
              Wrap(
                spacing: 8,
                runSpacing: 4,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(
                    speaker.isEmpty ? 'Flutter Korea 2026' : (org.isEmpty ? speaker : '$speaker / $org'),
                    style: sans(
                      color: const Color(0xFF1681E8),
                      size: 14.5,
                      weight: 700,
                      height: 1.35,
                    ),
                  ),
                  if (room != null && room.isNotEmpty)
                    Text(
                      '• $room',
                      style: sans(
                        color: FKColors.textDim,
                        size: 13,
                        weight: 500,
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                title,
                style: heading(
                  size: (vw * 0.0028 + 15.36).clamp(16.5, 21.0),
                  weight: 700,
                  color: FKColors.ink,
                  height: 1.35,
                ),
              ),
            ],
          ),
        ),
      ],
    );

    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 420) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _TimeChip(time),
              const SizedBox(height: 14),
              content,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _TimeChip(time),
            const SizedBox(width: 16),
            Expanded(child: content),
          ],
        );
      },
    );
  }
}
