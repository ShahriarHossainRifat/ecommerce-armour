// src/pages/checkout/ReviewOrderPage.tsx (or src/components/checkout/ReviewOrderPage.tsx)
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// *** Import useCart to get items and clearCart function ***
import { useCart } from "../../contexts/CartContext";
import CheckoutStepsIndicator from "../../components/checkout/CheckoutStepsIndicator";
import OrderSummary from "../../components/checkout/OrderSummary";
import { FiEdit2 } from "react-icons/fi";
// *** Import CartItemType and StoredOrderDetails type ***
import { CartItemType } from "../../types/product"; // Adjust path if needed
// Define StoredOrderDetails or import from types if moved there
interface StoredOrderDetails {
  id: string;
  date: string;
  items: CartItemType[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: { type: string; last4: string };
  status: string;
}

// Placeholder data for summaries - Replace with actual data from state/context/previous steps
const placeholderShippingAddress = {
  name: "Robert Tye",
  addressLine1: "4517 Washington Ave",
  city: "Manchester",
  state: "KY",
  postalCode: "39459",
  country: "USA",
};
const placeholderPaymentMethod = { type: "Debit Card", last4: "89" };

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const ReviewOrderPage: React.FC = () => {
  const navigate = useNavigate();
  // Get cart state and clear function from context
  const {
    items,
    cartTotal,
    itemCount,
    loading: cartLoading,
    clearCart,
  } = useCart();

  // --- Calculate Totals based on cart context ---
  const subtotal = cartTotal;
  const estimatedTax = subtotal * 0.05; // Example 5% tax
  const shippingCost = itemCount > 0 ? 15.0 : 0; // Example flat rate
  const total = subtotal + estimatedTax + shippingCost;
  // --- End Calculate Totals ---

  const handlePlaceOrder = () => {
    // Prevent placing order if cart is empty or still loading
    if (items.length === 0 || cartLoading) return;

    // 1. Create order details object from current state
    // Use actual selected shipping/payment details if available from context/state
    const orderDetails: StoredOrderDetails = {
      id: `ARMOUR-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // More unique ID
      date: new Date().toISOString(),
      items: [...items], // Copy cart items
      subtotal: subtotal,
      tax: estimatedTax,
      shipping: shippingCost,
      total: total,
      shippingAddress: placeholderShippingAddress, // Use actual selected address
      paymentMethod: placeholderPaymentMethod, // Use actual selected payment
      status: "Processing",
    };
    console.log("Placing order:", orderDetails);

    // 2. Simulate Saving Order (using localStorage for demo)
    // WARNING: Not suitable for production! Use a secure backend.
    try {
      localStorage.setItem(
        `orderDetails_${orderDetails.id}`,
        JSON.stringify(orderDetails)
      );
      console.log(`Order ${orderDetails.id} saved to localStorage.`);
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
      alert("There was an error placing your order. Please try again.");
      return; // Stop if saving failed
    }

    // 3. Clear the Cart via context function
    clearCart();
    console.log("Cart cleared.");

    // 4. Navigate to Confirmation Page
    // Pass order ID and total for display on confirmation page
    navigate("/confirmation", {
      replace: true, // Prevent user from navigating back to this review page
      state: {
        orderId: orderDetails.id,
        total: orderDetails.total,
      },
    });
  };

  // Optional: Show loading indicator if cart is loading
  if (cartLoading) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading Order Review...
      </div>
    );
  }

  return (
    <div>
      {" "}
      {/* This component renders inside CheckoutLayout */}
      <CheckoutStepsIndicator currentStep="Review" />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column: Review Details */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8">
          {/* Order Items Summary */}
          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-black mb-4">
              Order Items ({itemCount})
            </h2>
            <div className="space-y-4">
              {/* Estimated Delivery */}
              <p className="text-base lg:text-lg font-medium text-black">
                Estimated delivery:{" "}
                <span className="font-bold text-green-700">
                  3 - 5 business days
                </span>{" "}
                {/* Example */}
              </p>
              {/* Item List */}
              {items.length > 0 ? (
                items.map((item: CartItemType) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <img
                      src={
                        item.imageUrl ||
                        "https://via.placeholder.com/80x80/cccccc/969696?text=N/A"
                      }
                      alt={item.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded border"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-black leading-tight">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-gray-500">
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>
                    <p className="text-base font-medium text-black flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-brand-gray-dark italic">
                  Your cart is empty. Cannot review order.
                </p>
              )}
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Shipping Address Summary */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-black">
                Shipping Address
              </h2>
              <Link
                to="/checkout/shipping"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                {" "}
                <FiEdit2 size={16} /> Edit{" "}
              </Link>
            </div>
            {/* TODO: Replace placeholder with actual selected shipping address */}
            <div className="text-base text-brand-gray-dark leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="font-semibold text-black">
                {placeholderShippingAddress.name}
              </p>
              <p>{placeholderShippingAddress.addressLine1}</p>
              <p>
                {placeholderShippingAddress.city},{" "}
                {placeholderShippingAddress.state}{" "}
                {placeholderShippingAddress.postalCode}
              </p>
              <p>{placeholderShippingAddress.country}</p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Payment Method Summary */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-black">
                Payment Method
              </h2>
              <Link
                to="/checkout/payment"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                {" "}
                <FiEdit2 size={16} /> Edit{" "}
              </Link>
            </div>
            {/* TODO: Replace placeholder with actual selected payment method */}
            <div className="text-base text-brand-gray-dark leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="font-semibold text-black">
                {placeholderPaymentMethod.type}
              </p>
              <p>Card ending in **** {placeholderPaymentMethod.last4}</p>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-2/5 xl:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            estimatedTax={estimatedTax}
            shippingCost={shippingCost}
            total={total}
            buttonText="Place Order" // Final action text
            onButtonClick={handlePlaceOrder} // Trigger final submission
            isButtonDisabled={items.length === 0 || cartLoading} // Disable if cart empty or loading
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderPage;
