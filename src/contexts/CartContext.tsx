// src/contexts/CartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { Product, CartItemType } from "../types/product"; // Import both types

interface CartContextType {
  items: CartItemType[];
  itemCount: number;
  cartTotal: number;
  addToCart: (
    product: Product,
    quantity: number,
    size?: string | null,
    color?: string | null
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  loading: boolean; // For initial load from storage
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = "demo_cart_items"; // Key for localStorage persistence

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    setLoading(true);
    console.log("CartContext: Checking localStorage for cart items...");
    try {
      const storedItemsJson = localStorage.getItem(CART_STORAGE_KEY);
      if (storedItemsJson) {
        const storedItems = JSON.parse(storedItemsJson);
        // Basic validation: ensure it's an array
        if (Array.isArray(storedItems)) {
          setItems(storedItems);
          console.log(
            "CartContext: Cart loaded from localStorage.",
            storedItems
          );
        } else {
          console.warn(
            "CartContext: Invalid cart data found in localStorage, clearing."
          );
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } else {
        console.log("CartContext: No cart found in localStorage.");
      }
    } catch (error) {
      console.error(
        "CartContext: Failed to load cart from localStorage:",
        error
      );
      localStorage.removeItem(CART_STORAGE_KEY); // Clear potentially corrupted data
    } finally {
      setLoading(false); // Finished initial load attempt
    }
  }, []); // Run only once on mount

  // Save cart to localStorage whenever it changes (and not during initial load)
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        console.log("CartContext: Cart saved to localStorage.");
      } catch (error) {
        console.error(
          "CartContext: Failed to save cart to localStorage:",
          error
        );
      }
    }
  }, [items, loading]);

  // Helper to generate unique ID based on product and selected variants
  const generateCartItemId = (
    productId: string | number,
    size?: string | null,
    color?: string | null
  ): string => {
    // Normalize undefined/null to consistent strings for the ID
    const sizeId = size || "nosize";
    const colorId = color || "nocolor";
    return `${productId}-${sizeId}-${colorId}`;
  };

  // Add item to cart or update quantity if exists
  const addToCart = useCallback(
    (
      product: Product,
      quantity: number,
      size?: string | null,
      color?: string | null
    ) => {
      console.log(
        `CartContext: Attempting addToCart - Product ID: ${product.id}, Qty: ${quantity}, Size: ${size}, Color: ${color}`
      );
      setItems((prevItems) => {
        const cartItemId = generateCartItemId(product.id, size, color);
        const existingItemIndex = prevItems.findIndex(
          (item) => item.cartItemId === cartItemId
        );
        // Determine available stock, defaulting to Infinity if stock info is missing/invalid
        const availableStock =
          typeof product.stock === "number" && product.stock >= 0
            ? product.stock
            : Infinity;
        const isExplicitlyOutOfStock = product.outOfStock === true; // Check flag

        console.log(
          `CartContext: Item ${cartItemId} - Available Stock: ${availableStock}, Explicit OOS: ${isExplicitlyOutOfStock}`
        );

        // Prevent adding if explicitly out of stock OR stock count is zero or less
        if (isExplicitlyOutOfStock || availableStock <= 0) {
          console.warn(
            `CartContext: Add failed for ${cartItemId} - Out of stock.`
          );
          alert("Sorry, this item is currently out of stock.");
          return prevItems; // Return current state unchanged
        }

        if (existingItemIndex > -1) {
          // Item exists, update quantity
          const updatedItems = [...prevItems];
          const currentItem = updatedItems[existingItemIndex];
          // Use the stock count from the item already in the cart for consistency
          const currentAvailableStock =
            typeof currentItem.stock === "number" && currentItem.stock >= 0
              ? currentItem.stock
              : Infinity;
          // Calculate new quantity, capped by available stock
          const newQuantity = Math.min(
            currentItem.quantity + quantity,
            currentAvailableStock
          );

          if (newQuantity > currentItem.quantity) {
            // Only update if quantity actually increases
            updatedItems[existingItemIndex] = {
              ...currentItem,
              quantity: newQuantity,
            };
            console.log(
              `CartContext: Updated quantity for ${cartItemId} to ${newQuantity}`
            );
            if (newQuantity === currentAvailableStock) {
              alert("Max available stock reached for this item."); // Alert only when hitting max
            }
            return updatedItems;
          } else {
            // Alert if trying to add more but already at max stock
            if (currentItem.quantity === currentAvailableStock) {
              alert("Max available stock already in cart for this item.");
            }
            return prevItems; // No change if already at max stock or adding 0/negative
          }
        } else {
          // Add new item, ensuring quantity doesn't exceed stock
          const quantityToAdd = Math.min(quantity, availableStock);
          if (quantityToAdd <= 0) {
            // Safety check if trying to add 0 or negative
            return prevItems;
          }
          const newItem: CartItemType = {
            ...product, // Spread all properties from the Product object
            cartItemId, // Assign the unique cart item ID
            quantity: quantityToAdd, // Add the validated quantity
            selectedSize: size, // Store selected size
            selectedColor: color, // Store selected color
            // Note: 'stock' property is inherited from 'product' spread
          };
          // Alert if the requested quantity was reduced due to stock limits
          if (quantityToAdd < quantity) {
            alert(
              `Only ${quantityToAdd} item(s) could be added due to stock limits.`
            );
          }
          console.log(`CartContext: Added new item ${cartItemId}`, newItem);
          return [...prevItems, newItem];
        }
      });
    },
    []
  ); // No external dependencies needed due to functional updates

  // Update quantity for an existing item
  const updateQuantity = useCallback(
    (cartItemId: string, newQuantity: number) => {
      console.log(
        `CartContext: Attempting updateQuantity - Item ID: ${cartItemId}, New Qty: ${newQuantity}`
      );
      setItems(
        (prevItems) =>
          prevItems
            .map((item) => {
              if (item.cartItemId === cartItemId) {
                const availableStock =
                  typeof item.stock === "number" && item.stock >= 0
                    ? item.stock
                    : Infinity;
                // Ensure quantity is at least 0 and not more than available stock
                const updatedQuantity = Math.min(
                  Math.max(0, newQuantity),
                  availableStock
                );
                // Alert if user tries to exceed stock via input/update
                if (
                  updatedQuantity === availableStock &&
                  newQuantity > updatedQuantity
                ) {
                  alert("Max available stock reached for this item.");
                }
                console.log(
                  `CartContext: Quantity for ${cartItemId} set to ${updatedQuantity}`
                );
                return { ...item, quantity: updatedQuantity };
              }
              return item;
            })
            .filter((item) => item.quantity > 0) // Remove item if quantity becomes 0 after update
      );
    },
    []
  );

  // Remove item from cart
  const removeItem = useCallback((cartItemId: string) => {
    setItems((prevItems) => {
      console.log(`CartContext: Removing item ${cartItemId}`);
      return prevItems.filter((item) => item.cartItemId !== cartItemId);
    });
  }, []);

  // Clear the entire cart
  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY); // Also clear storage
    console.log("CartContext: Cart cleared");
  }, []);

  // Calculate derived values: total item count and cart total price
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  // Memoize the context value provided to consumers
  const value = useMemo(
    () => ({
      items,
      itemCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      loading, // Include loading state
    }),
    [
      items,
      itemCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      loading,
    ]
  ); // Ensure loading is dependency

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for easy context consumption
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
