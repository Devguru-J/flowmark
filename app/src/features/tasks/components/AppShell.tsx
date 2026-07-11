import { Outlet } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog } from 'radix-ui'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const { t } = useTranslation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-[100dvh] bg-canvas">
      {/* Mobile top bar with drawer trigger */}
      <header className="flex h-12 items-center gap-3 border-b border-hairline px-4 md:hidden">
        <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label={t('nav.openMenu')}
              className="flex size-11 items-center justify-center rounded-md text-graphite"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/20" />
            <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-60 bg-canvas shadow-lg outline-none">
              <Dialog.Title className="sr-only">{t('app.name')}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={t('nav.closeMenu')}
                  className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-md text-graphite"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </Dialog.Close>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <p className="font-sans text-base font-semibold tracking-tight text-cobalt">
          {t('app.name')}
        </p>
      </header>

      <div className="md:grid md:min-h-[100dvh] md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <div className="sticky top-0 h-[100dvh]">
            <Sidebar />
          </div>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
