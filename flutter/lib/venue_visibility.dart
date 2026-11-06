import 'dart:async';
import 'package:flutter/foundation.dart';

final venueVisible = VenueVisibility();

class VenueVisibility extends ValueNotifier<bool> {
  VenueVisibility() : super(DateTime.now().isBefore(_deadline)) {
    _update();
  }
  static final _deadline = DateTime.parse('2026-11-07T18:00:00+09:00');
  Timer? _timer;
  void _update() {
    final remaining = _deadline.difference(DateTime.now());
    value = remaining > Duration.zero;
    if (value) {
      final delay = remaining > const Duration(days: 24)
          ? const Duration(days: 24)
          : remaining;
      _timer = Timer(delay, _update);
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
