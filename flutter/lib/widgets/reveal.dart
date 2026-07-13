import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';

/// Scroll-in reveal, porting the `use:reveal` Svelte action + `.reveal` CSS:
/// fades in and slides up 18px (0.6s, custom ease, optional delay) once the
/// element scrolls into view (top above 92% of the viewport, like the
/// original's `rootMargin: 0 0 -8% 0`). Reveals immediately when animations
/// are disabled (reduced motion).
class Reveal extends StatefulWidget {
  final Widget child;
  final int delayMs;

  const Reveal({super.key, this.delayMs = 0, required this.child});

  @override
  State<Reveal> createState() => _RevealState();
}

class _RevealState extends State<Reveal> {
  ScrollPosition? _position;
  bool _triggered = false;
  bool _visible = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (MediaQuery.maybeDisableAnimationsOf(context) ?? false) {
      _triggered = true;
      _visible = true;
    }
    final position = Scrollable.maybeOf(context)?.position;
    if (!identical(position, _position)) {
      _position?.removeListener(_check);
      _position = position;
      if (!_triggered) _position?.addListener(_check);
    }
    if (!_triggered) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _check());
    }
  }

  @override
  void dispose() {
    _position?.removeListener(_check);
    super.dispose();
  }

  void _check() {
    if (_triggered || !mounted) return;
    final box = context.findRenderObject() as RenderBox?;
    if (box == null || !box.attached || !box.hasSize) return;
    final viewportH = MediaQuery.sizeOf(context).height;
    final top = box.localToGlobal(Offset.zero).dy;
    final bottom = top + box.size.height;
    if (top < viewportH * 0.92 && bottom > 0) {
      _triggered = true;
      _position?.removeListener(_check);
      if (widget.delayMs == 0) {
        setState(() => _visible = true);
      } else {
        Future.delayed(Duration(milliseconds: widget.delayMs), () {
          if (mounted) setState(() => _visible = true);
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: _visible ? 1 : 0,
      duration: FKMotion.dur,
      curve: FKMotion.ease,
      child: AnimatedContainer(
        duration: FKMotion.dur,
        curve: FKMotion.ease,
        transform: Matrix4.translationValues(0, _visible ? 0 : 18, 0),
        child: widget.child,
      ),
    );
  }
}
