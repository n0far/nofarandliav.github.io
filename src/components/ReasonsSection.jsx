import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CONFIG } from '../config'

const CARD_COLORS = [
  { bg: '#fff8f0', border: 'rgba(212,135,143,0.35)', accent: '#d4878f' },
  { bg: '#fffbf0', border: 'rgba(201,168,76,0.35)',  accent: '#c9a84c' },
  { bg: '#fff0f5', border: 'rgba(176,96,120,0.3)',   accent: '#b06078' },
  { bg: '#f8f5ff', border: 'rgba(140,120,180,0.3)',  accent: '#8c78b4' },
  { bg: '#f0fff8', border: 'rgba(96,160,130,0.3)',   accent: '#60a082' },
]

const DECORATIONS = ['♥', '✿', '✦', '❋', '✸', '✽']

const slideVariants = {
  enter: dir => ({ x: dir * 280, opacity: 0, scale: 0.92, rotate: dir * 3 }),
  center: { x: 0, opacity: 1, scale: 1, rotate: 0 },
  exit: dir => ({ x: -dir * 280, opacity: 0, scale: 0.92, rotate: -dir * 2 }),
}

export default function ReasonsSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const reasons = CONFIG.reasons

  const goNext = () => {
    if (index < reasons.length - 1) {
      setDirection(-1)
      setIndex(i => i + 1)
    }
  }

  const goPrev = () => {
    if (index > 0) {
      setDirection(1)
      setIndex(i => i - 1)
    }
  }

  const isFirst = index === 0
  const isLast = index === reasons.length - 1
  const colorStyle = CARD_COLORS[index % CARD_COLORS.length]
  const decor = DECORATIONS[index % DECORATIONS.length]

  return (
    <section className="relative py-24 px-4 z-10" style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #f9e8f0 40%, #fdf6f0 100%)' }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="font-body text-xs text-rose/60 mb-3">פרק שלישי</p>
          <h2 className="font-display text-4xl md:text-5xl text-burgundy mb-3">
            סיבות שאני אוהבת אותך
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
            <span className="text-rose text-sm">♥</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
          </div>
        </motion.div>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="font-body text-sm text-rose/60 mb-6 tracking-wide"
        >
          {index + 1} מתוך {reasons.length}
        </motion.p>

        {/* Card stack area */}
        <div className="relative w-full max-w-md" style={{ height: 280, perspective: 1000 }}>
          {/* Ghost cards behind (stack effect) */}
          {index < reasons.length - 1 && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: CARD_COLORS[(index + 1) % CARD_COLORS.length].bg,
                border: `1px solid ${CARD_COLORS[(index + 1) % CARD_COLORS.length].border}`,
                transform: 'translateY(8px) scale(0.96) rotate(2deg)',
                zIndex: 1,
              }}
            />
          )}
          {index < reasons.length - 2 && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: CARD_COLORS[(index + 2) % CARD_COLORS.length].bg,
                border: `1px solid ${CARD_COLORS[(index + 2) % CARD_COLORS.length].border}`,
                transform: 'translateY(16px) scale(0.92) rotate(-2deg)',
                zIndex: 0,
              }}
            />
          )}

          {/* Active card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-8 py-6 z-10"
              style={{
                background: colorStyle.bg,
                border: `1px solid ${colorStyle.border}`,
                boxShadow: '0 8px 32px rgba(107,45,62,0.1), 0 2px 8px rgba(107,45,62,0.06)',
              }}
            >
              {/* Decoration */}
              <div className="absolute top-5 right-6 text-3xl opacity-20" style={{ color: colorStyle.accent }}>
                {decor}
              </div>
              <div className="absolute bottom-5 left-6 text-2xl opacity-15" style={{ color: colorStyle.accent }}>
                {decor}
              </div>

              {/* Reason number */}
              <span
                className="font-display text-sm mb-4 tracking-widest opacity-50"
                style={{ color: colorStyle.accent }}
              >
                #{index + 1}
              </span>

              {/* Reason text */}
              <p
                className="font-script text-xl md:text-2xl text-center leading-relaxed"
                style={{ color: '#3d1a24', lineHeight: 1.5 }}
              >
                {reasons[index]}
              </p>

              {/* Bottom heart */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="text-xs" style={{ color: colorStyle.accent, opacity: 0.5 }}>♥</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-10">
          <motion.button
            onClick={goPrev}
            disabled={isFirst}
            whileHover={!isFirst ? { scale: 1.06 } : {}}
            whileTap={!isFirst ? { scale: 0.95 } : {}}
            className={`px-6 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-200 ${
              isFirst
                ? 'bg-cream text-burgundy/30 border border-burgundy/15 cursor-not-allowed'
                : 'bg-white text-rose border border-rose/40 hover:bg-rose hover:text-white shadow-sm'
            }`}
          >
            הקודם →
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-1.5">
            {reasons.slice(0, Math.min(reasons.length, 9)).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? -1 : 1); setIndex(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? 'bg-rose scale-125' : 'bg-rose/25'
                }`}
              />
            ))}
            {reasons.length > 9 && <span className="text-rose/40 text-xs self-center">…</span>}
          </div>

          <motion.button
            onClick={goNext}
            disabled={isLast}
            whileHover={!isLast ? { scale: 1.06 } : {}}
            whileTap={!isLast ? { scale: 0.95 } : {}}
            className={`px-6 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-200 ${
              isLast
                ? 'bg-cream text-burgundy/30 border border-burgundy/15 cursor-not-allowed'
                : 'bg-rose text-white hover:bg-burgundy shadow-sm'
            }`}
          >
            ← הבא
          </motion.button>
        </div>

        {/* Final message when at last card */}
        <AnimatePresence>
          {isLast && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="font-body italic text-rose/60 text-sm mt-6"
            >
              ועוד כל כך הרבה שלא נכנסים בעמוד... 💕
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
