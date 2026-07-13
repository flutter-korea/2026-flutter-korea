import 'package:flutter/widgets.dart';

/// MouseRegion wrapper exposing the hover flag — the Flutter analogue of a
/// CSS `:hover` rule.
class HoverBuilder extends StatefulWidget {
  final Widget Function(BuildContext context, bool hovered) builder;
  final MouseCursor cursor;

  const HoverBuilder({
    super.key,
    required this.builder,
    this.cursor = MouseCursor.defer,
  });

  @override
  State<HoverBuilder> createState() => _HoverBuilderState();
}

class _HoverBuilderState extends State<HoverBuilder> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: widget.cursor,
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: widget.builder(context, _hovered),
    );
  }
}
