import { useState } from "react";
import { PHASES, useGame } from "../../context/GameContext"
import PrimaryButton from "../../components/PrimaryButton";
import RoleActionWrapper from "../../components/RoleActionWrapper";


function FirstPass() {
    const { players, assignedRoles, setCurrentPhase, submitAction } = useGame();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const currentPlayer = players[currentIndex];
    const role = assignedRoles[currentPlayer];


    const revealRole = () => {
        setIsRevealed(true)
    }

    const nextPlayer = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex >= players.length) {
            setCurrentPhase(PHASES.SECOND_PASS)
        }
        else {
            setCurrentIndex(nextIndex)
            setIsRevealed(false)
        }
    }


    console.log(useGame())

    return (
        <>
            <p className="m-5">{currentPlayer}</p>
            {!isRevealed && <PrimaryButton
                onClick={revealRole}
                name="Reveal your role"
                color="green"
            />}
            {isRevealed && (
                <RoleActionWrapper
                    player={currentPlayer}
                    role={role}
                    name={currentIndex === players.length - 1 ? "Start Discussion" : "Next Player"}
                    submitAction={submitAction}
                    onComplete={nextPlayer}
                />
            )}
        </>
    )
}

export default FirstPass