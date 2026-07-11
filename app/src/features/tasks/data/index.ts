import { LocalStorageTaskRepository } from './localStorageRepository'
import type { TaskRepository } from './repository'

let repository: TaskRepository | null = null

export function getTaskRepository(): TaskRepository {
  repository ??= new LocalStorageTaskRepository()
  return repository
}

export type { TaskRepository } from './repository'
