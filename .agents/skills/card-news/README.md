# card-news — 코딩 에이전트로 만드는 SNS 카드뉴스

Flutter Korea 2026 / Flutter Seoul 행사 정보를 사이트 디자인 테마 그대로 SNS 카드뉴스(1080×1350 PNG)로 만드는 에이전트 스킬입니다.
에이전트에게 말로 요청하면 스킬이 정한 흐름대로 진행합니다. 초안 → 디자인 스타일 선택 → HTML 조립 → 자동 검사 → **사람의 구조 검토·승인** → PNG 렌더링 순서입니다.
승인 전에는 이미지가 만들어지지 않습니다.

- 에이전트가 따르는 규칙: [SKILL.md](SKILL.md)
- spec 형식과 템플릿 필드: [references/spec.md](references/spec.md)
- 디자인·이미지·스타일 가이드: [references/design.md](references/design.md)
- 브랜드 에셋 출처: [assets/brand/SOURCES.md](assets/brand/SOURCES.md)

## 에이전트별로 스킬 부르기

스킬은 저장소 안에 있어서 이 저장소에서 에이전트를 실행하면 자동으로 발견됩니다. "카드뉴스", "연사 소개 이미지", "인스타 카드"처럼
말하면 대부분 알아서 스킬을 씁니다. 확실하게 부르려면 아래처럼 합니다.

| 에이전트 | 명시적으로 부르기 | 참고 |
| --- | --- | --- |
| Claude Code | `/card-news 가애KAAE 연사 소개 카드 만들어줘` | `.claude/skills/card-news`는 `.agents/skills/card-news`의 symlink |
| Codex CLI | `$card-news 가애KAAE 연사 소개 카드 만들어줘` 또는 `/skills`에서 선택 | `.agents/skills/`를 직접 읽음 |
| Gemini CLI | "card-news 스킬로 가애KAAE 연사 소개 카드 만들어줘" | **저장소를 신뢰 폴더로 지정해야** 프로젝트 스킬이 로드됨. `gemini skills list`로 확인 |

사전 준비는 저장소 루트에서 `bun install` 한 번이면 됩니다. 렌더링에는 Chrome이 필요하고, 없으면 `bunx playwright-core install chromium`을 실행합니다.

## 공통 흐름 (에이전트가 하는 일)

1. **초안**: 저장소 `src/lib/content.js`에 있는 정보(타임테이블, 연사 사진, 행사 정보, 후원사, 링크)로 spec을 만듭니다. 요청에 담긴 텍스트와 이미지가 우선합니다.
   저장소에 없는 사실(소속, 소개, 발표 요약, 가격)은 지어내지 않고 `TODO`로 남긴 뒤 여러분에게 묻습니다.
2. **스타일 선택**: 요청에 스타일이 없으면 기본 디자인과 스타일 9종 중 무엇을 쓸지 묻습니다. 원하면 내 카드를 모든 스타일로 렌더한 비교 덱을 보여 줍니다.
3. **자동 검사**: 텍스트 넘침, 잘림, 이미지 로드 실패, 저해상도 확대를 헤드리스 브라우저로 검사하고 고칩니다.
4. **구조 검토 (사람)**: `card-news/<slug>/preview.html`을 열어 줍니다. "구조" 모드에서는 모든 정보 슬롯이 이름표와 점선으로 보이고, 옆 표에서 값과 글자 수를 확인합니다.
5. **승인 → 렌더링**: 여러분이 "승인", "좋아요, 렌더링해 주세요"처럼 **명시적으로** 승인해야 PNG를 만듭니다. 승인 뒤 내용이 바뀌면 다시 검토해야 합니다.

결과물은 `card-news/<slug>/out/NN-<template>.png`에 생깁니다. `card-news/`는 git에 올라가지 않는 작업 공간입니다.

---

## 유즈 케이스별 예시

아래 프롬프트는 어느 에이전트에서나 그대로 쓸 수 있습니다. 괄호 안은 에이전트가 내부적으로 실행하는 CLI입니다. `CN=.agents/skills/card-news/scripts/card-news.mjs`이고, `bun run card-news …`도 같습니다.

### 1. 연사자 소개: 한 명

> 가애KAAE님 연사 소개 카드뉴스 만들어줘. 스타일은 app으로.

