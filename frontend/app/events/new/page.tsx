'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleZipChange = (file: File | null) => {
    setZipFile(file)
  }

  const handlePhotosChange = (files: FileList | null) => {
    setPhotoFiles(files ? Array.from(files) : [])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push('/events/1')
  }

  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Create Event</p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Build your next event with a premium form.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#A1A1AA]">
            Enter event details and publish a polished listing. No backend required, this is a styled frontend experience.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Event Name">
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20"
                placeholder="Aurora Music Festival"
              />
            </FormField>
            <FormField label="Venue">
              <input
                type="text"
                value={form.venue}
                onChange={(event) => handleChange('venue', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20"
                placeholder="Skyline Park"
              />
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(event) => handleChange('date', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20"
              />
            </FormField>
            <FormField label="Photographer Name">
              <input
                type="text"
                value={form.photographer}
                onChange={(event) => handleChange('photographer', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20"
                placeholder="Aisha Kapoor"
              />
            </FormField>
          </div>

          <FormField label="Upload ZIP">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-[#A1A1AA] transition hover:border-violet-400/40 hover:bg-zinc-900/80">
              <span>{zipFile ? zipFile.name : 'Choose a ZIP file...'}</span>
              <input
                type="file"
                accept=".zip"
                onChange={(event) => handleZipChange(event.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          </FormField>

          <FormField label="Upload Photos" description={photoFiles.length ? `${photoFiles.length} files selected` : 'Select JPEG or PNG photos'}>
            <label className="inline-flex cursor-pointer rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
              Upload Photos
              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={(event) => handlePhotosChange(event.target.files)}
                className="hidden"
              />
            </label>
          </FormField>

          <button className="w-full rounded-full bg-violet-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-400 sm:w-auto">
            Create Event
          </button>
        </form>
      </div>
    </div>
  )
}
