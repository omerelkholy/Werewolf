import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import MainEntryScreen from './features/MainEntryScreen'
import PlayerRegistration from './features/local-mode/PlayerRegistration'
import { RoleAssignment } from './features/local-mode/RoleAssignment'
import FirstPass from './features/local-mode/FirstPass'
import SecondPass from './features/local-mode/SecondPass'
import { PHASES, useGame } from './context/GameContext'
import Discussion from './features/local-mode/Discussion'
import Voting from './features/local-mode/Voting'
import Results from './features/local-mode/Results'
import PhaseTransition from './components/PhaseTransition'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

function App() {
  const { currentPhase, setCurrentPhase } = useGame()
  const [stage, setStage] = useState('ENTER')
  const [renderPhaseContent, setRenderPhaseContent] = useState(false)

  useEffect(() => {
    setStage('ENTER')
    setRenderPhaseContent(false) // Delay phase content rendering
    const transitionTimer = setTimeout(() => {
      setStage('EXIT')
      setRenderPhaseContent(true) // Render phase content after transition
    }, 2000)
    return () => clearTimeout(transitionTimer)
  }, [currentPhase])

  function renderPhase(phase) {
    switch (phase) {
      case PHASES.MAIN_ENTRY:
        return <MainEntryScreen onStart={() => setCurrentPhase(PHASES.PLAYER_REGISTRATION)} />
      case PHASES.PLAYER_REGISTRATION:
        return <PlayerRegistration />
      case PHASES.ROLE_ASSIGNMENT:
        return <RoleAssignment />
      case PHASES.FIRST_PASS:
        return <FirstPass />
      case PHASES.SECOND_PASS:
        return <SecondPass />
      case PHASES.DISCUSSION:
        return <Discussion />
      case PHASES.VOTING:
        return <Voting />
      case PHASES.RESULTS:
        return <Results />
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="overlay fixed inset-0 z-10"></div>
      <AnimatePresence mode="wait">
        {stage === 'ENTER' && (
          <PhaseTransition key={`transition-${currentPhase}`} phase={currentPhase} stage={stage} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {renderPhaseContent && (
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 flex min-h-screen flex-col items-center justify-center"
          >
            {renderPhase(currentPhase)}
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#382112',
          color: '#d4be8c',
          fontFamily: 'Cardo, serif',
          border: '1px solid #9b4826'
        }}
      />
    </div>
  )
}

export default App