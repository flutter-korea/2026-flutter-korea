---
name: card-news
description: Flutter Korea 2026 / Flutter Seoul 컨퍼런스의 SNS 카드뉴스(인스타그램·링크드인·X용 이미지)를 사이트 디자인 테마로 생성한다. 연사자 소개, 발표 주제(세션) 소개, 행사 소개, 타임테이블, 후원사, 굿즈/후원상품, 티켓·공지 CTA 카드를 템플릿별 HTML로 만들고, 사람이 구조를 검토·승인한 뒤에만 PNG로 렌더링한다. "카드뉴스", "SNS 이미지", "인스타 카드", "연사 소개 이미지", "홍보 이미지 만들어줘" 같은 요청에 사용한다. 웹사이트 자체의 페이지/컴포넌트 수정에는 사용하지 않는다.
---

# Card News (Flutter Korea 2026)

SNS 공유용 카드뉴스를 **HTML로 조립 → 사람이 구조 검토 → 승인 → PNG 렌더링** 순서로 만든다.
모든 카드는 이 저장소의 디자인 테마(`src/app.css`, Flutter 공식 브랜드 톤)를 공유하고, 담는 정보마다
구조가 다른 템플릿을 쓴다. Claude Code / Codex / Gemini CLI 공용이며 모든 작업은 아래 CLI 하나로 한다.

```bash
CN=".agents/skills/card-news/scripts/card-news.mjs"   # 저장소 루트 기준 (bun run card-news … 도 동일)
node $CN templates                 # 템플릿·필드·사이즈·이미지 옵션 목록
node $CN styles                    # 디자인 스타일 목록 (지원 템플릿·권장 사진 크기)
node $CN scaffold <preset> [...]   # 저장소 콘텐츠로 spec 초안 생성 (--style <name>)
node $CN compare <deck> [--all]    # 내 데이터로 모든 스타일을 렌더한 비교 덱 (<deck>-styles)
node $CN build   <deck>            # spec → cards/*.html + preview.html + structure.md
node $CN check   <deck>            # 헤드리스 QA (넘침·깨진/저해상도 이미지) + proof PNG
node $CN preview <deck>            # 사람이 볼 preview.html 열기
node $CN approve <deck> --by NAME  # ⚠ 사람이 명시적으로 승인한 뒤에만
node $CN render  <deck> [--scale 2] [--format jpg]
```

`<deck>`은 `card-news/<slug>` 의 slug(또는 디렉터리/ spec.json 경로). `card-news/`는 gitignore 된 작업공간이다.

## 워크플로우

### 1. 요청 파악 & 정보 수집
- 어떤 카드인지 정한다: 연사(speaker) / 발표(session) / 행사(event) / 타임테이블 / 후원사 / 굿즈 / 공지(cta), 여러 장이면 표지(cover)부터.
- **저장소 정보**: `scaffold`가 `src/lib/content.js`(타임테이블·연사 사진·행사 정보·후원사·링크)를 읽어 초안을 만든다.
  - `scaffold event [--lang en]` · `scaffold speaker --name 가애KAAE` (`--all`이면 표지+전체 라인업, `--name` 없이 실행하면 연사 목록 출력)
  - `scaffold session --name 가애KAAE` · `scaffold timetable` (트랙별 6행씩 자동 분할) · `scaffold sponsors` · `scaffold goods` · `scaffold blank --template <t>`
  - 공통 옵션: `--size portrait|square|story`, `--style <name>`, `--slug`, `--force`
- **사용자가 인자로 준 정보/이미지**가 있으면 저장소 정보보다 우선한다. 이미지 경로(절대·상대·`/assets/...`=`static/` 기준)나 URL을 그대로 spec에 넣으면 build가 덱 폴더로 복사한다. 원격 URL은 가능하면 먼저 로컬로 내려받는다.
- 저장소에 없는 사실(소속, 소개, 발표 요약, 가격 등)을 **지어내지 않는다.** scaffold는 이런 칸을 `TODO: …`로 남기므로, 사용자에게 받거나 비워 둔다(빈 칸은 렌더되지 않음).

### 2. 디자인 스타일 선택
카드뉴스의 디자인 스타일을 정한다. 사용자가 요청에서 이미 스타일을 지정했으면(예: "티켓 스타일로") 그대로 쓴다.
지정하지 않았으면 초안을 만든 뒤 **사용자에게 묻는다.**
- `node $CN styles`로 선택지(default + 스타일 9종)를 보여 준다. 각 스타일의 한 줄 설명과 권장 사진 크기를 함께 전한다.
- 고르기 어려워하면 `node $CN compare <slug>`로 **사용자 자신의 카드**를 모든 스타일로 렌더한 비교 덱
  (`card-news/<slug>-styles/preview.html`)을 만들어 보여 준다. `--styles app,ticket`으로 후보를 좁힐 수 있다.
