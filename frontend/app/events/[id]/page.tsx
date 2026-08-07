'use client'

import { useEffect, useState } from 'react'

type EventPageProps = {
  params: {
    id: string
  }
}

type PhotoStatus = {
  id: number
  filename: string
  processing_status: string
}

const eventData = {
  name: 'Sunburn Delhi',
  venue: 'JLN Stadium',
  date: '28 July 2026',
}

const overviewStats = [
  { label: 'Photos', value: '2,415' },
  { label: 'Faces indexed', value: '1,103' },
  { label: 'Searches', value: '217' },
]

const recentSearches = ['VIP Lounge', 'Stage Front', 'Neon Crowd', 'Afternoon Set', 'Sunset Moments']

const statusStyles: Record<string, string> = {
  uploaded: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20',
  queued: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20',
  processing: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20',
  completed: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
  failed: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
}

const statusLabels: Record<string, string> = {
  uploaded: 'Uploaded',
  queued: 'Queued',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
}

export default function EventPage({ params }: EventPageProps) {
  const [photos, setPhotos] = useState<PhotoStatus[]>([])
  const [isPolling, setIsPolling] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    const loadPhotos = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/events/${params.id}/photos`)
        if (!response.ok) return
        const data = (await response.json()) as PhotoStatus[]
        setPhotos(data)
        const allCompleted = data.every((photo) => photo.processing_status === 'completed')
        setIsPolling(!allCompleted && data.length > 0)
      } catch {
        setIsPolling(false)
      }
    }

    loadPhotos()

    if (isPolling) {
      timer = setInterval(loadPhotos, 3000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [params.id, isPolling])

  useEffect(() => {
    if (!photos.length) return
    const allCompleted = photos.every((photo) => photo.processing_status === 'completed')
    setIsPolling(!allCompleted)
  }, [photos])

  const handleStartUpload = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', new File(['demo'], 'sample.jpg', { type: 'image/jpeg' }))
      await fetch(`http://127.0.0.1:8000/events/${params.id}/photos`, {
        method: 'POST',
        body: formData,
      })
    } catch {
      // noop for the demo experience
    } finally {
      setTimeout(() => setIsUploading(false), 400)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-300">Event</p>
              <h1 className="text-4xl font-semibold text-[#FAFAFA] sm:text-5xl">{eventData.name}</h1>
              <div className="flex flex-col gap-2 text-sm text-[#A1A1AA] sm:flex-row sm:items-center sm:gap-6">
                <span>{eventData.venue}</span>
                <span>{eventData.date}</span>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
              #{params.id}
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Photo Pipeline</p>
                <h2 className="mt-4 text-3xl font-semibold text-[#FAFAFA]">Processing queue and gallery status</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
                  Uploads immediately create a photo record, then the backend advances it through queued, processing, and completed states with a simulated background pipeline.
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartUpload}
                className="inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {photos.length ? (
                photos.map((photo) => (
                  <div key={photo.id} className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">{photo.filename}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#A1A1AA]">#{photo.id}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[photo.processing_status] || statusStyles.uploaded}`}>
                        {statusLabels[photo.processing_status] || photo.processing_status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 rounded-[24px] border border-dashed border-white/10 bg-zinc-950/60 p-8 text-center text-sm text-[#A1A1AA]">
                  No photos yet. Upload one to begin the processing flow.
                </div>
              )}
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-zinc-950/70 p-5 text-sm text-[#A1A1AA]">
              <div className="flex items-center justify-between gap-3">
                <span>{isPolling ? 'Refreshing gallery...' : 'Polling stopped'}</span>
                <span className="font-semibold text-white">{photos.length ? `${photos.length} photo${photos.length > 1 ? 's' : ''}` : '0 photos'}</span>
              </div>
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-violet-300">Event snapshot</p>
                <div className="mt-6 space-y-4">
                  {overviewStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-4 text-sm">
                      <span className="text-[#A1A1AA]">{stat.label}</span>
                      <span className="font-semibold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="inline-flex w-full items-center justify-center rounded-full bg-violet-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-400">
                  Upload More Photos
                </button>
                <button className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-zinc-900/70 px-6 py-4 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-zinc-900">
                  Download Analytics
                </button>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-6 text-sm text-[#A1A1AA]">
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.35em] text-violet-300">Recent Searches</span>
                  <span className="text-white">{recentSearches.length}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {recentSearches.map((search) => (
                    <div key={search} className="rounded-2xl bg-white/5 px-4 py-3">
                      {search}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-6 text-sm text-[#A1A1AA]">
                <p className="text-xs uppercase tracking-[0.35em] text-violet-300">Storage Used</p>
                <p className="mt-3 text-3xl font-semibold text-white">72.4 GB</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
