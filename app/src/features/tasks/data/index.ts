import { supabase } from '../../../shared/lib/supabase'
import { LocalStorageTaskRepository } from './localStorageRepository'
import type { TaskRepository } from './repository'
import { SupabaseTaskRepository } from './supabaseRepository'

let repository: TaskRepository | null = null

export function getTaskRepository(): TaskRepository {
  repository ??= supabase
    ? new SupabaseTaskRepository(supabase)
    : new LocalStorageTaskRepository()
  return repository
}

export type { TaskRepository } from './repository'
