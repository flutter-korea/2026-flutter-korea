import 'package:flutter/material.dart' show Material;
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/hover.dart';
import '../widgets/stroke_icon.dart';
import 'announcement_bar.dart';
import 'scroll_hub.dart';
import 'site_header.dart';

/// App shell shared by both pages.
///
/// The announcement bar and header are pinned above the scroll view (the
/// CSS originals are `position: fixed`) and animate their `top` in lockstep:
/// at scroll 0 the gradient strip pushes the header down; on any scroll it
/// slides out and the header lands flush at the viewport top.
class SiteScaffold extends StatefulWidget {
  final ScrollHub hub;
  final List<Widget> children;

  const SiteScaffold({super.key, required this.hub, required this.children});

  @override
  State<SiteScaffold> createState() => _SiteScaffoldState();
}

class _SiteScaffoldState extends State<SiteScaffold> {
  bool _menuOpen = false;

  @override
  void initState() {
    super.initState();
    HardwareKeyboard.instance.addHandler(_onKey);
  }

  @override
  void dispose() {
    HardwareKeyboard.instance.removeHandler(_onKey);
    super.dispose();
  }

  bool _onKey(KeyEvent event) {
    if (_menuOpen &&
        event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      setState(() => _menuOpen = false);
      return true;
    }
    return false;
  }

  void _toggleMenu() => setState(() => _menuOpen = !_menuOpen);
  void _closeMenu() => setState(() => _menuOpen = false);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final desktop = size.width >= Bp.nav;
    final menuOpen = _menuOpen && !desktop;
    final reduceMotion = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    final barDur = reduceMotion ? Duration.zero : FKMotion.bar;

    // Material ancestor gives Text its default (undecorated) style.
    return Material(
      color: FKColors.white,
      child: ValueListenableBuilder<bool>(
        valueListenable: widget.hub.collapsed,
        builder: (context, collapsed, _) => Stack(
          children: [
            // Scrollable page content; reserves the combined chrome height.
            Positioned.fill(
              child: IgnorePointer(
                ignoring: menuOpen,
                child: ScrollConfiguration(
                  behavior: ScrollConfiguration.of(context)
                      .copyWith(scrollbars: true),
                  child: SingleChildScrollView(
                    controller: widget.hub.controller,
                    padding: const EdgeInsets.only(
                        top: FKLayout.announceH + FKLayout.headerH),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: widget.children,
                    ),
                  ),
                ),
              ),
            ),

            // Mobile scrim + slide-in panel (under the fixed bars, above content).
            if (!desktop) ...[
              if (menuOpen)
                Positioned.fill(
                  child: GestureDetector(
                    onTap: _closeMenu,
                    child: AnimatedOpacity(
                      opacity: 1,
                      duration: FKMotion.quick,
                      child: Container(color: const Color(0x590B1220)),
                    ),
                  ),
                ),
              AnimatedPositioned(
                duration: reduceMotion ? Duration.zero : FKMotion.mid,
                curve: FKMotion.ease,
                top: 0,
                bottom: 0,
                width: (size.width * 0.84).clamp(0.0, 360.0),
                right: menuOpen ? 0 : -(size.width * 0.84).clamp(0.0, 360.0),
                child: _MobilePanel(hub: widget.hub, onClose: _closeMenu),
              ),
            ],

            // Announcement bar — slides fully out when collapsed.
            AnimatedPositioned(
              duration: barDur,
              curve: FKMotion.ease,
              top: collapsed ? -FKLayout.announceH : 0,
              left: 0,
              right: 0,
              height: FKLayout.announceH,
              child: const AnnouncementBar(),
            ),

            // Header — pins to the viewport top when collapsed.
            AnimatedPositioned(
              duration: barDur,
              curve: FKMotion.ease,
              top: collapsed ? 0 : FKLayout.announceH,
              left: 0,
              right: 0,
              height: FKLayout.headerH,
              child: SiteHeader(
                hub: widget.hub,
                collapsed: collapsed,
                menuOpen: menuOpen,
                onToggleMenu: _toggleMenu,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MobilePanel extends StatelessWidget {
  final ScrollHub hub;
  final VoidCallback onClose;

  const _MobilePanel({required this.hub, required this.onClose});

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    return Container(
      decoration: const BoxDecoration(
        color: FKColors.white,
        border: Border(left: BorderSide(color: FKColors.border)),
        boxShadow: [
          BoxShadow(
            color: Color(0x4D0B1220),
            offset: Offset(-16, 0),
            blurRadius: 40,
            spreadRadius: -20,
          ),
        ],
      ),
      padding: const EdgeInsets.fromLTRB(
          24, FKLayout.announceH + FKLayout.headerH + 24, 24, 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final link in t.nav.links)
            HoverBuilder(
              cursor: SystemMouseCursors.click,
              builder: (context, hovered) => GestureDetector(
                onTap: () {
                  onClose();
                  goHomeAnchor(context, link.id, hub: hub);
                },
                behavior: HitTestBehavior.opaque,
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 4),
                  decoration: const BoxDecoration(
                    border: Border(bottom: BorderSide(color: FKColors.border)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        link.label,
                        style: sans(size: 18.4, weight: 600, color: FKColors.ink),
                      ),
                      StrokeIcon(
                        FkIcons.chevronRight,
                        size: 16.6,
                        color: FKColors.textDim,
                        strokeWidth: 1.6,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          const Spacer(),
          const LangButton(wide: true),
          const SizedBox(height: 12),
          FkButton(
            label: t.nav.cta,
            onTap: () {
              onClose();
              goSpeakers(context);
            },
            expand: true,
          ),
        ],
      ),
    );
  }
}
