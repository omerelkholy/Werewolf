import React, { useState, useEffect } from 'react';
import werewolfImage from '../assets/images/werewolf.png'
import cloneImage from '../assets/images/clone.png'
import dreamWolfImage from '../assets/images/dreamwolf.png'
import drunkImage from '../assets/images/drunk.png'
import insomniacImage from '../assets/images/insomniac.png'
import jokerImage from '../assets/images/joker.png'
import masonImage from '../assets/images/mason.png'
import minionImage from '../assets/images/minion.png'
import mysticWolfImage from '../assets/images/mysticwolf.png'
import robberImage from '../assets/images/robber.png'
import seerImage from '../assets/images/seer.png'
import sentinelImage from '../assets/images/sentinel.png'
import troubleMakerImage from '../assets/images/troublemaker.png'
import witchImage from '../assets/images/witch.png'
import Parchment from '../../public/images/parchment.png'

function Characters() {
    const [selectedCard, setSelectedCard] = useState(1);
    const [animationKey, setAnimationKey] = useState(0);

    const characters = [
        {
            id: 1,
            name: "Werewolf",
            team: "Werewolves",
            description: "He's the devil that when villagers vote on, they win",
            effectName: "silent Howl",
            image: werewolfImage,
            action: "Knows all other werewolves in the game and MASTERMIND and if he was a lone wolf, he can see one ground card"
        },
        {
            id: 2,
            name: "Minion",
            team: "Werewolves",
            description: "He knows all the werewolves in the game and tries to manipulate the game making werewolves unknown.",
            effectName: "wolf Fanboy",
            image: minionImage,
            action: "Knows all werewolves but appears innocent."
        },
        {
            id: 3,
            name: "Mason",
            team: "Villagers",
            description: "He's the watcher of the village trying to find the truth.",
            effectName: "truthSeeker.exe",
            image: masonImage,
            action: "Knows other mason(s) if they exist."
        },
        {
            id: 4,
            name: "Seer",
            team: "Villagers",
            description: "He sees what others can see!",
            effectName: "double Peek",
            image: seerImage,
            action: "Views one player's role or two ground cards."
        },
        {
            id: 5,
            name: "Robber",
            team: "Villagers",
            description: "He's a thief but SHAREEF!",
            effectName: "ninja Heist",
            image: robberImage,
            action: "Swaps roles with another player and becomes that role."
        },
        {
            id: 6,
            name: "TroubleMaker",
            team: "Villagers",
            description: "He's making a scene all over the place!",
            effectName: "switcharoo",
            image: troubleMakerImage,
            action: "Secretly swaps two other players' roles."
        },
        {
            id: 7,
            name: "Drunk",
            team: "Villagers",
            description: "He is a weirdo moving around here and there doing something but drinking and acting strange not even remembering who he's.",
            effectName: "oops I Clicked It",
            image: drunkImage,
            action: "Randomly swaps role with a ground card."
        },
        {
            id: 8,
            name: "Clone",
            team: "Villagers",
            description: "He's YOU but probably better.",
            effectName: "Mirror Image",
            image: cloneImage,
            action: "Copies another player's role permanently."
        },
        {
            id: 9,
            name: "Joker",
            team: "Joker",
            description: "He hates his job, hates everyone, just wants to die!",
            effectName: "Self Destruct",
            image: jokerImage,
            action: "He Wins when he gets voted out"
        },
        {
            id: 10,
            name: "Insomniac",
            team: "Villagers",
            description: "In a toxic relationship with his bed so that he finds out the painful truth.",
            effectName: "Caffeine Powered Spy",
            image: insomniacImage,
            action: "Checks if their role changed during the night."
        },
        {
            id: 11,
            name: "MysticWolf",
            team: "Werewolves",
            description: "She's beauty, she's grace, she'll stare right into your face...then destroy your village.",
            effectName: "Sniffing Secrets",
            image: mysticWolfImage,
            action: "Werewolf who can also view roles like Seer."
        },
        {
            id: 12,
            name: "Witch",
            team: "Villagers",
            description: "Spin the bottle, literally. The Witch can either save someone with a magical 'here's a chance' potion or send someone to the grave with her 'oops' potion.",
            effectName: "Potion Roulette",
            image: witchImage,
            action: "Gives a ground card to another player."
        },
        {
            id: 13,
            name: "DreamWolf",
            team: "Werewolves",
            description: "Lucid dreams that feel more real than reality itself. these dreams are filled with lies, designed to confuse and mislead their victims into doubting their own perceptions.",
            effectName: "Lucid Liar",
            image: dreamWolfImage,
            action: "Knows Minion but no one knows her."
        },
        {
            id: 14,
            name: "Sentinel",
            team: "Villagers",
            description: "Like Batman, but with better sleep schedules and less brooding.",
            effectName: "Caped Guard",
            image: sentinelImage,
            action: "Protects a player from all night actions."
        },
    ];

    const handlePrevious = () => {
        setAnimationKey(prev => prev + 1); // Trigger re-animation
        setSelectedCard(prev => (prev === 1 ? 14 : prev - 1));
    };

    const handleNext = () => {
        setAnimationKey(prev => prev + 1); // Trigger re-animation
        setSelectedCard(prev => (prev === 14 ? 1 : prev + 1));
    };

    const currentCharacter = characters.find(b => b.id === selectedCard);

    return (
        <div className="w-full h-full overflow-y-auto text-black p-4 flex flex-col items-center justify-center gap-4">
            <style>{`
.cards {
  --width: clamp(280px, 90vw, 420px);
  --rotate-duration: 650ms;
  --rotate-timing-function: linear(
			0,
			0.417 25.5%,
			0.867 49.4%,
			1 57.7%,
			0.925 65.1%,
			0.908 68.6%,
			0.902 72.2%,
			0.916 78.2%,
			0.988 92.1%,
			1
		);
  --article-reveal-duration: 300ms;
  --article-reveal-delay: 250ms;
  --degrees: 360deg;
  --items: 14;
  --radius: clamp(280px, 120vw, 650px);
  --item-size: clamp(80px, 30vw, 140px);
  --target: ${selectedCard};
}

.cards {
  position: relative;
  width: var(--width);
  background: rgba(255, 255, 255, 0.95);
  background-image: url(${Parchment});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--item-size);
  padding-bottom: 1rem;
  overflow: hidden;
}

.circle-container {
  position: absolute;
  top: calc(var(--radius) * -0.95);
  left: 50%;
  transform: translateX(-50%) rotate(calc(var(--degrees) / var(--items) * (-1 * var(--target))));
  width: var(--item-size);
  height: var(--item-size);
  transition: transform var(--rotate-duration) var(--rotate-timing-function);
  z-index: 1;
}

.circle-container::before {
  content: "";
  position: absolute;
  inset: -230%;
  margin: auto;
//   background-color: rgb(141, 115, 67);
//   background-image: url("https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/images/bg-paper-2.webp");
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.butterfly-item {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
}

.butterfly-item img {
  width: 100%;
  max-width: var(--item-size);
  object-fit: contain;
  transform: rotate(180deg);
  filter: drop-shadow(4px 6px 4px rgba(0, 0, 0, 0.35));
}

.contents {
  width: 100%;
  padding: 1rem 1.2rem;
  display: grid;
  gap: 1rem;
}

/* Animation keyframes */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article {
  position: relative;
}

.article h2 {
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  text-align: center;
  font-weight: 700;
  margin-bottom: 1rem;
  animation: slideInUp var(--article-reveal-duration) ease-out forwards;
  animation-delay: calc(var(--article-reveal-delay) * 1);
  opacity: 0;
}

.article ul {
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.4rem;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.4;
}

.article li {
  animation: slideInUp var(--article-reveal-duration) ease-out forwards;
  opacity: 0;
}

.article li:nth-child(1) {
  animation-delay: calc(var(--article-reveal-delay) * 2);
}

.article li:nth-child(2) {
  animation-delay: calc(var(--article-reveal-delay) * 3);
}

.article li:nth-child(3) {
  animation-delay: calc(var(--article-reveal-delay) * 4);
}

.article li:nth-child(4) {
  animation-delay: calc(var(--article-reveal-delay) * 5);
}

.article li span {
  font-weight: bold;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.nav-button {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  padding: 0.4rem 1rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
  cursor: pointer;
  color: #333;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.1);
}

      `}</style>

            <div className="cards">
                <div className="circle-container">
                    {characters.map((character, index) => {
                        const angle = (360 / characters.length) * index + 115;
                        return (
                            <div
                                key={character.id}
                                className="butterfly-item"
                                style={{
                                    transform: `rotate(${angle}deg) translate(var(--radius)) rotate(90deg)`
                                }}
                            >
                                <img src={character.image} alt={character.name} />
                            </div>
                        );
                    })}
                </div>

                <div className="contents">
                    <article
                        key={animationKey}
                        className="article mt-15"
                    >
                        <h2 className={`${currentCharacter.team === "Werewolves" ? "text-red-800" : currentCharacter.team === "Villagers" ? "text-green-800" : "text-yellow-700"}`}>
                            {currentCharacter?.name}
                        </h2>
                        <ul>
                            <li><span>Team:</span> {currentCharacter?.team}</li>
                            <li><span>Description:</span> {currentCharacter?.description}</li>
                            <li><span>Ability Name:</span> {currentCharacter?.effectName}</li>
                            <li><span>Action:</span> {currentCharacter?.action}</li>
                        </ul>
                        <div className="buttons">
                            <button
                                className="nav-button"
                                onClick={handlePrevious}
                            >
                                &#10094;
                            </button>
                            <button
                                className="nav-button"
                                onClick={handleNext}
                            >
                                &#10095;
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Characters;