- 타임테이블에서 세션 제목, 트랙, 시간, 룸, 프로필 사진을 가져옵니다(`node $CN scaffold speaker --name 가애KAAE --style app`).
- 소속과 소개는 저장소에 없으면 물어봅니다. 이미 알고 있다면 함께 주세요.

> 가애KAAE님 연사 카드 만들어줘. 소속은 "Flutter Seoul", 소개는 "10년 차 개발자로 서비스 운영 경험을 나눠 왔습니다". 사진은 ~/Downloads/kaae-hires.jpg 를 쓰고 얼굴이 위쪽에 있어.

- 준 사진 경로를 spec에 넣고 `focus`를 `"50% 30%"`쯤으로 맞춥니다. 사진은 덱 폴더로 복사되어 결과물이 자기 완결적입니다.
- 원본 해상도가 스타일 권장치(대부분 600px, split은 1100px)보다 작으면 경고와 함께 원형 사진 스타일을 권합니다.

### 1-1. 사진이 없는 연사

> Khanh Nguyen님 연사 카드 만들어줘. 사진은 아직 없어.

- 에이전트가 먼저 실제 사진이 있는지 묻고, 없으면 공식 대체 이미지 중에서 고르게 합니다. 기본값은 `dash`이고, scaffold가 미리 넣어 둡니다.

> 사진 대신 Dash 3마리 응원하는 그림으로 해줘. / Flutter 로고로 해줘. / Dart 세션이니까 Dart 로고로.

- `"photo": { "fallback": "dash-cheer" }`, `"flutter"` 또는 `"dart"`로 바꿉니다. 카드 이미지에는 출처나 상표 문구가 들어가지 않습니다. 대신 로고를 쓰면 상표 고지 문구를, Dash를 쓰면 CC BY 3.0 출처 표기 문구를 게시글 캡션에 넣으라고 알려 줍니다.

> 라인업 전체에서 사진 없는 분들은 Dash를 다양하게 써줘.

- `"photoFallback": "auto"`로 사진 없는 카드마다 `dash` → `dash-cheer` → `dash-team` → `dash-plush`를 돌아가며 씁니다.

| fallback | 이미지 | 추천 상황 |
| --- | --- | --- |
| `dash` | 공식 3D Dash | 기본 |
| `dash-cheer` | 응원하는 Dash 3마리 | 커뮤니티 세션, 패널 |
| `dash-team` | 모자·안경·노트북 Dash 3마리 | 팀 발표 |
| `dash-plush` | Dash 인형 사진 | 밋업 톤 (풀폭 split 스타일은 피하기) |
| `flutter` / `dart` | 공식 로고마크 | 주제를 강조할 때. 상표 고지 필요 |
| `auto` | Dash 4종 순환 | 라인업 시리즈 |

모든 이미지는 flutter.dev·dart.dev·flutter/website의 공식 에셋이며 출처는 [SOURCES.md](assets/brand/SOURCES.md)에 있습니다.

### 2. 연사 라인업: 시리즈 전체

> 전체 연사 라인업 카드뉴스를 ticket 스타일로 만들어줘. 첫 장은 표지로.

- 표지와 연사별 카드를 한 덱으로 만듭니다(`node $CN scaffold speaker --all --style ticket`).
- 카드가 많으므로 소속·소개처럼 비어 있는 칸 목록을 먼저 보여 주고, 채울지 비울지 묻습니다. 빈 칸은 렌더되지 않습니다.
- 스타일은 연사 카드에만 적용되고, 표지는 기본 디자인입니다(build가 알려 줍니다).

### 3. 발표 주제 소개

> 유동민님 발표 소개 카드 만들어줘. 요약은 "알람 플러그인을 예로, 플랫폼이 지원하지 않는 기능을 명시적으로 드러내는 federated plugin 설계를 다룹니다", 핵심 포인트는 capability-first 설계 / 플랫폼별 제약 드러내기 / 테스트 전략.

- 세션 템플릿으로 트랙 칩, 시간, 룸, 큰 제목, 요약, 체크 불릿, 하단 연사 스트립을 구성합니다(`node $CN scaffold session --name 유동민`).
- 제목이 길면 한 단계 작은 크기로 자동 조정되고, 그래도 넘치면 요약이나 포인트를 줄이자고 제안합니다.

### 4. 행사 소개

