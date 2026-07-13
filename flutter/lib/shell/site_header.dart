import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/hover.dart';
import '../widgets/layout.dart';
import '../widgets/stroke_icon.dart';
import 'scroll_hub.dart';

/// Site header bar: brand · desktop nav (scroll-spy underline) · language
/// toggle · CTA — or a hamburger below the 900px breakpoint.
class SiteHeader extends StatelessWidget {
  final ScrollHub? hub;
  final bool collapsed;
  final bool menuOpen;
  final VoidCallback onToggleMenu;

  const SiteHeader({
    super.key,
    required this.hub,
    required this.collapsed,
    required this.menuOpen,
    required this.onToggleMenu,
  });

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    final vw = MediaQuery.sizeOf(context).width;
    final desktop = vw >= Bp.nav;

    return AnimatedContainer(
      duration: FKMotion.quick,
      curve: FKMotion.ease,
      height: FKLayout.headerH,
      decoration: BoxDecoration(
        color: FKColors.white,
        border: const Border(bottom: BorderSide(color: FKColors.border)),
        boxShadow: collapsed
            ? const [
                BoxShadow(
                  color: Color(0x400B1220),
                  offset: Offset(0, 4),
                  blurRadius: 16,
                  spreadRadius: -12,
                ),
              ]
            : const [],
      ),
      child: FkContainer(
        child: Row(
          children: [
            _Brand(hub: hub),
            const Spacer(),
            if (desktop) ...[
              if (hub case final hub?)
                ValueListenableBuilder<String>(
                  valueListenable: hub.activeId,
                  builder: (context, activeId, _) =>
                      _navRow(context, t, activeId, hub),
                )
              else
                _navRow(context, t, '', null),
              const Spacer(),
              LangButton(),
              const SizedBox(width: 12),
              FkButton(
                label: t.nav.cta,
                onTap: () => goSpeakers(context),
                fontSize: 14.4,
                padding:
                    const EdgeInsets.symmetric(horizontal: 18.4, vertical: 9.6),
              ),
            ] else
              _Hamburger(open: menuOpen, onTap: onToggleMenu),
          ],
        ),
      ),
    );
  }

  Widget _navRow(BuildContext context, Content t, String activeId, ScrollHub? hub) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final link in t.nav.links) ...[
          _NavLink(
            label: link.label,
            active: hub != null && activeId == link.id,
            onTap: () => goHomeAnchor(context, link.id, hub: hub),
          ),
          if (link != t.nav.links.last) const SizedBox(width: 32),
        ],
      ],
    );
  }
}

class _Brand extends StatelessWidget {
  final ScrollHub? hub;
  const _Brand({required this.hub});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) => GestureDetector(
        onTap: () => goHomeAnchor(context, 'top', hub: hub),
        behavior: HitTestBehavior.opaque,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: FKColors.blue700,
                borderRadius: BorderRadius.circular(9),
              ),
              alignment: Alignment.center,
              child: StrokeIcon(FkIcons.flutterMark, size: 20, color: FKColors.white),
            ),
            const SizedBox(width: 9.6),
            Text(
              context.t.nav.brand,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: sans(
                size: 15.7,
                weight: 700,
                color: FKColors.ink,
                letterSpacing: -0.16,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _NavLink extends StatelessWidget {
  final String label;
  final bool active;
  final VoidCallback onTap;

  const _NavLink({required this.label, required this.active, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) => GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AnimatedDefaultTextStyle(
                duration: FKMotion.quick,
                curve: FKMotion.ease,
                style: sans(
                  size: 15,
                  weight: 500,
                  color: active
                      ? FKColors.accent
                      : hovered
                          ? FKColors.ink
                          : FKColors.textMuted,
                ),
                child: Text(label),
              ),
              const SizedBox(height: 2),
              // Active underline — scales in from the left like the CSS
              // `transform: scaleX(0→1)` transition.
              AnimatedContainer(
                duration: FKMotion.quick,
                curve: FKMotion.ease,
                height: 2,
                width: active ? label.length * 15.0 * 0.9 : 0,
                decoration: BoxDecoration(
                  color: FKColors.accent,
                  borderRadius: BorderRadius.circular(1),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Language toggle pill (globe + `EN`/`KR`).
class LangButton extends StatelessWidget {
  final bool wide;
  const LangButton({super.key, this.wide = false});

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    return Semantics(
      button: true,
      label: t.meta.langButtonLabel,
      child: HoverBuilder(
        cursor: SystemMouseCursors.click,
        builder: (context, hovered) => GestureDetector(
          onTap: I18n.instance.toggle,
          child: AnimatedContainer(
            duration: FKMotion.quick,
            curve: FKMotion.ease,
            padding: const EdgeInsets.symmetric(horizontal: 13.6, vertical: 8),
            decoration: BoxDecoration(
              color: hovered ? FKColors.paper : FKColors.white,
              border: Border.all(
                  color: hovered ? FKColors.borderStrong : FKColors.border),
              borderRadius: BorderRadius.circular(FKRadii.full),
            ),
            child: Row(
              mainAxisSize: wide ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                StrokeIcon(
                  FkIcons.globe,
                  size: 14.3,
                  color: hovered ? FKColors.accent : FKColors.textMuted,
                  strokeWidth: 1.6,
                ),
                const SizedBox(width: 6.4),
                Text(
                  t.meta.langButton,
                  style: sans(
                    size: 13.6,
                    weight: 600,
                    color: hovered ? FKColors.accent : FKColors.textMuted,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _Hamburger extends StatelessWidget {
  final bool open;
  final VoidCallback onTap;
  const _Hamburger({required this.open, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    return Semantics(
      button: true,
      label: open ? t.nav.close : t.nav.menu,
      child: HoverBuilder(
        cursor: SystemMouseCursors.click,
        builder: (context, hovered) => GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: FKMotion.quick,
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: hovered ? FKColors.paper : FKColors.white,
              border: Border.all(color: FKColors.border),
              borderRadius: BorderRadius.circular(FKRadii.sm),
            ),
            alignment: Alignment.center,
            child: StrokeIcon(
              open ? FkIcons.close : FkIcons.menu,
              size: 21.6,
              color: FKColors.ink,
              strokeWidth: 1.7,
            ),
          ),
        ),
      ),
    );
  }
}
