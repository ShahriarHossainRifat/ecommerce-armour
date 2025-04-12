// src/data/deals.ts
// Import the type definition
import { DealItem } from "../types/product"; // Adjust path if needed

import dealImage1Src from "../assets/images/Deals/deal-image-1.webp";
import dealImage2Src from "../assets/images/Deals/deal-image-2.webp";
import dealImage3Src from "../assets/images/Deals/deal-image-3.webp";
import dealImage4Src from "../assets/images/Deals/deal-image-4.webp";
import dealImage5Src from "../assets/images/Deals/deal-image-5.webp";

// Ensure these product IDs exist in ALL_PRODUCTS_MOCK and are marked as Sale
export const dealsData: DealItem[] = [
  {
    id: 1,
    productId: "w-004", // Example Product ID
    imageUrl: dealImage1Src, // Use imported variable
    altText: "Woman wearing stylish peacoat", // Descriptive alt text
    tagline: "01 — Fall Sale",
    discount: "23% OFF",
  },
  {
    id: 2,
    productId: "m-002", // Example Product ID
    imageUrl: dealImage2Src, // Use imported variable
    altText: "Man wearing slim fit chinos", // Descriptive alt text
    tagline: "02 — Smart Casual",
    discount: "24% OFF",
  },
  {
    id: 3,
    productId: "m-009", // Example Product ID
    imageUrl: dealImage3Src, // Use imported variable
    altText: "Olive green lightweight bomber jacket", // Descriptive alt text
    tagline: "03 — Weekend Deal",
    discount: "17% OFF",
  },
  {
    id: 4,
    productId: "a-004", // Example Product ID
    imageUrl: dealImage4Src, // Use imported variable
    altText: "Soft patterned wool scarf", // Descriptive alt text
    tagline: "04 — Cozy Up",
    discount: "25% OFF",
  },
  {
    id: 5,
    productId: "m-005", // Example Product ID
    imageUrl: dealImage5Src, // Use imported variable
    altText: "Man wearing performance hoodie", // Descriptive alt text
    tagline: "05 — Active Gear",
    discount: "10% OFF",
  },
];

export type { DealItem };
// Note: You might need to adjust the discount text % here to match the calculated discount
// in ALL_PRODUCTS_MOCK for consistency, or calculate it dynamically.
// Also ensure product m-005 is marked as on sale or has originalPrice in ALL_PRODUCTS_MOCK.
