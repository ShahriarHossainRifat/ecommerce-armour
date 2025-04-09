// src/components/pdp/QuantitySelector.tsx
import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void; // Function to update the quantity in the parent state/context
  minQuantity?: number;
  maxQuantity?: number; // e.g., product.stock
  className?: string;
  disabled?: boolean; // Allow disabling the whole component
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
  minQuantity = 1,
  maxQuantity = 99, // Default max, should be overridden by actual stock
  className = "",
  disabled = false,
}) => {
  const effectiveMaxQuantity = Math.max(minQuantity, maxQuantity); // Ensure max isn't less than min

  const handleDecrease = () => {
    const newQuantity = Math.max(minQuantity, quantity - 1);
    if (newQuantity !== quantity) {
      setQuantity(newQuantity); // Call the prop function
    }
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(effectiveMaxQuantity, quantity + 1);
    if (newQuantity !== quantity) {
      setQuantity(newQuantity); // Call the prop function
    }
  };

  // Handle direct input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = minQuantity; // Reset to min if input is invalid/empty
    }
    const validatedValue = Math.min(
      effectiveMaxQuantity,
      Math.max(minQuantity, value)
    );
    if (validatedValue !== quantity) {
      setQuantity(validatedValue); // Call the prop function
    } else if (e.target.value !== String(validatedValue)) {
      // If the input value doesn't match the validated number (e.g., user typed '0' when min is 1),
      // force the input field to show the validated value on the next render by calling setQuantity anyway.
      // This is a bit of a hack; controlled components usually handle this better if parent re-renders reliably.
      setQuantity(validatedValue);
    }
  };

  return (
    <div
      className={`flex items-center border border-brand-gray-dark rounded-[4px] h-[43px] ${
        disabled ? "opacity-50 bg-gray-100" : "bg-white"
      } ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || quantity <= minQuantity}
        className="px-3 py-2 text-black disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <FiMinus size={16} />
      </button>
      <input
        // UPDATED: Changed type to text, inputMode numeric, removed appearance-none
        type="text"
        inputMode="numeric"
        pattern="[0-9]*" // Helps mobile keyboards and basic validation
        value={quantity} // Display the quantity prop from parent
        onChange={handleChange} // Update parent state on change
        min={minQuantity}
        max={effectiveMaxQuantity}
        className="w-10 h-full text-center text-base font-medium border-l border-r border-brand-gray-dark focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary bg-transparent disabled:bg-gray-100" // Transparent background to inherit container bg
        aria-label="Quantity"
        disabled={disabled}
        readOnly // Make readOnly if direct typing isn't desired, rely only on buttons
        // Alternatively, add more robust validation on direct input if not readOnly
      />
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || quantity >= effectiveMaxQuantity}
        className="px-3 py-2 text-black disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
