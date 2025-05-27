import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HowToPlay } from '../components/HowToPlay';
import MedievalPrimaryButton from '../components/MedievalPrimaryButton';
import { FaBook, FaPlay } from 'react-icons/fa';

function MainEntryScreen({ onStart }) {
  const [showModal, setShowModal] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Staggered animation on mount
  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTitleVisible(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubtitleVisible(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setButtonsVisible(true);
    };

    sequence();
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/bg-desktop.jpg)',
      }}
    >
      <style>
        {`
          @keyframes drift {
            from { background-position: 0% 0%; }
            to { background-position: 100% 10%; }
          }
        `}
      </style>

      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-amber-50 text-center px-4">
        {/* Title */}
        <AnimatePresence>
          {titleVisible && (
            <motion.div
              className="mb-4 relative"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              layout
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold font-[Cinzel] text-amber-50"
                animate={{ textShadow: ['0 0 7px #ff9900', '0 0 10px #ff5500', '0 0 7px #ff9900'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Werewolf
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence>
          {subtitleVisible && (
            <motion.p
              className="text-xl md:text-2xl italic font-[Cardo] mb-8 text-amber-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              layout
            >
              A mysterious tale from an old village...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <AnimatePresence>
          {buttonsVisible && (
            <motion.div
              className="flex flex-col md:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              layout
            >
              <MedievalPrimaryButton
                onClick={() => setShowModal(true)}
                color="brown"
                name="How to Play"
                icon={<FaBook />}
                className="min-w-[180px]"
              />
              <MedievalPrimaryButton
                onClick={onStart}
                color="green"
                name="Start Game"
                icon={<FaPlay />}
                className="min-w-[180px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <HowToPlay 
            key="how-to-play-modal"
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainEntryScreen;