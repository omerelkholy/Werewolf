export const roles =
  [
    {
      "roleName": "Werewolf",
      "team": "Villians",
      "description": "He's the devil that when villagers vote on, they win",
      "effect":
      {
        "effectName": "silentHowl",
        "action": "Knows all other werewolves in the game and if alone, he sees one ground card"
      }
    },

    {
      "roleName": "Minion",
      "team": "Villians",
      "description": "He knows all the werewolves in the game and tries to manipulate the game making werewolves unknown",
      "effect":
      {
        "effectName": "wolfFanboy",
        "action": "Knows all werewolves but appears innocent."
      }
    },

    {
      "roleName": "Mason",
      "team": "GoodGuys",
      "description": "He's the watcher of the village trying to find the truth",
      "effect":
      {
        "effectName": "truthSeeker.exe",
        "action": "Knows other mason(s) if they exist."
      }
    },

    {
      "roleName": "Seer",
      "team": "GoodGuys",
      "description": "He sees what others can see!",
      "effect":
      {
        "effectName": "doublePeek",
        "action": "Views one player's role or two ground cards."
      }
    },

    {
      "roleName": "Robber",
      "team": "GoodGuys",
      "description": "He's a thief but SHAREEF!",
      "effect":
      {
        "effectName": "ninjaHeist",
        "action": "Swaps roles with another player and becomes that role."
      }
    },

    {
      "roleName": "TroubleMaker",
      "team": "GoodGuys",
      "description": "He's making a scene all over the place!",
      "effect":
      {
        "effectName": "switcharoo",
        "action": "Secretly swaps two other players' roles."
      }
    },

    {
      "roleName": "Drunk",
      "team": "GoodGuys",
      "description": "He is a weirdo moving around here and there doing something but drinking and acting strange not even remembering who he's",
      "effect":
      {
        "effectName": "oopsIClickedIt",
        "action": "Randomly swaps role with a ground card."
      }
    },

    {
      "roleName": "Clone",
      "team": "GoodGuys",
      "description": "He's YOU but probably better.",
      "effect":
      {
        "effectName": "MirrorImage",
        "action": "Copies another player's role permanently."
      }
    },

    {
      "roleName": "Joker",
      "team": "Neutral",
      "description": "He hates his job, hates everyone, just wants to die!",
      "effect":
      {
        "effectName": "SelfDestruct",
        "action": "He hates his job, hates everyone, just wants to die! so he wins if voted out."
      }
    },

    {
      "roleName": "Insomniac",
      "team": "GoodGuys",
      "description": "In a toxic relationship with his bed so that he finds out the painful truth.",
      "effect":
      {
        "effectName": "CaffeinePoweredSpy",
        "action": "Checks if their role changed during the night."
      }
    },

    {
      "roleName": "MysticWolf",
      "team": "Villians",
      "description": "She's beauty, she's grace, she'll stare right into your face...then destroy your village.",
      "effect":
      {
        "effectName": "SniffingSecrets",
        "action": "Werewolf who can also view roles like Seer."
      }
    },
    {
      "roleName": "Witch",
      "team": "GoodGuys",
      "description": "Spin the bottle, literally. The Witch can either save someone with a magical 'here's a chance' potion or send someone to the grave with her 'oops' potion.",
      "effect":
      {
        "effectName": "PotionRoulette",
        "action": "Gives a ground card to another player."
      }
    },
    {
      "roleName": "DreamWolf",
      "team": "Villians",
      "description": "Lucid dreams that feel more real than reality itself. these dreams are filled with lies, designed to confuse and mislead their victims into doubting their own perceptions.",
      "effect":
      {
        "effectName": "LucidLiar",
        "action": "Knows Minion but no one knows her."
      }
    },
    {
      "roleName": "Sentinel",
      "team": "GoodGuys",
      "description": "Like Batman, but with better sleep schedules and less brooding.",
      "effect":
      {
        "effectName": "CapedGuard",
        "action": "Protects a player from all night actions."
      }
    }
  ];

export const teams =
{
  "Villians": "Werewolves",
  "GoodGuys": "Villagers",
  "Neutral": "Joker"
};




