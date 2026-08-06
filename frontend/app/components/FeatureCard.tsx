type Props = {
  title: string
  desc: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, desc, icon }: Props) {
  return (
    <div className="group rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_18px_80px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-slate-900/90">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-300">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-300">{desc}</p>
    </div>
  )
}
