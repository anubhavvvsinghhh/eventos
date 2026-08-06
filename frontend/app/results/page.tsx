const photos = [
  'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1453974336165-b028a9a6fb1d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=900&q=80',
]

const stats = [
  { label: 'Photos found', value: '15', detail: 'Matched to your selfie' },
  { label: 'Search speed', value: '1.4s', detail: 'Median lookup time' },
  { label: 'Precision', value: '99.2%', detail: 'Event-quality results' },
]

export default function ResultsPage() {
  return (
    <div className="min-h-screen animate-pageFade bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Search results</p>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Aurora Summit 2026</h1>
              <p className="text-lg leading-8 text-slate-300">28 July 2026 · 15 photos matching your request</p>
            </div>

            <div className="flex flex-col gap-4 sm:items-end">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300">
                <p className="uppercase tracking-[0.35em] text-slate-500">Download bundle</p>
                <p className="mt-3 text-2xl font-semibold text-white">ZIP export</p>
              </div>
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Download all
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.5fr]">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {photos.slice(0, 9).map((src, index) => (
              <div key={`${src}-${index}`} className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 shadow-[0_30px_80px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1">
                <div className="relative h-72 overflow-hidden">
                  <img src={src} alt={`Event photo ${index + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="flex items-center justify-between rounded-3xl bg-black/50 px-4 py-3 text-sm text-white backdrop-blur-sm">
                      <span className="font-semibold">Photo {index + 1}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6 rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Gallery insights</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Top moments</h2>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 text-sm text-slate-300">
              <p className="font-semibold text-white">Search tags</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {['crowd', 'stage', 'VIP', 'sunset', 'night', 'wide'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Snapshot</p>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <p className="text-white">VIP lounge</p>
                  <p className="mt-1 text-slate-400">7 matches</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <p className="text-white">Main stage</p>
                  <p className="mt-1 text-slate-400">5 matches</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <p className="text-white">After party</p>
                  <p className="mt-1 text-slate-400">3 matches</p>
                </div>
              </div>
            </div>

            <button className="w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110">
              Export selected
            </button>
          </aside>
        </section>
      </div>
    </div>
  )
}
