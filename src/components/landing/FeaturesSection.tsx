// src/components/landing/FeaturesSection.tsx
import React from "react";

// --- Import Actual Feature Icons ---
import serviceIconSrc from "../../assets/images/Icons/icon-service.svg";
import paymentIconSrc from "../../assets/images/Icons/icon-payment.svg";
import deliveryIconSrc from "../../assets/images/Icons/icon-delivery.svg";
import qualityIconSrc from "../../assets/images/Icons/icon-quality.svg";
// --- End Icon Imports ---

// Define feature data structure
interface FeatureData {
  iconSrc: string;
  title: string;
  description: string;
  key: number;
}

// Data using imported icon sources
const featuresData: FeatureData[] = [
  {
    iconSrc: serviceIconSrc,
    title: "Professional Service",
    description: "Efficient customer support from passionate team",
    key: 1,
  },
  {
    iconSrc: paymentIconSrc,
    title: "Secure Payment",
    description: "Different secure payment methods",
    key: 2,
  },
  {
    iconSrc: deliveryIconSrc,
    title: "Fast Delivery",
    description: "Fast and convenient door to door delivery",
    key: 3,
  },
  {
    iconSrc: qualityIconSrc,
    title: "Quality & Savings",
    description: "Comprehensive quality control and affordable prices",
    key: 4,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    // Container Div:
    // - Negative top margin to potentially overlap the section above slightly (adjust as needed)
    // - Relative positioning with z-index to ensure it's above hero background if overlapping
    // - Max width to control its extent (e.g., max-w-6xl or max-w-7xl)
    // - Centered horizontally (mx-auto)
    // - Background white, rounded corners, shadow
    // - Specific padding matching the design's visual spacing (adjust px/py)
    <div className="relative z-10 -mt-10 sm:-mt-12 md:-mt-16 max-w-6xl mx-auto bg-white rounded-lg shadow-lg px-6 py-8 md:px-12 md:py-10 lg:px-16">
      {/* Grid layout for the four features */}
      {/* Adjust gap based on visual spacing in design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
        {featuresData.map((feature) => (
          // Feature Item Container: Center content vertically and horizontally
          <div
            key={feature.key}
            className="flex flex-col items-center text-center gap-3 md:gap-4"
          >
            {/* Icon using img tag */}
            <img
              src={feature.iconSrc}
              alt="" // Decorative, alt text provided by title/desc
              aria-hidden="true"
              // Size from CSS (38px)
              className="w-[38px] h-[38px] object-contain mb-1" // Added slight margin below icon
            />
            {/* Text content */}
            <div className="space-y-1">
              <h3 className="font-nunito text-xl font-medium text-black">
                {feature.title}
              </h3>
              <p className="font-nunito text-sm text-brand-gray-dark leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
