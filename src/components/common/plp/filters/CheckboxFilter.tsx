// src/components/plp/filters/CheckboxFilter.tsx
import React, { useState } from "react";
import { FiChevronUp, FiSearch } from "react-icons/fi";
import Checkbox from "../../../ui/Checkbox";
import InputField from "../../../ui/InputField";

interface Option {
  id: string;
  label: string;
  count?: number;
}

// --- UPDATED Props ---
interface CheckboxFilterProps {
  title: string;
  options: Option[];
  selectedValues: string[]; // Current state from parent
  onChange: (selected: string[]) => void; // Handler from parent
  showSearch?: boolean;
  maxHeight?: string;
}
// --- End UPDATED Props ---

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  options = [],
  selectedValues = [], // Use prop
  onChange, // Use prop
  showSearch = false,
  maxHeight = "max-h-48",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calls the onChange prop passed from parent
  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionId]);
    } else {
      onChange(selectedValues.filter((id) => id !== optionId));
    }
  };

  const filterId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="py-6">
      <button
        className="flex justify-between items-center w-full text-left mb-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`${filterId}-content`}
      >
        <h3 className="text-lg font-bold font-sans tracking-wide text-black">
          {title}
        </h3>
        <FiChevronUp
          className={`w-5 h-5 text-black transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      {isOpen && (
        <div id={`${filterId}-content`} className="space-y-4">
          {showSearch && (
            <div className="relative">
              <InputField
                id={`${filterId}-search`}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-lg"
                aria-label={`Search ${title}`} label={""}              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          )}

          <div
            className={`space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gray scrollbar-track-gray-100 ${maxHeight}`}
          >
            {filteredOptions.map((option) => (
              <Checkbox
                key={option.id}
                id={`filter-${filterId}-${option.id}`}
                label={`${option.label} ${
                  option.count ? `(${option.count})` : ""
                }`}
                // Use prop for checked state
                checked={selectedValues.includes(option.id)}
                // Call updated handler which calls parent onChange
                onChange={(e) =>
                  handleCheckboxChange(option.id, e.target.checked)
                }
                labelClassName="text-base text-black"
              />
            ))}
            {filteredOptions.length === 0 && searchTerm && (
              <p className="text-sm text-gray-500 pl-1">No matches found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
