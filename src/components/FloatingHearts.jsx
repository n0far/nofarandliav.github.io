import { useMemo } from 'react'

// One of the hearts is the hidden Easter egg trigger — golden, slightly glowing.
// The user discovers it by clicking the golden heart that drifts differently.

const HEART_CHARS = ['♥', '♡', '❤', '♥', '♥']
const PINKS = ['#e8b4b8', '#d4878f', '#c9848a', '#f0c8cc', '#e8a4a8', '#f5d0d3']

export default function FloatingHearts({ onEasterEggFound }) {
  const hearts = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const isEasterEgg = i === 14 // The 15th heart is the easter egg
      return {
        id: i,
        isEasterEgg,
        size: isEasterEgg ? 24 : Math.random() * 14 + 7,
        left: isEasterEgg ? 82 : Math.random() * 96 + 2,
        delay: isEasterEgg ? 2 : Math.random() * 18,
        duration: isEasterEgg ? 18 : Math.random() * 10 + 9,
        opacity: isEasterEgg ? 0.8 : Math.random() * 0.3 + 0.1,
        color: isEasterEgg ? '#c9a84c' : PINKS[Math.floor(Math.random() * PINKS.length)],
        char: isEasterEgg ? '♥' : HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
      }
    })
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {hearts.map(h => (
        <span
          key={h.id}
          onClick={h.isEasterEgg ? onEasterEggFound : undefined}
          className={`absolute select-none heart-float ${h.isEasterEgg ? 'easter-heart pointer-events-auto' : ''}`}
          title={h.isEasterEgg ? '✨' : undefined}
          style={{
            left: `${h.left}%`,
            bottom: `-40px`,
            fontSize: `${h.size}px`,
            color: h.color,
            '--heart-opacity': h.opacity,
            '--heart-duration': `${h.duration}s`,
            '--heart-delay': `${h.delay}s`,
            userSelect: 'none',
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  )
}
