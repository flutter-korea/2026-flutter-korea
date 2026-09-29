# 디자인 가이드

카드뉴스는 웹사이트(`src/app.css`)와 같은 **Flutter 공식 브랜드 톤**을 쓴다. 흰 캔버스, 헤어라인 보더의
paper-blue 패널, 거의 검정인 헤딩, 절제된 blue-700 accent, mono 키커가 기본이다.

## 원칙
- **그라디언트는 `cover` 한 곳에만 쓴다.** 사이트가 Hero와 AnnouncementBar에만 쓰는 것과 같은 규칙이다. `cta`의
  `tone: "brand"`는 단색 네이비(blue-900)이고 그라디언트가 아니다. 글로우 블롭, 블루프린트 그리드, 그라디언트
  텍스트는 쓰지 않는다.
- 헤딩은 공통 패턴(`kicker` → `title` → `lead`)을 따른다.
- 번호 마커(01/02/03)는 쓰지 않는다. 푸터의 `n / N`은 넘김 순서를 나타내는 실제 시퀀스라서 예외다.
  세션 포인트는 체크 불릿으로 표시한다.
- 색·반경·폰트는 `assets/theme.css`의 토큰만 쓴다. 사이트 테마를 바꾸면 `:root` 블록을 같이 갱신한다.
- 폰트는 Pretendard Variable(jsDelivr)이고, 렌더링은 `document.fonts.ready`를 기다린다. 오프라인이면 시스템 폰트로 대체된다.

## 브랜드 에셋 (출처 검증됨)
- 브랜드 마크는 **Flutter Seoul 마크**(`assets/brand/flutter-seoul-mark.svg`)를 쓴다. 카드 헤더와 cover 워터마크에 들어간다.
- Flutter 로고와 Dash는 `assets/brand/`에 있는 **공식 원본**만 쓴다. 출처와 사용 규칙은 [SOURCES.md](../assets/brand/SOURCES.md)에 있다.
  Flutter 로고는 변형(재채색, 재작도)하지 않고, 가장 두드러지는 요소로 쓰지 않는다. 로고를 쓴 카드에는 Google 상표 고지를 넣는다.
- 출처를 알 수 없는 Flutter/Dash 이미지(검색 결과, 팬아트 등)는 쓰지 않는다. spec에서는 `.agents/skills/card-news/assets/brand/dash.png`처럼 참조한다.

## 이미지 & 마스킹

| 이미지 종류 | 권장 설정 | 이유 |
| --- | --- | --- |
| 연사 프로필 | `fit: cover`, `mask: squircle`(기본) / circle / arch / leaf, `focus`로 얼굴 위치 | 크롭해서 얼굴을 크게. 마스크를 따라가는 부드러운 drop-shadow로 흰 배경 사진도 경계가 보임 |
| 세션 연사 아바타 | `mask: circle` (고정 원형) | 작은 크기에서도 식별 가능 |
| 후원사 로고 | `fit: contain`, `plate: white` (기본) | 로고는 절대 크롭하지 않음. 흰 판과 헤어라인, 여백 `inset` |
| 굿즈·후원상품 (누끼/투명 PNG) | `fit: contain`, `plate: paper` | 상품 전체가 보이게, 연한 판 위에 배치 |
| 굿즈 (연출 사진) | `fit: cover`, `mask: rounded` | 사진을 꽉 채워 |
| 행사 배너 | `fit: cover`, `focus` 조정 | 남는 세로 공간을 채움 (square에선 숨김) |

- **focus**: `"50% 30%"`처럼 x y. 인물이 프레임 위쪽이면 y를 20~35%로 둔다. 전신이나 무대 사진이면 `zoom: 1.2~1.5`로 얼굴을 키운다.
- **해상도**: `check`가 실제 표시 크기 대비 확대 배율이 1.25배를 넘으면 경고한다. 프로필은 최소 800px 정사각형을 권장한다.
- 빈 이미지 슬롯은 사선 패턴 placeholder로 표시된다. 검토용이므로 승인 전에 채운다.

## 사이즈
- `portrait` 1080×1350 (4:5): 인스타그램·링크드인 피드 기본
- `square` 1080×1080: X·페이스북·피드 호환. 자동 축소 규칙이 적용된다(bio와 banner 숨김, 사진 축소).
- `story` 1080×1920: 스토리·릴스. 상하 250px에 UI가 겹치므로 여백을 둔다.

## 디자인 스타일 (`style`)

같은 spec을 다른 디자인 방향으로 렌더링하는 스타일 레이어가 있다(`scripts/styles.mjs`, `assets/styles.css`).
`spec.style`(덱 전체) 또는 `card.style`(카드 한 장)로 지정하고, 현재는 **speaker** 템플릿에만 적용된다.
스타일이 없는 템플릿은 기본 디자인으로 렌더링된다.

| style | 방향 | 사진 요구 |
| --- | --- | --- |
| `facets` | Flutter Seoul 누각 마크 프레임 (문 자리에 사진) | 600px 이상 |
| `editorial` | 가로 괘선 에디토리얼, 표 형식 메타 | 700px 이상 |
| `duotone` | 네이비↔스카이 듀오톤 풀블리드 | 1100px 이상 |
| `split` | 사진 / 네이비 패널 2분할 | 1100px 이상 |
| `poster` | 브랜드 블루 위 초대형 라틴 이름 타이포 | 800px 이상 |
| `badge` | 랜야드 명찰 메타포 | 600px 이상 |
| `inspector` | Flutter 디버그 페인트 라벨과 디버그 배너 | 600px 이상 |
| `code` | Dart 생성자 코드 에디터 | 600px 이상 |
| `sticker` | 커뮤니티 스티커와 공식 Dash | 600px 이상 |
| `magazine` | 풀블리드 인물 사진과 마스트헤드 | 1600px 이상 |

스타일 전용 규칙: 이름 96px 이상, 발표 제목 44px 이상, mono 텍스트 26px 이상. 정보는 이름, 소속, 제목, 일정, 장소로
제한한다. 텍스트는 단색 면 위에 둔다. `examples/speaker-kaae-styles.json`이 10종 비교 덱이다.
Google I/O의 장치(`{ }` 괄호, 검정 배경, 무지개 그라디언트)는 쓰지 않는다.
