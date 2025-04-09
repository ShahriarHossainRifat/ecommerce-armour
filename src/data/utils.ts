// src/data/utils.ts
import { Product } from "../types/product"; // Adjust path if your types are elsewhere
import { ALL_PRODUCTS_MOCK } from "./products"; // Import the single source of truth

/**
 * Finds a product by its ID from the mock data source.
 * @param id - The product ID (string or number).
 * @returns The Product object or undefined if not found.
 */
export const getProductById = (
  id: string | number | undefined
): Product | undefined => {
  if (id === undefined || id === null) return undefined;
  // Convert both to string for reliable comparison
  const stringId = String(id);
  return ALL_PRODUCTS_MOCK.find((p) => String(p.id) === stringId);
};

/**
 * Determines stock status based on product data.
 * @param product - The product object.
 * @returns An object with stockCount, hasStock, and isOutOfStock flags.
 */
export const checkStockStatus = (
  product: Product | undefined | null
): { stockCount: number; hasStock: boolean; isOutOfStock: boolean } => {
  if (!product) {
    return { stockCount: 0, hasStock: false, isOutOfStock: true };
  }
  // Ensure stock is a number, default to 0 if null/undefined
  const stockCount =
    typeof product.stock === "number" && !isNaN(product.stock)
      ? product.stock
      : 0;
  const hasStock = stockCount > 0;
  // Check explicit outOfStock flag first, then fallback to stock count
  const isOutOfStock = product.outOfStock === true || !hasStock;

  return { stockCount, hasStock, isOutOfStock };
};

/**
 * Fetches related products (placeholder/simulation).
 * @param currentProductId - The ID of the product to exclude.
 * @returns A promise resolving to an array of related products.
 */
export const fetchRelatedProducts = async (
  currentProductId: string | number
): Promise<Product[]> => {
  console.log(`Workspaceing related products for ID: ${currentProductId}`);
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay
  // Example: Return first 4 products, excluding the current one
  return ALL_PRODUCTS_MOCK.filter(
    (p) => String(p.id) !== String(currentProductId)
  ).slice(0, 4);
};

// Add other data-related utility functions here if needed
