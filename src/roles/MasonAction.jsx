import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

function MasonAction({ player, onSubmit, name }) {
    const { players, originalRoles } = useGame();

    const masons = players.filter((p) => ["Mason"].includes(originalRoles[p].roleName));


    return (
        <>
            <p><strong>Mason:</strong>Know the other Mason if existed.</p>
            {masons.length > 1 ?
                <p>The other mason is: {masons.filter(p => p !== player)}</p>
                :
                <p>but You're the only Mason!</p>
            }

            <div className="mt-4">
                <PrimaryButton
                    onClick={() => onSubmit({ teammate: masons.filter(p => p !== player) })}
                    name={name}
                    color="green"
                />
            </div>
        </>
    )

}

export default MasonAction;