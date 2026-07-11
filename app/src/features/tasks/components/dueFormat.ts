import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns'
import { enUS, ko } from 'date-fns/locale'
import i18next from 'i18next'
import type { Task } from '../domain/task'

function locale() {
  return i18next.language?.startsWith('en') ? enUS : ko
}

export function formatDueLabel(task: Task): string | null {
  if (task.dueDate === null) return null
  const date = parseISO(task.dueDate)
  const l = locale()
  const timePart = task.dueTime ? ` ${formatTime(task.dueDate, task.dueTime)}` : ''
  if (isToday(date)) return task.dueTime ? formatTime(task.dueDate, task.dueTime) : format(date, 'PPP', { locale: l })
  if (isTomorrow(date) || isYesterday(date)) return format(date, 'MMM d (EEE)', { locale: l }) + timePart
  return format(date, 'MMM d (EEE)', { locale: l }) + timePart
}

export function formatTime(dueDate: string, dueTime: string): string {
  return format(parseISO(`${dueDate}T${dueTime}`), 'p', { locale: locale() })
}

export function formatTimestamp(iso: string): string {
  return format(parseISO(iso), 'PPP', { locale: locale() })
}
