import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSession } from '../auth/session'
import { PropertySelect } from '../tasks/components/PropertySelect'
import { THEME_OPTIONS, useTheme } from './theme'

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-4 border-b border-hairline">
      <span className="text-[15px] text-ink">{label}</span>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-graphite">{children}</p>
}

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const user = useSession((s) => s.user)
  const logout = useSession((s) => s.logout)

  const themeLabels = {
    light: t('settings.themeLight'),
    dark: t('settings.themeDark'),
    system: t('settings.themeSystem'),
  } as const

  const language = i18n.language?.startsWith('en') ? 'en' : 'ko'

  return (
    <div className="mx-auto w-full max-w-160 px-6 py-8 lg:mx-0">
      <h1 className="text-[22px] font-semibold tracking-tight text-ink">{t('settings.title')}</h1>

      <section className="mt-8 flex flex-col gap-2">
        <SectionLabel>{t('settings.display')}</SectionLabel>
        <SettingsRow label={t('settings.theme')}>
          <div
            role="radiogroup"
            aria-label={t('settings.theme')}
            className="flex h-8 items-center gap-0.5 rounded-lg border border-hairline p-0.5"
          >
            {THEME_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={theme === option}
                onClick={() => setTheme(option)}
                className={`h-full rounded-md px-2.5 text-xs transition-colors ${
                  theme === option
                    ? 'bg-wash font-medium text-cobalt'
                    : 'text-graphite hover:text-ink'
                }`}
              >
                {themeLabels[option]}
              </button>
            ))}
          </div>
        </SettingsRow>
        <SettingsRow label={t('settings.language')}>
          <PropertySelect<'ko' | 'en'>
            value={language}
            ariaLabel={t('settings.language')}
            options={[
              { value: 'ko', label: t('settings.korean') },
              { value: 'en', label: t('settings.english') },
            ]}
            onChange={(lng) => i18n.changeLanguage(lng)}
          />
        </SettingsRow>
      </section>

      <section className="mt-8 flex flex-col gap-2">
        <SectionLabel>{t('settings.account')}</SectionLabel>
        <SettingsRow label={t('settings.email')}>
          <span className="font-mono text-[13px] text-graphite">{user?.email}</span>
        </SettingsRow>
        <SettingsRow label={t('settings.logout')}>
          <button
            type="button"
            onClick={() => {
              logout()
              void navigate({ to: '/login' })
            }}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-rust transition-colors hover:bg-rust/10 active:translate-y-px"
          >
            <LogOut size={14} strokeWidth={1.5} aria-hidden />
            {t('settings.logout')}
          </button>
        </SettingsRow>
      </section>
    </div>
  )
}
