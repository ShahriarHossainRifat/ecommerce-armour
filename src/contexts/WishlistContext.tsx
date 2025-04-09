// src/contexts/WishlistContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
// Assuming Product type is correctly defined and exported from your types file
// If not, define Product interface here or import correctly
// import { Product } from '../types/product'; // Adjust path if needed

interface WishlistContextType {
  wishlistItems: (string | number)[]; // Array of product IDs
  addToWishlist: (productId: string | number) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  loading: boolean; // Loading state for initial load from storage
}

// Create context with undefined default value
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

// Use a generic key for demo, or make user-specific
const WISHLIST_STORAGE_KEY = "demo_wishlist_items";

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true); // Start loading initially
  // const { user } = useAuth(); // Uncomment if making user-specific
  // const userSpecificKey = user ? `wishlist_${user.id}` : WISHLIST_STORAGE_KEY; // Example user-specific key

  // Load wishlist from localStorage on initial mount
  useEffect(
    () => {
      setLoading(true);
      try {
        // Use generic key for now, switch to userSpecificKey if implementing user-specific lists
        const storedItemsJson = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (storedItemsJson) {
          const storedItems = JSON.parse(storedItemsJson);
          // Validate that stored data is an array
          if (Array.isArray(storedItems)) {
            setWishlistItems(storedItems);
            console.log(
              "WishlistContext: Wishlist loaded from localStorage.",
              storedItems
            );
          } else {
            console.warn(
              "WishlistContext: Invalid data found in localStorage, clearing."
            );
            localStorage.removeItem(WISHLIST_STORAGE_KEY);
          }
        } else {
          console.log("WishlistContext: No wishlist found in localStorage.");
        }
      } catch (error) {
        console.error("WishlistContext: Failed to load wishlist:", error);
        localStorage.removeItem(WISHLIST_STORAGE_KEY); // Clear potentially corrupted data
      } finally {
        setLoading(false); // Mark loading as complete
      }
      // Add userSpecificKey to dependency array if using it
    },
    [
      /* userSpecificKey */
    ]
  );

  // Save wishlist to localStorage whenever it changes (and not during initial load)
  useEffect(() => {
    // Avoid writing the initial empty array to storage before loading finishes
    if (!loading) {
      try {
        localStorage.setItem(
          WISHLIST_STORAGE_KEY /* or userSpecificKey */,
          JSON.stringify(wishlistItems)
        );
        console.log("WishlistContext: Wishlist saved to localStorage.");
      } catch (error) {
        console.error("WishlistContext: Failed to save wishlist:", error);
      }
    }
  }, [wishlistItems, loading /*, userSpecificKey */]);

  // Add product ID to wishlist if it doesn't exist
  const addToWishlist = useCallback((productId: string | number) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.includes(productId)) {
        console.log(`WishlistContext: Adding ${productId}`);
        return [...prevItems, productId];
      }
      return prevItems; // Return same array if already exists
    });
  }, []);

  // Remove product ID from wishlist
  const removeFromWishlist = useCallback((productId: string | number) => {
    setWishlistItems((prevItems) => {
      console.log(`WishlistContext: Removing ${productId}`);
      return prevItems.filter((id) => id !== productId); // Filter out the item
    });
  }, []);

  // Check if a product ID is in the wishlist
  const isInWishlist = useCallback(
    (productId: string | number): boolean => {
      // Ensure productId is treated consistently (e.g., as string) if necessary
      return wishlistItems.some((id) => String(id) === String(productId));
    },
    [wishlistItems]
  );

  // Memoize the context value
  const value = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      loading,
    }),
    [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, loading]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
