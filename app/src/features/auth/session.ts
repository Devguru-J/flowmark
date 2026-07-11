import type { SupabaseClient, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import type { StoreApi, UseBoundStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../../shared/lib/supabase'

export interface SessionUser {
  email: string
  name: string
}

export type RegisterResult = 'ok' | 'confirm_email'

interface SessionState {
  user: SessionUser | null
  /** Throws on invalid credentials (Supabase mode); mock mode always succeeds. */
  login: (email: string, password: string) => Promise<void>
  /** Returns 'confirm_email' when Supabase requires email verification first. */
  register: (name: string, email: string, password: string) => Promise<RegisterResult>
  logout: () => Promise<void>
}

type SessionStore = UseBoundStore<StoreApi<SessionState>>

function nameFromEmail(email: string): string {
  return email.split('@')[0] ?? email
}

function toSessionUser(user: User): SessionUser {
  const metaName = (user.user_metadata as Record<string, unknown> | null)?.name
  const email = user.email ?? ''
  return {
    email,
    name: typeof metaName === 'string' && metaName !== '' ? metaName : nameFromEmail(email),
  }
}

function createSupabaseSession(client: SupabaseClient): SessionStore {
  return create<SessionState>()((set) => ({
    user: null,
    login: async (email, password) => {
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) throw new Error(error.message)
      set({ user: toSessionUser(data.user) })
    },
    register: async (name, email, password) => {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { name } },
      })
      if (error) throw new Error(error.message)
      if (!data.session || !data.user) return 'confirm_email'
      set({ user: toSessionUser(data.user) })
      return 'ok'
    },
    logout: async () => {
      await client.auth.signOut()
      set({ user: null })
    },
  }))
}

function createMockSession(): SessionStore {
  return create<SessionState>()(
    persist(
      (set) => ({
        user: null,
        login: async (email) => {
          await new Promise((resolve) => setTimeout(resolve, 250))
          set({ user: { email, name: nameFromEmail(email) } })
        },
        register: async (name, email) => {
          await new Promise((resolve) => setTimeout(resolve, 250))
          set({ user: { email, name } })
          return 'ok'
        },
        logout: async () => {
          set({ user: null })
        },
      }),
      { name: 'flowmark.session' },
    ),
  )
}

export const useSession: SessionStore = supabase
  ? createSupabaseSession(supabase)
  : createMockSession()

/**
 * Restores the persisted Supabase session before first render so the router
 * guard sees the correct state synchronously. No-op in mock mode.
 */
export async function initSession(): Promise<void> {
  if (!supabase) return
  const { data } = await supabase.auth.getSession()
  useSession.setState({ user: data.session ? toSessionUser(data.session.user) : null })
  supabase.auth.onAuthStateChange((_event, session) => {
    useSession.setState({ user: session ? toSessionUser(session.user) : null })
  })
}
