import { PHASES, useGame } from "../../context/GameContext";
import PrimaryButton from '../../components/PrimaryButton';

function Discussion(){
    const {setCurrentPhase} = useGame();

    const nextPhase = () => {
        setCurrentPhase(PHASES.VOTING);
    }
    return(
        <>
        <h1>DISCUSSION</h1>

        <PrimaryButton 
        onClick={nextPhase}
        name="Next Phase"
        color="green"
        />
        </>
    )
}

    export default Discussion;