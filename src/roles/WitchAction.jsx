import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

function WitchAction({ player, onSubmit, randomColor }) {
  const { players } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const playerObjects = players
    .filter((p) => p !== player)
    .map((p) => ({ id: p, name: p }));

  const handleConfirm = (selection) => {
    if (Array.isArray(selection)) {
      const selectedPlayer = selection.find(s => s.type === 'player');
      const selectedGround = selection.find(s => s.type === 'ground');

      if (selectedPlayer && selectedGround) {
        onSubmit({
          player: selectedPlayer.id,
          groundCard: selectedGround.id
        });
        setHasSubmitted(true);
      }
    }
  };

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="witch-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TableLayout
              players={playerObjects}
              currentPlayerId={player}
              title="Witch Action"
              description="Select one player and one ground card to swap."
              isModal={true}
              showGroundCards={true}
              showPlayerCards={true}
              allowMultipleSelection={true}
              maxSelections={2}
              randomColor={randomColor}
              onConfirm={handleConfirm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="witch-confirmed"
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

export default WitchAction;
