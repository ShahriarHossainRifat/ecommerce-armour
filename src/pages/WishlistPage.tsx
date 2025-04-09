// src/pages/WishlistPage.tsx
import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for breadcrumbs/buttons
import { useAuth } from "../contexts/AuthContext";
import { useWishlist } from "../contexts/WishlistContext";
import { getProductById } from "../data/utils"; // Utility to get product details by ID
import { Product } from "../types/product"; // Import Product type
import ProductCard from "../components/products/ProductCard"; // Import ProductCard to display items
import Breadcrumbs from "../components/common/Breadcrumbs";
import Button from "../components/ui/Button"; // Import Button for "Start Shopping"
import { FiHeart, FiLoader } from "react-icons/fi"; // Icons for empty state and loading

const WishlistPage: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    wishlistItems,
    loading: wishlistLoading,
    removeFromWishlist,
  } = useWishlist(); // Get remove function
  const navigate = useNavigate();

  // --- Protected Route Check ---
  // Redirects if user is not logged in AFTER initial auth check is done
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/wishlist" }, replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);
  // --- End Protected Route Check ---

  // --- Get Product Details for Wishlist Items ---
  // Memoize the result to avoid re-calculating on every render unless dependencies change
  const productsInWishlist = useMemo(() => {
    // Don't process until wishlist items are loaded and auth status is known
    if (wishlistLoading || authLoading) return [];
    // Map IDs to full product objects using the utility function
    return wishlistItems
      .map((id) => getProductById(id)) // Get product data from our mock source
      .filter((product): product is Product => product !== undefined); // Filter out any potential undefined results
  }, [wishlistItems, wishlistLoading, authLoading]);
  // --- End Get Product Details ---

  // Combine loading states
  const isLoading = authLoading || wishlistLoading;

  // --- Render Loading State ---
  if (isLoading) {
    return (
      // Simple centered loader
      <div className="container mx-auto px-4 py-8 text-center flex justify-center items-center min-h-[40vh]">
        <FiLoader className="animate-spin text-brand-primary text-3xl" />
      </div>
    );
  }
  // --- End Loading State ---

  // --- Auth Guard Render ---
  // If still not authenticated after loading checks (shouldn't happen if redirect works, but safe)
  if (!isAuthenticated) {
    return null;
  }
  // --- End Auth Guard ---

  // Breadcrumb data for this page
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wishlist" }];

  return (
    // Rendered within main Layout (Navbar/Footer)
    <div>
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-8">My Wishlist</h1>

        {productsInWishlist.length > 0 ? (
          // --- Wishlist Grid ---
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {productsInWishlist.map((product) => (
              // Render ProductCard directly. Its internal heart icon button
              // will now correctly call removeFromWishlist because the item
              // IS in the wishlist (isInWishlist(product.id) will be true).
              <ProductCard
                key={product.id}
                product={product}
                // Optionally show Add to Cart button on hover here too
                // showAddToCartButton={true}
              />
              // *** REMOVED the separate absolute positioned cross (FiX) button ***
            ))}
          </div>
        ) : (
          // --- End Wishlist Grid ---
          // --- Empty Wishlist State ---
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FiHeart size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-brand-gray-dark mb-4">
              Your wishlist is empty.
            </p>
            <p className="text-gray-500 mb-6">
              Add items you love by clicking the heart icon!
            </p>
            <Button to="/products" variant="primary" size="md">
              Start Shopping
            </Button>
          </div>
          // --- End Empty Wishlist State ---
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
