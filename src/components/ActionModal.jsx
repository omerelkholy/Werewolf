// components/ActionModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import Ground from "../../public/images/ground.png"
import { IoClose } from "react-icons/io5";

function ActionModal({ show, onClose, children }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Allow clicking overlay to close
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-hidden p-4 relative"
              onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside modal
              style={{ backgroundImage: `url(${Ground})` }}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-2 right-3 text-3xl text-red-800 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <IoClose />
              </motion.button>

              <div className="mt-1 pb-2 flex justify-center items-center h-full">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ActionModal;