import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import BackCard from "../../public/images/backCard.png"
import Table from "../../public/images/table.png"

const TableLayout = ({
  players,
  currentPlayerId,
  onConfirm,
  title,
  randomColor,
  description,
  isModal = false,
  showGroundCards = false,
  showPlayerCards = true,
  allowMultipleSelection = false,
  maxSelections = 1,
}) => {
  const { originalGroundCards } = useGame();
  const [selected, setSelected] = useState(allowMultipleSelection ? [] : null);

  // Responsive sizing based on whether it's in modal or not
  const containerSize = isModal ? 365 : 600;
  const radius = isModal ? 165 : 200;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const playerCardWidth = isModal ? 70 : 100;
  const playerCardHeight = isModal ? 90 : 140;
  const groundCardSize = isModal ? 70 : 80;

  const handleSelection = (id, type = 'player') => {
    if (allowMultipleSelection) {
      const selectionKey = `${type}_${id}`;
      setSelected(prev => {
        const isAlreadySelected = prev.some(item =>
          item.id === id && item.type === type
        );

        if (isAlreadySelected) {
          return prev.filter(item => !(item.id === id && item.type === type));
        } else if (prev.length < maxSelections) {
          // Check if we need to enforce one player + one ground card rule
          if (maxSelections === 2 && showPlayerCards && showGroundCards) {
            const hasPlayerSelected = prev.some(item => item.type === 'player');
            const hasGroundSelected = prev.some(item => item.type === 'ground');

            // If trying to select a second card of the same type, replace the existing one
            if ((type === 'player' && hasPlayerSelected) || (type === 'ground' && hasGroundSelected)) {
              return prev.filter(item => item.type !== type).concat([{ id, type, key: selectionKey }]);
            }
          }
          return [...prev, { id, type, key: selectionKey }];
        }
        return prev;
      });
    } else {
      const newSelection = { id, type, key: `${type}_${id}` };
      setSelected(prev =>
        (prev?.id === id && prev?.type === type) ? null : newSelection
      );
    }
  };

  const isSelected = (id, type = 'player') => {
    if (allowMultipleSelection) {
      return selected.some(item => item.id === id && item.type === type);
    }
    return selected?.id === id && selected?.type === type;
  };

  const hasValidSelection = () => {
    if (allowMultipleSelection) {
      // Special validation for witch action: need exactly one player and one ground card
      if (maxSelections === 2 && showPlayerCards && showGroundCards) {
        const hasPlayer = selected.some(item => item.type === 'player');
        const hasGround = selected.some(item => item.type === 'ground');
        return hasPlayer && hasGround;
      }
      return selected.length > 0;
    }
    return selected !== null;
  };

  const handleConfirm = () => {
    if (hasValidSelection()) {
      onConfirm(selected);
      setSelected(allowMultipleSelection ? [] : null);
    }
  };

  let confirmButtonPosition = "";

  if (showPlayerCards && !showGroundCards) {
    confirmButtonPosition = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  } else if (!showPlayerCards && showGroundCards) {
    confirmButtonPosition = "bottom-4 left-1/2 -translate-x-1/2";
  } else if (showPlayerCards && showGroundCards) {
    confirmButtonPosition = "bottom-27 left-1/2 -translate-x-1/2";
  }

  return (
    <div className="flex flex-col items-center">
      {/* Header with title and description */}
      {title && (
        <div className="text-center mb-5">
          <h3 className="text-lg font-bold">{title}</h3>
          {description && (
            <p className="text-base text-black mb-2"><strong>{description}</strong></p>
          )}
        </div>
      )}

      {/* Table layout container */}
      <div
        className="relative mx-auto flex-shrink-0"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Table background - conditional rendering based on isModal */}
        {isModal ? (
          <img
            src={Table}
            alt="table"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        ) : (
          // Fallback circular table for non-modal
          <div
            className="absolute inset-0 rounded-full border-4 border-dashed border-gray-300 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)'
            }}
          />
        )}

        {/* Ground Cards in Center */}
        {showGroundCards && originalGroundCards && originalGroundCards.length > 0 && (
          <div className="absolute" style={{
            top: centerY - groundCardSize - 10,
            left: centerX - (originalGroundCards.length * (groundCardSize + 6)) / 2,
            width: originalGroundCards.length * (groundCardSize + 6),
            height: groundCardSize
          }}>
            {originalGroundCards.map((groundCard, index) => (
              <motion.div
                key={`ground_${index}`}
                className={`absolute rounded-lg shadow-lg cursor-pointer 
                flex flex-col items-center justify-center text-center transition-all duration-200
                  ${isSelected(index, 'ground')
                    ? `${randomColor} border-green-500 ring-2 ring-green-300 text-white`
                    : `${randomColor} border-gray-300 text-white`
                  }
                  hover:shadow-xl transform hover:scale-105
                `}
                style={{
                  left: index * (groundCardSize + 6),
                  width: groundCardSize,
                  height: groundCardSize + 15
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelection(index, 'ground')}
              >

                {/* Back card image */}
                <img
                  src={BackCard}
                  alt="card back"
                  className="absolute inset-0 w-full h-full object-fill rounded-xl opacity-100 z-0"
                />

                <div className={`text-center px-1 mt-11 z-10 ${isModal ? 'text-xs' : 'text-xs'
                  } opacity-80`}>
                  Card {index + 1}
                </div>
                {/* Selection indicator for multiple selection */}
                {allowMultipleSelection && isSelected(index, 'ground') && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Player positions */}
        {showPlayerCards && players.map((player, index) => {
          const angle = (360 / players.length) * index - 90; // Start from top
          const rad = (angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(rad) - (playerCardWidth / 2);
          const y = centerY + radius * Math.sin(rad) - (playerCardHeight / 2);

          const isSelectable = (player.id || player) !== currentPlayerId;
          const isCurrentPlayer = (player.id || player) === currentPlayerId;
          const playerId = player.id || player;
          const playerName = player.name || player;

          return (
            <motion.div
              key={playerId}
              className={`absolute rounded-lg shadow-lg cursor-pointer
                flex flex-col items-center justify-center text-center transition-all duration-200
                ${isCurrentPlayer
                  ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300'
                  : isSelected(playerId, 'player')
                    ? `${randomColor} border-green-500 ring-2 ring-green-300 text-white`
                    : `${randomColor} text-white`
                }
                ${!isSelectable ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-xl'}
              `}
              style={{
                top: y,
                left: x,
                width: playerCardWidth,
                height: playerCardHeight,
              }}
              whileHover={isSelectable ? { scale: 1.05 } : {}}
              whileTap={isSelectable ? { scale: 0.95 } : {}}
              onClick={() => {
                if (isSelectable) {
                  handleSelection(playerId, 'player');
                }
              }}
            >
              <img
                src={BackCard}
                alt="card back"
                className="absolute inset-0 w-full h-full object-fill rounded-xl opacity-100 z-0"
              />

              {/* Player indicator */}
              {isModal && (
                <div className={`${isCurrentPlayer ? 'bg-blue-500' : 'bg-white'
                  }`} />
              )}

              {/* Player name */}
              <div className={`font-bold mt-13 z-10 text-center px-1 ${isModal ? 'text-xs' : 'text-sm'
                }`}>
                {playerName}
              </div>

              {/* Current player label */}
              {isCurrentPlayer && isModal && (
                <div className="text-blue-600 font-medium text-xs mt-1 bg-white rounded px-1">
                  You
                </div>
              )}

              {/* Selection indicator for multiple selection */}
              {allowMultipleSelection && isSelected(playerId, 'player') && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Confirm button */}
        {hasValidSelection() && (
          <motion.button
            className={`absolute ${confirmButtonPosition} bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-colors px-6 py-3 text-sm z-50`}
            onClick={handleConfirm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isModal ? "Confirm Selection" : "Confirm Action"}
          </motion.button>
        )}

      </div>

      {/* Helper text */}
      {isModal && (
        <div className="text-center mt-4 text-xs text-gray-500 max-w-sm">
          {hasValidSelection() ? (
            <div>
              <p className="font-semibold text-green-600 mb-1">Selected:</p>
              {allowMultipleSelection ? (
                <div className="space-y-1">
                  {selected.map((item, idx) => (
                    <div key={item.key} className="text-green-600">
                      {item.type === 'player'
                        ? (players.find(p => (p.id || p) === item.id)?.name || item.id)
                        : `Ground Card ${item.id + 1}`
                      }
                    </div>
                  ))}
                  {selected.length < maxSelections && (
                    <p className="text-gray-400 text-xs">
                      You can select {maxSelections - selected.length} more
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-green-600">
                  {selected.type === 'player'
                    ? (players.find(p => (p.id || p) === selected.id)?.name || selected.id)
                    : `Ground Card ${selected.id + 1}`
                  }
                </p>
              )}
            </div>
          ) : (
            <p className="mt-8 text-black">
              Select {allowMultipleSelection ?
                (maxSelections === 2 && showPlayerCards && showGroundCards ?
                  'one player and one ground card' :
                  `up to ${maxSelections}`) :
                'a'}
              {showPlayerCards && showGroundCards && !(maxSelections === 2) ? ' player(s) or ground card(s)' :
                showPlayerCards && !showGroundCards ? ' player(s)' :
                  !showPlayerCards && showGroundCards ? ' ground card(s)' : ''} then tap the card to to continue
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TableLayout;