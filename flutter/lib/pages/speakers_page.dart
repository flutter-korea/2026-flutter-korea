import 'package:flutter/widgets.dart';

import '../content/content.dart';
import '../i18n/i18n.dart';
import '../nav.dart';
import '../shell/scroll_hub.dart';
import '../shell/site_footer.dart';
import '../shell/site_scaffold.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/buttons.dart';
import '../widgets/hover.dart';
import '../widgets/layout.dart';
import '../widgets/reveal.dart';
import '../widgets/rows.dart';
import '../widgets/section_header.dart';
import '../widgets/stroke_icon.dart';

/// `/speakers` — Call-for-Speakers overview: levels, categories, submission
/// checklist, perks and the Google-Form apply CTA.
class SpeakersPage extends StatefulWidget {
  const SpeakersPage({super.key});

  @override
  State<SpeakersPage> createState() => _SpeakersPageState();
}

class _SpeakersPageState extends State<SpeakersPage> {
  final _hub = ScrollHub();

  @override
  void dispose() {
    _hub.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = context.t.speakerPage;
    final vw = MediaQuery.sizeOf(context).width;
    final blockGap = (vw * 0.07).clamp(48.0, 72.0);

    return Title(
      title: t.metaTitle,
      color: FKColors.blue700,
      child: SiteScaffold(
        hub: _hub,
        children: [
          Padding(
            padding: EdgeInsets.only(
              top: (vw * 0.07).clamp(40.0, 80.0),
              bottom: FKLayout.sectionY(vw),
            ),
            child: FkContainer(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _BackLink(label: t.back),
                  const SizedBox(height: 32),

                  // Page header (`.sp-head` max-width: 60ch at the BODY font).
                  Reveal(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                          maxWidth: chWidth(FKType.body(vw), 60)),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Kicker(t.kicker),
                          const SizedBox(height: 14.4),
                          Text(
                            t.title,
                            style: heading(size: FKType.h2(vw))
                                .copyWith(color: FKColors.blue700),
                          ),
                          const SizedBox(height: 20),
                          Text(
                            t.intro,
                            style: sans(
                              size: FKType.lead(vw),
                              color: FKColors.textMuted,
                              height: 1.55,
                            ),
                          ),
                          const SizedBox(height: 32),
                          Wrap(
                            spacing: 16,
                            runSpacing: 16,
                            crossAxisAlignment: WrapCrossAlignment.center,
                            children: [
                              _DateChip(label: t.dateLabel, value: t.date),
                              FkButton(
                                label: t.applyCta,
                                onTap: () => openExternal(Links.cfp),
                                icon: FkIcons.upRightBoxed,
                                iconSize: 17.6,
                              ),
                            ],
                          ),
                          const SizedBox(height: 13.6),
                          Text(
                            t.applyNote,
                            style: sans(size: 13.1, color: FKColors.textDim),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Levels
                  SizedBox(height: blockGap),
                  Reveal(
                    delayMs: 80,
                    child: _Block(
                      title: t.levelsTitle,
                      child: AutoGrid(
                        itemCount: t.levels.length,
                        minCellWidth: 240,
                        gap: 16,
                        itemBuilder: (context, i, _) =>
                            _LevelCard(index: i, level: t.levels[i]),
                      ),
                    ),
                  ),

                  // Categories
                  SizedBox(height: blockGap),
                  Reveal(
                    delayMs: 80,
                    child: _Block(
                      title: t.categoriesTitle,
                      child: AutoGrid(
                        itemCount: t.categories.length,
                        minCellWidth: 240,
                        gap: 9.6,
                        itemBuilder: (context, i, _) =>
                            _CategoryRow(index: i + 1, label: t.categories[i]),
                      ),
                    ),
                  ),

                  // Submit checklist + perks
                  SizedBox(height: blockGap),
                  TwoCol(
                    twoCol: vw >= Bp.twoCol,
                    gap: 16,
                    stretch: true,
                    left: Reveal(
                      delayMs: 80,
                      child: _CardBlock(
                        title: t.submitTitle,
                        items: t.submitItems,
                        accent: false,
                        vw: vw,
                      ),
                    ),
                    right: Reveal(
                      delayMs: 160,
                      child: _CardBlock(
                        title: t.perksTitle,
                        items: t.perks,
                        accent: true,
                        vw: vw,
                      ),
                    ),
                  ),

                  // Final CTA
                  SizedBox(height: (vw * 0.08).clamp(56.0, 88.0)),
                  Reveal(
                    delayMs: 80,
                    child: _FinalCta(hub: _hub),
                  ),
                ],
              ),
            ),
          ),
          SiteFooter(hub: _hub),
        ],
      ),
    );
  }
}

