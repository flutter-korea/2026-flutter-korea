<script>
	import { t } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
	import ComingSoon from './ComingSoon.svelte';
</script>

<section id="timetable" class="section">
	<div class="container">
		<header class="reveal">
			<span class="kicker">{$t.timetable.kicker}</span>
			<h2 class="section-title">{$t.timetable.title}</h2>
			<p class="section-lead">{$t.timetable.lead}</p>
		</header>

		<ul class="frame reveal" use:reveal={{ delay: 80 }}>
			{#each $t.timetable.frame as item (item.label)}
				<li class="frame-item">
					<span class="frame-label">{item.label}</span>
					<span class="frame-value">{item.value}</span>
				</li>
			{/each}
		</ul>

		<div class="cs-wrap reveal" use:reveal={{ delay: 160 }}>
			<ComingSoon
				badge={$t.timetable.comingSoon.badge}
				title={$t.timetable.comingSoon.title}
				body={$t.timetable.comingSoon.body}
			/>
		</div>
	</div>
</section>

<style>
	header {
		margin-bottom: 2.25rem;
	}
	.frame {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: var(--r-md);
		overflow: hidden;
	}
	.frame-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1.25rem 1.4rem;
		background: var(--card);
	}
	.frame-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		color: var(--text-dim);
	}
	.frame-value {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--text);
	}
</style>
