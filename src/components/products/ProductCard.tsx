// src/components/products/ProductCard.tsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiStar, FiShoppingCart } from "react-icons/fi";
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { Product } from "../../types/product"; // Import from central types file
import { checkStockStatus } from "../../data/utils"; // Import stock check utility
import Button from "../ui/Button";
import { useWishlist } from "../../contexts/WishlistContext"; // Import Wishlist hook
import { useAuth } from "../../contexts/AuthContext"; // Import Auth hook
import { useCart } from "../../contexts/CartContext"; // Import Cart hook

// Ensure Product interface is imported, not defined here if centralized

interface ProductCardProps {
  product: Product;
  className?: string;
  showAddToCartButton?: boolean; // Prop to optionally show hover button
}

// Helper function (can be moved to a utils file)
const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  showAddToCartButton = false,
}) => {
  // --- Context Hooks ---
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart function
  const navigate = useNavigate();
  const location = useLocation();
  // --- End Context Hooks ---

  // --- Derived State ---
  // Use the utility function for consistent stock checking logic
  const { isOutOfStock } = checkStockStatus(product);
  // Check wishlist status from context
  const isWishlisted = isInWishlist(product.id);
  // Determine if sale tag should be shown
  const hasSaleTag =
    product.tags?.includes("Flash Sale") ||
    (typeof product.originalPrice === "number" &&
      product.price < product.originalPrice);
  // --- End Derived State ---

  // --- Handlers ---
  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent link navigation
    if (!isAuthenticated) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login", { state: { from: location } }); // Redirect to login, pass current location
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product.id); // Call context function
    } else {
      addToWishlist(product.id); // Call context function
    }
  };

  // Handler for the optional Add to Cart button on the card
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Check for variants (size or color) that require selection on PDP
    const requiresOptions =
      (product.sizes && product.sizes.length > 0) ||
      (product.colors && product.colors.length > 0);

    if (requiresOptions) {
      // If options are needed, redirect user to the product page
      alert("Please select size/color on the product page.");
      navigate(`/products/${product.id}`);
      return;
    }

    // If no options required, add quantity 1 directly using context
    try {
      addToCart(product, 1); // Use context function
      alert(`Added ${product.title} to cart!`); // Simple feedback
      // Optionally open MiniCart here (would require passing down toggle function or using global state)
    } catch (error) {
      console.error("Failed to add to cart from card:", error);
      alert(
        error instanceof Error ? error.message : "Could not add item to cart."
      ); // Show error from context if available
    }
  };
  // --- End Handlers ---

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden group relative transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      {/* Image Section */}
      <div className="relative h-[330px] bg-brand-placeholder-bg">
        <Link
          to={`/products/${product.id}`}
          className="block w-full h-full"
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={
              product.imageUrl ||
              "https://via.placeholder.com/262x330/cccccc/969696?text=No+Image"
            }
            alt={product.title ?? "Product Image"}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {/* Tags (Top Left) */}
        {(hasSaleTag || product.isNew) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.tags?.includes("Flash Sale") && (
              <span className="px-2.5 py-0.5 bg-brand-dark-alt text-white text-xs font-medium rounded-full shadow">
                Flash Sale
              </span>
            )}
            {!product.tags?.includes("Flash Sale") && hasSaleTag && (
              <span className="px-2.5 py-0.5 bg-brand-error text-white text-xs font-medium rounded-full shadow">
                Sale
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full shadow">
                New
              </span>
            )}
          </div>
        )}
        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-pressed={isWishlisted}
          className={`absolute top-3 right-3 z-10 w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center transition-colors shadow ${
            isWishlisted
              ? "text-red-500"
              : "text-brand-blue-gray hover:text-red-500"
          }`}
        >
          <FiHeart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
            <span className="text-brand-error-alt font-bold text-sm uppercase px-3 py-1 bg-white/70 rounded">
              Out of Stock
            </span>
          </div>
        )}
        {/* ADD TO CART BUTTON ON HOVER */}
        {showAddToCartButton && !isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              className="h-10 text-sm"
              onClick={handleAddToCartClick}
              aria-label={`Add ${product.title} to cart`}
              // Optionally add loading state here too if needed
            >
              <FiShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-3">
        {/* Vendor */}
        {product.vendor && (
          <div className="flex items-center gap-1 text-sm text-brand-blue-gray">
            {" "}
            <span className="w-3 h-3 bg-brand-blue-gray rounded-full inline-block"></span>{" "}
            <span>{product.vendor}</span>{" "}
          </div>
        )}
        {/* Title */}
        <Link
          to={`/products/${product.id}`}
          className="block hover:text-brand-primary"
        >
          <h3
            className="text-lg font-semibold text-black truncate"
            title={product.title ?? undefined}
          >
            {" "}
            {product.title ?? "Untitled Product"}{" "}
          </h3>
        </Link>
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
                  className={`w-4 h-4 ${
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
                  ({product.reviewCount})
                </span>
              )}
          </div>
        )}
        {/* Price & Colors */}
        <div className="flex justify-between items-center min-h-[28px]">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg lg:text-xl font-bold text-black">
              {formatPrice(product.price)}
            </span>
            {typeof product.originalPrice === "number" &&
              product.originalPrice > product.price && (
                <span className="text-sm text-brand-error line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex space-x-1.5 flex-shrink-0">
              {product.colors.slice(0, 3).map((color, index) => (
                <span
                  key={index}
                  className="block w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
