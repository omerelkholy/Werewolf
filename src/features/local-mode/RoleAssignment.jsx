import { useEffect } from "react";
import { PHASES, useGame } from "../../context/GameContext";
import { roles, teams } from "../../data/consts";
import { coreRoles, expansionRoles, createActionQueue } from "../../data/roleOrder";


export function shuffle(array) {
    return array
        .map((v) => ({ v, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ v }) => v)
}



export function getRolesForPlayers(numOfPlayers) {
    const rolesNeeded = numOfPlayers + 3;
    let selectedNames = [...coreRoles];
    let i = 0


    while (selectedNames.length < rolesNeeded && i < expansionRoles.length) {
        selectedNames.push(expansionRoles[i]);
        i++;
    }

    if (selectedNames.length !== rolesNeeded) {
        throw new Error("Not enough Roles, fix your code")
    }

    const selectedRoles = selectedNames.map(name => {
        const role = roles.find((r) => r.roleName === name);

        return {
            ...role,
            team: teams[role.team] || role.team
        }
    });

    return selectedRoles;
}

export function assigningRoles(numOfPlayers) {
    const extractedRoles = getRolesForPlayers(numOfPlayers);
    const shuffledRoles = shuffle(extractedRoles);

    const playerRoles = shuffledRoles.slice(0, numOfPlayers);
    const groundCards = shuffledRoles.slice(numOfPlayers);

    return { playerRoles, groundCards }
}

export const RoleAssignment = () => {

    const { players,
        assignedRoles,
        setAssignedRoles,
        setActionQueue,
        setOriginalRoles,
        currentPhase,
        setCurrentPhase,
        groundCards,
        setGroundCards,
        setOriginalGroundCards
    }
        = useGame();

    useEffect(() => {
        if (currentPhase === PHASES.ROLE_ASSIGNMENT) {

            let numOfPlayers = players.length;
            const { playerRoles, groundCards } = assigningRoles(numOfPlayers);
            const newAssignedRoles = {};
            const newOriginalRoles = {};

            playerRoles.forEach((role, index) => {
                newAssignedRoles[players[index]] = role
                newOriginalRoles[players[index]] = { ...role }
            });

            const actionQueue = createActionQueue(players, newAssignedRoles);

            setActionQueue(actionQueue);
            setAssignedRoles(newAssignedRoles);
            setOriginalRoles(newOriginalRoles);
            setGroundCards(groundCards);
            setOriginalGroundCards(groundCards);
            setCurrentPhase(PHASES.FIRST_PASS);
        }
    }, [currentPhase, players, setAssignedRoles, setGroundCards, setCurrentPhase])


    return (
        <>
        </>
    );
}