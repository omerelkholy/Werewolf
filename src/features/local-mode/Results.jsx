import { useGame, PHASES } from "../../context/GameContext";
import PrimaryButton from "../../components/PrimaryButton";
import calculateWinners from "../../utils/calculateWinners";

function Results() {
  const {
    players,
    assignedRoles,
    originalRoles,
    votes,
    setCurrentPhase,
    resetGame,
  } = useGame();

  const { eliminated, winners, explanation } = calculateWinners(votes, assignedRoles);

  const isWinner = (player) => winners.includes(player);

  return (
    <>
      <div className="overlay"></div>
      <div className="p-6 z-20 text-white space-y-6">
        <h2 className="text-2xl font-bold text-green-400">🏁 Game Results</h2>

        <p className="text-yellow-300 text-lg">{explanation}</p>

        <div className="bg-gray-800 p-4 rounded-lg space-y-4 mt-4">
          <h3 className="text-xl font-semibold text-green-300">Final Roles:</h3>
          <ul className="space-y-2">
            {players.map((player) => (
              <li key={player} className={isWinner(player) ? "text-green-400" : "text-red-400"}>
                <strong>{player}</strong> was originally <em>{originalRoles[player]?.roleName}</em>, now <em>{assignedRoles[player]?.roleName}</em>
                {eliminated.includes(player) && " (💀 Eliminated)"}
                {isWinner(player) && " 🎉"}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-bold text-blue-300 mb-2">🗳️ Vote History</h3>
          <ul className="space-y-1 text-sm">
            {votes.map((vote, idx) => (
              <li key={idx}>
                <span className="text-white">{vote.from}</span> voted for <span className="text-white">{vote.to}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-6">
          <PrimaryButton
            name="🔄 Play Again"
            color="green"
            onClick={() => {
              resetGame();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Results;
