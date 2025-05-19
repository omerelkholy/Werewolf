import { useState } from "react"
import { useGame } from "../context/GameContext"
import PrimaryButton from "../components/PrimaryButton";


function SeerAction({ player, onSubmit, name }) {
    const { players, groundCards } = useGame();
    const [choice, setChoice] = useState(null);
    const [targetedPlayer, setTargetedPlayer] = useState(null);
    const [selectedGroundCard, setSelectedGroundCard] = useState([]);

    const toggleGroundCard = (index) => {
        let newSelected;
        if (selectedGroundCard.includes(index)) {
            newSelected = selectedGroundCard.filter(i => i !== index);
        }
        else if (selectedGroundCard.length < 2) {
            newSelected = [...selectedGroundCard, index];
        }
        setSelectedGroundCard(newSelected?.sort((a,b) => a - b))
    }

    return (
        <div className="m-4">
            <p><strong>Seer:</strong> You may look at one player's card or two ground cards.</p>

            <div className="mb-4">
                <button onClick={() => setChoice("player")} className="mr-2 text-blue-800">Peek a Player</button>
                <button className="text-blue-800" onClick={() => setChoice("ground")}>Peek 2 Ground Cards</button>
            </div>

            {choice === "player" && (
                <select
                    value={targetedPlayer || ""}
                    onChange={(e) => setTargetedPlayer(e.target.value)}
                >
                    <option disabled value="">Pick a player</option>
                    {players.filter(p => p !== player).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            )}

            {choice === "ground" && (
                <div className="space-y-2">
                    {groundCards.map((_, index) => (
                        <label key={index} className="block">
                            <input
                                type="checkbox"
                                value={index}
                                checked={selectedGroundCard.includes(index)}
                                onChange={() => toggleGroundCard(index)}
                                disabled={selectedGroundCard.length >= 2 && !selectedGroundCard.includes(index)}
                            />
                            Ground Card {index + 1}
                        </label>
                    ))}
                </div>
            )}

            <div className="mt-4">
                <PrimaryButton
                    onClick={() => {
                        if (choice === "player") {
                            onSubmit({ type: "player", target: targetedPlayer });
                        } else if (choice === "ground") {
                            onSubmit({ type: "ground", targets: selectedGroundCard });
                        }
                    }}
                    name={name}
                    color="green"
                    disabled={
                        (choice === "player" && !targetedPlayer) ||
                        (choice === "ground" && selectedGroundCard.length !== 2)
                    }
                />
            </div>
        </div>
    )
}

export default SeerAction;