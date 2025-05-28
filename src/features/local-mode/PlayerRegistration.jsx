import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHASES, useGame } from "../../context/GameContext";
import { toast } from "react-toastify";
import { UserPlus, Users, Play, Trash2, Crown } from "lucide-react";

function PlayerRegistration() {
  const { setPlayers: setGlobalPlayers, setCurrentPhase } = useGame();
  const [newPlayers, setNewPlayers] = useState(["", "", "", "", "", ""]);

  const handlePlayerChange = (index, value) => {
    const updated = [...newPlayers];
    updated[index] = value;
    setNewPlayers(updated);
  };

  const addPlayer = () => {
    if (newPlayers.length >= 14) {
      toast.warning("Maximum 14 players allowed");
      return;
    }
    setNewPlayers([...newPlayers, ""]);
  };

  const deletePlayer = (index) => {
    if (newPlayers.length <= 6) return;
    const filteredPlayers = newPlayers.filter((_, i) => i !== index);
    setNewPlayers(filteredPlayers);
  };

  const startGame = () => {
    const filtered = newPlayers.map((p) => p.trim()).filter((p) => p !== "");

    const uniqueNames = new Set(filtered.map(name => name.toLowerCase()));
    if (uniqueNames.size !== filtered.length) {
      toast.error("Don't enter the same name more than once!");
      return;
    }

    if (filtered.length < 6) {
      toast.error("Minimum 6 players required to start!");
      return;
    }

    setGlobalPlayers(filtered);
    setCurrentPhase(PHASES.ROLE_ASSIGNMENT);
  };

  const filledPlayersCount = newPlayers.filter(p => p.trim() !== "").length;

  // Compact grid layout
  const getGridClass = () => {
    if (newPlayers.length <= 6) return "grid-cols-1 sm:grid-cols-2";
    if (newPlayers.length <= 9) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (newPlayers.length <= 12) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  };

  return (
    <>
      <div className="overlay"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          style={{ maxHeight: '95vh' }}
        >
          {/* Compact Header */}
          <div className="px-4 py-3 sm:px-6 sm:py-4" 
               style={{ background: 'linear-gradient(135deg, #382112 0%, #9b4826 100%)' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Royal Court
                </h1>
                <p className="text-white/80 text-xs sm:text-sm">
                  Assemble 6-14 nobles
                </p>
              </div>
            </motion.div>
          </div>

          <div className="p-3 sm:p-6" style={{ maxHeight: 'calc(95vh - 80px)', overflow: 'hidden' }}>
            {/* Compact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-3 flex items-center justify-between p-2 sm:p-3 rounded-xl text-sm"
              style={{ backgroundColor: '#d4be8c' }}
            >
              <div className="flex items-center gap-2">
                <Users size={16} style={{ color: '#382112' }} />
                <span className="font-semibold" style={{ color: '#382112' }}>
                  {filledPlayersCount} Noble{filledPlayersCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xs font-medium" style={{ color: '#382112' }}>
                {newPlayers.length}/14
              </div>
            </motion.div>

            {/* Compact Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-4 bg-gray-200 rounded-full h-2 overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#9b4826' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max((filledPlayersCount / 6) * 100, 0)}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Compact Player Cards Grid */}
            <div 
              className="mb-4" 
              style={{ 
                maxHeight: 'calc(95vh - 280px)', 
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              css={`
                &::-webkit-scrollbar {
                  display: none;
                }
              `}
            >
              <div className={`grid gap-2 sm:gap-3 ${getGridClass()}`}>
                <AnimatePresence mode="popLayout">
                  {newPlayers.map((name, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, x: -50 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: index * 0.02
                      }}
                      className="relative group"
                    >
                      <div className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 ${
                        name.trim() ? 'border-opacity-50 shadow-md' : 'border-opacity-30'
                      }`}
                      style={{ 
                        borderColor: '#9b4826',
                        backgroundColor: name.trim() ? '#d4be8c' : 'white',
                      }}>
                        
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            name.trim() 
                              ? 'text-white' 
                              : 'text-gray-400'
                          }`}
                          style={{ backgroundColor: name.trim() ? '#382112' : '#e5e7eb' }}>
                            {index + 1}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={name}
                              placeholder={index < 6 ? "Required" : "Optional"}
                              onChange={(e) => handlePlayerChange(index, e.target.value)}
                              className="w-full px-2 py-1 text-xs sm:text-sm border-0 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0"
                              style={{ color: '#382112' }}
                            />
                          </div>
                          
                          {index >= 6 && (
                            <button
                              onClick={() => deletePlayer(index)}
                              className="p-1 rounded-full"
                              style={{ 
                                backgroundColor: '#9b4826',
                                color: 'white'
                              }}
                              aria-label="Remove player"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Compact Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addPlayer}
                disabled={newPlayers.length >= 14}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: newPlayers.length >= 14 ? '#9ca3af' : '#9b4826',
                }}
              >
                <UserPlus size={16} />
                Add Noble
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startGame}
                disabled={filledPlayersCount < 6}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-white text-sm transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: filledPlayersCount < 6 ? '#9ca3af' : '#382112',
                }}
              >
                <Play size={16} />
                Begin Court
              </motion.button>
            </motion.div>

            {/* Compact Status Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-center p-2 rounded-xl"
              style={{ backgroundColor: '#d4be8c' }}
            >
              {filledPlayersCount < 6 ? (
                <p className="text-xs sm:text-sm font-medium" style={{ color: '#382112' }}>
                  Need {6 - filledPlayersCount} more to begin
                </p>
              ) : (
                <motion.p
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: '#382112' }}
                >
                  👑 Ready to convene!
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
    </>
  );
}

export default PlayerRegistration;