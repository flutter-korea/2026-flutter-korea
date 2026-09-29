# spec.json 형식

```jsonc
{
	"title": "연사 소개 — 가애KAAE", // 미리보기/구조 요약 제목 (카드에는 안 나옴)
	"lang": "ko", // ko | en — 라벨(시간/장소 등)과 기본 푸터 언어
	"size": "portrait", // portrait 1080×1350 (기본) | square 1080×1080 | story 1080×1920
	"brand": "Flutter Korea 2026", // (선택) 헤더 브랜드 텍스트
	"footer": ["2026.11.07 (토) 11:00 – 18:00", "AWS 코리아 (센터필드 EAST 12층)"], // (선택) 푸터 왼쪽. 문자열 또는 줄 배열. 생략 시 content.js 타임테이블의 DATE·PROGRAM / VENUE
	"handle": "#FlutterKorea2026", // (선택) 푸터 오른쪽. 2장 이상이면 "n / N" 페이지가 붙음
	"photoFallback": "auto", // (선택) 사진 없는 카드 전체의 대체 이미지 (design.md "사진이 없는 연사")
	"style": "app", // (선택) 디자인 스타일. card.style로 카드별 지정 가능 (design.md의 스타일 표 참고)
	"cards": [{ "template": "speaker", "data": { /* 템플릿별 필드 */ } }]
}
```

- 모든 카드는 공통 프레임을 쓴다: 브랜드 헤더(좌) + 태그 칩(우), 본문, 푸터. `data.tag`로 칩 라벨을 바꿀 수 있다.
- 텍스트 필드에는 `**강조**`(accent 색)와 `\n`(줄바꿈)을 쓸 수 있다. 나머지는 모두 escape 된다.
- 빈 문자열이거나 없는 선택 필드는 렌더되지 않는다. `TODO:`로 시작하는 값은 build 경고로 표시된다(검토 전에 채우거나 지운다).

## 이미지 필드

키 이름이 `photo`, `image`, `logo`, `banner`인 필드는 이미지로 처리된다. 문자열이나 객체로 쓴다.

```jsonc
"photo": "/assets/flutter-seoul/speaker/kaae.jpeg"
"photo": {
	"src": "~/Downloads/profile.jpg",   // 절대경로 | spec 기준 상대경로 | 저장소 기준 경로 | /assets/…(static/) | https://…
	"fit": "cover",          // cover(채워서 크롭) | contain(전체가 보이게, 여백)
	"mask": "squircle",      // circle | squircle | rounded | arch | leaf | none
	"focus": "50% 30%",      // 크롭 기준점 (x y). 얼굴이 위에 있으면 y를 낮춘다
	"zoom": 1.15,            // cover 확대 (focus 기준)
	"plate": "white",        // 배경 판: white | paper | none (contain일 때 주로 사용)
	"inset": "12%",          // contain 여백
	"alt": "…",
	"fallback": "dash"        // 사진이 없을 때 대체: dash | dash-cheer | dash-team | dash-plush | flutter | dart | auto
}
```

`~`는 셸이 확장하지 않으니 절대경로로 쓴다. build는 로컬 이미지를 `assets/img/`에 해시 접두사를 붙여 복사하므로 덱 폴더만으로 완결된다.

## 템플릿

필드 목록의 최신 정보는 `node card-news.mjs templates` 출력을 기준으로 한다. `*`는 필수다.

| template | 용도 | 구조 | 주요 필드 |
| --- | --- | --- | --- |
| `cover` | 덱 표지 (첫 장) | 히어로 그라디언트, 대형 타이틀, 시리즈 라벨, 넘김 화살표 | badge, **title***, subtitle, series, swipe |
| `event` | 행사 소개 | 헤딩, 배너 이미지(선택), 2열 팩트 카드 | kicker, **title***, lead, banner, **facts*** `[{label,value}]` |
| `speaker` | 연사자 소개 | 마스킹 프로필과 이름·소속, 태그, 소개, 세션 패널 | photo, **name***, nameSub, role, bio, tags, session `{title,track,time,room}` |
| `session` | 발표 주제 소개 | 트랙 칩과 시간 메타, 대형 제목, 요약, 체크 불릿, 연사 스트립 | track, level, time, room, **title***, summary, points, speaker `{name,role,photo}` |
| `timetable` | 시간표 | 시간과 세션을 행으로 나열 (6행 이상이면 압축) | kicker, title, lead, **rows*** `[{time,title,speaker,track,highlight}]` |
| `sponsor` | 후원사 | 1곳이면 스포트라이트, 여러 곳이면 티어별 로고 그리드 | kicker, title, lead, items `[{name,logo,description}]` 또는 tiers `[{label,cols,items}]`, showNames |
| `goods` | 굿즈/후원상품 | 헤딩과 1~4개 갤러리 (개수별 레이아웃), 이름·가격 캡션 | kicker, title, lead, **items*** `[{name,image,price,description}]` |
| `cta` | 티켓·공지·마지막 장 | 헤딩, 정보 목록, 버튼, URL | tone(light/brand), kicker, **title***, lead, info, button, url |

## 분량 가이드 (portrait 기준)

| 필드 | 권장 |
| --- | --- |
| cover.title | 2줄, 줄당 15자 내외 |
| title (event/timetable 등) | 22자 이하. 넘으면 한 단계 작게 표시 |
| session.title | 40자 이하 권장 (넘으면 작게, 70자 이상이면 요약 줄이기) |
| speaker.bio / session.summary | 2~3문장, 90~120자 |
| session.points | 3~4개, 각 25자 내외 |
| timetable.rows | 6행 내외 (제목이 길면 더 적게) |
| goods.items | 1~4개 |

square는 speaker의 bio와 event의 banner가 자동으로 숨겨진다. story는 상하 250px 안전 여백이 있다.
넘치면 `check`가 알려 준다.
