// src/pages/checkout/PaymentPage.tsx (or src/components/checkout/PaymentPage.tsx)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext"; // *** Import useCart ***
import CheckoutStepsIndicator from "../../components/checkout/CheckoutStepsIndicator";
import OrderSummary from "../../components/checkout/OrderSummary";
import InputField from "../../components/ui/InputField"; // Keep if needed for billing form
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
// *** Import the new CreditCardForm component ***
import CreditCardForm from "../../components/checkout/CreditCardForm"; // Adjust path if needed

// Placeholder Payment Icons
// import { FaPaypal, FaGooglePay} from 'react-icons/fa'; // Example

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartTotal, itemCount } = useCart();
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  // Add state for payment validity based on selected method/form inputs
  const [isPaymentValid, setIsPaymentValid] = useState(true); // Placeholder - set based on form validation

  const handleContinue = () => {
    // TODO: Add actual validation based on selected payment method/form state
    if (!isPaymentValid) {
      alert("Please complete or correct your payment details.");
      return;
    }
    console.log("Proceeding to review...");
    navigate("/checkout/review");
  };

  // --- Define Payment Tabs Data ---
  // Content now uses the imported CreditCardForm component
  const paymentTabs = [
    { label: "Credit Card", content: <CreditCardForm /> },
    {
      label: "PayPal",
      content: (
        <div className="p-6 text-center text-gray-600">
          (PayPal button/integration placeholder)
        </div>
      ),
    },
    //   { label: 'PayPal Credit', content: <div className="p-6 text-center text-gray-600">(PayPal Credit placeholder)</div> },
    //   { label: 'Google Pay', content: <div className="p-6 text-center text-gray-600">(Google Pay button/integration placeholder)</div> },
  ];
  // --- End Payment Tabs Data ---

  // --- Calculate Totals ---
  const subtotal = cartTotal;
  const estimatedTax = subtotal * 0.05; // Example tax
  const shippingCost = itemCount > 0 ? 15.0 : 0; // Example shipping
  const total = subtotal + estimatedTax + shippingCost;
  // --- End Calculate Totals ---

  return (
    <div>
      <CheckoutStepsIndicator currentStep="Payment" />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Payment Details */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-black mb-2">
              Payment Method
            </h2>
            <p className="text-base text-brand-gray-dark mb-6">
              Select how you'd like to pay.
            </p>
            {/* Render Tabs UI component */}
            <Tabs
              tabs={paymentTabs}
              tabListClassName="flex flex-wrap gap-x-6 gap-y-2 mb-0 border-b border-gray-200"
              tabButtonClassName="pb-2 text-lg lg:text-xl font-semibold transition-colors duration-200 whitespace-nowrap"
              activeTabButtonClassName="text-brand-dark border-b-2 border-brand-dark"
              inactiveTabButtonClassName="text-brand-gray hover:text-brand-dark"
              tabPanelClassName="mt-6" // Apply margin top to the content panel
            />
          </section>

          {/* Billing Address Section */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-6">
              Billing Address
            </h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50 border-gray-300">
                {/* Use Checkbox component */}
                <Checkbox
                  id="billingSame"
                  name="billingSame"
                  label="Same as shipping address"
                  checked={billingSameAsShipping}
                  onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  labelClassName="text-base font-medium text-black"
                />
              </div>
              {!billingSameAsShipping && (
                <div className="p-4 border rounded-lg bg-white border-gray-300">
                  <p className="text-brand-gray-dark font-semibold mb-4">
                    Enter billing address:
                  </p>
                  {/* TODO: Add Billing Address Form Fields (similar to shipping) Here */}
                  <p className="text-sm text-gray-500">
                    (Billing address form placeholder)
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/checkout/shipping")}
              className="h-[72px] text-black border-black order-last sm:order-first"
            >
              Back to Shipping
            </Button>
            <Button
              variant="dark"
              size="lg"
              onClick={handleContinue}
              className="h-[72px] flex-grow"
              disabled={!isPaymentValid}
            >
              Continue to Review
            </Button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-2/5 xl:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            estimatedTax={estimatedTax}
            shippingCost={shippingCost}
            total={total}
            buttonText="Continue to Review"
            onButtonClick={handleContinue}
            isButtonDisabled={!isPaymentValid} // Example disable logic
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
