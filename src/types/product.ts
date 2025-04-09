// src/types/product.ts

/**
 * Defines the structure for a customer review.
 */
export interface Review {
  id: string | number; // Unique ID for the review
  author: string; // Name of the reviewer
  date: string; // Date review was posted (or Date object)
  rating: number; // Star rating (e.g., 1-5)
  text: string; // The review content
  imageUrl?: string | null; // URL for the reviewer's avatar (optional)
  images?: string[] | null; // URLs for images attached to the review (optional)
}

/**
 * Defines the main structure for a Product object.
 * Includes all fields potentially used across different components like
 * ProductCard, ProductInfo, CartItem, Order Details, Filtering/Sorting logic.
 */
export interface Product {
  // --- Core Required Fields ---
  id: string | number; // Unique Product ID (string or number)
  title: string; // Product Name/Title
  price: number; // Current selling price
  imageUrl: string; // Primary image URL for display

  // --- Optional Descriptive Fields ---
  description?: string | null; // Short description (for cards, previews)
  detailsText?: string | null; // Longer description (for PDP details tab)
  vendor?: string | null; // Brand name or seller selling this product
  brand?: string | null; // Specific brand (can be same as vendor, used for filtering)
  category?: string | null; // Main category (e.g., 'Men', 'Women', 'Kids', 'Accessories')
  subCategory?: string | null; // More specific category (e.g., 'T-shirts', 'Jackets')
  tags?: string[] | null; // Keywords or descriptive tags (e.g., 'Sale', 'New Arrival', 'Casual Wear')
  sku?: string; // Stock Keeping Unit (optional)

  // --- Variant & Stock Fields ---
  sizes?: string[] | null; // Array of available sizes (e.g., ['S', 'M', 'L'])
  colors?: string[] | null; // Array of available color hex codes or names
  stock?: number | null; // Available stock quantity (use null/undefined if not tracked, 0 if explicitly out)
  outOfStock?: boolean; // Explicit flag for out-of-stock status

  // --- Pricing & Status Fields ---
  originalPrice?: number | null; // Price before discount (for showing savings)
  isNew?: boolean; // Flag for 'New Arrival' badge (can also be derived from tags)

  // --- Media & Content Fields ---
  images?: string[] | null; // Array of additional image URLs for PDP gallery
  videoUrl?: string | null; // URL for PDP video tab

  // --- Review & Policy Fields ---
  reviews?: Review[] | null; // Array of customer reviews for PDP
  rating?: number | null; // Average calculated rating
  reviewCount?: number | null; // Total number of reviews
  shippingPolicy?: string | null; // Text for PDP shipping tab

  // Add any other product-specific fields as needed (e.g., material, dimensions)
}

/**
 * Defines the structure for an item within the shopping cart.
 * Inherits all Product properties and adds cart-specific details.
 */
export interface CartItemType extends Product {
  cartItemId: string; // Unique identifier for this specific cart entry (e.g., productID + size + color)
  quantity: number; // Quantity of this specific item/variant in the cart
  // Store the specific variants selected when adding to cart
  selectedSize?: string | null;
  selectedColor?: string | null;
  // Stock might be checked again at checkout, but having it here can be useful
}

/**
 * Defines the structure for an item shown in the "Deals of the Month" section.
 * Links back to a specific product.
 */
export interface DealItem {
  id: number; // Unique ID for the deal slide itself
  productId: string | number; // ID of the corresponding Product
  imageUrl: string; // Specific image URL used for this deal display
  altText: string; // Alt text for the deal image
  tagline: string; // Text like "01 - Fall Sale"
  discount: string; // Display text like "30% OFF"
}

// You can add other shared types related to products or e-commerce here
