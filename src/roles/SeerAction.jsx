import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

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
            className="flex justify-center gap-4 mb-6"
          >
            <button
              onClick={() => setMode("player")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 transition-all duration-300 py-2 rounded"
            >
              Peek a Player
            </button>
            <button
              onClick={() => setMode("ground")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 transition-all duration-300 py-2 rounded"
            >
              Peek 2 Ground Cards
            </button>
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
