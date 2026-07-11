import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({ label, error, id, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-graphite">
        {label}
      </label>
      <input
        id={id}
        className="h-10 rounded-lg border border-hairline bg-raised px-3 text-[15px] text-ink transition-colors focus-visible:border-cobalt"
        aria-invalid={error ? true : undefined}
        {...inputProps}
      />
      {error ? (
        <p role="alert" className="text-xs text-rust">
          {error}
        </p>
      ) : null}
    </div>
  )
}
