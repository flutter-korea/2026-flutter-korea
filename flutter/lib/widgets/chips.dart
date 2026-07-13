import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';

/// `.chip` — mono badge with hairline border. Colors are overridable for the
/// hero badge variant (translucent white on the gradient).
class FkChip extends StatelessWidget {
  final String label;
  final Widget? leading;
  final Color background;
  final Color borderColor;
  final Color textColor;
  final bool uppercase;

  const FkChip({
    super.key,
    required this.label,
    this.leading,
    this.background = FKColors.white,
    this.borderColor = FKColors.border,
    this.textColor = FKColors.textMuted,
    this.uppercase = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 11.2, vertical: 4.8),
      decoration: BoxDecoration(
        color: background,
        border: Border.all(color: borderColor),
        borderRadius: BorderRadius.circular(FKRadii.full),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (leading != null) ...[leading!, const SizedBox(width: 6.4)],
          Flexible(
            child: Text(
              uppercase ? label.toUpperCase() : label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: mono(
                size: 11.5,
                weight: 600,
                color: textColor,
                letterSpacing: 11.5 * 0.04,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Solid round dot (hero badge, announcement bar).
class Dot extends StatelessWidget {
  final double size;
  final Color color;
  const Dot({super.key, required this.size, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}

/// Status pill with a pulsing accent dot and a mono label — the shared
/// "live" badge treatment (ComingSoon panel, tickets status, fireside card).
class PulseBadge extends StatelessWidget {
  final String label;
  final Color background;
  final bool uppercase;
  final double dotSize;
  final double letterSpacingEm;
  final double horizontalPadding;

  const PulseBadge({
    super.key,
    required this.label,
    this.background = FKColors.white,
    this.uppercase = true,
    this.dotSize = 6,
    this.letterSpacingEm = 0.12,
    this.horizontalPadding = 12.8,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding:
          EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: 5.6),
      decoration: BoxDecoration(
        color: background,
        border: Border.all(color: FKColors.borderStrong),
        borderRadius: BorderRadius.circular(FKRadii.full),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          PulseDot(size: dotSize),
          const SizedBox(width: 8),
          Text(
            uppercase ? label.toUpperCase() : label,
            style: mono(
              size: 11.5,
              color: FKColors.accent,
              letterSpacing: 11.5 * letterSpacingEm,
            ),
          ),
        ],
      ),
    );
  }
}

/// Restrained "live" status pulse — ports the `pulse-ring` keyframes: a ring
/// expands from the dot to ~8px and fades, on a 2.4s loop.
class PulseDot extends StatefulWidget {
  final double size;

  const PulseDot({super.key, this.size = 6});

  @override
  State<PulseDot> createState() => _PulseDotState();
}

class _PulseDotState extends State<PulseDot> with SingleTickerProviderStateMixin {
  static const _ringSpread = 8.0;

  late final AnimationController _controller = AnimationController(
      vsync: this, duration: const Duration(milliseconds: 2400));

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (MediaQuery.maybeDisableAnimationsOf(context) ?? false) {
      _controller.stop();
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // The box is just the dot — the expanding ring paints beyond the bounds,
    // like the CSS box-shadow ring, so it adds no layout size to badges.
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) => CustomPaint(
          painter:
              _PulsePainter(_controller.value, widget.size / 2, _ringSpread),
        ),
      ),
    );
  }
}

class _PulsePainter extends CustomPainter {
  final double t;
  final double dotRadius;
  final double spread;

  _PulsePainter(this.t, this.dotRadius, this.spread);

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    // CSS: 0% → ring 0 @ .3 alpha; 70% → ring 8px @ 0 alpha; then rest.
    final phase = (t / 0.7).clamp(0.0, 1.0);
    if (phase < 1.0) {
      final ring = Paint()
        ..color = FKColors.accent.withValues(alpha: 0.3 * (1 - phase));
      canvas.drawCircle(center, dotRadius + spread * phase, ring);
    }
    canvas.drawCircle(center, dotRadius, Paint()..color = FKColors.accent);
  }

  @override
  bool shouldRepaint(_PulsePainter old) => old.t != t;
}
