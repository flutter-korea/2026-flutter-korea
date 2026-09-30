/**
 * Design styles — alternative visual directions that re-render a template with
 * their own layout while reading the SAME spec data. Select with `spec.style`
 * (whole deck) or `card.style` (one card). Each style is one module in scripts/styles/<name>.mjs plus
 * assets/styles/<name>.css (scoped by `.style-<name>`); build concatenates the CSS
 * into the deck's assets/styles.css.
 *
 * Every style keeps the readability floor of the base theme (nothing under
 * 24px on the 1080 canvas; name ≥ 96px; talk title ≥ 44px) and shows the exact
 * date/time/venue from ctx.event. Brand = the Flutter Seoul mark (ctx.brandMark),
 * its facet palette, and the official Dash (assets/brand/dash.png).
 */
import poster from './styles/poster.mjs';
import badge from './styles/badge.mjs';
import code from './styles/code.mjs';
import inspector from './styles/inspector.mjs';
import split from './styles/split.mjs';
import sticker from './styles/sticker.mjs';
import ticket from './styles/ticket.mjs';
import rail from './styles/rail.mjs';
import app from './styles/app.mjs';

/** Registry — order is the order styles are listed and compared in. */
export const styles = { poster, badge, code, inspector, split, sticker, ticket, rail, app };
