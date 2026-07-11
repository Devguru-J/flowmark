import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const THEME_OPTIONS = ['light', 'dark', 'system'] as const
export type ThemeOption = (typeof THEME_OPTIONS)[number]

interface ThemeState {
  theme: ThemeOption
  setTheme: (theme: ThemeOption) => void
}

const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function apply(theme: ThemeOption): void {
  const dark = theme === 'dark' || (theme === 'system' && (media?.matches ?? false))
  document.documentElement.classList.toggle('dark', dark)
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        apply(theme)
      },
    }),
    {
      name: 'flowmark.theme',
      onRehydrateStorage: () => (state) => {
        apply(state?.theme ?? 'system')
      },
    },
  ),
)

// First paint before rehydration completes, and OS-level changes while
// in "system" mode, both need explicit application.
apply(useTheme.getState().theme)
media?.addEventListener('change', () => {
  if (useTheme.getState().theme === 'system') apply('system')
})
