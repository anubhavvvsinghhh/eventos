import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute left-0 top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="text-sm uppercase tracking-[0.35em] text-sky-300">Onera</span>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Every event photo, found for everyone.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
            Upload a selfie once and get every official event photo you're in — instantly, privately, and at scale.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/find"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Find my photos
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-white transition hover:border-sky-400/40"
            >
              Organizer console
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { value: '4.2M+', label: 'Photos indexed' },
              { value: '12s', label: 'Median lookup' },
              { value: '99.2%', label: 'Match precision' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.65)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%)] opacity-70" />
          <div className="relative flex h-full flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-sky-200">
                Live indexing · 4.2M photos / week
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Event</span>
                  <span>Status</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { name: 'Aurora Summit 2026', status: 'Live' },
                    { name: 'Marta & Nils Wedding', status: 'Indexing' },
                    { name: 'Runway SS26 Showcase', status: 'Archived' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-3xl bg-slate-900/90 p-4 text-sm text-white/90">
                      <span>{item.name}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === 'Live' ? 'bg-emerald-500/10 text-emerald-300' : item.status === 'Indexing' ? 'bg-amber-500/10 text-amber-300' : 'bg-slate-700/20 text-slate-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/85 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Built for startups</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Designed for fast-growing teams</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Launch fast with event-grade matching, instant results, and a premium product experience that scales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
