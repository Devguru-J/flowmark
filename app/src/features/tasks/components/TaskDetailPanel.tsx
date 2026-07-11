import { Trash2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Task, TaskPatch, TaskPriority, TaskStatus } from '../domain/task'
import { TASK_PRIORITIES, TASK_STATUSES } from '../domain/task'
import { useSoftDeleteTask, useUpdateTask } from '../queries'
import { PropertySelect } from './PropertySelect'
import { formatTimestamp } from './dueFormat'

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  high: 'text-rust',
  medium: 'text-amber-signal',
  low: 'text-graphite',
  none: 'text-graphite',
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-4">
      <span className="text-xs text-graphite">{label}</span>
      {children}
    </div>
  )
}

export function TaskDetailPanel({ task, onClose }: { task: Task; onClose: () => void }) {
  const { t } = useTranslation()
  const updateTask = useUpdateTask()
  const softDelete = useSoftDeleteTask()

  const patch = (p: TaskPatch) => updateTask.mutate({ id: task.id, patch: p })

  return (
    <div className="flex h-full flex-col gap-5 bg-raised p-6" aria-label={task.title}>
      <div className="flex items-start justify-between gap-2">
        <input
          key={`title-${task.id}`}
          type="text"
          defaultValue={task.title}
          aria-label={t('task.select')}
          onBlur={(e) => {
            const value = e.target.value.trim()
            if (value !== '' && value !== task.title) patch({ title: value })
            else e.target.value = task.title
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          className="min-w-0 flex-1 bg-transparent text-lg font-semibold tracking-tight text-ink outline-none"
        />
        <button
          type="button"
          aria-label={t('task.closePanel')}
          onClick={onClose}
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-fog transition-colors hover:bg-ink/5 hover:text-graphite"
        >
          <X size={16} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <textarea
        key={`desc-${task.id}`}
        defaultValue={task.description}
        placeholder={t('task.descriptionPlaceholder')}
        aria-label={t('task.descriptionPlaceholder')}
        rows={3}
        onBlur={(e) => {
          if (e.target.value !== task.description) patch({ description: e.target.value })
        }}
        className="resize-none rounded-md bg-transparent text-[15px] leading-relaxed text-ink outline-none"
      />

      <div className="flex flex-col border-y border-hairline py-2">
        <PropertyRow label={t('task.status')}>
          <PropertySelect<TaskStatus>
            value={task.status}
            ariaLabel={t('task.status')}
            options={TASK_STATUSES.map((s) => ({ value: s, label: t(`task.statuses.${s}`) }))}
            onChange={(status) => patch({ status })}
          />
        </PropertyRow>
        <PropertyRow label={t('task.priority')}>
          <PropertySelect<TaskPriority>
            value={task.priority}
            ariaLabel={t('task.priority')}
            options={TASK_PRIORITIES.map((p) => ({
              value: p,
              label: t(`task.priorities.${p}`),
              className: PRIORITY_COLOR[p],
            }))}
            onChange={(priority) => patch({ priority })}
          />
        </PropertyRow>
        <PropertyRow label={t('task.dueDate')}>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={task.dueDate ?? ''}
              aria-label={t('task.dueDate')}
              onChange={(e) => patch({ dueDate: e.target.value === '' ? null : e.target.value })}
              className="h-8 rounded-md bg-transparent px-2 font-mono text-xs text-ink transition-colors hover:bg-ink/5"
            />
            <input
              type="time"
              value={task.dueTime ?? ''}
              disabled={task.dueDate === null}
              aria-label={t('task.dueTime')}
              onChange={(e) => patch({ dueTime: e.target.value === '' ? null : e.target.value })}
              className="h-8 rounded-md bg-transparent px-2 font-mono text-xs text-ink transition-colors hover:bg-ink/5 disabled:opacity-40"
            />
          </div>
        </PropertyRow>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <p className="font-mono text-xs text-fog">
          {t('task.created')} {formatTimestamp(task.createdAt)} · {t('task.updated')}{' '}
          {formatTimestamp(task.updatedAt)}
        </p>
        <button
          type="button"
          onClick={() => {
            softDelete.mutate(task.id)
            onClose()
          }}
          className="flex h-9 w-fit items-center gap-2 rounded-md px-2 text-sm text-rust transition-colors hover:bg-rust/10 active:translate-y-px"
        >
          <Trash2 size={14} strokeWidth={1.5} aria-hidden />
          {t('task.moveToTrash')}
        </button>
      </div>
    </div>
  )
}
