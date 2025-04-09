// src/components/pdp/VariantSelector.tsx
import React from "react";

interface VariantSelectorProps {
  title: string;
  options: string[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  className?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
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
        {title}: <span className="font-medium">{selectedValue}</span>
      </label>
      <div className="flex flex-wrap gap-2.5">
        {" "}
        {/* Adjusted gap */}
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`min-w-[42px] h-[43px] px-3 flex items-center justify-center border rounded-md text-base transition-colors duration-150 ${
                isSelected
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-white text-black border-[#EEEEEE] hover:border-black" // Match inactive style from CSS
              }`}
              aria-pressed={isSelected}
              aria-label={`${title} ${option}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
