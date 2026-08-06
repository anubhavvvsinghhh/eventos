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
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Find your event photos</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            Find your event photos
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#A1A1AA]">
            Upload one selfie and we'll find every official photo you're in.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
          <div
            className={`group relative overflow-hidden rounded-[28px] border-2 p-10 text-center transition ${
              dragActive ? 'border-violet-400/80 bg-violet-500/10' : 'border-dashed border-white/15 bg-zinc-950/80'
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
                <div className="mx-auto h-80 w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
                  <img src={previewUrl} alt="Selected selfie preview" className="h-full w-full object-cover" />
                </div>
                <div className="text-left text-sm text-[#A1A1AA]">
                  <p className="font-semibold text-white">Selected file</p>
                  <p className="mt-2 truncate text-white">{file?.name}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-violet-300/25 bg-violet-500/10 text-5xl text-violet-300">
                  📷
                </div>
                <div className="space-y-3">
                  <p className="text-2xl font-semibold text-white">Drag your selfie here</p>
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">or</p>
                  <p className="mx-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-200 transition group-hover:border-violet-400/40 group-hover:bg-violet-500/15">
                    Choose File
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[#A1A1AA]">
                  <p>Accept only JPG, JPEG and PNG.</p>
                  <p>Maximum size 10MB.</p>
                </div>
              </div>
            )}
          </div>

          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={!file}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-violet-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-500/40 sm:w-auto"
          >
            Find My Photos
          </button>
        </form>
      </div>
    </div>
  )
}
