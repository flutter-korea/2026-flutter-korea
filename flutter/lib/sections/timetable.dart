import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../content/schedule.dart';
import '../content/session_slides.dart';
import '../nav.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';

/// Mirrors the bilingual timetable in the Svelte app (`src/lib/components/Timetable.svelte`).
class TimetableSection extends StatefulWidget {
  const TimetableSection({super.key});
  @override
  State<TimetableSection> createState() => _TimetableSectionState();
}

class _TimetableSectionState extends State<TimetableSection> {
  String selectedTrack = 'all';
  TimeOfDay? testTime;
  late final Timer _clock;
  @override
  void initState() {
    super.initState();
    _clock = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _clock.cancel();
    super.dispose();
  }

  String currentTitle(List<dynamic> rows, String track, bool isKo) {
    final kst = testTime == null
        ? DateTime.now().toUtc().add(const Duration(hours: 9))
        : DateTime.utc(2026, 11, 7, testTime!.hour, testTime!.minute);
    final fallback = isKo ? '진행 중인 일정 없음' : 'No session in progress';
    if (kst.year != 2026 || kst.month != 11 || kst.day != 7) return fallback;
    final time =
        '${kst.hour.toString().padLeft(2, '0')}:${kst.minute.toString().padLeft(2, '0')}';
    for (final item in rows) {
      final row = item as Map<String, dynamic>;
      if ((row['start'] as String).compareTo(time) <= 0 &&
          time.compareTo(row['end'] as String) < 0) {
        if (track == 'ai' &&
            (time.compareTo('11:50') < 0 || time.compareTo('16:50') >= 0)) {
          return fallback;
        }
        if (row['kind'] == 'break') return row['label'] as String;
        if (row['shared'] != null) return row['shared'] as String;
        final title =
            (row[track] as Map<String, dynamic>?)?['title'] as String?;
        return title == null || title.isEmpty || title == 'X'
            ? fallback
            : title;
      }
    }
    return fallback;
  }

