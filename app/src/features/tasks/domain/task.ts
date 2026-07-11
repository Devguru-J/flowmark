import { z } from 'zod'

export const TASK_STATUSES = ['inbox', 'todo', 'in_progress', 'completed', 'cancelled'] as const
export const taskStatusSchema = z.enum(TASK_STATUSES)
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const TASK_PRIORITIES = ['none', 'low', 'medium', 'high'] as const
export const taskPrioritySchema = z.enum(TASK_PRIORITIES)
export type TaskPriority = z.infer<typeof taskPrioritySchema>

const isoDateTime = z.string().refine((v) => !Number.isNaN(Date.parse(v)), 'invalid datetime')
/** Calendar date without timezone, e.g. "2026-07-11". Interpreted in the user's local zone. */
const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
/** Optional time of day, e.g. "15:00". Only meaningful together with dueDate. */
const timeOfDay = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)

export const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(500),
  description: z.string().max(4000),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueDate: calendarDate.nullable(),
  dueTime: timeOfDay.nullable(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
  completedAt: isoDateTime.nullable(),
  deletedAt: isoDateTime.nullable(),
})

export type Task = z.infer<typeof taskSchema>

export const taskCreateSchema = taskSchema
  .pick({ title: true })
  .extend({
    description: taskSchema.shape.description.default(''),
    status: taskStatusSchema.exclude(['completed', 'cancelled']).default('inbox'),
    priority: taskPrioritySchema.default('none'),
    dueDate: taskSchema.shape.dueDate.default(null),
    dueTime: taskSchema.shape.dueTime.default(null),
  })

export type TaskCreateInput = z.input<typeof taskCreateSchema>

export const taskPatchSchema = taskSchema
  .pick({
    title: true,
    description: true,
    status: true,
    priority: true,
    dueDate: true,
    dueTime: true,
  })
  .partial()

export type TaskPatch = z.infer<typeof taskPatchSchema>

/**
 * Applies a patch while keeping lifecycle invariants:
 * entering `completed` stamps completedAt, leaving it clears the stamp,
 * and every change refreshes updatedAt.
 */
export function applyPatch(task: Task, patch: TaskPatch, now: Date = new Date()): Task {
  const next: Task = { ...task, ...taskPatchSchema.parse(patch), updatedAt: now.toISOString() }
  if (next.status === 'completed' && task.status !== 'completed') {
    next.completedAt = now.toISOString()
  } else if (next.status !== 'completed' && task.status === 'completed') {
    next.completedAt = null
  }
  if (next.dueDate === null) {
    next.dueTime = null
  }
  return next
}

export function buildTask(input: TaskCreateInput, id: string, now: Date = new Date()): Task {
  const parsed = taskCreateSchema.parse(input)
  return {
    id,
    ...parsed,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    completedAt: null,
    deletedAt: null,
  }
}
