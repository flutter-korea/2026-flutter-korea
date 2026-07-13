import 'dart:ui' show ImageFilter;

import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../shell/scroll_hub.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/chips.dart';
import '../widgets/countdown.dart';
import '../widgets/layout.dart';
import '../widgets/rows.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';
import '../widgets/hover.dart';

/// Hero band — the ONE gradient surface, with decorative origami facets
/// (pointer parallax on desktop), a staggered entrance, the countdown glass
/// panel and the facts bar.
class HeroSection extends StatefulWidget {
  final ScrollHub hub;
  const HeroSection({super.key, required this.hub});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection> {
  // Pointer parallax feeds only the decorative facets; a ValueNotifier keeps
  // mouse moves from rebuilding the whole hero subtree.
  final _parallax = ValueNotifier<Offset>(Offset.zero);

  @override
  void dispose() {
    _parallax.dispose();
    super.dispose();
  }

  void _onHover(PointerEvent e) {
    final size = MediaQuery.sizeOf(context);
    final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    if (reduce || size.width < Bp.nav) return;
    _parallax.value = Offset(
      (e.position.dx / size.width - 0.5) * 2,
      (e.position.dy / size.height - 0.5) * 2,
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = context.t.hero;
    final size = MediaQuery.sizeOf(context);
    final vw = size.width;
    final vh = size.height;
    final desktop = vw >= Bp.nav;

    final padTop = (vh * 0.08).clamp(56.0, 96.0);
    final padBottom = (vh * 0.09).clamp(64.0, 104.0);

    final copy = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        _Stagger(
          index: 0,
          child: FkChip(
            label: t.badge,
            leading: const Dot(size: 6.7, color: FKColors.white),
            background: const Color(0x1FFFFFFF),
            borderColor: const Color(0x47FFFFFF),
            textColor: FKColors.white,
          ),
        ),
        const SizedBox(height: 24),
        _Stagger(
          index: 1,
          child: Text(
            t.sloganTop,
            style: _headline(vw, FKColors.white),
          ),
        ),
        _Stagger(
          index: 2,
          child: Text(
            t.sloganBottom,
            style: _headline(vw, FKColors.onGradientAccent),
          ),
        ),
        const SizedBox(height: 25.6),
        _Stagger(
          index: 3,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(FKType.lead(vw), 40)),
            child: Text(
              t.subtitle,
              style: sans(
                size: FKType.lead(vw),
                weight: 600,
                color: FKColors.white,
                height: 1.5,
                letterSpacing: -0.01 * FKType.lead(vw),
              ),
            ),
          ),
        ),
        const SizedBox(height: 16.8),
        _Stagger(
          index: 4,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(FKType.body(vw), 50)),
            child: Text(
              t.description,
              style: sans(
                size: FKType.body(vw),
                color: const Color(0xCCFFFFFF),
                height: 1.65,
              ),
            ),
          ),
        ),
        const SizedBox(height: 35.2),
        _Stagger(
          index: 5,
          child: Wrap(
            spacing: 13.6,
            runSpacing: 13.6,
            children: [
              FkButton(
                label: t.ctaPrimary,
                variant: FkButtonVariant.onGradient,
                onTap: () => goSpeakers(context),
                icon: FkIcons.arrowRight,
              ),
              FkButton(
                label: t.ctaSecondary,
                variant: FkButtonVariant.outlineOnGradient,
                onTap: () => widget.hub.scrollTo('about'),
                icon: FkIcons.arrowDown,
                iconSize: 16,
              ),
            ],
          ),
        ),
        const SizedBox(height: 44),
        _Stagger(index: 6, child: _FactsBar(facts: t.facts, vw: vw)),
      ],
    );

    final panel = _Stagger(
      index: 4,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(FKRadii.lg),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.all((vw * 0.03).clamp(24.0, 36.0)),
            decoration: BoxDecoration(
              color: const Color(0x1AFFFFFF),
              border: Border.all(color: const Color(0x3DFFFFFF)),
              borderRadius: BorderRadius.circular(FKRadii.lg),
            ),
            child: const Countdown(),
          ),
        ),
      ),
    );

    return MouseRegion(
      onHover: _onHover,
      opaque: false,
      child: Container(
        constraints: const BoxConstraints(minHeight: 640),
        decoration: const BoxDecoration(gradient: kHeroGradient),
        child: ClipRect(
          child: Stack(
            children: [
              // Decorative facet shapes, echoing Flutter's origami-fold mark.
              Positioned.fill(
                child: ValueListenableBuilder<Offset>(
                  valueListenable: _parallax,
                  builder: (context, p, _) => _Facets(px: p.dx, py: p.dy),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(top: padTop, bottom: padBottom),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: FKLayout.container),
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: FKLayout.gutter(vw)),
                      child: TwoCol(
                        twoCol: desktop,
                        gap: 64,
                        stackedGap: 48,
                        leftFlex: 115,
                        rightFlex: 85,
                        left: copy,
                        right: panel,
                      ),
                    ),
                  ),
                ),
              ),
              // Scroll hint
              Positioned(
                left: 0,
                right: 0,
                bottom: (vh * 0.03).clamp(16.0, 32.0),
                child: Center(
                  child: _ScrollHint(
                    label: t.scroll,
                    onTap: () => widget.hub.scrollTo('overview'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  TextStyle _headline(double vw, Color color) {
    final size = FKType.display(vw);
    return sans(
      size: size,
      weight: 800,
      color: color,
      height: 1.02,
      letterSpacing: -0.03 * size,
    );
  }
}

/* --- Facts bar ---------------------------------------------------------- */

class _FactsBar extends StatelessWidget {
  final List<LabelValue> facts;
  final double vw;
  const _FactsBar({required this.facts, required this.vw});

  @override
  Widget build(BuildContext context) {
    // The original renders facts.slice(1) — Date is already in the badge.
    final shown = facts.sublist(1);
    final narrow = vw < Bp.facts;

    Widget fact(LabelValue f, {required bool divider}) {
      final content = LabeledValue(
        label: f.label,
        value: f.value,
        labelStyle: mono(
          size: 11.2,
          weight: 500,
          color: const Color(0xADFFFFFF),
          letterSpacing: 11.2 * 0.14,
        ),
        valueStyle: sans(
          size: 16.3,
          weight: 700,
          color: FKColors.white,
          letterSpacing: -0.16,
        ),
      );
      return IntrinsicHeight(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (divider) ...[
              Container(width: 1, color: const Color(0x38FFFFFF)),
              const SizedBox(width: 24),
            ],
            content,
            const SizedBox(width: 24),
          ],
        ),
      );
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.only(top: 24),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: Color(0x38FFFFFF))),
      ),
      child: narrow
          ? Wrap(
              runSpacing: 14.4,
              children: [
                for (var i = 0; i < shown.length; i++)
                  fact(shown[i], divider: i.isOdd),
              ],
            )
          : Row(
              children: [
                for (var i = 0; i < shown.length; i++)
                  fact(shown[i], divider: i > 0),
              ],
            ),
    );
  }
}

