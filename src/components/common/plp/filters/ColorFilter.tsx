// src/components/plp/filters/ColorFilter.tsx
import React from "react";
import { FiCheck } from "react-icons/fi";

// --- UPDATED Props ---
interface ColorFilterProps {
  title: string;
  options: string[]; // Array of hex color strings
  selectedValues: string[]; // Current state from parent
  onChange: (selected: string[]) => void; // Handler from parent
}
// --- End UPDATED Props ---

const ColorFilter: React.FC<ColorFilterProps> = ({
  title,
  options = [],
  selectedValues = [], // Use prop
  onChange, // Use prop
}) => {
  // Calls the onChange prop passed from parent
  const handleColorClick = (color: string) => {
    const isSelected = selectedValues.includes(color);
    if (isSelected) {
      onChange(selectedValues.filter((c) => c !== color));
    } else {
      onChange([...selectedValues, color]);
    }
  };

  return (
    <div className="py-6">
      <h3 className="text-lg font-bold font-sans tracking-wide text-black mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {options.map((color) => {
          // Determine selection based on prop
          const isSelected = selectedValues.includes(color);
          const isWhite = color.toLowerCase() === "#ffffff";
          return (
            <button
              key={color}
              onClick={() => handleColorClick(color)} // Calls updated handler
              className={`w-[42px] h-[42px] rounded-full border border-gray-300 flex items-center justify-center transition-all duration-150 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
                isSelected ? "ring-2 ring-offset-1 ring-brand-primary" : ""
              } ${
                isWhite && isSelected
                  ? "border-black ring-black"
                  : isWhite
                  ? "border-gray-400"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
              aria-label={`Color ${color}`}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <FiCheck
                  className={`w-5 h-5 ${isWhite ? "text-black" : "text-white"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
