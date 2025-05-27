// src/components/PhaseTransition.jsx
import { motion, AnimatePresence } from 'framer-motion'

const phaseTitles = {
  player_registration: "The Tale Begins...",
  first_pass: "The Night Begins!",   
  second_pass: "It's a Long Night",
  discussion: "Sun Shines again..",
  voting: "Save The Village!",
  results: "Moment of Truth..",
}

export default function PhaseTransition({ phase, stage }) {
  const title = phaseTitles[phase]
  if (!title) return null

  return (
    <motion.div
      key={`transition-${phase}`}
      initial={stage === 'ENTER' ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      animate={stage === 'ENTER' ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="fixed top-1/3 left-1/2 -translate-x-1/2 text-center text-3xl md:text-5xl font-[Cinzel] text-amber-300 bg-black/80 px-8 py-4 rounded-lg z-[9999] shadow-2xl border border-amber-500/30"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.span>
    </motion.div>
  )
}