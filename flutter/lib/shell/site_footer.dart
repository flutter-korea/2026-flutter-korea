import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/hover.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';
import 'scroll_hub.dart';

/// Site footer: brand column · Navigate · Connect, then the bottom bar with
/// rights, back-to-top pill and the trademark line.
class SiteFooter extends StatelessWidget {
  final ScrollHub? hub;
  const SiteFooter({super.key, required this.hub});

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    final vw = MediaQuery.sizeOf(context).width;
    final padTop = (vw * 0.07).clamp(48.0, 80.0);

    final brandCol = Reveal(child: _BrandCol(t: t, hub: hub));
    final navCol = Reveal(
      delayMs: 80,
      child: _LinkCol(
        title: t.footer.nav,
        links: [
          for (final link in t.nav.links)
            _FooterLink(link.label, () => goHomeAnchor(context, link.id, hub: hub)),
        ],
      ),
    );
    final connectCol = Reveal(
      delayMs: 160,
      child: _LinkCol(
        title: t.footer.connect,
        links: [
          _FooterLink(t.footer.speakers, () => goSpeakers(context)),
          _FooterLink(t.tickets.title, () => goHomeAnchor(context, 'tickets', hub: hub)),
          _FooterLink('Meetup', () => openExternal(Links.meetup), external: true),
          _FooterLink('Discord', () => openExternal(Links.discord), external: true),
          _FooterLink('Contact', () => openExternal(Links.email)),
        ],
      ),
    );

    return Container(
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: FKColors.border)),
      ),
      padding: EdgeInsets.only(top: padTop, bottom: 36),
      child: FkContainer(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (vw >= Bp.sm)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(flex: vw >= Bp.footerWide ? 20 : 14, child: brandCol),
                  const SizedBox(width: 32),
                  Expanded(flex: 10, child: navCol),
                  const SizedBox(width: 32),
                  Expanded(flex: 10, child: connectCol),
                ],
              )
            else
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  brandCol,
                  const SizedBox(height: 44),
                  navCol,
                  const SizedBox(height: 44),
                  connectCol,
                ],
              ),
            SizedBox(height: FKLayout.panelPadY(vw)),
            Reveal(delayMs: 240, child: _Bottom(t: t, hub: hub)),
          ],
        ),
      ),
    );
  }
}

class _BrandCol extends StatelessWidget {
  final Content t;
  final ScrollHub? hub;
  const _BrandCol({required this.t, required this.hub});

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    // `.brand-col` max-width: 40ch at the body font.
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: chWidth(FKType.body(vw), 40)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HoverBuilder(
            cursor: SystemMouseCursors.click,
            builder: (context, hovered) => GestureDetector(
              onTap: () => goHomeAnchor(context, 'top', hub: hub),
              behavior: HitTestBehavior.opaque,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 34,
                    height: 34,
                    decoration: BoxDecoration(
                      color: FKColors.blue700,
                      borderRadius: BorderRadius.circular(10),
                      boxShadow: const [
                        BoxShadow(
                          color: FKColors.glow,
                          offset: Offset(0, 6),
                          blurRadius: 18,
                          spreadRadius: -8,
                        ),
                      ],
                    ),
                    alignment: Alignment.center,
                    child: StrokeIcon(FkIcons.flutterMark,
                        size: 22, color: FKColors.white),
                  ),
                  const SizedBox(width: 11.2),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        t.footer.madeBy.toUpperCase(),
                        style: mono(
                          size: 10.9,
                          color: FKColors.textDim,
                          letterSpacing: 10.9 * 0.14,
                          height: 1.2,
                        ),
                      ),
                      Text(
                        t.footer.org,
                        style: sans(
                          size: 16.8,
                          weight: 700,
                          color: FKColors.ink,
                          height: 1.2,
                          letterSpacing: -0.17,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 17.6),
          Text(
            t.footer.tagline,
            style: sans(size: 15.4, color: FKColors.textMuted, height: 1.6),
          ),
        ],
      ),
    );
  }
}

class _FooterLink {
  final String label;
  final VoidCallback onTap;
  final bool external;
  const _FooterLink(this.label, this.onTap, {this.external = false});
}

class _LinkCol extends StatelessWidget {
  final String title;
  final List<_FooterLink> links;
  const _LinkCol({required this.title, required this.links});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title.toUpperCase(),
          style: mono(
            size: 11.5,
            color: FKColors.textDim,
            letterSpacing: 11.5 * 0.16,
          ),
        ),
        const SizedBox(height: 17.6),
        for (final link in links)
          HoverBuilder(
            cursor: SystemMouseCursors.click,
            builder: (context, hovered) => GestureDetector(
              onTap: link.onTap,
              behavior: HitTestBehavior.opaque,
              child: AnimatedContainer(
                duration: FKMotion.quick,
                curve: FKMotion.ease,
                transform: Matrix4.translationValues(hovered ? 3 : 0, 0, 0),
                padding: const EdgeInsets.symmetric(vertical: 5.6),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      link.label,
                      style: sans(
                        size: 15.2,
                        color: hovered ? FKColors.ink : FKColors.textMuted,
                      ),
                    ),
                    if (link.external) ...[
                      const SizedBox(width: 6.4),
                      StrokeIcon(
                        FkIcons.upRightSmall,
                        size: 12.9,
                        color: hovered ? FKColors.accent : FKColors.textDim,
                        strokeWidth: 1.8,
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}

class _Bottom extends StatelessWidget {
  final Content t;
  final ScrollHub? hub;
  const _Bottom({required this.t, required this.hub});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.only(top: 28),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: FKColors.border)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 24,
            runSpacing: 14.4,
            crossAxisAlignment: WrapCrossAlignment.center,
            alignment: WrapAlignment.spaceBetween,
            children: [
              Text(
                t.footer.rights,
                style: mono(
                    size: 12.5, color: FKColors.textMuted, letterSpacing: 0.5),
              ),
              _BackToTop(label: t.footer.backToTop, hub: hub),
            ],
          ),
          const SizedBox(height: 20),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: chWidth(12.5, 78)),
            child: Text(
              t.footer.trademark,
              style: sans(size: 12.5, color: FKColors.textDim, height: 1.55),
            ),
          ),
        ],
      ),
    );
  }
}

class _BackToTop extends StatelessWidget {
  final String label;
  final ScrollHub? hub;
  const _BackToTop({required this.label, required this.hub});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) => GestureDetector(
        onTap: () => goHomeAnchor(context, 'top', hub: hub),
        child: AnimatedContainer(
          duration: FKMotion.quick,
          curve: FKMotion.ease,
          padding: const EdgeInsets.symmetric(horizontal: 14.4, vertical: 7.2),
          decoration: BoxDecoration(
            color: hovered ? FKColors.paperStrong : FKColors.paper,
            border: Border.all(
                color: hovered ? FKColors.borderStrong : FKColors.border),
            borderRadius: BorderRadius.circular(FKRadii.full),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                label.toUpperCase(),
                style: mono(
                  size: 11.8,
                  color: hovered ? FKColors.ink : FKColors.textMuted,
                  letterSpacing: 11.8 * 0.06,
                ),
              ),
              const SizedBox(width: 7.2),
              AnimatedContainer(
                duration: FKMotion.quick,
                curve: FKMotion.ease,
                transform:
                    Matrix4.translationValues(0, hovered ? -2 : 0, 0),
                child: StrokeIcon(
                  FkIcons.arrowUp,
                  size: 13.5,
                  color: hovered ? FKColors.ink : FKColors.textMuted,
                  strokeWidth: 1.8,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
