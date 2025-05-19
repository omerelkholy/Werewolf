import { createContext, useContext, useEffect, useState } from "react";

export const PHASES = {
    PLAYER_REGISTRATION: "player_registration",
    ROLE_ASSIGNMENT: "role_assignment",
    FIRST_PASS: "first_pass",
    SECOND_PASS: "second_pass",
    DISCUSSION: "discussion",
    VOTING: "voting",
    RESULTS: "results",
}

const GameContext = createContext();


export const GameProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [currentPhase, setCurrentPhase] = useState(PHASES.PLAYER_REGISTRATION);
    const [assignedRoles, setAssignedRoles] = useState({});
    const [originalRoles, setOriginalRoles] = useState({});
    const [actionQueue, setActionQueue] = useState([]);
    const [groundCards, setGroundCards] = useState([]);
    const [originalGroundCards, setOriginalGroundCards] = useState([]);
    const [actions, setActions] = useState([]);
    const [nightLog, setNightLog] = useState([]);
    const [blockedActions, setBlockedActions] = useState([]);
    const [votes, setVotes] = useState([]);


    const resetGame = () => {
        setCurrentPhase(PHASES.ROLE_ASSIGNMENT);
        setAssignedRoles({});
        setOriginalRoles({});
        setActionQueue([]);
        setGroundCards([]);
        setOriginalGroundCards([]);
        setActions([]);
        setNightLog([]);
        setBlockedActions([]);
        setVotes([]);
    }

    const submitAction = (player, roleName, data) => {
        setActions(prev => [...prev, { player, roleName, data }]);
    }

    function transformClonePlayer(clonePlayer, clonedPlayer, assignedRoles) {
        const updated = { ...assignedRoles };
        const clonedRole = originalRoles[clonedPlayer];

        if (clonedRole) {
            updated[clonePlayer] = {
                ...clonedRole,
                isClone: true,
                originalPlayer: clonedPlayer
            };
        }

        return updated;
    }


    const applyNightActions = () => {
        let updatedRoles = { ...assignedRoles };
        const ground = [...groundCards];
        const protectedPlayers = new Set();
        const blocked = [];
        const log = [];

        const swapPlayers = (a, b) => {
            log.push(`🔁 TroubleMaker swapped ${a} ⇄ ${b}`);
            const temp = updatedRoles[a];
            updatedRoles[a] = updatedRoles[b];
            updatedRoles[b] = temp;
        };

        const swapWithGround = (player, groundIndex) => {
            log.push(`🎲 ${player} swapped with Ground Card ${Number(groundIndex) + 1}`);
            const temp = updatedRoles[player];
            updatedRoles[player] = ground[groundIndex];
            ground[groundIndex] = temp;
        };

        const cloneActions = actions.filter(a =>
            a.roleName === "Clone" && a.data?.target
        );

        for (const { player, data } of cloneActions) {
            const clonedPlayer = data.target;
            if (clonedPlayer) {
                const clonedRole = originalRoles[clonedPlayer];

                if (clonedRole) {
                    log.push(`🪞 Clone: ${player} became ${clonedRole.roleName} by cloning ${clonedPlayer}`);
                    updatedRoles = transformClonePlayer(player, clonedPlayer, updatedRoles);
                }
            }
        }

        const clonedActions = actions.filter(a => a.data?.cloned && a.roleName !== "Insomniac");
        const normalActions = actionQueue.map(({ player, roleName }) =>
            actions.find(a => a.player === player && a.roleName === roleName)
        ).filter(Boolean);

        const executionQueue = [...clonedActions, ...normalActions];

        for (const { player, roleName, data } of executionQueue) {
            if (roleName === "Clone") continue;

            switch (roleName) {
                case "Sentinel":
                    if (data?.target) {
                        protectedPlayers.add(data.target);
                        log.push(`🛡 Sentinel protected ${data.target}`);
                    }
                    break;

                case "MysticWolf":
                case "Seer":
                    if (data?.type === "player" && protectedPlayers.has(data.target)) {
                        blocked.push({ player, roleName, reason: `Target ${data.target} was protected` });
                        log.push(`🚫 ${player}'s ${roleName} was blocked (target: ${data.target})`);
                    } else {
                        log.push(`👁 ${player} used ${roleName} to peek ${data?.target || "2 ground cards"}`);
                    }
                    break;

                case "Robber":
                    if (data?.target) {
                        if (protectedPlayers.has(data.target)) {
                            blocked.push({ player, roleName, reason: `Target ${data.target} was protected` });
                            log.push(`🚫 ${player}'s Robber action was blocked (target: ${data.target})`);
                            break;
                        }
                        swapPlayers(player, data.target);
                        log.push(`🎩 Robber: ${player} stole ${data.target}'s role`);
                    }
                    break;

                case "TroubleMaker":
                    if (data?.targets?.length === 2) {
                        const [a, b] = data.targets;
                        if (protectedPlayers.has(a) || protectedPlayers.has(b)) {
                            blocked.push({ player, roleName, reason: `One of the targets was protected` });
                            log.push(`🚫 ${player}'s TroubleMaker action was blocked (protected target)`);
                            break;
                        }
                        swapPlayers(a, b);
                    }
                    break;

                case "Witch":
                    if (data?.player !== undefined && data?.groundCard !== undefined) {
                        if (protectedPlayers.has(data.player)) {
                            blocked.push({ player, roleName, reason: `Target ${data.player} was protected` });
                            log.push(`🚫 ${player}'s Witch action blocked (target: ${data.player})`);
                            break;
                        }
                        swapWithGround(data.player, data.groundCard);
                        log.push(`🧙‍♀️ Witch: ${player} swapped ground card ${Number(data.groundCard) + 1} with ${data.player}`);
                    }
                    break;

                case "Drunk":
                    if (data?.target !== undefined) {
                        swapWithGround(player, data.target);
                        log.push(`🍻 Drunk: ${player} swapped with ground card ${Number(data.target) + 1}`);
                    }
                    break;

                default:
                    break;
            }
        }

        setAssignedRoles(updatedRoles);
        setGroundCards(ground);
        setBlockedActions(blocked);
        setNightLog(log);
    };

    useEffect(() => {
        if (currentPhase === PHASES.SECOND_PASS) {
            applyNightActions();
        }
    }, [currentPhase]);

    return (
        <GameContext.Provider
            value={{
                players,
                setPlayers,
                currentPhase,
                setCurrentPhase,
                assignedRoles,
                setAssignedRoles,
                originalRoles,
                setOriginalRoles,
                actionQueue,
                setActionQueue,
                groundCards,
                setGroundCards,
                originalGroundCards,
                setOriginalGroundCards,
                actions,
                setActions,
                nightLog,
                setNightLog,
                blockedActions,
                setBlockedActions,
                votes,
                setVotes,
                resetGame,
                applyNightActions,
                submitAction,
            }}
        >
            {children}
        </GameContext.Provider>
    );


}

export const useGame = () => useContext(GameContext);