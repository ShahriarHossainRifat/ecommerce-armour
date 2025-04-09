// src/components/checkout/OrderSummary.tsx
import React, { useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField"; // For Promo Code

interface OrderSummaryProps {
  subtotal: number;
  estimatedTax: number;
  shippingCost: number;
  total: number;
  buttonText: string; // e.g., "Proceed to Payment", "Place Order"
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  // Optional: Promo code state and handler
  promoCode?: string;
  onPromoCodeChange?: (code: string) => void;
  onApplyPromoCode?: () => void;
}

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  estimatedTax,
  shippingCost,
  total,
  buttonText,
  onButtonClick,
  isButtonDisabled = false,
  promoCode = "",
  onPromoCodeChange = () => {},
  onApplyPromoCode = () => {},
}) => {
  const [internalPromoCode, setInternalPromoCode] = useState(promoCode);

  const handleInternalPromoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInternalPromoCode(e.target.value);
    onPromoCodeChange(e.target.value);
  };

  const handleApplyClick = () => {
    onApplyPromoCode();
    alert(`Applying promo code: ${internalPromoCode} (Placeholder)`);
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-fit sticky top-28">
      <h2 className="text-xl font-semibold text-brand-dark-text mb-6 pb-4 border-b border-gray-200">
        Order Summary
      </h2>

      <div className="space-y-6">
        {/* Promo Code Section */}
        <div className="space-y-2">
          {/* This label is visually present and associated with the input via htmlFor */}
          <label
            htmlFor="promo-code"
            className="block text-base font-normal text-brand-gray-dark"
          >
            Discount code / Promo code
          </label>
          <div className="flex gap-2">
            {/* CORRECTED: Removed label and labelClassName from InputField */}
            <InputField
              id="promo-code"
              // label="" // REMOVED
              // labelClassName='sr-only' // REMOVED
              placeholder="Enter code"
              value={internalPromoCode}
              onChange={handleInternalPromoChange}
              containerClassName="flex-grow"
              className="h-[42px] !rounded-md border-brand-gray-input-border" label={""}            />
            <Button
              variant="outline"
              size="sm"
              className="h-[42px] border-black text-black flex-shrink-0 !rounded-md"
              onClick={handleApplyClick}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 border-b border-gray-200 pb-4">
          <div className="flex justify-between text-base">
            <span className="text-brand-gray-dark font-medium">Subtotal</span>
            <span className="font-semibold text-black">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-brand-gray-dark font-medium">
              Estimated Tax
            </span>
            <span className="font-semibold text-black">
              {formatPrice(estimatedTax)}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-brand-gray-dark font-medium">
              Estimated shipping & Handling
            </span>
            <span className="font-semibold text-black">
              {formatPrice(shippingCost)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span className="text-black">Total</span>
          <span className="text-black">{formatPrice(total)}</span>
        </div>

        {/* Action Button */}
        <Button
          variant="dark"
          size="lg"
          fullWidth
          onClick={onButtonClick}
          disabled={isButtonDisabled}
          className={`h-[58px] ${isButtonDisabled ? "opacity-60" : ""}`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
