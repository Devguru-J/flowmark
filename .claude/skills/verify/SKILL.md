---
name: verify
description: Build, launch, and drive the Flowmark web app to verify changes end-to-end in a browser.
---

# Verifying Flowmark

## Build & launch

```bash
cd app
pnpm install            # first time only
pnpm test               # unit tests (Vitest, jsdom)
pnpm build              # tsc -b && vite build — catches type errors
pnpm dev --port 5199 --strictPort   # dev server (run in background)
```

## Drive (Playwright MCP)

- App redirects `/` → `/app/today` → `/login` when no session (mock auth, zustand-persisted in `flowmark.session`).
- Login with any valid email + 8-char password (mock; no backend).
- Core flow: login → quick capture (`input[aria-label="새 작업"]`, Enter submits) → click a row to open the detail panel (`?task=<id>` in URL) → toggle the circular checkbox to complete → 휴지통으로 이동 → `/app/trash` restore / 영구 삭제 (AlertDialog confirm).
- Settings (`/app/settings`): theme radiogroup (라이트/다크/시스템 — toggles `.dark` on `<html>`), language Radix select (ko/en, live switch).
- Task data persists in localStorage key `flowmark.tasks.v1`.

## Gotchas

- Radix Select options render in a portal: target `div[role="option"]:has-text("…")`.
- Two `<aside>` elements exist when the detail panel is open (sidebar + panel) — use `aside.fixed` for the panel.
- Unknown `/app/<view>` param redirects to `/app/today`; valid views: inbox, today, upcoming, todo, in-progress, completed.
- jsdom lacks `window.localStorage` in this vitest setup — repository tests inject an in-memory Storage stub instead.
