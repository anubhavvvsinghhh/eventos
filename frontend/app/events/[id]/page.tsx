'use client'

import { useEffect, useRef, useState } from 'react'

type EventPageProps = {
  params: {
    id: string
  }
}

type EventDetail = {
  id: number
  name: string
  venue: string
  date: string
  photographer?: string | null
  description?: string | null
  created_at: string
}

type PhotoItem = {
  id: number
  event_id: number
  filename: string
  uploaded_at: string
  url: string
}

const overviewStats = [
  { label: 'Photos', value: '2,415' },
  { label: 'Faces indexed', value: '1,103' },
  { label: 'Searches', value: '217' },
]

const recentSearches = ['VIP Lounge', 'Stage Front', 'Neon Crowd', 'Afternoon Set', 'Sunset Moments']

const timelineEvents = [
  { time: '09:00', event: 'Upload queue initialized' },
  { time: '09:18', event: 'Face indexing started' },
  { time: '09:32', event: 'Group matches created' },
  { time: '09:40', event: 'Guest gallery ready' },
]

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export default function EventPage({ params }: EventPageProps) {
  const [eventData, setEventData] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('Ready')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fetchEvent = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiBase}/events/${params.id}`)
      if (!response.ok) {
        throw new Error(`Failed to load event (${response.status})`)
      }
      const data: EventDetail = await response.json()
      setEventData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load event')
    } finally {
      setLoading(false)
    }
  }

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${apiBase}/events/${params.id}/photos`)
      if (!response.ok) {
        throw new Error(`Failed to load photos (${response.status})`)
      }
      const data: PhotoItem[] = await response.json()
      setPhotos(data)
    } catch {
      setPhotos([])
    }
  }

  useEffect(() => {
    fetchEvent()
    fetchPhotos()
  }, [params.id])

  const handleFilesSelected = (files: FileList | null) => {
    const selected = files ? Array.from(files) : []
    if (selected.length === 0) {
      return
    }
    setSelectedFiles(selected)
    uploadFiles(selected)
  }

  const uploadFiles = (files: File[]) => {
    if (files.length === 0) {
      return
    }

    setUploadError(null)
    setUploadSuccess(null)
    setProgress(0)
    setIsUploading(true)
    setIsProcessing(false)
    setStatus('Uploading...')

    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))

    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => {
      setIsUploading(false)
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadSuccess(`Uploaded ${files.length} photo${files.length === 1 ? '' : 's'}`)
        setSelectedFiles([])
        setIsProcessing(true)
        setStatus('Processing photos...')
        fetchPhotos()
        setTimeout(() => {
          setIsProcessing(false)
          setStatus('Ready')
        }, 1200)
      } else {
        setUploadError(`Upload failed: ${xhr.statusText || xhr.status}`)
        setStatus('Ready')
      }
    }

    xhr.onerror = () => {
      setIsUploading(false)
      setUploadError('Upload failed. Please try again.')
      setStatus('Ready')
    }

    xhr.open('POST', `${apiBase}/events/${params.id}/photos`)
    xhr.send(formData)
  }

  const handleStartUpload = () => {
    fileInputRef.current?.click()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files?.length) {
      handleFilesSelected(event.dataTransfer.files)
    }
  }

  const formatDate = (value: string) => new Date(value).toLocaleString()

  const eventStats = overviewStats.map((stat) =>
    stat.label === 'Photos' ? { ...stat, value: photos.length.toLocaleString() } : stat,
  )

  return (
    <div className="min-h-screen animate-pageFade bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.5)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Event console</p>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
                {loading ? 'Loading event…' : eventData?.name ?? `Event #${params.id}`}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span>{loading ? 'Loading venue…' : eventData?.venue ?? 'Unknown venue'}</span>
                <span className="text-slate-500">·</span>
                <span>{loading ? 'Loading date…' : eventData?.date ?? 'Unknown date'}</span>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-slate-200">
              <p className="text-slate-400">Event ID</p>
              <p className="mt-2 text-xl text-white">#{params.id}</p>
            </div>
          </div>
          {error ? (
            <div className="mt-6 rounded-[28px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.5)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Upload photos</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Drag & drop to add more</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Add new photos and keep the event gallery fresh for your team and guests. Uploading is fast, secure, and built for event-scale collections.
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartUpload}
                className="inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                {selectedFiles.length > 0 ? `${selectedFiles.length} files ready` : 'Choose files'}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/heic"
              multiple
              className="hidden"
              onChange={(event) => handleFilesSelected(event.target.files)}
            />

            <div
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-10 rounded-[32px] border-2 px-8 py-16 text-center transition ${
                isDragging ? 'border-sky-400/60 bg-sky-500/10' : 'border-white/10 bg-slate-950/70'
              }`}
            >
              <div className="mx-auto max-w-2xl">
                <p className="text-xl font-semibold text-white">Drop photos here</p>
                <p className="mt-3 text-sm text-slate-400">Supported formats: JPG, PNG, HEIC</p>
                <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/70">⇪</span>
                  Drag files to upload or use the button above.
                </div>
              </div>
            </div>

            {uploadError ? (
              <div className="mt-8 rounded-[28px] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {uploadError}
              </div>
            ) : null}
            {uploadSuccess ? (
              <div className="mt-8 rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                {uploadSuccess}
              </div>
            ) : null}

            <div className="mt-10 space-y-5">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span>{isUploading ? 'Uploading files...' : isProcessing ? 'Processing photos...' : 'Ready to upload'}</span>
                <span className="font-semibold text-white">{status}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {isProcessing ? (
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-sky-300 border-t-transparent" />
                  Processing photos…
                </div>
              ) : null}
            </div>

            <div className="mt-10 rounded-[32px] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Event gallery</p>
                  <p className="mt-3 text-base text-slate-300">Recent uploads and thumbnails for this event.</p>
                </div>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                  {photos.length} photos
                </span>
              </div>

              {photos.length === 0 ? (
                <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/80 p-8 text-center text-slate-400">
                  No photos uploaded yet. Start by dragging images in or selecting files above.
                </div>
              ) : (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {photos.map((photo) => (
                    <div key={photo.id} className="overflow-hidden rounded-[28px] bg-slate-950/80 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                      <img
                        src={`${apiBase}${photo.url}`}
                        alt={photo.filename}
                        className="h-44 w-full object-cover transition duration-300 hover:scale-105"
                      />
                      <div className="border-t border-white/10 p-4 text-sm text-slate-300">
                        <p className="font-semibold text-white truncate">{photo.filename}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">Uploaded</p>
                        <p className="mt-1 text-xs text-slate-400">{formatDate(photo.uploaded_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.5)] backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Event snapshot</p>
                <div className="mt-6 space-y-4">
                  {eventStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-4 text-sm">
                      <span className="text-slate-300">{stat.label}</span>
                      <span className="font-semibold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Recent searches</p>
                <div className="mt-4 grid gap-3">
                  {recentSearches.map((search) => (
                    <div key={search} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                      {search}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Processing timeline</p>
                <div className="mt-5 space-y-4">
                  {timelineEvents.map((item) => (
                    <div key={item.time} className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-sm">
                      <p className="font-semibold text-white">{item.event}</p>
                      <p className="mt-1 text-slate-400">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Preview guest experience
              </button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
