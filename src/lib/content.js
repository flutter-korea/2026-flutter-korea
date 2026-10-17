/**
 * Bilingual content for Flutter Korea 2026.
 * `dict.ko` and `dict.en` share an identical shape; components read the active
 * language via the `t` store (see i18n.js). Facts sourced from the official
 * event brief.
 */

/** Links used across the site. */
export const links = {
	ticket: 'https://ticketa.co/event/c9xsstcs',
	ticketaco: 'https://ticketa.co/event/c9xsstcs',
	venueMap: 'https://naver.me/x1uTWoUP',
	meetup: 'https://www.meetup.com/ko-kr/flutter-korea/',
	kakaoTalk: 'https://open.kakao.com/o/gdL2Gj1e',
	discord: 'https://flutter-seoul.com',
	email: 'mailto:flutter-seoul@googlegroups.com'
};

/** Internal route paths (prefix with `base` from $app/paths in components). */
export const routes = {
	home: '/',
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
				{ id: 'timetable', label: '타임테이블', href: '#timetable' },
				{ id: 'tickets', label: '티켓', href: '#tickets' },
				{ id: 'sponsors', label: '후원사', href: '#sponsors' },
				{ id: 'previous-events', label: '이전 행사 보기', href: '/previous-events' }
			],
			menu: '메뉴',
			close: '닫기'
		},

		hero: {
			badge: '2026. 11. 07 SAT · Seoul',
			sloganTop: 'Back to Basics,',
			sloganBottom: 'Move Forward',
			subtitle: '기술의 본질로 돌아가, 두려움 없이 미래를 정의하다',
			description:
				'변화가 일상이 된 시대. 단단한 기본기를 바탕으로 AI와 함께 미래를 정의하는 하루입니다. Flutter와 AI를 둘러싼 깊이 있는 세션과 교류를 만나보세요.',
			ctaSecondary: '행사 소개 보기',
			facts: [
				{ label: '일시', value: '2026.11.07 (토)' },
				{ label: '시간', value: '11:00 – 18:00' },
				{ label: '장소', value: '12층 AWS 코리아', href: links.venueMap },
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
			lead: 'AI와 Flutter의 현재를 다루는 세션과 깊이 있는 교류의 시간을 준비했습니다.',
			mentoring: {
				badge: 'Confirmed · 60 min',
				title: '연차별 파이어사이드 챗',
				body: '일방향 발표가 아닌, 연차별 고민을 사전에 취합해 패널들과 진솔하게 대화하는 시간입니다. 주니어의 커리어 방향성, 미드레벨의 기술적 갈증, 시니어의 팀 리딩까지 지금 우리에게 필요한 이야기를 나눕니다.',
				tags: ['주니어 · 커리어', '미드레벨 · 기술', '시니어 · 리딩']
			}
		},

		timetable: {
			kicker: 'Timetable',
			title: '타임테이블',
			lead: 'AI Track과 Flutter Track으로 나뉘어 진행되는 11:00부터 18:00까지의 프로그램입니다.',
			dateLine: '2026. 11. 07 SAT · AWS 코리아',
			frame: [
				{ label: 'DATE', value: '2026.11.07 (토)' },
				{ label: 'DOORS', value: '10:30 접수' },
				{ label: 'PROGRAM', value: '11:00 – 18:00' },
				{ label: 'VENUE', value: 'AWS 코리아 (센터필드 EAST 12층)' }
			],
			tracks: {
				ai: 'AI Track',
				flutter: 'Flutter Track',
				columns: ['시작', '종료', '룸', '세션', '발표자'],
				rows: [
					{ start: '10:00', end: '11:00', ai: { room: '401호', title: '장비 체크', speaker: '오거나이저 1' }, flutter: { room: '300/301/400호', title: '장비 체크', speaker: '오거나이저 1' } },
					{ start: '11:00', end: '11:05', shared: '오프닝', speaker: '송승현', image: '/assets/flutter-seoul/flutter-seoul-logo-large.svg' },
					{ start: '11:05', end: '11:20', shared: 'AWS 키노트', speaker: '윤석찬' },
					{ start: '11:20', end: '11:50', shared: '키노트: 어디서나 만나는 Flutter (ENG)', description: 'Flutter의 목표는 언제나 “디바이스가 픽셀을 그리는 곳이라면 어디에서든” Flutter 앱이 실행되도록 하는 것이었습니다. 이번 키노트에서는 이 야심 찬 목표를 실현하기 위한 Flutter의 계획을 보여주는 세 가지 발표를 소개합니다.', speaker: 'Craig Labenz & Khanh Nguyen', org: 'Google' },
					{ start: '11:50', end: '12:20', ai: { room: '401호', title: '천재 개발자와 그 이후', description: "- 천재 개발자 되는법에서 소개했던 인공지능과 에이전트에 대한 간단한 이야기\n- AI를 에이전트로 다루는 방법\n- 프롬포트, 컨텍스트, 하네스, 루프, 그래프 엔지니어링이 말하고자하는 것\n- 개발자의 미래는 정말로 암울한가? (개인적인 생각)\n- 피지컬 AI, VLM 그리고 소셜 월드모델에서 보여지는 미래에 대한 이야기", speaker: '박성수', org: 'COSMAX', image: '/assets/flutter-seoul/speaker/sungsoo-park.jpg' }, flutter: { room: '300/301/400호', title: '첫 프로젝트가 글로벌 앱 런칭이라구요?', description: "신입 개발자가 처음으로 맡게 된 프로젝트가 글로벌 앱 런칭 건 이었던 실 사례 케이스를 공유합니다.\n\n실제 개발에 투입된 타임라인에 따라 내용이 전개됩니다.\n각 상황에서 마주한 문제들을 어떻게 접근했는지에 대한 경험과, 기술적으로 어떻게 해결했는지에 대한 내용으로 챕터별 옴니버스 형식으로 진행됩니다.\n\n1. 프로젝트가 연기된 사이 연구한 아키텍처와 패키지\n입사 후 몇개월동안 사이드 프로젝트 및 유지보수 업무에 투입되는 동안 언젠가 진행할 메인 프로젝트를 미리 준비했습니다.\n플러터 아키텍처를 설계하고, 이걸 쉽게 메인 프로젝트에 적용하기 위한 라이브러리도 만들어 배포했습니다.\n(실제로는 제 설계를 외부 패키지에 두고, 메인 프로젝트에 의존성을 갖게 하는건 장기적으로 위험하다 판단해, 동일한 코드를 프로젝트의 패키지 모듈로 분리했지만요)\n+ 개발하면서 느꼈던 bloc의 단점을 보완하는 기능들이 담긴 패키지 (스트림 기반 비즈니스 레이어 상태 동기화, 1회성 UI 이벤트 방출 방법)\n+ 앱에 화려한 애니메이션을 위한 패키지 (toss의 탭 전환 애니메이션을 구현해보자)\n패키지 개발과정과 구현 의도를 예시 코드와 함께 설명할 예정입니다. (13분)\n\n2. Restful 대신, 아직 메이저하지 않은 스택인 GraphQL을 선택한 이유\n이제 메인 프로젝트가 개시되었고, 요구사항이 어느정도 구체화 되었으니, 기술 스택을 정하는 회의가 진행되었습니다. 오늘의 주제는 Restful vs. GraphQL 이었습니다.\n+ 같은 내용이지만, 레이아웃이나 노출되는 정보가 다른 여러 위젯을 그리기 위해 각각 API를 작성하는 것이 비효율적이라고 판단했습니다.\n+ 일반적인 API 호출과 소켓 스펙을 하나의 클라이언트로 처리하고 싶었습니다. 하나의 앱에서 여러개의 서버를 동적으로 연결해야 했기에 클라이언트의 수를 줄이는게 중요했습니다.\n+ Restful 패키지들과 마찬가지로 코드젠을 지원했습니다. 개발 난이도의 차이가 크게 없다는 것 또한 중요했습니다.\n물론 장점만 있지는 않았습니다.\n- 보일러 플레이트 코드가 너무 많이 생성된다.\n- 요청할 graphql 스펙의 문서를 하나하나 작성해야 한다.\n- 패키지 지원이 열악해서 API 엔드포인트 생성용, GraphQL 모델 생성용 코드와, 생성 결과물의 클래스 시그니처가 달라 치환 과정이 필요했다.\nGraphQL 적용 이유와 장단점을 예시 코드와 함께 설명할 예정입니다. (7분)\n\n3. 앱 코드에 하드코딩된 문자열이 없다, i18n 적용과 확장을 AI로 관리한 방법\n개발 중반, 처음에는 한글로 하드코딩하며 개발하다가, 드디어 용어 번역서가 도착하여 i18n을 적용해야 할 시기가 왔습니다. 하지만, 이미 페이지는 50개를 넘어가고 있었고, 번역 키의 유지보수성과 확장성을 고려해야 했는데...\n+ 확장 가능한 key 설계 방법론 (1:1 매핑 방법)\n+ 일관된 코드 품질을 유지하는 AI 하네스 구성\n개발과정에서 i18n 적용에 AI를 도입한 케이스에 대해 설명할 예정입니다. (5분)\n\n4. 빌드 환경 분리, k~ 네이밍된 플래그의 존재 이유\n개발 막바지, 앱의 보안 검사가 진행되었습니다. 하지만, 디버그 빌드에만 넣어뒀던 실험적 기능이 보안 문제로 거론되게 되는데.. 분명 flavor에 따라 다르게 DI 되도록 구현되었는데 어떻게 된 일일까요?\n+ Flavor.name 을 분기문으로 쓸 경우에 발생하는 문제\n+ k~ 네이밍된 유래와 플래그의 존재 이유 (트리셰이킹)\n우연히 알게된 k 플래그를 사용해야 하는 케이스에 대해 공유할 예정입니다. (5분)", speaker: '이웅재', org: 'KM Park', image: '/assets/flutter-seoul/speaker/woongjae-lee.jpg' } },
					{ start: '12:20', end: '13:00', shared: '네트워킹 런치', speaker: '' },
					{ start: '13:00', end: '13:30', ai: { room: '401호', title: 'llamadart로 시작하는 플러터 온디바이스 에이전트(feat: tool call parser)', description: "Flutter/Dart에서 동작하는 LLM 추론 엔진 \"llamadart\"를 소개하고, 에이전틱 AI의 핵심 기반 기술인 Tool Call을 설명하며, 관련 기여 경험과 온디바이스 에이전틱 AI 구현을 사례로 보여주는 발표입니다.\n\nFlutter GDE 리핵님이 메인테이너로 활동 중이신 llamadart라는 프로젝트가 있습니다. 이는 LLM 추론 엔진 llama.cpp를 Dart로 포팅한 프로젝트입니다. 올해 해당 프로젝트에 Tool Call Parser와 Tool Execution Loop 관련 기여한 경험(https://github.com/leehack/llamadart/pull/43)이 있습니다. 온디바이스에서 Tool Call 파싱을 직접 제어하기 위한 기여 과정에서 에이전틱 AI에서 가장 중요한 Tool Call의 개념, 왜 많은 Parser들을 지원해야 하는지, Tool Execution Loop은 어떻게 구현하는지에 대해 깊게 알게 되었습니다. 이러한 경험과 지식을 공유하기 위한 발표입니다.\n\n대략적인 발표 흐름은 다음과 같습니다.\n\n1. 에이전틱 AI의 기반, Structured output과 Tool call\n2. Tool call의 동작 원리와 Tool execution loop\n3. 온디바이스 에이전트 개발(Tool call 파싱을 앱에서 직접 제어)\n4. llamadart의 Tool calling 구현 구조 (handler, chat template, grammar)\n5. 모델별로 Tool call이 실패하던 케이스 분석과 기여 사례\n6. Tool execution loop 구현 기여\n7. 실기기 데모 : llamadart로 구현한 온디바이스 에이전트 기능과 벤치마크", speaker: '권태형', org: '고려대학교', image: '/assets/flutter-seoul/speaker/taehyung-kwon.jpg' }, flutter: { room: '300/301/400호', title: "안 되는 건 안 된다'고 말하는 플러그인: 알람 플러그인으로 본 capability-first federated plugin 설계", description: "알람 앱을 만들면서 pub.dev의 알람 패키지를 썼습니다. Android에서는 잘 울렸고, iOS에서는 아무 오류 없이 조용히 울리지 않았습니다. 문제는 iOS의 제약이 아니라, 그 제약을 플러그인이 숨기고 있었다는 점이었습니다.\n\n그래서 각 플랫폼이 \"할 수 있는 것\"을 먼저 보고하는 플러그인을 직접 만들었습니다. warm_alarm은 스케줄을 잡기 전에 getCapabilities, getPermissionState, getReadiness 세 단계로 시스템 상태를 진단하고, 부족한 이유를 코드로 돌려줍니다. 정확한 알람 권한이 없거나 배터리 최적화가 실행을 지연시킬 수 있다면 사용자에게 설정 화면으로 가는 길까지 안내합니다. silent no-op 대신 \"limited\"와 \"blocked\"를 명시하는 것이 이 플러그인의 첫 번째 설계 원칙입니다.\n\n두 번째는 federated plugin 안에서의 경계입니다. Android와 Apple 플랫폼이 서로 다른 길로 발전할 수 있도록 Pigeon 스키마를 플랫폼별로 분리했고, Pigeon이 생성한 DTO가 public API로 새어 나가지 않도록 공개 모델은 platform_interface에 손으로 작성했습니다. 이 경계가 왜 필요한지, 지키지 않으면 어떤 호환성 비용이 생기는지를 실제 diff로 보여드립니다.\n\n세 번째는 Flutter 엔진이 죽어도 살아남아야 하는 알람의 특성입니다. 스케줄 저장소를 Dart가 아닌 네이티브 쪽에 두어 엔진 재시작을 견디게 했고, Android에서는 AlarmManager, ForegroundService, full-screen intent, 그리고 사용자가 실제로 깨어났는지 확인하고 다시 울리는 wake-check 흐름을 구현했습니다. 이 과정에서 만난 OS 버전별 제약과 권한 정책을 정리해 공유합니다.\n\n이 세션은 알람 플러그인 홍보가 아닙니다. 플랫폼마다 되는 것이 다른 기능을 하나의 Dart API로 감쌀 때, 그 차이를 어떻게 정직하게 드러내고 유지보수 가능한 경계를 어디에 둘지에 대한 이야기입니다. 알람이 아니어도 네이티브 기능을 플러그인으로 감싸 본 분이라면 같은 문제를 겪으셨을 겁니다.", speaker: '유동민', image: '/assets/flutter-seoul/speaker/dongmin-yu.png' } },
					{ start: '13:30', end: '13:40', kind: 'break', label: '휴식' },
					{ start: '13:40', end: '14:10', ai: { room: '401호', title: 'AI와 함께 스타트업에서 생존하기', description: "스타트업에서 개발·리뷰·QA 리소스를 AI와 자동화로 채워나는법", speaker: '한상욱', org: '넛지헬스케어(주)', image: '/assets/flutter-seoul/speaker/sangwook-han.jpeg' }, flutter: { room: '300/301/400호', title: '기술 세션: A2UI로 생성형 UI 기반의 동적인 Flutter 앱 만들기 (ENG)', description: 'Flutter의 GenUI SDK를 사용해 경험을 이끄는 에이전트만큼 역동적이고 표현력이 풍부하며 개인화된 UI를 만드는 방법을 알아봅니다.', speaker: 'Khanh Nguyen', org: 'Google', image: '/assets/flutter-seoul/speaker/khanh-nguyen.jpg' } },
					{ start: '14:10', end: '14:20', kind: 'break', label: '휴식' },
					{ start: '14:20', end: '14:50', ai: { room: '401호', title: 'AI가 개발자를 대체할까 걱정했는데, 1년 동안 같이 일해보니 일단 재밌습니다', description: "지난 1년간 Claude와 Codex를 개발 업무 전반에 도입하며, 제가 일하는 방식도 크게 달라졌습니다. 처음에는 AI가 빠르게 발전할수록 개발자의 역할이 줄어드는 것은 아닐까 걱정했지만, 실제로 AI와 함께 여러 프로젝트를 진행하고 게임까지 만들어보면서 어느 순간 생각이 조금 단순해졌습니다. “그래도 만드는 게 재밌으면 된 거 아닌가?” 하고요.\n\n이번 세션에서는 제가 지난 1년 동안 AI를 개발 업무에 거의 100% 도입하면서 겪었던 경험들을 솔직하게 공유해보려 합니다. 실제 업무 방식이 어떻게 달라졌는지, 어떤 시행착오가 있었는지, AI로 어떤 결과물까지 만들어봤는지, 그리고 그 과정에서 제가 실제로 느꼈던 생각들을 가볍고 솔직하게 이야기해보려 합니다.", speaker: '김준호', image: '/assets/flutter-seoul/speaker/junho-kim.jpeg' }, flutter: { room: '300/301/400호', title: 'Dart와 Flutter의 AI 평가 프레임워크를 내 프로젝트에 활용하는 법 (ENG)', description: 'Dart와 Flutter 팀이 AI 모델과 개발 도구를 평가하는 방법을 알아보고, 동일한 과정을 자신의 Flutter 프로젝트에 적용하는 방법을 배웁니다.', speaker: 'Mariam Hasnany', org: 'Google', image: '/assets/flutter-seoul/speaker/mariam-hasnany.jpg' } },
					{ start: '14:50', end: '15:00', kind: 'break', label: '휴식' },
					{ start: '15:00', end: '15:30', highlight: true, ai: { room: '401호', title: 'Agent와 함께 Flutter 운영 프로젝트 일대기', description: "Agent를 활용해 새로운 회사 프로젝트를 만들면서 느끼 내용을 공유합니다", speaker: '박준우', org: '벳칭', image: '/assets/flutter-seoul/speaker/junewoo-park.jpg' }, flutter: { room: '300/301/400호', title: 'Flutter Desktop 멀티윈도우 개발기', description: "Flutter Desktop 환경에서 멀티윈도우 기능을 개발하면서 겪었던 경험기 및 노하우 공유", speaker: '추세일', org: 'SK Telecom', image: '/assets/flutter-seoul/speaker/chu-seil.png' } },
					{ start: '15:30', end: '15:40', kind: 'break', label: '휴식' },
					{ start: '15:40', end: '16:10', highlight: true, ai: { room: '401호', title: '비전공 기계설계자가 AI를 활용해 SW를 개발해 온 과정과 경험', description: "기계공학 전공자이자 오랜 시간 하드웨어 및 기구 설계를 담당해 온 엔지니어가 GenAI 시대를 맞아 Flutter 및 소프트웨어 개발을 접근하며 겪은 구체적인 여정과 인사이트를 공유합니다.\n\n엔지니어링 사고방식의 확장: 공차, 구속 조건, 시스템 조립 관점에서 바라보는 하드웨어적 사고가 소프트웨어 아키텍처 및 상태 관리를 이해하는 데 어떤 차별화된 시각을 제공하는지 다룹니다.\n\nAI 도구 활용의 실질적 본질: AI 코딩은 단순히 코드를 생성하는 것이 아니라, 현업의 도메인 지식과 논리적 문제 분해 능력이 뒷받침될 때 비로소 강력한 문제 해결 도구가 됨을 실제 프로젝트 구현 경험을 통해 증명합니다.\n\n관점의 전환과 지식 공유: 비전공자라는 한계를 넘어, 문제를 물리적 관점과 시스템적 시각으로 재해석할 때 얻을 수 있는 새로운 개발적 접근법을 전달합니다.\n\n비전공자에게는 AI를 활용한 과감한 개발 도전의 가능성을, 소프트웨어 개발자에게는 하드웨어 엔지니어의 색다른 시각과 문제 해결 방식을 엿볼 수 있는 실질적인 경험 공유 세션이 될 것입니다.", speaker: '유진식', image: '/assets/flutter-seoul/speaker/jinshik-yu.jpg' }, flutter: { room: '300/301/400호', title: 'Flutter 탐구: AI 시대, 왜 엔진을 이해해야 하는가', description: "Flutter Engine의 내부 구조와 설계 배경을 소스 코드와 함께 살펴보며, Framework/Runtime/Engine/Platform의 경계를 이해해 실제 성능 문제와 Native 연동 등의 원인을 판단하고 AI에게 올바른 개발 방향을 제시하는 방법을 다룰 예정입니다.", speaker: '박예승', image: '/assets/flutter-seoul/speaker/yeseung-park.jpg' } },
					{ start: '16:10', end: '16:20', kind: 'break', label: '휴식' },
					{ start: '16:20', end: '16:50', ai: { room: '401호', title: '10년 차 개발자의 Flutter × AI: 패키지의 한계를 넘어서', description: 'AI와 함께 Flutter 패키지가 지원하지 않는 네이티브 기능을 구현한 경험을 공유합니다. Android CDM의 발견부터 도입까지, 개발자의 경험과 AI가 어떻게 기술 탐색과 구현의 장벽을 낮추고 해결책의 범위를 넓혔는지 살펴봅니다.', speaker: '가애KAAE', org: 'Flutter Seoul / WemeetMobility', image: '/assets/flutter-seoul/speaker/serim-jeon.jpeg' }, flutter: { room: '300/301/400호', title: 'dart:ffi 네이티브 다루기', description: "Flutter 앱을 만들다 보면 네이티브가 필요한 상황이 있습니다. 예를 들면 TFLite, OpenCV처럼 이미 검증된 라이브러리를 그대로 쓰고 싶을 때, 픽셀 버퍼를 다루는 무거운 연산을 Dart 밖으로 빼야 할 때, 플랫폼 코드는 최소로 하고 네이티브로 기능을 한 번만 구현하고 싶을 때입니다.\n\ndart:ffi는 Dart에서 C/C++를 직접 부를 수 있게 해주는 Dart 내장 라이브러리입니다. 정확히는 C ABI로 노출된 심볼을 요구하는 것이라, Rust나 Go로 만든 라이브러리도 같은 방식으로 사용할 수 있습니다.\n\n이 세션은 제가 만들어 pub.dev에 공개하고 유지보수 중인 두 FFI 패키지를 사례로 씁니다. 얼굴 랜드마크를 실시간 추론하는 mediapipe_face_mesh와 UVC 카메라를 다루는 flutter_ffi_uvc입니다.\n\nC/C++ 소스가 어떤 경로로 컴파일되어 Dart까지 닿는지, C 인터페이스를 어떻게 잡고 ffigen으로 바인딩을 생성하는지, 외부 라이브러리를 어떻게 붙이는지, 플랫폼 코드와 Dart 코드가 하나의 네이티브 라이브러리를 어떻게 함께 쓰는지 다룹니다.\n\n그 밖에 겪은 문제도 살펴봅니다. 디버그 빌드에서 네이티브 코드가 최적화 없이 컴파일되던 것, 헤더와 바이너리 버전이 달라 깨지던 것, C++ 예외가 Dart까지 전달되지 못하고 앱을 죽일 수 있던 것, 특정 플랫폼에서 외부 라이브러리를 쓸 수 없어 같은 C 인터페이스 아래 백엔드만 바꿔 끼운 것 등입니다.\n\nFFI 플러그인을 처음 만들려는 분, 네이티브 코드를 어디에 둘지 고민 중인 분께 도움이 될 것입니다.", speaker: '최선효', org: '헬스클라우드(주)', image: '/assets/flutter-seoul/speaker/seonhyo-choi.jpg' } },
					{ start: '16:50', end: '17:00', kind: 'break', label: '휴식' },
					{ start: '17:00', end: '17:50', shared: 'Q&A 패널: Flutter 코어 팀과의 대화 (ENG)', speaker: 'Craig Labenz, Khanh Nguyen & Mariam Hasnany', org: 'Google' },
					{ start: '17:50', end: '18:00', shared: '단체 사진', speaker: '' },
					{ start: '18:00', end: '19:00', empty: true }
				]
			}
		},

		tickets: {
			kicker: 'Tickets',
			title: '티켓',
			lead: 'Flutter Korea 2026 티켓 예매가 오픈되었습니다. 티켓타코(Ticketaco)에서 지금 바로 예매하세요.',
			statusBadge: '예매 오픈',
			cta: '티켓 예매하기',
			ctaTbd: '오픈 예정',
			soldOut: '매진',
			currency: '₩',
			tiers: [
				{
					name: '얼리버드',
					price: '10,000',
					badge: '매진',
					featured: false,
					soldOut: true,
					features: ['얼리버드 특별가', '선착순 30장 한정', '전 세션 및 파이어사이드 챗 입장']
				},
				{
					name: '일반',
					price: '20,000',
					badge: '최종 확정가',
					featured: true,
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
			venueNote: '행사 장소 · AWS 코리아 (서울 강남구 테헤란로 231 센터필드 EAST 12층 / 주차 지원 불가, 대중교통 이용 권장)',
			venueMapLinkText: '지도 보기',
			platformLinkText: '예매 바로가기'
		},

		sponsors: {
			kicker: 'Sponsors',
			title: '함께 만드는 사람들',
			lead: '후원은 커뮤니티가 계속 이어지게 하는 힘입니다. Flutter Korea 2026을 함께 만들어 가는 공식 후원사를 소개합니다.',
			items: [
				{
					name: 'Flutter',
					logo: '/assets/sponsors/flutter.png',
					url: 'https://flutter.dev',
					description: 'Build apps for any screen'
				}
			],
			ctaTitle: '후원사로 함께하시겠어요?',
			ctaBody: '국내 최대 규모의 Flutter 커뮤니티와 만나고, 브랜드를 개발자에게 각인시킬 기회입니다.',
			cta: '후원 문의하기'
		},

		speakerPage: {
			metaTitle: '연사 모집 마감 · Flutter Korea 2026',
			metaDesc: 'Flutter Korea 2026 연사 모집 안내와 세션 분야, 발표자 혜택을 확인하세요.',
			back: '홈으로 돌아가기',
			title: '연사 모집이 마감되었습니다',
			intro: 'Flutter 생태계에 보내주신 많은 관심과 지원에 감사드립니다. Flutter Korea 2026 연사 모집이 마감되었습니다. 확정된 세션은 타임테이블에서 확인하실 수 있습니다.',
			dateLabel: '행사일',
			date: '2026년 11월 7일 (토) · AWS 코리아',
			closedLabel: '연사 모집 마감',
			levelsTitle: '발표 난이도',
			levels: [
				{ name: 'Beginner', desc: '입문 · 기초 (Introduction / Fundamentals)' },
				{ name: 'Intermediate', desc: '응용 · 일반 패턴 (Applied skills / Common patterns)' },
				{ name: 'Advanced', desc: '아키텍처 · 심화 · 내부 구조 (Architecture / Deep Dive / Internals)' }
			],
			categoriesTitle: '세션 주제 분야',
			categories: ['State Management', 'Performance Optimization', 'UI/UX & Design', 'Backend / Firebase Integration', 'Testing & CI/CD', 'Platform Specific (Web/Desktop/Mobile)', 'Dart Language Features', 'Case Studies / Real-world Apps', 'Package Development', 'AI, GenAI, Agents', 'Other'],
			submitTitle: '지원 시 작성 항목',
			submitItems: ['성함 · 이메일', '세션 제목', '난이도 및 주제 분야', '세션 간략 소개 (Abstract)', '발표 경험', '라이브 데모 포함 여부', 'SNS · GitHub (선택)'],
			perksTitle: '연사 혜택',
			perks: ['연사 티켓 무료 제공', '공식 발표 슬라이드 템플릿 제공', '세션 주제 자유 제안'],
			timetableCta: '타임테이블 보기'
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
				{ id: 'timetable', label: 'Timetable', href: '#timetable' },
				{ id: 'tickets', label: 'Tickets', href: '#tickets' },
				{ id: 'sponsors', label: 'Sponsors', href: '#sponsors' },
				{ id: 'previous-events', label: 'Previous Events', href: '/previous-events' }
			],
			menu: 'Menu',
			close: 'Close'
		},

		hero: {
			badge: 'NOV 7, 2026 SAT · Seoul',
			sloganTop: 'Back to Basics,',
			sloganBottom: 'Move Forward',
			subtitle: 'Return to the essence of technology, and fearlessly define the future.',
			description:
				'In an era where change is the default, we spend a day defining the future with AI, armed with unshakable fundamentals. Join us for deep sessions and meaningful conversations about Flutter and AI.',
			ctaSecondary: 'Learn More',
			facts: [
				{ label: 'Date', value: 'Sat, Nov 7, 2026' },
				{ label: 'Time', value: '11:00 – 18:00' },
				{ label: 'Venue', value: 'AWS Korea, 12F', href: links.venueMap },
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
				'At Flutter Korea 2025 we shared stories of ‘Transition’: migrating from native to Flutter, pivoting careers into development, and facing the sudden rise of AI. We found comfort and solidarity in opening up about our fears of change.',
				'One year later, in 2026, those transitions have fully settled into a new paradigm. ‘Vibe coding’ (co-developing with AI agents) is a daily reality, and on-device AI and large-model serving are dynamically merging within the Flutter ecosystem.',
				'Yet when change is the default, a different anxiety appears: “Are my fundamentals strong enough for this flood of new tech?” and “Where do I go when the pace threatens to overwhelm me?” Flutter Korea 2026 starts with exactly these questions.'
			],
			compasses: [
				{
					tag: 'Compass 01',
					title: 'Back to Basics',
					subtitle: 'Return to fundamentals',
					body: 'The more sophisticated our tools become, the more critical the fundamentals: architecture, rendering pipelines, state management. Only on solid ground can we keep ownership of our craft.'
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
			lead: 'Spend the day with sessions on the present of AI and Flutter, plus meaningful conversations with the community.',
			mentoring: {
				badge: 'Confirmed · 60 min',
				title: 'Fireside Chat by Career Level',
				body: 'Not a one-way talk, but an honest conversation with panelists built from questions gathered in advance, covering junior career direction, mid-level technical thirst, and senior team leadership. The talk we all need right now.',
				tags: ['Junior · Career', 'Mid · Craft', 'Senior · Leading']
			}
		},

		timetable: {
			kicker: 'Timetable',
			title: 'Timetable',
			lead: 'A full day from 11:00 to 18:00, split across the AI Track and Flutter Track.',
			dateLine: 'NOV 07, 2026 SAT · AWS Korea',
			frame: [
				{ label: 'DATE', value: 'Sat, Nov 7, 2026' },
				{ label: 'DOORS', value: '10:30 check-in' },
				{ label: 'PROGRAM', value: '11:00 – 18:00' },
				{ label: 'VENUE', value: 'AWS Korea (Centerfield East 12F)' }
			],
			tracks: {
				ai: 'AI Track',
				flutter: 'Flutter Track',
				columns: ['Start', 'End', 'Room', 'Session', 'Speaker'],
				rows: [
					{ start: '10:00', end: '11:00', ai: { room: 'Room 401', title: 'Equipment check', speaker: 'Organizer 1' }, flutter: { room: 'Rooms 300/301/400', title: 'Equipment check', speaker: 'Organizer 1' } },
					{ start: '11:00', end: '11:05', shared: 'Opening', speaker: 'Song SeungHyeon', image: '/assets/flutter-seoul/flutter-seoul-logo-large.svg' },
					{ start: '11:05', end: '11:20', shared: 'AWS Keynote', speaker: 'Channy Yun' },
					{ start: '11:20', end: '11:50', shared: 'Keynote: Flutter is Everywhere (ENG)', description: 'Flutter\'s goal has always been to run your Flutter apps "anywhere a device paints pixels". Join us for 3 announcements that will outline our plan to make sure Flutter delivers on that ambitious goal.', speaker: 'Craig Labenz & Khanh Nguyen', org: 'Google' },
					{ start: '11:50', end: '12:20', ai: { room: 'Room 401', title: 'After becoming a genius developer', description: "A follow-up to “How to Become a Genius Developer”: AI and agents, how to work with AI as an agent, prompt/context/harness/loop/graph engineering, the future of developers, and emerging possibilities in physical AI, VLMs, and social world models.", speaker: 'Sungsoo Park', org: 'COSMAX', image: '/assets/flutter-seoul/speaker/sungsoo-park.jpg' }, flutter: { room: 'Rooms 300/301/400', title: 'Your first project is a global app launch?', description: "A new developer shares the experience of launching a global app as a first major project. Following the project timeline, the talk covers architecture and package preparation, the trade-offs of choosing GraphQL over REST, using AI to roll out and maintain i18n across a large app, and separating build environments safely.", speaker: 'Woongjae Lee', org: 'KM Park', image: '/assets/flutter-seoul/speaker/woongjae-lee.jpg' } },
					{ start: '12:20', end: '13:00', shared: 'Networking lunch', speaker: '' },
					{ start: '13:00', end: '13:30', ai: { room: 'Room 401', title: 'Starting with llamadart: a Flutter on-device agent (feat. tool call parser)', description: "An introduction to llamadart, a Dart port of the llama.cpp inference engine, and to tool calling as a foundation for on-device agents. Drawing on contributions to its Tool Call Parser and Tool Execution Loop, the talk explains structured output, parsing across models, execution loops, implementation architecture, failure cases, and an on-device demo with benchmarks.", speaker: 'Taehyung Kwon', org: 'Korea Univ.', image: '/assets/flutter-seoul/speaker/taehyung-kwon.jpg' }, flutter: { room: 'Rooms 300/301/400', title: 'A capability-first federated plugin design through an alarm plugin', description: "An alarm package worked on Android but silently failed on iOS, hiding the platform’s limitations. This talk explains how warm_alarm reports capabilities, permissions, and readiness instead of silently doing nothing; how to design maintainable boundaries in a federated plugin; and how native scheduling survives Flutter Engine restarts while navigating OS-level alarm policies.", speaker: 'Dongmin Yu', image: '/assets/flutter-seoul/speaker/dongmin-yu.png' } },
					{ start: '13:30', end: '13:40', kind: 'break', label: 'Break' },
					{ start: '13:40', end: '14:10', ai: { room: 'Room 401', title: 'Surviving at a startup with AI', description: "How to fill development, code-review, and QA resource gaps at a startup with AI and automation.", speaker: 'Sangwook Han', org: 'Nudge Healthcare, Inc.', image: '/assets/flutter-seoul/speaker/sangwook-han.jpeg' }, flutter: { room: 'Rooms 300/301/400', title: 'Technical Session: A2UI: Build dynamic Flutter apps with Generative UI (ENG)', description: 'Build a UI that\'s as dynamic, expressive, and personal as the agents that power your experiences using Flutter’s GenUI SDK.', speaker: 'Khanh Nguyen', org: 'Google', image: '/assets/flutter-seoul/speaker/khanh-nguyen.jpg' } },
					{ start: '14:10', end: '14:20', kind: 'break', label: 'Break' },
					{ start: '14:20', end: '14:50', ai: { room: 'Room 401', title: 'I worried AI would replace developers, but working together for a year was fun', description: "After using Claude and Codex throughout development for a year, I’ll share how my workflow changed, what failed, and what I built—including a game. I initially worried that AI might replace developers, but working with it reminded me how much I enjoy making things.", speaker: 'Kim Junho', image: '/assets/flutter-seoul/speaker/junho-kim.jpeg' }, flutter: { room: 'Rooms 300/301/400', title: 'Why you should steal Dart & Flutter’s AI evaluation framework', description: 'Learn how the Dart and Flutter team evaluates AI models and developer tools and how to apply that exact same process to evaluate AI in your own Flutter projects.', speaker: 'Mariam Hasnany', org: 'Google', image: '/assets/flutter-seoul/speaker/mariam-hasnany.jpg' } },
					{ start: '14:50', end: '15:00', kind: 'break', label: 'Break' },
					{ start: '15:00', end: '15:30', highlight: true, ai: { room: 'Room 401', title: 'A Flutter operations project with an Agent', description: "I’ll share what I learned while using an AI agent to build a new project at my company.", speaker: 'Junewoo Park', org: 'Vetching', image: '/assets/flutter-seoul/speaker/junewoo-park.jpg' }, flutter: { room: 'Rooms 300/301/400', title: 'Flutter Desktop multi-window development', description: "Lessons and practical know-how from building multi-window functionality for Flutter Desktop.", speaker: 'Seil Chu', org: 'SK Telecom', image: '/assets/flutter-seoul/speaker/chu-seil.png' } },
					{ start: '15:30', end: '15:40', kind: 'break', label: 'Break' },
					{ start: '15:40', end: '16:10', highlight: true, ai: { room: 'Room 401', title: 'The Process and Experience of a Non-Major Mechanical Designer Developing Software Using AI', description: "A mechanical engineer with years of hardware and product-design experience shares his journey into Flutter and software development in the GenAI era. The talk explores how engineering concepts such as tolerances, constraints, and system assembly inform software architecture and state management; why domain knowledge and problem decomposition matter more than code generation alone; and what developers can learn from a hardware engineer’s perspective.", speaker: 'Jinshik Yu', image: '/assets/flutter-seoul/speaker/jinshik-yu.jpg' }, flutter: { room: 'Rooms 300/301/400', title: 'Navigating Flutter: Why understand the Engine in the AI era', description: "We’ll explore the Flutter Engine’s internals and design decisions through source code. Understanding the boundaries between the Framework, Runtime, Engine, and Platform helps us diagnose performance and native-integration issues and give AI tools better direction.", speaker: 'Yeseung Park', image: '/assets/flutter-seoul/speaker/yeseung-park.jpg' } },
					{ start: '16:10', end: '16:20', kind: 'break', label: 'Break' },
					{ start: '16:20', end: '16:50', ai: { room: 'Room 401', title: 'A decade-long developer’s Flutter × AI: beyond package limits', description: 'A developer shares how they used AI to implement native functionality not supported by existing Flutter packages. From discovering Android CDM to adopting it, the talk explores how development experience and AI lowered the barriers to technical exploration and implementation and broadened the range of possible solutions.', speaker: 'Serim Jeon', org: 'Flutter Seoul / WemeetMobility', image: '/assets/flutter-seoul/speaker/serim-jeon.jpeg' }, flutter: { room: 'Rooms 300/301/400', title: 'Working with dart:ffi and native code', description: "When a Flutter app needs native libraries such as TFLite or OpenCV, dart:ffi can bridge Dart and code exposed through a C ABI. Using two published FFI packages for face landmarks and UVC cameras, this talk covers compilation, C interfaces, ffigen bindings, sharing a native library with platform code, and pitfalls around optimization, version mismatches, exceptions, and platform-specific backends.", speaker: 'Seonhyo Choi', org: 'HeathCloud Co., Ltd', image: '/assets/flutter-seoul/speaker/seonhyo-choi.jpg' } },
					{ start: '16:50', end: '17:00', kind: 'break', label: 'Break' },
					{ start: '17:00', end: '17:50', shared: 'Q&A Panel: Ask the Flutter Core Team & Fireside Chat (ENG)', speaker: 'Craig Labenz, Khanh Nguyen & Mariam Hasnany', org: 'Google' },
					{ start: '17:50', end: '18:00', shared: 'Group photo', speaker: '' },
					{ start: '18:00', end: '19:00', empty: true }
				]
			}
		},

		tickets: {
			kicker: 'Tickets',
			title: 'Tickets',
			lead: 'Tickets for Flutter Korea 2026 are now available. Get your tickets now on Ticketaco.',
			statusBadge: 'Tickets Available',
			cta: 'Get Tickets',
			ctaTbd: 'Coming soon',
			soldOut: 'Sold Out',
			currency: '₩',
			tiers: [
				{
					name: 'Early Bird',
					price: '10,000',
					badge: 'Sold Out',
					featured: false,
					soldOut: true,
					features: ['Early bird special', 'Limited to the first 30', 'All sessions + fireside chat']
				},
				{
					name: 'Standard',
					price: '20,000',
					badge: 'Final price',
					featured: true,
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
			venueNote: 'Venue · AWS Korea (Centerfield East 12F, 231 Teheran-ro, Gangnam-gu, Seoul / Public transit recommended)',
			venueMapLinkText: 'View Map',
			platformLinkText: 'Go to Ticketaco'
		},

		sponsors: {
			kicker: 'Sponsors',
			title: 'The people who make it happen',
			lead: 'Sponsorship is what keeps the community going. Introducing the official sponsors building Flutter Korea 2026 with us.',
			items: [
				{
					name: 'Flutter',
					logo: '/assets/sponsors/flutter.png',
					url: 'https://flutter.dev',
					description: 'Build apps for any screen'
				}
			],
			ctaTitle: 'Become a sponsor',
			ctaBody: 'Meet Korea’s largest Flutter community and put your brand in front of developers who build.',
			cta: 'Sponsor Inquiry'
		},

		speakerPage: {
			metaTitle: 'Call for Speakers Closed · Flutter Korea 2026',
			metaDesc: 'Learn about the Flutter Korea 2026 speaker program, session categories, and speaker benefits.',
			back: 'Back to home',
			title: 'Call for Speakers is Closed',
			intro: 'Thank you for your interest and support for the Flutter ecosystem. Applications to speak at Flutter Korea 2026 are now closed. Explore the confirmed sessions in the timetable.',
			dateLabel: 'Event date',
			date: 'Saturday, November 7, 2026 · AWS Korea',
			closedLabel: 'Applications closed',
			levelsTitle: 'Talk level',
			levels: [
				{ name: 'Beginner', desc: 'Introduction / Fundamentals' },
				{ name: 'Intermediate', desc: 'Applied skills / Common patterns' },
				{ name: 'Advanced', desc: 'Architecture / Deep Dive / Internals' }
			],
			categoriesTitle: 'Session categories',
			categories: ['State Management', 'Performance Optimization', 'UI/UX & Design', 'Backend / Firebase Integration', 'Testing & CI/CD', 'Platform Specific (Web/Desktop/Mobile)', 'Dart Language Features', 'Case Studies / Real-world Apps', 'Package Development', 'AI, GenAI, Agents', 'Other'],
			submitTitle: 'Application details',
			submitItems: ['Name · Email', 'Session title', 'Talk level and category', 'Session abstract', 'Previous speaking experience', 'Whether you’ll include a live demo', 'Social · GitHub (optional)'],
			perksTitle: 'Speaker benefits',
			perks: ['Free speaker ticket', 'Official slide template provided', 'Propose any session topic'],
			timetableCta: 'View timetable'
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
			rights: '© 2026 Flutter Seoul · Flutter Korea 2026',
			trademark:
				'Flutter and the Flutter logo are trademarks of Google LLC. This is a non-profit, community-run event.',
			backToTop: 'Back to top'
		}
	}
};
