import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTaskRepository } from './data'
import type { Task, TaskCreateInput, TaskPatch } from './domain/task'

export const taskKeys = {
  all: ['tasks'] as const,
}

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => getTaskRepository().list(),
  })
}

function useInvalidatingMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  })
}

export function useCreateTask() {
  return useInvalidatingMutation((input: TaskCreateInput) => getTaskRepository().create(input))
}

export function useUpdateTask() {
  return useInvalidatingMutation(({ id, patch }: { id: string; patch: TaskPatch }) =>
    getTaskRepository().update(id, patch),
  )
}

export function useSoftDeleteTask() {
  return useInvalidatingMutation((id: string) => getTaskRepository().softDelete(id))
}

export function useRestoreTask() {
  return useInvalidatingMutation((id: string) => getTaskRepository().restore(id))
}

export function useHardDeleteTask() {
  return useInvalidatingMutation((id: string) => getTaskRepository().hardDelete(id))
}

export function useTaskById(id: string | undefined): Task | undefined {
  const { data } = useTasks()
  if (!id) return undefined
  return data?.find((t) => t.id === id && t.deletedAt === null)
}
