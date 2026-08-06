import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen animate-pageFade bg-[#09090B] text-white">
      <Navbar />
      <main className="flex-1 mx-auto max-w-6xl px-6 py-12 xl:px-0">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
