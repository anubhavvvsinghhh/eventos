import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  description?: string
  children: ReactNode
}

export default function FormField({ label, description, children }: FormFieldProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">{label}</label>
        {description ? (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  )
}
