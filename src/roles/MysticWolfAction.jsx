import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";
import RoleCard from "../components/RoleCard";
import evilVillager1 from "../assets/images/evilvillager1.png";
import evilVillager2 from "../assets/images/evilvillager2.png";
import evilVillager3 from "../assets/images/evilvillager3.png";
import { IoClose } from "react-icons/io5";

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

function MysticWolfAction({ player, onSubmit, name, randomColor, isCloned = false }) {
  const { players, originalRoles } = useGame();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showGangAwareness, setShowGangAwareness] = useState(true);

  const werewolves = players.filter(
    (p) => originalRoles[p]?.roleName === "Werewolf"
  );

  const otherWerewolves = werewolves.filter(p => p !== player);

  const playerObjects = players
    .filter((p) =>
      p !== player &&
      (!isCloned ? !werewolves.includes(p) : true)
    )
    .map((p) => ({ id: p, name: p }));

  const handleConfirm = (selection) => {
    if (selection?.type === 'player') {
      const data = {
        type: "player",
        target: selection.id,
      };

      if (!isCloned && werewolves.length > 0) {
        data.werewolves = werewolves;
      }

      onSubmit(data);
      setHasSubmitted(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {!hasSubmitted ? (
          <motion.div
            key="mysticwolf-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 h-full"
          >
            {/* Scrollable content container */}
            <div className="relative flex-1">
              {/* Werewolf teammates section */}
              {!isCloned && otherWerewolves.length > 0 && showGangAwareness && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full absolute z-50 top-12 px-3 py-4 glass-container bg-white/10 backdrop-blur-md mb-4"
                >
                  <motion.button
                    onClick={() => setShowGangAwareness(false)}
                    className="absolute top-2 right-3 text-3xl text-red-800 hover:text-red-600 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IoClose />
                  </motion.button>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-amber-300 mb-2 text-center"
                    style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    Gang Awareness
                  </motion.h2>
                  <div className="w-28 h-0.5 bg-amber-400 mx-auto mb-3"></div>
                  <p className="text-base font-medium mb-3 text-white text-center">
                    Fellow Werewol{otherWerewolves.length > 1 ? 'ves' : 'f'}:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {otherWerewolves.map((name, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
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
                </motion.div>
              )}

              {/* Player selection table */}
              <div className="w-full">
                <TableLayout
                  players={playerObjects}
                  currentPlayerId={player}
                  title="Mystic Wolf Action"
                  description="See one player card role (excluding Werewolves)."
                  isModal={true}
                  showGroundCards={false}
                  showPlayerCards={true}
                  allowMultipleSelection={false}
                  maxSelections={1}
                  randomColor={randomColor}
                  onConfirm={handleConfirm}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mysticwolf-confirmed"
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

export default MysticWolfAction;