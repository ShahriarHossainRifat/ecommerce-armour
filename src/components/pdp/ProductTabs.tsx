// src/components/pdp/ProductTabs.tsx
import React from "react";
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product, Review } from "../../types/product"; // Import Product and Review types
import Tabs from "../ui/Tabs"; // Import the reusable Tabs component
// Import Tab Content Components
import DetailsTabContent from "./tabs/DetailsTabContent";
import VideosTabContent from "./tabs/VideosTabContent";
import ReviewsTabContent from "./tabs/ReviewsTabContent";
import ShippingTabContent from "./tabs/ShippingTabContent";

interface ProductTabsProps {
  product: Product; // Expects the full product object
}

// --- Define Default / Placeholder Content ---
const DEFAULT_DETAILS_TEXT = `This product combines quality materials with modern design principles. Suitable for various occasions, it offers both comfort and style.\n\nPlease refer to the size chart for accurate fitting. Care instructions: Machine wash cold, tumble dry low or hang dry. Material composition available upon request.`;

const DEFAULT_SHIPPING_POLICY = `We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days) options within the country.\n\nReturns are accepted within 30 days of purchase, provided the item is in its original condition with tags attached. Please visit our Returns Center page for more details or contact customer support to initiate a return. Final sale items are not eligible for return.`;

// Example Sample Reviews (Can be expanded)
const sampleReviews: Review[] = [
  {
    id: "r1",
    author: "Satisfied Customer",
    date: "April 10, 2025",
    rating: 5,
    text: "Great quality and exactly as described. Fit perfectly based on the size chart provided. Shipping was reasonably fast too!",
  },
  {
    id: "r2",
    author: "Alex P.",
    date: "April 05, 2025",
    rating: 4,
    text: "Really like this item! The color is slightly different than online but still looks good. Comfortable material.",
    imageUrl: "https://via.placeholder.com/56x56/cccccc/808080?text=AP",
  },
  {
    id: "r3",
    author: "Sam B.",
    date: "March 28, 2025",
    rating: 4,
    text: "Good value for the price point. Does the job well.",
    imageUrl: null,
  },
];

// Example Rating Distribution (Replace with actual calculation if possible)
const placeholderRatingDistribution = {
  excellent: 156,
  good: 45,
  average: 5,
  belowAverage: 2,
  poor: 2,
};
// --- End Default Content ---

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  // Use product-specific data if available, otherwise use defaults
  const detailsText = product.detailsText || DEFAULT_DETAILS_TEXT;
  const videoUrl = product.videoUrl; // Will be null/undefined if not present
  const reviews = product.reviews || sampleReviews; // Use sample reviews as fallback
  const shippingPolicy = product.shippingPolicy || DEFAULT_SHIPPING_POLICY;
  const overallRating = product.rating ?? 4.5; // Use product rating or a default
  const totalReviews = product.reviewCount ?? reviews.length; // Use product count or count of samples

  // Define tabs, passing the resolved content to each tab component
  const tabsData = [
    {
      label: "Details",
      content: <DetailsTabContent description={detailsText} />,
    },
    {
      label: "Videos",
      // VideosTabContent already handles null/undefined videoUrl
      content: (
        <VideosTabContent
          videoUrl={videoUrl}
          description={product.description}
        />
      ),
    },
    {
      label: "Reviews",
      content: (
        <ReviewsTabContent
          productId={product.id}
          overallRating={overallRating}
          totalReviews={totalReviews}
          // Pass placeholder distribution or calculate if possible
          ratingDistribution={placeholderRatingDistribution}
          reviews={reviews} // Pass actual or sample reviews
        />
      ),
    },
    {
      label: "Shipping & Return",
      content: <ShippingTabContent policyText={shippingPolicy} />,
    },
  ];

  return (
    <div className="bg-brand-footer-bg py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
          <Tabs
            tabs={tabsData}
            tabListClassName="flex flex-wrap gap-x-8 gap-y-2 mb-8 border-b border-gray-200"
            tabButtonClassName="pb-3 text-2xl lg:text-[32px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap"
            activeTabButtonClassName="text-brand-dark-alt border-b-2 border-brand-dark-alt"
            inactiveTabButtonClassName="text-brand-gray hover:text-brand-dark-alt"
            tabPanelClassName="mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