/* --- Decorative facets --------------------------------------------------- */

class _Facets extends StatelessWidget {
  final double px;
  final double py;
  const _Facets({required this.px, required this.py});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned(
            top: -480,
            right: -352,
            child: Transform.translate(
              offset: Offset(px * -10, py * -10),
              child: const _Facet(
                size: 992,
                opacity: 0.08,
                points: [(0.30, 0.0), (1.0, 0.20), (0.78, 1.0), (0.0, 0.62)],
              ),
            ),
          ),
          Positioned(
            bottom: -224,
            left: -160,
            child: Transform.translate(
              offset: Offset(px * 14, py * 14),
              child: const _Facet(
                size: 480,
                opacity: 0.10,
                points: [(0.20, 0.0), (1.0, 0.12), (0.84, 1.0), (0.0, 0.80)],
              ),
            ),
          ),
          Positioned.fill(
            child: Align(
              alignment: const Alignment(0.84, -0.76),
              child: Transform.translate(
                offset: Offset(px * 22, py * 22),
                child: const _Facet(
                  size: 256,
                  opacity: 0.14,
                  points: [(0.35, 0.0), (1.0, 0.30), (0.65, 1.0), (0.0, 0.70)],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Facet extends StatelessWidget {
  final double size;
  final double opacity;
  final List<(double, double)> points;

  const _Facet({required this.size, required this.opacity, required this.points});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(painter: _FacetPainter(points, opacity)),
    );
  }
}

class _FacetPainter extends CustomPainter {
  final List<(double, double)> points;
  final double opacity;
  _FacetPainter(this.points, this.opacity);

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(points.first.$1 * size.width, points.first.$2 * size.height);
    for (final p in points.skip(1)) {
      path.lineTo(p.$1 * size.width, p.$2 * size.height);
    }
    path.close();
    canvas.drawPath(
        path, Paint()..color = FKColors.white.withValues(alpha: opacity));
  }

  @override
  bool shouldRepaint(_FacetPainter old) =>
      old.opacity != opacity || old.points != points;
}

/* --- Scroll hint ---------------------------------------------------------- */

class _ScrollHint extends StatefulWidget {
  final String label;
  final VoidCallback onTap;
  const _ScrollHint({required this.label, required this.onTap});

  @override
  State<_ScrollHint> createState() => _ScrollHintState();
}

class _ScrollHintState extends State<_ScrollHint>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
      vsync: this, duration: const Duration(milliseconds: 2000));

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
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) {
        final color = hovered ? FKColors.white : const Color(0xB3FFFFFF);
        return GestureDetector(
          onTap: widget.onTap,
          behavior: HitTestBehavior.opaque,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                widget.label.toUpperCase(),
                style: mono(size: 10.9, color: color, letterSpacing: 10.9 * 0.24),
              ),
              const SizedBox(height: 5.6),
              AnimatedBuilder(
                animation: _controller,
                builder: (context, _) {
                  // `nudge`: translateY 0→5→0 with opacity .7→1→.7. The fade
                  // is folded into the icon color — an Opacity widget here
                  // would force a saveLayer every frame.
                  final t = _controller.value;
                  final phase = t < 0.5 ? t * 2 : (1 - t) * 2;
                  final eased = FKMotion.ease.transform(phase);
                  final alpha = hovered ? 1.0 : 0.7 + 0.3 * eased;
                  return Transform.translate(
                    offset: Offset(0, 5 * eased),
                    child: StrokeIcon(
                      FkIcons.chevronDown,
                      size: 17.6,
                      color: color.withValues(alpha: color.a * alpha),
                      strokeWidth: 2,
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

/* --- Staggered entrance --------------------------------------------------- */

/// Ports the hero's `rise` keyframes: each element fades in and rises 18px
/// over 0.75s, delayed `index × 90ms`, once on mount.
class _Stagger extends StatefulWidget {
  final int index;
  final Widget child;
  const _Stagger({required this.index, required this.child});

  @override
  State<_Stagger> createState() => _StaggerState();
}

class _StaggerState extends State<_Stagger> {
  bool _entered = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
      if (reduce) {
        setState(() => _entered = true);
        return;
      }
      Future.delayed(Duration(milliseconds: widget.index * 90), () {
        if (mounted) setState(() => _entered = true);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    const dur = Duration(milliseconds: 750);
    return AnimatedOpacity(
      opacity: _entered ? 1 : 0,
      duration: dur,
      curve: FKMotion.ease,
      child: AnimatedContainer(
        duration: dur,
        curve: FKMotion.ease,
        transform: Matrix4.translationValues(0, _entered ? 0 : 18, 0),
        child: widget.child,
      ),
    );
  }
}
