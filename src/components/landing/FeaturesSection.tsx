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
    // *** REMOVED negative top margin (-mt-*) ***
    // Added standard top margin (mt-*) for spacing below hero (adjust as needed)
    // Kept relative and z-index in case it sits near other complex elements, but likely not needed now
    <div className="relative z-10 mt-12 md:mt-16 max-w-6xl xl:max-w-7xl mx-auto bg-white rounded-lg shadow-lg px-8 py-8 sm:px-12 sm:py-10 lg:px-20 lg:py-12">
      {/* Grid layout for the four features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16 xl:gap-20">
        {featuresData.map((feature) => (
          // Feature Item Container: Centered content
          <div
            key={feature.key}
            className="flex flex-col items-center text-center gap-2.5"
          >
            {/* Icon using img tag */}
            <div className="h-[38px] mb-1.5">
              <img
                src={feature.iconSrc}
                alt="" // Decorative
                aria-hidden="true"
                className="w-[38px] h-[38px] object-contain"
                loading="lazy"
              />
            </div>
            {/* Text content */}
            <div className="space-y-1">
              <h3 className="font-nunito text-xl font-medium text-black leading-[27px]">
                {feature.title}
              </h3>
              <p className="font-nunito text-sm text-brand-gray-dark leading-[19px]">
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
