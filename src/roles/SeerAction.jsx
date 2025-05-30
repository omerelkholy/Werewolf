import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";

function SeerAction({ player, onSubmit, randomColor }) {
  const { players } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mode, setMode] = useState(null); // 'player' or 'ground'

  const playerObjects = players
    .filter((p) => p !== player)
    .map((p) => ({ id: p, name: p }));

  const handleConfirm = (selection) => {
    if (Array.isArray(selection)) {
      // Ground card selection
      const groundSelections = selection.filter(s => s.type === 'ground');
      if (groundSelections.length === 2) {
        const sortedIndexes = groundSelections.map(s => s.id).sort((a, b) => a - b);
        onSubmit({ type: "ground", targets: sortedIndexes });
        setHasSubmitted(true);
      }
    } else if (selection?.type === 'player') {
      // Single player selection
      onSubmit({ type: "player", target: selection.id });
      setHasSubmitted(true);
    }
  };

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!mode && !hasSubmitted && (
          <motion.div
            key="seer-mode-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center flex-col sm:flex-row gap-4 mb-6 py-40"
          >
            
            <PrimaryButton
              onClick={() => setMode("player")}
              name="Peek a Player"
              className="w-full sm:w-auto flex-1 py-3 sm:py-0 text-sm sm:text-base" // Make button fill container height
              width="190px"
              height="68px"
            />
              
            <PrimaryButton
              onClick={() => setMode("ground")}
              name="Peek 2 Ground Cards"
              width="190px"
              height="68px"
              className="w-full sm:w-auto flex-1 py-3 sm:py-0 text-sm sm:text-base" // Make button fill container height
            />
          </motion.div>
        )}

        {mode && !hasSubmitted && (
          <motion.div
            key="seer-action-layout"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TableLayout
              players={playerObjects}
              currentPlayerId={player}
              title="Seer Action"
              description={
                mode === "player"
                  ? "Choose a player to peek at their role."
                  : "Choose two ground cards to peek."
              }
              isModal={true}
              showGroundCards={mode === "ground"}
              showPlayerCards={mode === "player"}
              allowMultipleSelection={mode === "ground"}
              maxSelections={mode === "ground" ? 2 : 1}
              randomColor={randomColor}
              onConfirm={handleConfirm}
            />
          </motion.div>
        )}

        {hasSubmitted && (
          <motion.div
            key="seer-confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-green-600 text-center mt-6"
          >
            ✔️ Action recorded. Please flip the card to continue.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SeerAction;
