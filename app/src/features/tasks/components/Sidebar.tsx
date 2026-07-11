import { Link } from '@tanstack/react-router'
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Inbox,
  Loader,
  Settings,
  Sun,
  Trash2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTasks } from '../queries'
import { viewCounts } from '../domain/views'
import type { TaskView } from '../domain/views'

const MAIN_VIEWS: { view: TaskView; icon: LucideIcon; labelKey: string }[] = [
  { view: 'inbox', icon: Inbox, labelKey: 'nav.inbox' },
  { view: 'today', icon: Sun, labelKey: 'nav.today' },
  { view: 'upcoming', icon: CalendarDays, labelKey: 'nav.upcoming' },
]

const STATUS_VIEWS: { view: TaskView; icon: LucideIcon; labelKey: string }[] = [
  { view: 'todo', icon: Circle, labelKey: 'nav.todo' },
  { view: 'in-progress', icon: Loader, labelKey: 'nav.inProgress' },
  { view: 'completed', icon: CheckCircle2, labelKey: 'nav.completed' },
]

function ViewLink({
  view,
  icon: Icon,
  label,
  count,
  onNavigate,
}: {
  view: TaskView
  icon: LucideIcon
  label: string
  count?: number
  onNavigate?: () => void
}) {
  return (
    <Link
      to="/app/$view"
      params={{ view }}
      onClick={onNavigate}
      className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-graphite transition-colors hover:bg-ink/5"
      activeProps={{ className: '!bg-wash !text-cobalt font-medium' }}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && count > 0 ? (
        <span className="font-mono text-xs tabular-nums text-fog">{count}</span>
      ) : null}
    </Link>
  )
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation()
  const { data: tasks } = useTasks()
  const counts = tasks ? viewCounts(tasks) : undefined

  return (
    <nav
      aria-label={t('app.name')}
      className="flex h-full flex-col gap-6 border-r border-hairline bg-canvas px-3 py-5"
    >
      <p className="px-2.5 font-sans text-base font-semibold tracking-tight text-cobalt">
        {t('app.name')}
      </p>
      <div className="flex flex-col gap-0.5">
        {MAIN_VIEWS.map(({ view, icon, labelKey }) => (
          <ViewLink
            key={view}
            view={view}
            icon={icon}
            label={t(labelKey)}
            count={counts?.[view]}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="px-2.5 text-xs text-graphite">{t('nav.statusSection')}</p>
        <div className="flex flex-col gap-0.5">
          {STATUS_VIEWS.map(({ view, icon, labelKey }) => (
            <ViewLink
              key={view}
              view={view}
              icon={icon}
              label={t(labelKey)}
              count={counts?.[view]}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-0.5 border-t border-hairline pt-4">
        <Link
          to="/app/trash"
          onClick={onNavigate}
          className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-graphite transition-colors hover:bg-ink/5"
          activeProps={{ className: '!bg-wash !text-cobalt font-medium' }}
        >
          <Trash2 size={16} strokeWidth={1.5} aria-hidden />
          <span>{t('nav.trash')}</span>
        </Link>
        <Link
          to="/app/settings"
          onClick={onNavigate}
          className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-graphite transition-colors hover:bg-ink/5"
          activeProps={{ className: '!bg-wash !text-cobalt font-medium' }}
        >
          <Settings size={16} strokeWidth={1.5} aria-hidden />
          <span>{t('nav.settings')}</span>
        </Link>
      </div>
    </nav>
  )
}
