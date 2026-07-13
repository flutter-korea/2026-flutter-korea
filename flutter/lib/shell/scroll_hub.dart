import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../theme/tokens.dart';

/// Per-page scroll state: owns the page's [ScrollController], the section
/// anchor keys, the header-collapse flag and the scroll-spy active id.
///
/// Ports three behaviours of the original site:
///  - `collapsed = scrollY > 0` (announcement bar slides away, header pins)
///  - scroll-spy via IntersectionObserver `-40% 0 -50% 0` (a section is
///    active while it crosses the 40%–50% viewport band)
///  - smooth anchor scrolling with `scroll-padding-top: header + 16px`
class ScrollHub {
  final controller = ScrollController();
  final collapsed = ValueNotifier<bool>(false);
  final activeId = ValueNotifier<String>('');
  final _keys = <String, GlobalKey>{};

  /// Sections the header nav tracks — single-sourced from the nav links in
  /// content.dart (ids are language-independent; the test asserts ko == en).
  static final spyIds =
      List<String>.unmodifiable(koContent.nav.links.map((l) => l.id));

  ScrollHub() {
    controller.addListener(_onScroll);
  }

  GlobalKey keyFor(String id) => _keys.putIfAbsent(id, () => GlobalKey());

  void dispose() {
    controller.removeListener(_onScroll);
    controller.dispose();
    collapsed.dispose();
    activeId.dispose();
  }

  void _onScroll() {
    collapsed.value = controller.offset > 0;
    _updateSpy();
  }

  void _updateSpy() {
    final viewportH =
        controller.hasClients ? controller.position.viewportDimension : 0.0;
    if (viewportH == 0) return;
    for (final id in spyIds) {
      final box = _boxFor(id);
      if (box == null) continue;
      final top = box.localToGlobal(Offset.zero).dy;
      // Sections are stacked top-to-bottom, so once one starts below the
      // 50% line nothing further down can match — skip the below-fold walk.
      if (top >= viewportH * 0.5) break;
      if (top + box.size.height > viewportH * 0.4) {
        activeId.value = id;
      }
    }
  }

  RenderBox? _boxFor(String id) {
    final ctx = _keys[id]?.currentContext;
    final render = ctx?.findRenderObject();
    if (render is RenderBox && render.attached && render.hasSize) return render;
    return null;
  }

  /// Smooth-scroll to a section anchor. `top` clamps to 0 so the announcement
  /// bar re-expands (mirrors the hero's scroll-margin-top trick).
  void scrollTo(String id) {
    if (!controller.hasClients) return;
    if (id == 'top') {
      _animate(0);
      return;
    }
    final box = _boxFor(id);
    if (box == null) return;
    final target = controller.offset +
        box.localToGlobal(Offset.zero).dy -
        (FKLayout.headerH + 16);
    _animate(target.clamp(0.0, controller.position.maxScrollExtent));
  }

  void _animate(double offset) {
    controller.animateTo(
      offset,
      duration: const Duration(milliseconds: 550),
      curve: FKMotion.ease,
    );
  }
}

/// Anchor requested from another page (e.g. footer link on /speakers →
/// `/#tickets`): consumed by the home page on its first frame.
abstract final class PendingAnchor {
  static String? id;
}
