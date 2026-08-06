'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import FormField from '../../components/FormField'

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    venue: '',
    date: '',
    photographer: '',
  })
  const [zipFile, setZipFile] = useState<File | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleZipChange = (file: File | null) => {
    setZipFile(file)
  }

  const handlePhotosChange = (files: FileList | null) => {
    setPhotoFiles(files ? Array.from(files) : [])
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`${apiBase}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          venue: form.venue,
          date: form.date,
          photographer: form.photographer || undefined,
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        const message = result?.detail ?? result?.message ?? `Request failed with status ${response.status}`
        throw new Error(message)
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen animate-pageFade bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Create event</p>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              Launch your premium event experience.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Give your event a polished gallery flow for guests and organizers. Upload media, set event details, and get ready to match everyone in seconds.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
            {error ? (
              <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Event name">
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Aurora Summit 2026"
                />
              </FormField>
              <FormField label="Venue">
                <input
                  type="text"
                  value={form.venue}
                  onChange={(event) => handleChange('venue', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Lisbon, Portugal"
                />
              </FormField>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Date">
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => handleChange('date', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/20"
                />
              </FormField>
              <FormField label="Photographer">
                <input
                  type="text"
                  value={form.photographer}
                  onChange={(event) => handleChange('photographer', event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Aisha Kapoor"
                />
              </FormField>
            </div>

            <FormField label="Photo upload" description={photoFiles.length ? `${photoFiles.length} files selected` : 'JPEG, PNG, or RAW up to 20,000 files'}>
              <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-300 transition hover:border-sky-400/40 hover:bg-slate-900/90">
                <span>{zipFile ? zipFile.name : 'Choose ZIP file or drag photos here'}</span>
                <input
                  type="file"
                  accept=".zip"
                  onChange={(event) => handleZipChange(event.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </FormField>

            <FormField label="Gallery files">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Add photos
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={(event) => handlePhotosChange(event.target.files)}
                  className="hidden"
                />
              </label>
            </FormField>

            <button
              disabled={isSubmitting}
              className="w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Creating event…' : 'Create event'}
            </button>
          </form>
        </div>

        <aside className="space-y-8 rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
          <div className="rounded-[32px] bg-gradient-to-b from-slate-950/90 to-slate-900/60 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Live preview</p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Event name</p>
                <p className="mt-2 text-xl font-semibold text-white">{form.name || 'Untitled event'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Venue</p>
                <p className="mt-2 text-white">{form.venue || 'No venue set'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Date</p>
                <p className="mt-2 text-white">{form.date || 'No date selected'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-sm text-slate-300">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Quick facts</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/70 px-4 py-4">
                <span>Files selected</span>
                <span className="font-semibold text-white">{photoFiles.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/70 px-4 py-4">
                <span>ZIP ready</span>
                <span className="font-semibold text-white">{zipFile ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-sm text-slate-300">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Why this matters</p>
            <p className="mt-4 leading-7 text-slate-300">
              Events with a strong upload flow and polished metadata are easier to manage, search, and share. This preview helps you keep everything aligned before publish.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
