// src/components/plp/filters/SizeFilter.tsx
import React from "react";

// --- UPDATED Props ---
interface SizeFilterProps {
  title: string;
  options: string[];
  selectedValues: string[]; // Current state from parent
  onChange: (selected: string[]) => void; // Handler from parent
}
// --- End UPDATED Props ---

const SizeFilter: React.FC<SizeFilterProps> = ({
  title,
  options = [],
  selectedValues = [], // Use prop
  onChange, // Use prop
}) => {
  // Calls the onChange prop passed from parent
  const handleSizeClick = (size: string) => {
    const isSelected = selectedValues.includes(size);
    if (isSelected) {
      onChange(selectedValues.filter((s) => s !== size));
    } else {
      onChange([...selectedValues, size]);
    }
  };

  return (
    <div className="py-6">
      <h3 className="text-lg font-bold font-sans tracking-wide text-black mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((size) => {
          // Determine selection based on prop
          const isSelected = selectedValues.includes(size);
          return (
            <button
              key={size}
              onClick={() => handleSizeClick(size)} // Calls updated handler
              className={`min-w-[42px] h-[42px] px-3 flex items-center justify-center border rounded-md text-base transition-colors duration-150 ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "bg-white text-brand-gray-dark border-brand-gray hover:border-black"
              }`}
              aria-pressed={isSelected} // Accessibility
              aria-label={`Size ${size}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
