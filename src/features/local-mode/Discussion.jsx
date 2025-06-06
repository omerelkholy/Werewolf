import { useState, useEffect, useRef } from 'react';
import { PHASES, useGame } from "../../context/GameContext";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import WerewolfAnimation from "../../animations/WerewolfAnimation";
import NightLogViewer from "./NightLogViewer";
import ActionModal from "../../components/ActionModal";
import PrimaryButton from "../../components/PrimaryButton"; // Import PrimaryButton
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaQuestionCircle } from 'react-icons/fa';
import { IoInformationCircle } from "react-icons/io5";
import { motion } from "framer-motion";

const SECRET_PASSWORD = "moonlight";

// Role Assignment text from HowToPlay.jsx
const ROLE_ASSIGNMENT_TEXT = `
Role Assignment Rules

Action Order:
Werewolf → Minion → Mason → Sentinel → Clone → MysticWolf → Seer → Robber → TroubleMaker → Witch → Drunk → Insomniac → Joker → DreamWolf

Core Game (6 Players + 3 Ground Cards):
- Werewolf (x2)
- Minion (x1)
- Mason (x2)
- Seer (x1)
- Robber (x1)
- TroubleMaker (x1)
- Drunk (x1)

Additional Roles (Added with More Players):
- 7th Player: Werewolf
- 8th Player: Sentinel
- 9th Player: Clone
- 10th Player: Insomniac
- 11th Player: Joker
- 12th Player: MysticWolf
- 13th Player: Witch
- 14th Player: DreamWolf
`;

