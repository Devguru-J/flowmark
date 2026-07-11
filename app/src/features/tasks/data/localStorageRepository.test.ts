import { beforeEach, describe, expect, it } from 'vitest'
import { LocalStorageTaskRepository } from './localStorageRepository'
import { TaskNotFoundError } from './repository'

function createMemoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear: () => map.clear(),
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, String(value)),
    removeItem: (key) => void map.delete(key),
    key: (index) => [...map.keys()][index] ?? null,
  }
}

describe('LocalStorageTaskRepository', () => {
  let storage: Storage
  let repo: LocalStorageTaskRepository

  beforeEach(() => {
    storage = createMemoryStorage()
    repo = new LocalStorageTaskRepository(storage)
  })

  it('creates and lists tasks', async () => {
    await repo.create({ title: '디자인 리뷰 피드백 정리' })
    const tasks = await repo.list()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('디자인 리뷰 피드백 정리')
  })

  it('persists across instances', async () => {
    await repo.create({ title: 'persisted' })
    const second = new LocalStorageTaskRepository(storage)
    expect(await second.list()).toHaveLength(1)
  })

  it('updates a task and stamps completedAt on completion', async () => {
    const created = await repo.create({ title: 'x' })
    const updated = await repo.update(created.id, { status: 'completed' })
    expect(updated.completedAt).not.toBeNull()
  })

  it('soft deletes, restores, and hard deletes', async () => {
    const created = await repo.create({ title: 'x' })
    const deleted = await repo.softDelete(created.id)
    expect(deleted.deletedAt).not.toBeNull()
    const restored = await repo.restore(created.id)
    expect(restored.deletedAt).toBeNull()
    await repo.hardDelete(created.id)
    expect(await repo.list()).toHaveLength(0)
  })

  it('throws TaskNotFoundError for missing ids', async () => {
    await expect(repo.update('missing', { title: 'y' })).rejects.toThrow(TaskNotFoundError)
    await expect(repo.hardDelete('missing')).rejects.toThrow(TaskNotFoundError)
  })

  it('drops corrupt entries instead of crashing', async () => {
    const valid = await repo.create({ title: 'ok' })
    const raw = JSON.parse(storage.getItem('flowmark.tasks.v1')!)
    raw.push({ garbage: true })
    storage.setItem('flowmark.tasks.v1', JSON.stringify(raw))
    const tasks = await repo.list()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].id).toBe(valid.id)
  })

  it('returns empty list for unparseable storage', async () => {
    storage.setItem('flowmark.tasks.v1', 'not-json')
    expect(await repo.list()).toEqual([])
  })
})
