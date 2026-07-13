import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart' as launcher;

import 'shell/scroll_hub.dart';

/// Navigate to a home-page section (`${base}/#id` in the original). When
/// already on the home page the hub scrolls in place; otherwise we return
/// home and let it consume [PendingAnchor].
void goHomeAnchor(BuildContext context, String id, {ScrollHub? hub}) {
  final onHome = GoRouterState.of(context).uri.path == '/';
  if (onHome && hub != null) {
    hub.scrollTo(id);
  } else {
    PendingAnchor.id = id;
    context.go('/');
  }
}

void goSpeakers(BuildContext context) => context.go('/speakers');

/// External links open in a new tab (web) / default handler elsewhere.
Future<void> openExternal(String url) async {
  final uri = Uri.parse(url);
  try {
    await launcher.launchUrl(uri, webOnlyWindowName: '_blank');
  } catch (_) {
    // Pop-up blocked or no handler — nothing sensible to do.
  }
}
