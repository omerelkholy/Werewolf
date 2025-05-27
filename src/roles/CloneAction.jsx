import { useState } from "react";
import { useGame } from "../context/GameContext";
import TableLayout from "../components/TableLayout";
import { motion, AnimatePresence } from "framer-motion";

// Import role action components
import RobberAction from "./RobberAction";
import TroubleMakerAction from "./TroubleMakerAction";
import WitchAction from "./WitchAction";
import SeerAction from "./SeerAction";
import SentinelAction from "./SentinelAction";
import MysticWolfAction from "./MysticWolfAction";
import DrunkAction from "./DrunkAction";

function CloneAction({ player, onSubmit, name, randomColor }) {
  const { players, originalRoles, submitAction } = useGame();
  const [cloneConfirmed, setCloneConfirmed] = useState(false);
  const [targetedPlayer, setTargetedPlayer] = useState(null);

  const clonedRole = targetedPlayer ? originalRoles[targetedPlayer]?.roleName : null;

  const ActionComponentMap = {
    Seer: SeerAction,
    Robber: RobberAction,
    TroubleMaker: TroubleMakerAction,
    Witch: WitchAction,
    Sentinel: SentinelAction,
    Drunk: DrunkAction,
    MysticWolf: MysticWolfAction,
  };

  const ClonedActionComponent = clonedRole && ActionComponentMap[clonedRole];
  const isMysticWolfClone = clonedRole === "MysticWolf";

  const handleCloneConfirm = (selection) => {
    if (selection?.type === 'player') {
      const clonedTargetId = selection.id;
      setTargetedPlayer(clonedTargetId);

      // Submit initial clone selection
      submitAction(player, "Clone", { target: clonedTargetId });
      setCloneConfirmed(true);

      // If no night action, skip to done
      const role = originalRoles[clonedTargetId]?.roleName;
      if (!ActionComponentMap[role]) {
        onSubmit();
      }
    }
  };

  const handleClonedActionSubmit = (actionData) => {
    submitAction(player, clonedRole, {
      ...actionData,
      cloned: true,
    });
    onSubmit();
  };

  const playerOptions = players
    .filter((p) => p !== player)
    .map((p) => ({ id: p, name: p }));

  return (
    <div className="m-4">
      <AnimatePresence mode="wait">
        {!cloneConfirmed ? (
          <motion.div
            key="choose-target"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TableLayout
              players={playerOptions}
              currentPlayerId={player}
              title="Clone Target"
              description="Select a player to copy their role."
              isModal={true}
              showGroundCards={false}
              showPlayerCards={true}
              allowMultipleSelection={false}
              maxSelections={1}
              randomColor={randomColor}
              onConfirm={handleCloneConfirm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cloned-role"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {ClonedActionComponent ? (
              <>
                {isMysticWolfClone ? (
                  <MysticWolfAction
                    player={player}
                    name={name}
                    isCloned={true}
                    randomColor={randomColor}
                    onSubmit={handleClonedActionSubmit}
                  />
                ) : (
                  <ClonedActionComponent
                    player={player}
                    name={name}
                    randomColor={randomColor}
                    onSubmit={handleClonedActionSubmit}
                  />
                )}
              </>
            ) : (
              <div className="text-yellow-700 mt-4">
                <p>This role has no night action. Tap the card to continue.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CloneAction;
