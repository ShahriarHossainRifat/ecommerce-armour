// src/data/utils.ts
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product } from "../types/product"; // Assuming types are in src/types/product.ts
import { ALL_PRODUCTS_MOCK } from "./products"; // Assuming mock data is in src/data/products.ts

/**
 * Finds a product by its ID from the mock data source.
 * @param id - The product ID (string or number).
 * @returns The Product object or undefined if not found.
 */
export const getProductById = (
  id: string | number | undefined
): Product | undefined => {
  if (id === undefined || id === null) return undefined;
  // Convert both to string for reliable comparison in case of mixed types
  const stringId = String(id);
  return ALL_PRODUCTS_MOCK.find((p) => String(p.id) === stringId);
};

/**
 * Determines stock status based on product data.
 * Checks the optional outOfStock flag first, then the stock number.
 * @param product - The product object.
 * @returns An object with stockCount, hasStock (boolean), and isOutOfStock (boolean).
 */
export const checkStockStatus = (
  product: Product | undefined | null
): { stockCount: number; hasStock: boolean; isOutOfStock: boolean } => {
  if (!product) {
    // If no product data, assume out of stock
    return { stockCount: 0, hasStock: false, isOutOfStock: true };
  }
  // Ensure stock is a non-negative number, default to 0 if null/undefined/negative
  const stockCount =
    typeof product.stock === "number" && product.stock >= 0 ? product.stock : 0;
  const hasStock = stockCount > 0;
  // Check explicit outOfStock flag first, otherwise determine from stockCount
  const isOutOfStock = product.outOfStock === true || !hasStock;

  return { stockCount, hasStock, isOutOfStock };
};

/**
 * Fetches related products (placeholder/simulation).
 * In a real app, this would involve an API call based on category, tags, etc.
 * @param currentProductId - The ID of the product to exclude from related items.
 * @returns A promise resolving to an array of related products.
 */
export const fetchRelatedProducts = async (
  currentProductId: string | number
): Promise<Product[]> => {
  console.log(
    `Utils: Simulating fetch for related products for ID: ${currentProductId}`
  );
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate network delay
  // Example: Return first 4 products from the main list, excluding the current one
  // More sophisticated logic would filter by category/tags etc.
  const currentProduct = getProductById(currentProductId);
  const relatedCategory = currentProduct?.category;

  return ALL_PRODUCTS_MOCK.filter((p) => {
    // Exclude current product and potentially filter by category
    return (
      String(p.id) !== String(currentProductId) &&
      (!relatedCategory || p.category === relatedCategory)
    );
  }).slice(0, 4); // Limit to 4 related products
};

/**
 * Filters the main product list based on a search term.
 * Matches against title, description, category, subCategory, brand, and tags.
 * @param term - The search term string.
 * @returns An array of matching Product objects.
 */
export const searchProducts = (term: string): Product[] => {
  const lowerCaseTerm = term.trim().toLowerCase();
  if (!lowerCaseTerm) {
    return []; // Return empty array if search term is empty or whitespace only
  }
  console.log(`Utils: Searching products for: "${lowerCaseTerm}"`);

  // Filter logic (case-insensitive)
  const results = ALL_PRODUCTS_MOCK.filter((product) => {
    // Check for match in various fields, handling optional fields safely
    const titleMatch = product.title.toLowerCase().includes(lowerCaseTerm);
    const descriptionMatch = product.description
      ?.toLowerCase()
      .includes(lowerCaseTerm);
    const categoryMatch = product.category
      ?.toLowerCase()
      .includes(lowerCaseTerm);
    const subCategoryMatch = product.subCategory
      ?.toLowerCase()
      .includes(lowerCaseTerm);
    const brandMatch = product.brand?.toLowerCase().includes(lowerCaseTerm);
    const tagMatch = product.tags?.some((tag) =>
      tag.toLowerCase().includes(lowerCaseTerm)
    );

    return (
      titleMatch ||
      descriptionMatch ||
      categoryMatch ||
      subCategoryMatch ||
      brandMatch ||
      tagMatch
    );
  });

  console.log(`Utils: Found ${results.length} results for "${lowerCaseTerm}".`);
  return results;
};

// Add other utility functions below as needed (e.g., price formatting)
export const formatPrice = (amount: number): string => {
  // Basic formatting, consider using Intl.NumberFormat for more complex needs
  return `$${amount.toFixed(2)}`;
};
