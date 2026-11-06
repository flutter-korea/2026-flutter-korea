import 'package:flutter/widgets.dart';
import '../i18n/i18n.dart';
import '../venue_visibility.dart';
import '../widgets/section_header.dart';

class VenueMapSection extends StatelessWidget {
  const VenueMapSection({super.key});
  @override
  Widget build(BuildContext context) {
    if (!venueVisible.value) return const SizedBox.shrink();
    final isKo = I18nScope.of(context).lang.name == 'ko';
    return Padding(
      padding: const EdgeInsets.only(bottom: 64),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SectionHeader(
            kicker: 'Venue map',
            title: isKo ? '행사장 안내도' : 'Venue map',
            lead: isKo
                ? '안내도를 확대하여 자세히 볼 수 있습니다.'
                : 'Zoom in to see the map in detail.',
          ),
          const SizedBox(height: 24),
          InteractiveViewer(
            minScale: 1,
            maxScale: 4,
            child: Image.asset(
              'assets/images/venue-map.png',
              semanticLabel: isKo
                  ? '행사장 안내도: 입구, 체크인, Google 부스, Flutter Track, AI Track, 카페와 스태프 룸'
                  : 'Venue map showing the entrance, check-in, Google booth, Flutter Track, AI Track, cafes and staff room',
            ),
          ),
        ],
      ),
    );
  }
}
