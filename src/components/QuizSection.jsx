import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CONFIG } from '../config'

function ProgressBar({ current, total }) {
  return (
    <div className="w-full max-w-xs bg-blush/30 rounded-full h-1.5 mb-8">
      <motion.div
        className="h-1.5 rounded-full bg-rose"
        initial={{ width: 0 }}
        animate={{ width: `${((current) / total) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

function ConfettiHeart({ style }) {
  return (
    <motion.span
      initial={{ opacity: 1, y: 0, scale: 0 }}
      animate={{ opacity: 0, y: -80, scale: 1.2, x: style.x }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="absolute text-rose pointer-events-none select-none"
      style={{ left: style.left, top: style.top, fontSize: style.size }}
    >
      {style.char}
    </motion.span>
  )
}

function ResultsScreen({ score, total, onRestart }) {
  const { quizResults } = CONFIG
  let result
  const pct = score / total
  if (pct === 1) result = quizResults.perfect
  else if (pct >= 0.7) result = quizResults.good
  else result = quizResults.okay

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      {/* Score display */}
      <div className="mb-8">
        <div
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f9e8ea, #fdf6f0)', border: '3px solid rgba(212,135,143,0.4)' }}
        >
          <span className="font-display text-3xl font-bold text-burgundy">{score}</span>
          <span className="font-body text-xs text-rose/70">מתוך {total}</span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-burgundy mb-3">{result.title}</h3>
        <p className="font-body text-base md:text-lg text-burgundy/75 leading-relaxed max-w-sm mx-auto">
          {result.message}
        </p>
      </div>

      <button
        onClick={onRestart}
        className="px-8 py-3 bg-rose text-white font-body font-semibold rounded-full shadow-md hover:bg-burgundy transition-colors duration-300 text-sm"
      >
        שחק שוב 🎉
      </button>
    </motion.div>
  )
}

export default function QuizSection() {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedbackShown, setFeedbackShown] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [shakeKey, setShakeKey] = useState(0)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const questions = CONFIG.quiz
  const question = questions[qIndex]

  const handleAnswer = (optionIndex) => {
    if (feedbackShown) return
    setSelected(optionIndex)
    setFeedbackShown(true)

    if (optionIndex === question.correct) {
      setScore(s => s + 1)
      // Spawn confetti hearts
      const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 40}%`,
        x: (Math.random() - 0.5) * 60,
        size: `${12 + Math.random() * 10}px`,
        char: ['♥', '♡', '❤'][Math.floor(Math.random() * 3)],
      }))
      setConfetti(hearts)
      setTimeout(() => setConfetti([]), 1500)
    } else {
      setShakeKey(k => k + 1)
    }
  }

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1)
      setSelected(null)
      setFeedbackShown(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setQIndex(0)
    setSelected(null)
    setFeedbackShown(false)
    setScore(0)
    setFinished(false)
  }

  const isCorrect = selected === question?.correct

  return (
    <section className="relative py-24 px-4 z-10" style={{ background: 'linear-gradient(180deg, #fdf6f0 0%, #f0e8f5 40%, #fdf6f0 100%)' }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs text-rose/60 mb-3">פרק רביעי</p>
          <h2 className="font-display text-4xl md:text-5xl text-burgundy mb-3">
            כמה טוב אתה מכיר אותנו?
          </h2>
          <p className="font-body italic text-burgundy/60 text-base">
            חידון זוגי רציני מאוד ורשמי ביותר.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose/40" />
            <span className="text-rose text-sm">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose/40" />
          </div>
        </motion.div>

        {/* Quiz card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 md:p-10 w-full relative overflow-hidden"
        >
          {/* Confetti hearts */}
          {confetti.map(h => <ConfettiHeart key={h.id} style={h} />)}

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress */}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-xs text-rose/60">
                    שאלה {qIndex + 1} מתוך {questions.length}
                  </span>
                  <span className="font-body text-xs text-rose/60">
                    ניקוד: {score}
                  </span>
                </div>
                <ProgressBar current={qIndex} total={questions.length} />

                {/* Question */}
                <h3 className="font-display text-xl md:text-2xl text-burgundy mb-8 leading-snug">
                  {question.question}
                </h3>

                {/* Options */}
                <div
                  key={shakeKey}
                  className={!isCorrect && feedbackShown && shakeKey > 0 ? 'shake-no' : ''}
                >
                  <div className="grid gap-3">
                    {question.options.map((option, i) => {
                      let btnStyle = 'bg-cream border-rose/20 hover:border-rose/50 hover:bg-rose/5 text-burgundy/85'
                      if (feedbackShown) {
                        if (i === question.correct) {
                          btnStyle = 'bg-green-50 border-green-400 text-green-800'
                        } else if (i === selected && i !== question.correct) {
                          btnStyle = 'bg-red-50 border-red-400 text-red-800'
                        } else {
                          btnStyle = 'bg-cream/60 border-rose/10 text-burgundy/40 cursor-default'
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={feedbackShown}
                          className={`
                            w-full text-right px-5 py-3.5 rounded-xl border-2 font-body text-sm md:text-base
                            transition-all duration-200 leading-snug
                            ${btnStyle}
                            ${!feedbackShown ? 'cursor-pointer active:scale-98' : ''}
                          `}
                        >
                          <span className="font-semibold ml-2 text-xs opacity-50">
                            {['א', 'ב', 'ג', 'ד'][i]}.
                          </span>
                          {option}
                          {feedbackShown && i === question.correct && (
                            <span className="ml-2">✓</span>
                          )}
                          {feedbackShown && i === selected && i !== question.correct && (
                            <span className="ml-2">✗</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Feedback message */}
                <AnimatePresence>
                  {feedbackShown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-5 p-4 rounded-xl text-sm font-body leading-relaxed ${
                        isCorrect
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-rose/10 text-burgundy border border-rose/20'
                      }`}
                    >
                      {isCorrect ? question.correctMessage : question.wrongMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                <AnimatePresence>
                  {feedbackShown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 flex justify-end"
                    >
                      <button
                        onClick={handleNext}
                        className="px-7 py-2.5 bg-rose text-white font-body font-semibold rounded-full shadow-md hover:bg-burgundy transition-colors duration-200 text-sm"
                      >
                        {qIndex < questions.length - 1 ? '← שאלה הבאה' : 'הצג את התוצאות שלי 🎉'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResultsScreen score={score} total={questions.length} onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
