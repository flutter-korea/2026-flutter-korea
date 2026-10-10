import 'package:flutter/widgets.dart';

import '../sections/timetable.dart';
import '../shell/scroll_hub.dart';
import '../shell/site_footer.dart';
import '../shell/site_scaffold.dart';
import '../widgets/layout.dart';

/// Standalone timetable destination for `/#timetable` links.
class TimetablePage extends StatefulWidget {
  const TimetablePage({super.key});

  @override
  State<TimetablePage> createState() => _TimetablePageState();
}

class _TimetablePageState extends State<TimetablePage> {
  final _hub = ScrollHub();

  @override
  void dispose() {
    _hub.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SiteScaffold(
    hub: _hub,
    children: [
      FkSection(
        key: _hub.keyFor('timetable'),
        maxWidth: double.infinity,
        child: const TimetableSection(),
      ),
      SiteFooter(hub: _hub),
    ],
  );
}
