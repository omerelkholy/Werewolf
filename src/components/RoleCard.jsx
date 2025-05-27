import { useEffect, useState } from 'react';
import TarotCard from '../../public/images/backCard.png'
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

function RoleCard({ variant, role, color, size = "full" }) {
    const [loaded, setLoaded] = useState(false);

    if (!role) return null;

    const isFront = variant === "Front";

    // Size variations
    const sizeClasses = {
        full: "w-full h-full",
        small: "w-48 h-64",
        tiny: "w-32 h-44"
    };

    const roleImageMap = {
        Werewolf: werewolfImage,
        Clone: cloneImage,
        Minion: minionImage,
        Mason: masonImage,
        Sentinel: sentinelImage,
        MysticWolf: mysticWolfImage,
        Seer: seerImage,
        Robber: robberImage,
        TroubleMaker: troubleMakerImage,
        Witch: witchImage,
        Drunk: drunkImage,
        Insomniac: insomniacImage,
        Joker: jokerImage,
        DreamWolf: dreamWolfImage,
    };

    const image = role._anonymousImage || roleImageMap[role.roleName];

    const teamColors = {
        Werewolves: "text-[#5c0f18]",
        Villagers: "text-[#265928]",
        Joker: "text-[#DAA520]",
    };

    const roleTeamcolor = {
        Werewolves: "text-[#5c0f18]",
        Villagers: "text-[#265928]",
        Joker: "text-[#735610]",
    };

    // Reset image loading state when `image` changes
    useEffect(() => {
        setLoaded(false);
    }, [image]);

    return (
        <div className={`${sizeClasses[size]} flex items-center justify-center ${size === "full" ? "p-2" : ""}`} >
            <div className={`w-full h-full rounded-xl overflow-hidden ${isFront ? color : ""}`}>
                {isFront ? (
                    <img src={TarotCard} alt="Tarot Back" className="w-full h-full object-contain scale-x-110 scale-y-110" />
                ) : (
                    <div className={`h-full w-full rounded-xl relative overflow-hidden`}>
                        <img
                            src={Parchment}
                            alt="Parchment background"
                            className="absolute inset-0 w-full h-full opacity-90"
                        />
                        <div className="absolute inset-0 bg-[url('/path/to/parchment-texture.png')] bg-blend-overlay opacity-20"></div>

                        <div className="absolute inset-0 border-8 border-transparent border-opacity-20 rounded-lg pointer-events-none">
                            <div className="absolute inset-0 border-opacity-30 rounded-md"></div>
                        </div>

                        <div className={`h-full w-full ${size === "tiny" ? "p-1" : size === "small" ? "p-2" : "p-4"} flex flex-col items-center justify-between relative z-10`}>
                            <div className="w-full text-center">
                                <h2
                                    className={`${size === "tiny" ? "text-sm" : size === "small" ? "text-lg" : "text-2xl"} mt-1.5 font-bold ${teamColors[role.team] || 'text-[#d4af37]'} ${role.roleName === "TroubleMaker" ? "" : "uppercase "} tracking-wider mb-1`}
                                    style={{
                                        fontFamily: 'IM Fell English SC, serif',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    {role.roleName}
                                </h2>
                                <div className="h-0.5 w-3/4 mx-auto bg-[#3a2c1a]"></div>
                                <p className={`${size === "tiny" ? "text-[10px]" : size === "small" ? "text-xs" : "text-base"} text-[#3d310a] italic`}>
                                    {role.effect?.effectName}
                                </p>
                            </div>

                            {/* Role Image with Loading Logic */}
                            <div className={`relative mb-1 ${size === "tiny" ? "w-20 h-20" : size === "small" ? "w-28 h-28" : "w-48 h-48"} flex items-center justify-center`}>
                                <div className="absolute inset-0 rounded-full border-4 border-[#3a2c1a] opacity-30"></div>
                                <div className="absolute inset-0 rounded-full bg-black opacity-20"></div>

                                {!loaded && (
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 rounded-full">
                                        <span className="text-white text-xs">Loading...</span>
                                    </div>
                                )}
                                <img
                                    key={image}
                                    src={image}
                                    alt={role.roleName}
                                    onLoad={() => setLoaded(true)}
                                    className={`w-full h-full object-contain drop-shadow-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </div>

                            {/* Team */}
                            <div className={`px-3`}>
                                <span
                                    className={`${size === "tiny" ? "text-[10px]" : size === "small" ? "text-xs" : "text-base"} font-bold uppercase tracking-wider ${roleTeamcolor[role.team] || 'text-[#d4af37]'}`}
                                    style={{ fontFamily: 'IM Fell English SC, serif' }}
                                >
                                    {role.team}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="w-full flex-1 p-1 rounded-lg bg-opacity-70 border-opacity-50 mb-2 overflow-y-auto">
                                <div className="h-full w-full flex items-center justify-center">
                                    <p
                                        className={`${size === "tiny" ? "text-[10px]" : size === "small" ? "text-[9.8px]" : "text-sm"} text-[#22180e] text-center leading-tight`}
                                        style={{ fontFamily: 'IM Fell English SC, serif' }}
                                    >
                                        {size === "tiny" ? "" : role.effect?.action}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoleCard;
