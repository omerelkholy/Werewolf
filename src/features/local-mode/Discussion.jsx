import { useState, useEffect, useRef } from 'react';
import { PHASES, useGame } from "../../context/GameContext";
import WerewolfAnimation from "../../animations/WerewolfAnimation";
import NightLogViewer from "./NightLogViewer";
import ActionModal from "../../components/ActionModal";
import { FiInfo } from "react-icons/fi";

const SECRET_PASSWORD = "moonlight";

function Discussion() {
    const { setCurrentPhase } = useGame();
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedTime, setSelectedTime] = useState(0);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const timerRef = useRef(null);

    const nextPhase = () => {
        clearInterval(timerRef.current);
        setCurrentPhase(PHASES.VOTING);
    };

    const startTimer = (minutes) => {
        setSelectedTime(minutes);
        setTimeLeft(minutes * 60);
        setIsActive(true);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
        setTimeLeft(0);
        setSelectedTime(0);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            clearInterval(timerRef.current);
            setIsActive(false);
            nextPhase();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePasswordSubmit = () => {
        if (password === SECRET_PASSWORD) {
            setHasAccess(true);
            setPassword("");
            setError("");
        } else {
            setError("Wrong incantation, try again.");
        }
    };

    const timeOptions = [6, 8, 10, 15];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-6 overflow-hidden">
            <div className="relative w-full max-w-[90%] md:max-w-md flex flex-col glass-container bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 z-10 border border-amber-500/30 shadow-lg items-center gap-5">
                {/* Animation */}
                <div className="w-full h-32 sm:h-40 md:h-48 mt-4 mb-6 md:mb-9 flex items-center justify-center">
                    <WerewolfAnimation />
                </div>

                {/* Timer UI - Your Original Style Restored */}
                <div
                    className="text-5xl sm:text-6xl font-bold text-amber-800 px-6 py-3 text-center"
                    style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        background: 'linear-gradient(to bottom, #f0c14b, #8b4513)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        border: '3px double #8b4513',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {formatTime(timeLeft)}
                </div>
                {/* Time Buttons */}
                <div className="w-full grid grid-cols-2 gap-2 sm:gap-3">
                    {timeOptions.map((minutes) => (
                        <button
                            key={minutes}
                            onClick={() => startTimer(minutes)}
                            disabled={isActive}
                            className={`py-2 px-3 text-sm sm:text-base rounded-md font-semibold transition-all duration-150 ${isActive
                                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                    : selectedTime === minutes
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                                } border border-amber-800 shadow-sm`}
                        >
                            {minutes} min
                        </button>
                    ))}
                </div>

                {/* Control Buttons */}
                <div className="w-full flex gap-2">
                    {isActive && (
                        <button
                            onClick={resetTimer}
                            className="flex-1 py-1 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white rounded-md font-bold border border-red-700 shadow"
                        >
                            Reset
                        </button>
                    )}
                    <button
                        onClick={nextPhase}
                        className="flex-1 py-1 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white rounded-md font-bold border border-green-700 shadow"
                    >
                        {isActive ? "Skip" : "Proceed"}
                    </button>
                </div>

                {/* Info Icon Top-Right */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="text-amber-900 hover:text-amber-700 transition-colors"
                        aria-label="Reveal Night Log"
                    >
                        <FiInfo className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                </div>
            </div>

            {/* Action Modal for Password + NightLogViewer */}
            <ActionModal
                show={showPasswordModal}
                onClose={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                    setError("");
                }}
            >
                {hasAccess ? (
                    <div className="w-full max-h-[70vh] overflow-y-auto">
                        <NightLogViewer />
                    </div>
                ) : (
                    <div className="w-full font-serif text-center text-gray-800">
                        <h2 className="text-xl sm:text-2xl italic text-white font-bold mb-2">Keeper of Secrets</h2>
                        <p className="text-sm sm:text-base text-gray-300 mb-4 italic">
                            Speak the ancient word to unseal the log...
                        </p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter secret"
                            className="w-full px-4 py-2 rounded border border-amber-700 bg-transparent text-center mb-2"
                        />
                        {error && <p className="text-red-600 text-xs sm:text-sm mb-2">{error}</p>}
                        <div className="flex justify-center gap-4 mt-2">
                            <button
                                onClick={handlePasswordSubmit}
                                className="px-4 py-1 rounded-md bg-green-700 text-white hover:bg-green-800 border border-green-900 text-sm sm:text-base"
                            >
                                Enter
                            </button>
                        </div>
                    </div>
                )}
            </ActionModal>
        </div>
    );
}

export default Discussion;
