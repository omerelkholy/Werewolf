import { useState } from "react";
import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

function WerewolfAction({ player, onSubmit, name }) {
    const { players, groundCards, originalRoles } = useGame();
    const [selectedgroundCard, setSelectedGroundCard] = useState();

    const werewolves = players.filter(p => ["Werewolf", "MysticWolf"].includes(originalRoles[p].roleName));

    if (werewolves.length > 1) {
        return (
            <div>
                <>
                    <p>you're a werewolf</p>
                    <p>You're not Alone!</p>
                    <p>The other Werewolf(s): {werewolves.filter(p => p !== player).join(", ")}</p>
                </>

                <div className="mt-4">
                    <PrimaryButton
                        onClick={() => onSubmit({ teammates: werewolves.filter(p => p !== player) })}
                        name={name}
                        color="green"
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
            <p><strong>Werewolf:</strong>See your werewolf allies and MysticWolf if exists and if you were alone, you can see a ground card.</p>
                <select
                    value={selectedgroundCard || ""}
                    onChange={(e) => setSelectedGroundCard(e.target.value)}
                >
                    <option disabled value="">Pick a ground card to see</option>
                    {groundCards.map((_, index) => (
                        <option key={index} value={index}>ground card {index + 1}</option>
                    ))}
                </select>

                <div className="mt-4">
                    <PrimaryButton
                        onClick={() => {
                            onSubmit({ groundcard: selectedgroundCard });

                        }}
                        name={name}
                        color="green"
                        disabled={(!selectedgroundCard)}
                    />
                </div>
            </div>
        )
    }
}

export default WerewolfAction;