  Map<String, dynamic>? currentDetails(
    List<dynamic> rows,
    String track,
    bool isKo,
  ) {
    if (currentTitle(rows, track, isKo) ==
        (isKo ? '진행 중인 일정 없음' : 'No session in progress')) {
      return null;
    }
    final kst = testTime == null
        ? DateTime.now().toUtc().add(const Duration(hours: 9))
        : DateTime.utc(2026, 11, 7, testTime!.hour, testTime!.minute);
    final time =
        '${kst.hour.toString().padLeft(2, '0')}:${kst.minute.toString().padLeft(2, '0')}';
    for (final item in rows) {
      final row = item as Map<String, dynamic>;
      if ((row['start'] as String).compareTo(time) <= 0 &&
          time.compareTo(row['end'] as String) < 0) {
        if (row['kind'] == 'break') return null;
        final session = row['shared'] != null
            ? row
            : row[track] as Map<String, dynamic>?;
        if (session == null) return null;
        final speaker = session['speaker'] as String? ?? '';
        return {
          ...session,
          'image':
              session['image'] ??
              (speaker.contains('Craig Labenz')
                  ? 'assets/images/speaker/craig-labenz.jpg'
                  : null),
          'room':
              session['room'] ??
              (track == 'flutter'
                  ? (isKo ? '300/301/400/401호' : 'Rooms 300/301/400/401')
                  : (isKo ? '100/101호' : 'Rooms 100/101')),
        };
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    final langKey = I18nScope.of(context).lang.name;
    final data = schedule[langKey] as Map<String, dynamic>;
    final rows = data['rows'] as List<dynamic>;
    final visibleRows = selectedTrack == 'ai'
        ? rows.where((row) {
            final shared = (row as Map<String, dynamic>)['shared'] as String?;
            return shared == null ||
                shared.toLowerCase().contains('lunch') ||
                shared.contains('런치');
          }).toList()
        : rows;
    final trackAi = (data['trackAi'] as String?) ?? 'AI Track';
    final trackFlutter = (data['trackFlutter'] as String?) ?? 'Flutter Track';

    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth > 720;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: (vw * 0.015).clamp(12.0, 24.0)),
            Reveal(
              child: SectionHeader(
                kicker: 'Timetable',
                title: data['title'] as String,
                lead: data['lead'] as String,
              ),
            ),
            SizedBox(height: (vw * 0.05).clamp(36.0, 56.0)),
            if (kDebugMode) ...[
              Wrap(
                spacing: 12,
                runSpacing: 8,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(
                    langKey == 'ko'
                        ? '타임테이블 시간 테스트 (11월 7일 KST)'
                        : 'Timetable time test (Nov 7 KST)',
                  ),
                  OutlinedButton(
                    onPressed: () async {
                      final value = await showTimePicker(
                        context: context,
                        initialTime:
                            testTime ?? const TimeOfDay(hour: 11, minute: 0),
                      );
                      if (value != null && mounted) {
                        setState(() => testTime = value);
                      }
                    },
                    child: Text(
                      testTime == null
                          ? (langKey == 'ko' ? '시간 선택' : 'Choose time')
                          : '${testTime!.hour.toString().padLeft(2, '0')}:${testTime!.minute.toString().padLeft(2, '0')}',
                    ),
                  ),
                  TextButton(
                    onPressed: () => setState(() => testTime = null),
                    child: Text(
                      langKey == 'ko' ? '현재 시간으로' : 'Use current time',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
            ],
            Row(
              children: [
                Text(
                  'NOW ON',
                  style: sans(size: 18, weight: 800, color: FKColors.ink),
                ),
                const SizedBox(width: 12),
                Flexible(
                  child: Text(
                    langKey == 'ko'
                        ? 'KST · 현재 진행 중인 일정'
                        : 'KST · Happening now',
                    style: sans(size: 12, color: FKColors.textMuted),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: _LiveCard(
                    track: 'Flutter Track',
                    title: currentTitle(rows, 'flutter', langKey == 'ko'),
                    details: currentDetails(rows, 'flutter', langKey == 'ko'),
                    isKo: langKey == 'ko',
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _LiveCard(
                    track: 'AI Track',
                    title: currentTitle(rows, 'ai', langKey == 'ko'),
                    details: currentDetails(rows, 'ai', langKey == 'ko'),
                    isKo: langKey == 'ko',
                  ),
                ),
              ],
            ),
            const SizedBox(height: 36),
            Text(
              langKey == 'ko' ? '트랙 선택' : 'Choose track',
              style: sans(size: 14, weight: 700),
            ),
            const SizedBox(height: 10),
            RadioGroup<String>(
              groupValue: selectedTrack,
              onChanged: (value) {
                if (value != null) setState(() => selectedTrack = value);
              },
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  _TrackOption(
                    value: 'all',
                    label: langKey == 'ko' ? '전체' : 'All',
                    selected: selectedTrack == 'all',
                  ),
                  _TrackOption(
                    value: 'flutter',
                    label: 'Flutter Track',
                    selected: selectedTrack == 'flutter',
                  ),
                  _TrackOption(
                    value: 'ai',
                    label: 'AI Track',
                    selected: selectedTrack == 'ai',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Reveal(
              delayMs: 80,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Row(
                  children: [
                    SizedBox(
                      width: wide ? 120 : 84,
                      child: _TrackHeader(langKey == 'ko' ? '시간' : 'Time'),
                    ),
                    if (selectedTrack != 'ai')
                      Expanded(child: _TrackHeader(trackFlutter)),
                    if (selectedTrack != 'flutter')
                      Expanded(child: _TrackHeader(trackAi)),
                  ],
                ),
              ),
            ),
            for (int i = 0; i < visibleRows.length; i++)
              Reveal(
                delayMs: (i * 20).clamp(0, 300),
                child: _ScheduleRow(
                  row: visibleRows[i] as Map<String, dynamic>,
                  wide: wide,
                  trackAi: trackAi,
                  trackFlutter: trackFlutter,
                  isFirst: i == 0,
                  selectedTrack: selectedTrack,
                  testTime: testTime,
                ),
              ),
          ],
        );
      },
    );
  }
}

class _LiveCard extends StatelessWidget {
  final String track;
  final String title;
  final bool isKo;
  final Map<String, dynamic>? details;
  const _LiveCard({
    required this.track,
    required this.title,
    required this.isKo,
    this.details,
  });
  @override
  Widget build(BuildContext context) {
    final live = title != (isKo ? '진행 중인 일정 없음' : 'No session in progress');
    return Container(
      constraints: const BoxConstraints(minHeight: 125),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F8FF),
        border: Border.all(color: const Color(0xFFD6E4F6)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 6,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Text(
                track,
                style: sans(
                  size: 13,
                  weight: 800,
                  color: const Color(0xFF075FC5),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: live
                      ? const Color(0xFFFFEBEB)
                      : const Color(0xFFE8EDF3),
                  borderRadius: BorderRadius.circular(99),
                ),
                child: Text(
                  live ? '● LIVE' : '● OFF AIR',
                  style: sans(
                    size: 10,
                    weight: 800,
                    color: live
                        ? const Color(0xFFBD3434)
                        : const Color(0xFF657487),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (details?['image'] is String) ...[
                ClipOval(
                  child: Image.asset(
                    details!['image'] as String,
                    width: 48,
                    height: 48,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 12),
              ],
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: sans(
                        size: 15,
                        weight: 700,
                        color: FKColors.ink,
                        height: 1.4,
                      ),
                    ),
                    if ((details?['speaker'] as String? ?? '').isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Text(
                        '${details!['speaker']}${(details!['org'] as String? ?? '').isEmpty ? '' : ' · ${details!['org']}'}',
                        style: sans(
                          size: 12,
                          color: FKColors.accent,
                          weight: 700,
                        ),
                      ),
                    ],
                    if (details?['room'] is String) ...[
                      const SizedBox(height: 4),
                      Text(
                        details!['room'] as String,
                        style: sans(size: 12, color: FKColors.textMuted),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _TrackOption extends StatelessWidget {
  final String value;
  final String label;
  final bool selected;
  const _TrackOption({
    required this.value,
    required this.label,
    required this.selected,
  });
  @override
  Widget build(BuildContext context) => InkWell(
    onTap: () => RadioGroup.maybeOf<String>(context)?.onChanged(value),
    borderRadius: BorderRadius.circular(99),
    child: Container(
      padding: const EdgeInsets.only(right: 14),
      decoration: BoxDecoration(
        color: selected ? const Color(0xFFEDF5FF) : FKColors.white,
        border: Border.all(color: selected ? FKColors.accent : FKColors.border),
        borderRadius: BorderRadius.circular(99),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Radio<String>(value: value, visualDensity: VisualDensity.compact),
          Text(
            label,
            style: sans(
              size: 13,
              weight: 700,
              color: selected ? FKColors.accent : FKColors.textMuted,
            ),
          ),
        ],
      ),
    ),
  );
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
  final String selectedTrack;
  final TimeOfDay? testTime;

  const _ScheduleRow({
    required this.row,
    required this.wide,
    required this.trackAi,
    required this.trackFlutter,
    this.isFirst = false,
    required this.selectedTrack,
    this.testTime,
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
            style: sans(size: 13.5, weight: 700, color: FKColors.textDim),
          ),
        ],
      );
    } else if (row['shared'] != null) {
      final title = row['shared'] as String;
      final isLunch =
          title.toLowerCase().contains('lunch') || title.contains('런치');
      final isPhoto =
          title.toLowerCase().contains('photo') || title.contains('사진');
      body = isLunch || isPhoto
          ? _SharedEventRow(time: time, title: title, isLunch: isLunch)
          : _Session(
              time: time,
              session: {
                'title': title,
                'speaker': row['speaker'],
                'org': row['org'],
                'description': row['description'],
                'image': row['image'],
                'slides': sessionSlides['${row['start']}-shared'],
                'end': row['end'],
                'testTime': testTime,
              },
              shared: true,
            );
    } else {
      final aiSession = row['ai'] as Map<String, dynamic>?;
      final flutterSession = row['flutter'] as Map<String, dynamic>?;

      final cardFlutter = _Session(
        time: time,
        session: {
          ...?flutterSession,
          'slides': sessionSlides['${row['start']}-flutter'],
          'end': row['end'],
          'testTime': testTime,
        },
        trackLabel: wide ? null : trackFlutter,
      );
      final cardAi = _Session(
        time: time,
        session: {
          ...?aiSession,
          'slides': sessionSlides['${row['start']}-ai'],
          'end': row['end'],
          'testTime': testTime,
        },
        trackLabel: wide ? null : trackAi,
      );

      body = selectedTrack == 'flutter'
          ? cardFlutter
          : selectedTrack == 'ai'
          ? cardAi
          : wide
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: cardFlutter),
                const SizedBox(width: 48),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.only(left: 32),
                    decoration: const BoxDecoration(
                      border: Border(left: BorderSide(color: FKColors.border)),
                    ),
                    child: cardAi,
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
      style: mono(size: 11.5, weight: 700, color: const Color(0xFF3A3F48)),
    ),
  );
}

class _SharedEventRow extends StatelessWidget {
  final String time;
  final String title;
  final bool isLunch;

  const _SharedEventRow({
    required this.time,
    required this.title,
    required this.isLunch,
  });

  @override
  Widget build(BuildContext context) => Row(
    children: [
      _TimeChip(time),
      const SizedBox(width: 16),
      Expanded(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (isLunch) ...[
              Image.asset(
                'assets/images/crycheese-burger-logo.png',
                width: 112,
                fit: BoxFit.contain,
              ),
              const SizedBox(width: 12),
            ],
            Flexible(
              child: Text(
                title,
                textAlign: TextAlign.center,
                style: heading(size: 16.5, weight: 750, color: FKColors.ink),
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class _GooglePortraitStack extends StatelessWidget {
  final bool includeKhanh;
  final bool includeMariam;

  const _GooglePortraitStack({
    required this.includeKhanh,
    required this.includeMariam,
  });

  @override
  Widget build(BuildContext context) {
    final people = [
      'assets/images/speaker/craig-labenz.jpg',
      if (includeKhanh) 'assets/images/speaker/khanh-nguyen.jpg',
      if (includeMariam) 'assets/images/speaker/mariam-hasnany.jpg',
    ];
    const diameter = 52.0;
    const overlap = 25.0;
    return SizedBox(
      width: diameter + (people.length - 1) * overlap,
      height: diameter,
      child: Stack(
        children: [
          for (var i = 0; i < people.length; i++)
            Positioned(
              left: i * overlap,
              child: Container(
                width: diameter,
                height: diameter,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: FKColors.white, width: 2),
                ),
                clipBehavior: Clip.antiAlias,
                child: Image.asset(people[i], fit: BoxFit.cover),
              ),
            ),
        ],
      ),
    );
  }
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
    final description = (session['description'] as String?) ?? '';
    if (title.isEmpty || title == 'X') {
      return const SizedBox(height: 40);
    }
    final speaker = (session['speaker'] as String?) ?? '';
    final org = (session['org'] as String?) ?? '';
    final isGooglePanel = shared && speaker.contains('Craig Labenz');
    final isAwsKeynote = shared && title.toLowerCase().contains('aws');
    final image = session['image'] as String?;
    final slides = session['slides'] as String?;
    final isKo = I18nScope.of(context).lang.name == 'ko';

    Widget avatar;
    if (shared && (title == 'Opening' || title == '오프닝')) {
      avatar = Padding(
        padding: const EdgeInsets.all(7),
        child: SvgPicture.asset(
          'assets/images/flutter_seoul/flutter_seoul_logo_exact_size.svg',
          fit: BoxFit.contain,
        ),
      );
    } else if (isAwsKeynote) {
      avatar = Padding(
        padding: const EdgeInsets.all(7),
        child: SvgPicture.asset(
          'assets/images/aws-logo.svg',
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

    final avatarWidget = isGooglePanel
        ? _GooglePortraitStack(
            includeKhanh: speaker.contains('Khanh'),
            includeMariam: speaker.contains('Mariam'),
          )
        : Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: FKColors.white,
              border: Border.all(color: FKColors.border),
            ),
            clipBehavior: Clip.antiAlias,
            child: avatar,
          );

    final content = Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        avatarWidget,
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (trackLabel != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 2,
                    ),
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
                    speaker.isEmpty ? 'Flutter Korea 2026' : speaker,
                    style: sans(
                      color: const Color(0xFF1681E8),
                      size: 14.5,
                      weight: 700,
                      height: 1.35,
                    ),
                  ),
                  if (org.isNotEmpty)
                    Text(
                      org,
                      style: sans(
                        color: FKColors.textDim,
                        size: 10,
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
              if (slides != null)
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: _SlidesButton(
                    url: slides,
                    end: session['end'] as String,
                    testTime: session['testTime'] as TimeOfDay?,
                    isKo: isKo,
                  ),
                ),
            ],
          ),
        ),
      ],
    );

    final hasDescription = description.trim().isNotEmpty;
    return Semantics(
      button: hasDescription,
      label: hasDescription
          ? '$title · ${isKo ? '세션 설명 보기' : 'View session details'}'
          : title,
      child: InkWell(
        onTap: !hasDescription
            ? null
            : () => showDialog<void>(
                context: context,
                builder: (dialogContext) => AlertDialog(
                  title: Text(title),
                  scrollable: true,
                  content: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 560),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          time,
                          style: sans(size: 12, color: FKColors.textDim),
                        ),
                        if (speaker.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          Text(
                            '$speaker${org.isEmpty ? '' : ' / $org'}',
                            style: sans(
                              size: 14,
                              weight: 700,
                              color: FKColors.accent,
                            ),
                          ),
                        ],
                        const SizedBox(height: 16),
                        Text(
                          description.isNotEmpty
                              ? description
                              : (isKo
                                    ? '세션 설명을 준비 중입니다.'
                                    : 'Session description coming soon.'),
                          style: sans(
                            size: 14,
                            color: FKColors.ink,
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(dialogContext).pop(),
                      child: Text(isKo ? '닫기' : 'Close'),
                    ),
                  ],
                ),
              ),
        child: LayoutBuilder(
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
        ),
      ),
    );
  }
}

class _SlidesButton extends StatefulWidget {
  final String url;
  final String end;
  final bool isKo;
  final TimeOfDay? testTime;
  const _SlidesButton({
    required this.url,
    required this.end,
    this.testTime,
    required this.isKo,
  });

  @override
  State<_SlidesButton> createState() => _SlidesButtonState();
}

class _SlidesButtonState extends State<_SlidesButton> {
  Timer? _timer;
  bool _available = false;

  @override
  void initState() {
    super.initState();
    _schedule();
  }

  @override
  void didUpdateWidget(covariant _SlidesButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.end != widget.end || oldWidget.testTime != widget.testTime) {
      _timer?.cancel();
      _schedule();
    }
  }

  void _schedule() {
    final endTime = DateTime.parse('2026-11-07T${widget.end}:00+09:00');
    final current = widget.testTime == null
        ? DateTime.now()
        : DateTime.utc(
            2026,
            11,
            7,
            widget.testTime!.hour - 9,
            widget.testTime!.minute,
          );
    final remaining = endTime.difference(current);
    _available = remaining <= Duration.zero;
    if (!_available && widget.testTime == null) {
      _timer = Timer(remaining, () {
        if (mounted) setState(() => _available = true);
      });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => OutlinedButton(
    onPressed: _available ? () => openExternal(widget.url) : null,
    child: Text(
      _available
          ? (widget.isKo ? '발표 자료 보기 ↗' : 'View slides ↗')
          : (widget.isKo ? '세션 종료 후 공개' : 'Available after the session'),
    ),
  );
}
