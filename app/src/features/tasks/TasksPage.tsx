import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { addDays, format } from 'date-fns'
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Inbox,
  Loader,
  Search,
  SearchX,
  Sun,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState, SkeletonRows } from './components/ListStates'
import { QuickCapture } from './components/QuickCapture'
import { PropertySelect } from './components/PropertySelect'
import { TaskDetailPanel } from './components/TaskDetailPanel'
import { TaskRow } from './components/TaskRow'
import type { TaskCreateInput } from './domain/task'
import { SORT_OPTIONS, selectViewTasks, todayString } from './domain/views'
import type { SortOption, TaskView } from './domain/views'
import { useTasks, useUpdateTask } from './queries'

const VIEW_META: Record<TaskView, { titleKey: string; emptyKey: string; icon: LucideIcon }> = {
  inbox: { titleKey: 'nav.inbox', emptyKey: 'empty.inbox', icon: Inbox },
  today: { titleKey: 'nav.today', emptyKey: 'empty.today', icon: Sun },
  upcoming: { titleKey: 'nav.upcoming', emptyKey: 'empty.upcoming', icon: CalendarDays },
  todo: { titleKey: 'nav.todo', emptyKey: 'empty.todo', icon: Circle },
  'in-progress': { titleKey: 'nav.inProgress', emptyKey: 'empty.in_progress', icon: Loader },
  completed: { titleKey: 'nav.completed', emptyKey: 'empty.completed', icon: CheckCircle2 },
}

function captureDefaults(view: TaskView): Omit<TaskCreateInput, 'title'> {
  switch (view) {
    case 'inbox':
      return { status: 'inbox' }
    case 'today':
      return { status: 'todo', dueDate: todayString() }
    case 'upcoming':
      return { status: 'todo', dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd') }
    case 'in-progress':
      return { status: 'in_progress' }
    case 'todo':
    case 'completed':
      return { status: 'todo' }
  }
}

export function TasksPage() {
  const { t } = useTranslation()
  const { view } = useParams({ from: '/app/$view' })
  const search = useSearch({ from: '/app/$view' })
  const navigate = useNavigate({ from: '/app/$view' })
  const { data: tasks, isPending } = useTasks()
  const updateTask = useUpdateTask()

  const sort: SortOption = search.sort ?? 'due'
  const query = search.q ?? ''
  const meta = VIEW_META[view]

  const visible = tasks ? selectViewTasks(tasks, view, query, sort) : []
  const selectedTask = tasks?.find((task) => task.id === search.task && task.deletedAt === null)

  const setSearchParam = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true })

  const toggleTask = (id: string, completed: boolean) =>
    updateTask.mutate({ id, patch: { status: completed ? 'todo' : 'completed' } })

  return (
    <div
      className={`min-h-[100dvh] ${selectedTask ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_400px]' : ''}`}
    >
      <div className="mx-auto w-full max-w-190 px-6 py-8 lg:mx-0">
        <header className="flex flex-wrap items-center gap-3">
          <h1 className="text-[22px] font-semibold tracking-tight text-ink">
            {t(meta.titleKey)}
          </h1>
          <span className="font-mono text-sm tabular-nums text-fog">{visible.length}</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-8 items-center gap-1.5 rounded-md border border-hairline bg-raised px-2 focus-within:border-cobalt">
              <Search size={14} strokeWidth={1.5} className="text-fog" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setSearchParam({ q: e.target.value || undefined })}
                aria-label={t('search.label')}
                placeholder={t('search.placeholder')}
                className="w-24 bg-transparent text-sm text-ink outline-none sm:w-36"
              />
            </div>
            {view !== 'completed' ? (
              <PropertySelect<SortOption>
                value={sort}
                ariaLabel={t('sort.label')}
                options={SORT_OPTIONS.map((option) => ({
                  value: option,
                  label: t(`sort.${option}`),
                }))}
                onChange={(option) =>
                  setSearchParam({ sort: option === 'due' ? undefined : option })
                }
              />
            ) : null}
          </div>
        </header>

        <div className="mt-6">
          <QuickCapture defaults={captureDefaults(view)} />
        </div>

        <div className="mt-4">
          {isPending ? (
            <SkeletonRows />
          ) : visible.length === 0 ? (
            query !== '' ? (
              <EmptyState icon={SearchX} message={t('search.noResults', { query })} />
            ) : (
              <EmptyState
                icon={meta.icon}
                message={t(meta.emptyKey)}
                hint={t('empty.captureHint')}
              />
            )
          ) : (
            <ul>
              {visible.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  selected={task.id === selectedTask?.id}
                  onToggle={() => toggleTask(task.id, task.status === 'completed')}
                  onSelect={() =>
                    setSearchParam({ task: task.id === search.task ? undefined : task.id })
                  }
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedTask ? (
        <aside className="fixed inset-0 z-40 lg:static lg:z-auto lg:border-l lg:border-hairline">
          <TaskDetailPanel
            task={selectedTask}
            onClose={() => setSearchParam({ task: undefined })}
          />
        </aside>
      ) : null}
    </div>
  )
}
