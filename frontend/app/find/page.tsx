'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png']
const maxSize = 10 * 1024 * 1024

export default function FindPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (!file) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const validateFile = (candidate: File) => {
    if (!acceptedTypes.includes(candidate.type)) {
      setError('Only JPG, JPEG, or PNG files are accepted.')
      return false
    }

    if (candidate.size > maxSize) {
      setError('Maximum file size is 10MB.')
      return false
    }

    setError(null)
    return true
  }

  const handleFileSelect = (candidate: File) => {
    if (!validateFile(candidate)) return
    setFile(candidate)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if (!selected) return
    handleFileSelect(selected)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)

    const selected = event.dataTransfer.files?.[0]
    if (!selected) return
    handleFileSelect(selected)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) return
    router.push('/results')
  }

  return (
    <div className="min-h-screen animate-pageFade bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <header className="rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Find your photos</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              Upload one selfie. Get every event photo.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Our engine scans official event galleries and returns every image you're in. Fast, private, and ready for guests.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_100px_rgba(15,23,42,0.4)]">
            <div
              className={`group relative overflow-hidden rounded-[32px] border-2 px-8 py-14 text-center transition ${
                dragActive ? 'border-sky-400/70 bg-sky-500/10' : 'border-dashed border-white/15 bg-slate-950/80'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleChange}
              />

              {previewUrl ? (
                <div className="space-y-6">
                  <div className="mx-auto h-80 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-black/40">
                    <img src={previewUrl} alt="Selected selfie preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-left text-sm text-slate-300">
                    <p className="font-semibold text-white">Ready to search</p>
                    <p className="mt-2 truncate text-white">{file?.name}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/5 text-5xl text-sky-300">
                    📷
                  </div>
                  <div className="space-y-3">
                    <p className="text-2xl font-semibold text-white">Drop your selfie here</p>
                    <p className="text-sm uppercase tracking-[0.35em] text-sky-300">or</p>
                    <p className="mx-auto inline-flex rounded-full border border-white/10 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-900/95">
                      Browse files
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <p>Accepts JPG, JPEG, PNG.</p>
                    <p>Maximum file size 10MB.</p>
                  </div>
                </div>
              )}
            </div>

            {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

            <button
              type="submit"
              disabled={!file}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              Find my photos
            </button>
          </form>
        </div>

        <aside className="space-y-8 rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
          <div className="rounded-[32px] bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Why Onera</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Search event photos instantly</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use a single selfie to retrieve the full gallery from event photo archives — no manual guest matching required.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              { label: 'Fast setup', value: '2 minutes' },
              { label: 'Secure delivery', value: 'Private guest galleries' },
              { label: 'Event ready', value: 'Festival & wedding use' },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-300">
            <p className="uppercase tracking-[0.35em] text-sky-300">Quick tips</p>
            <ul className="mt-4 space-y-3">
              <li>Use a clear front-facing selfie.</li>
              <li>Bright photos improve matching accuracy.</li>
              <li>Event galleries sync automatically.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
