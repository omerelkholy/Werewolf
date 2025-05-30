function calculateWinners(votes, assignedRoles) {
    const voteCount = {};
    votes.forEach(({ to }) => {
        voteCount[to] = (voteCount[to] || 0) + 1;
    });

    const maxVotes = Math.max(...Object.values(voteCount));
    const topVoted = Object.entries(voteCount)
        .filter(([_, count]) => count === maxVotes)
        .map(([player]) => player);

    let eliminated = [];
    let explanation = "";

    // If "no-werewolf" is the only top vote
    const noWerewolfVoted = topVoted.length === 1 && topVoted[0] === "no-werewolf";
    const werewolfExists = Object.values(assignedRoles).some(role =>
        ["Werewolf", "MysticWolf", "DreamWolf"].includes(role.roleName)
    );

    if (noWerewolfVoted) {
        eliminated = [];
        if (werewolfExists) {
            return {
                eliminated,
                winners: getWerewolves(assignedRoles),
                explanation: "Werewolves win: The shadows lied. Wolves dwell among you."
            };
        } else {
            return {
                eliminated,
                winners: getVillagers(assignedRoles),
                explanation: "Villagers win: The village was right. No beasts walked tonight."
            };
        }
    }

    // Tie vote
    if (topVoted.length > 1) {
        eliminated = [];
        return {
            eliminated,
            winners: getWerewolves(assignedRoles),
            explanation: "Werewolves win: Voices clashed. No soul was cast out."
        };
    }

    // Single player eliminated
    eliminated = topVoted;

    const eliminatedRole = assignedRoles[eliminated[0]]?.roleName;

    // Joker wins alone
    if (eliminatedRole === "Joker") {
        return {
            eliminated,
            winners: eliminated,
            explanation: "Joker wins: The jester laughed last. All others fall silent."
        };
    }

    // Werewolf eliminated → Villagers win
    if (["Werewolf", "MysticWolf", "DreamWolf"].includes(eliminatedRole)) {
        return {
            eliminated,
            winners: getVillagers(assignedRoles),
            explanation: "Fangs were found. The village prevails."
        };
    }

    // Any other player eliminated → Werewolves win
    return {
        eliminated,
        winners: getWerewolves(assignedRoles),
        explanation: "Werewolves win: Innocence burnt. The beasts still feast."
    };
}

function getVillagers(assignedRoles) {
    return Object.entries(assignedRoles)
        .filter(([_, role]) =>
            ["Seer", "Robber", "TroubleMaker", "Mason", "Drunk", "Insomniac", "Witch", "Sentinel", "Clone"].includes(role.roleName)
        )
        .map(([player]) => player);
}

function getWerewolves(assignedRoles) {
    return Object.entries(assignedRoles)
        .filter(([_, role]) =>
            ["Werewolf", "MysticWolf", "Minion", "DreamWolf"].includes(role.roleName)
        )
        .map(([player]) => player);
}

export default calculateWinners;
