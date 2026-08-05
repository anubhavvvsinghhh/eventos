export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-white text-xl font-semibold tracking-[0.08em]">Onera</div>

        <div className="flex items-center gap-4 text-sm text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <button className="rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-white transition hover:border-violet-400/40 hover:bg-zinc-900/95">
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}
