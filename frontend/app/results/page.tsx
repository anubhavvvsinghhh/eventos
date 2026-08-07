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

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-[#09090B] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[32px] border border-white/10 bg-zinc-950/70 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">15 photos found</p>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Festival Name</h1>
              <p className="text-lg leading-8 text-[#A1A1AA]">28 July 2026</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-400">
              Download All
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
            {photos.map((src, index) => (
              <div
                key={src + index}
                className="mb-6 break-inside-avoid overflow-hidden rounded-[28px] bg-zinc-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_40px_100px_rgba(109,40,217,0.25)]"
              >
                <div className="relative overflow-hidden rounded-[28px]">
                  <img src={src} alt={`Event photo ${index + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-3xl bg-black/50 px-4 py-3 backdrop-blur-sm opacity-0 transition duration-300 hover:opacity-100 md:opacity-100">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">⬇</span>
                      Download
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">⤢</span>
                      Fullscreen
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
