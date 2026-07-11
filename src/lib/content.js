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
	tickettaco: 'https://tickettaco.io',
	flutterSeoul: 'https://www.meetup.com/flutter-seoul/',
	email: 'mailto:hello@flutterseoul.dev'
};

/** Internal route paths (prefix with `base` from $app/paths in components). */
export const routes = {
	home: '/',
	speakers: '/speakers'
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

		nav: {
			brand: 'Flutter Korea 2026',
			links: [
				{ id: 'about', label: '소개' },
				{ id: 'sessions', label: '세션' },
				{ id: 'timetable', label: '타임테이블' },
				{ id: 'tickets', label: '티켓' },
				{ id: 'sponsors', label: '후원사' }
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
				{ label: '장소', value: 'Seoul (TBD)' },
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
				{ label: 'PROGRAM', value: '11:00 – 18:00' }
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
			lead: '티켓 예매 페이지를 준비하고 있습니다. 가격 정보를 먼저 확인하세요 — 오픈 시 안내드립니다.',
			statusBadge: '구매 오픈 예정',
			ctaTbd: '오픈 예정',
			currency: '₩',
			tiers: [
				{
					name: '얼리버드',
					price: '10,000',
					badge: '선착순 30장',
					featured: true,
					features: ['8월 중순 오픈 예정', '선착순 30장 한정', '전 세션 및 파이어사이드 챗 입장']
				},
				{
					name: '일반',
					price: '20,000',
					badge: '최종 확정가',
					featured: false,
					features: ['전 세션 및 파이어사이드 챗 입장', '점심 및 네트워킹', '후원사 부스 참여']
				},
				{
					name: '초대권',
					price: 'Invite',
					isText: true,
					badge: '별도 배포',
					featured: false,
					features: ['후원사 · 파트너', '주요 공헌자', '연사 및 오거나이저']
				}
			],
			platformNote: '예매 플랫폼 · 티켓타코(Tickettaco) — 2026년 8월 오픈 예정 (대관지 확정 후)',
			speakerNote: '연사자는 티켓 구매가 필요하지 않습니다.'
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
			title: 'Flutter Korea 2026 세션을 제안하세요',
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

		nav: {
			brand: 'Flutter Korea 2026',
			links: [
				{ id: 'about', label: 'About' },
				{ id: 'sessions', label: 'Sessions' },
				{ id: 'timetable', label: 'Timetable' },
				{ id: 'tickets', label: 'Tickets' },
				{ id: 'sponsors', label: 'Sponsors' }
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
				{ label: 'Venue', value: 'Seoul (TBD)' },
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
				{ label: 'PROGRAM', value: '11:00 – 18:00' }
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
			lead: 'The ticket booking page is on its way. Here’s the pricing in advance — we’ll let you know when it opens.',
			statusBadge: 'Purchase opening soon',
			ctaTbd: 'Coming soon',
			currency: '₩',
			tiers: [
				{
					name: 'Early Bird',
					price: '10,000',
					badge: 'First 30 only',
					featured: true,
					features: ['Opens mid-August', 'Limited to the first 30', 'All sessions + fireside chat']
				},
				{
					name: 'Standard',
					price: '20,000',
					badge: 'Final price',
					featured: false,
					features: ['All sessions + fireside chat', 'Lunch & networking', 'Sponsor booth access']
				},
				{
					name: 'Invitation',
					price: 'Invite',
					isText: true,
					badge: 'By invite',
					featured: false,
					features: ['Sponsors & partners', 'Key contributors', 'Speakers & organizers']
				}
			],
			platformNote: 'Booking via Tickettaco — opening August 2026 (after the venue is confirmed).',
			speakerNote: 'Speakers do not need to purchase a ticket.'
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
