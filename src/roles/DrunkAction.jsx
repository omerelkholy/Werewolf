import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

function DrunkAction({ onSubmit, randomColor }) {
  const { groundCards } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleConfirm = (selection) => {
    if (selection?.type === 'ground') {
      onSubmit({ target: selection.id });
      setHasSubmitted(true);
    }
  };

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="drunk-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TableLayout
              players={[]} // No players shown
              currentPlayerId={null}
              title="Drunk Action"
              description="Choose one of the ground cards."
              isModal={true}
              showGroundCards={true}
              showPlayerCards={false}
              allowMultipleSelection={false}
              maxSelections={1}
              randomColor={randomColor}
              onConfirm={handleConfirm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="drunk-confirmed"
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

export default DrunkAction;
