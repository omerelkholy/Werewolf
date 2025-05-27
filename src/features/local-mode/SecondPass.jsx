import { useState } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import { WithCardFlip } from "../../components/WithCardFlip";
import RoleCard from "../../components/RoleCard";
import { motion, AnimatePresence } from "framer-motion";
import CardSound from "../../../public/audios/card_flip.mp3";
import ActionModal from "../../components/ActionModal";
import PrimaryButton from "../../components/PrimaryButton";
import Sentinel_Block from "../../assets/images/sentinel_blocked.png"
import villager1 from "../../assets/images/villager1.png"
import villager2 from "../../assets/images/villager2.png";
import villager3 from "../../assets/images/villager3.png";
import villager4 from "../../assets/images/villager4.png";
import evilVillager1 from "../../assets/images/evilvillager1.png";
import evilVillager2 from "../../assets/images/evilvillager2.png";
import evilVillager3 from "../../assets/images/evilvillager3.png";

const FlipCard = WithCardFlip(RoleCard);
const villagers = [villager1, villager2, villager3, villager4];
const evilVillagers = [evilVillager1, evilVillager2, evilVillager3];

// Create a neutral villager role for anonymous player displays
const createAnonymousVillagerCard = (playerName) => ({
  roleName: playerName,
  team: "Villagers",
  effect: {
    effectName: "USELESS",
    action: "Protected by anonymity"
  },
  // Add this new field to override the image only in SecondPass
  _anonymousImage: villagers[Math.floor(Math.random() * villagers.length)]
});

const createAnonymousEvilVillagerCard = (playerName) => ({
  roleName: playerName,
  team: "Werewolves",
  effect: {
    effectName: "DEVIL",
    action: "MasterMind in disguise"
  },
  // Add this new field to override the image only in SecondPass
  _anonymousImage: evilVillagers[Math.floor(Math.random() * evilVillagers.length)]
});

