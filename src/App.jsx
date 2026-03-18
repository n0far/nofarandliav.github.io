import { useState, useCallback } from 'react'
import FloatingHearts from './components/FloatingHearts'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import MemoryJar from './components/MemoryJar'
import ReasonsSection from './components/ReasonsSection'
import QuizSection from './components/QuizSection'
import LoveLetterSection from './components/LoveLetterSection'
import EasterEgg from './components/EasterEgg'
import Footer from './components/Footer'

export default function App() {
  const [easterEggOpen, setEasterEggOpen] = useState(false)

  const openEasterEgg = useCallback(() => setEasterEggOpen(true), [])
  const closeEasterEgg = useCallback(() => setEasterEggOpen(false), [])

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      {/* Persistent floating hearts background — z-0 */}
      <FloatingHearts onEasterEggFound={openEasterEgg} />

      {/* All sections — z-10 */}
      <main className="relative z-10">
        <HeroSection />
        <TimelineSection />
        <MemoryJar />
        <ReasonsSection />
        <QuizSection />
        <LoveLetterSection />
        <Footer />
      </main>

      {/* Easter egg overlay — z-50 */}
      <EasterEgg isOpen={easterEggOpen} onClose={closeEasterEgg} />
    </div>
  )
}
