import { useState } from "react";
import { useGame } from "../context/GameContext";
import PrimaryButton from "../components/PrimaryButton";

// Import action components
import RobberAction from "./RobberAction";
import TroubleMakerAction from "./TroubleMakerAction";
import WitchAction from "./WitchAction";
import SeerAction from "./SeerAction";
import SentinelAction from "./SentinelAction";
import MysticWolfAction from "./MysticWolfAction";
import DrunkAction from "./DrunkAction";
// Add other actions as needed...

function CloneAction({ player, onSubmit, name }) {
    const { players, originalRoles, submitAction } = useGame();
    const [targetedPlayer, setTargetedPlayer] = useState(null);
    const [cloneActionSubmitted, setCloneActionSubmitted] = useState(false);

    const clonedRole = targetedPlayer ? originalRoles[targetedPlayer]?.roleName : null;

    // Map role names to their action components
    const ActionComponentMap = {
        Seer: SeerAction,
        Robber: RobberAction,
        TroubleMaker: TroubleMakerAction,
        Witch: WitchAction,
        Sentinel: SentinelAction,
        Drunk: DrunkAction,
        MysticWolf: MysticWolfAction,
    };

    const ClonedActionComponent = clonedRole && ActionComponentMap[clonedRole];

    const isMysticWolfClone = clonedRole === "MysticWolf";

    const handleCloneAction = () => {
        submitAction(player, "Clone", { target: targetedPlayer });
        setCloneActionSubmitted(true);

        // If no action component, complete immediately
        if (!ClonedActionComponent) {
            onSubmit();
        }
    };

    return (
        <div className="m-4">
            <p><strong>Clone:</strong> Choose a player to copy their role.</p>

            {!cloneActionSubmitted && (
                <>
                    <select
                        value={targetedPlayer || ""}
                        onChange={(e) => setTargetedPlayer(e.target.value)}
                    >
                        <option disabled value="">Pick a player</option>
                        {players.filter((p) => p !== player).map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>

                    {targetedPlayer && (
                        <div className="mt-4">
                            <PrimaryButton
                                onClick={handleCloneAction}
                                name="Confirm Clone Target"
                                color="green"
                            />
                        </div>
                    )}
                </>
            )}

            {cloneActionSubmitted && ClonedActionComponent && (
                <div className="mt-4">
                    <p>You cloned <strong>{targetedPlayer}</strong> who is a <strong>{clonedRole}</strong>.</p>
                    <p>Now perform their role action:</p>

                    {isMysticWolfClone ? (
                        <>
                            <div className="mt-4 text-yellow-700">
                                <p>You cloned <strong>{targetedPlayer}</strong> who is a <strong>{clonedRole}</strong>, but their role has no night action.</p>
                            </div>
                            <MysticWolfAction
                                player={player}
                                name={name}
                                isCloned={true}
                                onSubmit={(data) => {
                                    submitAction(player, clonedRole, { ...data, cloned: true });
                                    onSubmit();
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div className="mt-4 text-yellow-700">
                                <p>You cloned <strong>{targetedPlayer}</strong> who is a <strong>{clonedRole}</strong>, but their role has no night action.</p>
                            </div>

                            <ClonedActionComponent
                                player={player}
                                name={name}
                                onSubmit={(data) => {
                                    submitAction(player, clonedRole, { ...data, cloned: true });
                                    onSubmit();
                                }}
                            />
                        </>
                    )}
                </div>
            )}


        </div>
    );

}

export default CloneAction;
