<script>
	// Thin gradient strip at the very top of every page — the one place besides
	// the hero where the brand gradient appears, echoing flutter.dev's
	// "X is here!" banner but carrying real event status instead.
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
</script>

<div class="announce">
	<a class="announce-link" href={`${base}/speakers`}>
		<span class="dot" aria-hidden="true"></span>
		<span class="msg">{$t.announce.text}</span>
		<span class="arrow" aria-hidden="true">→</span>
	</a>
</div>

<style>
	.announce {
		height: var(--announce-h);
		background: var(--gradient-hero);
		display: flex;
		align-items: center;
		justify-content: center;
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
