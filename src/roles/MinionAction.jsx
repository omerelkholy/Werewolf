import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";
import { motion } from "framer-motion";
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

function MinionAction({ onSubmit, name }) {
  const { players, originalRoles } = useGame();

  const werewolves = players.filter((p) =>
    ["Werewolf", "MysticWolf"].includes(originalRoles[p].roleName)
  );

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6 w-full overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-amber-300 mb-2"
        style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
      >
        Fanboy Ability
      </motion.h2>
      <div className="w-28 h-0.5 bg-amber-400 mx-auto"></div>

      <div>
        {werewolves.length > 0 ? (
          <>
            <p className="text-base font-medium mb-2 text-white">
              The Werewol{werewolves.length > 1 ? 'ves are' : 'f is'}:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-full">
              {werewolves.map((name, index) => (
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
          </>
        ) : (
          <p className="text-red-200 text-2xl">There are no Werewolves in the game.</p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4"
      >
        <PrimaryButton
          onClick={() => onSubmit({ seenWerewolves: werewolves })}
          name={name}
          width="50px"
          height="40px"
        />
      </motion.div>
    </div>
  );
}

export default MinionAction;
