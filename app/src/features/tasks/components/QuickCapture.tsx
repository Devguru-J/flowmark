import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TaskCreateInput } from '../domain/task'
import { useCreateTask } from '../queries'

export function QuickCapture({ defaults }: { defaults: Omit<TaskCreateInput, 'title'> }) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const createTask = useCreateTask()

  const submit = () => {
    const trimmed = title.trim()
    if (trimmed === '') return
    createTask.mutate({ ...defaults, title: trimmed })
    setTitle('')
  }

  return (
    <div className="flex h-11 items-center gap-2.5 rounded-lg border border-hairline bg-raised px-3 focus-within:border-cobalt">
      <Plus size={16} strokeWidth={1.5} className="shrink-0 text-fog" aria-hidden />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit()
        }}
        aria-label={t('capture.label')}
        placeholder={t('capture.placeholder')}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
      />
      <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-fog sm:block">
        ⏎
      </kbd>
    </div>
  )
}
