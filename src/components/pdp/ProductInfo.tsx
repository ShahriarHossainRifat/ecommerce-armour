// src/components/pdp/ProductInfo.tsx
import React, { useState } from "react";
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { Product } from "../../types/product"; // Import type from central location
import { checkStockStatus } from "../../data/utils"; // Import stock check utility
import { useCart } from "../../contexts/CartContext"; // Import cart context
import { useAuth } from "../../contexts/AuthContext"; // Import Auth context
import { useWishlist } from "../../contexts/WishlistContext"; // Import Wishlist context
import { useNavigate, useLocation } from "react-router-dom"; // Import navigation hooks
// UI Components
import Button from "../ui/Button";
import Timer from "../ui/Timer";
import VariantSelector from "./VariantSelector";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import {
  FiStar,
  FiEye,
  FiHeart,
  FiShare2,
  FiMessageSquare,
  FiTag,
  FiLoader,
} from "react-icons/fi";

interface ProductInfoProps {
  product: Product; // Component expects a non-null Product object
}

// Helper function for formatting price
const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  // --- Context Hooks ---
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  // --- End Context Hooks ---

  // --- State ---
  const [selectedSize, setSelectedSize] = useState<string | null>(
    // Safely get the first size as default if sizes exist
    () => (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    // Safely get the first color as default if colors exist
    () =>
      product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false); // Loading state for Add to Cart button
  // Wishlist state is derived directly from context for consistency
  const isWishlisted = isInWishlist(product.id);
  // --- End State ---

  // --- Derived State ---
  // Use the utility function for consistent stock checking logic
  const { stockCount, hasStock, isOutOfStock } = checkStockStatus(product);
  // Determine if stock is low (only if it has stock)
  const isLowStock = hasStock && stockCount <= 10;
  // Placeholder target date for sale timer - replace with actual data if available
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 1);
  // --- End Derived State ---

  // --- Handlers ---
  const handleAddToCart = async () => {
    // Basic validation: check if variants are required and selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color.");
      return;
    }

    setIsAdding(true); // Set loading state for button
    console.log(
      `PDP: Adding ${quantity} of ${product.title} (Size: ${selectedSize}, Color: ${selectedColor})`
    );
    await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate async operation
    try {
      // Call the addToCart function from CartContext
      addToCart(product, quantity, selectedSize, selectedColor);
      // Optional: Add user feedback like a success toast/message
      // alert('Added to cart!');
    } catch (err) {
      console.error("PDP: Add to cart failed:", err);
      // Show specific error from context if possible, else generic message
      alert(err instanceof Error ? err.message : "Failed to add item to cart.");
    } finally {
      setIsAdding(false); // Reset loading state
    }
  };

  const handleWishlistToggle = () => {
    // Check authentication before allowing wishlist action
    if (!isAuthenticated) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login", { state: { from: location }, replace: true }); // Redirect to login
      return;
    }
    const currentId = product.id;
    // Call context functions to add/remove
    if (isWishlisted) {
      removeFromWishlist(currentId);
    } else {
      addToWishlist(currentId);
    }
    // Note: Local isWishlisted state removed, UI relies on context value now
  };
  // --- End Handlers ---

  // --- Render ---
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Vendor */}
      {product.vendor && (
        <p className="text-sm font-normal text-brand-gray uppercase tracking-[0.24em]">
          {product.vendor}
        </p>
      )}

      {/* Title & Wishlist Button */}
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-3xl lg:text-[32px] font-semibold text-black leading-tight">
          {product.title}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className={`border rounded-full p-2.5 transition-colors duration-200 ${
            isWishlisted
              ? "text-red-500 border-red-300 bg-red-50"
              : "text-brand-gray-dark border-gray-300 hover:text-red-500 hover:bg-red-50"
          }`}
          onClick={handleWishlistToggle}
          aria-pressed={isWishlisted}
          ariaLabel={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <FiHeart
            className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
          />
        </Button>
      </div>

      {/* Rating */}
      {typeof product.rating === "number" && product.rating > 0 && (
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5"
            title={`${product.rating.toFixed(1)} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating ?? 0)
                    ? "text-brand-warning fill-current"
                    : "text-gray-300 fill-current"
                }`}
              />
            ))}
          </div>
          {typeof product.reviewCount === "number" &&
            product.reviewCount > 0 && (
              <span className="text-sm text-brand-gray-dark">
                ({product.reviewCount} Customer Review
                {product.reviewCount !== 1 ? "s" : ""})
              </span>
            )}
        </div>
      )}

      {/* Description Snippet */}
      {product.description && (
        <p className="text-base text-black leading-relaxed">
          {product.description.substring(0, 150)}
          {product.description.length > 150 ? "..." : ""}
        </p>
      )}

      {/* Price */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-2xl lg:text-3xl font-bold text-black">
          {formatPrice(product.price)}
        </span>
        {typeof product.originalPrice === "number" &&
          product.originalPrice > product.price && (
            <>
              <span className="text-lg text-brand-error line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="px-2.5 py-1 bg-brand-error text-white text-xs font-semibold rounded-full">
                {" "}
                SAVE{" "}
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %{" "}
              </span>
            </>
          )}
      </div>

      {/* People Viewing */}
      <div className="flex items-center gap-2 text-sm text-brand-gray-dark">
        {" "}
        <FiEye className="w-4 h-4" />{" "}
        <span>24 people are viewing this right now</span>{" "}
      </div>

      {/* Sale Timer */}
      {product.tags?.includes("Sale") && (
        <div className="p-3 bg-brand-sale-tag-bg border ...">
          {" "}
          <span className="...">Hurry up! Sale ends in:</span>{" "}
          <Timer targetDate={saleEndDate} />{" "}
        </div>
      )}

      {/* Stock Info */}
      {isLowStock && (
        <div className="space-y-1.5">
          {" "}
          <p className="text-sm text-brand-gray-dark">
            Only {stockCount} item(s) left in stock!
          </p>{" "}
          <div className="relative w-full h-[5px] bg-brand-sale-tag-bg ...">
            {" "}
            <div
              className="absolute ... bg-brand-sale-tag"
              style={{ width: `${Math.min(100, (stockCount / 10) * 100)}%` }}
            ></div>{" "}
          </div>{" "}
        </div>
      )}
      {isOutOfStock && !isLowStock && (
        <p className="text-sm font-semibold text-brand-error-alt">
          Out of Stock!
        </p>
      )}

      {/* Variant Selectors */}
      {product.sizes && product.sizes.length > 0 && (
        <VariantSelector
          title="Size"
          options={product.sizes}
          selectedValue={selectedSize}
          onChange={setSelectedSize}
          className="pt-2"
        />
      )}
      {product.colors && product.colors.length > 0 && (
        <ColorSelector
          title="Color"
          options={product.colors}
          selectedValue={selectedColor}
          onChange={setSelectedColor}
          className="pt-2"
        />
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-4">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          maxQuantity={stockCount}
          disabled={isOutOfStock || isAdding}
        />
        <Button
          variant="dark"
          size="lg"
          className="flex-grow h-[42.6px] text-base"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
        >
          {isAdding ? <FiLoader className="animate-spin h-5 w-5 mr-2" /> : null}
          {isAdding
            ? "Adding..."
            : isOutOfStock
            ? "Out of Stock"
            : "Add to cart"}
        </Button>
      </div>

      {/* Product Tools/Links */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-base text-black">
        <button className="flex items-center gap-2.5 hover:text-brand-primary transition-colors">
          <FiHeart className="w-5 h-5" /> Compare
        </button>
        <button className="flex items-center gap-2.5 hover:text-brand-primary transition-colors">
          <FiMessageSquare className="w-5 h-5" /> Ask a Question
        </button>
        <button className="flex items-center gap-2.5 hover:text-brand-primary transition-colors">
          <FiShare2 className="w-5 h-5" /> Share
        </button>
        {product.tags && product.tags.length > 0 && (
          <div className="flex items-center gap-2.5">
            <FiTag className="w-5 h-5" />{" "}
            <span className="text-brand-gray-dark">
              Tags: {product.tags.join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
