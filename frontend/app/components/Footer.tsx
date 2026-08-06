export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">© 2026 Onera. Built for event teams and creators.</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="/dashboard" className="transition hover:text-white">
            Dashboard
          </a>
          <a href="/find" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-sky-400/30 hover:bg-slate-900/80">
            Find photos
          </a>
        </div>
      </div>
    </footer>
  )
}
