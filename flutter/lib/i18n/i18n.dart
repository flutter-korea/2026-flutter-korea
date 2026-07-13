import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../content/content.dart';

const _storageKey = 'fk26-lang';

enum AppLang { ko, en }

/// Current language state. Defaults to 'ko' (like the prerendered original);
/// the saved choice is restored from local storage on startup.
class I18n extends ChangeNotifier {
  I18n._();
  static final I18n instance = I18n._();

  AppLang _lang = AppLang.ko;
  AppLang get lang => _lang;

  Content get t => _lang == AppLang.ko ? koContent : enContent;

  Future<void> restore() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final saved = prefs.getString(_storageKey);
      if (saved == 'en') _setLang(AppLang.en);
      if (saved == 'ko') _setLang(AppLang.ko);
    } catch (_) {
      // Ignore storage errors (private mode etc.) — keep the default.
    }
  }

  void toggle() =>
      _setLang(_lang == AppLang.ko ? AppLang.en : AppLang.ko, persist: true);

  void _setLang(AppLang value, {bool persist = false}) {
    if (_lang == value) return;
    _lang = value;
    notifyListeners();
    if (persist) {
      SharedPreferences.getInstance()
          .then((prefs) => prefs.setString(_storageKey, value.name))
          .catchError((_) => true);
    }
  }
}

/// Shorthand used across widgets: `context.t.hero.badge`.
/// Widgets rebuild on language change because the app root listens to
/// [I18n.instance] and rebuilds the whole tree (all copy changes at once).
extension I18nContext on BuildContext {
  Content get t => I18n.instance.t;
}
