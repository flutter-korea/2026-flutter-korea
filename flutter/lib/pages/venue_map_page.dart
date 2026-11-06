import 'package:flutter/widgets.dart';
import '../sections/venue_map.dart';
import '../shell/scroll_hub.dart';
import '../shell/site_footer.dart';
import '../shell/site_scaffold.dart';
import '../widgets/layout.dart';

class VenueMapPage extends StatefulWidget {
  const VenueMapPage({super.key});
  @override
  State<VenueMapPage> createState() => _VenueMapPageState();
}

class _VenueMapPageState extends State<VenueMapPage> {
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
      const FkSection(child: VenueMapSection()),
      SiteFooter(hub: _hub),
    ],
  );
}
