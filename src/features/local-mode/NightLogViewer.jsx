import { useGame } from "../../context/GameContext";

function NightLogViewer() {
  const { nightLog } = useGame();

  return (
    <div className="glass-container bg-white/10 backdrop-blur-md p-4 md:p-6 m-10 shadow-lg text-white border-l-4 border-yellow-700 rounded">
      <h3 className="text-lg font-bold text-amber-800 mb-2">Night Log</h3>
      {nightLog.length === 0 ? (
        <p className="italic text-sm text-gray-600">Nothing stirs in the night...</p>
      ) : (
        <ul className="text-sm space-y-1 list-disc pl-4">
          {nightLog.map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NightLogViewer;
