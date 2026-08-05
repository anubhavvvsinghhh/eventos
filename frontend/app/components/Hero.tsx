export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="relative mx-auto flex min-h-[52vh] max-w-[900px] flex-col items-center justify-center px-6 text-center">
        <span className="text-sm uppercase tracking-[0.35em] text-violet-300">ONERA</span>
        <h1 className="mt-6 text-6xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#FAFAFA] sm:text-[5rem]">
          Find Every Moment.
        </h1>
        <p className="mt-6 max-w-[650px] text-lg leading-8 text-[#A1A1AA]">
          Upload one selfie. Find every official event photo you're in.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="inline-flex rounded-full bg-violet-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-violet-400">
            Upload Selfie
          </button>
          <button className="inline-flex rounded-full border border-white/10 bg-zinc-950/70 px-8 py-4 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-zinc-900/95">
            For Organizers
          </button>
        </div>
      </div>
    </section>
  )
}
