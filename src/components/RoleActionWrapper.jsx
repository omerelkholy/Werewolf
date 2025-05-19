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

function RoleActionWrapper({ player, role, submitAction, onComplete, onSubmit, name }) {

    if (!role.effect.effectName) {
        return null;
    }

    const effect = role.effect.effectName

    switch (effect) {
        case "silentHowl":
            //* Werewolf component
            return (
                <WerewolfAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "wolfFanboy":
            //* Minion component
            return (
                <MinionAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "truthSeeker.exe":
            //* Mason component
            return (
                <MasonAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "doublePeek":
            //* Seer component
            return (
                <SeerAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "ninjaHeist":
            //* Robber component
            return (
                <RobberAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "switcharoo":
            //* TroubleMaker component
            return (
                <TroubleMakerAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "oopsIClickedIt":
            //* Drunk component
            return (
                <DrunkAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "MirrorImage":
            //* Clone component
            return (
                <CloneAction
                    player={player}
                    name={name}
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
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "CaffeinePoweredSpy":
            //* Insomniac component
            return (
                <InsomniacAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "SniffingSecrets":
            //* MysticWolf component
            return (
                <MysticWolfAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "PotionRoulette":
            //* Witch component
            return (
                <WitchAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "LucidLiar":
            //* DreamWolf component
            return (
                <DreamWolfAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        case "CapedGuard":
            //* Sentinel component
            return (
                <SentinelAction
                    player={player}
                    name={name}
                    onSubmit={(data) => {
                        submitAction(player, role.roleName, data);
                        setTimeout(() => {
                            onComplete();
                        }, 50);
                    }}
                />
            )
        default:
            //? default condition
            return (
                <>
                    <p>{player} has no custom action</p>
                    <PrimaryButton
                        onClick={() => {
                            submitAction(player, role.roleName, null);
                            setTimeout(() => {
                                onSubmit();
                            }, 50);
                        }}
                        name={name}
                        color="green"
                    />
                </>
            );
    }


}

export default RoleActionWrapper;