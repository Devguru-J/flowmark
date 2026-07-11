# Flowmark MVP Design

**Date:** 2026-07-11
**Status:** Approved (user, 2026-07-11)
**Source of truth:** `docs/00_DOCUMENTATION_INDEX.md` (the only accepted document; files 01–133 are unauthored, so the charter constraints in its Section 12 govern)

## 1. Goal

Build the Flowmark MVP web app — a Korean-first / English-supported task management application positioned around **clarity and speed** — plus a Stitch-generated visual design that the implementation follows.

## 2. Decisions made with the user

| Question | Decision |
|---|---|
| Site scope | Task management web app MVP (not a marketing page) |
| Backend | Local-first: `TaskRepository` abstraction over localStorage now, Supabase adapter seam for later. No Supabase project exists yet. |
| Auth | Login/register UI + protected-route structure with a mock session; swappable for Supabase Auth |
| Stitch | Author DESIGN.md + prompts, then actually run Stitch MCP (project → design system → key screens) and feed results into implementation |
| Visual direction | Minimal editorial (Linear/Things register) — matches the documented "clarity and speed" positioning |
| Approach | Stitch-first pipeline: design generated before UI implementation |

## 3. Scope

### In (MVP)

- **Auth screens:** login, register. Mock session stored locally; route guard on `/app/*`.
- **App shell:** sidebar navigation — Inbox, Today, Upcoming, status views (To Do / In Progress / Completed), Trash, Settings. Responsive: sidebar collapses on mobile.
- **Task list:** quick-capture input, inline complete toggle, priority + due-date badges, empty/loading states.
- **Task detail panel:** title, description, status (Inbox / To Do / In Progress / Completed / Cancelled), priority (none / low / medium / high), due date with optional time.
- **Search, filter, sort:** reflected in URL query state.
- **Trash:** soft delete, restore, permanent delete.
- **Settings:** theme (light / dark / system), language (ko default / en).
- **Dark mode** token-based from day one.
- **i18n:** all strings through i18next; `ko` primary, `en` fallback.

### Out (explicitly)

- Real Supabase connection, RLS, edge functions (adapter seam only).
- Notifications, collaboration, realtime, file storage (docs mark these Future).
- Marketing/landing pages.

## 4. Architecture

- **Stack (fixed by charter):** TypeScript, React, Vite, TanStack Router, TanStack Query, Zustand (client-only state), React Hook Form, Zod, Tailwind CSS, Radix UI, Lucide, date-fns, i18next, pnpm.
- **Structure:** feature-based — `src/features/{tasks,auth,settings}`, `src/shared/{ui,lib,i18n}`, `src/routes`.
- **Data layer:** `TaskRepository` interface (list/get/create/update/softDelete/restore/hardDelete). `LocalStorageRepository` implements it now; a `SupabaseRepository` stub documents the swap point. TanStack Query modules call only the interface — UI code never touches storage directly.
- **State allocation (docs `48` policy):** remote-shaped data in TanStack Query; URL owns search/filter/sort; Zustand only for UI state (theme, sidebar); forms in React Hook Form + Zod.
- **Domain model:** `Task { id, title, description?, status, priority, dueDate?, dueTime?, createdAt, updatedAt, completedAt?, deletedAt? }` with Zod as the canonical contract. Status transitions per docs `17`/`22` intent: completing sets `completedAt`; reopening clears it; delete is soft (`deletedAt`).

## 5. Stitch pipeline

1. Generate `DESIGN.md` with the `stitch-design-taste` skill (minimal editorial tone).
2. Create Stitch project, apply design system from DESIGN.md.
3. Generate four screens: login, task list with sidebar, task detail, settings.
4. Extract color/type/spacing tokens from the results into the Tailwind theme; implement screens to match.

## 6. Quality

- Empty / loading / error states defined per screen (docs `32` intent).
- Vitest unit tests for domain logic: status transitions, sort/filter rules, repository.
- Accessibility: Radix primitives, visible focus, semantic landmarks, no color-only meaning.
- Frontend treated as untrusted; no service-role credential anywhere (charter rule).

## 7. Risks

- Docs 01–133 unauthored: where the index implies but doesn't specify behavior (e.g., exact priority names), this spec's choices are provisional and cheap to change.
- Stitch output may not match the token structure exactly; tokens are extracted judgmentally, DESIGN.md is the tiebreaker.
