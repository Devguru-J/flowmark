import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SessionUser {
  email: string
  name: string
}

interface SessionState {
  user: SessionUser | null
  /**
   * Mock authentication: accepts any well-formed credentials and creates a
   * local session. Swap the internals for Supabase Auth (docs 24) — the
   * store shape and call sites stay identical.
   */
  login: (email: string, _password: string) => Promise<void>
  register: (name: string, email: string, _password: string) => Promise<void>
  logout: () => void
}

function nameFromEmail(email: string): string {
  return email.split('@')[0] ?? email
}

export const useSession = create<SessionState>()(
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
      },
      logout: () => set({ user: null }),
    }),
    { name: 'flowmark.session' },
  ),
)
