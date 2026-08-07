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
        <label className="text-sm font-semibold text-white">{label}</label>
        {description ? (
          <p className="mt-1 text-sm text-[#A1A1AA]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  )
}