> 행사 소개 카드뉴스 3장짜리 만들어줘: 표지, 행사 개요, 티켓 안내.

- `cover`(히어로 그라디언트), `event`(일시·시간·장소·주최 팩트 카드), `cta`(티켓 예매)로 구성합니다(`node $CN scaffold event`).

> 같은 걸 영어로, 정사각형(1:1)으로도 만들어줘.

- 영어 콘텐츠와 영어 라벨로 1080×1080 덱을 따로 만듭니다(`node $CN scaffold event --lang en --size square --slug event-en-square`).

### 5. 타임테이블

> 타임테이블 카드뉴스 만들어줘.

- AI 트랙과 Flutter 트랙을 카드당 6행씩 나눠 여러 장으로 만듭니다(`node $CN scaffold timetable`). 강조된 세션은 배경색으로 구분합니다.

> 한 장에 8행까지 넣어줘.

- `--rows 8`로 다시 만들고, 넘치면 check가 알려 주므로 행 수를 조정합니다.

### 6. 후원사 소개

> 후원사 소개 카드 만들어줘.

- 저장소의 공식 후원사 로고를 흰 플레이트 위에 **크롭 없이** 배치합니다. 한 곳이면 스포트라이트, 여러 곳이면 그리드이고, 후원 문의 CTA 카드가 뒤에 붙습니다(`node $CN scaffold sponsors`).

> 후원사를 티어별로 나눠줘. Gold는 ~/sponsors/a.svg, ~/sponsors/b.png, Silver는 ~/sponsors/c.png 이고 이름은 각각 …

- `tiers` 구조로 spec을 작성합니다. 로고 이름과 파일은 여러분이 준 것만 씁니다.

```json
{ "template": "sponsor", "data": { "title": "함께 만드는 사람들", "tiers": [
  { "label": "Gold", "cols": 2, "items": [{ "name": "…", "logo": "/Users/you/sponsors/a.svg" }, { "name": "…", "logo": "/Users/you/sponsors/b.png" }] },
  { "label": "Silver", "cols": 3, "items": [{ "name": "…", "logo": "/Users/you/sponsors/c.png" }] }
] } }
```

### 7. 굿즈 · 후원 상품 소개

> 현장 굿즈 소개 카드 만들어줘. 스티커(현장 배포) ~/goods/sticker.png, 에코백(후원 리워드) ~/goods/bag.jpg. 스티커는 배경이 투명해.

- 1~4개 갤러리 레이아웃은 개수에 따라 자동으로 바뀝니다(`node $CN scaffold goods`).
- 투명 PNG(누끼)는 `fit: "contain"`으로 연한 판 위에 여백을 두고 배치합니다. 연출 사진은 `cover`로 꽉 채웁니다.
- 가격이나 수량은 여러분이 준 값만 씁니다.

### 8. 티켓 오픈 · 마감 · 공지

> 티켓 예매 오픈 공지 카드 한 장 만들어줘. 네이비 배경으로.

- `cta` 템플릿을 `tone: "brand"`(단색 네이비)로 만들고, 일시·장소 정보 목록, 버튼, 예매 URL을 넣습니다. URL은 `content.js`의 `links.ticket`에서 가져옵니다.

> 얼리버드 매진 공지도 만들어줘.

- 저장소의 티켓 정보(얼리버드 매진 표시)를 근거로 문구를 제안하고, 확정 문구는 여러분에게 확인받습니다.

### 9. 디자인 스타일 비교해서 고르기

> 가애KAAE님 카드를 어떤 스타일로 할지 모르겠어. 다 보여줘.

- 내 카드를 기본 디자인과 스타일 9종으로 한 번에 렌더한 비교 덱을 엽니다(`node $CN compare speaker-kaae-ko` → `card-news/speaker-kaae-ko-styles/preview.html`).
- 고른 스타일을 원래 spec의 `"style"`에 넣습니다. 후보를 좁히려면 "app이랑 ticket만 비교해줘"라고 하면 됩니다(`--styles app,ticket`).

