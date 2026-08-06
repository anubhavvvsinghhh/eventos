import FeatureCard from './FeatureCard'

export default function Features() {
  const items = [
    {
      title: 'AI face indexing',
      desc: 'Match every frame to the right guest, instantly and privately.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M12 5.5C14.485 5.5 16.5 7.515 16.5 10S14.485 14.5 12 14.5 7.5 12.485 7.5 10 9.515 5.5 12 5.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 18.5C15.59 18.5 18.5 16.09 18.5 13.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5.5 12.5V13.5C5.5 16.09 8.41 18.5 12 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Zero-touch search',
      desc: 'Find guests with a selfie upload and a single search query.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M11 4.5C7.41015 4.5 4.5 7.41015 4.5 11C4.5 14.5899 7.41015 17.5 11 17.5C14.5899 17.5 17.5 14.5899 17.5 11C17.5 7.41015 14.5899 4.5 11 4.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16.5 16.5L19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Event-grade security',
      desc: 'Organizers control delivery and guests only access their own gallery.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M5 6.5H19C19.2761 6.5 19.5 6.72386 19.5 7V17C19.5 17.2761 19.2761 17.5 19 17.5H5C4.72386 17.5 4.5 17.2761 4.5 17V7C4.5 6.72386 4.72386 6.5 5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.75 11.5L10.75 14.25L13.5 10.75L16 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.25 10.25C8.25 9.55964 8.80964 9 9.5 9C10.1904 9 10.75 9.55964 10.75 10.25C10.75 10.9404 10.1904 11.5 9.5 11.5C8.80964 11.5 8.25 10.9404 8.25 10.25Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Realtime insights',
      desc: 'See uploads, matches, and guest activity as they happen.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 9.5L12 4.5L16.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 14.5L12 19.5L16.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <section id="features" className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Why Onera</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Designed for creators, teams, and fast-growing event brands.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <FeatureCard key={item.title} title={item.title} desc={item.desc} icon={item.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
