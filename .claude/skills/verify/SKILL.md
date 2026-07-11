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

## Supabase mode

- With `app/.env.local` (VITE_SUPABASE_URL/ANON_KEY) present, auth and tasks hit the real Supabase project; without it the app is local-first (mock auth + localStorage). Restart the dev server after env changes.
- DB inspection: `/opt/homebrew/opt/libpq/bin/psql -h aws-1-ap-northeast-2.pooler.supabase.com -p 5432 -U postgres.shaeqnuariekbmbcuwzr -d postgres` (password from the user; the direct `db.*` host does not resolve on IPv4).
- Email confirmation is ON: after signup, confirm via emailed link or `update auth.users set email_confirmed_at = now() where email = '…'`.
- RLS probe: REST call with only the anon key must return `[]` for select and 42501 for insert.

## Gotchas

- Radix Select options render in a portal: target `div[role="option"]:has-text("…")`.
- Two `<aside>` elements exist when the detail panel is open (sidebar + panel) — use `aside.fixed` for the panel.
- Unknown `/app/<view>` param redirects to `/app/today`; valid views: inbox, today, upcoming, todo, in-progress, completed.
- jsdom lacks `window.localStorage` in this vitest setup — repository tests inject an in-memory Storage stub instead.