| style | 한 줄 요약 | 권장 사진 원본 |
| --- | --- | --- |
| `default` | 사이트 테마 그대로, 모든 템플릿 지원 | 600px+ |
| `app` | Material 3 앱의 연사 상세 화면 | 600px+ |
| `ticket` | 입장권과 절취 스텁(날짜·시간·장소를 크게) | 600px+ |
| `poster` | 브랜드 블루와 초대형 라틴 이름, 원형 사진 (키노트용) | 600px+ |
| `badge` | 랜야드 명찰 | 600px+ |
| `rail` | 좌측 네이비 레일에 일정 | 600px+ |
| `inspector` | Flutter 디버그 페인트 라벨과 디버그 배너 | 600px+ |
| `code` | Dart 생성자 코드 에디터 | 600px+ |
| `sticker` | 커뮤니티 스티커와 공식 Dash | 600px+ |
| `split` | 사진 / 네이비 패널 2분할 | 1100px+ |

### 10. 검토 · 수정 · 승인 · 렌더링

> (preview를 보고) 2번 카드 제목 줄바꿈을 "Flutter × AI:" 뒤에서 해주고, 사진을 조금 더 확대해줘.

- spec을 고친 뒤 다시 build와 check를 하고, 다시 검토를 요청합니다. 이 요청은 승인이 아니므로 렌더링하지 않습니다.

> 구조 확인했어. 승인할게, 렌더링해줘. 인스타용이라 2배 해상도로.

- 승인을 기록한 뒤(`node $CN approve <slug> --by "<이름>"`) 2160px 폭으로 렌더링합니다(`node $CN render <slug> --scale 2`). JPG가 필요하면 `--format jpg`를 붙입니다.

> 인스타 스토리용(9:16)으로도 뽑아줘.

- `size: "story"`로 별도 덱을 만듭니다(상하 250px 안전 영역). 새 덱이므로 **다시 검토하고 승인**해야 합니다.

### 11. 저장소 밖의 정보만으로 만들기

> 다음 달 밋업 연사 카드 만들어줘. 이름 홍길동, 소속 ○○, 발표 "…", 11/20 19:00, 강남 ○○홀. 사진은 https://example.com/hong.jpg

- `scaffold blank --template speaker`로 빈 spec을 만들고 준 정보만 채웁니다. 원격 이미지는 가능하면 로컬로 내려받은 뒤 사용합니다.
- 푸터 기본값(Flutter Korea 2026 일정·장소)이 맞지 않으면 spec의 `footer`, `brand`, `handle`을 행사에 맞게 바꿉니다.

---

## 직접 CLI로 쓰기

에이전트 없이도 같은 흐름을 쓸 수 있습니다.

```bash
CN=.agents/skills/card-news/scripts/card-news.mjs
node $CN templates                         # 템플릿·필드·사이즈·이미지 옵션
node $CN styles                            # 디자인 스타일 목록
node $CN scaffold speaker --name 가애KAAE --style app
node $CN build speaker-kaae-ko             # HTML + preview.html + structure.md
node $CN check speaker-kaae-ko             # 자동 검사 + proof PNG (검토용)
node $CN compare speaker-kaae-ko           # (선택) 모든 스타일 비교 덱
node $CN preview speaker-kaae-ko           # 브라우저로 열기
node $CN approve speaker-kaae-ko --by "이름"   # 사람이 검토한 뒤에만
node $CN render speaker-kaae-ko [--scale 2] [--format jpg]
```

## 자주 묻는 것

- **렌더링이 "승인 기록이 없습니다"라며 멈춰요.** 의도된 동작입니다. preview를 보고 명시적으로 승인해야 렌더링됩니다.
- **사진이 흐릿해요.** check의 "해상도 부족" 경고를 확인하세요. 원본이 표시 크기보다 작습니다. 더 큰 원본을 쓰거나 원형 사진 스타일을 고르세요.
- **사진이 없는데 줄무늬 상자가 나와요.** 검토용 placeholder입니다. `photo.fallback`(또는 덱 전체 `photoFallback`)에 `dash` 등을 지정하세요.
- **Flutter 로고나 Dash를 넣고 싶어요.** `assets/brand/`에 있는 공식 원본만 씁니다. 출처와 사용 규칙은 [SOURCES.md](assets/brand/SOURCES.md)에 있습니다. 검색으로 찾은 이미지는 쓰지 않습니다.
- **Gemini CLI에서 스킬이 안 보여요.** 저장소 폴더를 신뢰 폴더로 지정했는지 확인하세요(`gemini skills list`).
