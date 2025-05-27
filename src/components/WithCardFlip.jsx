import { motion, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

export function WithCardFlip(Component) {
    return function FlipWrapper({ width, height, role, color, variant, onFlipComplete, onFlipBack, flipSoundUrl }) {
        const [isFlipped, setIsFlipped] = useState(false);
        const rotateX = useSpring(0, spring);
        const rotateY = useSpring(0, spring);
        const ref = useRef(null);
        const audioRef = useRef(null);

        useEffect(() => {
            if (flipSoundUrl) {
                audioRef.current = new Audio(flipSoundUrl);
                audioRef.current.preload = 'auto';
                audioRef.current.volume = 0.7; // Adjust volume as needed
            }
        }, [flipSoundUrl]);

        const handleMouseMove = (e) => {
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            rotateX.set(-y / 15);
            rotateY.set(x / 15);
        };

        const handleMouseLeave = () => {
            rotateX.set(0);
            rotateY.set(0);
        };

        const handleClick = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0; // Reset to start
                audioRef.current.play().catch(error => {
                    console.log('Audio play failed:', error);
                });
            }

            const willFlip = !isFlipped;
            setIsFlipped(willFlip);

            if (!isFlipped && onFlipComplete) {
                setTimeout(() => onFlipComplete(), 800);
            }

            if (isFlipped && onFlipBack) {
                setTimeout(() => onFlipBack(), 800); // when card flips back
            }
        };

        return (
            <motion.div style={{ width, height, perspective: 1200 }} onClick={handleClick}>
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        width: "100%",
                        height: "100%",
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        position: "relative",
                    }}
                    transition={spring}
                >
                    <motion.div
                        animate={{ rotateY: isFlipped ? -180 : 0 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            zIndex: isFlipped ? 0 : 1,
                        }}
                    >
                        <Component role={role} variant="Front" color={color} />
                    </motion.div>
                    <motion.div
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: isFlipped ? 0 : 180 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            zIndex: isFlipped ? 1 : 0,
                        }}
                    >
                        <Component role={role} variant="Back" color={color} />
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    };
}
