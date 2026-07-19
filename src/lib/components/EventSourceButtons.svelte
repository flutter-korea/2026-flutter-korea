<script>
	let { links = [] } = $props();

	/** @type {Record<string, { logo: string; label: string }>} */
	const platformMap = {
		meetup: {
			logo: 'Meetup',
			label: 'Meetup에서 보기'
		},
		ticketa: {
			logo: 'Ticketaco',
			label: '티켓타코에서 보기'
		},
		eventus: {
			logo: 'event-us',
			label: '이벤터스에서 보기'
		}
	};
</script>

{#if links.length}
	<div class="source-buttons" aria-label="행사 원본 링크">
		{#each links as link (`${link.platform}-${link.href}`)}
			{@const platform = platformMap[link.platform]}
			{#if platform}
				<a
					class={`source-button source-button-${link.platform}`}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="source-logo" aria-hidden="true">{platform.logo}</span>
					<span>{platform.label}</span>
				</a>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.source-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 1rem;
	}

	.source-button {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		min-height: 42px;
		padding: 0.45rem 0.78rem;
		border: 1px solid var(--border);
		border-radius: var(--r-md);
		background: var(--white);
		color: var(--text);
		font-size: 0.9rem;
		font-weight: 800;
		transition:
			transform 0.2s var(--ease),
			border-color 0.2s var(--ease),
			box-shadow 0.2s var(--ease);
	}

	.source-button:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
		box-shadow: var(--glow);
	}

	.source-logo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		padding: 0 0.45rem;
		border-radius: 6px;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 900;
		letter-spacing: 0.02em;
		line-height: 1;
	}

	.source-button-meetup .source-logo {
		background: #f64060;
		color: #fff;
	}

	.source-button-ticketa .source-logo {
		background: rgb(249, 217, 73);
		color: #111827;
	}

	.source-button-eventus .source-logo {
		background: rgb(88, 64, 184);
		color: #fff;
	}
</style>
