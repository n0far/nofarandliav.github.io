import { motion } from 'framer-motion'
import { CONFIG } from '../config'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HeroSection() {
  const { hero, names, anniversaryDate } = CONFIG

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 z-10">

      {hero.photo ? (
        <motion.div
          {...fadeUp(0.2)}
          className="mb-8 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-rose/40 shadow-xl"
        >
          <img src={hero.photo} alt="אנחנו" className="w-full h-full object-cover" />
        </motion.div>
      ) : (
        <motion.div
          {...fadeUp(0.2)}
          className="mb-8 w-28 h-28 md:w-36 md:h-36 rounded-full photo-placeholder border-4 border-rose/30 shadow-lg"
        >
          <span className="text-3xl">📸</span>
          <span className="text-xs text-center px-2 leading-tight">הכנס תמונה כאן</span>
        </motion.div>
      )}

      <motion.div {...fadeUp(0.4)} className="mb-3">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-burgundy leading-tight">
          {hero.heading}
        </h1>
        {/* <h1 className="font-display font-light text-6xl md:text-8xl lg:text-9xl text-rose leading-tight mt-1">
          {names.to}
        </h1> */}
      </motion.div>

      <motion.p
        {...fadeUp(0.65)}
        className="font-body text-base md:text-lg text-rose/80 mb-3"
      >
        {anniversaryDate.start} — {anniversaryDate.end}
      </motion.p>

      <motion.div {...fadeUp(0.8)} className="flex items-center gap-3 mb-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
        <span className="text-rose text-xl">♥</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
      </motion.div>

      <motion.p
        {...fadeUp(0.95)}
        className="font-body italic text-burgundy/70 text-lg md:text-xl max-w-md mb-16"
      >
        {hero.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-sm text-rose/60">{hero.scrollPrompt}</span>
        <span className="text-rose/50 text-xl bounce-gentle inline-block">↓</span>
      </motion.div>
    </section>
  )
}
