import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_korea_2026/main.dart';
import 'package:flutter_korea_2026/pages/speakers_page.dart';
import 'package:flutter_korea_2026/i18n/i18n.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  testWidgets('SiteScaffold provides SelectionArea on Home page', (tester) async {
    await tester.pumpWidget(const FkApp());
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));

    expect(find.byType(SelectionArea), findsWidgets);

    // Subtitle text exists
    final textFinder = find.text('기술의 본질로 돌아가, 두려움 없이 미래를 정의하다');
    expect(textFinder, findsOneWidget);

    // Simulate drag gesture over the text to verify selection works without error
    final gesture = await tester.startGesture(
      tester.getTopLeft(textFinder),
      kind: PointerDeviceKind.mouse,
    );
    await tester.pump();
    await gesture.moveTo(tester.getBottomRight(textFinder));
    await tester.pump();
    await gesture.up();
    await tester.pump();

    // Clean up
    await tester.pumpWidget(const SizedBox());
    await tester.pump();
  });

  testWidgets('SiteScaffold provides SelectionArea on Speakers page', (tester) async {
    await tester.pumpWidget(
      I18nScope(
        notifier: I18n.instance,
        child: const MaterialApp(
          home: SpeakersPage(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 500));

    expect(find.byType(SelectionArea), findsWidgets);

    final titleFinder = find.text('Flutter Korea 2026\n세션을 제안하세요');
    expect(titleFinder, findsOneWidget);

    final gesture = await tester.startGesture(
      tester.getTopLeft(titleFinder),
      kind: PointerDeviceKind.mouse,
    );
    await tester.pump();
    await gesture.moveTo(tester.getBottomRight(titleFinder));
    await tester.pump();
    await gesture.up();
    await tester.pump();

    await tester.pumpWidget(const SizedBox());
    await tester.pump();
  });
}
