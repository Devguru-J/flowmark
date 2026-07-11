import { Check, ChevronDown } from 'lucide-react'
import { Select } from 'radix-ui'

export interface SelectOption<T extends string> {
  value: T
  label: string
  className?: string
}

export function PropertySelect<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
}) {
  const current = options.find((o) => o.value === value)
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as T)}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-ink transition-colors hover:bg-ink/5 data-[state=open]:bg-ink/5"
      >
        <span className={current?.className}>{current?.label}</span>
        <Select.Icon>
          <ChevronDown size={14} strokeWidth={1.5} className="text-fog" aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          align="end"
          className="z-50 min-w-36 rounded-lg border border-hairline bg-raised p-1 shadow-[0_4px_8px_rgba(28,25,23,0.08)]"
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex h-8 cursor-default items-center justify-between rounded-md px-2 text-sm text-ink outline-none data-[highlighted]:bg-wash data-[highlighted]:text-cobalt"
              >
                <Select.ItemText>
                  <span className={option.className}>{option.label}</span>
                </Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={14} strokeWidth={2} className="text-cobalt" aria-hidden />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
