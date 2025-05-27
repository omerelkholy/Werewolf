import { useState, useEffect } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import PrimaryButton from "../../components/PrimaryButton";

function Voting() {
    const {
        players,
        votes,
        setVotes,
        setCurrentPhase
    } = useGame();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isLastVote, setIsLastVote] = useState(false);

    const currentPlayer = players[currentIndex];

    useEffect(() => {
        if (isLastVote && votes.length === players.length) {
            setCurrentPhase(PHASES.RESULTS);
            setIsLastVote(false);
        }
    }, [votes, isLastVote, players.length, setCurrentPhase]);

    const handleVote = () => {
        setVotes(prev => [...prev, { from: currentPlayer, to: selectedPlayer }]);

        const nextIndex = currentIndex + 1;
        if (nextIndex >= players.length) {
            setIsLastVote(true);
        } else {
            setCurrentIndex(nextIndex);
        }

        setSelectedPlayer(null);
    };

    return (
        <>
            <div className="overlay"></div>
            <div className="p-6 z-20 text-black space-y-4">
                <h2 className="text-2xl font-bold text-green-400">Voting Phase</h2>
                <p><strong>{currentPlayer}</strong>, choose someone to eliminate:</p>
                <select
                    value={selectedPlayer || ""}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option disabled value="">Pick a player</option>
                    {players.filter(p => p !== currentPlayer).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <PrimaryButton
                    name="Submit Vote"
                    onClick={handleVote}
                    color="green"
                    disabled={!selectedPlayer}
                />

                <div className="mt-4">
                    <p className="text-sm text-gray-600">Votes recorded: {votes.length} / {players.length}</p>
                </div>
            </div>
        </>
    )
}

export default Voting;