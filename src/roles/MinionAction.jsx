import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

function MinionAction({onSubmit, name}) {
    const { players, originalRoles } = useGame();

    const werewolves = players.filter((p) => ["Werewolf", "MysticWolf"].includes(originalRoles[p].roleName));

    return (
        <div>
            <p><strong>Minion:</strong>Know your werewolf allies including MysticWolf but they won't know you.</p>
            {werewolves.length > 0 ? 
                <p>The Werewolves are: {werewolves.join(", ")}</p>
                : 
                <p>There are no Werewolves in the game.</p>
            }

            <PrimaryButton
                onClick={() => onSubmit({ seenWerewolves: werewolves })}
                name={name}
                color="green"
            />
        </div>
    )
}

export default MinionAction;