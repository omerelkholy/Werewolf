import CloneAction from "../roles/CloneAction";
import DreamWolfAction from "../roles/DreamWolfAction";
import DrunkAction from "../roles/DrunkAction";
import InsomniacAction from "../roles/InsomniacAction";
import JokerAction from "../roles/JokerAction";
import MasonAction from "../roles/MasonAction";
import MinionAction from "../roles/MinionAction";
import MysticWolfAction from "../roles/MysticWolfAction";
import RobberAction from "../roles/RobberAction";
import SeerAction from "../roles/SeerAction";
import SentinelAction from "../roles/SentinelAction";
import TroubleMakerAction from "../roles/TroubleMakerAction";
import WerewolfAction from "../roles/WerewolfAction";
import WitchAction from "../roles/WitchAction";
import PrimaryButton from "./PrimaryButton";

function RoleActionWrapper({ player, role, onComplete, name, randomColor }) {
    if (!role.effect.effectName) {
        return null;
    }

    const effect = role.effect.effectName;

    // Helper function to handle action completion
    const handleActionSubmit = (data) => {
        setTimeout(() => {
            onComplete(data);
        }, 50);
    };

    switch (effect) {
        case "silentHowl":
            //* Werewolf component
            return (
                <WerewolfAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}
                />
            )
        case "wolfFanboy":
            //* Minion component
            return (
                <MinionAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "truthSeeker.exe":
            //* Mason component
            return (
                <MasonAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "doublePeek":
            //* Seer component
            return (
                <SeerAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "ninjaHeist":
            //* Robber component - This one needs TableLayout
            return (
                <RobberAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "switcharoo":
            //* TroubleMaker component - This one might also need TableLayout
            return (
                <TroubleMakerAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "oopsIClickedIt":
            //* Drunk component
            return (
                <DrunkAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "MirrorImage":
            //* Clone component
            return (
                <CloneAction
                    player={player}
                    name={name}
                    randomColor={randomColor}
                    onSubmit={() => {
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}

                />
            );
        case "SelfDestruct":
            //* Joker component
            return (
                <JokerAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "CaffeinePoweredSpy":
            //* Insomniac component
            return (
                <InsomniacAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "SniffingSecrets":
            //* MysticWolf component
            return (
                <MysticWolfAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "PotionRoulette":
            //* Witch component
            return (
                <WitchAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "LucidLiar":
            //* DreamWolf component
            return (
                <DreamWolfAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        case "CapedGuard":
            //* Sentinel component
            return (
                <SentinelAction
                    player={player}
                    name={name}
                    onSubmit={handleActionSubmit}
                    randomColor={randomColor}

                />
            )
        default:
            //? default condition
            return (
                <>
                    <p className="mb-4">{player} has no custom action</p>
                    <PrimaryButton
                        onClick={() => handleActionSubmit(null)}
                        name={name}
                    />
                </>
            );
    }
}

export default RoleActionWrapper;


