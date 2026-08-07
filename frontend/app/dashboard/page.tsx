import Link from 'next/link'

const events = [
  {
    id: 1,
    name: 'Sunburn Delhi',
    date: '28 July 2026',
    photos: 1_840,
    guests: 14_200,
  },
  {
    id: 2,
    name: 'Arijit Live',
    date: '14 August 2026',
    photos: 2_320,
    guests: 11_700,
  },
  {
    id: 3,
    name: 'Techfest IITD',
    date: '21 September 2026',
    photos: 3_660,
    guests: 18_500,
  },
]

const stats = [
  {
    label: 'Active events',
    value: '3',
    detail: 'Live campaigns today',
  },
  {
    label: 'Photos indexed',
    value: '7,820',
    detail: 'Selfies matched',
  },
  {
    label: 'Guests searched',
    value: '44,400',
    detail: 'People found',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-8 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <nav className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Organizer Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">My Events</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-zinc-900/80 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-zinc-900"
            >
              Home
            </Link>
            <Link
              href="/events/new"
              className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              + Create Event
            </Link>
          </div>
        </nav>

        <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">My Events</p>
                <h2 className="mt-3 text-4xl font-semibold text-white">Your organizer overview</h2>
              </div>
              <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-4 text-sm text-[#A1A1AA]">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Total active events</p>
                <p className="mt-2 text-3xl font-semibold text-white">3</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">{stat.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-[#A1A1AA]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Build new event</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Launch a fresh campaign</h3>
            <p className="mt-4 text-sm leading-7 text-[#A1A1AA]">
              Create an event listing with premium branding, upload photos, and start matching guests instantly.
            </p>
            <Link
              href="/events/new"
              className="mt-8 inline-flex rounded-full bg-violet-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              + Create Event
            </Link>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Events</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Manage your event line-up</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-zinc-900/70 px-5 py-3 text-sm font-semibold text-white">
              + Create Event
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Event</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{event.name}</h3>
                  </div>
                  <div className="space-y-3 text-sm text-[#A1A1AA]">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                      <span>Date</span>
                      <span className="text-white">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                      <span>Photos uploaded</span>
                      <span className="text-white">{event.photos.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                      <span>Guests searched</span>
                      <span className="text-white">{event.guests.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Open Dashboard
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
