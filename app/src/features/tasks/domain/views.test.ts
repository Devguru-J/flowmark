import { describe, expect, it } from 'vitest'
import { buildTask, applyPatch } from './task'
import type { Task } from './task'
import { compareTasks, matchesView, selectViewTasks, viewCounts } from './views'

const NOW = new Date('2026-07-11T12:00:00')

function task(overrides: Partial<Task>): Task {
  return { ...buildTask({ title: 'task' }, Math.random().toString(36).slice(2), NOW), ...overrides }
}

describe('matchesView', () => {
  it('today includes tasks due today and overdue tasks', () => {
    expect(matchesView(task({ status: 'todo', dueDate: '2026-07-11' }), 'today', NOW)).toBe(true)
    expect(matchesView(task({ status: 'todo', dueDate: '2026-07-01' }), 'today', NOW)).toBe(true)
    expect(matchesView(task({ status: 'todo', dueDate: '2026-07-12' }), 'today', NOW)).toBe(false)
    expect(matchesView(task({ status: 'todo', dueDate: null }), 'today', NOW)).toBe(false)
  })

  it('today excludes completed and cancelled tasks', () => {
    const completed = applyPatch(task({ status: 'todo', dueDate: '2026-07-11' }), {
      status: 'completed',
    })
    expect(matchesView(completed, 'today', NOW)).toBe(false)
  })

  it('deleted tasks never match a view', () => {
    const deleted = task({ status: 'inbox', deletedAt: NOW.toISOString() })
    expect(matchesView(deleted, 'inbox', NOW)).toBe(false)
  })

  it('status views match by status', () => {
    expect(matchesView(task({ status: 'in_progress' }), 'in-progress', NOW)).toBe(true)
    expect(matchesView(task({ status: 'todo' }), 'in-progress', NOW)).toBe(false)
  })
})

describe('compareTasks', () => {
  it('sorts by due date, then priority', () => {
    const early = task({ dueDate: '2026-07-12', priority: 'low' })
    const late = task({ dueDate: '2026-07-20', priority: 'high' })
    const noDue = task({ dueDate: null, priority: 'high' })
    expect(compareTasks(early, late, 'due')).toBeLessThan(0)
    expect(compareTasks(late, noDue, 'due')).toBeLessThan(0)
  })

  it('due-date ties break by priority', () => {
    const high = task({ dueDate: '2026-07-12', priority: 'high' })
    const low = task({ dueDate: '2026-07-12', priority: 'low' })
    expect(compareTasks(high, low, 'due')).toBeLessThan(0)
  })

  it('priority sort ranks high > medium > low > none', () => {
    const high = task({ priority: 'high' })
    const none = task({ priority: 'none' })
    expect(compareTasks(high, none, 'priority')).toBeLessThan(0)
  })
})

describe('selectViewTasks', () => {
  it('filters by query across title and description', () => {
    const tasks = [
      task({ title: '분기 보고서 초안 작성', status: 'todo' }),
      task({ title: '다른 작업', description: '보고서 첨부', status: 'todo' }),
      task({ title: '관계없는 일', status: 'todo' }),
    ]
    const result = selectViewTasks(tasks, 'todo', '보고서', 'due', NOW)
    expect(result).toHaveLength(2)
  })

  it('sorts completed view by completedAt descending', () => {
    const a = applyPatch(task({ status: 'todo' }), { status: 'completed' }, new Date('2026-07-09'))
    const b = applyPatch(task({ status: 'todo' }), { status: 'completed' }, new Date('2026-07-10'))
    const result = selectViewTasks([a, b], 'completed', '', 'due', NOW)
    expect(result[0].id).toBe(b.id)
  })
})

describe('viewCounts', () => {
  it('counts each view independently', () => {
    const tasks = [
      task({ status: 'inbox' }),
      task({ status: 'todo', dueDate: '2026-07-11' }),
      task({ status: 'todo', dueDate: '2026-08-01' }),
    ]
    const counts = viewCounts(tasks, NOW)
    expect(counts.inbox).toBe(1)
    expect(counts.today).toBe(1)
    expect(counts.upcoming).toBe(1)
    expect(counts.todo).toBe(2)
  })
})
