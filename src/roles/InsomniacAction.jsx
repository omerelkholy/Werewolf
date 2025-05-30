import PrimaryButton from "../components/PrimaryButton";
import { motion } from "framer-motion";

function InsomniacAction({ onSubmit, name }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-5 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-amber-300 mb-2"
        style={{ fontFamily: 'IM Fell English SC, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
      >
        Caffeine Effect
      </motion.h2>
      <div className="w-28 h-0.5 bg-amber-400 mx-auto"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-green-900/40 backdrop-blur-sm rounded-lg px-6 py-5 w-full max-w-sm border border-green-600/40 text-green-100 shadow-inner"
      >
        <p className="text-xl">
          At the end of the night, you'll see what your role has become.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <PrimaryButton
          onClick={() => onSubmit({ insomniac: "insomniac" })}
          name={name}
          width="50px"
          height="40px"
        />
      </motion.div>
    </div>
  );
}

export default InsomniacAction;
