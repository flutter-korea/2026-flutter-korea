<script>
	import { t, lang } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="tickets" class="section">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.tickets.kicker}</span>
			<h2 class="section-title">{$t.tickets.title}</h2>
			<p class="section-lead">{$lang === 'ko' ? '판매가 종료되었습니다. 감사합니다.' : 'Ticket sales have ended. Thank you.'}</p>
		</header>
	</div>
</section>
