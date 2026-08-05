import Link from 'next/link'

const events = [
  {
    id: 1,
    name: 'Aurora Music Festival',
    venue: 'Skyline Park',
    date: 'June 12, 2026',
    photos: 1_240,
    attendees: 9_800,
    status: 'Uploading',
  },
  {
    id: 2,
    name: 'Summit Design Week',
    venue: 'Horizon Hall',
    date: 'July 3, 2026',
    photos: 2_100,
    attendees: 5_400,
    status: 'Processing',
  },
  {
    id: 3,
    name: 'Pulse Tech Conference',
    venue: 'Vertex Center',
    date: 'August 18, 2026',
    photos: 4_820,
    attendees: 13_200,
    status: 'Ready',
  },
]

const statusStyles: Record<string, string> = {
  Uploading: 'bg-violet-500/15 text-violet-300',
  Processing: 'bg-amber-500/15 text-amber-300',
  Ready: 'bg-emerald-500/15 text-emerald-300',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Your latest event activity.
            </h1>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
            + New Event
          </button>
        </header>

        <div className="grid gap-6 xl:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group block rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Event</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{event.name}</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[event.status]}`}>
                  {event.status}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-zinc-400">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                  <span>Venue</span>
                  <span className="text-white">{event.venue}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                  <span>Date</span>
                  <span className="text-white">{event.date}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Photos Uploaded</p>
                  <p className="mt-2 text-lg font-semibold text-white">{event.photos.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Attendees</p>
                  <p className="mt-2 text-lg font-semibold text-white">{event.attendees.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Status</p>
                  <p className="mt-2 text-lg font-semibold text-white">{event.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
