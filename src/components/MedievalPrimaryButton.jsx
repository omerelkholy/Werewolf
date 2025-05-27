import { motion } from 'framer-motion';

function MedievalPrimaryButton({ onClick, color = "blue", name, icon, className = "", disabled = false }) {
  // Medieval color palette
  const colorMap = {
    red: "bg-red-800 hover:bg-red-900 border-red-700",
    blue: "bg-indigo-800 hover:bg-indigo-900 border-indigo-700",
    green: "bg-emerald-800 hover:bg-emerald-900 border-emerald-700",
    brown: "bg-amber-800 hover:bg-amber-900 border-amber-700",
    gold: "bg-yellow-600 hover:bg-yellow-700 border-yellow-500",
  };

  const buttonColors = colorMap[color] || colorMap.blue;
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-5 py-3 rounded-md text-white font-medium transition-all 
      border-2 border-b-4 font-[Cinzel] uppercase tracking-wider
      shadow-lg flex items-center justify-center gap-2 focus:outline-none
      ${disabled 
        ? "bg-gray-500 border-gray-600 cursor-not-allowed opacity-70" 
        : buttonColors
      } ${className}`}
      whileTap={{ y: 4, borderBottomWidth: '2px' }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Medieval ornamental edge */}
      <div className="absolute inset-0 rounded-md border border-white/20 pointer-events-none" />
      
      {icon && <span className="text-xl">{icon}</span>}
      <span>{name}</span>
    </motion.button>
  );
}

export default MedievalPrimaryButton;