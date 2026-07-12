<script>
	// Thin gradient strip at the very top of every page — the one place besides
	// the hero where the brand gradient appears, echoing flutter.dev's
	// "X is here!" banner but carrying real event status instead.
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';

	let { collapsed = false } = $props();
</script>

<div class="announce" class:collapsed>
	<a class="announce-link" href={`${base}/speakers`}>
		<span class="dot" aria-hidden="true"></span>
		<span class="msg">{$t.announce.text}</span>
		<span class="arrow" aria-hidden="true">→</span>
	</a>
</div>

<style>
	.announce {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--announce-h);
		background: var(--gradient-hero);
		display: flex;
		align-items: center;
		justify-content: center;
		/* Animates `top` (not transform) so it moves in lockstep with the
		   header's `top` transition — same mechanism, no seam between bars. */
		transition: top 0.35s var(--ease);
	}
	.announce.collapsed {
		top: calc(-1 * var(--announce-h));
	}
	/* Overscroll (rubber-band) cover: extends the banner's gradient above the
	   viewport so pulling past the top stretches the banner instead of
	   revealing a white strip. */
	.announce::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 100%;
		height: 40vh;
		background: var(--gradient-hero);
	}
	@media (prefers-reduced-motion: reduce) {
		.announce {
			transition: none;
		}
	}
	.announce-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		height: 100%;
		width: 100%;
		justify-content: center;
		color: var(--white);
		font-size: 0.86rem;
		font-weight: 600;
		letter-spacing: -0.005em;
		padding-inline: var(--gutter);
		transition: background 0.2s var(--ease);
	}
	.announce-link:hover {
		background: rgba(255, 255, 255, 0.08);
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--white);
		flex-shrink: 0;
	}
	.msg {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.arrow {
		flex-shrink: 0;
		transition: transform 0.2s var(--ease);
	}
	.announce-link:hover .arrow {
		transform: translateX(3px);
	}
</style>