class _BackLink extends StatelessWidget {
  final String label;
  const _BackLink({required this.label});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      cursor: SystemMouseCursors.click,
      builder: (context, hovered) {
        final color = hovered ? FKColors.ink : FKColors.textMuted;
        return GestureDetector(
          onTap: () => goHomeAnchor(context, 'top'),
          behavior: HitTestBehavior.opaque,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              StrokeIcon(FkIcons.arrowLeftBack,
                  size: 12.8, color: color, strokeWidth: 1.9),
              AnimatedContainer(
                duration: FKMotion.quick,
                curve: FKMotion.ease,
                width: hovered ? 12 : 8,
              ),
              Text(
                label,
                style: mono(size: 12.8, color: color, letterSpacing: 0.5),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _DateChip extends StatelessWidget {
  final String label;
  final String value;
  const _DateChip({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 17.6, vertical: 9.6),
      decoration: BoxDecoration(
        color: FKColors.paper,
        border: Border.all(color: FKColors.border),
        borderRadius: BorderRadius.circular(FKRadii.md),
      ),
      child: LabeledValue(
        label: label,
        value: value,
        gap: 3.2,
        labelStyle: mono(
          size: 10.6,
          color: FKColors.textDim,
          letterSpacing: 10.6 * 0.14,
        ),
        valueStyle: sans(size: 16, weight: 700, color: FKColors.ink),
      ),
    );
  }
}

/// Mono accent sub-title shared by `_Block` and `_CardBlock`.
Widget _blockTitle(String title) => Text(
      title.toUpperCase(),
      style: mono(
        size: 12.8,
        weight: 500,
        color: FKColors.accent,
        letterSpacing: 12.8 * 0.1,
      ),
    );

class _Block extends StatelessWidget {
  final String title;
  final Widget child;
  const _Block({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _blockTitle(title),
        const SizedBox(height: 22.4),
        child,
      ],
    );
  }
}

class _LevelCard extends StatelessWidget {
  final int index;
  final SpeakerLevel level;
  const _LevelCard({required this.index, required this.level});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      builder: (context, hovered) => AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: FKMotion.ease,
        transform: Matrix4.translationValues(0, hovered ? -3 : 0, 0),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: FKColors.paper,
          border: Border.all(
              color: hovered ? FKColors.borderStrong : FKColors.border),
          borderRadius: BorderRadius.circular(FKRadii.lg),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '0${index + 1}',
              style: mono(size: 13.6, color: FKColors.textDim),
            ),
            const SizedBox(height: 8),
            Text(level.name,
                style: heading(size: 19.2, height: 1.25)),
            const SizedBox(height: 8),
            Text(
              level.desc,
              style: sans(size: 14.7, color: FKColors.textMuted, height: 1.5),
            ),
          ],
        ),
      ),
    );
  }
}

class _CategoryRow extends StatelessWidget {
  final int index;
  final String label;
  const _CategoryRow({required this.index, required this.label});

  @override
  Widget build(BuildContext context) {
    return HoverBuilder(
      builder: (context, hovered) => AnimatedContainer(
        duration: FKMotion.quick,
        curve: FKMotion.ease,
        padding: const EdgeInsets.symmetric(horizontal: 17.6, vertical: 13.6),
        decoration: BoxDecoration(
          color: hovered ? FKColors.paperStrong : FKColors.paper,
          border: Border.all(
              color: hovered ? FKColors.borderStrong : FKColors.border),
          borderRadius: BorderRadius.circular(FKRadii.md),
        ),
        child: Row(
          children: [
            Container(
              width: 27.2,
              height: 27.2,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: FKColors.paperStrong,
                border: Border.all(color: FKColors.borderStrong),
              ),
              alignment: Alignment.center,
              child: Text(
                '$index',
                style: mono(size: 12, color: FKColors.accent, height: 1),
              ),
            ),
            const SizedBox(width: 12.8),
            Expanded(
              child: Text(
                label,
                style: sans(size: 15.2, color: FKColors.ink, height: 1.4),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CardBlock extends StatelessWidget {
  final String title;
  final List<String> items;
  final bool accent;
  final double vw;

  const _CardBlock({
    required this.title,
    required this.items,
    required this.accent,
    required this.vw,
  });

  @override
  Widget build(BuildContext context) {
    return PanelSurface(
      padding: EdgeInsets.all((vw * 0.03).clamp(24.0, 36.0)),
      color: accent ? FKColors.paperStrong : FKColors.paper,
      borderColor: accent ? FKColors.borderStrong : FKColors.border,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _blockTitle(title),
          const SizedBox(height: 22.4),
          for (var i = 0; i < items.length; i++)
            Padding(
              padding: EdgeInsets.only(bottom: i < items.length - 1 ? 12.8 : 0),
              child: CheckRow(
                items[i],
                style: sans(
                    size: FKType.body(vw),
                    color: FKColors.textMuted,
                    height: 1.5),
              ),
            ),
        ],
      ),
    );
  }
}

class _FinalCta extends StatelessWidget {
  final ScrollHub hub;
  const _FinalCta({required this.hub});

  @override
  Widget build(BuildContext context) {
    final t = context.t;
    final vw = MediaQuery.sizeOf(context).width;

    return PanelSurface(
      padding: EdgeInsets.symmetric(
        vertical: FKLayout.panelPadY(vw),
        horizontal: FKLayout.gutter(vw),
      ),
      child: Column(
        children: [
          ConstrainedBox(
            constraints: BoxConstraints(
                maxWidth: chWidth(FKType.h3(vw), 22, weight: 800)),
            child: Text(
              t.cfp.title,
              textAlign: TextAlign.center,
              style: heading(size: FKType.h3(vw)),
            ),
          ),
          const SizedBox(height: 20),
          FkButton(
            label: t.speakerPage.applyCta,
            onTap: () => openExternal(Links.cfp),
            icon: FkIcons.upRightBoxed,
            iconSize: 17.6,
            fontSize: 16.8,
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 13.6),
          ),
          const SizedBox(height: 20),
          HoverBuilder(
            cursor: SystemMouseCursors.click,
            builder: (context, hovered) => GestureDetector(
              onTap: () => goHomeAnchor(context, 'top'),
              child: Text(
                t.speakerPage.back,
                style: mono(
                  size: 12.8,
                  color: hovered ? FKColors.ink : FKColors.textDim,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
