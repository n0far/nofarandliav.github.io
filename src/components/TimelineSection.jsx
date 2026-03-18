import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONFIG } from '../config'

const TYPE_COLORS = {
  milestone:  { bg: 'bg-burgundy/10', border: 'border-burgundy/30', dot: '#6b2d3e' },
  date:       { bg: 'bg-rose/10',     border: 'border-rose/30',     dot: '#d4878f' },
  adventure:  { bg: 'bg-gold/10',     border: 'border-gold/30',     dot: '#c9a84c' },
  funny:      { bg: 'bg-terracotta/10', border: 'border-terracotta/30', dot: '#c9684a' },
  text:       { bg: 'bg-blush/20',    border: 'border-blush/40',    dot: '#e8b4b8' },
}

function TimelineCard({ event, isLeft }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const colors = TYPE_COLORS[event.type] || TYPE_COLORS.milestone

  // In RTL, flex-row-reverse puts card on LEFT and flex-row puts it on RIGHT.
  // Animation enters from the side the card is on: LEFT → x negative, RIGHT → x positive.
  const enterX = isLeft ? -50 : 50
  // Margins: create gap between card and center dot.
  // isLeft (card on LEFT in RTL) → margin on right side; isLeft=false (card on RIGHT) → margin on left side.
  const marginClass = isLeft ? 'md:mr-10' : 'md:ml-10'

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center mb-12 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:gap-0 gap-4`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: enterX, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-card rounded-2xl p-5 md:p-6 w-full md:w-[calc(50%-2.5rem)] ${marginClass} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-body ${colors.bg} ${colors.border} border rounded-full px-3 py-0.5 text-burgundy/70`}>
            {event.date}
          </span>
          <span className="text-xl">{event.emoji}</span>
        </div>

        <h3 className="font-display text-xl md:text-2xl text-burgundy font-semibold mb-2 leading-snug">
          {event.title}
        </h3>

        <p className="font-body text-sm md:text-base text-burgundy/75 leading-relaxed mb-4">
          {event.description}
        </p>

        {event.photo ? (
          <div className="w-full aspect-square rounded-xl overflow-hidden mt-2">
            <img src={event.photo} alt={event.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full aspect-square photo-placeholder rounded-xl mt-2">
            <span className="text-2xl">📷</span>
            <span className="text-xs text-center px-4 leading-snug">הכנס תמונה כאן</span>
          </div>
        )}
      </motion.div>

      {/* Center dot — desktop */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center"
      >
        <div
          className="w-10 h-10 rounded-full border-4 border-cream flex items-center justify-center shadow-md"
          style={{ backgroundColor: colors.dot }}
        >
          <span className="text-white text-xs leading-none">{event.emoji}</span>
        </div>
      </motion.div>

      {/* Mobile dot — right side (RTL start) */}
      <div
        className="md:hidden absolute right-0 top-5 w-8 h-8 rounded-full border-2 border-cream flex items-center justify-center shadow"
        style={{ backgroundColor: colors.dot }}
      >
        <span className="text-white text-xs">{event.emoji}</span>
      </div>

      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  )
}

export default function TimelineSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-24 px-4 md:px-8 z-10" style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #f9e8ea 30%, #fdf6f0 100%)' }}>
      <div className="max-w-4xl mx-auto">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs text-rose/60 mb-3">פרק ראשון</p>
          <h2 className="font-display text-4xl md:text-5xl text-burgundy mb-4">השנה שלנו ביחד</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose/40" />
            <span className="text-rose text-sm">✦</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose/40" />
          </div>
        </motion.div>

        {/* Timeline — mobile uses right-side line for RTL */}
        <div className="relative md:pr-0 pr-10">
          <div className="timeline-line hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 top-0 bottom-0 z-0" />
          <div className="timeline-line md:hidden absolute right-4 translate-x-1/2 w-0.5 top-0 bottom-0 z-0" />

          {CONFIG.timeline.map((event, i) => (
            <TimelineCard key={i} event={event} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
