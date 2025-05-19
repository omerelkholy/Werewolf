import { useState } from "react"
import { useGame } from "../context/GameContext"
import PrimaryButton from "../components/PrimaryButton";

function WitchAction({ player, onSubmit, name }) {
    const { players, groundCards } = useGame();
    const [targetedPlayer, setTargetedPlayer] = useState(null);
    const [selectedGroundCard, setSelectedGroundCard] = useState(null);

    return (
        <div className="m-4">
            <p><strong>Witch:</strong>Choose a player and a ground card to switch with.</p>

            <div className="space-y-2">

                <select
                    value={targetedPlayer || ""}
                    onChange={(e) => setTargetedPlayer(e.target.value)}
                >
                    <option disabled value="">pick the player</option>
                    {players.filter((p) => p !== player).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <select
                    value={selectedGroundCard || ""}
                    onChange={(e) => setSelectedGroundCard(e.target.value)}
                >
                    <option disabled value="">Pick a ground card</option>
                    {groundCards.map((_, index) => (
                        <option key={index} value={index}>Ground card {index + 1}</option>
                    ))}

                </select>
            </div>

            <div className="mt-4">
                <PrimaryButton
                    onClick={() => {
                        onSubmit({ player: targetedPlayer , groundCard: selectedGroundCard });
                    }}
                    name={name}
                    color="green"
                    disabled={
                        (!targetedPlayer || !selectedGroundCard)
                    }
                />
            </div>
        </div>
    )

}

export default WitchAction;