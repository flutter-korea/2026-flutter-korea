import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'i18n/i18n.dart';
import 'pages/home_page.dart';
import 'pages/speakers_page.dart';
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
    GoRoute(path: '/speakers', builder: (context, state) => const SpeakersPage()),
  ],
);

class FkApp extends StatelessWidget {
  const FkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: I18n.instance,
      builder: (context, _) => MaterialApp.router(
        title: 'Flutter Korea 2026 — Back to Basics, Move Forward',
        debugShowCheckedModeBanner: false,
        routerConfig: _router,
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
