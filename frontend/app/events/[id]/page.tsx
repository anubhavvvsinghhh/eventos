'use client'

import { useEffect, useState } from 'react'

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

const overviewStats = [
  { label: 'Photos', value: '2,415' },
  { label: 'Faces indexed', value: '1,103' },
  { label: 'Searches', value: '217' },
]

const recentSearches = ['VIP Lounge', 'Stage Front', 'Neon Crowd', 'Afternoon Set', 'Sunset Moments']

export default function EventPage({ params }: EventPageProps) {
  const [eventData, setEventData] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('Ready')

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:8000/events/${params.id}`)
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

    fetchEvent()
  }, [params.id])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isUploading && progress < 100) {
      timer = setTimeout(() => setProgress((value) => Math.min(100, value + Math.floor(Math.random() * 12) + 8)), 280)
    }
    if (progress === 100 && isUploading) {
      setIsUploading(false)
      setIsProcessing(true)
      setStatus('Processing Photos...')
      timer = setTimeout(() => {
        setIsProcessing(false)
        setStatus('Ready')
      }, 2200)
    }
    return () => clearTimeout(timer)
  }, [isUploading, progress])

  const handleStartUpload = () => {
    setProgress(0)
    setIsUploading(true)
    setIsProcessing(false)
    setStatus('Uploading')
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    handleStartUpload()
  }

  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-300">Event</p>
              <h1 className="text-4xl font-semibold text-[#FAFAFA] sm:text-5xl">
                {loading ? 'Loading event...' : eventData?.name ?? `Event #${params.id}`}
              </h1>
              <div className="flex flex-col gap-2 text-sm text-[#A1A1AA] sm:flex-row sm:items-center sm:gap-6">
                <span>{loading ? 'Loading venue...' : eventData?.venue ?? 'Unknown venue'}</span>
                <span>{loading ? 'Loading date...' : eventData?.date ?? 'Unknown date'}</span>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
              #{params.id}
            </div>
          </div>
          {error ? (
            <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Upload Photos</p>
                <h2 className="mt-4 text-3xl font-semibold text-[#FAFAFA]">Drag & drop or click to start</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
                  Add the latest event photos and watch the upload progress. After upload completes we simulate photo processing and show the current event metrics.
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartUpload}
                className="inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Upload More Photos
              </button>
            </div>

            <div
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-10 rounded-[28px] border-2 ${isDragging ? 'border-violet-400/60 bg-violet-500/10' : 'border-white/10 bg-zinc-950/70'} px-6 py-12 text-center transition`}
            >
              <div className="mx-auto max-w-2xl">
                <p className="text-xl font-semibold text-white">Drop photos here</p>
                <p className="mt-3 text-sm text-[#A1A1AA]">Supported formats: JPG, PNG, HEIC</p>
                <div className="mt-8 flex items-center justify-center gap-3 text-sm text-neutral-300">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-semibold text-white">⇪</span>
                  Drag files to upload or click the button above.
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div className="flex items-center justify-between gap-4 text-sm text-[#A1A1AA]">
                <span>{isUploading ? 'Uploading files...' : isProcessing ? 'Processing Photos...' : 'Ready to upload'}</span>
                <span className="font-semibold text-white">{status}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              {isProcessing ? (
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-violet-300 border-t-transparent"></div>
                  Processing Photos...
                </div>
              ) : null}
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
