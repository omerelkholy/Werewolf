import PrimaryButton from "../components/PrimaryButton";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
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

function DreamWolfAction({ onSubmit, name }) {
  const { players, originalRoles } = useGame();
  const minion = players.filter((p) => ["Minion"].includes(originalRoles[p]?.roleName));

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-5 w-full overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-amber-300 mb-2"
          style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
        Dreams of Loyalty
      </motion.h2>
        <div className="w-28 h-0.5 bg-amber-400 mx-auto"></div>

      {minion.length > 0 ? (
        <div>
          <p className="text-base font-medium mb-2 text-white">
            The minion serves you:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-full">
            {minion.map((name, index) => (
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
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-3"
        >
          No minion this game.
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <PrimaryButton
          onClick={() => onSubmit({ dreamWolf: "dreamWolf" })}
          name={name}
          width="50px"
          height="40px"
        />
      </motion.div>
    </div>
  );
}

export default DreamWolfAction;
