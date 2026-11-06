import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'i18n/i18n.dart';
import 'venue_visibility.dart';
import 'pages/home_page.dart';
import 'pages/timetable_page.dart';
import 'pages/venue_map_page.dart';
import 'theme/tokens.dart';
import 'theme/typography.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // Restore the saved language before first paint settles; the app root
  // listens to I18n and rebuilds when it lands.
  I18n.instance.restore();
  runApp(const FkApp());
}

final _router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomePage()),
    GoRoute(
      path: '/venue-map',
      builder: (context, state) => const VenueMapPage(),
    ),
    // Flutter's hash URL strategy resolves `/#timetable` as `/timetable`.
    GoRoute(
      path: '/timetable',
      builder: (context, state) => const TimetablePage(),
    ),
  ],
);

class FkApp extends StatelessWidget {
  const FkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: Listenable.merge([I18n.instance, venueVisible]),
      builder: (context, _) => MaterialApp.router(
        title: 'Flutter Korea 2026: Back to Basics, Move Forward',
        debugShowCheckedModeBanner: false,
        routerConfig: _router,
        builder: (context, child) => I18nScope(
          notifier: I18n.instance,
          child: KeyedSubtree(
            key: ValueKey(venueVisible.value),
            child: child ?? const SizedBox.shrink(),
          ),
        ),
        theme: ThemeData(
          useMaterial3: true,
          scaffoldBackgroundColor: FKColors.white,
          fontFamily: kFontSans,
          colorScheme: ColorScheme.fromSeed(seedColor: FKColors.blue700),
          textSelectionTheme: const TextSelectionThemeData(
            selectionColor: Color(0x2E0A6DF2),
          ),
        ),
      ),
    );
  }
}