function Discussion() {
    const { setCurrentPhase } = useGame();
    const [timeLeft, setTimeLeft] = useState(6 * 60); // Start with 6 minutes
    const [isActive, setIsActive] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState(6); // Track selected minutes
    const [totalTime, setTotalTime] = useState(6 * 60); // Track total time for progress bar
    const [showRoleModal, setShowRoleModal] = useState(false); // New state for role assignment modal

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const timerRef = useRef(null);

    const nextPhase = () => {
        clearInterval(timerRef.current);
        setCurrentPhase(PHASES.VOTING);
    };

    const confirmNextPhase = () => {
        toast(
            ({ closeToast }) => (
                <div className="bg-white/20 backdrop-blur-md border border-white/30 text-center rounded-xl p-4 sm:p-6 shadow-xl w-[90vw] max-w-[300px] sm:max-w-[400px]">
                    <p className="font-bold mb-3 text-base sm:text-lg text-amber-900 drop-shadow-sm">ARE YOU DONE YAPPING?!</p>
                    <div className="flex justify-center gap-3 sm:gap-4 mt-3">
                        <PrimaryButton
                            onClick={() => {
                                closeToast();
                                nextPhase();
                            }}
                            className="relative w-20 sm:w-24 h-9 sm:h-10 overflow-hidden transition touch-target"
                        >
                            <span className="relative z-10 text-white text-sm sm:text-base font-bold">Yes</span>
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={closeToast}
                            className="relative w-20 sm:w-24 h-9 sm:h-10 overflow-hidden transition touch-target"
                        >
                            <span className="relative z-10 text-white text-sm sm:text-base font-bold">Cancel</span>
                        </PrimaryButton>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                hideProgressBar: true,
                style: { background: 'transparent', boxShadow: 'none', width: '100%', maxWidth: '90vw' },
                bodyClassName: 'p-0 m-0',
            }
        );
    };


    const startTimer = () => {
        const timeInSeconds = selectedMinutes * 60;
        setTimeLeft(timeInSeconds);
        setTotalTime(timeInSeconds);
        setIsActive(true);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
    };

    const resumeTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
        const timeInSeconds = selectedMinutes * 60;
        setTimeLeft(timeInSeconds);
        setTotalTime(timeInSeconds);
    };

    const increaseTime = () => {
        if (!isActive && selectedMinutes < 20) {
            const newMinutes = selectedMinutes + 1;
            setSelectedMinutes(newMinutes);
            const timeInSeconds = newMinutes * 60;
            setTimeLeft(timeInSeconds);
            setTotalTime(timeInSeconds);
        }
    };

    const decreaseTime = () => {
        if (!isActive && selectedMinutes > 6) {
            const newMinutes = selectedMinutes - 1;
            setSelectedMinutes(newMinutes);
            const timeInSeconds = newMinutes * 60;
            setTimeLeft(timeInSeconds);
            setTotalTime(timeInSeconds);
        }
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

    // Calculate progress percentage
    const progressPercentage = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-6 overflow-hidden">
            <ToastContainer
                toastClassName="bg-amber-100 border border-amber-300 rounded-lg shadow-lg"
                bodyClassName="p-3"
                progressClassName="bg-amber-500"
            />
            <div className="relative w-full max-w-[90%] sm:max-w-[400px] md:max-w-md flex flex-col glass-container bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 z-10 border border-amber-500/30 shadow-lg items-center gap-5">
                {/* Animation */}
                <div className="w-full h-40 sm:h-48 md:h-56 mt-4 mb-6 md:mb-9 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                        <WerewolfAnimation />
                    </div>
                </div>

                {/* Timer with Plus/Minus Controls */}
                <div className="w-full flex items-center z-10 justify-center gap-3 sm:gap-4 mb-2">
                    {/* Minus Button */}
                    <button
                        onClick={decreaseTime}
                        disabled={isActive || selectedMinutes <= 6}
                        className={`
        min-w-[48px] min-h-[48px] 
        p-3 sm:p-4 
        border-2 rounded-full 
        bg-amber-700 hover:bg-amber-800 
        text-white transition-all duration-200 
        flex items-center justify-center
        touch-manipulation
        ${isActive || selectedMinutes <= 6 ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
    `}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <FiMinus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Timer Display - unchanged */}
                    <div
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center px-4 sm:px-6 py-2 sm:py-3 min-w-[140px] sm:min-w-[180px] md:min-w-[200px]"
                        style={{
                            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 20px rgba(240, 193, 75, 0.3)',
                            background: 'linear-gradient(145deg, #f4d03f, #d4af37, #b8860b, #8b4513)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundSize: '300% 300%',
                            animation: 'shimmer 3s ease-in-out infinite',
                            border: '3px solid transparent',
                            borderImage: 'linear-gradient(45deg, #8b4513, #d4af37, #8b4513) 1',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(139, 69, 19, 0.1)',
                            backdropFilter: 'blur(5px)',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {formatTime(timeLeft)}
                    </div>

                    {/* Plus Button */}
                    <button
                        onClick={increaseTime}
                        disabled={isActive || selectedMinutes >= 20}
                        className={`
        min-w-[48px] min-h-[48px] 
        p-3 sm:p-4 
        border-2 rounded-full 
        bg-amber-700 hover:bg-amber-800 
        text-white transition-all duration-200 
        flex items-center justify-center
        touch-manipulation
        ${isActive || selectedMinutes >= 20 ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
    `}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <FiPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] h-2 bg-amber-900/30 rounded-full overflow-hidden border border-amber-800/50 shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 transition-all duration-300 ease-out rounded-full shadow-sm"
                        style={{
                            width: `${progressPercentage}%`,
                            boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)'
                        }}
                    />
                </div>

                {/* Control Buttons */}
                <div className="w-full flex gap-2 mt-2">
                    {/* Start/Stop Timer Button */}
                    <PrimaryButton
                        onClick={isActive ? stopTimer : (timeLeft === selectedMinutes * 60 ? startTimer : resumeTimer)}
                        className={`flex-1 py-2 text-sm sm:text-base font-bold`}
                    >
                        {isActive ? "Stop" : (timeLeft === selectedMinutes * 60 ? "Start" : "Resume")}
                    </PrimaryButton>

                    {/* Reset Button (only show when timer is active or has been used) */}
                    {(isActive || timeLeft !== totalTime) && (
                        <PrimaryButton
                            onClick={resetTimer}
                            className="flex-1 py-2 text-sm sm:text-base"
                        >
                            Reset
                        </PrimaryButton>
                    )}

                    {/* Proceed Button */}
                    <PrimaryButton
                        onClick={confirmNextPhase}
                        className="flex-1 py-2 text-sm sm:text-base"
                    >
                        Proceed
                    </PrimaryButton>
                </div>

                {/* Info Icon Top-left */}
                <div className="absolute top-4 left-4 z-10">
                    <motion.button
                        onClick={() => setShowRoleModal(true)}
                        className="text-[#d4be8c] hover:text-white transition-colors p-2"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Role Assignment"
                    >
                        <FaQuestionCircle size={26} />
                    </motion.button>
                </div>

                {/* Info Icon Top-Right */}
                <div className="absolute top-4 right-4 z-10">
                    <motion.button
                        onClick={() => setShowPasswordModal(true)}
                        className="text-[#d4be8c] hover:text-white transition-colors p-2"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Reveal Night Log"
                    >
                        <IoInformationCircle size={28} />
                    </motion.button>
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
                            <PrimaryButton
                                onClick={handlePasswordSubmit}
                                className="px-4 py-1 text-sm sm:text-base"
                                width='110px'
                                height='auto'
                            >
                                Enter
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </ActionModal>

            {/* Role Assignment Modal */}
            <ActionModal show={showRoleModal} onClose={() => setShowRoleModal(false)}>
                <div className="-full max-w-[85%] font-serif text-center bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 pt-12 border border-amber-500/30 shadow-lg max-h-[70vh] overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', '::-webkit-scrollbar': { display: 'none' } }}
                >
                    <h2 className="text-xl sm:text-2xl italic text-white font-bold mb-2">Role Assignment</h2>
                    <p className="text-sm sm:text-base text-amber-200 mb-4 whitespace-pre-line">
                        {ROLE_ASSIGNMENT_TEXT}
                    </p>
                </div>
            </ActionModal>
        </div>
    );
}

export default Discussion;