// src/components/checkout/ShippingPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext"; // *** Import useCart ***
import CheckoutStepsIndicator from "../../components/checkout/CheckoutStepsIndicator";
import OrderSummary from "../../components/checkout/OrderSummary";
import AddressCard from "../../components/checkout/AddressCard"; // Assuming Address type is defined here or imported
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
// Assuming Address type is defined/imported if needed for savedAddresses
// import { Address } from '../../types'; // Example

// Placeholder data - Replace with fetched user addresses
const savedAddresses = [
  {
    id: "addr1",
    name: "Robert Tye",
    addressLine1: "4517 Washington Ave",
    city: "Manchester",
    state: "KY",
    postalCode: "39459",
    country: "USA",
  },
  {
    id: "addr2",
    name: "Jon Williams",
    addressLine1: "1901 Thornridge Cir",
    city: "Shiloh",
    state: "HI",
    postalCode: "81063",
    country: "USA",
  },
];

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartTotal, itemCount } = useCart(); // *** Get cart data ***
  const [selectedAddressId] = useState<
    string | number | null
  >(savedAddresses[0]?.id || null);
  const [] = useState({
    /* ... form fields ... */
  });
  const [isAddingNew] = useState(false);

  const handleSelectAddress = () => {
    /* ... */
  };
  const handleEditAddress = () => {
    /* ... */
  };
  const handleDeleteAddress = () => {
    /* ... */
  };
  const handleAddNewAddress = () => {
    /* ... */
  };

  const handleProceedToPayment = () => {
    if (selectedAddressId || isAddingNew) {
      // Allow proceeding if adding new, validation happens later
      console.log(
        "Proceeding to payment with address:",
        selectedAddressId || "New Address"
      );
      navigate("/checkout/payment");
    } else {
      alert("Please select or add a delivery address.");
    }
  };

  // --- Calculate Totals (Example Logic) ---
  const subtotal = cartTotal;
  const estimatedTax = subtotal * 0.05; // Example 5% tax
  const shippingCost = itemCount > 0 ? 15.0 : 0; // Example flat rate
  const total = subtotal + estimatedTax + shippingCost;
  // --- End Calculate Totals ---

  return (
    <div>
      <CheckoutStepsIndicator currentStep="Address" />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Shipping Details */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8">
          {/* Select Address Section */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-2">
              Select a delivery address
            </h2>
            {/* ... description ... */}
            <div className="space-y-4">
              {savedAddresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  isSelected={selectedAddressId === addr.id && !isAddingNew}
                  onSelect={handleSelectAddress}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))}
            </div>
            <Button
              variant="dark"
              size="lg"
              className="mt-6 h-[65px]"
              onClick={handleProceedToPayment}
              disabled={!selectedAddressId && !isAddingNew}
            >
              Deliver Here
            </Button>
          </section>

          {/* Add New Address Section */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-6">
              {" "}
              Add a new address{" "}
            </h2>
            <form onSubmit={handleAddNewAddress} className="space-y-4">
              {/* ... Input fields for address ... */}
              <Checkbox
                id="saveInfo"
                name="saveInfo"
                label="Save this information for next time" /* ... */
              />
              <Button
                type="submit"
                variant="dark"
                size="lg"
                className="mt-6 h-[65px]"
              >
                {" "}
                Add New Address{" "}
              </Button>
            </form>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-2/5 xl:w-1/3">
          {/* *** UPDATED: Pass dynamic totals *** */}
          <OrderSummary
            subtotal={subtotal}
            estimatedTax={estimatedTax}
            shippingCost={shippingCost}
            total={total}
            buttonText="Proceed to Payment"
            onButtonClick={handleProceedToPayment}
            isButtonDisabled={!selectedAddressId && !isAddingNew} // Disable if no address selected/being added
            // Pass promo code handlers if needed
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
