import { RotateCcw, Trash2 } from 'lucide-react'
import { AlertDialog } from 'radix-ui'
import { useTranslation } from 'react-i18next'
import { EmptyState, SkeletonRows } from './components/ListStates'
import { formatTimestamp } from './components/dueFormat'
import { selectTrashTasks } from './domain/views'
import { useHardDeleteTask, useRestoreTask, useTasks } from './queries'

export function TrashPage() {
  const { t } = useTranslation()
  const { data: tasks, isPending } = useTasks()
  const restore = useRestoreTask()
  const hardDelete = useHardDeleteTask()

  const trashed = tasks ? selectTrashTasks(tasks) : []

  return (
    <div className="mx-auto w-full max-w-190 px-6 py-8 lg:mx-0">
      <header className="flex items-center gap-3">
        <h1 className="text-[22px] font-semibold tracking-tight text-ink">{t('nav.trash')}</h1>
        <span className="font-mono text-sm tabular-nums text-fog">{trashed.length}</span>
      </header>

      <div className="mt-6">
        {isPending ? (
          <SkeletonRows />
        ) : trashed.length === 0 ? (
          <EmptyState icon={Trash2} message={t('empty.trash')} />
        ) : (
          <ul>
            {trashed.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 border-b border-hairline px-1 py-3"
              >
                <span className="min-w-0 flex-1 truncate text-[15px] text-graphite">
                  {task.title}
                </span>
                {task.deletedAt ? (
                  <span className="hidden font-mono text-xs text-fog sm:block">
                    {t('trash.deletedAt')} {formatTimestamp(task.deletedAt)}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => restore.mutate(task.id)}
                  className="flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-cobalt transition-colors hover:bg-wash active:translate-y-px"
                >
                  <RotateCcw size={14} strokeWidth={1.5} aria-hidden />
                  {t('trash.restore')}
                </button>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button
                      type="button"
                      className="flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-rust transition-colors hover:bg-rust/10 active:translate-y-px"
                    >
                      <Trash2 size={14} strokeWidth={1.5} aria-hidden />
                      {t('trash.deleteForever')}
                    </button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 z-40 bg-ink/20" />
                    <AlertDialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(90vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-hairline bg-raised p-6 shadow-[0_8px_24px_rgba(28,25,23,0.12)]">
                      <AlertDialog.Title className="text-base font-semibold text-ink">
                        {t('trash.confirmTitle')}
                      </AlertDialog.Title>
                      <AlertDialog.Description className="mt-2 text-sm leading-relaxed text-graphite">
                        {t('trash.confirmBody', { title: task.title })}
                      </AlertDialog.Description>
                      <div className="mt-6 flex justify-end gap-2">
                        <AlertDialog.Cancel asChild>
                          <button
                            type="button"
                            className="h-9 rounded-lg border border-hairline px-3 text-sm text-graphite transition-colors hover:bg-ink/5"
                          >
                            {t('trash.cancel')}
                          </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button
                            type="button"
                            onClick={() => hardDelete.mutate(task.id)}
                            className="h-9 rounded-lg bg-rust px-3 text-sm font-medium text-white active:translate-y-px"
                          >
                            {t('trash.confirmAction')}
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
