import { motion } from "framer-motion";
import ButtonShape from "../../public/images/button.png";

function PrimaryButton({
  onClick,
  name,
  className = "",
  disabled = false,
  width = "auto",
  height = "auto",
  preserveBackground = true, // New prop to control background
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
      className={`px-4 py-2 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 ${disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:opacity-90"
        } ${className}`}
      style={{
        ...(preserveBackground && {
          backgroundImage: `url(${ButtonShape})`,
          backgroundSize: '100% 100%', // Changed to contain the full image
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
        border: 'none',
        width: width,
        height: height,
        minWidth: 'fit-content' // Ensures text fits
      }}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children || <span>{name}</span>}
    </motion.button>
  );
}

export default PrimaryButton;