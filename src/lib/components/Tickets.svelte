<script>
	import { t } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="tickets" class="section">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.tickets.kicker}</span>
			<h2 class="section-title">{$t.tickets.title}</h2>
			<p class="section-lead">{$t.tickets.lead}</p>
			<span class="status-badge">
				<span class="status-dot" aria-hidden="true"></span>
				{$t.tickets.statusBadge}
			</span>
		</header>

		<ul class="tiers">
			{#each $t.tickets.tiers as tier, i}
				<li
					class="tier card reveal"
					class:is-featured={tier.featured}
					class:is-support={tier.support}
					use:reveal={{ delay: 80 + i * 80 }}
				>
					{#if tier.featured}
						<span class="ribbon" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z"
								/>
							</svg>
						</span>
					{:else if tier.support}
						<span class="ribbon ribbon-heart" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
								<path
									d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"
								/>
							</svg>
						</span>
					{/if}

					<div class="tier-head">
						<span class="tier-badge chip" class:tier-badge-featured={tier.featured}>{tier.badge}</span>
						<h3 class="tier-name">{tier.name}</h3>
					</div>

					<div class="tier-price">
						{#if tier.isText}
							<span class="price-text">{tier.price}</span>
						{:else}
							<span class="price-currency">{$t.tickets.currency}</span>
							<span class="price-num" class:gradient-text={tier.featured || tier.support}>{tier.price}</span>
						{/if}
					</div>

					<ul class="features">
						{#each tier.features as feature}
							<li class="feature">
								<svg
									class="feature-check"
									viewBox="0 0 24 24"
									width="1em"
									height="1em"
									fill="none"
									stroke="currentColor"
									stroke-width="2.2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path d="M20 6 9 17l-5-5" />
								</svg>
								<span>{feature}</span>
							</li>
						{/each}
					</ul>

					<div class="tier-cta tier-cta-tbd" aria-disabled="true">
						<svg
							viewBox="0 0 24 24"
							width="1em"
							height="1em"
							fill="none"
							stroke="currentColor"
							stroke-width="1.9"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="9" />
							<path d="M12 7v5l3.5 2" />
						</svg>
						{$t.tickets.ctaTbd}
					</div>
				</li>
			{/each}
		</ul>

		<ul class="notes reveal" use:reveal={{ delay: 240 }}>
			<li class="note">
				<svg
					class="note-icon"
					viewBox="0 0 24 24"
					width="1em"
					height="1em"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="9" />
					<path d="M12 11v5" />
					<path d="M12 8h.01" />
				</svg>
				<span>{$t.tickets.platformNote}</span>
			</li>
			<li class="note">
				<svg
					class="note-icon"
					viewBox="0 0 24 24"
					width="1em"
					height="1em"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path
						d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z"
					/>
				</svg>
				<span>{$t.tickets.speakerNote}</span>
			</li>
		</ul>
	</div>
</section>

<style>
	.tiers {
		list-style: none;
		padding: 0;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: clamp(1rem, 2.4vw, 1.5rem);
		align-items: stretch;
	}

	.tier {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		padding: clamp(1.7rem, 3vw, 2.2rem);
		transition:
			transform 0.3s var(--ease),
			border-color 0.3s var(--ease),
			background 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	.tier:hover {
		transform: translateY(-4px);
		border-color: var(--border-strong);
		background: var(--card-hover);
		box-shadow: var(--shadow-card);
	}

	/* Featured (early bird) — stands out with gradient border + glow */
	.tier.is-featured {
		background:
			var(--gradient-brand-soft),
			var(--bg-elevated);
		border-color: var(--border-strong);
		box-shadow: var(--shadow-glow);
	}
	.tier.is-featured:hover {
		transform: translateY(-6px);
		box-shadow: var(--shadow-glow), var(--shadow-card);
	}

	/* Personal supporter (Flutter Lover) — subtle accent, no glow */
	.tier.is-support {
		border-color: var(--border-strong);
	}

	/* Star ribbon on featured card */
	.ribbon {
		position: absolute;
		top: clamp(1.2rem, 3vw, 1.7rem);
		right: clamp(1.2rem, 3vw, 1.7rem);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		font-size: 1.1rem;
		border-radius: var(--r-full);
		background: var(--gradient-brand);
		color: #06121f;
		box-shadow: 0 8px 24px -10px var(--glow);
		pointer-events: none;
	}
	.ribbon svg {
		flex: none;
	}
	.ribbon-heart {
		background: var(--surface);
		color: var(--accent);
		border: 1px solid var(--border-strong);
		box-shadow: none;
	}

	.tier-head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.tier-badge {
		text-transform: uppercase;
	}
	.tier-badge-featured {
		border-color: var(--border-strong);
		background: rgba(255, 255, 255, 0.05);
		color: var(--text);
	}

	.tier-name {
		font-size: var(--fs-h3);
		letter-spacing: -0.02em;
	}

	.tier-price {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		line-height: 1;
	}

	.price-currency {
		font-family: var(--font-mono);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.price-num {
		font-weight: 800;
		font-size: clamp(2.6rem, 2rem + 2.8vw, 3.6rem);
		letter-spacing: -0.03em;
	}

	.price-text {
		font-weight: 800;
		font-size: clamp(2.1rem, 1.7rem + 2vw, 2.9rem);
		letter-spacing: -0.02em;
		color: var(--text);
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.feature {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.feature-check {
		flex: none;
		margin-top: 0.15em;
		color: var(--accent);
	}

	.tier-cta {
		margin-top: auto;
		width: 100%;
	}

	/* Purchase not open yet — non-interactive "coming soon" state */
	.tier-cta-tbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem 1.5rem;
		border-radius: var(--r-full);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--text-dim);
		border: 1px dashed var(--border-strong);
		background: rgba(255, 255, 255, 0.02);
		cursor: not-allowed;
		user-select: none;
	}

	/* Status badge in the header */
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.2rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
		padding: 0.35rem 0.8rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--r-full);
		background: rgba(84, 197, 248, 0.06);
	}
	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 var(--glow);
		animation: pulse-ring 2.4s ease-out infinite;
	}

	/* --- Small notes below the grid -------------------------------------- */
	.notes {
		list-style: none;
		padding: 0;
		margin-top: clamp(1.6rem, 3vw, 2.2rem);
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.note {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--text-dim);
	}

	.note-icon {
		flex: none;
		margin-top: 0.15em;
		color: var(--text-muted);
	}
	.note:first-child .note-icon {
		color: var(--accent);
	}
</style>
