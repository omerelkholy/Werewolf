import { motion } from 'framer-motion';
import ButtonShape from "../../public/images/darkerbutton.png";

function MedievalPrimaryButton({ 
  onClick, 
  name, 
  icon, 
  className = "", 
  disabled = false,
  width = "200px", 
  height = "60px",
  // Framer Motion props
  initial,
  animate,
  whileHover,
  whileTap,
  children
}) {
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-4 text-white font-medium transition-all duration-200
      font-[Cinzel] uppercase tracking-wider text-xl
      shadow-lg flex items-center justify-center gap-3 focus:outline-none
      ${disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:opacity-90"
      } ${className}`}
      style={{
        backgroundImage: `url(${ButtonShape})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        minWidth: width,
        minHeight: height
      }}
      initial={initial || { scale: 1 }}
      animate={animate}
      whileHover={whileHover || { scale: 1.05 }}
      whileTap={whileTap || { scale: 0.98 }}
    >
      {/* Medieval color overlay */}
      <div className={`absolute inset-0 rounded-md transition-all duration-200 ${
        disabled ? "bg-gray-500/60" : ""
      }`} />
      
      {/* Medieval ornamental edge */}
      <div className="absolute inset-0 rounded-md pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span>{children || name}</span>
      </div>
    </motion.button>
  );
}

export default MedievalPrimaryButton;