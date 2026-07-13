import 'dart:async';

import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Live countdown to the event start, rendered inside the hero's glass panel.
/// Event window is encoded in UTC (2026-11-07 11:00–18:00 KST) so it
/// evaluates identically regardless of the visitor's timezone.
final _eventStart = DateTime.parse('2026-11-07T11:00:00+09:00');
final _eventEnd = DateTime.parse('2026-11-07T18:00:00+09:00');

enum _Phase { before, live, done }

class Countdown extends StatefulWidget {
  const Countdown({super.key});

  @override
  State<Countdown> createState() => _CountdownState();
}

class _CountdownState extends State<Countdown> {
  Timer? _timer;
  Duration _remaining = Duration.zero;
  _Phase _phase = _Phase.before;

  @override
  void initState() {
    super.initState();
    _tick();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _tick());
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _tick() {
    final now = DateTime.now();
    final _Phase next;
    if (!now.isBefore(_eventEnd)) {
      next = _Phase.done;
    } else if (!now.isBefore(_eventStart)) {
      next = _Phase.live;
    } else {
      next = _Phase.before;
    }
    // Once the event is over the display never changes again.
    if (next == _Phase.done) _timer?.cancel();
    // Rebuild only when the output changes: every second before the event
    // (the digits tick), once on each phase transition after it.
    if (next != _phase || next == _Phase.before) {
      setState(() {
        _phase = next;
        if (next == _Phase.before) _remaining = _eventStart.difference(now);
      });
    }
  }

  String _pad(int n) => n.toString().padLeft(2, '0');

  @override
  Widget build(BuildContext context) {
    final t = context.t.countdown;
    final vw = MediaQuery.sizeOf(context).width;
    // --cd-num-size: clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem)
    final numSize = (20.8 + 0.016 * vw).clamp(27.2, 41.6).toDouble();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          t.label.toUpperCase(),
          style: mono(
            size: 11.5,
            weight: 600,
            color: const Color(0xB8FFFFFF),
            letterSpacing: 11.5 * 0.12,
          ),
        ),
        const SizedBox(height: 9.6),
        switch (_phase) {
          _Phase.before => _grid(t, numSize),
          _Phase.live => _status(t.live, pulse: true),
          _Phase.done => _status(t.done),
        },
      ],
    );
  }

  Widget _grid(CountdownStrings t, double numSize) {
    final days = _remaining.inDays;
    final hours = _remaining.inHours % 24;
    final minutes = _remaining.inMinutes % 60;
    final seconds = _remaining.inSeconds % 60;
    final cells = [
      (_pad(days), t.units.days),
      (_pad(hours), t.units.hours),
      (_pad(minutes), t.units.minutes),
      (_pad(seconds), t.units.seconds),
    ];

    final colon = Text(
      ':',
      style: mono(size: numSize, weight: 700, color: const Color(0x66FFFFFF), height: 1),
    );

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < cells.length; i++) ...[
          if (i > 0) ...[
            const SizedBox(width: 8.8),
            colon,
            const SizedBox(width: 8.8),
          ],
          ConstrainedBox(
            constraints: BoxConstraints(minWidth: numSize * 1.55),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  cells[i].$1,
                  style: mono(
                      size: numSize, weight: 700, color: FKColors.white, height: 1),
                ),
                const SizedBox(height: 5.6),
                Text(
                  cells[i].$2,
                  style: sans(
                      size: 11.5, color: const Color(0xADFFFFFF), letterSpacing: 0.23),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  Widget _status(String text, {bool pulse = false}) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (pulse) ...[
          _LivePulse(),
          const SizedBox(width: 8.8),
        ],
        Text(text, style: sans(size: 17.6, weight: 700, color: FKColors.white)),
      ],
    );
  }
}

/// Green "happening now" pulse (`.cd-pulse`).
class _LivePulse extends StatefulWidget {
  @override
  State<_LivePulse> createState() => _LivePulseState();
}

class _LivePulseState extends State<_LivePulse> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
      vsync: this, duration: const Duration(milliseconds: 1800))
    ..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final phase = (_controller.value / 0.7).clamp(0.0, 1.0);
        return Container(
          width: 9,
          height: 9,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: FKColors.liveGreen,
            boxShadow: [
              if (phase < 1)
                BoxShadow(
                  color: FKColors.liveGreen.withValues(alpha: 0.6 * (1 - phase)),
                  spreadRadius: 10 * phase,
                ),
            ],
          ),
        );
      },
    );
  }
}
