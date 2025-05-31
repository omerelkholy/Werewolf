import { useGame, PHASES } from "../../context/GameContext";
import PrimaryButton from "../../components/MedievalPrimaryButton";
import ActionModal from "../../components/ActionModal";
import NightLogViewer from "./NightLogViewer";
import calculateWinners from "../../utils/calculateWinners";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { Crown } from "lucide-react";


function Results() {
  const {
    players,
    assignedRoles,
    originalRoles,
    votes,
    setCurrentPhase,
    resetGame,
    nightLog,
  } = useGame();

  const [showNightLog, setShowNightLog] = useState(false);
  const { eliminated, winners, explanation } = calculateWinners(votes, assignedRoles);

  const isWinner = (player) => winners.includes(player);

  // Hide webkit scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollable-container::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Calculate most impactful player based on night log
  const mostImpactfulPlayer = useMemo(() => {
    const playerMentions = {};

    nightLog.forEach(entry => {
      players.forEach(player => {
        if (entry.includes(player)) {
          playerMentions[player] = (playerMentions[player] || 0) + 1;
        }
      });
    });

    const sortedPlayers = Object.entries(playerMentions)
      .sort(([, a], [, b]) => b - a);

    return sortedPlayers.length > 0 ? sortedPlayers[0] : null;
  }, [nightLog, players]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <motion.div
        className="relative z-20 h-screen p-4 sm:p-6 text-white overflow-y-auto overflow-x-hidden scrollable-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Header with Info Button */}
        <motion.div
          className="flex justify-between items-center mb-6"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#d4be8c] font-serif">
            Game Results
          </h2>
          <motion.button
            onClick={() => setShowNightLog(true)}
            className="text-[#d4be8c] hover:text-white transition-colors p-2"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoInformationCircle size={28} />
          </motion.button>
        </motion.div>

        {/* Game Outcome */}
        <motion.div
          className="bg-[#382112] border border-[#d4be8c]/30 rounded-lg p-4 sm:p-6 mb-6 text-center shadow-2xl"
          variants={cardVariants}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-[#d4be8c] mb-3 font-serif">
            The Tale Concludes
          </h3>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
            {explanation}
          </p>
        </motion.div>

        {/* Player Results Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          variants={itemVariants}
        >
          <motion.div
            className="bg-[#382112] border border-[#d4be8c]/30 rounded-lg p-4 sm:p-5 shadow-xl"
            variants={cardVariants}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#d4be8c] mb-4 font-serif border-b border-[#d4be8c]/30 pb-2 text-center">
              Final Roles
            </h3>
            <div
              className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollable-container"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <AnimatePresence>
                {players.map((player, index) => (
                  <motion.div
                    key={player}
                    className={`p-3 rounded border-l-4 ${isWinner(player)
                      ? 'bg-[#d4be8c]/20 border-[#d4be8c] text-[#d4be8c]'
                      : 'bg-[#9b4826]/20 border-[#9b4826] text-[#9b4826]'
                      } ${eliminated.includes(player) ? 'opacity-75' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      {isWinner(player) ? <Crown size={20} className="text-yellow-500" /> : ""}
                      <span className="font-bold text-white">{player}</span>
                      <div className="text-xs sm:text-sm text-gray-300">
                        <span className="block sm:inline">
                          Originally: <em className="text-[#d4be8c]">{originalRoles[player]?.roleName}</em>
                        </span>
                        <span className="block sm:inline sm:ml-2">
                          Final: <em className="text-[#d4be8c]">{assignedRoles[player]?.roleName}</em>
                        </span>
                      </div>
                    </div>
                    {eliminated.includes(player) && (
                      <span className="text-xs text-red-400 font-medium">Eliminated</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Vote History */}
          <motion.div
            className="bg-[#382112] border border-[#d4be8c]/30 rounded-lg p-4 sm:p-5 shadow-xl"
            variants={cardVariants}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#d4be8c] mb-4 font-serif border-b border-[#d4be8c]/30 pb-2 text-center">
              Vote History
            </h3>
            <div
              className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollable-container"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {votes.length === 0 ? (
                <p className="text-gray-400 italic text-sm">No votes were cast...</p>
              ) : (
                <AnimatePresence>
                  {votes.map((vote, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="text-white font-medium text-lg">
                        {vote.from}
                      </span>
                      <span className="text-[#d4be8c] text-base mx-2">voted for</span>
                      <span className="text-white font-medium text-lg">
                        {vote.to}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        {mostImpactfulPlayer && (
          <motion.div
            className="bg-gradient-to-r from-[#9b4826]/60 to-[#382112]/80 backdrop-blur-sm border border-[#d4be8c]/30 rounded-lg p-4 sm:p-5 mb-6 shadow-xl"
            variants={cardVariants}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#d4be8c] mb-3 font-serif">
              Game Statistics
            </h3>
            <div className="bg-black/20 rounded p-3 border border-[#d4be8c]/20">
              <p className="text-white/90">
                <span className="text-[#d4be8c] font-semibold">Most Active Player:</span>{' '}
                <span className="font-bold">{mostImpactfulPlayer[0]}</span>
                <span className="text-sm text-gray-300 ml-2">
                  (Involved in {mostImpactfulPlayer[1]} night action{mostImpactfulPlayer[1] !== 1 ? 's' : ''})
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Play Again Button */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="flex justify-center my-8 mb-12">
            <PrimaryButton
              name="Play Again"
              onClick={() => {
                resetGame();
              }}
              width="auto"
              height="64px"
            />
          </div>
        </motion.div>

        {/* Night Log Modal */}
        <ActionModal show={showNightLog} onClose={() => setShowNightLog(false)}>
          <NightLogViewer />
        </ActionModal>
      </motion.div>
    </>
  );
}

export default Results;