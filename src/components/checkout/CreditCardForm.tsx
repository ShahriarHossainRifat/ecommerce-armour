// src/components/checkout/CreditCardForm.tsx
import React, { useState } from "react";
// Adjust import paths based on your actual ui component locations
import InputField from "../ui/InputField";
import Checkbox from "../ui/Checkbox";
import { FiCreditCard } from "react-icons/fi"; // Example icon

// Props might be added later if state needs to be managed by parent
interface CreditCardFormProps {}

const CreditCardForm: React.FC<CreditCardFormProps> = () => {
  // State for credit card form inputs (kept local to this component for now)
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  // TODO: Add state for validation errors

  // Basic input formatting (examples - consider libraries like react-number-format)
  const formatCardNumber = (value: string) => {
    // Remove non-digits and format as groups of 4
    const digits = value.replace(/\D/g, "");
    return digits
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim()
      .slice(0, 19); // Max 16 digits + 3 spaces
  };
  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)} / ${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  return (
    // Apply margin where this component is used (e.g., in Tabs tabPanelClassName)
    <div className="space-y-4">
      {/* Card visual placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-xl p-6 text-white flex flex-col justify-between shadow-lg mb-6 relative overflow-hidden">
        {/* Optional: Add subtle pattern/chip */}
        <div className="flex justify-between items-start">
          <span className="text-lg font-semibold opacity-80">Credit Card</span>
          {/* TODO: Dynamically show Visa/Mastercard logo based on number */}
          <FiCreditCard size={28} className="opacity-60" />
        </div>
        <div className="space-y-2">
          <p className="text-xl lg:text-2xl tracking-widest font-mono">
            {cardNumber || "**** **** **** ****"}
          </p>
          <div className="flex justify-between text-sm opacity-70">
            <span className="uppercase">
              {cardholderName || "CARDHOLDER NAME"}
            </span>
            <span>{expiryDate || "MM / YY"}</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <InputField
        id="cardholderName"
        label="Cardholder Name"
        type="text"
        placeholder="Enter name as on card"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
        required
      />
      <InputField
        id="cardNumber"
        label="Card Number"
        type="text" // Use text type
        placeholder="xxxx xxxx xxxx xxxx"
        value={cardNumber}
        onChange={handleCardNumberChange} // Use formatting handler
        required
        inputMode="numeric"
        maxLength={19} // Max length with spaces
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="expiryDate"
          label="Exp. Date"
          type="text" // Use text type
          placeholder="MM / YY"
          value={expiryDate}
          onChange={handleExpiryChange} // Use formatting handler
          required
          maxLength={7} // MM / YY
        />
        <InputField
          id="cvv"
          label="CVV"
          type="text" // Use text to allow non-numeric if needed by some cards, but inputMode is numeric
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} // Allow only digits
          required
          maxLength={4}
          inputMode="numeric"
        />
      </div>
      <Checkbox
        id="saveCard"
        label="Save this card for future purchases"
        checked={saveCard}
        onChange={(e) => setSaveCard(e.target.checked)}
        labelClassName="text-base text-brand-gray-dark"
      />
      {/* TODO: Add validation messages */}
    </div>
  );
};

export default CreditCardForm; // Ensure it's exported
