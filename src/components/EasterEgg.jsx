import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config'

// Generates random sparkle positions
const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 90}%`,
  left: `${5 + Math.random() * 90}%`,
  size: 10 + Math.random() * 18,
  delay: Math.random() * 2,
  char: ['✦', '✧', '✨', '★', '✸', '♥', '✽'][Math.floor(Math.random() * 7)],
  color: ['#c9a84c', '#e8c97a', '#d4878f', '#e8b4b8', '#f0c8cc'][Math.floor(Math.random() * 5)],
}))

export default function EasterEgg({ isOpen, onClose }) {
  const { easterEgg } = CONFIG

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handle = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #1a0a12 0%, #0d0508 100%)' }}
          onClick={onClose}
        >
          {/* Sparkles */}
          {SPARKLES.map(s => (
            <motion.span
              key={s.id}
              className="absolute select-none pointer-events-none sparkle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{ duration: 1.8, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                top: s.top,
                left: s.left,
                fontSize: s.size,
                color: s.color,
              }}
            >
              {s.char}
            </motion.span>
          ))}

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative max-w-md w-full mx-6 rounded-3xl px-8 py-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,248,242,0.07) 0%, rgba(255,240,245,0.04) 100%)',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 80px rgba(201,168,76,0.12), 0 0 200px rgba(201,168,76,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Golden heart */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl mb-6"
              style={{ filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.7))' }}
            >
              💛
            </motion.div>

            {/* Title */}
            <h3 className="font-display text-3xl md:text-4xl mb-6" style={{ color: '#e8c97a' }}>
              {easterEgg.title}
            </h3>

            {/* Message */}
            <div className="space-y-4 mb-8">
              {easterEgg.message.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="font-body text-sm md:text-base leading-relaxed"
                  style={{ color: 'rgba(253,246,240,0.82)' }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Song link */}
            {easterEgg.songLink && easterEgg.songLink !== 'https://open.spotify.com/' && (
              <motion.a
                href={easterEgg.songLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                  color: '#3d1a24',
                  boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
                }}
                onClick={e => e.stopPropagation()}
              >
                <span>🎵</span>
                <span>{easterEgg.songName}</span>
              </motion.a>
            )}

            {/* Close hint */}
            <p className="font-body text-xs mt-4" style={{ color: 'rgba(253,246,240,0.3)' }}>
              הקש בכל מקום לסגירה • לחץ Esc
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
