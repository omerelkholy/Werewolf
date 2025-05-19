import { useState } from "react";
import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

function MysticWolfAction({ player, onSubmit, name, isCloned = false }) {
  const { players, originalRoles } = useGame();
  const [targetedPlayer, setTargetedPlayer] = useState();

  const werewolves = players.filter(
    (p) => originalRoles[p].roleName === "Werewolf"
  );

  return (
    <div>
      <p><strong>Mystic Wolf:</strong> You may view one player's role.</p>

      {!isCloned && werewolves.length > 0 && (
        <>
          <p>You are not alone. Other Werewolves:</p>
          <p>{werewolves.filter(p => p !== player).join(", ")}</p>
        </>
      )}

      {isCloned && (
        <p className="text-yellow-700">
          You copied the Mystic Wolf, but you are hidden. You don't know who the Werewolves are.
        </p>
      )}

      <select
        value={targetedPlayer || ""}
        onChange={(e) => setTargetedPlayer(e.target.value)}
      >
        <option disabled value="">Pick a player to peek at</option>
        {players
          .filter((p) => p !== player)
          .map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
      </select>

      <div className="mt-4">
        <PrimaryButton
          onClick={() => {
            const data = { type: "player", target: targetedPlayer };
            if (!isCloned && werewolves.length > 0) {
              data.werewolves = werewolves;
            }
            onSubmit(data);
          }}
          name={name}
          color="green"
          disabled={!targetedPlayer}
        />
      </div>
    </div>
  );
}

export default MysticWolfAction;
