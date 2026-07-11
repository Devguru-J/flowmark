import type { SupabaseClient } from '@supabase/supabase-js'
import { applyPatch, taskSchema } from '../domain/task'
import type { Task, TaskCreateInput, TaskPatch } from '../domain/task'
import { TaskNotFoundError } from './repository'
import type { TaskRepository } from './repository'

interface TaskRow {
  id: string
  title: string
  description: string
  status: Task['status']
  priority: Task['priority']
  due_date: string | null
  due_time: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
  deleted_at: string | null
}

function rowToTask(row: TaskRow): Task {
  return taskSchema.parse({
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    // Postgres `time` comes back as HH:mm:ss — the domain uses HH:mm.
    dueTime: row.due_time?.slice(0, 5) ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    completedAt: row.completed_at,
    deletedAt: row.deleted_at,
  })
}

function taskToMutableColumns(task: Task) {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    due_date: task.dueDate,
    due_time: task.dueTime,
    updated_at: task.updatedAt,
    completed_at: task.completedAt,
    deleted_at: task.deletedAt,
  }
}

/**
 * Supabase-backed TaskRepository. RLS (supabase/migrations/0001) scopes every
 * query to the authenticated user; owner_id defaults to auth.uid() on insert.
 */
export class SupabaseTaskRepository implements TaskRepository {
  private readonly client: SupabaseClient

  constructor(client: SupabaseClient) {
    this.client = client
  }

  async list(): Promise<Task[]> {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as TaskRow[]).map(rowToTask)
  }

  async get(id: string): Promise<Task | null> {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw new Error(error.message)
    return data ? rowToTask(data as TaskRow) : null
  }

  async create(input: TaskCreateInput): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .insert({
        title: input.title,
        description: input.description ?? '',
        status: input.status ?? 'inbox',
        priority: input.priority ?? 'none',
        due_date: input.dueDate ?? null,
        due_time: input.dueTime ?? null,
      })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return rowToTask(data as TaskRow)
  }

  async update(id: string, patch: TaskPatch): Promise<Task> {
    const current = await this.get(id)
    if (!current) throw new TaskNotFoundError(id)
    const next = applyPatch(current, patch)
    return this.pushRow(id, next)
  }

  async softDelete(id: string): Promise<Task> {
    return this.setDeleted(id, new Date().toISOString())
  }

  async restore(id: string): Promise<Task> {
    return this.setDeleted(id, null)
  }

  async hardDelete(id: string): Promise<void> {
    const { data, error } = await this.client.from('tasks').delete().eq('id', id).select('id')
    if (error) throw new Error(error.message)
    if (!data || data.length === 0) throw new TaskNotFoundError(id)
  }

  private async setDeleted(id: string, deletedAt: string | null): Promise<Task> {
    const current = await this.get(id)
    if (!current) throw new TaskNotFoundError(id)
    return this.pushRow(id, { ...current, deletedAt, updatedAt: new Date().toISOString() })
  }

  private async pushRow(id: string, task: Task): Promise<Task> {
    const { data, error } = await this.client
      .from('tasks')
      .update(taskToMutableColumns(task))
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return rowToTask(data as TaskRow)
  }
}
