import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HowToPlay } from '../components/HowToPlay';
import MedievalPrimaryButton from '../components/MedievalPrimaryButton';
import { FaBook, FaPlay, FaQuestion, FaUsers } from 'react-icons/fa';
import Book from '../components/Book'; // Import the BookFlipCarousel component
import Characters from '../components/Characters'; // Import the Characters component
import { IoClose } from 'react-icons/io5';

function MainEntryScreen({ onStart }) {
  const [showModal, setShowModal] = useState(false);
  const [showStoryBook, setShowStoryBook] = useState(false); // New state for story book
  const [showCharacters, setShowCharacters] = useState(false); // New state for characters
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

  const handleStoryBookClick = () => {
    setShowStoryBook(true); // Show the story book when clicked
  };

  const handleCloseStoryBook = () => {
    setShowStoryBook(false); // Close the story book
  };

  const handleShowCharacters = () => {
    setShowCharacters(true);
  }

  const handleCloseCharacters = () => {
    setShowCharacters(false);
  }

  return (
    <div className="relative w-full h-screen bg-cover bg-center overflow-hidden">
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
              className="text-xl md:text-2xl italic font-[Cardo] mb-12 text-amber-200"
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
              className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              layout
            >
               <MedievalPrimaryButton
                onClick={handleShowCharacters} // Updated to use the new handler
                name="Characters"
                icon={<FaUsers />}
                width="230px"
                height="80px"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              />
              <MedievalPrimaryButton
                onClick={handleStoryBookClick} // Updated to use the new handler
                name="Story book"
                icon={<FaBook />}
                width="230px"
                height="80px"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              />
              <MedievalPrimaryButton
                onClick={() => setShowModal(true)}
                name="How to Play"
                icon={<FaQuestion />}
                width="230px"
                height="80px"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              />
              <MedievalPrimaryButton
                onClick={onStart}
                name="Start Game"
                icon={<FaPlay />}
                width="230px"
                height="80px"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* How to Play Modal */}
      <AnimatePresence>
        {showModal && (
          <HowToPlay
            key="how-to-play-modal"
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Story Book Modal */}
      <AnimatePresence>
        {showStoryBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#ceb27b] bg-opacity-80 flex items-center justify-center p-4"
            onClick={handleCloseStoryBook}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Book />
              <motion.button
                onClick={handleCloseStoryBook}
                className="absolute top-2 right-3 text-3xl text-red-800 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <IoClose />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Characters Modal */}
      <AnimatePresence>
        {showCharacters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#ceb27b] bg-opacity-80 flex items-center justify-center p-4"
            onClick={handleCloseCharacters}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Characters />
              <motion.button
                onClick={handleCloseCharacters}
                className="absolute top-2 right-3 text-3xl text-red-800 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <IoClose />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainEntryScreen;