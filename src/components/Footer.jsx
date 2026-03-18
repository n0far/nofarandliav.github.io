import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONFIG } from '../config'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      className="relative py-24 px-4 z-10 text-center"
      style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #f9e4e8 50%, #fdf6f0 100%)' }}
    >
      <div className="max-w-lg mx-auto">
        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose/40" />
          <span className="text-rose text-lg">♥</span>
          <span className="text-rose/50 text-sm">✦</span>
          <span className="text-rose text-lg">♥</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose/40" />
        </motion.div>

        {/* Main closing message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl text-burgundy mb-6 leading-snug"
        >
          {CONFIG.footer.message}
        </motion.p>

        {/* Miss you note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script text-2xl text-rose mb-10"
        >
          {CONFIG.footer.missYou}
        </motion.p>

        {/* Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-body text-sm text-burgundy/50 italic mb-2"
        >
          נעשה באהבה, מ-{CONFIG.names.from} ל-{CONFIG.names.to}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-xs text-rose/40"
        >
          {CONFIG.anniversaryDate.start} — {CONFIG.anniversaryDate.end}
        </motion.p>

        {/* Bottom heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1, type: 'spring', stiffness: 200 }}
          className="mt-12"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block text-3xl text-rose"
          >
            ♥
          </motion.span>
        </motion.div>
      </div>
    </footer>
  )
}
