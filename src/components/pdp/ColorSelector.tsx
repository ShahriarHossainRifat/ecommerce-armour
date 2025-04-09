// src/components/pdp/ColorSelector.tsx
import React from "react";
import { FiCheck } from "react-icons/fi";

interface ColorSelectorProps {
  title: string;
  options: string[]; // Hex color strings
  selectedValue: string | null;
  onChange: (value: string) => void;
  className?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  title,
  options = [],
  selectedValue,
  onChange,
  className = "",
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className={className}>
      <label className="block text-base font-bold text-black mb-2.5">
        {title}: {/* Consider displaying selected color name if available */}
      </label>
      <div className="flex flex-wrap gap-2.5">
        {" "}
        {/* Adjusted gap */}
        {options.map((color) => {
          const isSelected = selectedValue === color;
          const isWhite = color.toLowerCase() === "#ffffff"; // For checkmark contrast
          return (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={`w-[37px] h-[37px] rounded-full border border-gray-300 flex items-center justify-center transition-all duration-150 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
                isSelected ? "ring-2 ring-offset-1 ring-brand-primary" : ""
              } ${
                // Special handling for white swatch border
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
              {/* Checkmark for selected */}
              {isSelected && (
                <FiCheck
                  className={`w-4 h-4 ${isWhite ? "text-black" : "text-white"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
