# Design System: Flowmark

Korean-first task management web app. Positioning: **clarity and speed**. Register: minimal editorial — the confidence of Linear, the calm of Things. This document is the single source of truth for every generated screen.

## 1. Visual Theme & Atmosphere

A quiet, editorial productivity tool that feels like a well-set page of print: generous whitespace, precise typographic hierarchy, almost no decoration. Density is "daily app balanced" (5/10) — comfortable for scanning twenty tasks without feeling like a cockpit. Variance is restrained-asymmetric (4/10): layouts are left-anchored and grid-true, never centered-symmetric poster layouts, never chaotic. Motion is fluid but economical (4/10): spring-physics micro-transitions that confirm actions in under 200ms, nothing cinematic. The interface should feel *fast before it is beautiful* — every visual decision serves scanning speed and decision clarity. Chrome recedes; the user's own words (task titles) are the loudest thing on screen.

## 2. Color Palette & Roles

### Light mode
- **Paper** (#FAFAF9) — App canvas. Warm-tinted near-white, never sterile blue-white.
- **Surface** (#FFFFFF) — Raised panels: sidebar cards, detail panel, dialogs.
- **Ink** (#1C1917) — Primary text and icons. Warm off-black; pure #000000 is banned.
- **Graphite** (#57534E) — Secondary text: descriptions, metadata, timestamps.
- **Fog** (#A8A29E) — Tertiary: placeholders, disabled labels, completed-task titles.
- **Hairline** (#E7E5E4) — 1px structural borders, list dividers. No heavy borders.
- **Cobalt** (#3B5BDB) — The single accent. Primary buttons, active nav item, focus rings, selected states, links. Saturation ~68%, never neon.
- **Cobalt Wash** (#EDF2FF) — Accent tint for active-nav background and selected rows.

### Functional signals (used only as small dots, tags, and text — never large fills)
- **Overdue Rust** (#C2410C) — overdue due-dates, destructive actions, errors.
- **Amber Signal** (#B45309) — due-today emphasis, warnings.
- **Field Green** (#15803D) — completed confirmations, success toasts.
- Priority is communicated by a small flag icon + label, colored: high = Overdue Rust, medium = Amber Signal, low = Graphite. Never color-only: always paired with icon or text.

### Dark mode
- **Night Canvas** (#131110) — app background (warm charcoal, not navy).
- **Night Surface** (#1E1B19) — panels and cards.
- **Night Ink** (#F5F5F4) — primary text.
- **Night Graphite** (#A8A29E) — secondary text.
- **Night Hairline** (#2C2926) — borders.
- **Cobalt Bright** (#5C7CFA) — accent lifted one step for contrast on dark; wash becomes rgba(92,124,250,0.12).
- Same warm-neutral family in both modes — no cool/warm gray fluctuation between themes.

## 3. Typography Rules

- **Latin Display & UI:** Geist — tracking-tight headlines, weight-driven hierarchy (600 for screen titles, 500 for section labels, 400 body). Screen titles are modest: 1.375rem (22px), never poster-sized.
- **Korean:** Pretendard — pairs with Geist at matching optical weight. All UI copy is Korean-first (e.g. "오늘", "받은함", "새 작업", "마감일"); English is the i18n fallback, not the default.
- **Mono:** Geist Mono — timestamps, dates, keyboard shortcut hints (⌘K style chips), task counts in the sidebar.
- **Body:** 0.9375rem (15px), line-height 1.6, max 65ch for descriptions.
- **Section labels:** 0.75rem (12px), uppercase for Latin / regular for Korean, letter-spacing 0.05em, Graphite color.
- **Banned:** Inter, system default stacks, all serif fonts (this is a software dashboard), font-size hierarchy achieved by hugeness — hierarchy comes from weight, color, and spacing.

## 4. Component Stylings

- **Buttons:** Flat fills, 0.5rem (8px) radius, no gradients, no outer glow. Primary = Cobalt fill with white text; secondary = ghost with Hairline border; destructive = ghost with Overdue Rust text. Active state: translate down 1px, tactile. Height 2.25rem (36px) desktop, min 44px touch target on mobile.
- **Task rows:** The core component. Not cards — full-width rows separated by Hairline dividers, 0.75rem vertical padding. Left: circular checkbox (1.25rem, Hairline border, fills Cobalt with white check on complete). Title in Ink 15px. Right-aligned metadata cluster in Mono 12px: priority flag, due-date chip. Completed rows: title struck through in Fog, checkbox filled. Hover: Paper→Surface tint, no lift or shadow.
- **Sidebar:** 240px fixed, Paper background, Hairline right border. Nav items 2rem tall, 0.375rem radius, icon (Lucide, 16px, 1.5px stroke) + label + right-aligned Mono count. Active item: Cobalt Wash background + Cobalt text; hover: neutral wash. Sections separated by 1.5rem gaps with section labels.
- **Detail panel:** 400px right panel on Surface with Hairline left border (desktop); full-screen sheet on mobile. Title as borderless editable text at 1.125rem/600. Property rows (status, priority, due) as label-left value-right pairs, 2.5rem tall, opened by quiet ghost dropdowns.
- **Inputs:** Label above (12px Graphite), field on Surface with Hairline border, 0.5rem radius, focus = 2px Cobalt ring. Error text below in Overdue Rust 12px. No floating labels.
- **Quick capture:** A single prominent input pinned atop the task list — Hairline border, "작업 추가…" placeholder in Fog, ⏎ chip hint in Mono at right. Enter commits instantly; no modal.
- **Dropdowns/menus:** Surface, 0.5rem radius, 8px shadow tinted to canvas hue (rgba(28,25,23,0.08)), 1px Hairline border.
- **Loaders:** Skeleton rows matching the exact task-row geometry (checkbox circle + title bar + meta chip), shimmering. Never circular spinners.
- **Empty states:** Composed and quiet — a single line-art Lucide icon at 32px in Fog, one Korean sentence of guidance ("받은함이 비어 있어요"), and the quick-capture input already focused. No illustration blobs, no mascots.
- **Toasts:** Bottom-left, Surface, Hairline border, auto-dismiss, with inline "실행 취소" (undo) action in Cobalt.

## 5. Layout Principles

- App shell = CSS Grid: `[sidebar 240px] [list minmax(0,1fr)] [detail 400px]`. Detail column mounts only when a task is selected; list column max-width 760px, left-aligned within its track — content never floats centered in a wide viewport.
- Login/register: asymmetric split — left 5/12 column carries the wordmark, one quiet Korean sentence of value ("생각을 붙잡고, 바로 실행하세요"), on Paper; right 7/12 holds the form on Surface. Never a lone centered card in a void.
- Spacing scale: 4px base — 4/8/12/16/24/32/48. List padding 24px, panel padding 24px, section gaps 32px.
- Full-height uses `min-h-[100dvh]`, never `h-screen`.
- No overlapping elements, no absolute-position stacking; every element owns its spatial zone.
- Mobile (<768px): single column; sidebar becomes a slide-in drawer behind a top app bar; detail panel becomes a full-screen sheet; all touch targets ≥44px; no horizontal scroll ever.

## 6. Motion & Interaction

- Spring physics (stiffness 100, damping 20) for panel slide-ins, checkbox fill, toast entry. No linear easing anywhere.
- Task completion: checkbox fills with a 150ms spring pop, title fades to Fog and strikes through; row settles rather than vanishing instantly.
- List mounts: staggered 20ms cascade per row, opacity + 4px translateY — perceptible but not theatrical.
- Detail panel: slides 8px + fades in 180ms.
- Animate `transform` and `opacity` only; never top/left/width/height.
- `prefers-reduced-motion`: all transitions collapse to instant opacity changes.

## 7. Anti-Patterns (Banned)

- No emojis anywhere in the UI.
- No Inter, no serif fonts, no system default type for headings.
- No pure black (#000000); no navy-tinted grays mixed with warm grays.
- No purple/neon accents, no gradient buttons, no outer glows, no glassmorphism.
- No card-grid layouts for tasks — tasks are divider-separated rows.
- No 3-equal-column feature layouts, no centered hero-card login in a void.
- No circular spinners; skeletons must match real layout geometry.
- No color-only meaning: every status/priority pairs color with icon or text.
- No generic placeholder names ("John Doe", "Acme") — use Korean sample data: 김서연, 박지훈; tasks like "분기 보고서 초안 작성", "디자인 리뷰 피드백 정리".
- No fake round numbers; counts look real (3, 7, 12 — not 99+).
- No AI copywriting clichés ("Elevate", "Seamless", "혁신적인", "완벽한").
- No "Scroll to explore", bouncing chevrons, or filler UI text.
- No custom cursors, no decorative background blobs or grain overlays — the canvas stays clean.
