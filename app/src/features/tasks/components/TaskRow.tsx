import { Check, Flag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Task } from '../domain/task'
import { isOverdue } from '../domain/views'
import { formatDueLabel } from './dueFormat'

const PRIORITY_COLOR: Record<Task['priority'], string> = {
  high: 'text-rust',
  medium: 'text-amber-signal',
  low: 'text-graphite',
  none: '',
}

export function TaskRow({
  task,
  selected,
  onToggle,
  onSelect,
}: {
  task: Task
  selected: boolean
  onToggle: () => void
  onSelect: () => void
}) {
  const { t } = useTranslation()
  const completed = task.status === 'completed'
  const dueLabel = formatDueLabel(task)
  const overdue = isOverdue(task)

  return (
    <li
      className={`group flex items-center gap-3 border-b border-hairline px-1 py-3 transition-colors ${
        selected ? 'bg-wash' : 'hover:bg-raised'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={completed}
        aria-label={completed ? t('task.reopen') : t('task.complete')}
        onClick={onToggle}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
          completed
            ? 'border-cobalt bg-cobalt text-white'
            : 'border-hairline bg-raised hover:border-fog'
        }`}
      >
        {completed ? <Check size={12} strokeWidth={2.5} aria-hidden /> : null}
      </button>
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${t('task.select')}: ${task.title}`}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <span
          className={`min-w-0 flex-1 truncate text-[15px] ${
            completed ? 'text-fog line-through' : 'text-ink'
          }`}
        >
          {task.title}
        </span>
        <span className="flex shrink-0 items-center gap-2.5">
          {task.priority !== 'none' ? (
            <span
              className={`flex items-center gap-1 text-xs ${PRIORITY_COLOR[task.priority]}`}
            >
              <Flag size={12} strokeWidth={1.5} aria-hidden />
              {t(`task.priorities.${task.priority}`)}
            </span>
          ) : null}
          {dueLabel ? (
            <span
              className={`font-mono text-xs tabular-nums ${overdue ? 'text-rust' : 'text-graphite'}`}
            >
              {dueLabel}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  )
}
