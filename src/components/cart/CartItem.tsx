// src/components/cart/CartItem.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { CartItemType } from "../../types/product"; // Import type from central location
import QuantitySelector from "../pdp/QuantitySelector"; // Import QuantitySelector

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void; // Expects handler from parent
  onRemoveItem: (cartItemId: string) => void;
}

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  // Handler to be passed to QuantitySelector
  // Calls the onUpdateQuantity prop received from MiniCart
  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(item.cartItemId, newQuantity);
  };

  // --- DEBUGGING: Log the quantity prop received ---
  console.log(`CartItem (${item.title}) quantity prop:`, item.quantity);
  // --- END DEBUGGING ---

  return (
    <div className="flex items-start gap-4 py-4">
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <img
          src={
            item.imageUrl ||
            "https://via.placeholder.com/105x105/cccccc/969696?text=Item"
          }
          alt={item.title ?? "Cart item"}
          className="w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] object-cover rounded-lg border border-gray-100"
        />
      </Link>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between min-h-[90px] sm:min-h-[105px]">
        <div>
          <Link
            to={`/products/${item.id}`}
            className="hover:text-brand-primary transition-colors"
          >
            <h4 className="text-sm sm:text-base font-medium text-black mb-1 line-clamp-2">
              {item.title}
            </h4>
          </Link>
          <div className="text-xs text-brand-gray-dark space-x-2 mb-1">
            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
            {item.selectedColor && (
              <span className="inline-flex items-center gap-1">
                {" "}
                Color:{" "}
                <span
                  className="w-3 h-3 rounded-full inline-block border border-gray-300"
                  style={{ backgroundColor: item.selectedColor }}
                ></span>{" "}
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base font-medium text-black">
            {" "}
            {formatPrice(item.price)}{" "}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="mt-1">
          <QuantitySelector
            quantity={item.quantity} // Display quantity from item prop
            setQuantity={handleQuantityChange} // Pass the specific handler for this item
            maxQuantity={item.stock ?? undefined} // Use stock from item if available
            className="h-[30px] text-sm" // Smaller version for cart
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemoveItem(item.cartItemId)}
        className="text-brand-gray hover:text-red-600 hover:bg-red-50 rounded-full p-1 flex-shrink-0 transition-colors duration-150 mt-1 self-start"
        aria-label={`Remove ${item.title} from cart`}
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

export default CartItem;
