// src/components/landing/FeaturesSection.tsx
import React from "react";
// Placeholder icons - replace with actual icons (e.g., from react-icons)
const FeatureIcon1 = () => (
  <div className="w-[38px] h-[38px] bg-brand-dark-alt opacity-90 rounded"></div>
);
const FeatureIcon2 = () => (
  <div className="w-[38px] h-[38px] bg-brand-dark-alt opacity-90 rounded"></div>
);
const FeatureIcon3 = () => (
  <div className="w-[38px] h-[38px] bg-brand-dark-alt opacity-90 rounded"></div>
);
const FeatureIcon4 = () => (
  <div className="w-[38px] h-[38px] bg-brand-dark-alt opacity-90 rounded"></div>
);

const featuresData = [
  {
    icon: <FeatureIcon1 />,
    title: "Professional Service",
    description: "Efficient customer support from passionate team",
    key: 1,
  },
  {
    icon: <FeatureIcon2 />,
    title: "Secure Payment",
    description: "Different secure payment methods",
    key: 2,
  },
  {
    icon: <FeatureIcon3 />,
    title: "Fast Delivery",
    description: "Fast and convenient door to door delivery",
    key: 3,
  },
  {
    icon: <FeatureIcon4 />,
    title: "Quality & Savings",
    description: "Comprehensive quality control and affordable prices",
    key: 4,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-brand-bg shadow-md py-12 md:py-16">
      {" "}
      {/* Based on features container style */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {" "}
          {/* Adjusted gap */}
          {featuresData.map((feature) => (
            <div
              key={feature.key}
              className="flex flex-col items-start gap-3 md:gap-4"
            >
              {" "}
              {/* Reduced gap */}
              <div>{feature.icon}</div>
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-nunito text-xl font-medium text-black">
                  {feature.title}
                </h3>
                <p className="font-nunito text-sm text-brand-gray-dark leading-relaxed">
                  {" "}
                  {/* Adjusted line height */}
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
