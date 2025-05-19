import { useState } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import PrimaryButton from "../../components/PrimaryButton";

function SecondPass() {
  const {
    players,
    assignedRoles,
    originalRoles,
    originalGroundCards,
    actions,
    blockedActions,
    setCurrentPhase,
    nightLog,
  } = useGame();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const originalRole = originalRoles[currentPlayer];
  const finalRole = assignedRoles[currentPlayer];
  const action = actions.find((a) => a.player === currentPlayer);
  const blocked = blockedActions?.find((b) => b.player === currentPlayer);
  const clonedAction = actions.find((a) => a.player === currentPlayer && a.data.cloned);


  console.log(useGame())

  let displayRole = originalRole;
  let resultInfo = [];

  const isClone = originalRole.roleName === "Clone";
  let clonedRoleName = null;


const describeRoleAction = (roleName, action, blocked) => {
  const lines = [];

    if(blocked){
        lines.push(`⚠️ Your ${roleName} action was blocked: ${blocked.reason}`);
        return lines
    }

  switch (roleName) {
    case "Robber":
      if (action?.data?.target && !blocked) {
        const stolenRole = originalRoles[action.data.target]?.roleName;
        lines.push(`🕵️ You stole ${action.data.target}'s card and became ${stolenRole}.`);
      }
      break;
    case "Seer":
    case "MysticWolf":
      if (!blocked) {
        if (action?.data?.type === "player") {
          const seen = originalRoles[action.data.target]?.roleName;
          lines.push(`👁️ You saw ${action.data.target}'s role: ${seen}.`);
        } else if (action?.data?.targets?.length) {
          const cards = action.data.targets.map((i) =>
            originalGroundCards?.[i]?.roleName || "Unknown"
          );
          lines.push(`🔮 You peeked ground cards: ${cards.join(", ")}`);
        }
      }
      break;
    case "Witch":
      if (action?.data?.player && action?.data?.groundCard !== undefined && !blocked) {
        const card = originalGroundCards?.[action.data.groundCard]?.roleName || "Unknown";
        lines.push(`🧪 You gave ${action.data.player} a ground card (${card}).`);
      }
      break;
    case "TroubleMaker":
      if (action?.data?.targets?.length === 2 && !blocked) {
        lines.push(
          `🌀 You swapped ${action.data.targets[0]} and ${action.data.targets[1]}.`
        );
      }
      break;
    case "Sentinel":
      lines.push(`🛡️ You protected: ${action?.data?.target}`);
      break;
    case "Drunk":
      lines.push(`🍺 You drunkenly swapped your card with a ground card ${parseInt(action?.data?.target) + 1}`);
      break;
    case "Insomniac":
      lines.push(`😵 You became ${finalRole?.roleName} by the end of the night.`);
      break;
    default:
      break;
  }

  return lines;
};




  if (isClone) {
    const cloneAction = actions.find(
      (a) => a.player === currentPlayer && a.roleName === "Clone"
    );
    const clonedPlayer = cloneAction?.data?.target;
    clonedRoleName = originalRoles[clonedPlayer]?.roleName;
    resultInfo.push(` You were a Clone. You copied ${clonedPlayer} who was a ${clonedRoleName}.`);

    if (clonedRoleName === "Insomniac") {
      displayRole = finalRole;
      resultInfo.push(`😵 You became Insomniac. Final role: ${finalRole.roleName}`);
    } else if (clonedAction) {
        resultInfo.push(`🎭 You also performed ${clonedRoleName}'s action.`);
        resultInfo.push(...describeRoleAction(clonedRoleName, clonedAction, blocked));
    }
  } else if (originalRole.roleName === "Insomniac") {
    displayRole = finalRole;
  }

  if (!isClone) {
    switch (originalRole.roleName) {
      case "Robber":
        if (action?.data?.target && !blocked) {
          const stolenRole = originalRoles[action.data.target]?.roleName;
          resultInfo.push(`🕵️ You stole ${action.data.target}'s card and became ${stolenRole}.`);
        }
        break;
      case "Seer":
      case "MysticWolf":
        if (!blocked) {
          if (action?.data?.type === "player") {
            const seen = originalRoles[action.data.target]?.roleName;
            resultInfo.push(`👁️ You saw ${action.data.target}'s role: ${seen}.`);
          } else if (action?.data?.targets?.length) {
            const cards = action.data.targets.map((i) =>
              originalGroundCards?.[i]?.roleName || "Unknown"
            );
            resultInfo.push(`🔮 You peeked ground cards: ${cards.join(", ")}`);
          }
        }
        break;
      case "Werewolf":
        if (action?.data?.groundcard !== undefined) {
          const card = originalGroundCards?.[action.data.groundcard]?.roleName || "Unknown";
          resultInfo.push(`🐺 You were alone. You peeked ground card ${parseInt(action.data.groundcard) + 1}: ${card}`);
        } else if (action?.data?.teammates?.length) {
          resultInfo.push(`🐺 Your fellow Werewolves: ${action.data.teammates.join(", ")}`);
        }
        break;
      case "Minion":
        if (action?.data?.seenWerewolves?.length) {
          resultInfo.push(`😈 You served: ${action.data.seenWerewolves.join(", ")}`);
        }
        break;
      case "Witch":
        if (action?.data?.player && action?.data?.groundCard !== undefined && !blocked) {
          const card = originalGroundCards?.[action.data.groundCard]?.roleName || "Unknown";
          resultInfo.push(
            `🧪 You gave ${action.data.player} a ground card (${card}).`
          );
        }
        break;
      case "Drunk":
        resultInfo.push(`🍺 You drunkenly swapped your card with a ground card ${parseInt(action?.data?.target) + 1}`);
        break;
      case "TroubleMaker":
        if (action?.data?.targets?.length === 2 && !blocked) {
          resultInfo.push(
            `🌀 You swapped ${action.data.targets[0]} and ${action.data.targets[1]}.`
          );
        }
        break;
      case "Sentinel":
        resultInfo.push(`🛡️ You protected: ${action?.data?.target}`);
        break;
      case "Mason":
        if (action?.data?.teammate?.length) {
          resultInfo.push(`👥 Other Masons: ${action.data.teammate.join(", ")}`);
        }
        else{
          resultInfo.push(`You're are alone`);
        }
        break;
      case "DreamWolf":
        resultInfo.push("😴 You slept through the night.");
        break;
      case "Joker":
        resultInfo.push("🤡 You want to be voted out to win.");
        break;
    case "Insomniac":
        resultInfo.push(`You were Insomniac and you became ${displayRole.roleName}`);
        break;
      default:
        break;
    }
  }

  const revealRole = () => {
    setIsRevealed(true);
  };

  const nextPlayer = () => {
    const nextIndex = currentPlayerIndex + 1;
    if (nextIndex >= players.length) {
      setCurrentPhase(PHASES.DISCUSSION);
    } else {
      setCurrentPlayerIndex(nextIndex);
      setIsRevealed(false);
    }
  };

  return (
    <div className="p-6 space-y-4 text-white">
      <h2 className="text-2xl font-bold text-green-400">Second Pass</h2>
      <p className="text-lg text-black">Player: <strong>{currentPlayer}</strong></p>

      {!isRevealed && (
        <PrimaryButton onClick={revealRole} name="Reveal Your Role" color="green" />
      )}

      {isRevealed && (
        <>
          <div className="bg-gray-800 p-4 rounded-md text-green-200">
            <p><strong>Role:</strong> {displayRole?.roleName}</p>
            <p><strong>Team:</strong> {displayRole?.team}</p>
            <p><strong>Description:</strong> {displayRole?.description}</p>
            <p><strong>Effect:</strong> {displayRole?.effect?.action}</p>
            {blocked && (
              <p className="text-red-400 mt-2">⚠️ Your action was blocked: {blocked.reason}</p>
            )}
          </div>

          <div className="bg-gray-900 p-4 rounded-md text-yellow-200">
            <h3 className="font-bold text-lg mb-2">What You Did</h3>
            <ul className="space-y-1">
              {resultInfo.map((line, idx) => (
                <li key={idx}>• {line}</li>
              ))}
            </ul>
          </div>

          <PrimaryButton
            onClick={nextPlayer}
            name={currentPlayerIndex === players.length - 1 ? "Start Discussion" : "Next Player"}
            color="green"
          />
        </>
      )}

      <div className="p-4 bg-gray-900 text-green-300 rounded-md mt-8">
        <h3 className="text-lg font-bold mb-2">🌙 Night Log</h3>
        <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
          {nightLog.map((entry, idx) => (
            <li key={idx}>• {entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SecondPass;
