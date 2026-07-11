# Flowmark — Stitch 화면 생성 프롬프트

`DESIGN.md`(프로젝트 루트)를 디자인 시스템으로 업로드/적용한 뒤, 아래 프롬프트로 화면을 생성한다. 각 프롬프트는 Stitch가 가장 잘 해석하는 영어로 작성했고, UI 문구는 한국어를 명시했다.

---

## Screen 1 — Login (로그인)

> Desktop web login screen for "Flowmark", a Korean task management app. Asymmetric split layout: left 5/12 column on warm paper background (#FAFAF9) with the wordmark "Flowmark" set in Geist 600 at modest size, below it one quiet Korean sentence "생각을 붙잡고, 바로 실행하세요" in Pretendard, secondary graphite color. Right 7/12 column on white surface with a left-aligned form, max width 360px: Korean labels above inputs — "이메일" and "비밀번호" — fields with 1px hairline borders (#E7E5E4), 8px radius, cobalt (#3B5BDB) focus ring. One primary cobalt button "로그인", full width, flat, no gradient. Below the form a single quiet line: "계정이 없으신가요?" with a cobalt text link "회원가입". No centered card floating in a void, no illustrations, no social login buttons, no emojis. Editorial, minimal, fast-feeling.

## Screen 2 — Task list with sidebar (메인 작업 목록)

> Desktop web app main screen for "Flowmark" task manager, three-zone CSS grid. LEFT: 240px sidebar on warm paper (#FAFAF9) with 1px hairline right border; top shows wordmark "Flowmark"; nav items with 16px Lucide icons, Korean labels and right-aligned monospace counts — "받은함 4", "오늘 3", "예정 7", then a section label "상태", then "할 일", "진행 중", "완료", then lower items "휴지통", "설정". Active item "오늘" has a soft cobalt wash background (#EDF2FF) with cobalt text (#3B5BDB). CENTER: task list column, max-width 760px left-aligned, screen title "오늘" at 22px Geist/Pretendard 600 with monospace count "3", below it a quick-capture input with placeholder "작업 추가…" and a small ⏎ hint chip. Under it, tasks as full-width ROWS separated by 1px hairline dividers (NOT cards): each row has a circular checkbox, task title in warm ink (#1C1917) 15px — Korean sample tasks "분기 보고서 초안 작성", "디자인 리뷰 피드백 정리", "지출 결의서 제출" — and right-aligned small metadata: a priority flag icon with label "높음" in rust (#C2410C) on the first task, due chips in 12px monospace like "오후 3:00". One completed row at bottom: filled cobalt checkbox, title struck through in fog gray. Warm neutrals only, single cobalt accent, no purple, no shadows on rows, generous whitespace, editorial and calm.

## Screen 3 — Task detail panel (작업 상세)

> Same Flowmark desktop layout as the task list screen, now with a third zone: RIGHT detail panel, 400px, white surface with 1px hairline left border, open for the selected task "분기 보고서 초안 작성" whose list row shows a subtle cobalt-wash selected state. Panel content top-to-bottom: borderless editable title "분기 보고서 초안 작성" at 18px weight 600; a description area with placeholder "설명 추가…" in fog gray; then quiet property rows, each 40px tall with Korean label left in 12px graphite and value right as a ghost dropdown — "상태: 진행 중", "우선순위: 높음" with a small rust flag icon, "마감일: 7월 14일 (월) 오후 3:00" in monospace. Bottom of panel: created/updated timestamps in 12px monospace graphite "생성 7월 10일 · 수정 오늘", and a quiet ghost destructive text button "휴지통으로 이동" in rust. No modal, no heavy borders, no card stacking — one calm editorial panel.

## Screen 4 — Settings (설정)

> Flowmark desktop settings screen, same 240px sidebar (active item now "설정"). Content column max-width 640px, left-aligned, screen title "설정" at 22px weight 600. Two quiet sections separated by 32px gaps with 12px graphite section labels: "화면" section contains a row "테마" with a segmented control of three options "라이트 / 다크 / 시스템" (active segment cobalt wash with cobalt text), and a row "언어" with a ghost dropdown showing "한국어". "계정" section contains rows for "이메일 — kim.seoyeon@example.com" in monospace, and a quiet destructive text button "로그아웃" in rust. Rows are 48px tall, separated by hairline dividers, label left and control right. No cards, no toggles with neon colors, warm neutrals with single cobalt accent, editorial calm.

## Screen 5 (보너스) — 다크 모드 변형

> Generate a dark mode variant of the Flowmark task list screen: warm charcoal canvas (#131110), panel surfaces #1E1B19, primary text #F5F5F4, hairlines #2C2926, accent lifted to #5C7CFA with rgba(92,124,250,0.12) washes. Same warm neutral family — never navy-tinted. Identical layout and Korean content as the light task list screen.

---

### 사용 순서 (Stitch MCP)

1. `create_project` — 프로젝트명 "Flowmark"
2. `upload_design_md` 또는 `create_design_system_from_design_md` — 루트 `DESIGN.md` 적용
3. `apply_design_system` — 프로젝트에 연결
4. `generate_screen_from_text` — 위 프롬프트 1→4 순서로 실행 (2번 결과가 만족스러우면 3번은 같은 화면 기준으로 생성)
5. 필요 시 `generate_variants`로 다크 모드 변형 생성
