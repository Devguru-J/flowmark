import type { Task, TaskCreateInput, TaskPatch } from '../domain/task'

/**
 * Storage boundary for tasks. UI code and query modules depend on this
 * interface only — swapping localStorage for Supabase must not touch them.
 */
export interface TaskRepository {
  list(): Promise<Task[]>
  get(id: string): Promise<Task | null>
  create(input: TaskCreateInput): Promise<Task>
  update(id: string, patch: TaskPatch): Promise<Task>
  softDelete(id: string): Promise<Task>
  restore(id: string): Promise<Task>
  hardDelete(id: string): Promise<void>
}

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task not found: ${id}`)
    this.name = 'TaskNotFoundError'
  }
}
