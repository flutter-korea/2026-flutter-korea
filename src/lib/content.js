/**
 * Bilingual content for Flutter Korea 2026.
 * `dict.ko` and `dict.en` share an identical shape; components read the active
 * language via the `t` store (see i18n.js). Facts sourced from the official
 * event brief.
 */

/** Links used across the site. */
export const links = {
	// Call for Speakers — session proposal Google Form
	cfp: 'https://forms.gle/PGG9Kvd7Z7xkVPs3A',
	ticket: 'https://ticketa.co/event/c9xsstcs',
	ticketaco: 'https://ticketa.co/event/c9xsstcs',
	venueMap: 'https://maps.app.goo.gl/RSkiDXQxdRXUJqpA9',
	meetup: 'https://www.meetup.com/ko-kr/flutter-korea/',
	kakaoTalk: 'https://open.kakao.com/o/gdL2Gj1e',
	discord: 'https://flutter-seoul.com',
	email: 'mailto:flutter-seoul@googlegroups.com'
};

/** Internal route paths (prefix with `base` from $app/paths in components). */
export const routes = {
	home: '/',
	speakers: '/speakers',
	previousEvents: '/previous-events'
};

export const dict = {
	/* ======================================================================
	   KOREAN
	   ==================================================================== */
	ko: {
		meta: {
			langButton: 'EN',
			langButtonLabel: 'Switch to English'
		},

		announce: {
			text: '연사 모집 중 · 지금 바로 세션을 제안해 보세요'
		},

		countdown: {
			label: '행사까지 남은 시간',
			live: '지금 진행 중입니다',
			done: '함께해 주셔서 감사합니다',
			units: { days: '일', hours: '시간', minutes: '분', seconds: '초' }
		},

		nav: {
			brand: 'Flutter Korea 2026',
			links: [
				{ id: 'about', label: '소개', href: '#about' },
				{ id: 'sessions', label: '세션', href: '#sessions' },
				{ id: 'timetable', label: '타임테이블', href: '#timetable' },
				{ id: 'tickets', label: '티켓', href: '#tickets' },
				{ id: 'sponsors', label: '후원사', href: '#sponsors' },
				{ id: 'previous-events', label: '이전 행사 보기', href: '/previous-events' }
			],
			cta: '연사 지원',
			menu: '메뉴',
			close: '닫기'
		},

		hero: {
			badge: '2026. 11. 07 SAT · Seoul',
			sloganTop: 'Back to Basics,',
			sloganBottom: 'Move Forward',
			subtitle: '기술의 본질로 돌아가, 두려움 없이 미래를 정의하다',
			description:
				'변화가 일상이 된 시대. 단단한 기본기를 무기 삼아 AI와 함께 미래를 정의하는 하루. 지금은 이 무대를 채울 연사를 모집하고 있습니다.',
			ctaPrimary: '연사 지원하기',
			ctaSecondary: '행사 소개 보기',
			facts: [
				{ label: '일시', value: '2026.11.07 (토)' },
				{ label: '시간', value: '11:00 – 18:00' },
				{ label: '장소', value: 'AWS 코리아', href: links.venueMap },
				{ label: '주최', value: 'Flutter Seoul' }
			],
			scroll: 'Scroll'
		},

		overview: {
			kicker: 'Event Overview',
			title: '한눈에 보는 행사',
			lead: 'Flutter Korea 2026은 실전 기술 토크와 깊이 있는 교류가 결합된, 밀도 높은 하루입니다.',
			stats: [
				{ label: 'Date', value: '11.07', unit: 'SAT · 2026', note: '2026년 11월 7일 토요일' },
				{ label: 'Time', value: '11:00', unit: '– 18:00', note: '접수 10:30 시작' },
				{ label: 'Attendees', value: '100+', unit: '오프라인', note: '오프라인 100–150명 내외' },
				{ label: 'Host', value: 'Flutter', unit: 'Seoul', note: '주최 · 주관 Flutter Seoul' }
			]
		},

		about: {
			kicker: 'Why 2026',
			title: '‘전환’을 넘어, 본질과 미래로',
			paragraphs: [
				'지난 Flutter Korea 2025에서 우리는 수많은 ‘전환(Transition)’을 이야기했습니다. 네이티브에서 플러터로, 비개발자에서 개발자로, 그리고 AI라는 거대한 존재를 처음 마주하며 겪은 변화의 통증과 두려움을 솔직하게 꺼내 놓고 서로를 위로했습니다.',
				'1년이 지난 2026년, 우리는 과도기적 전환을 넘어 새로운 패러다임이 완전히 정착한 시대를 살고 있습니다. AI 에이전트와 협업하는 ‘바이브 코딩’은 일상이 되었고, 온디바이스 AI와 대형 모델 서빙은 플러터 위에서 역동적으로 융합되고 있습니다.',
				'하지만 변화가 일상이 된 시대에 우리는 또 다른 불안을 마주합니다. “쏟아지는 신기술 속에서 내 기본기는 단단한가?”, “기술의 속도가 나를 압도할 때 나는 어디로 나아가야 하는가?” Flutter Korea 2026은 바로 이 질문에서 출발합니다.'
			],
			compasses: [
				{
					tag: 'Compass 01',
					title: 'Back to Basics',
					subtitle: '본질로의 회귀',
					body: '도구가 화려해질수록 모바일 아키텍처, 렌더링 파이프라인, 상태 관리 등 ‘기본기’의 가치는 더욱 견고해집니다. 탄탄한 초석 위에서만 기술의 주도권을 쥘 수 있습니다.'
				},
				{
					tag: 'Compass 02',
					title: 'Move Forward',
					subtitle: '미래로의 도약',
					body: '단단한 기본기를 무기 삼아, AI 에이전트와의 능동적 협업과 크로스 플랫폼의 한계를 깨는 도전을 두려움 없이 수용하고 나아갑니다.'
				}
			],
			closing:
				'작년의 전환이 ‘용기 있는 시작’이었다면, 올해는 ‘단단한 본질을 바탕으로 미래를 정의하는 여정’이 될 것입니다.'
		},

		sessions: {
			kicker: 'Program',
			title: '세션',
			lead: '세션 라인업을 준비하고 있습니다. 지금은 연사를 모집하는 중이에요 — 여러분의 이야기로 무대를 채워 주세요.',
			comingSoon: {
				badge: '향후 공개 예정',
				title: '세션 라인업 준비 중',
				body: '엄선된 세션 라인업을 곧 공개합니다. 발표에 관심이 있다면 지금 연사로 지원해 무대의 주인공이 되어 주세요.'
			},
			cta: '연사 지원하기',
			mentoring: {
				badge: 'Confirmed · 60 min',
				title: '연차별 파이어사이드 챗',
				body: '일방향 발표가 아닌, 연차별 고민을 사전에 취합해 패널들과 진솔하게 대화하는 시간입니다. 주니어의 커리어 방향성, 미드레벨의 기술적 갈증, 시니어의 팀 리딩까지 — 지금 우리에게 필요한 이야기를 나눕니다.',
				tags: ['주니어 · 커리어', '미드레벨 · 기술', '시니어 · 리딩']
			}
		},

		timetable: {
			kicker: 'Timetable',
			title: '타임테이블',
			lead: '11:00부터 18:00까지, 하루를 가득 채우는 프로그램. 세부 타임테이블은 확정되는 대로 공개합니다.',
			frame: [
				{ label: 'DATE', value: '2026.11.07 (토)' },
				{ label: 'DOORS', value: '10:30 접수' },
				{ label: 'PROGRAM', value: '11:00 – 18:00' },
				{ label: 'VENUE', value: 'AWS 코리아 (센터필드 EAST 12층)' }
			],
			comingSoon: {
				badge: '향후 공개 예정',
				title: '상세 타임테이블 준비 중',
				body: '오프닝 키노트부터 클로징까지, 세션과 파이어사이드 챗으로 구성된 상세 일정표를 곧 공개합니다.'
			}
		},

		cfp: {
			kicker: 'Call for Speakers',
			title: '무대의 주인공을 찾습니다',
			body: '당신의 기본기와 도전 이야기를 Flutter Korea 2026 무대에서 나눠 주세요. 구글러부터 일반 세션 지원자까지 누구나 환영합니다.',
			perks: ['연사자는 티켓 구매 불필요', '공식 발표 슬라이드 템플릿 제공', '세션 주제 자유 제안'],
			cta: '연사 모집 자세히 보기',
			ctaNote: '지원 개요 페이지로 이동합니다',
			deadlineLabel: '모집 대상',
			deadline: '구글러 및 일반 세션 지원자'
		},

		tickets: {
			kicker: 'Tickets',
			title: '티켓',
			lead: 'Flutter Korea 2026 티켓 예매가 오픈되었습니다. 티켓타코(Ticketaco)에서 지금 바로 예매하세요.',
			statusBadge: '예매 오픈',
			cta: '티켓 예매하기',
			ctaTbd: '오픈 예정',
			currency: '₩',
			tiers: [
				{
					name: '얼리버드',
					price: '10,000',
					badge: '선착순 30장',
					featured: true,
					features: ['얼리버드 특별가', '선착순 30장 한정', '전 세션 및 파이어사이드 챗 입장']
				},
				{
					name: '일반',
					price: '20,000',
					badge: '최종 확정가',
					featured: false,
					features: ['전 세션 및 파이어사이드 챗 입장', '네트워킹', '후원사 부스 참여']
				},
				{
					name: 'Flutter Lover',
					price: '80,000',
					badge: '개인 후원',
					featured: false,
					support: true,
					features: ['전 세션 및 파이어사이드 챗 입장', '개인 후원자 명단 등재']
				}
			],
			platformNote: '예매 플랫폼 · 티켓타코(Ticketaco) 공식 이벤트 페이지',
			speakerNote: '연사자는 티켓 구매가 필요하지 않습니다.',
			venueNote: '행사 장소 · AWS 코리아 (서울 강남구 테헤란로 231 센터필드 EAST 12층 / 주차 지원 불가, 대중교통 이용 권장)',
			venueMapLinkText: '지도 보기',
			platformLinkText: '예매 바로가기'
		},

		sponsors: {
			kicker: 'Sponsors',
			title: '함께 만드는 사람들',
			lead: '후원은 커뮤니티가 계속 이어지게 하는 힘입니다. Flutter Korea 2026과 함께할 파트너를 찾고 있습니다.',
			comingSoon: {
				badge: '향후 공개 예정',
				title: '후원사 라인업 공개 예정',
				body: '행사를 함께 만들어 갈 후원사를 모시고 있습니다. 확정되는 대로 이곳에서 소개하겠습니다.'
			},
			ctaTitle: '후원사로 함께하시겠어요?',
			ctaBody: '국내 최대 규모의 Flutter 커뮤니티와 만나고, 브랜드를 개발자에게 각인시킬 기회입니다.',
			cta: '후원 문의하기'
		},

		speakerPage: {
			metaTitle: '연사 모집 · Flutter Korea 2026',
			metaDesc: 'Flutter Korea 2026 세션 제안 — 지원 가능 분야와 지원 방법 안내.',
			kicker: 'Call for Speakers',
			title: 'Flutter Korea 2026\n세션을 제안하세요',
			intro:
				'Flutter 생태계에 대한 흥미롭고, 기술적이며, 혁신적인 발표를 찾고 있습니다. 여러분의 세션 제안을 기다립니다. 구글러부터 첫 발표에 도전하는 분까지 누구나 환영합니다.',
			dateLabel: '행사일',
			date: '2026년 11월 7일 (토)',
			levelsTitle: '난이도 · Target Audience Level',
			levels: [
				{ name: 'Beginner', desc: '입문 · 기초 (Introduction / Fundamentals)' },
				{ name: 'Intermediate', desc: '응용 · 일반 패턴 (Applied skills / Common patterns)' },
				{ name: 'Advanced', desc: '아키텍처 · 심화 · 내부 구조 (Architecture / Deep Dive / Internals)' }
			],
			categoriesTitle: '지원 가능 분야 · Session Category',
			categories: [
				'State Management',
				'Performance Optimization',
				'UI/UX & Design',
				'Backend / Firebase Integration',
				'Testing & CI/CD',
				'Platform Specific (Web/Desktop/Mobile)',
				'Dart Language Features',
				'Case Studies / Real-world Apps',
				'Package Development',
				'AI, GenAI, Agents',
				'Other'
			],
			submitTitle: '지원 시 작성 항목',
			submitItems: [
				'성함 · 이메일',
				'세션 제목',
				'난이도',
				'세션 주제 분야',
				'세션 간략 소개 (Abstract)',
				'발표 경험',
				'라이브 데모 포함 여부',
				'SNS · GitHub (선택)'
			],
			perksTitle: '연사 혜택',
			perks: ['연사 티켓 무료 제공', '공식 발표 슬라이드 템플릿 제공', '세션 주제 자유 제안'],
			applyCta: '지원하기',
			applyNote: 'Google Form으로 이동합니다',
			back: '홈으로 돌아가기'
		},

		previousEventsPage: {
			metaTitle: '이전 행사 · Flutter Korea 2026',
			metaDesc: 'Flutter Korea와 Flutter Seoul이 이어 온 지난 행사를 살펴보세요.',
			kicker: 'Previous Events',
			title: '이전 행사 보기',
			intro: 'Flutter Seoul과 함께 만들어 온 지난 Flutter 행사를 모았습니다.',
			back: '홈으로 돌아가기',
			eventsTitle: '행사 목록',
			detailCta: '행사 자세히 보기',
			listBack: '이전 행사 목록',
			scheduleLabel: '타임테이블',
			imagePendingLabel: '이미지를\n준비중입니다.',
			events: [
				{
					slug: 'flutter-seoul-vibe-coding-hackathon-2026',
					year: '2026',
					name: 'Flutter Seoul Meetup 바이브코딩 해커톤',
					theme: 'Vibe Coding Hackathon',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-vibe-coding-hackathon-thumbnail.webp',
					intro: 'AI 코딩 에이전트와 함께 아이디어를 앱으로 만들어 보는 Flutter Seoul 해커톤입니다.',
					date: '2026년 4월 25일 (토) 13:00 ~ 18:00',
					venue: '가천대학교 가천관 701호',
					venueUrl: 'https://ticketa.co/venues/105',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/ycbz77ae' }],
					summary:
						'개발자뿐 아니라 기획자, 디자이너, AI와 바이브 코딩에 관심 있는 누구나 참여할 수 있었던 밋업형 해커톤입니다. AI Harness, Widget Craft, Wild Card 세 트랙으로 아이디어를 만들고 공유했습니다.',
					status: '지난 행사',
					stats: ['13:00 시작', '3개 트랙', '18:00 종료'],
					schedule: [
						{ time: '13:00 - 13:30', room: '', lang: '', kind: 'opening', title: '환영 인사 및 아이디어 피칭', subtitle: '아이스브레이킹 & 팀 빌딩', speaker: '', org: '' },
						{ time: '13:30 - 17:30', room: '', lang: '', kind: 'workshop', title: 'Vibe Coding Hackathon', subtitle: 'AI Harness · Widget Craft · Wild Card', speaker: '', org: '' },
						{ time: '17:30 - 18:00', room: '', lang: '', kind: 'closing', title: '결과물 공유 및 데모 시연, 시상', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-daegu-2026',
					year: '2026',
					name: 'Flutter Seoul 오픈스테이지 (대구편)',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-open-stage-daegu-thumbnail.png',
					intro: 'Flutter Seoul이 지역 Flutter 개발자들과 함께 만든 대구 오픈스테이지입니다.',
					date: '2026년 1월 24일 (토) 12:00 ~ 18:00',
					venue: '대구 동구 동대구로 475 1동 대회의실',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/118042' }],
					summary:
						'지역 개발자와 함께 최신 Flutter 기술과 AI를 활용한 Flutter 앱 경험을 나눈 오픈스테이지 행사입니다. 발표자에게 무대를 열고 4~5개 세션으로 구성되었습니다.',
					status: '지난 행사',
					stats: ['12:00 시작', '4~5개 세션', '18:00 종료'],
					schedule: [
						{ time: '12:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter Seoul 오픈스테이지', subtitle: '최신 Flutter 기술 및 AI를 활용하는 Flutter App 관련 세션', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-korea-2025',
					year: '2025',
					name: 'Flutter Korea 2025: Transition',
					theme: 'Transition',
					type: 'Conference',
					image: '/assets/previous-events/flutter-korea-2025-thumbnail.png',
					intro: '전 세계 개발자들이 사랑하는 크로스 플랫폼 모바일 프레임워크 플러터! 🚀',
					date: '2025년 10월 25일 (토) 13:00',
					venue: '구글스타트업캠퍼스',
					venueUrl: 'https://naver.me/xCB7C3ew',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/54eedplg' }],
					summary:
						'국내 Flutter 커뮤니티가 전환의 순간을 함께 짚은 행사입니다. Gemini CLI, 접근성, Deeplinking, gRPC, 서비스 종료 경험담, 피어사이드챗까지 실전 중심의 세션으로 구성되었습니다.',
					status: '지난 행사',
					stats: ['12:00 접수', '8개 세션', '피어사이드챗'],
					schedule: [
						{ time: '12:00', room: '', lang: '', kind: 'reception', title: '접수', subtitle: '', speaker: '', org: '' },
						{ time: '13:00', room: '', lang: '', kind: 'keynote', title: '오프닝 키노트', subtitle: '', speaker: '송승현', org: '플러터 서울 리드오거나이저' },
						{ time: '13:10', room: '', lang: '', kind: 'talk', title: 'Accelerate your Flutter development with Gemini CLI', subtitle: '', speaker: 'Brett Morgan', org: 'Google' },
						{ time: '13:50', room: '', lang: '', kind: 'talk', title: 'thorvg.flutter를 소개합니다!', subtitle: 'lottie에서 thorvg로, 사용자에서 기여자로', speaker: '권태형', org: '고려대학교' },
						{ time: '14:30', room: '', lang: '', kind: 'talk', title: 'Focus & TTS로 구현한 3계층 접근성 패턴, 시각 장애인도 사용 가능한 앱 만들기', subtitle: 'Barrier-Free Kiosk', speaker: '이상훈', org: '발트루스트' },
						{ time: '15:10', room: '', lang: '', kind: 'talk', title: 'Deeplinking', subtitle: '', speaker: '정주홍', org: 'AB180 Head of Engineering' },
						{ time: '15:50', room: '', lang: '', kind: 'talk', title: 'REST에 익숙한 내가 gRPC 세상에서는 신입인 세상에서', subtitle: '', speaker: '송민우', org: '다날' },
						{ time: '16:30', room: '', lang: '', kind: 'talk', title: '천재 개발자 되는 법', subtitle: '', speaker: '박성수', org: '기산전자(주)' },
						{ time: '17:10', room: '', lang: '', kind: 'talk', title: '안녕하세요. 고객님 서비스 종료를 안내드립니다', subtitle: '', speaker: '가애KAAE', org: '플러터 서울' },
						{ time: '17:40', room: '', lang: '', kind: 'closing', title: '피어사이드챗 및 클로징 키노트', subtitle: '', speaker: '박제창', org: '플러터 서울, Flutter GDE' }
					]
				},
				{
					slug: 'flutter-alliance-2025',
					year: '2025',
					name: 'Flutter Alliance 2025',
					theme: 'Flutter Alliance',
					type: 'Alliance',
					organizer: 'Flutter Seoul x Flutter Tokyo',
					image: '/assets/previous-events/flutter-alliance-2025-thumbnail.png',
					intro: 'APAC 지역 Flutter 개발자를 위한 컨퍼런스가 올해 첫 서울에서 개최됩니다.',
					date: '2025년 10월 19일 (일) 10:30 ~ 18:00',
					venue: '한국마이크로소프트',
					venueUrl: 'https://naver.me/GQ1l2wGh',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/pdaedwz3' }],
					summary:
						'Room A, B, C 세 트랙으로 구성된 국제 Flutter 행사입니다. Google, Flutter Seoul, Flutter Taipei, Flutter Tokyo 등 여러 커뮤니티와 발표자가 AI, UX, 상태관리, 지도, Riverpod을 다뤘습니다.',
					status: '지난 행사',
					stats: ['10:30 키노트', '3개 트랙', '18:00 종료'],
					schedule: [
						{ time: '10:30 - 11:00', room: '', lang: '', kind: 'keynote', title: 'Keynote', subtitle: '', speaker: 'Dreamwalker · Masahiro Aoki · Yii Chen', org: 'GDE Flutter & Flutter Seoul · Flutter Taipei' },
						{ time: '11:00 - 11:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Accelerate your Flutter development with Gemini CLI', subtitle: 'Gemini CLI로 Flutter 개발 속도 가속화하기', speaker: 'Brett Morgan', org: 'Google' },
						{ time: '11:30 - 12:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Getting Started with On-Device AI in Flutter', subtitle: 'Flutter에서 온디바이스 AI 시작하기', speaker: 'Dreamwalker (jaichangpark)', org: 'GDE Flutter & Flutter Seoul' },
						{ time: '12:00 - 12:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'AnimatedTo Changes Your Moving Animations, but How?', subtitle: 'AnimatedTo가 움직이는 애니메이션을 바꾼다, 그런데 어떻게?', speaker: 'Tsuyoshi Chujo', org: 'Freelance Flutter Developer' },
						{ time: '12:30 - 14:00', room: '', lang: '', kind: 'break', title: 'Networking', subtitle: '', speaker: '', org: '' },
						{ time: '14:00 - 14:30', room: 'Room A', lang: 'KR', kind: 'talk', title: 'Connect any LLM to your backend API with no code change', subtitle: '코드 수정 없이 LLM을 백엔드 API에 연결하기', speaker: 'Justin Yoo', org: 'Microsoft' },
						{ time: '14:00 - 14:30', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Streamlining Development with the Monorepo Ecosystem', subtitle: '모노레포 생태계로 개발 간소화하기', speaker: 'Adam Eba', org: 'NekoLogic' },
						{ time: '14:00 - 14:30', room: 'Room C', lang: 'KR', kind: 'workshop', title: 'Vibe Coding? Vibe Debugging', subtitle: '바이브 코딩? 바이브 디버깅! 바이브 코딩 이후 디버깅 마저 입으로 하는 핸즈온입니다', speaker: 'Song SeungHyeon', org: 'Flutter Seoul' },
						{ time: '14:30 - 15:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Accelerating Flutter UI Development with Figma Dev Mode MCP × Claude Code', subtitle: 'Figma Dev Mode MCP X Claude Code로 Flutter UI 개발 가속화하기', speaker: 'Yuta Asada', org: 'Flutter Tokyo' },
						{ time: '14:30 - 15:00', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Less State, More Flutter', subtitle: '상태는 줄이고, 플러터답게 개발하기', speaker: 'nine', org: 'Flutter Seoul' },
						{ time: '15:00 - 15:10', room: '', lang: '', kind: 'break', title: 'Break Time', subtitle: '', speaker: '', org: '' },
						{ time: '15:10 - 15:40', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Beyond Features: Building Apps with Exceptional User Experience', subtitle: '기능을 넘어: 뛰어난 사용자 경험을 가진 앱 만들기', speaker: 'Yii Chen', org: 'Flutter Taipei' },
						{ time: '15:10 - 15:40', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Applying Shorebird to a Real-Time Tournament App', subtitle: '실시간 토너먼트 앱에 Shorebird 적용하기', speaker: 'Maro Kim', org: 'Flutter Incheon' },
						{ time: '15:10 - 15:40', room: 'Room C', lang: 'KR', kind: 'talk', title: 'Migrating Flutter State Management with Cursor', subtitle: 'Cursor로 플러터 상태관리 라이브러리 마이그레이션하기', speaker: 'Serim Jeon', org: 'Flutter Seoul' },
						{ time: '15:40 - 16:10', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Art and Code Collide: Creative Coding with Flutter', subtitle: '예술과 코드의 만남: Flutter로 즐기는 크리에이티브 코딩', speaker: 'Rutvik Tak', org: 'Pieces.app' },
						{ time: '15:40 - 16:10', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Designing Borderless UX in Flutter: Insights from 50 Countries', subtitle: 'Flutter로 만드는 경계 없는 UX 디자인: 50개국에서 얻은 인사이트', speaker: 'Kenichi Kambara', org: 'NTT TechnoCross' },
						{ time: '16:10 - 16:20', room: '', lang: '', kind: 'break', title: 'Break Time', subtitle: '', speaker: '', org: '' },
						{ time: '16:20 - 16:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Why MapLibre: Flexibility and the Freedom to Unlock Full Potential in Flutter Apps with Maps', subtitle: '왜 MapLibre인가: Flutter 지도 앱의 잠재력을 여는 자유와 유연성', speaker: 'Ryutaro Iseki', org: 'YUMEMI Inc.' },
						{ time: '16:30 - 17:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'AI Debate Club', subtitle: 'AI 토론 클럽', speaker: 'Sasha Denisov', org: 'EPAM' },
						{ time: '17:00 - 17:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Riverpod 3.0', subtitle: '', speaker: 'Remi Rousselet', org: '' },
						{ time: '17:30 - 18:00', room: '', lang: '', kind: 'closing', title: 'Closing (10min) + Quiz (20min)', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-april-2025',
					year: '2025',
					name: 'Flutter Seoul 오픈스테이지(4월)',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-open-stage-april-2025-thumbnail.png',
					intro: 'Flutter 개발자뿐 아니라 다양한 기술과 경험을 가진 모두에게 열린 무대입니다.',
					date: '2025년 4월 19일 (토) 12:00 ~ 16:00',
					venue: '워크토크 강남본점 2층',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/101034' }],
					summary:
						'지식을 나누고 싶었던 사람과 Flutter 개발자들이 모여 API 디버깅, GetX, Bloc, C++ 브리지, Firebase, 개발 환경 자동화 등 다양한 경험을 공유한 오픈스테이지입니다.',
					status: '지난 행사',
					stats: ['12:00 시작', '7개 발표', '16:00 종료'],
					schedule: [
						{ time: '세션 1', room: '', lang: '', kind: 'talk', title: 'API 디버깅 응급조치!', subtitle: '', speaker: 'JY', org: '' },
						{ time: '세션 2', room: '', lang: '', kind: 'talk', title: '파란만장 Flutter 현업 생존기', subtitle: 'feat. GetX', speaker: '박준우', org: '' },
						{ time: '세션 3', room: '', lang: '', kind: 'talk', title: 'Bloc 클린 아키텍처 구현기', subtitle: '', speaker: 'woong.2', org: '' },
						{ time: '세션 4', room: '', lang: '', kind: 'talk', title: 'Flutter와 C++ 코드 간의 브리지 작성 경험', subtitle: '', speaker: '박종민', org: '' },
						{ time: '세션 5', room: '', lang: '', kind: 'talk', title: 'Flutter, Firebase로 macOS 프로그램 개발, 배포', subtitle: '', speaker: '장영하(마이)', org: '' },
						{ time: '세션 6', room: '', lang: '', kind: 'talk', title: 'Trunk는 시작일 뿐: Flutter 개발 환경 자동화 실전기', subtitle: '', speaker: '유동민', org: '' },
						{ time: '세션 7', room: '', lang: '', kind: 'talk', title: 'Flutter를 기반으로한 피지컬 디바이스 코딩 툴 - 웹 앱', subtitle: '', speaker: '윤민혁', org: '' }
					]
				},
				{
					slug: 'flutter-in-production-extended-seoul-2025',
					year: '2025',
					name: 'Flutter In Production Extended Seoul',
					theme: 'Flutter In Production',
					type: 'Extended',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-in-production-extended-seoul-thumbnail.png',
					intro: 'Flutter In Production의 서울 지역 확장 행사입니다.',
					date: '2025년 1월 11일 (토) 12:00 ~ 18:00',
					venue: '한국마이크로소프트 13층',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/96401' }],
					summary:
						'Flutter In Production에서 공개된 내용을 돌아보고 Flutter 3.27, webOS TV, AI 백엔드, Riverpod, monorepo, DevTools, Remote Config 등 실무 주제를 다룬 서울 확장 행사입니다.',
					status: '지난 행사',
					stats: ['12:00 시작', '9개 세션', '18:00 종료'],
					schedule: [
						{ time: '12:00 - 12:30', room: '', lang: '', kind: 'talk', title: 'Wrap up Flutter in Product & Flutter 3.27', subtitle: '', speaker: '류지영 / 송승현', org: 'Flutter Seoul' },
						{ time: '12:35 - 13:15', room: '', lang: '', kind: 'talk', title: 'webOS TV에서 Flutter를 채택한 이유', subtitle: '', speaker: '이동영', org: 'LG Electronics' },
						{ time: '13:25 - 14:05', room: '', lang: '', kind: 'talk', title: 'Flutter를 위한 AI 백엔드 앱 만들어보기, 그런데 Semantic Kernel을 곁들인', subtitle: 'feat. Semantic Kernel', speaker: '유저스틴', org: 'Microsoft' },
						{ time: '14:10 - 14:40', room: '', lang: '', kind: 'talk', title: '위의 백엔드를 Flutter에서 Riverpod + Dio + Retrofit 으로 소통하기', subtitle: '', speaker: 'CuroGom', org: 'Flutter Seoul' },
						{ time: '14:50 - 15:10', room: '', lang: '', kind: 'talk', title: 'Pub workspaces로 monorepo 구성하기', subtitle: '', speaker: '박제창', org: 'Flutter Seoul' },
						{ time: '15:15 - 15:35', room: '', lang: '', kind: 'talk', title: '프리뷰 widget_preview', subtitle: '', speaker: 'Aiden', org: 'Flutter Seoul' },
						{ time: '15:35 - 16:15', room: '', lang: '', kind: 'talk', title: 'Flutter 개발에서 DevTools를 활용하는 이유', subtitle: '', speaker: '천정환', org: 'Flutter Seoul' },
						{ time: '16:20 - 17:00', room: '', lang: '', kind: 'talk', title: '그 서비스가 운영되는 법', subtitle: '', speaker: '가애KAAE', org: '' },
						{ time: '17:05 - 17:45', room: '', lang: '', kind: 'talk', title: 'Remote Config를 이용하여 효율적이고 탄력적인 배너 제공하기', subtitle: '', speaker: '남상혁', org: 'LINE+ ABC Studio' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-november-2024',
					year: '2024',
					name: 'Flutter Seoul 오픈스테이지',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/flutter-seoul/dash-right.svg',
					imagePending: true,
					intro: 'Flutter에 관심 있는 누구나 연사로 참여해 경험과 노하우를 공유한 오픈스테이지입니다.',
					date: '2024년 11월 8일 (금) 13:00 ~ 19:00',
					venue: '한빛미디어 강의장 40',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/93958' }],
					summary:
						'상태관리, 온디바이스 AI, 백엔드 개발자의 Flutter 전환, 딥링크, 1인 앱 개발 등 여러 주제를 Flutter 커뮤니티가 함께 나눈 오픈스테이지입니다.',
					status: '지난 행사',
					stats: ['13:00 시작', '9개 발표', '19:00 종료'],
					schedule: [
						{ time: '세션 1', room: '', lang: '', kind: 'talk', title: '상태관리 패키지를 쓰지 않고 내가 후회하지 않는 이유', subtitle: '', speaker: '서보일', org: '' },
						{ time: '세션 2', room: '', lang: '', kind: 'talk', title: 'Flutter에서 서버 없이 인공지능 모델 활용하기', subtitle: '', speaker: '장영하', org: '' },
						{ time: '세션 3', room: '', lang: '', kind: 'talk', title: '이게 왜 안되지?', subtitle: '', speaker: '이웅재', org: '' },
						{ time: '세션 4', room: '', lang: '', kind: 'talk', title: 'Flutter를 선택한 이유와 백엔드 개발자로의 전환 과정', subtitle: '', speaker: '백종인', org: '' },
						{ time: '세션 5', room: '', lang: '', kind: 'talk', title: '플러터로 플러팅해서 연애한 썰푼다', subtitle: '', speaker: '송승현', org: '' },
						{ time: '세션 6', room: '', lang: '', kind: 'talk', title: '유부남 개발자 생존기', subtitle: '', speaker: 'Aiden', org: '' },
						{ time: '세션 7', room: '', lang: '', kind: 'talk', title: '1인 앱 개발자로서의 커리어', subtitle: '', speaker: '유진의', org: '' },
						{ time: '세션 8', room: '', lang: '', kind: 'talk', title: '개발을 거치지 않고 딥링크 활용하게 하기', subtitle: '', speaker: '전세림 (가애KAAE)', org: '' },
						{ time: '세션 9', room: '', lang: '', kind: 'talk', title: '회사에서 사용하는 유용한 라이브러리 및 서비스', subtitle: '', speaker: '정태훈', org: '' }
					]
				},
				{
					slug: 'flutter-with-ai-seoul-2024',
					year: '2024',
					name: 'Flutter with AI 2024 Seoul',
					theme: 'Flutter with AI',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-with-ai-seoul-2024-thumbnail.jpeg',
					intro: '모바일 개발자의 시선에서 생성형 AI와 LLM을 Flutter 제품에 어떻게 활용할지 함께 고민한 행사입니다.',
					date: '2024년 5월 11일 (토) 13:00 ~ 18:00',
					venue: '프로그래머스 강의장',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/300585494/' }],
					summary:
						'AI 용어부터 AI 적용기, AI 세션과 일반 Flutter 세션까지 총 5개의 세션으로 구성된 Flutter Seoul 행사입니다.',
					status: '지난 행사',
					stats: ['13:00 시작', '5개 세션', '18:00 종료'],
					schedule: [
						{ time: '13:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter with AI 2024 Seoul', subtitle: 'AI와 Flutter 제품 활용을 다룬 5개 세션', speaker: '', org: 'Flutter Seoul' }
					]
				},
				{
					slug: 'flutter-developer-meetup-seoul-2023',
					year: '2023',
					name: 'Flutter Developer Meetup - Seoul',
					theme: 'Developer Meetup',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-developer-meetup-seoul-2023-thumbnail.jpeg',
					intro: '퇴근 후 미니 세션과 네트워킹으로 Flutter 경험을 나눈 개발자 밋업입니다.',
					date: '2023년 11월 10일 (금) 19:00 ~ 22:00',
					venue: 'Google for Startups Campus',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/297114474' }],
					summary:
						'Flutter Seoul 뉴스레터, 플러그인 제작기, 패키지 탐구, 네이티브에서 Flutter로의 전환 로드맵 등 짧은 세션과 네트워킹으로 구성된 밋업입니다.',
					status: '지난 행사',
					stats: ['19:00 시작', '5개 미니 세션', '22:00 종료'],
					schedule: [
						{ time: '19:00 - 19:15', room: '', lang: '', kind: 'keynote', title: '키노트', subtitle: '', speaker: '', org: '' },
						{ time: '19:15 - 19:30', room: '', lang: '', kind: 'talk', title: 'Flutter Seoul 뉴스레터 리뷰', subtitle: '', speaker: 'HDD', org: '' },
						{ time: '19:30 - 19:50', room: '', lang: '', kind: 'talk', title: '내가 플러그인을 만들게 된 이유', subtitle: '', speaker: 'nine', org: '' },
						{ time: '20:00 - 20:20', room: '', lang: '', kind: 'talk', title: '흥미로운 패키지 파헤쳐보기', subtitle: '', speaker: '송승현', org: '' },
						{ time: '20:20 - 20:40', room: '', lang: '', kind: 'talk', title: '비둘기', subtitle: '', speaker: '박제창', org: '' },
						{ time: '20:40 - 21:00', room: '', lang: '', kind: 'talk', title: '네이티브에서 플러터로: 주니어 개발자와 팀장을 위한 로드맵', subtitle: '', speaker: '양수장', org: '' },
						{ time: '21:00 - 22:00', room: '', lang: '', kind: 'networking', title: '네트워킹', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-developer-networking-2023',
					year: '2023',
					name: 'Flutter Developer Networking',
					theme: 'Networking',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-developer-networking-2023-thumbnail.jpeg',
					intro: 'Flutter 개발자들이 미니 세션, 레크리에이션, 네트워킹으로 만난 오프라인 행사입니다.',
					date: '2023년 7월 30일 (일) 17:00 ~ 19:00',
					venue: '블랙홀',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/294961836/' }],
					summary:
						'Flutter를 사랑하는 사람들이 모여 미니 세션과 레크리에이션, 네트워킹을 함께한 Flutter Seoul 개발자 네트워킹 행사입니다.',
					status: '지난 행사',
					stats: ['17:00 시작', '네트워킹', '19:00 종료'],
					schedule: [
						{ time: '17:00 - 19:00', room: '', lang: '', kind: 'networking', title: 'Flutter Developer Networking', subtitle: '미니 세션 · 레크리에이션 · 네트워킹', speaker: '', org: 'Flutter Seoul' }
					]
				},
				{
					slug: 'flutter-forward-extended-korea-2023',
					year: '2023',
					name: 'Flutter Forward Extended Korea',
					theme: 'Flutter Forward',
					type: 'Extended',
					organizer: 'Flutter Korea',
					image: '/assets/previous-events/flutter-forward-extended-korea-2023-thumbnail.jpeg',
					intro: 'Flutter Forward의 내용을 한국 Flutter 개발자들과 함께 나눈 확장 행사입니다.',
					date: '2023년 4월 1일 (토) 13:00 ~ 18:00',
					venue: '건국대학교 학생회관',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/291459777/' }],
					summary:
						'Flutter 3.7, Impeller, Dart 3a 등 업데이트를 소개하고 국내 Flutter 서비스, 채용 부스, 네트워킹을 함께 준비한 Flutter Forward 확장 행사입니다.',
					status: '지난 행사',
					stats: ['13:00 시작', '채용 부스', '18:00 종료'],
					schedule: [
						{ time: '13:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter Forward Extended Korea', subtitle: 'Flutter 업데이트 소개 · 국내 서비스 · 채용 부스 · 네트워킹', speaker: '', org: 'Flutter Korea' }
					]
				},
				{
					slug: 'flutter-seoul-meetup-sep-2022',
					year: '2022',
					name: 'Flutter Seoul MeetUp. SEP',
					theme: 'Networking',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-meetup-sep-2022-thumbnail.jpeg',
					intro: 'Flutter를 주제로 자유롭게 이야기를 나눈 오프라인 네트워킹 자리입니다.',
					date: '2022년 9월 18일 (일) 14:00 ~ 16:00',
					venue: '양화로 165 3층',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/288200236/' }],
					summary:
						'별도의 세션이나 아젠다 없이 Flutter를 공부하고 조사하고 개발하는 사람들이 모여 가볍게 담소를 나눈 Flutter Seoul 오프라인 밋업입니다.',
					status: '지난 행사',
					stats: ['14:00 시작', '자유 네트워킹', '16:00 종료'],
					schedule: [
						{ time: '14:00 - 16:00', room: '', lang: '', kind: 'networking', title: 'Flutter 자유 네트워킹', subtitle: '세션 없이 Flutter 이야기를 나누는 오프라인 자리', speaker: '', org: 'Flutter Seoul' }
					]
				}
			],
			noteTitle: '아카이브를 계속 확장합니다',
			noteBody:
				'발표 자료, 사진, 영상 등 공개 가능한 기록이 정리되는 대로 같은 형식으로 이어서 추가하겠습니다.'
		},

		footer: {
			tagline: '기술의 본질로 돌아가, 두려움 없이 미래를 정의하다.',
			madeBy: 'Organized by',
			org: 'Flutter Seoul',
			nav: '바로가기',
			connect: '연락처',
			speakers: '연사 모집',
			rights: '© 2026 Flutter Seoul · Flutter Korea 2026',
			trademark:
				'Flutter와 Flutter 로고는 Google LLC의 상표입니다. 본 행사는 커뮤니티가 운영하는 비영리 행사입니다.',
			backToTop: '맨 위로'
		}
	},

	/* ======================================================================
	   ENGLISH
	   ==================================================================== */
	en: {
		meta: {
			langButton: 'KR',
			langButtonLabel: '한국어로 전환'
		},

		announce: {
			text: 'Call for Speakers is open · Propose your session now'
		},

		countdown: {
			label: 'Until the event',
			live: 'Happening right now',
			done: 'Thanks for being part of it',
			units: { days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' }
		},

		nav: {
			brand: 'Flutter Korea 2026',
			links: [
				{ id: 'about', label: 'About', href: '#about' },
				{ id: 'sessions', label: 'Sessions', href: '#sessions' },
				{ id: 'timetable', label: 'Timetable', href: '#timetable' },
				{ id: 'tickets', label: 'Tickets', href: '#tickets' },
				{ id: 'sponsors', label: 'Sponsors', href: '#sponsors' },
				{ id: 'previous-events', label: 'Previous Events', href: '/previous-events' }
			],
			cta: 'Apply to Speak',
			menu: 'Menu',
			close: 'Close'
		},

		hero: {
			badge: 'NOV 7, 2026 SAT · Seoul',
			sloganTop: 'Back to Basics,',
			sloganBottom: 'Move Forward',
			subtitle: 'Return to the essence of technology, and fearlessly define the future.',
			description:
				'In an era where change is the default, we spend a day defining the future with AI — armed with unshakable fundamentals. Right now, we’re recruiting the speakers to fill this stage.',
			ctaPrimary: 'Apply to Speak',
			ctaSecondary: 'Learn More',
			facts: [
				{ label: 'Date', value: 'Sat, Nov 7, 2026' },
				{ label: 'Time', value: '11:00 – 18:00' },
				{ label: 'Venue', value: 'AWS Korea', href: links.venueMap },
				{ label: 'Host', value: 'Flutter Seoul' }
			],
			scroll: 'Scroll'
		},

		overview: {
			kicker: 'Event Overview',
			title: 'The event at a glance',
			lead: 'Flutter Korea 2026 packs real-world tech talks and meaningful exchange into one dense, focused day.',
			stats: [
				{ label: 'Date', value: '11.07', unit: 'SAT · 2026', note: 'Saturday, November 7, 2026' },
				{ label: 'Time', value: '11:00', unit: '– 18:00', note: 'Registration opens 10:30' },
				{ label: 'Attendees', value: '100+', unit: 'in person', note: 'Around 100–150 on-site' },
				{ label: 'Host', value: 'Flutter', unit: 'Seoul', note: 'Hosted & organized by Flutter Seoul' }
			]
		},

		about: {
			kicker: 'Why 2026',
			title: 'From ‘Transition’ to Basics & Future',
			paragraphs: [
				'At Flutter Korea 2025 we shared stories of ‘Transition’ — migrating from native to Flutter, pivoting careers into development, and facing the sudden rise of AI. We found comfort and solidarity in opening up about our fears of change.',
				'One year later, in 2026, those transitions have fully settled into a new paradigm. ‘Vibe coding’ — co-developing with AI agents — is a daily reality, and on-device AI and large-model serving are dynamically merging within the Flutter ecosystem.',
				'Yet when change is the default, a different anxiety appears: “Are my fundamentals strong enough for this flood of new tech?” and “Where do I go when the pace threatens to overwhelm me?” Flutter Korea 2026 starts with exactly these questions.'
			],
			compasses: [
				{
					tag: 'Compass 01',
					title: 'Back to Basics',
					subtitle: 'Return to fundamentals',
					body: 'The more sophisticated our tools become, the more critical the fundamentals — architecture, rendering pipelines, state management. Only on solid ground can we keep ownership of our craft.'
				},
				{
					tag: 'Compass 02',
					title: 'Move Forward',
					subtitle: 'A leap into the future',
					body: 'Armed with those unshakable fundamentals, we fearlessly embrace collaboration with AI agents and push past the limits of cross-platform technology.'
				}
			],
			closing:
				'If last year’s transition was the ‘courage to start,’ this year is the journey of ‘defining the future on solid fundamentals.’'
		},

		sessions: {
			kicker: 'Program',
			title: 'Sessions',
			lead: 'The session lineup is in the works. Right now we’re recruiting speakers — help us fill the stage with your story.',
			comingSoon: {
				badge: 'To be announced',
				title: 'Session lineup in the works',
				body: 'A curated lineup is coming soon. If you’d like to present, apply to speak now and take the stage.'
			},
			cta: 'Apply to Speak',
			mentoring: {
				badge: 'Confirmed · 60 min',
				title: 'Fireside Chat by Career Level',
				body: 'Not a one-way talk, but an honest conversation with panelists built from questions gathered in advance — junior career direction, mid-level technical thirst, senior team leadership. The talk we all need right now.',
				tags: ['Junior · Career', 'Mid · Craft', 'Senior · Leading']
			}
		},

		timetable: {
			kicker: 'Timetable',
			title: 'Timetable',
			lead: 'From 11:00 to 18:00, a full day of program. The detailed timetable will be published once confirmed.',
			frame: [
				{ label: 'DATE', value: 'Sat, Nov 7, 2026' },
				{ label: 'DOORS', value: '10:30 check-in' },
				{ label: 'PROGRAM', value: '11:00 – 18:00' },
				{ label: 'VENUE', value: 'AWS Korea (Centerfield East 12F)' }
			],
			comingSoon: {
				badge: 'To be announced',
				title: 'Detailed timetable in the works',
				body: 'From opening keynote to closing, the full schedule of sessions and the fireside chat is coming soon.'
			}
		},

		cfp: {
			kicker: 'Call for Speakers',
			title: 'We’re looking for the next voice on stage',
			body: 'Share your story of fundamentals and bold challenges on the Flutter Korea 2026 stage. Everyone is welcome — from Googlers to first-time speakers.',
			perks: ['Speakers attend free', 'Official slide template provided', 'Propose your own topic'],
			cta: 'View Call for Speakers',
			ctaNote: 'Go to the speaker overview page',
			deadlineLabel: 'Who can apply',
			deadline: 'Googlers & open session applicants'
		},

		tickets: {
			kicker: 'Tickets',
			title: 'Tickets',
			lead: 'Tickets for Flutter Korea 2026 are now available. Get your tickets now on Ticketaco.',
			statusBadge: 'Tickets Available',
			cta: 'Get Tickets',
			ctaTbd: 'Coming soon',
			currency: '₩',
			tiers: [
				{
					name: 'Early Bird',
					price: '10,000',
					badge: 'First 30 only',
					featured: true,
					features: ['Early bird special', 'Limited to the first 30', 'All sessions + fireside chat']
				},
				{
					name: 'Standard',
					price: '20,000',
					badge: 'Final price',
					featured: false,
					features: ['All sessions + fireside chat', 'Networking', 'Sponsor booth access']
				},
				{
					name: 'Flutter Lover',
					price: '80,000',
					badge: 'Personal Supporter',
					featured: false,
					support: true,
					features: ['All sessions + fireside chat', 'Listed as a personal supporter']
				}
			],
			platformNote: 'Ticketing platform · Available on Ticketaco official event page.',
			speakerNote: 'Speakers do not need to purchase a ticket.',
			venueNote: 'Venue · AWS Korea (Centerfield East 12F, 231 Teheran-ro, Gangnam-gu, Seoul / Public transit recommended)',
			venueMapLinkText: 'View Map',
			platformLinkText: 'Go to Ticketaco'
		},

		sponsors: {
			kicker: 'Sponsors',
			title: 'The people who make it happen',
			lead: 'Sponsorship is what keeps the community going. We’re looking for partners to build Flutter Korea 2026 with us.',
			comingSoon: {
				badge: 'To be announced',
				title: 'Sponsor lineup coming soon',
				body: 'We’re welcoming sponsors to build the event with us. We’ll introduce them here as they’re confirmed.'
			},
			ctaTitle: 'Become a sponsor',
			ctaBody: 'Meet Korea’s largest Flutter community and put your brand in front of developers who build.',
			cta: 'Sponsor Inquiry'
		},

		speakerPage: {
			metaTitle: 'Call for Speakers · Flutter Korea 2026',
			metaDesc: 'Propose a session for Flutter Korea 2026 — categories, levels, and how to apply.',
			kicker: 'Call for Speakers',
			title: 'Propose a session for Flutter Korea 2026',
			intro:
				'We’re looking for engaging, technical, and innovative talks about the Flutter ecosystem. We can’t wait to see your proposal — everyone is welcome, from Googlers to first-time speakers.',
			dateLabel: 'Event date',
			date: 'Saturday, November 7, 2026',
			levelsTitle: 'Target Audience Level',
			levels: [
				{ name: 'Beginner', desc: 'Introduction / Fundamentals' },
				{ name: 'Intermediate', desc: 'Applied skills / Common patterns' },
				{ name: 'Advanced', desc: 'Architecture / Deep Dive / Internals' }
			],
			categoriesTitle: 'Session Category',
			categories: [
				'State Management',
				'Performance Optimization',
				'UI/UX & Design',
				'Backend / Firebase Integration',
				'Testing & CI/CD',
				'Platform Specific (Web/Desktop/Mobile)',
				'Dart Language Features',
				'Case Studies / Real-world Apps',
				'Package Development',
				'AI, GenAI, Agents',
				'Other'
			],
			submitTitle: 'What you’ll submit',
			submitItems: [
				'Name · Email',
				'Session title',
				'Target audience level',
				'Session category',
				'Session abstract',
				'Previous speaking experience',
				'Whether you’ll include a live demo',
				'Social · GitHub (optional)'
			],
			perksTitle: 'Speaker perks',
			perks: ['Free speaker ticket', 'Official slide template provided', 'Propose any topic'],
			applyCta: 'Apply to Speak',
			applyNote: 'Opens a Google Form',
			back: 'Back to home'
		},

		previousEventsPage: {
			metaTitle: 'Previous Events · Flutter Korea 2026',
			metaDesc: 'Explore the past events shaped by Flutter Korea and Flutter Seoul.',
			kicker: 'Previous Events',
			title: 'Previous Events',
			intro: 'A list of past Flutter events shaped with Flutter Seoul.',
			back: 'Back to home',
			eventsTitle: 'Event list',
			detailCta: 'View event details',
			listBack: 'Previous events',
			scheduleLabel: 'Timetable',
			imagePendingLabel: 'Image\ncoming soon.',
			events: [
				{
					slug: 'flutter-seoul-vibe-coding-hackathon-2026',
					year: '2026',
					name: 'Flutter Seoul Meetup Vibe Coding Hackathon',
					theme: 'Vibe Coding Hackathon',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-vibe-coding-hackathon-thumbnail.webp',
					intro: 'A Flutter Seoul hackathon for turning ideas into apps with AI coding agents.',
					date: 'Saturday, April 25, 2026, 13:00 - 18:00',
					venue: 'Gachon University Gachon Hall 701',
					venueUrl: 'https://ticketa.co/venues/105',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/ycbz77ae' }],
					summary:
						'A meetup-style hackathon open to developers, planners, designers, and anyone interested in AI-assisted vibe coding, with AI Harness, Widget Craft, and Wild Card tracks.',
					status: 'Past event',
					stats: ['Starts 13:00', '3 tracks', 'Ends 18:00'],
					schedule: [
						{ time: '13:00 - 13:30', room: '', lang: '', kind: 'opening', title: 'Welcome and idea pitching', subtitle: 'Icebreaking and team building', speaker: '', org: '' },
						{ time: '13:30 - 17:30', room: '', lang: '', kind: 'workshop', title: 'Vibe Coding Hackathon', subtitle: 'AI Harness · Widget Craft · Wild Card', speaker: '', org: '' },
						{ time: '17:30 - 18:00', room: '', lang: '', kind: 'closing', title: 'Project sharing, demos, and awards', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-daegu-2026',
					year: '2026',
					name: 'Flutter Seoul Open Stage (Daegu)',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-open-stage-daegu-thumbnail.png',
					intro: 'A Daegu open-stage meetup by Flutter Seoul with local Flutter developers.',
					date: 'Saturday, January 24, 2026, 12:00 - 18:00',
					venue: '1-dong Conference Room, 475 Dongdaegu-ro, Dong-gu, Daegu',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/118042' }],
					summary:
						'An open-stage event for local developers to share current Flutter technology and Flutter app experiences using AI, structured around four to five sessions.',
					status: 'Past event',
					stats: ['Starts 12:00', '4-5 sessions', 'Ends 18:00'],
					schedule: [
						{ time: '12:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter Seoul Open Stage', subtitle: 'Sessions on current Flutter technology and AI-powered Flutter apps', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-korea-2025',
					year: '2025',
					name: 'Flutter Korea 2025: Transition',
					theme: 'Transition',
					type: 'Conference',
					image: '/assets/previous-events/flutter-korea-2025-thumbnail.png',
					intro: 'Flutter, the cross-platform mobile framework loved by developers around the world.',
					date: 'Saturday, October 25, 2025, 13:00',
					venue: 'Google for Startups Campus',
					venueUrl: 'https://naver.me/xCB7C3ew',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/54eedplg' }],
					summary:
						'A Korea Flutter community event built around moments of transition, with practical sessions on Gemini CLI, accessibility, Deeplinking, gRPC, service sunset stories, and a closing fireside chat.',
					status: 'Past event',
					stats: ['12:00 check-in', '8 sessions', 'Fireside chat'],
					schedule: [
						{ time: '12:00', room: '', lang: '', kind: 'reception', title: 'Check-in', subtitle: '', speaker: '', org: '' },
						{ time: '13:00', room: '', lang: '', kind: 'keynote', title: 'Opening Keynote', subtitle: '', speaker: 'Song SeungHyeon', org: 'Flutter Seoul Lead Organizer' },
						{ time: '13:10', room: '', lang: '', kind: 'talk', title: 'Accelerate your Flutter development with Gemini CLI', subtitle: '', speaker: 'Brett Morgan', org: 'Google' },
						{ time: '13:50', room: '', lang: '', kind: 'talk', title: 'Introducing thorvg.flutter', subtitle: 'From lottie to thorvg, from user to contributor', speaker: 'Kwon Taehyeong', org: 'Korea University' },
						{ time: '14:30', room: '', lang: '', kind: 'talk', title: 'Three-layer accessibility patterns with Focus & TTS', subtitle: 'Building a barrier-free kiosk app', speaker: 'Lee Sanghoon', org: 'Valtrust' },
						{ time: '15:10', room: '', lang: '', kind: 'talk', title: 'Deeplinking', subtitle: '', speaker: 'Jung Juhong', org: 'AB180 Head of Engineering' },
						{ time: '15:50', room: '', lang: '', kind: 'talk', title: 'REST felt familiar, but gRPC made me a beginner again', subtitle: '', speaker: 'Song Minwoo', org: 'Danal' },
						{ time: '16:30', room: '', lang: '', kind: 'talk', title: 'How to become a genius developer', subtitle: '', speaker: 'Park Seongsu', org: 'Kisan Electronics' },
						{ time: '17:10', room: '', lang: '', kind: 'talk', title: 'Hello. We are announcing the end of customer service', subtitle: '', speaker: 'KAAE', org: 'Flutter Seoul' },
						{ time: '17:40', room: '', lang: '', kind: 'closing', title: 'Fireside chat and closing keynote', subtitle: '', speaker: 'Park Jechang', org: 'Flutter Seoul, Flutter GDE' }
					]
				},
				{
					slug: 'flutter-alliance-2025',
					year: '2025',
					name: 'Flutter Alliance 2025',
					theme: 'Flutter Alliance',
					type: 'Alliance',
					organizer: 'Flutter Seoul x Flutter Tokyo',
					image: '/assets/previous-events/flutter-alliance-2025-thumbnail.png',
					intro: 'The first Seoul edition of the conference for Flutter developers across APAC.',
					date: 'Sunday, October 19, 2025, 10:30 - 18:00',
					venue: 'Microsoft Korea',
					venueUrl: 'https://naver.me/GQ1l2wGh',
					eventLinks: [{ platform: 'ticketa', href: 'https://ticketa.co/event/pdaedwz3' }],
					summary:
						'An international Flutter event across Room A, B, and C, bringing together speakers and communities from Google, Flutter Seoul, Flutter Taipei, Flutter Tokyo, and more.',
					status: 'Past event',
					stats: ['10:30 keynote', '3 tracks', 'Ends 18:00'],
					schedule: [
						{ time: '10:30 - 11:00', room: '', lang: '', kind: 'keynote', title: 'Keynote', subtitle: '', speaker: 'Dreamwalker · Masahiro Aoki · Yii Chen', org: 'GDE Flutter & Flutter Seoul · Flutter Taipei' },
						{ time: '11:00 - 11:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Accelerate your Flutter development with Gemini CLI', subtitle: 'Gemini CLI로 Flutter 개발 속도 가속화하기', speaker: 'Brett Morgan', org: 'Google' },
						{ time: '11:30 - 12:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Getting Started with On-Device AI in Flutter', subtitle: 'Flutter에서 온디바이스 AI 시작하기', speaker: 'Dreamwalker (jaichangpark)', org: 'GDE Flutter & Flutter Seoul' },
						{ time: '12:00 - 12:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'AnimatedTo Changes Your Moving Animations, but How?', subtitle: 'AnimatedTo가 움직이는 애니메이션을 바꾼다, 그런데 어떻게?', speaker: 'Tsuyoshi Chujo', org: 'Freelance Flutter Developer' },
						{ time: '12:30 - 14:00', room: '', lang: '', kind: 'break', title: 'Networking', subtitle: '', speaker: '', org: '' },
						{ time: '14:00 - 14:30', room: 'Room A', lang: 'KR', kind: 'talk', title: 'Connect any LLM to your backend API with no code change', subtitle: '코드 수정 없이 LLM을 백엔드 API에 연결하기', speaker: 'Justin Yoo', org: 'Microsoft' },
						{ time: '14:00 - 14:30', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Streamlining Development with the Monorepo Ecosystem', subtitle: '모노레포 생태계로 개발 간소화하기', speaker: 'Adam Eba', org: 'NekoLogic' },
						{ time: '14:00 - 14:30', room: 'Room C', lang: 'KR', kind: 'workshop', title: 'Vibe Coding? Vibe Debugging', subtitle: '바이브 코딩? 바이브 디버깅! 바이브 코딩 이후 디버깅 마저 입으로 하는 핸즈온입니다', speaker: 'Song SeungHyeon', org: 'Flutter Seoul' },
						{ time: '14:30 - 15:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Accelerating Flutter UI Development with Figma Dev Mode MCP × Claude Code', subtitle: 'Figma Dev Mode MCP X Claude Code로 Flutter UI 개발 가속화하기', speaker: 'Yuta Asada', org: 'Flutter Tokyo' },
						{ time: '14:30 - 15:00', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Less State, More Flutter', subtitle: '상태는 줄이고, 플러터답게 개발하기', speaker: 'nine', org: 'Flutter Seoul' },
						{ time: '15:00 - 15:10', room: '', lang: '', kind: 'break', title: 'Break Time', subtitle: '', speaker: '', org: '' },
						{ time: '15:10 - 15:40', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Beyond Features: Building Apps with Exceptional User Experience', subtitle: '기능을 넘어: 뛰어난 사용자 경험을 가진 앱 만들기', speaker: 'Yii Chen', org: 'Flutter Taipei' },
						{ time: '15:10 - 15:40', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Applying Shorebird to a Real-Time Tournament App', subtitle: '실시간 토너먼트 앱에 Shorebird 적용하기', speaker: 'Maro Kim', org: 'Flutter Incheon' },
						{ time: '15:10 - 15:40', room: 'Room C', lang: 'KR', kind: 'talk', title: 'Migrating Flutter State Management with Cursor', subtitle: 'Cursor로 플러터 상태관리 라이브러리 마이그레이션하기', speaker: 'Serim Jeon', org: 'Flutter Seoul' },
						{ time: '15:40 - 16:10', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Art and Code Collide: Creative Coding with Flutter', subtitle: '예술과 코드의 만남: Flutter로 즐기는 크리에이티브 코딩', speaker: 'Rutvik Tak', org: 'Pieces.app' },
						{ time: '15:40 - 16:10', room: 'Room B', lang: 'EN', kind: 'talk', title: 'Designing Borderless UX in Flutter: Insights from 50 Countries', subtitle: 'Flutter로 만드는 경계 없는 UX 디자인: 50개국에서 얻은 인사이트', speaker: 'Kenichi Kambara', org: 'NTT TechnoCross' },
						{ time: '16:10 - 16:20', room: '', lang: '', kind: 'break', title: 'Break Time', subtitle: '', speaker: '', org: '' },
						{ time: '16:20 - 16:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Why MapLibre: Flexibility and the Freedom to Unlock Full Potential in Flutter Apps with Maps', subtitle: '왜 MapLibre인가: Flutter 지도 앱의 잠재력을 여는 자유와 유연성', speaker: 'Ryutaro Iseki', org: 'YUMEMI Inc.' },
						{ time: '16:30 - 17:00', room: 'Room A', lang: 'EN', kind: 'talk', title: 'AI Debate Club', subtitle: 'AI 토론 클럽', speaker: 'Sasha Denisov', org: 'EPAM' },
						{ time: '17:00 - 17:30', room: 'Room A', lang: 'EN', kind: 'talk', title: 'Riverpod 3.0', subtitle: '', speaker: 'Remi Rousselet', org: '' },
						{ time: '17:30 - 18:00', room: '', lang: '', kind: 'closing', title: 'Closing (10min) + Quiz (20min)', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-april-2025',
					year: '2025',
					name: 'Flutter Seoul Open Stage (April)',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-open-stage-april-2025-thumbnail.png',
					intro: 'An open stage for Flutter developers and people with many kinds of technical experience.',
					date: 'Saturday, April 19, 2025, 12:00 - 16:00',
					venue: 'Worktalk Gangnam, 2F',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/101034' }],
					summary:
						'An open-stage meetup where the community shared experiences across API debugging, GetX, Bloc, C++ bridges, Firebase, development automation, and physical-device coding tools.',
					status: 'Past event',
					stats: ['Starts 12:00', '7 talks', 'Ends 16:00'],
					schedule: [
						{ time: 'Session 1', room: '', lang: '', kind: 'talk', title: 'Emergency API debugging', subtitle: '', speaker: 'JY', org: '' },
						{ time: 'Session 2', room: '', lang: '', kind: 'talk', title: 'Surviving Flutter in production', subtitle: 'feat. GetX', speaker: 'Park Junwoo', org: '' },
						{ time: 'Session 3', room: '', lang: '', kind: 'talk', title: 'Implementing clean architecture with Bloc', subtitle: '', speaker: 'woong.2', org: '' },
						{ time: 'Session 4', room: '', lang: '', kind: 'talk', title: 'Writing bridges between Flutter and C++ code', subtitle: '', speaker: 'Park Jongmin', org: '' },
						{ time: 'Session 5', room: '', lang: '', kind: 'talk', title: 'Building and distributing a macOS app with Flutter and Firebase', subtitle: '', speaker: 'Jang Youngha (My)', org: '' },
						{ time: 'Session 6', room: '', lang: '', kind: 'talk', title: 'Trunk is just the beginning: practical Flutter development automation', subtitle: '', speaker: 'Yoo Dongmin', org: '' },
						{ time: 'Session 7', room: '', lang: '', kind: 'talk', title: 'A Flutter-based web coding tool for physical devices', subtitle: '', speaker: 'Yoon Minhyeok', org: '' }
					]
				},
				{
					slug: 'flutter-in-production-extended-seoul-2025',
					year: '2025',
					name: 'Flutter In Production Extended Seoul',
					theme: 'Flutter In Production',
					type: 'Extended',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-in-production-extended-seoul-thumbnail.png',
					intro: 'The Seoul extended event for Flutter In Production.',
					date: 'Saturday, January 11, 2025, 12:00 - 18:00',
					venue: 'Microsoft Korea, 13F',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/96401' }],
					summary:
						'A Seoul extended event covering Flutter In Production updates, Flutter 3.27, webOS TV, AI backends, Riverpod, monorepos, DevTools, Remote Config, and other practical Flutter topics.',
					status: 'Past event',
					stats: ['Starts 12:00', '9 sessions', 'Ends 18:00'],
					schedule: [
						{ time: '12:00 - 12:30', room: '', lang: '', kind: 'talk', title: 'Wrap up Flutter in Product & Flutter 3.27', subtitle: '', speaker: 'Ryu Jiyoung / Song SeungHyeon', org: 'Flutter Seoul' },
						{ time: '12:35 - 13:15', room: '', lang: '', kind: 'talk', title: 'Why webOS TV adopted Flutter', subtitle: '', speaker: 'Lee Dongyoung', org: 'LG Electronics' },
						{ time: '13:25 - 14:05', room: '', lang: '', kind: 'talk', title: 'Building an AI backend app for Flutter with Semantic Kernel', subtitle: 'feat. Semantic Kernel', speaker: 'Justin Yoo', org: 'Microsoft' },
						{ time: '14:10 - 14:40', room: '', lang: '', kind: 'talk', title: 'Connecting that backend from Flutter with Riverpod + Dio + Retrofit', subtitle: '', speaker: 'CuroGom', org: 'Flutter Seoul' },
						{ time: '14:50 - 15:10', room: '', lang: '', kind: 'talk', title: 'Building a monorepo with Pub workspaces', subtitle: '', speaker: 'Park Jechang', org: 'Flutter Seoul' },
						{ time: '15:15 - 15:35', room: '', lang: '', kind: 'talk', title: 'Preview widget_preview', subtitle: '', speaker: 'Aiden', org: 'Flutter Seoul' },
						{ time: '15:35 - 16:15', room: '', lang: '', kind: 'talk', title: 'Why use DevTools in Flutter development', subtitle: '', speaker: 'Cheon Jeonghwan', org: 'Flutter Seoul' },
						{ time: '16:20 - 17:00', room: '', lang: '', kind: 'talk', title: 'How that service operates', subtitle: '', speaker: 'KAAE', org: '' },
						{ time: '17:05 - 17:45', room: '', lang: '', kind: 'talk', title: 'Efficient and resilient banner delivery with Remote Config', subtitle: '', speaker: 'Nam Sanghyuk', org: 'LINE+ ABC Studio' }
					]
				},
				{
					slug: 'flutter-seoul-open-stage-november-2024',
					year: '2024',
					name: 'Flutter Seoul Open Stage',
					theme: 'Open Stage',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/flutter-seoul/dash-right.svg',
					imagePending: true,
					intro: 'An open stage where anyone interested in Flutter could share their experience and know-how.',
					date: 'Friday, November 8, 2024, 13:00 - 19:00',
					venue: 'Hanbit Media Classroom 40',
					eventLinks: [{ platform: 'eventus', href: 'https://event-us.kr/flutterseoul/event/93958' }],
					summary:
						'An open-stage meetup covering state management, on-device AI, backend-to-Flutter transitions, deeplinks, solo app careers, and useful libraries and services.',
					status: 'Past event',
					stats: ['Starts 13:00', '9 talks', 'Ends 19:00'],
					schedule: [
						{ time: 'Session 1', room: '', lang: '', kind: 'talk', title: 'Why I do not regret avoiding state-management packages', subtitle: '', speaker: 'Seo Boil', org: '' },
						{ time: 'Session 2', room: '', lang: '', kind: 'talk', title: 'Using AI models in Flutter without a server', subtitle: '', speaker: 'Jang Youngha', org: '' },
						{ time: 'Session 3', room: '', lang: '', kind: 'talk', title: 'Why does this not work?', subtitle: '', speaker: 'Lee Woongjae', org: '' },
						{ time: 'Session 4', room: '', lang: '', kind: 'talk', title: 'Why I chose Flutter and moved from backend development', subtitle: '', speaker: 'Baek Jongin', org: '' },
						{ time: 'Session 5', room: '', lang: '', kind: 'talk', title: 'A Flutter story about dating', subtitle: '', speaker: 'Song SeungHyeon', org: '' },
						{ time: 'Session 6', room: '', lang: '', kind: 'talk', title: 'A married developer survival story', subtitle: '', speaker: 'Aiden', org: '' },
						{ time: 'Session 7', room: '', lang: '', kind: 'talk', title: 'A career as a solo app developer', subtitle: '', speaker: 'Yoo Jinuei', org: '' },
						{ time: 'Session 8', room: '', lang: '', kind: 'talk', title: 'Using deeplinks without going through development', subtitle: '', speaker: 'Jeon Serim (KAAE)', org: '' },
						{ time: 'Session 9', room: '', lang: '', kind: 'talk', title: 'Useful libraries and services used at work', subtitle: '', speaker: 'Jung Taehoon', org: '' }
					]
				},
				{
					slug: 'flutter-with-ai-seoul-2024',
					year: '2024',
					name: 'Flutter with AI 2024 Seoul',
					theme: 'Flutter with AI',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-with-ai-seoul-2024-thumbnail.jpeg',
					intro: 'A Flutter Seoul event about applying generative AI and LLMs to products from a mobile developer perspective.',
					date: 'Saturday, May 11, 2024, 13:00 - 18:00',
					venue: 'Programmers Classroom',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/300585494/' }],
					summary:
						'A five-session Flutter Seoul event covering AI basics, AI adoption stories, AI sessions, and general Flutter sessions.',
					status: 'Past event',
					stats: ['Starts 13:00', '5 sessions', 'Ends 18:00'],
					schedule: [
						{ time: '13:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter with AI 2024 Seoul', subtitle: 'Five sessions on AI and Flutter product use cases', speaker: '', org: 'Flutter Seoul' }
					]
				},
				{
					slug: 'flutter-developer-meetup-seoul-2023',
					year: '2023',
					name: 'Flutter Developer Meetup - Seoul',
					theme: 'Developer Meetup',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-developer-meetup-seoul-2023-thumbnail.jpeg',
					intro: 'An after-work developer meetup with short Flutter sessions and networking.',
					date: 'Friday, November 10, 2023, 19:00 - 22:00',
					venue: 'Google for Startups Campus',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/297114474' }],
					summary:
						'A Flutter Seoul meetup with short sessions on newsletters, plugin building, interesting packages, migration from native to Flutter, and networking.',
					status: 'Past event',
					stats: ['Starts 19:00', '5 mini sessions', 'Ends 22:00'],
					schedule: [
						{ time: '19:00 - 19:15', room: '', lang: '', kind: 'keynote', title: 'Keynote', subtitle: '', speaker: '', org: '' },
						{ time: '19:15 - 19:30', room: '', lang: '', kind: 'talk', title: 'Flutter Seoul newsletter review', subtitle: '', speaker: 'HDD', org: '' },
						{ time: '19:30 - 19:50', room: '', lang: '', kind: 'talk', title: 'Why I built a plugin', subtitle: '', speaker: 'nine', org: '' },
						{ time: '20:00 - 20:20', room: '', lang: '', kind: 'talk', title: 'Exploring interesting packages', subtitle: '', speaker: 'Song SeungHyeon', org: '' },
						{ time: '20:20 - 20:40', room: '', lang: '', kind: 'talk', title: 'Pigeon', subtitle: '', speaker: 'Park Jechang', org: '' },
						{ time: '20:40 - 21:00', room: '', lang: '', kind: 'talk', title: 'From native to Flutter: a roadmap for junior developers and team leads', subtitle: '', speaker: 'Yang Sujang', org: '' },
						{ time: '21:00 - 22:00', room: '', lang: '', kind: 'networking', title: 'Networking', subtitle: '', speaker: '', org: '' }
					]
				},
				{
					slug: 'flutter-developer-networking-2023',
					year: '2023',
					name: 'Flutter Developer Networking',
					theme: 'Networking',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-developer-networking-2023-thumbnail.jpeg',
					intro: 'An offline event for Flutter developers with mini sessions, recreation, and networking.',
					date: 'Sunday, July 30, 2023, 17:00 - 19:00',
					venue: 'Black Hole',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/294961836/' }],
					summary:
						'A Flutter Seoul networking event where people who love Flutter met for mini sessions, recreation, and community networking.',
					status: 'Past event',
					stats: ['Starts 17:00', 'Networking', 'Ends 19:00'],
					schedule: [
						{ time: '17:00 - 19:00', room: '', lang: '', kind: 'networking', title: 'Flutter Developer Networking', subtitle: 'Mini sessions · recreation · networking', speaker: '', org: 'Flutter Seoul' }
					]
				},
				{
					slug: 'flutter-forward-extended-korea-2023',
					year: '2023',
					name: 'Flutter Forward Extended Korea',
					theme: 'Flutter Forward',
					type: 'Extended',
					organizer: 'Flutter Korea',
					image: '/assets/previous-events/flutter-forward-extended-korea-2023-thumbnail.jpeg',
					intro: 'A Korea extended event for sharing Flutter Forward updates with local Flutter developers.',
					date: 'Saturday, April 1, 2023, 13:00 - 18:00',
					venue: 'Konkuk University Student Union Building',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/291459777/' }],
					summary:
						'A Flutter Forward extended event with updates on Flutter 3.7, Impeller, Dart 3a, local Flutter services, recruiting booths, and networking.',
					status: 'Past event',
					stats: ['Starts 13:00', 'Recruiting booths', 'Ends 18:00'],
					schedule: [
						{ time: '13:00 - 18:00', room: '', lang: '', kind: 'talk', title: 'Flutter Forward Extended Korea', subtitle: 'Flutter updates · local services · recruiting booths · networking', speaker: '', org: 'Flutter Korea' }
					]
				},
				{
					slug: 'flutter-seoul-meetup-sep-2022',
					year: '2022',
					name: 'Flutter Seoul MeetUp. SEP',
					theme: 'Networking',
					type: 'Meetup',
					organizer: 'Flutter Seoul',
					image: '/assets/previous-events/flutter-seoul-meetup-sep-2022-thumbnail.jpeg',
					intro: 'An offline networking gathering for casual conversations about Flutter.',
					date: 'Sunday, September 18, 2022, 14:00 - 16:00',
					venue: '3F, 165 Yanghwa-ro',
					eventLinks: [{ platform: 'meetup', href: 'https://www.meetup.com/flutter-seoul/events/288200236/' }],
					summary:
						'An offline Flutter Seoul meetup with no formal sessions or agenda, created for people studying, researching, and building with Flutter to talk freely.',
					status: 'Past event',
					stats: ['Starts 14:00', 'Open networking', 'Ends 16:00'],
					schedule: [
						{ time: '14:00 - 16:00', room: '', lang: '', kind: 'networking', title: 'Open Flutter networking', subtitle: 'A casual offline gathering without formal sessions', speaker: '', org: 'Flutter Seoul' }
					]
				}
			],
			noteTitle: 'This archive will keep growing',
			noteBody:
				'Slides, photos, videos, and other public records will be added in the same format as they become ready to share.'
		},

		footer: {
			tagline: 'Return to the essence of technology, and fearlessly define the future.',
			madeBy: 'Organized by',
			org: 'Flutter Seoul',
			nav: 'Navigate',
			connect: 'Connect',
			speakers: 'Call for Speakers',
			rights: '© 2026 Flutter Seoul · Flutter Korea 2026',
			trademark:
				'Flutter and the Flutter logo are trademarks of Google LLC. This is a non-profit, community-run event.',
			backToTop: 'Back to top'
		}
	}
};
