import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

function RobberAction({ player, onSubmit, randomColor }) {
  const { players } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const playerObjects = players
    .filter(p => p !== player)
    .map(p => ({ id: p, name: p }));

  const handleConfirm = (selection) => {
    if (selection?.type === 'player') {
      onSubmit({ target: selection.id });
      setHasSubmitted(true);
    }
  };

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="robber-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TableLayout
              players={playerObjects}
              currentPlayerId={player}
              title="Robber Action"
              description="Choose one player to rob. You'll take their role and learn what it was."
              isModal={true}
              showGroundCards={false}
              showPlayerCards={true}
              allowMultipleSelection={false}
              maxSelections={1}
              randomColor={randomColor}
              onConfirm={handleConfirm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="robber-confirmed"
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

export default RobberAction;


