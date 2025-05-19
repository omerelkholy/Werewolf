export const coreRoles = [
    "Werewolf", "Werewolf",
    "Minion",
    "Mason", "Mason",
    "Seer",
    "Robber",
    "TroubleMaker",
    "Drunk"
]

export const expansionRoles = [
    "Werewolf",
    "Sentinel",
    "Clone",
    "Insomniac",
    "Joker",
    "MysticWolf",
    "Witch",
    "DreamWolf",
]

export const NIGHT_ACTION_ORDER = [
    "Werewolf",
    "Minion",
    "Mason",
    "Sentinel",
    "Clone",
    "MysticWolf",
    "Seer",
    "Robber",
    "TroubleMaker",
    "Witch",
    "Drunk",
    "Insomniac",
    "Joker",
    "DreamWolf",
]

export function createActionQueue(players, assignedRoles){
    const queue = [];
    NIGHT_ACTION_ORDER.forEach(roleName => {
                players.forEach((player) => {
                    if(assignedRoles[player].roleName === roleName){
                     queue.push({player, roleName})   
                    }
                })
            });

            return queue;

}