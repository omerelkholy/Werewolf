import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";
import { motion } from "framer-motion";
import RoleCard from "../components/RoleCard";
import villager1 from "../assets/images/villager1.png"
import villager2 from "../assets/images/villager2.png";
import villager3 from "../assets/images/villager3.png";
import villager4 from "../assets/images/villager4.png";

const villagers = [villager1, villager2, villager3, villager4];

const createAnonymousVillagerCard = (playerName) => ({
  roleName: playerName,
  team: "Villagers",
  effect: {
    effectName: "USELESS",
    action: "Protected by anonymity"
  },
  _anonymousImage: villagers[Math.floor(Math.random() * villagers.length)]
});

function MasonAction({ player, onSubmit, name }) {
  const { players, originalRoles } = useGame();

  const masons = players.filter((p) => ["Mason"].includes(originalRoles[p].roleName));
  const otherMasons = masons.filter(p => p !== player);

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
        TruthSeeker Bonds
      </motion.h2>
      <div className="w-40 h-0.5 bg-amber-400 mx-auto"></div>

      <div>
        {otherMasons.length > 0 ? (
          <>
            <p className="text-base font-medium mb-2 text-white">
              Fellow Mason{otherMasons.length > 1 ? "s" : ""}:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-full">
              {otherMasons.map((name, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex justify-center"
                >
                  <RoleCard
                    role={createAnonymousVillagerCard(name)}
                    variant="Back"
                    size="tiny"
                  />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-green-200 text-2xl">You're the only Mason!</p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4"
      >
        <PrimaryButton
          onClick={() => onSubmit({ teammate: otherMasons })}
          name={name}
          color="green"
        />
      </motion.div>
    </div>
  );
}

export default MasonAction;
