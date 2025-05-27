import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PHASES, useGame } from "../../context/GameContext";
import PrimaryButton from '../../components/PrimaryButton';

function Discussion() {
    const { setCurrentPhase } = useGame();
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft <= 0) {
            setCurrentPhase(PHASES.VOTING);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, setCurrentPhase]);

    const nextPhase = () => {
        setCurrentPhase(PHASES.VOTING);
    };

    const progressPercentage = (timeLeft / 30) * 100;
    const circumference = 2 * Math.PI * 45; // radius of 45
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        <>
            <div className="overlay"></div>
            <div className="z-20 flex flex-col items-center gap-12 relative">
                {/* Floating magical particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: `hsl(${260 + Math.random() * 60}, 70%, 70%)`,
                            left: `${20 + Math.random() * 60}%`,
                            top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                <motion.h1 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 font-serif tracking-widest drop-shadow-2xl"
                    animate={{
                        textShadow: [
                            "0 0 10px rgba(168, 85, 247, 0.5)",
                            "0 0 20px rgba(168, 85, 247, 0.8)",
                            "0 0 10px rgba(168, 85, 247, 0.5)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ✦ DISCUSSION ✦
                </motion.h1>

                {/* Main Cauldron Container */}
                <div className="relative">
                    {/* Stone Pedestal Base */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-2xl" />
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full" />

                    {/* Magical Cauldron */}
                    <div className="relative w-40 h-32">
                        {/* Cauldron Body */}
                        <div 
                            className="w-full h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-b-full border-4 border-gray-700 shadow-2xl relative overflow-hidden"
                            style={{
                                background: "radial-gradient(ellipse at center top, #374151 0%, #1f2937 30%, #111827 70%, #000000 100%)"
                            }}
                        >
                            {/* Iron Bands */}
                            <div className="absolute top-1/4 w-full h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 shadow-inner" />
                            <div className="absolute top-1/2 w-full h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 shadow-inner" />
                            <div className="absolute top-3/4 w-full h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 shadow-inner" />

                            {/* Magical Brew */}
                            <motion.div
                                className="absolute bottom-0 w-full rounded-b-full"
                                animate={{ 
                                    height: `${progressPercentage}%`,
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 100, 
                                    damping: 20 
                                }}
                                style={{
                                    background: timeLeft > 20 
                                        ? "radial-gradient(ellipse at center, #8b5cf6 0%, #7c3aed 50%, #5b21b6 100%)"
                                        : timeLeft > 10
                                        ? "radial-gradient(ellipse at center, #f59e0b 0%, #d97706 50%, #92400e 100%)"
                                        : "radial-gradient(ellipse at center, #ef4444 0%, #dc2626 50%, #991b1b 100%)",
                                    boxShadow: timeLeft > 20 
                                        ? "0 0 20px rgba(139, 92, 246, 0.6)"
                                        : timeLeft > 10
                                        ? "0 0 20px rgba(245, 158, 11, 0.6)"
                                        : "0 0 20px rgba(239, 68, 68, 0.6)"
                                }}
                            >
                                {/* Bubbling Surface */}
                                <div className="absolute top-0 w-full h-4 overflow-hidden">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={`bubble-${i}`}
                                            className="absolute rounded-full bg-white/30"
                                            style={{
                                                width: `${Math.random() * 8 + 4}px`,
                                                height: `${Math.random() * 8 + 4}px`,
                                                left: `${10 + i * 10}%`,
                                                top: '50%'
                                            }}
                                            animate={{
                                                y: [0, -10, 0],
                                                scale: [0.8, 1.2, 0.8],
                                                opacity: [0.3, 0.8, 0.3]
                                            }}
                                            transition={{
                                                duration: 1.5 + Math.random(),
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Rim highlight */}
                            <div className="absolute top-0 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full opacity-50" />
                        </div>

                        {/* Cauldron Handles */}
                        <div className="absolute left-0 top-1/3 w-6 h-8 border-4 border-gray-600 rounded-full bg-transparent transform -translate-x-2" />
                        <div className="absolute right-0 top-1/3 w-6 h-8 border-4 border-gray-600 rounded-full bg-transparent transform translate-x-2" />

                        {/* Magical Steam/Smoke */}
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-16 overflow-hidden">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={`smoke-${i}`}
                                    className="absolute w-8 h-8 rounded-full opacity-30"
                                    style={{
                                        background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                                        left: `${i * 15}px`,
                                        bottom: 0
                                    }}
                                    animate={{
                                        y: [0, -40],
                                        x: [0, Math.sin(i) * 10],
                                        scale: [0.5, 1.5],
                                        opacity: [0.6, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Circular Progress Ring */}
                    <div className="absolute -inset-8 flex items-center justify-center">
                        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="rgba(75, 85, 99, 0.3)"
                                strokeWidth="2"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke={timeLeft > 20 ? "#8b5cf6" : timeLeft > 10 ? "#f59e0b" : "#ef4444"}
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                animate={{
                                    strokeDashoffset: strokeDashoffset,
                                    filter: [
                                        "drop-shadow(0 0 5px currentColor)",
                                        "drop-shadow(0 0 15px currentColor)",
                                        "drop-shadow(0 0 5px currentColor)"
                                    ]
                                }}
                                transition={{
                                    strokeDashoffset: { duration: 0.5 },
                                    filter: { duration: 1.5, repeat: Infinity }
                                }}
                            />
                            {/* Mystical runes around the circle */}
                            {['✦', '◆', '✧', '◇', '✦', '◆', '✧', '◇'].map((rune, i) => (
                                <text
                                    key={`rune-${i}`}
                                    x="50"
                                    y="10"
                                    textAnchor="middle"
                                    className="fill-purple-400 text-xs font-bold"
                                    transform={`rotate(${i * 45} 50 50)`}
                                >
                                    {rune}
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Time Display */}
                <motion.div 
                    className="text-center"
                    animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.6, repeat: timeLeft <= 5 ? Infinity : 0 }}
                >
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-4 rounded-xl border-2 border-purple-500/50 shadow-xl backdrop-blur-sm">
                        <div className="text-purple-300 text-sm font-serif mb-1 tracking-wide">ENCHANTMENT DURATION</div>
                        <div className={`text-3xl font-bold font-mono ${
                            timeLeft <= 5 ? 'text-red-400' : timeLeft <= 10 ? 'text-yellow-400' : 'text-purple-300'
                        }`}>
                            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                        </div>
                    </div>
                </motion.div>

                {/* Mystical Warning */}
                {timeLeft <= 5 && (
                    <motion.div
                        className="text-red-400 text-center font-serif italic text-lg"
                        animate={{ 
                            opacity: [0.5, 1, 0.5],
                            textShadow: [
                                "0 0 5px rgba(239, 68, 68, 0.5)",
                                "0 0 15px rgba(239, 68, 68, 0.8)",
                                "0 0 5px rgba(239, 68, 68, 0.5)"
                            ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        ⚠ The spell grows weak... ⚠
                    </motion.div>
                )}

                <PrimaryButton
                    onClick={nextPhase}
                    name="Proceed to Voting"
                    color="green"
                />
            </div>
        </>
    );
}

export default Discussion;