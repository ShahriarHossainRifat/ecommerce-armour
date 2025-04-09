// src/components/pdp/ProductTabs.tsx
import React from "react";
import { Product, Review } from "../../types/product"; // Adjusted import path (import Review too if needed here)
import Tabs from "../ui/Tabs"; // Import the reusable Tabs component

// Import Tab Content Components
import DetailsTabContent from "./tabs/DetailsTabContent";
import VideosTabContent from "./tabs/VideosTabContent";
import ReviewsTabContent from "./tabs/ReviewsTabContent";
import ShippingTabContent from "./tabs/ShippingTabContent";

interface ProductTabsProps {
  product: Product; // Use the correctly imported Product type
}

// Placeholder Reviews Data (replace with actual data logic or remove if passed via product prop)
const placeholderReviews: Review[] = [
  {
    id: 1,
    author: "John Malcolm",
    date: "24 January, 2025",
    rating: 4,
    text: "In Washington, it is already difficult to surprise...",
    imageUrl: "https://via.placeholder.com/56x56/cccccc/969696?text=JM",
  },
  {
    id: 2,
    author: "Jane Doe",
    date: "15 January, 2025",
    rating: 5,
    text: "Absolutely love this product! Great quality...",
    imageUrl: "https://via.placeholder.com/56x56/cccccc/969696?text=JD",
    images: [
      "https://via.placeholder.com/88x88/cccccc/969696?text=ReviewImg1",
      "https://via.placeholder.com/88x88/cccccc/969696?text=ReviewImg2",
    ],
  },
];
const placeholderRatingDistribution = {
  excellent: 156,
  good: 45,
  average: 5,
  belowAverage: 2,
  poor: 2,
};
const placeholderTotalReviews = placeholderReviews.length;
const placeholderOverallRating = 4.5;
// --- End Placeholder Data ---

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  // Define tabs data, accessing properties from the 'product' prop
  // Use nullish coalescing (??) to provide default fallbacks for optional properties
  const tabsData = [
    {
      label: "Details",
      // Assuming 'detailsText' holds the main description for this tab
      content: (
        <DetailsTabContent
          description={product.detailsText ?? "No details available."}
        />
      ),
    },
    {
      label: "Videos",
      // Pass 'description' (short one) and 'videoUrl' if they exist
      content: (
        <VideosTabContent
          videoUrl={product.videoUrl}
          description={product.description}
        />
      ),
    },
    {
      label: "Reviews",
      // Pass relevant data; use fallbacks like empty array [] for optional reviews
      content: (
        <ReviewsTabContent
          productId={product.id} // id is required, safe to access
          overallRating={product.rating ?? placeholderOverallRating} // Use product rating or fallback
          totalReviews={product.reviewCount ?? placeholderTotalReviews} // Use product review count or fallback
          ratingDistribution={placeholderRatingDistribution} // Use placeholder or pass actual data if available on product
          reviews={product.reviews ?? placeholderReviews} // Use actual product reviews or fallback
        />
      ),
    },
    {
      label: "Shipping & Return",
      // Use 'shippingPolicy' if it exists
      content: (
        <ShippingTabContent
          policyText={
            product.shippingPolicy ?? "No shipping information available."
          }
        />
      ),
    },
  ];

  return (
    <div className="bg-brand-footer-bg py-12 md:py-16">
      {" "}
      {/* Container with background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
          {" "}
          {/* Inner white card */}
          <Tabs
            tabs={tabsData}
            // Customizing tab styles to match the PDP CSS examples
            tabListClassName="flex flex-wrap gap-x-8 gap-y-2 mb-8 border-b border-gray-200"
            tabButtonClassName="pb-3 text-2xl lg:text-[32px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap" // Larger font size
            activeTabButtonClassName="text-brand-dark-alt border-b-2 border-brand-dark-alt" // Active style from CSS
            inactiveTabButtonClassName="text-brand-gray hover:text-brand-dark-alt" // Inactive style from CSS
            tabPanelClassName="mt-8" // Spacing for content panel
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