function SecondPass() {
  const {
    players,
    assignedRoles,
    originalRoles,
    originalGroundCards,
    actions,
    blockedActions,
    setCurrentPhase,
  } = useGame();


  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const originalRole = originalRoles[currentPlayer];
  const finalRole = assignedRoles[currentPlayer];
  const action = actions.find((a) => a.player === currentPlayer);
  const blocked = blockedActions?.find((b) => b.player === currentPlayer);
  const minion = players.filter((p) => ["Minion"].includes(originalRoles[p]?.roleName));

  // 🧬 Clone handling
  const cloneInitAction = actions.find(
    (a) => a.player === currentPlayer && a.roleName === "Clone"
  );
  const clonedAction = actions.find(
    (a) => a.player === currentPlayer && a.data?.cloned
  );
  const isClone = originalRole.roleName === "Clone";
  const clonedPlayer = cloneInitAction?.data?.target;
  const clonedRoleName = clonedPlayer ? originalRoles[clonedPlayer]?.roleName : null;
  const clonedFinalRole = clonedPlayer ? assignedRoles[clonedPlayer] : null;

  // 🎭 Decide which card to show
  let displayRole = originalRole;

  // 🧬 CLONE logic — what to display on flip
  if (isClone) {
    displayRole = originalRoles[clonedPlayer];
  } else {
    displayRole = originalRole;
  }

  const describeRoleAction = (roleName, action, blocked, isCloned = false) => {
    const lines = [];

    if (blocked && roleName !== "MysticWolf") {  // Only return early for non-MysticWolf roles
      lines.push({
        type: "title",
        value: "Action Blocked!"
      });
      lines.push({
        type: "text",
        value: `Your ${roleName} action was blocked by the Sentinel. ${blocked.reason}`
      });
      lines.push({
        type: "blocked"
      });
      return lines;
    }

    switch (roleName) {
      case "Robber":
        if (action?.data?.target) {
          const stolenRole = originalRoles[action.data.target];
          lines.push({
            type: "title",
            value: "Ninja Heisted!"
          });
          lines.push({
            type: "text",
            value: `You stole ${action.data.target}'s role and became:`
          });
          lines.push({
            type: "roleCard",
            role: stolenRole
          });
        }
        break;

      case "Seer":
        if (action?.data?.type === "player") {
          const seen = originalRoles[action.data.target];
          lines.push({
            type: "title",
            value: "Vision Revealed"
          });
          lines.push({
            type: "text",
            value: `${action.data.target}'s true role:`
          });
          lines.push({
            type: "roleCard",
            role: seen
          });
        } else if (action?.data?.targets?.length) {
          const g1Index = parseInt(action.data.targets[0]);
          const g2Index = parseInt(action.data.targets[1]);
          const groundCard1 = originalGroundCards[g1Index];
          const groundCard2 = originalGroundCards[g2Index];
          lines.push({
            type: "title",
            value: "Ground Cards Revealed"
          });
          lines.push({
            type: "groundCardPair",
            cards: [
              { label: `Card ${g1Index + 1}`, role: groundCard1 },
              { label: `Card ${g2Index + 1}`, role: groundCard2 }
            ]
          });
        }
        break;

      case "MysticWolf":
        // This part is blockable (peeking at a player's role)
        if (action?.data?.type === "player") {
          if (!blocked) {
            const seen = originalRoles[action.data.target];
            lines.push({
              type: "title",
              value: "Mystic Vision"
            });
            lines.push({
              type: "text",
              value: `${action.data.target}'s true role:`
            });
            lines.push({
              type: "roleCard",
              role: seen
            });
          } else {
            lines.push({
              type: "title",
              value: "Action Blocked!"
            });
            lines.push({
              type: "text",
              value: `Your vision was blocked by the Sentinel. ${blocked.reason}`
            });
            lines.push({
              type: "blocked"
            });
          }
        }

        // This part always happens (seeing fellow werewolves) unless cloned
        if (!isCloned && action?.data?.werewolves?.length) {
          lines.push({
            type: "title",
            value: "Gang Awareness"
          });
          lines.push({
            type: "text",
            value: `You sensed your fellow Werewolves:`
          });
          lines.push({
            type: "evilPlayerList",
            players: action.data.werewolves
          });
        }
        break;

      case "Witch":
        if (action?.data?.player && action?.data?.groundCard !== undefined) {
          const card = originalGroundCards[action.data.groundCard];
          lines.push({
            type: "title",
            value: "Magical Roulette"
          });
          lines.push({
            type: "text",
            value: `You gave ${action.data.player} this role:`
          });
          lines.push({
            type: "roleCard",
            role: card
          });
        }
        break;

      case "TroubleMaker":
        if (action?.data?.targets?.length === 2) {
          lines.push({
            type: "title",
            value: "Chaos Unleashed!"
          });
          lines.push({
            type: "text",
            value: `You swapped the roles of:`
          });
          lines.push({
            type: "playerPair",
            players: action.data.targets
          });
        }
        break;

      case "Sentinel":
        lines.push({
          type: "title",
          value: "Batman's move"
        });
        lines.push({
          type: "text",
          value: `You protected:`
        });
        lines.push({
          type: "anonymousCard",
          playerName: action?.data?.target
        });
        break;

      case "Drunk":
        if (action?.data?.target !== undefined) {
          lines.push({
            type: "title",
            value: "Drunken Stumble"
          });
          lines.push({
            type: "text",
            value: `You drunkenly swapped your card with ground card ${parseInt(action.data.target) + 1}.`
          });
        }
        break;

      case "Insomniac":
        lines.push({
          type: "title",
          value: "Caffeine Effect"
        });
        lines.push({
          type: "text",
          value: `By morning, you ${finalRole?.roleName === "Insomniac" ? "remained" : "became"}:`
        });
        lines.push({
          type: "roleCard",
          role: finalRole
        });
        break;

      case "Minion":
        if (action?.data?.seenWerewolves?.length) {
          lines.push({
            type: "title",
            value: "Fanboy Ability"
          });
          lines.push({
            type: "text",
            value: `You serve these masters:`
          });
          lines.push({
            type: "evilPlayerList",
            players: action.data.seenWerewolves
          });
        } else {
          lines.push({
            type: "title",
            value: "Masterless Servant"
          });
          lines.push({
            type: "text",
            value: `No werewolves to serve this game.`
          });
        }
        break;

      case "Mason":
        if (action?.data?.teammate?.length) {
          lines.push({
            type: "title",
            value: "TruthSeeker Bonds"
          });
          lines.push({
            type: "text",
            value: `Your fellow Masons:`
          });
          lines.push({
            type: "playerList",
            players: action.data.teammate
          });
        } else {
          lines.push({
            type: "title",
            value: "Lone Mason"
          });
          lines.push({
            type: "text",
            value: "You stand alone in your craft."
          });
        }
        break;

      case "Werewolf":
        if (action?.data?.groundcard !== undefined) {
          const card = originalGroundCards[action.data.groundcard];
          lines.push({
            type: "title",
            value: "Lone Wolf's Peek"
          });
          lines.push({
            type: "text",
            value: `Ground card ${parseInt(action.data.groundcard) + 1}:`
          });
          lines.push({
            type: "roleCard",
            role: card
          });
        } else if (action?.data?.teammates?.length) {
          lines.push({
            type: "title",
            value: "Gang Awareness"
          });
          lines.push({
            type: "text",
            value: `Your werewolf members:`
          });
          lines.push({
            type: "evilPlayerList",
            players: action.data.teammates
          });
        }
        break;

      case "DreamWolf":
        lines.push({
          type: "title",
          value: "Dreams of Loyalty"
        });
        lines.push({
          type: "text",
          value: minion.length
            ? `The minion serves you:`
            : "No minion to serve you."
        });
        if (minion.length) {
          lines.push({
            type: "evilPlayerList",
            players: minion
          });
        }
        break;

      case "Joker":
        lines.push({
          type: "title",
          value: "Twisted Destruction"
        });
        lines.push({
          type: "text",
          value: "You win by being voted out!"
        });
        break;

      default:
        break;
    }

    return lines;
  };

  // 📝 Action summary
  const resultInfo = [];
  if (isClone) {
    const copiedRole = clonedRoleName;
    resultInfo.push({
      type: "title",
      value: "Identity Copied"
    });
    resultInfo.push({
      type: "text",
      value: `You copied ${clonedPlayer}, who was a ${copiedRole}.`
    });

    if (clonedRoleName === "Insomniac") {
      resultInfo.push({
        type: "text",
        value: `By morning, you became:`
      });
      resultInfo.push({
        type: "roleCard",
        role: finalRole
      });
    } else if (clonedAction) {
      resultInfo.push({
        type: "text",
        value: `You then performed their action:`
      });
      resultInfo.push(...describeRoleAction(clonedRoleName, clonedAction, blocked, true));
    }
  } else {
    resultInfo.push(...describeRoleAction(originalRole.roleName, action, blocked, false));
  }

  const handleFlipComplete = () => {
    setIsFlipped(true);
    setShowModal(true);
  };

  const handleActionConfirm = () => {
    setShowModal(false);
    setActionConfirmed(true);
  };

  const handleCardClickAfterConfirm = () => {
    if (actionConfirmed && isFlipped) {
      setTimeout(() => {
        const nextIndex = currentPlayerIndex + 1;
        if (nextIndex >= players.length) {
          setCurrentPhase(PHASES.DISCUSSION);
        } else {
          setCurrentPlayerIndex(nextIndex);
          setIsFlipped(false);
          setShowModal(false);
          setActionConfirmed(false);
        }
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <div className="overlay absolute inset-0"></div>

      {/* Player name */}
      <div className="w-full max-w-md mx-auto mb-4 md:mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="glass-container bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 z-10 border border-amber-500/30 shadow-lg"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-amber-300 text-center uppercase">
              Pass the device to{" "}
              <strong className="text-white font-semibold block sm:inline mt-1 sm:mt-0 normal-case">
                {currentPlayer}
              </strong>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card flip */}
      <div className="flex justify-center items-center w-full">
        <div
          className="w-[280px] sm:w-[300px] h-[380px] sm:h-[400px] cursor-pointer flex justify-center items-center"
          onClick={handleCardClickAfterConfirm}
        >
          <FlipCard
            width="90%"
            height="100%"
            role={displayRole}
            color="bg-[#1a1a1a]"
            variant={isFlipped ? "Back" : "Front"}
            flipSoundUrl={CardSound}
            onFlipComplete={handleFlipComplete}
          />
        </div>
      </div>

      {/* Action results in modal */}
      <ActionModal show={isFlipped && showModal} onClose={() => setShowModal(false)}>
        <div className="w-full max-h-[80vh] flex flex-col items-center justify-start space-y-4 p-3 overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="w-full max-w-sm space-y-4">
            {resultInfo.map((entry, idx) => {
              // Title entries
              if (entry.type === "title") {
                return (
                  <div key={idx} className="text-center">
                    <h3
                      className="text-xl font-bold text-amber-300 mb-2"
                      style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                    >
                      {entry.value}
                    </h3>
                    <div className="w-16 h-0.5 bg-amber-400 mx-auto"></div>
                  </div>
                );
              }

              // Regular text entries
              if (entry.type === "text") {
                return (
                  <div key={idx} className="text-center glass-container bg-white/10 backdrop-blur-md rounded-xl z-10 border border-amber-500/30 shadow-lg">
                    <p
                      className="text-xl text-white leading-relaxed"
                      style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {entry.value}
                    </p>
                  </div>
                );
              }

              // Single role card
              if (entry.type === "roleCard") {
                return (
                  <div key={idx} className="flex justify-center py-2">
                    <RoleCard
                      variant="Back"
                      role={entry.role}
                      size="small"
                    />
                  </div>
                );
              }

              // Anonymous player card
              if (entry.type === "anonymousCard") {
                return (
                  <div key={idx} className="flex justify-center py-2">
                    <RoleCard
                      variant="Back"
                      role={createAnonymousVillagerCard(entry.playerName)}
                      size="small"
                    />
                  </div>
                );
              }

              // Ground card pair (for Seer)
              if (entry.type === "groundCardPair") {
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-center space-x-28">
                      {entry.cards.map((cardInfo, cardIdx) => (
                        <div key={cardIdx} className="text-center">
                          <p className="text-sm text-amber-200 mb-1" style={{ fontFamily: 'IM Fell English SC, serif' }}>
                            {cardInfo.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4">
                      {entry.cards.map((cardInfo, cardIdx) => (
                        <RoleCard
                          key={cardIdx}
                          variant="Back"
                          role={cardInfo.role}
                          size="tiny"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              // Player pair (for TroubleMaker)
              if (entry.type === "playerPair") {
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-center gap-4">
                      {entry.players.map((playerName, playerIdx) => (
                        <RoleCard
                          key={playerIdx}
                          variant="Back"
                          role={createAnonymousVillagerCard(playerName)}
                          size="tiny"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              // Player list (for Minion, Mason, etc.)
              if (entry.type === "playerList") {
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-center flex-wrap gap-2">
                      {entry.players.map((playerName, playerIdx) => (
                        <RoleCard
                          key={playerIdx}
                          variant="Back"
                          role={createAnonymousVillagerCard(playerName)}
                          size="tiny"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              if (entry.type === "evilPlayerList") {
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-center flex-wrap gap-2">
                      {entry.players.map((playerName, playerIdx) => (
                        <RoleCard
                          key={playerIdx}
                          variant="Back"
                          role={createAnonymousEvilVillagerCard(playerName)}
                          size="tiny"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              // Blocked action image
              if (entry.type === "blocked") {
                return (
                  <div key={idx} className="flex justify-center py-2">
                    <img
                      src={Sentinel_Block}
                      alt="Action Blocked by Sentinel"
                      className="w-56 h-56 object-contain opacity-90"
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Button */}
          <div className="pt-6 pb-2">
            <PrimaryButton
              onClick={handleActionConfirm}
              name={currentPlayerIndex === players.length - 1 ? "Start Discussion" : "Next Player"}
              color="green"
            />
          </div>
        </div>
      </ActionModal>
    </div>
  );
}

export default SecondPass;