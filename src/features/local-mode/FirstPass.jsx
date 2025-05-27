import { useState } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import RoleActionWrapper from "../../components/RoleActionWrapper";
import RoleCard from "../../components/RoleCard";
import { WithCardFlip } from "../../components/WithCardFlip";
import ActionModal from "../../components/ActionModal";
import { motion, AnimatePresence } from "framer-motion";
import CardSound from "../../../public/audios/card_flip.mp3"
const FlipCard = WithCardFlip(RoleCard);

function FirstPass() {
    const { players, assignedRoles, setCurrentPhase, submitAction } = useGame();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [actionStarted, setActionStarted] = useState(false);
    const [actionComplete, setActionComplete] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [showModal, setShowModal] = useState(false);


    console.log(useGame());

    const currentPlayer = players[currentIndex];
    const role = assignedRoles[currentPlayer];

    const cardColors = ["bg-[#240C3A]", "bg-[#3C0000]", "bg-[#14131D]"];
    const [randomColor] = useState(() =>
        cardColors[Math.floor(Math.random() * cardColors.length)]
    );

    const handleFlipComplete = () => {
        setActionStarted(true);
        // Show modal if the role has an effect that needs it
        if (role.effect.effectName) {
            setShowModal(true);
        }
    };

    const handleActionComplete = (data) => {
        if (data) setPendingAction(data);
        setActionComplete(true);
        setShowModal(false); // Close the modal when action completes
    };

    const handleCardClickAfterAction = () => {
        const isClone = role.roleName === "Clone";

        if (actionComplete && (pendingAction || isClone)) {
            if (pendingAction) {
                submitAction(currentPlayer, role.roleName, pendingAction);
            }

            setTimeout(() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex >= players.length) {
                    setCurrentPhase(PHASES.SECOND_PASS);
                } else {
                    setCurrentIndex(nextIndex);
                    setIsFlipped(false);
                    setActionStarted(false);
                    setActionComplete(false);
                    setPendingAction(null);
                    setShowModal(false);
                }
            }, 800);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
            <div className="overlay absolute inset-0"></div>
            {/* Player name container - now responsive */}
            <div className="w-full max-w-md mx-auto mb-4 md:mb-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPlayer}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="glass-container bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 z-10 border border-amber-500/30 shadow-lg"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-amber-300 text-center uppercase">
                            Pass the device to{" "}
                            <strong className="text-white font-semibold block sm:inline mt-1 sm:mt-0 normal-case">
                                {currentPlayer}
                            </strong>
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Card container - perfectly centered */}
            <div className="flex justify-center items-center w-full">
                <div className="w-[280px] sm:w-[300px] h-[380px] sm:h-[400px] cursor-pointer flex justify-center items-center"
                    onClick={handleCardClickAfterAction}
                >
                    <FlipCard
                        width="90%"
                        height="100%"
                        role={role}
                        color={randomColor}
                        variant={isFlipped ? "Back" : "Front"}
                        flipSoundUrl={CardSound}
                        onFlipComplete={() => {
                            setIsFlipped(true);
                            handleFlipComplete();
                        }}
                    />
                </div>
            </div>

            {/* Show action in modal or inline based on whether it needs special layout */}
            <ActionModal show={showModal} onClose={() => setShowModal(false)}>
                {actionStarted && (
                    <RoleActionWrapper
                        player={currentPlayer}
                        role={role}
                        name={currentIndex === players.length - 1 ? "Next Phase" : "Next Player"}
                        onComplete={handleActionComplete}
                        randomColor={randomColor}
                    />
                )}
            </ActionModal>
        </div>
    );
}

export default FirstPass;