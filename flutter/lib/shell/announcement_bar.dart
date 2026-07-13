import 'package:flutter/widgets.dart';

import '../i18n/i18n.dart';
import '../nav.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/chips.dart';
import '../widgets/hover.dart';

/// Thin gradient strip at the very top of every page — the one place besides
/// the hero where the brand gradient appears. Carries the live event status
/// and links to the speaker page.
class AnnouncementBar extends StatelessWidget {
  const AnnouncementBar({super.key});

  @override
  Widget build(BuildContext context) {
    final vw = MediaQuery.sizeOf(context).width;
    return Container(
      height: FKLayout.announceH,
      decoration: const BoxDecoration(gradient: kHeroGradient),
      child: HoverBuilder(
        cursor: SystemMouseCursors.click,
        builder: (context, hovered) => GestureDetector(
          onTap: () => goSpeakers(context),
          behavior: HitTestBehavior.opaque,
          child: AnimatedContainer(
            duration: FKMotion.quick,
            curve: FKMotion.ease,
            color: hovered ? const Color(0x14FFFFFF) : const Color(0x00FFFFFF),
            padding: EdgeInsets.symmetric(horizontal: FKLayout.gutter(vw)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Dot(size: 6, color: FKColors.white),
                const SizedBox(width: 8.8),
                Flexible(
                  child: Text(
                    context.t.announceText,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: sans(
                      size: 13.8,
                      weight: 600,
                      color: FKColors.white,
                      letterSpacing: -0.07,
                    ),
                  ),
                ),
                const SizedBox(width: 8.8),
                AnimatedContainer(
                  duration: FKMotion.quick,
                  curve: FKMotion.ease,
                  transform: Matrix4.translationValues(hovered ? 3 : 0, 0, 0),
                  child: Text(
                    '→',
                    style: sans(size: 13.8, weight: 600, color: FKColors.white),
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
