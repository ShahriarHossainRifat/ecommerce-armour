// src/components/plp/filters/PriceFilter.tsx
import React, { useState } from "react"; // Keep useState for local input sync if needed
import { FiChevronUp } from "react-icons/fi";

interface PriceFilterProps {
  min: number; // Overall min possible price
  max: number; // Overall max possible price
  value: { min: number; max: number }; // Current selected range from parent
  onChange: (value: { min: number; max: number }) => void; // Handler to notify parent
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Keep local state for accordion toggle

  // --- Optional: Local state for smoother input field interaction ---
  // Syncs with parent state but allows typing without immediate prop update lag
  const [localMin, setLocalMin] = useState(value.min.toString());
  const [localMax, setLocalMax] = useState(value.max.toString());

  // Update local state when prop changes
  React.useEffect(() => {
    setLocalMin(value.min.toString());
    setLocalMax(value.max.toString());
  }, [value.min, value.max]);

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMin(e.target.value);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMax(e.target.value);
  };

  // Function to apply the changes when user stops typing (e.g., onBlur)
  const applyPriceChange = () => {
    let newMin = parseInt(localMin, 10);
    let newMax = parseInt(localMax, 10);

    if (isNaN(newMin) || newMin < min) newMin = min;
    if (isNaN(newMax) || newMax > max) newMax = max;
    if (newMin > newMax) newMin = newMax; // Prevent min > max

    // Only call parent onChange if values actually changed
    if (newMin !== value.min || newMax !== value.max) {
      onChange({ min: newMin, max: newMax });
    } else {
      // If invalid input caused numbers to revert, reset local state too
      setLocalMin(newMin.toString());
      setLocalMax(newMax.toString());
    }
  };
  // --- End Optional local state handling ---

  return (
    <div className="py-6">
      {/* Header */}
      <button
        className="flex justify-between items-center w-full text-left mb-6"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold font-sans tracking-wide text-black">
          Filter by Price
        </h3>
        <FiChevronUp
          className={`w-5 h-5 text-black transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Slider Placeholder */}
          {/* TODO: Implement with a library like rc-slider, passing value and calling onChange */}
          <div className="relative h-3 flex items-center mb-4">
            <div className="absolute bg-gray-300 h-1 w-full rounded-full"></div>
            <div
              className="absolute bg-brand-dark-alt h-1 rounded-full"
              style={{
                left: `${Math.max(0, (value.min - min) / (max - min)) * 100}%`,
                right: `${Math.max(
                  0,
                  100 - ((value.max - min) / (max - min)) * 100
                )}%`,
              }}
            ></div>
            <div
              className="absolute w-3 h-3 bg-brand-dark-alt rounded-full -ml-1.5 cursor-pointer"
              style={{
                left: `${Math.max(0, (value.min - min) / (max - min)) * 100}%`,
              }}
            ></div>
            <div
              className="absolute w-3 h-3 bg-brand-dark-alt rounded-full -mr-1.5 cursor-pointer"
              style={{
                left: `${Math.min(
                  100,
                  ((value.max - min) / (max - min)) * 100
                )}%`,
              }}
            ></div>
          </div>

          {/* From-To Inputs */}
          <div className="flex justify-between items-center text-sm text-brand-gray-dark">
            <span>From</span>
            <span>To</span>
          </div>
          <div className="flex justify-between items-center gap-2 mt-1">
            <input
              type="number"
              value={localMin} // Use local state
              min={min}
              max={max} // Max should be overall max
              onChange={handleMinInput} // Update local state
              onBlur={applyPriceChange} // Apply changes on blur
              onKeyDown={(e) => e.key === "Enter" && applyPriceChange()} // Apply on Enter
              className="w-1/2 border border-brand-gray-input-border rounded px-2 py-1 text-sm text-center focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              aria-label="Minimum price"
            />
            <span className="text-brand-gray-input-border">-</span>
            <input
              type="number"
              value={localMax} // Use local state
              min={min} // Min should be overall min
              max={max}
              onChange={handleMaxInput} // Update local state
              onBlur={applyPriceChange} // Apply changes on blur
              onKeyDown={(e) => e.key === "Enter" && applyPriceChange()} // Apply on Enter
              className="w-1/2 border border-brand-gray-input-border rounded px-2 py-1 text-sm text-center focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              aria-label="Maximum price"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
