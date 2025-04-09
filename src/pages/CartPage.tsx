// src/pages/CartPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import cart context hook
// Import reusable components
import Button from "../components/ui/Button";
import QuantitySelector from "../components/pdp/QuantitySelector";
import OrderSummary from "../components/checkout/OrderSummary"; // Reuse Order Summary
import Breadcrumbs from "../components/common/Breadcrumbs";
// Import types and helpers
import { CartItemType } from "../types/product"; // Ensure path is correct
import { FiShoppingCart } from "react-icons/fi"; // Icons

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const CartPage: React.FC = () => {
  const {
    items,
    itemCount,
    cartTotal,
    updateQuantity,
    removeItem,
    loading: cartLoading, // Use loading state from context if needed
  } = useCart();
  const navigate = useNavigate();

  // State for promo code (if managed locally on this page)
  const [] = useState("");

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    updateQuantity(cartItemId, newQuantity);
  };

  const handleRemoveItem = (cartItemId: string) => {
    // Optional: Add a confirmation dialog here
    removeItem(cartItemId);
  };


  const handleCheckout = () => {
    // TODO: Add checks if needed (e.g., minimum order amount)
    navigate("/checkout/shipping");
  };

  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Shopping Cart" }];

  return (
    <div>
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          Shopping Cart
        </h1>

        {cartLoading ? (
          <div className="text-center py-16">Loading Cart...</div> // Basic loading state
        ) : items.length === 0 ? (
          // --- Empty Cart State ---
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FiShoppingCart size={56} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-brand-gray-dark mb-4">
              Your shopping cart is empty.
            </p>
            <p className="text-gray-500 mb-6">
              Add items to your cart to see them here.
            </p>
            <Button to="/products" variant="primary" size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          // --- End Empty Cart State ---
          // --- Cart Content Layout ---
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Left Side: Cart Items List */}
            <div className="w-full lg:w-2/3 space-y-4">
              {/* Header Row (Optional, for table-like structure) */}
              <div className="hidden md:grid grid-cols-6 gap-4 pb-2 border-b font-semibold text-sm text-brand-gray-dark uppercase">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>

              {/* Cart Item Rows */}
              {items.map((item: CartItemType) => (
                <div
                  key={item.cartItemId}
                  className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border-b py-4"
                >
                  {/* Product Info (Image, Title, Variants) */}
                  <div className="col-span-3 flex items-center gap-4 w-full">
                    <Link to={`/products/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.imageUrl || "..."}
                        alt={item.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link
                        to={`/products/${item.id}`}
                        className="hover:text-brand-primary transition-colors"
                      >
                        <h3 className="text-base md:text-lg font-medium text-black line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                      <div className="text-xs text-brand-gray-dark mt-1">
                        {item.selectedSize && (
                          <span>Size: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span
                            className={`ml-2 ${
                              item.selectedSize ? "border-l pl-2" : ""
                            }`}
                          >
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {!item.selectedSize && !item.selectedColor && (
                          <span className="italic">Standard</span>
                        )}
                      </div>
                      {/* Remove button (more prominent here than mini-cart) */}
                      <button
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        className="text-xs text-red-600 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {/* Price */}
                  <div className="text-base text-black text-center w-full md:w-auto">
                    <span className="md:hidden font-medium mr-2">Price:</span>{" "}
                    {formatPrice(item.price)}
                  </div>
                  {/* Quantity */}
                  <div className="flex justify-center w-full md:w-auto">
                    <QuantitySelector
                      quantity={item.quantity}
                      setQuantity={(newQty) =>
                        handleUpdateQuantity(item.cartItemId, newQty)
                      }
                      maxQuantity={item.stock ?? undefined}
                      className="h-10 text-sm" // Slightly smaller quantity selector
                    />
                  </div>
                  {/* Total */}
                  <div className="text-base font-semibold text-black text-right w-full md:w-auto">
                    <span className="md:hidden font-medium mr-2">Total:</span>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
              {/* Link to continue shopping */}
              <div className="pt-4">
                <Link
                  to="/products"
                  className="text-brand-primary hover:underline font-medium"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-1/3">
              {/* Reuse the OrderSummary component */}
              <OrderSummary
                subtotal={cartTotal}
                // Pass actual tax/shipping if calculated, otherwise use placeholders
                estimatedTax={cartTotal * 0.05} // Example 5% tax
                shippingCost={itemCount > 0 ? 15.0 : 0} // Example flat rate or free
                total={
                  cartTotal + cartTotal * 0.05 + (itemCount > 0 ? 15.0 : 0)
                } // Example total calculation
                buttonText="Proceed to Checkout"
                onButtonClick={handleCheckout}
                isButtonDisabled={items.length === 0} // Disable if cart is empty
                // Pass down promo code logic if implemented here
                // promoCode={promoCode}
                // onPromoCodeChange={setPromoCode}
                // onApplyPromoCode={handleApplyPromo}
              />
            </div>
            {/* --- End Cart Content Layout --- */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
