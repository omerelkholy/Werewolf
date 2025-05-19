import { useState } from "react";
import { useGame } from "../context/GameContext"
import PrimaryButton from "../components/PrimaryButton";

function TroubleMakerAction({ player, onSubmit, name }) {
    const { players } = useGame();
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [secondPlayer, setSecondPlayer] = useState(null);
    const allowedPlayers = players.filter((p) => p !== player);


    return (
        <div className="m-4">
            <p><strong>Troublemaker:</strong> Switch 2 player cards.</p>

            <div className="space-y-2">
                <select
                    value={firstPlayer || ""}
                    onChange={(e) => {
                        setFirstPlayer(e.target.value)
                        if (e.target.value === secondPlayer) setSecondPlayer(null)
                    }}
                >
                    <option disabled value="">Pick the first player</option>
                    {players.filter(p => p !== player).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <select
                    value={secondPlayer || ""}
                    onChange={(e) => setSecondPlayer(e.target.value)}
                >
                    <option disabled value="">Pick the second player</option>
                    {allowedPlayers.filter(p => p !== firstPlayer).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <div className="mt-4">
                <PrimaryButton
                    onClick={() => {
                        onSubmit({ targets: [firstPlayer, secondPlayer] });
                    }}
                    name={name}
                    color="green"
                    disabled={
                        (!firstPlayer || !secondPlayer)
                    }
                />
            </div>
        </div>
    )
}

export default TroubleMakerAction;