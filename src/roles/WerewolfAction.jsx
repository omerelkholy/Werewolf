import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import PrimaryButton from "../components/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import RoleCard from "../components/RoleCard";
import evilVillager1 from "../assets/images/evilvillager1.png";
import evilVillager2 from "../assets/images/evilvillager2.png";
import evilVillager3 from "../assets/images/evilvillager3.png";


const evilVillagers = [evilVillager1, evilVillager2, evilVillager3];


const createAnonymousEvilVillagerCard = (playerName) => ({
  roleName: playerName,
  team: "Werewolves",
  effect: {
    effectName: "DEVIL",
    action: "MasterMind in disguise"
  },
  _anonymousImage: evilVillagers[Math.floor(Math.random() * evilVillagers.length)]
});

function WerewolfAction({ player, onSubmit, name, randomColor }) {
  const { players, originalRoles } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const werewolves = players.filter(p =>
    ["Werewolf", "MysticWolf"].includes(originalRoles[p]?.roleName)
  );

  const otherWerewolves = werewolves.filter(p => p !== player);

  if (werewolves.length > 1) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-3 py-4 space-y-4 w-full overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-amber-300 mb-2"
          style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          Gang Awareness
        </motion.h2>
        <div className="w-28 h-0.5 bg-amber-400 mx-auto"></div>

        <p className="text-base font-medium mb-2 text-white">
          Fellow Werewol{otherWerewolves.length > 1 ? 'ves' : 'f'}:
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-full">
          {otherWerewolves.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex justify-center"
            >
              <RoleCard
                role={createAnonymousEvilVillagerCard(name)}
                variant="Back"
                size="tiny"
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4"
        >
          <PrimaryButton
            onClick={() => onSubmit({ teammates: otherWerewolves })}
            name={name}
            color="green"
          />
        </motion.div>
      </div>
    );
  }

  // Solo werewolf: can see one ground card
  const handleConfirm = (selection) => {
    if (selection?.type === 'ground') {
      onSubmit({ groundcard: selection.id });
      setHasSubmitted(true);
    }
  };

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="werewolf-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TableLayout
              players={[]}
              currentPlayerId={player}
              title="Lone Wolf"
              description="You're a lone wolf this game, Pick a ground card to look at."
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
            key="werewolf-confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-green-600 text-center mt-6"
          >
            ✔️ Ground card viewed. Please flip the card to continue.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WerewolfAction;
