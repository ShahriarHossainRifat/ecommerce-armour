// src/data/deals.ts
// Import the type definition
import { DealItem } from "../types/product"; // Adjust path if needed

// Ensure these product IDs exist in ALL_PRODUCTS_MOCK and are marked as Sale
export const dealsData: DealItem[] = [
  {
    id: 1,
    productId: "w-004",
    imageUrl:
      "https://via.placeholder.com/334x481/556B2F/EEE8AA?text=Women+Peacoat",
    altText: "Woman in Peacoat",
    tagline: "01 — Fall Sale",
    discount: "23% OFF",
  }, // w-004 IS on sale
  {
    id: 2,
    productId: "m-002",
    imageUrl:
      "https://via.placeholder.com/334x481/D2B48C/8B4513?text=Men+Chinos",
    altText: "Man wearing Chinos",
    tagline: "02 — Smart Casual",
    discount: "24% OFF",
  }, // m-002 IS on sale
  {
    id: 3,
    productId: "m-009",
    imageUrl:
      "https://via.placeholder.com/334x481/556B2F/FFFFFF?text=Men+Bomber",
    altText: "Bomber Jacket",
    tagline: "03 — Weekend Deal",
    discount: "17% OFF",
  }, // m-009 IS on sale
  {
    id: 4,
    productId: "a-004",
    imageUrl:
      "https://via.placeholder.com/334x481/778899/FFFFFF?text=Accessory+Scarf",
    altText: "Wool Scarf",
    tagline: "04 — Cozy Up",
    discount: "25% OFF",
  }, // a-004 IS on sale
  {
    id: 5,
    productId: "m-005",
    imageUrl:
      "https://via.placeholder.com/334x481/4A5568/E2E8F0?text=Men+Hoodie",
    altText: "Man in Hoodie",
    tagline: "05 — Active Gear",
    discount: "10% OFF",
  }, // m-005 needs discount/tag added
];


export type { DealItem };
// Note: You might need to adjust the discount text % here to match the calculated discount
// in ALL_PRODUCTS_MOCK for consistency, or calculate it dynamically.
// Also ensure product m-005 is marked as on sale or has originalPrice in ALL_PRODUCTS_MOCK.
