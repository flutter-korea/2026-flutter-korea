import 'package:flutter/widgets.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'hover.dart';
import 'stroke_icon.dart';

enum FkButtonVariant {
  /// `.btn-primary` — solid brand blue, white label.
  primary,

  /// `.btn-ghost` — white surface, accent label, strong hairline border.
  ghost,

  /// `.btn-on-gradient` — white surface, blue label (hero band only).
  onGradient,

  /// `.btn-outline-on-gradient` — transparent, white label + translucent border.
  outlineOnGradient,
}

/// Pill button porting the `.btn` family: lifts 2px on hover with variant
/// color/shadow transitions. The optional trailing icon nudges right on hover
/// when [iconSlides] is set (`.apply:hover svg`).
class FkButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final FkButtonVariant variant;
  final List<IconShape>? icon;
  final double iconSize;
  final double fontSize;
  final EdgeInsets padding;
  final bool expand;
  final bool iconSlides;

  const FkButton({
    super.key,
    required this.label,
    required this.onTap,
    this.variant = FkButtonVariant.primary,
    this.icon,
    this.iconSize = 17.6,
    this.fontSize = 15.7,
    this.padding = const EdgeInsets.symmetric(horizontal: 24, vertical: 13.6),
    this.expand = false,
    this.iconSlides = false,
  });

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) {
        final (bg, fg, borderColor) = switch (variant) {
          FkButtonVariant.primary => (
              hovered ? FKColors.blue900 : FKColors.blue700,
              FKColors.white,
              const Color(0x00000000),
            ),
          FkButtonVariant.ghost => (
              hovered ? FKColors.paper : FKColors.white,
              FKColors.accent,
              hovered ? FKColors.accent : FKColors.borderStrong,
            ),
          FkButtonVariant.onGradient => (
              hovered ? FKColors.paper : FKColors.white,
              FKColors.blue700,
              const Color(0x00000000),
            ),
          FkButtonVariant.outlineOnGradient => (
              hovered ? const Color(0x1FFFFFFF) : const Color(0x00000000),
              FKColors.white,
              hovered ? FKColors.white : const Color(0x99FFFFFF),
            ),
        };
        final shadows = switch (variant) {
          FkButtonVariant.primary => hovered ? FKShadows.lift : FKShadows.card,
          _ => const <BoxShadow>[],
        };

        return GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: FKMotion.quick,
            curve: FKMotion.ease,
            transform: Matrix4.translationValues(0, hovered ? -2 : 0, 0),
            padding: padding,
            decoration: BoxDecoration(
              color: bg,
              border: Border.all(color: borderColor, width: 1.5),
              borderRadius: BorderRadius.circular(FKRadii.full),
              boxShadow: shadows,
            ),
            child: Row(
              mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Flexible(
                  child: Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: sans(
                      size: fontSize,
                      weight: 700,
                      color: fg,
                      letterSpacing: -0.01 * fontSize,
                    ),
                  ),
                ),
                if (icon != null) ...[
                  const SizedBox(width: 8),
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    curve: FKMotion.ease,
                    transform: Matrix4.translationValues(
                        iconSlides && hovered ? 3 : 0, 0, 0),
                    child: StrokeIcon(
                      icon!,
                      size: iconSize,
                      color: fg,
                      strokeWidth: 2,
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}
