'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Event = {
  id: number
  name: string
  venue: string
  date: string
  photographer?: string | null
  description?: string | null
  created_at: string
}

const stats = [
  {
    label: 'Photos indexed',
    value: '26,890',
    detail: 'Official event uploads',
  },
  {
    label: 'Guests matched',
    value: '3,426',
    detail: 'People found',
  },
  {
    label: 'Face matches',
    value: '73,685',
    detail: 'Search-ready vectors',
  },
]

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${apiBase}/events/`)
        if (!response.ok) {
          throw new Error(`Failed to load events (${response.status})`)
        }
        const data: Event[] = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events')
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [apiBase])

  const activeEvents = events?.length ?? 0
  const dashboardStats = [
    {
      label: 'Active events',
      value: activeEvents.toString(),
      detail: 'Live campaigns today',
    },
    ...stats,
  ]

  return (
    <div className="min-h-screen animate-pageFade bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Organizer console</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Event console for modern creators.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Manage uploads, watch indexing progress, and keep every guest flow smooth with a premium event dashboard.
              </p>
            </div>
            <div className="grid gap-4 sm:flex sm:items-center">
              <Link
                href="/events/new"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                + New event
              </Link>
              <Link
                href="/find"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/70 px-7 py-4 text-sm font-semibold text-white transition hover:border-sky-400/40"
              >
                Find photos
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.35)]">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.detail}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Events</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Your event line-up</h2>
              </div>
              <div className="rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total events</p>
                <p className="mt-2 text-2xl font-semibold text-white">{activeEvents}</p>
              </div>
            </div>

            {error ? (
              <div className="mt-8 rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                Failed to load events: {error}
              </div>
            ) : null}

            {isLoading ? (
              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
                Loading events...
              </div>
            ) : events && events.length === 0 ? (
              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-10 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">No events yet</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">Create your first listing</h3>
                <Link
                  href="/events/new"
                  className="mt-8 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                >
                  Build event
                </Link>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                {events?.map((event) => (
                  <div key={event.id} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Event</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{event.name}</h3>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-sky-300">
                        Scheduled
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                        <p className="uppercase tracking-[0.35em] text-slate-500">Venue</p>
                        <p className="mt-2 text-base text-white">{event.venue}</p>
                      </div>
                      <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                        <p className="uppercase tracking-[0.35em] text-slate-500">Date</p>
                        <p className="mt-2 text-base text-white">{event.date}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                      <p className="uppercase tracking-[0.35em] text-slate-500">Created</p>
                      <p className="mt-2 text-white">{new Date(event.created_at).toLocaleDateString()}</p>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                    >
                      Open event
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-[40px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Live activity</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Recent updates</h2>
              </div>
              <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                Realtime
              </span>
            </div>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              {[
                { title: 'Ines Duarte downloaded 42 photos', time: '2 min ago' },
                { title: 'Face index finished pass 3 of 4', time: '18 min ago' },
                { title: 'Kai Lindqvist joined via selfie link', time: '41 min ago' },
                { title: 'Studio Vela uploaded 1,204 photos', time: '1 h ago' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-base text-white">{item.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">{item.time}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Guest flow</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Selfie link sharing</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Share one link and let guests pull their own gallery with secure access and no manual search.
              </p>
              <Link
                href="/find"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Preview guest flow
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
