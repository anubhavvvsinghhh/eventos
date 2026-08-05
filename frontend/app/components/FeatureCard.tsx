type Props = {
  title: string
  desc: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, desc, icon }: Props) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-[0_18px_80px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-zinc-900/80">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-violet-300">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-[#FAFAFA]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#A1A1AA]">{desc}</p>
    </div>
  )
}
