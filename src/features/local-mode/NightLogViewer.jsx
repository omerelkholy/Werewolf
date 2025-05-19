import { useGame } from "../../context/GameContext";

function NightLogViewer() {
  const { nightLog } = useGame();

  return (
    <div className="p-4 bg-gray-900 text-green-300 rounded-md">
      <h3 className="text-lg font-bold mb-2">🌙 Night Log</h3>
      <ul className="text-sm space-y-1">
        {nightLog.map((entry, idx) => (
          <li key={idx}>• {entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default NightLogViewer;
