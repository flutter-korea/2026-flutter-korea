import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_korea_2026/i18n/i18n.dart';
import 'package:flutter_korea_2026/shell/site_header.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  testWidgets('tapping LangButton dynamically toggles between Korean and English', (tester) async {
    // Ensure initial state is Korean
    if (I18n.instance.lang != AppLang.ko) {
      I18n.instance.toggle();
    }

    await tester.pumpWidget(
      I18nScope(
        notifier: I18n.instance,
        child: MaterialApp(
          home: Scaffold(
            body: Builder(
              builder: (context) => Column(
                children: [
                  const LangButton(),
                  Text(context.t.hero.subtitle),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();

    // Default is Korean
    expect(find.text('EN'), findsOneWidget);
    expect(find.text('기술의 본질로 돌아가, 두려움 없이 미래를 정의하다'), findsOneWidget);

    // Tap the language toggle button
    await tester.tap(find.byType(LangButton));
    await tester.pump(const Duration(milliseconds: 200));

    // Now should be English
    expect(find.text('KR'), findsOneWidget);
    expect(
        find.text(
            'Return to the essence of technology, and fearlessly define the future.'),
        findsOneWidget);
    expect(find.text('기술의 본질로 돌아가, 두려움 없이 미래를 정의하다'), findsNothing);

    // Tap again to switch back to Korean
    await tester.tap(find.byType(LangButton));
    await tester.pump(const Duration(milliseconds: 200));

    expect(find.text('EN'), findsOneWidget);
    expect(find.text('기술의 본질로 돌아가, 두려움 없이 미래를 정의하다'), findsOneWidget);
    expect(
        find.text(
            'Return to the essence of technology, and fearlessly define the future.'),
        findsNothing);
  });
}
