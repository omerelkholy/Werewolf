function calculateWinners(votes,assignedRoles){
    const voteCount = {};

    votes.forEach(({to}) => {
        voteCount[to] = (voteCount[to] || 0) + 1;
    });

    const maxVotes = Math.max(...Object.values(voteCount));
    const topVoted = Object.entries(voteCount)
    .filter(([_,count]) => count === maxVotes)
    .map(([player])=> player);


    let eliminated = [];
    let explanation = "";

    if(topVoted.length === 1){
        eliminated = topVoted
    }
    else{
        eliminated = [];
        explanation = "⚖️ It's a tie! No one was eliminated.";
    }

    const jokerEliminated = eliminated.some(p => assignedRoles[p]?.roleName === "Joker");
    
    if(jokerEliminated){
        return{
            eliminated,
            winners: eliminated,
            explanation: "🤡 Joker was voted out and wins alone!"
        };
    }

    const werewolfEliminated = eliminated.some(p =>
        ["Werewolf", "MysticWolf", "DreamWolf"].includes(assignedRoles[p]?.roleName));


    if(werewolfEliminated){
        const winners = Object.entries(assignedRoles)
        .filter(([_,role]) => 
        ["Seer", "Robber", "TroubleMaker", "Mason", "Drunk", "Insomniac", "Witch", "Sentinel", "Clone"].includes(role.roleName)
        )
        .map(([player]) => player);

        return {
            eliminated,
            winners,
            explanation: "🧑‍🌾 A Werewolf was eliminated. Villagers win!"
        }
    }

    if(eliminated.length === 0){
        const winners = Object.entries(assignedRoles)
        .filter(([_,role]) =>
        ["Werewolf", "MysticWolf", "Minion", "DreamWolf"].includes(role.roleName)
        )
        .map(([player]) => player);

        return{
            eliminated,
            winners,
            explanation: explanation || "🐺 No one was eliminated. Werewolves win by default!"
        }
    }

    const fallbackWinners = Object.entries(assignedRoles)
    .filter(([_,role]) => 
    ["Werewolf", "MysticWolf", "Minion", "DreamWolf"].includes(role.roleName)
    )
    .map(([player]) => player);
    
    return{
        eliminated,
        winners: fallbackWinners,
        explanation: "🐺 No Werewolf was eliminated. Werewolves win!"
    }
}

export default calculateWinners;