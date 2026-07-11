import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Asymmetric auth split per DESIGN.md: brand column on paper (5/12),
 * form column on raised surface (7/12). Collapses to a single column
 * on mobile with the brand block as a compact header.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-12">
      <div className="flex flex-col justify-between bg-canvas px-8 py-8 md:col-span-5 md:px-12 md:py-12">
        <div>
          <p className="font-sans text-xl font-semibold tracking-tight text-cobalt">
            {t('app.name')}
          </p>
          <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-graphite">
            {t('app.tagline')}
          </p>
        </div>
        <p className="hidden font-mono text-xs text-fog md:block">Flowmark MVP</p>
      </div>
      <div className="flex items-center border-hairline bg-raised px-8 py-12 md:col-span-7 md:border-l md:px-24">
        <div className="w-full max-w-90">{children}</div>
      </div>
    </div>
  )
}
