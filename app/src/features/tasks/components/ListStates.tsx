import type { LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon,
  message,
  hint,
}: {
  icon: LucideIcon
  message: string
  hint?: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <Icon size={32} strokeWidth={1.25} className="text-fog" aria-hidden />
      <p className="text-[15px] text-graphite">{message}</p>
      {hint ? <p className="text-sm text-fog">{hint}</p> : null}
    </div>
  )
}

/** Skeleton rows matching real task-row geometry (no circular spinners). */
export function SkeletonRows({ count = 5 }: { count?: number }) {
  return (
    <div aria-hidden className="animate-pulse">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center gap-3 border-b border-hairline px-1 py-3">
          <div className="size-5 rounded-full border border-hairline bg-raised" />
          <div
            className="h-4 rounded bg-hairline"
            style={{ width: `${[62, 45, 71, 38, 55][i % 5]}%` }}
          />
          <div className="ml-auto h-3 w-14 rounded bg-hairline" />
        </div>
      ))}
    </div>
  )
}
