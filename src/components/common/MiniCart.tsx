// src/components/common/MiniCart.tsx
import React from "react";
import { FiX, FiShoppingCart } from "react-icons/fi";
import Button from "../ui/Button";
import CartItem from "../cart/CartItem";
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { CartItemType } from "../../types/product"; // Import TYPE from central location
import { useCart } from "../../contexts/CartContext";

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onClose }) => {
  // 'items' from useCart is now consistently CartItemType[]
  const { items, itemCount, cartTotal, updateQuantity, removeItem } = useCart();

  // Define handlers that call context functions
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    updateQuantity(cartItemId, newQuantity);
  };
  const handleRemoveItem = (cartItemId: string) => {
    removeItem(cartItemId);
  };

  const handleCloseAndNavigate = () => {
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-semibold text-black">Shopping Cart</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-800"
          aria-label="Close cart"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Cart Items List */}
      {items.length > 0 ? (
        <div className="flex-grow overflow-y-auto px-4">
          <p className="text-sm text-gray-600 py-3">
            You have {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </p>
          <div className="divide-y divide-gray-100">
            {/* Map over items from context state */}
            {/* Explicit type '(item: CartItemType)' now matches inferred type from 'items' */}
            {items.map((item: CartItemType) => (
              <CartItem
                key={item.cartItemId}
                item={item} // Pass the item object (now correctly typed)
                // Pass the correct handlers down
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <FiShoppingCart size={48} className="text-gray-300 mb-4" />
          <p className="text-brand-gray-dark text-lg">Your cart is empty.</p>
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="mt-6"
          >
            Continue Shopping
          </Button>
        </div>
      )}

      {/* Footer: Subtotal & Buttons */}
      {items.length > 0 && (
        <div className="p-4 border-t border-gray-200 flex-shrink-0 space-y-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-black">Subtotal</span>
            <span className="text-lg font-bold text-black">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              size="lg"
              to="/cart"
              onClick={handleCloseAndNavigate}
              className="h-[57px] border-black text-black hover:bg-gray-100"
            >
              {" "}
              View Cart{" "}
            </Button>
            <Button
              variant="dark"
              fullWidth
              size="lg"
              to="/checkout/shipping"
              onClick={handleCloseAndNavigate}
              className="h-[57px]"
            >
              {" "}
              Checkout{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
