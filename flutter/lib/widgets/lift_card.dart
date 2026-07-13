import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import 'hover.dart';

/// Shared card hover treatment (`.stat`, `.compass`, `.tier`): lifts on
/// hover, deepens the tint and border, and (optionally) reveals a 2px accent
/// line that scales in from the left along the top edge.
class LiftCard extends StatelessWidget {
  final Widget Function(BuildContext context, bool hovered) builder;
  final EdgeInsets padding;
  final Color color;
  final Color borderColor;
  final Color hoverBorderColor;
  final double lift;
  final List<BoxShadow> hoverShadow;
  final bool topAccent;

  const LiftCard({
    super.key,
    required this.builder,
    required this.padding,
    this.color = FKColors.paper,
    this.borderColor = FKColors.border,
    this.hoverBorderColor = FKColors.borderStrong,
    this.lift = 4,
    this.hoverShadow = FKShadows.card,
    this.topAccent = true,
  });

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      builder: (context, hovered) => AnimatedContainer(
        duration: FKMotion.mid,
        curve: FKMotion.ease,
        transform: Matrix4.translationValues(0, hovered ? -lift : 0, 0),
        decoration: BoxDecoration(
          color: hovered ? FKColors.paperStrong : color,
          border: Border.all(color: hovered ? hoverBorderColor : borderColor),
          borderRadius: BorderRadius.circular(FKRadii.lg),
          boxShadow: hovered ? hoverShadow : const [],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(FKRadii.lg),
          child: Stack(
            children: [
              Padding(padding: padding, child: builder(context, hovered)),
              if (topAccent)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: AnimatedOpacity(
                    duration: FKMotion.mid,
                    curve: FKMotion.ease,
                    opacity: hovered ? 1 : 0,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 400),
                      curve: FKMotion.ease,
                      height: 2,
                      transform: Matrix4.diagonal3Values(
                          hovered ? 1.0 : 0.35, 1, 1),
                      color: FKColors.blue700,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
