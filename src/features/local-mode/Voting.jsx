import { useState, useEffect } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import PrimaryButton from "../../components/PrimaryButton";
import TableLayout from "../../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentPlayer = players[currentIndex];

    useEffect(() => {
        if (isLastVote && votes.length === players.length) {
            setCurrentPhase(PHASES.RESULTS);
            setIsLastVote(false);
        }
    }, [votes, isLastVote, players.length, setCurrentPhase]);

    const handleVote = (selection) => {
        if (selection?.type === 'player') {
            setVotes(prev => [...prev, { from: currentPlayer, to: selection.id }]);
            setSelectedPlayer(selection.id);
            setHasSubmitted(true);
        }
    };

    const handleContinue = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            const nextIndex = currentIndex + 1;
            if (nextIndex >= players.length) {
                setIsLastVote(true);
            } else {
                setCurrentIndex(nextIndex);
            }

            setSelectedPlayer(null);
            setHasSubmitted(false);
            setIsTransitioning(false);
        }, 300); // Matches the animation duration
    };

    // Create player objects including "No Werewolf" option
    const votingOptions = [
        { id: "no-werewolf", name: "No Werewolf" },
        ...players
            .filter(p => p !== currentPlayer)
            .map(p => ({ id: p, name: p }))
    ];

    return (
        <div className="p-6 glass-container bg-white/10 backdrop-blur-md rounded-xl md:p-6 border border-amber-500/30 shadow-lg z-20 text-black space-y-4">            
            {!hasSubmitted ? (
                <AnimatePresence mode="wait">
                    {!isTransitioning && (
                        <motion.div
                            key={`table-${currentPlayer}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TableLayout
                                players={votingOptions}
                                currentPlayerId={currentPlayer}
                                title={`${currentPlayer}'s Vote`}
                                description="Select a player to eliminate or choose 'No Werewolf'"
                                isModal={false}
                                showGroundCards={false}
                                showPlayerCards={true}
                                allowMultipleSelection={false}
                                maxSelections={1}
                                randomColor="bg-[#1a1a1a]"
                                onConfirm={handleVote}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`confirmation-${currentPlayer}`}
                        className="text-center flex flex-col justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-lg mb-4 text-white">
                            You voted to eliminate: <strong>
                                {selectedPlayer === "no-werewolf" ? "No Werewolf" : selectedPlayer}
                            </strong>
                        </p>
                        <PrimaryButton
                            name="Continue"
                            onClick={handleContinue}
                            color="green"
                        />
                    </motion.div>
                </AnimatePresence>
            )}

            <div className="mt-10 text-center">
                <p className="text-base text-white">Votes recorded: {votes.length} / {players.length}</p>
            </div>
        </div>
    )
}

export default Voting;