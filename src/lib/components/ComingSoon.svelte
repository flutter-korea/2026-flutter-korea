<script>
	// Reusable "to be announced" panel for sections whose content isn't final yet.
	// cta (optional): { label, href, external? }  — href should already include `base` when internal.
	let { badge, title, body, cta = null } = $props();
</script>

<div class="coming-soon">
	<span class="cs-badge">
		<span class="dot" aria-hidden="true"></span>
		{badge}
	</span>

	<div class="cs-icon" aria-hidden="true">
		<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6">
			<circle cx="12" cy="12" r="9" />
			<path d="M12 7v5l3.5 2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>

	<h3 class="cs-title">{title}</h3>
	<p class="cs-body">{body}</p>

	{#if cta}
		{#if cta.external}
			<a class="btn btn-primary cs-cta" href={cta.href} target="_blank" rel="noopener noreferrer">
				{cta.label}
				<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		{:else}
			<a class="btn btn-primary cs-cta" href={cta.href}>
				{cta.label}
				<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		{/if}
	{/if}
</div>

<style>
	.coming-soon {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3rem);
		border: 1px dashed var(--border-strong);
		border-radius: var(--r-lg);
		background:
			radial-gradient(80% 120% at 50% 0%, rgba(84, 197, 248, 0.07), transparent 70%),
			var(--card);
		overflow: hidden;
	}
	.coming-soon::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(120, 190, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(120, 190, 255, 0.05) 1px, transparent 1px);
		background-size: 28px 28px;
		mask-image: radial-gradient(70% 70% at 50% 40%, #000, transparent 75%);
		pointer-events: none;
	}
	.coming-soon > * {
		position: relative;
	}
	.cs-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		padding: 0.35rem 0.8rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--r-full);
		background: rgba(84, 197, 248, 0.06);
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 var(--glow);
		animation: pulse-ring 2.4s ease-out infinite;
	}
	.cs-icon {
		margin-top: 0.9rem;
		display: grid;
		place-items: center;
		width: 3.4rem;
		height: 3.4rem;
		border-radius: 50%;
		color: var(--accent);
		background: var(--gradient-brand-soft);
		border: 1px solid var(--border-strong);
	}
	.cs-title {
		margin-top: 0.4rem;
		font-size: var(--fs-h3);
		color: var(--text);
	}
	.cs-body {
		max-width: 46ch;
		color: var(--text-muted);
	}
	.cs-cta {
		margin-top: 1.4rem;
	}
</style>
