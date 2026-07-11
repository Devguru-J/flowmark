import { format, isBefore, isToday, parseISO, startOfDay } from 'date-fns'
import type { Task, TaskPriority } from './task'

export const TASK_VIEWS = ['inbox', 'today', 'upcoming', 'todo', 'in-progress', 'completed'] as const
export type TaskView = (typeof TASK_VIEWS)[number]

export const SORT_OPTIONS = ['due', 'priority', 'created'] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

export function isTaskView(value: string): value is TaskView {
  return (TASK_VIEWS as readonly string[]).includes(value)
}

export function todayString(now: Date = new Date()): string {
  return format(now, 'yyyy-MM-dd')
}

function isActive(task: Task): boolean {
  return task.deletedAt === null && task.status !== 'completed' && task.status !== 'cancelled'
}

export function isOverdue(task: Task, now: Date = new Date()): boolean {
  if (!isActive(task) || task.dueDate === null) return false
  const due = parseISO(task.dueDate)
  return isBefore(due, startOfDay(now)) && !isToday(due)
}

export function matchesView(task: Task, view: TaskView, now: Date = new Date()): boolean {
  if (task.deletedAt !== null) return false
  switch (view) {
    case 'inbox':
      return task.status === 'inbox'
    case 'today':
      // "Today" carries anything due today plus what has slipped past its date.
      return isActive(task) && task.dueDate !== null && task.dueDate <= todayString(now)
    case 'upcoming':
      return isActive(task) && task.dueDate !== null && task.dueDate > todayString(now)
    case 'todo':
      return task.status === 'todo'
    case 'in-progress':
      return task.status === 'in_progress'
    case 'completed':
      return task.status === 'completed'
  }
}

export function matchesQuery(task: Task, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (q === '') return true
  return task.title.toLowerCase().includes(q) || task.description.toLowerCase().includes(q)
}

const PRIORITY_RANK: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2, none: 3 }

function dueKey(task: Task): string {
  if (task.dueDate === null) return '9999-99-99T99:99'
  return `${task.dueDate}T${task.dueTime ?? '99:99'}`
}

export function compareTasks(a: Task, b: Task, sort: SortOption): number {
  if (sort === 'created') {
    return b.createdAt.localeCompare(a.createdAt)
  }
  if (sort === 'priority') {
    const byPriority = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
    if (byPriority !== 0) return byPriority
    return dueKey(a).localeCompare(dueKey(b))
  }
  const byDue = dueKey(a).localeCompare(dueKey(b))
  if (byDue !== 0) return byDue
  const byPriority = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
  if (byPriority !== 0) return byPriority
  return b.createdAt.localeCompare(a.createdAt)
}

export function selectViewTasks(
  tasks: Task[],
  view: TaskView,
  query: string,
  sort: SortOption,
  now: Date = new Date(),
): Task[] {
  const filtered = tasks.filter((t) => matchesView(t, view, now) && matchesQuery(t, query))
  if (view === 'completed') {
    return filtered.sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
  }
  return filtered.sort((a, b) => compareTasks(a, b, sort))
}

export function selectTrashTasks(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.deletedAt !== null)
    .sort((a, b) => (b.deletedAt ?? '').localeCompare(a.deletedAt ?? ''))
}

export function viewCounts(tasks: Task[], now: Date = new Date()): Record<TaskView, number> {
  const counts = { inbox: 0, today: 0, upcoming: 0, todo: 0, 'in-progress': 0, completed: 0 }
  for (const task of tasks) {
    for (const view of TASK_VIEWS) {
      if (matchesView(task, view, now)) counts[view] += 1
    }
  }
  return counts
}
