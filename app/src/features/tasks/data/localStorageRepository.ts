import { z } from 'zod'
import { createId } from '../../../shared/lib/id'
import { applyPatch, buildTask, taskSchema } from '../domain/task'
import type { Task, TaskCreateInput, TaskPatch } from '../domain/task'
import { TaskNotFoundError } from './repository'
import type { TaskRepository } from './repository'

const STORAGE_KEY = 'flowmark.tasks.v1'
const storedTasksSchema = z.array(taskSchema)

export class LocalStorageTaskRepository implements TaskRepository {
  private readonly storage: Storage

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage
  }

  private read(): Task[] {
    const raw = this.storage.getItem(STORAGE_KEY)
    if (raw === null) return []
    try {
      return storedTasksSchema.parse(JSON.parse(raw))
    } catch {
      // Corrupt payloads must not brick the app; drop invalid entries.
      try {
        const items = z.array(z.unknown()).parse(JSON.parse(raw))
        return items.flatMap((item) => {
          const result = taskSchema.safeParse(item)
          return result.success ? [result.data] : []
        })
      } catch {
        return []
      }
    }
  }

  private write(tasks: Task[]): void {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  async list(): Promise<Task[]> {
    return this.read()
  }

  async get(id: string): Promise<Task | null> {
    return this.read().find((t) => t.id === id) ?? null
  }

  async create(input: TaskCreateInput): Promise<Task> {
    const task = buildTask(input, createId())
    this.write([...this.read(), task])
    return task
  }

  async update(id: string, patch: TaskPatch): Promise<Task> {
    const tasks = this.read()
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new TaskNotFoundError(id)
    const next = applyPatch(tasks[index], patch)
    tasks[index] = next
    this.write(tasks)
    return next
  }

  async softDelete(id: string): Promise<Task> {
    return this.setDeleted(id, new Date().toISOString())
  }

  async restore(id: string): Promise<Task> {
    return this.setDeleted(id, null)
  }

  async hardDelete(id: string): Promise<void> {
    const tasks = this.read()
    if (!tasks.some((t) => t.id === id)) throw new TaskNotFoundError(id)
    this.write(tasks.filter((t) => t.id !== id))
  }

  private setDeleted(id: string, deletedAt: string | null): Task {
    const tasks = this.read()
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new TaskNotFoundError(id)
    const next: Task = { ...tasks[index], deletedAt, updatedAt: new Date().toISOString() }
    tasks[index] = next
    this.write(tasks)
    return next
  }
}
