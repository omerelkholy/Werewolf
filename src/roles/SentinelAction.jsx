import { useState } from "react";
import { useGame } from "../context/GameContext"
import PrimaryButton from "../components/PrimaryButton";

function SentinelAction({ player, onSubmit, name }) {
    const { players } = useGame();
    const [targetedPlayer, setTargetedPlayer] = useState(null);

    return (
        <div className="m-4">
            <p><strong>Sentinel:</strong> Choose a player to shield and protect.</p>
            <select
                value={targetedPlayer || ""}
                onChange={(e) => setTargetedPlayer(e.target.value)}
            >
                <option disabled value="">Pick a player</option>
                {players.filter((p) => p !== player).map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>

            <div className="mt-4">
                <PrimaryButton
                    onClick={() => {
                        onSubmit({ target: targetedPlayer });

                    }}
                    name={name}
                    color="green"
                    disabled={(!targetedPlayer)}
                />
            </div>
        </div>
    )
}

export default SentinelAction;