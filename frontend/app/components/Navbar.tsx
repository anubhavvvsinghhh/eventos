export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-lg font-bold text-slate-950">
            O
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-white">Onera</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="/dashboard" className="transition hover:text-white">
            Dashboard
          </a>
          <a href="/events/new" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:border-sky-400/30 hover:bg-slate-900">
            Create event
          </a>
        </div>
      </div>
    </nav>
  )
}
