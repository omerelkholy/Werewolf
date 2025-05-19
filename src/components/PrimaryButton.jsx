
function PrimaryButton({ onClick, color = "blue", name, icon, className = "", disabled = false }) {
  const colorMap = {
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-300",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 ${
        disabled 
          ? "bg-gray-300 cursor-not-allowed opacity-70" 
          : colorMap[color] || colorMap.blue
      } ${className}`}
    >
      {icon && icon}
      <span>{name}</span>
    </button>
  );
}

export default PrimaryButton;