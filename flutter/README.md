# Flutter Korea 2026 — Flutter Web port

SvelteKit 원본 사이트(리포지토리 루트)를 **Flutter Web**으로 포팅한 앱입니다.
디자인 시스템(`src/app.css`), 콘텐츠(`src/lib/content.js`), 인터랙션을 1:1로 옮겼습니다.

## 명령어

```bash
fvm flutter pub get        # 의존성 설치
fvm flutter run -d chrome  # 개발 실행
fvm flutter analyze        # 정적 분석 (0 이슈 유지)
fvm flutter test           # 단위 테스트
fvm flutter build web      # 릴리스 빌드 → build/web
```

## 배포 (SvelteKit 사이트와 합성)

`.github/workflows/deploy.yml`이 push 시 이 앱을 함께 빌드해
`build/flutter/`로 합성한 뒤 하나의 Pages 아티팩트로 배포합니다:

```bash
flutter build web --release --base-href "${BASE_PATH}/flutter/"
```

배포된 사이트에서 **`?mode=flutter`** 쿼리 스트링으로 진입하면 SvelteKit 쪽
`src/app.html`의 인라인 스크립트가 이 Flutter 빌드(`<base>/flutter/`)로
리다이렉트합니다 (`/speakers` → `#/speakers` 매핑, 대소문자 무시). 기본값은
SvelteKit이며, Flutter 앱이 **`?mode=svelte`**(또는 `sveltekit`)를 받으면
`web/index.html`의 대칭 스크립트가 SvelteKit 사이트로 되돌립니다
(`#/speakers` → `../speakers/`).

라우팅은 Flutter 기본 **해시 전략**(`/#/speakers`)을 사용하므로 정적 호스팅에서
딥링크 404가 발생하지 않습니다. CI의 Flutter 버전(3.38.3)은 로컬 fvm 버전과
맞춰 관리합니다.

## 구조

```
lib/
  main.dart              # MaterialApp.router + go_router (/, /speakers)
  nav.dart               # 앵커/외부 링크 네비게이션 헬퍼
  content/content.dart   # ko/en 콘텐츠 (타입 클래스라 구조 미러가 컴파일 타임에 보장)
  i18n/i18n.dart         # 언어 상태 (ChangeNotifier) + shared_preferences 저장
  theme/
    tokens.dart          # app.css 커스텀 프로퍼티 포팅 (색·radius·그림자·모션·breakpoint)
    typography.dart      # Pretendard/JetBrains Mono variable + 유동 타입 스케일(clamp)
  shell/
    scroll_hub.dart      # 페이지별 ScrollController·스크롤 스파이·앵커 스크롤
    site_scaffold.dart   # 고정 배너+헤더 (스크롤 시 top 애니메이션 동기화), 모바일 드로어
    announcement_bar.dart / site_header.dart / site_footer.dart
  widgets/               # Reveal, FkButton, FkChip, PulseDot, Countdown, ComingSoon,
                         # LiftCard(호버 리프트+상단 액센트), StrokeIcon(SVG path 파서), …
  sections/              # Hero, Overview, About, Sessions, Timetable, CFP, Tickets, Sponsors
  pages/                 # home_page.dart, speakers_page.dart
assets/fonts/            # PretendardVariable.ttf, JetBrainsMono-Variable.ttf
```

## 포팅 노트 (원본과의 대응)

- **디자인 토큰**: `app.css`의 CSS 변수 → `FkColors`/`FkRadii`/`FkShadows`/`FkMotion`.
  그라디언트는 원본 규칙 그대로 **Hero와 AnnouncementBar에만** 사용합니다.
- **유동 타이포**: CSS `clamp(min, base+vw, max)` → `FkType.*(vw)` 함수.
- **아이콘**: 원본 인라인 SVG(stroke, round cap)를 `StrokeIcon`의 미니 SVG path 파서로
  그대로 렌더링해 픽셀 충실도를 유지합니다 (Material 아이콘 대체 없음).
- **use:reveal** → `Reveal` 위젯 (뷰포트 92% 지점 진입 시 18px 상승 + 페이드, 딜레이 지원).
- **스크롤 스파이** (`IntersectionObserver -40%/-50%`) → `ScrollHub`가 뷰포트 40–50%
  밴드와 섹션 교차를 계산.
- **배너/헤더 접힘**: scrollY > 0 이면 배너가 위로 사라지고 헤더가 상단에 고정 —
  `AnimatedPositioned` 두 개가 같은 duration/curve로 `top`을 움직입니다.
- **카운트다운**: `2026-11-07T11:00:00+09:00` 고정 오프셋, 1초 틱, LIVE/종료 상태 포함.
- **i18n**: `dict.ko/en` → `koContent`/`enContent` (`Content` 클래스 공유로 구조 동일성이
  타입 체크됨). 언어는 `fk26-lang` 키로 localStorage(shared_preferences)에 저장.
- **컨테이너 쿼리** (티켓 가격 `22cqi`): 그리드에서 카드 폭을 계산해 폰트 크기로 환산.
  ⚠️ `IntrinsicHeight` 행 안에 `LayoutBuilder`를 넣으면 고유 높이가 0으로 붕괴하므로
  카드 내부에서 LayoutBuilder를 쓰지 않습니다.
- **접근성/모션**: `MediaQuery.disableAnimations` (prefers-reduced-motion)일 때 reveal·
  stagger·pulse 애니메이션을 생략합니다.

## 원본과 다른 점

- 라우트가 해시 기반(`/#/speakers`)입니다 (정적 호스팅 호환).
- SSR/프리렌더 없음 — Flutter Web은 클라이언트 렌더링이며, SEO 메타는
  `web/index.html`에 정적으로 포함되어 있습니다.
- 폰트는 CDN 대신 variable TTF 두 개를 번들합니다 (`FontVariation('wght', …)`).
