import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import PlayerRegistration from './features/local-mode/PlayerRegistration'
import { RoleAssignment } from './features/local-mode/RoleAssignment'
import FirstPass from './features/local-mode/FirstPass'
import SecondPass from './features/local-mode/SecondPass'
import { PHASES, useGame } from './context/GameContext'
import Discussion from './features/local-mode/Discussion'
import Voting from './features/local-mode/Voting'
import Results from './features/local-mode/Results'

function App() {
  const {currentPhase} = useGame();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      {currentPhase === PHASES.PLAYER_REGISTRATION && <PlayerRegistration />}
      {currentPhase === PHASES.ROLE_ASSIGNMENT && <RoleAssignment />}
      {currentPhase === PHASES.FIRST_PASS && <FirstPass />}
      {currentPhase === PHASES.SECOND_PASS && <SecondPass />}
      {currentPhase === PHASES.DISCUSSION && <Discussion />}
      {currentPhase === PHASES.VOTING && <Voting />}
      {currentPhase === PHASES.RESULTS && <Results />}

      <ToastContainer />
    </div>
  )
}

export default App
