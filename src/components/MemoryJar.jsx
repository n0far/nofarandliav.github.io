import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CONFIG } from '../config'

// Simple SVG jar illustration
function JarSVG({ onClick, wiggling }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95 ${wiggling ? 'jar-wiggle' : ''}`}
      title="לחץ להוצאת זיכרון"
    >
      <svg
        viewBox="0 0 140 190"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-44 md:w-44 md:h-52 drop-shadow-lg"
      >
        {/* Lid */}
        <rect x="32" y="8" width="76" height="20" rx="6" fill="#c9a84c" opacity="0.9" />
        <rect x="36" y="11" width="68" height="14" rx="4" fill="#e8c97a" opacity="0.7" />
        <rect x="44" y="14" width="52" height="6" rx="3" fill="#c9a84c" opacity="0.5" />

        {/* Jar neck */}
        <path d="M 40 28 L 36 42 L 104 42 L 100 28 Z" fill="#fdf6f0" stroke="#d4878f" strokeWidth="1.5" />

        {/* Jar body */}
        <path
          d="M 30 42 Q 22 55 22 95 Q 22 152 70 158 Q 118 152 118 95 Q 118 55 110 42 Z"
          fill="#fff8f5"
          stroke="#d4878f"
          strokeWidth="2"
        />

        {/* Glass shine */}
        <path d="M 38 52 Q 34 80 35 110" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        <path d="M 48 50 Q 45 65 46 78" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

        {/* Colorful folded notes inside */}
        <ellipse cx="70" cy="140" rx="36" ry="10" fill="#f0c8cc" opacity="0.7" />
        <rect x="52" y="100" width="36" height="28" rx="3" fill="#f9e8ea" transform="rotate(-8, 70, 114)" opacity="0.85" />
        <rect x="58" y="95" width="32" height="26" rx="3" fill="#e8c97a" transform="rotate(5, 74, 108)" opacity="0.75" />
        <rect x="46" y="108" width="30" height="24" rx="3" fill="#c9e8d4" transform="rotate(-12, 61, 120)" opacity="0.8" />
        <rect x="72" y="106" width="28" height="22" rx="3" fill="#c9d4e8" transform="rotate(10, 86, 117)" opacity="0.75" />
        <rect x="56" y="118" width="34" height="22" rx="3" fill="#f0c8cc" transform="rotate(-3, 73, 129)" opacity="0.85" />
        <rect x="42" y="122" width="26" height="20" rx="3" fill="#e8c97a" transform="rotate(15, 55, 132)" opacity="0.7" />
        <rect x="78" y="120" width="26" height="20" rx="3" fill="#f9e8ea" transform="rotate(-10, 91, 130)" opacity="0.75" />

        {/* Small hearts floating inside */}
        <text x="64" y="92" fontSize="10" fill="#d4878f" opacity="0.6">♥</text>
        <text x="80" y="88" fontSize="8" fill="#c9a84c" opacity="0.5">♥</text>

        {/* Jar base highlight */}
        <ellipse cx="70" cy="155" rx="38" ry="5" fill="#d4878f" opacity="0.15" />
      </svg>
    </div>
  )
}

// Folded note visual
function MemoryNote({ memory }) {
  return (
    <motion.div
      key={memory}
      initial={{ opacity: 0, scale: 0.7, rotateX: -40, y: 20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -15 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative max-w-sm w-full"
    >
      {/* Paper note */}
      <div
        className="relative bg-amber-50 rounded-lg px-8 py-6 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #fffbf0 0%, #fff8e8 100%)',
          boxShadow: '0 4px 20px rgba(107,45,62,0.12), 0 1px 4px rgba(107,45,62,0.08)',
          transform: 'rotate(-1.5deg)',
          border: '1px solid rgba(201, 168, 76, 0.3)',
        }}
      >
        {/* Top fold line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-t-lg" />

        {/* Pin decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose flex items-center justify-center shadow-md border-2 border-white">
          <span className="text-white text-xs">♥</span>
        </div>

        <p
          className="font-body italic text-burgundy/85 text-center leading-relaxed text-base md:text-lg mt-2"
        >
          "{memory}"
        </p>

        {/* Bottom decoration */}
        <div className="mt-4 flex justify-center">
          <span className="text-rose/40 text-sm">✦</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function MemoryJar() {
  const [shownIndices, setShownIndices] = useState([])
  const [currentIndex, setCurrentIndex] = useState(null)
  const [wiggling, setWiggling] = useState(false)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const memories = CONFIG.memories

  const pullMemory = () => {
    // Trigger wiggle
    setWiggling(true)
    setTimeout(() => setWiggling(false), 600)

    let available = memories
      .map((_, i) => i)
      .filter(i => i !== currentIndex && !shownIndices.includes(i))

    // If all have been shown, reset (except current)
    if (available.length === 0) {
      const reset = memories.map((_, i) => i).filter(i => i !== currentIndex)
      setShownIndices(currentIndex !== null ? [currentIndex] : [])
      available = reset
    }

    const pick = available[Math.floor(Math.random() * available.length)]
    setShownIndices(prev => (currentIndex !== null ? [...prev, currentIndex] : prev))
    setCurrentIndex(pick)
  }

  const allShown = shownIndices.length + 1 >= memories.length

  return (
    <section className="relative py-24 px-4 z-10" style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #f9f0f2 50%, #fdf6f0 100%)' }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="font-body text-xs text-rose/60 mb-3">פרק שני</p>
          <h2 className="font-display text-4xl md:text-5xl text-burgundy mb-3">צנצנת הזיכרונות שלנו</h2>
          <p className="font-body italic text-burgundy/60 text-base">לחץ על הצנצנת כדי להוציא זיכרון 🫙</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
            <span className="text-rose text-sm">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
          </div>
        </motion.div>

        {/* Jar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={titleInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <JarSVG onClick={pullMemory} wiggling={wiggling} />
        </motion.div>

        {/* Memory count indicator */}
        {currentIndex !== null && (
          <p className="font-body text-xs text-rose/50 mb-5">
            {allShown ? '!ראית את כולם, מוציאים שוב מההתחלה' : `${shownIndices.length + 1} מתוך ${memories.length} זיכרונות`}
          </p>
        )}

        {/* Memory reveal */}
        <div className="min-h-[180px] flex items-center justify-center w-full mb-8">
          <AnimatePresence mode="wait">
            {currentIndex !== null && (
              <MemoryNote key={currentIndex} memory={memories[currentIndex]} />
            )}

            {currentIndex === null && (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-body italic text-burgundy/40 text-base"
              >
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Pull button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          onClick={pullMemory}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-3 bg-rose text-white font-body font-semibold rounded-full shadow-md hover:bg-burgundy transition-colors duration-300 text-sm tracking-wide"
        >
          {currentIndex === null ? 'הוצא זיכרון ✨' : 'הוצא עוד אחד ✨'}
        </motion.button>
      </div>
    </section>
  )
}