- 선택한 값은 spec의 `"style"`(덱 전체)에 넣는다. 카드마다 다르게 하려면 `card.style`을 쓴다. `"default"` 또는 생략은 기본 디자인이다.
- 스타일은 현재 **speaker** 템플릿에만 있다. 다른 템플릿은 기본 디자인으로 렌더되고, build가 그 사실을 경고로 알린다.
- 원본 사진이 스타일의 권장 크기보다 작으면(`check`가 경고) 원형 사진 스타일을 권하고, 풀폭 사진 스타일(split)은 피한다.

### 3. spec 작성
`card-news/<slug>/spec.json`을 편집한다. 형식과 템플릿별 필드는 [references/spec.md](references/spec.md), 디자인·이미지 규칙은
[references/design.md](references/design.md)를 따른다. 핵심:
- 카드 1장 = 정보 한 덩어리. 텍스트가 넘치면 글을 줄이거나 카드를 나눈다(폰트를 억지로 줄이지 않는다).
- 사진은 `focus`(object-position)로 얼굴 위치를, `mask`로 형태를 정한다. 로고·누끼 이미지는 `fit: "contain"`.

### 4. build → check (에이전트 자체 QA)
```bash
node $CN build <slug> && node $CN check <slug>
```
- `check`가 ✖(넘침, 이미지 로드 실패)를 내면 spec을 고쳐 반복한다. ⚠(저해상도 등)는 사용자에게 알린다.
- 이미지를 볼 수 있는 에이전트는 `card-news/<slug>/proof/proof-design.png`, `proof-wire.png`를 직접 열어 확인한다.
- Chromium은 playwright 캐시 → 시스템 Chrome → Edge 순으로 찾는다. 없으면 `CARD_NEWS_BROWSER=<경로>` 또는 `bunx playwright-core install chromium`.

### 5. 사람의 구조 검증 (필수 게이트, 여기서 멈춘다)
사용자에게 다음을 제시하고 **응답을 기다린다**:
1. `node $CN preview <slug>`로 연 `card-news/<slug>/preview.html` 경로. 상단 토글에서 **디자인/구조** 모드를 바꿀 수 있고,
   구조 모드에서는 모든 슬롯이 이름표와 함께 점선으로 표시된다. 오른쪽 표에는 필드와 값, 글자 수가 나온다.
2. build가 출력한 구조 요약(`structure.md`: 카드 순서, 템플릿, 필드별 값, TODO, 경고).
3. check 결과(경고 포함)와 판단이 필요한 점(사진 크롭 위치, 빠진 정보 등).

그리고 "구조를 확인하고 승인해 주시면 PNG로 렌더링하겠습니다"라고 묻는다. 수정 요청이 오면 spec 수정 → build → check → 다시 검토를 요청한다.

### 6. 승인 → 렌더링
- 사용자가 **이번 대화에서 명시적으로 승인**했을 때만 `approve --by "<승인자>"`를 실행한다. 승인 여부를 추측하지 않는다.
  "좋네요, 근데 제목만 바꿔 주세요"는 승인이 아니다.
- `approve`는 빌드 산출물의 해시를 기록한다. 이후 spec이나 산출물이 바뀌면 `render`가 거부하므로 다시 build → 검토 → approve 해야 한다.
- `render <slug>` → `card-news/<slug>/out/NN-<template>.png` (기본 1080폭, `--scale 2`면 2160폭). 결과 경로를 보고한다.

## 하지 말 것
- 승인 없이 `approve`/`render` 실행, 승인 해시 우회(approval.json 수작업 작성 등).
- 카드 HTML/CSS를 덱 폴더에서 직접 수정하기. 항상 spec(또는 스킬의 템플릿·테마)을 고친 뒤 build 한다.
- `cover` 외의 템플릿에 그라디언트·글로우·그라디언트 텍스트 추가. 사이트와 같은 규칙이다.
- 템플릿이나 테마를 바꿨다면 `examples/showcase.json`으로 8종 전부 build/check 해서 회귀를 확인한다.

## 파일
- `README.md`: 사람용 안내. 에이전트별 호출 방법과 유즈 케이스별 프롬프트 예시
- `scripts/card-news.mjs`: CLI(scaffold/build/check/approve/render)
- `scripts/templates.mjs`: 템플릿 8종 (구조별 HTML, `data-slot` 표기)
- `scripts/styles.mjs`(레지스트리) + `scripts/styles/<name>.mjs` + `assets/styles/<name>.css`: 디자인 스타일 9종 (같은 데이터, 다른 레이아웃). 스타일 하나 = 파일 두 개
- `assets/theme.css`: `src/app.css` 토큰 미러와 카드·마스크·와이어프레임 스타일 (사이트 테마가 바뀌면 `:root`를 동기화)
- `assets/brand/`: 출처를 검증한 브랜드 에셋(Flutter Seoul 마크, 공식 Flutter 로고, 공식 Dash)과 `SOURCES.md`
- `references/spec.md`: spec 형식과 템플릿별 필드 · `references/design.md`: 디자인·이미지 마스킹 가이드
- `examples/showcase.json`: 8종 템플릿 예시 덱 (회귀 확인용) · `examples/speaker-kaae-styles.json`: 스타일 9종 비교 덱 · `examples/speaker-kaae.json`: 실제 연사 소개 예시 (저장소 사실만 사용)
