import { describe, expect, it } from 'vitest'
import { applyPatch, buildTask } from './task'

describe('buildTask', () => {
  it('creates an inbox task with defaults', () => {
    const now = new Date('2026-07-11T09:00:00Z')
    const task = buildTask({ title: '분기 보고서 초안 작성' }, 'id-1', now)
    expect(task).toMatchObject({
      id: 'id-1',
      title: '분기 보고서 초안 작성',
      description: '',
      status: 'inbox',
      priority: 'none',
      dueDate: null,
      dueTime: null,
      completedAt: null,
      deletedAt: null,
    })
    expect(task.createdAt).toBe(now.toISOString())
  })

  it('rejects empty titles', () => {
    expect(() => buildTask({ title: '' }, 'id-1')).toThrow()
  })

  it('rejects creating directly in completed state', () => {
    expect(() =>
      buildTask({ title: 'x', status: 'completed' as never }, 'id-1'),
    ).toThrow()
  })
})

describe('applyPatch lifecycle invariants', () => {
  const base = buildTask({ title: 'task' }, 'id-1', new Date('2026-07-10T00:00:00Z'))

  it('stamps completedAt when entering completed', () => {
    const now = new Date('2026-07-11T10:00:00Z')
    const done = applyPatch(base, { status: 'completed' }, now)
    expect(done.completedAt).toBe(now.toISOString())
    expect(done.updatedAt).toBe(now.toISOString())
  })

  it('clears completedAt when reopening', () => {
    const done = applyPatch(base, { status: 'completed' })
    const reopened = applyPatch(done, { status: 'todo' })
    expect(reopened.completedAt).toBeNull()
  })

  it('keeps completedAt when patching other fields of a completed task', () => {
    const done = applyPatch(base, { status: 'completed' }, new Date('2026-07-11T10:00:00Z'))
    const renamed = applyPatch(done, { title: 'renamed' })
    expect(renamed.completedAt).toBe(done.completedAt)
  })

  it('clears dueTime when dueDate is removed', () => {
    const withDue = applyPatch(base, { dueDate: '2026-07-14', dueTime: '15:00' })
    const cleared = applyPatch(withDue, { dueDate: null })
    expect(cleared.dueTime).toBeNull()
  })
})
