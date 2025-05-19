import { useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { PHASES, useGame } from "../../context/GameContext";
import { toast } from "react-toastify";
import { UserPlus, Users, Play, Trash2 } from "lucide-react";

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
    setCurrentPhase(PHASES.ROLE_ASSIGNMENT)
  };

  const filledPlayersCount = newPlayers.filter(p => p.trim() !== "").length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Player Setup
            </h1>
            <p className="text-blue-100">
              Add between 6-14 players
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium">
                {filledPlayersCount} player{filledPlayersCount !== 1 ? 's' : ''} added
              </span>
            </div>
            <div className="text-sm text-gray-500">{newPlayers.length}/14 slots</div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {newPlayers.map((name, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <div className="flex-1 min-w-0">
                  <TextInput
                    value={name}
                    label={`Player ${index + 1}`}
                    placeholder="Enter player name"
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                  />
                </div>
                {index >= 6 && (
                  <button
                    onClick={() => deletePlayer(index)}
                    className="mt-6 text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Remove player"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PrimaryButton
              onClick={addPlayer}
              name="Add Player"
              icon={<UserPlus size={18} />}
              color="blue"
              disabled={newPlayers.length >= 14}
            />
            <PrimaryButton
              onClick={startGame}
              name="Start Game"
              icon={<Play size={18} />}
              color="green"
              disabled={filledPlayersCount < 6}
            />
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            {filledPlayersCount < 6 ? (
              <p>Need {6 - filledPlayersCount} more player{6 - filledPlayersCount !== 1 ? 's' : ''} to start</p>
            ) : (
              <p>Ready to start the game!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerRegistration;