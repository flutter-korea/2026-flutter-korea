import 'package:flutter/widgets.dart';

import '../sections/about.dart';
import '../sections/cfp.dart';
import '../sections/hero.dart';
import '../sections/overview.dart';
import '../sections/sessions.dart';
import '../sections/sponsors.dart';
import '../sections/tickets.dart';
import '../sections/timetable.dart';
import '../shell/scroll_hub.dart';
import '../shell/site_footer.dart';
import '../shell/site_scaffold.dart';
import '../widgets/layout.dart';

/// Home: hero band followed by the eight content sections, in the same order
/// as the original `+page.svelte`.
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _hub = ScrollHub();

  @override
  void initState() {
    super.initState();
    // Anchor requested from another page (`/#tickets` style links).
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final anchor = PendingAnchor.id;
      PendingAnchor.id = null;
      if (anchor != null && anchor != 'top') _hub.scrollTo(anchor);
    });
  }

  @override
  void dispose() {
    _hub.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SiteScaffold(
      hub: _hub,
      children: [
        HeroSection(hub: _hub),
        FkSection(
          key: _hub.keyFor('overview'),
          child: const OverviewSection(),
        ),
        FkSection(key: _hub.keyFor('about'), child: const AboutSection()),
        FkSection(key: _hub.keyFor('sessions'), child: const SessionsSection()),
        FkSection(
          key: _hub.keyFor('timetable'),
          child: const TimetableSection(),
        ),
        FkSection(key: _hub.keyFor('speakers'), child: const CfpSection()),
        FkSection(key: _hub.keyFor('tickets'), child: const TicketsSection()),
        FkSection(key: _hub.keyFor('sponsors'), child: const SponsorsSection()),
        SiteFooter(hub: _hub),
      ],
    );
  }
}
