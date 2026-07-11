import type { TaskRepository } from './repository'

/**
 * Planned Supabase-backed implementation (docs 53–59: PostgreSQL + RLS).
 *
 * The swap point is `getTaskRepository()` in ./index.ts — implement this
 * class against `@supabase/supabase-js`, map the `tasks` table (owner_id,
 * RLS `owner_id = auth.uid()`), and return it there when
 * `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are configured.
 * No UI or query-module change is required.
 */
export class SupabaseTaskRepository {
  static isConfigured(): boolean {
    return Boolean(
      import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
    )
  }

  static create(): TaskRepository {
    throw new Error('SupabaseTaskRepository is not implemented yet (local-first MVP).')
  }
}
