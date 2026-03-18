import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CONFIG } from '../config'

// SVG envelope illustration
function EnvelopeSVG({ isOpen }) {
  return (
    <svg
      viewBox="0 0 280 180"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs md:max-w-sm drop-shadow-xl"
    >
      {/* Envelope body */}
      <rect x="10" y="50" width="260" height="120" rx="8" fill="#fff8f5" stroke="#d4878f" strokeWidth="2" />

      {/* Bottom V fold lines */}
      <line x1="10" y1="170" x2="140" y2="105" stroke="#e8b4b8" strokeWidth="1.5" />
      <line x1="270" y1="170" x2="140" y2="105" stroke="#e8b4b8" strokeWidth="1.5" />

      {/* Envelope flap — animated */}
      <motion.path
        d="M 10 50 L 140 0 L 270 50"
        fill={isOpen ? '#fdf0f2' : '#f0c8cc'}
        stroke="#d4878f"
        strokeWidth="2"
        animate={{ rotateX: isOpen ? -170 : 0 }}
        style={{ transformOrigin: '140px 50px', transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Heart seal — hides when open */}
      {!isOpen && (
        <g transform="translate(125, 44)">
          <circle cx="15" cy="15" r="14" fill="#d4878f" />
          <text x="15" y="20" fontSize="14" textAnchor="middle" fill="white">♥</text>
        </g>
      )}

      {/* Slight sheen on envelope body */}
      <line x1="25" y1="60" x2="25" y2="155" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function LetterContent({ letter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl mx-auto"
    >
      {/* Letter paper */}
      <div
        className="letter-paper rounded-2xl px-8 md:px-12 py-10 shadow-xl relative overflow-hidden"
        style={{
          transform: 'rotate(-0.5deg)',
          boxShadow: '0 12px 48px rgba(107,45,62,0.15), 0 2px 8px rgba(107,45,62,0.08)',
        }}
      >
        {/* Paper edge decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose/0 via-rose/20 to-rose/0 rounded-t-2xl" />

        {/* Salutation */}
        <p className="font-script text-2xl md:text-3xl text-burgundy mb-6 leading-relaxed">
          {letter.salutation}
        </p>

        {/* Letter body */}
        <div className="space-y-5">
          {letter.paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-body text-sm md:text-base text-burgundy/85 leading-7 md:leading-8"
              style={{ lineHeight: '32px' }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-8 text-right">
          <p className="font-script text-xl text-burgundy/80 mb-1">{letter.closing}</p>
          <p className="font-script text-2xl text-burgundy font-bold">{letter.signature} ♥</p>
        </div>

        {/* Watermark hearts */}
        <div className="absolute bottom-6 left-6 text-4xl text-rose/8 select-none pointer-events-none">♥</div>
        <div className="absolute top-6 right-8 text-3xl text-rose/6 select-none pointer-events-none">♡</div>
      </div>
    </motion.div>
  )
}

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  return (
    <section
      className="relative py-24 px-4 z-10 transition-colors duration-700"
      style={{ background: isOpen ? 'linear-gradient(180deg, #2a1520 0%, #1e0e17 50%, #2a1520 100%)' : 'linear-gradient(180deg, #fdf6f0 0%, #f5e8ec 50%, #fdf6f0 100%)' }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className={`font-body text-xs mb-3 transition-colors duration-700 ${isOpen ? 'text-rose/50' : 'text-rose/60'}`}>
            פרק חמישי
          </p>
          <h2 className={`font-display text-4xl md:text-5xl mb-3 transition-colors duration-700 ${isOpen ? 'text-rose/90' : 'text-burgundy'}`}>
            כתבתי לך משהו...
          </h2>
          <p className={`font-body italic text-base transition-colors duration-700 ${isOpen ? 'text-rose/50' : 'text-burgundy/60'}`}>
            {isOpen ? 'קרא אותה לאט. אני מתכוונת לכל מילה.' : 'לחץ על המעטפה כדי לפתוח אותה.'}
          </p>
          {!isOpen && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
              <span className="text-rose text-sm">♥</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
            </div>
          )}
        </motion.div>

        {/* Envelope */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpen}
              className="cursor-pointer group w-full mb-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-center">
                <EnvelopeSVG isOpen={false} />
              </div>
              <motion.p
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="font-body italic text-rose/60 text-sm mt-4"
              >
                הקש כדי לפתוח ♥
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter */}
        <AnimatePresence>
          {isOpen && (
            <LetterContent letter={CONFIG.loveLetter} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
