export function entries() {
	return [
		{ slug: 'flutter-seoul-vibe-coding-hackathon-2026' },
		{ slug: 'flutter-seoul-open-stage-daegu-2026' },
		{ slug: 'flutter-korea-2025' },
		{ slug: 'flutter-alliance-2025' },
		{ slug: 'flutter-seoul-open-stage-april-2025' },
		{ slug: 'flutter-in-production-extended-seoul-2025' },
		{ slug: 'flutter-seoul-open-stage-november-2024' },
		{ slug: 'flutter-with-ai-seoul-2024' },
		{ slug: 'flutter-developer-meetup-seoul-2023' },
		{ slug: 'flutter-developer-networking-2023' },
		{ slug: 'flutter-forward-extended-korea-2023' },
		{ slug: 'flutter-seoul-meetup-sep-2022' }
	];
}

export function load({ params }) {
	return { slug: params.slug };
}
