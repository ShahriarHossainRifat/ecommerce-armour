// src/components/landing/BrandsSection.tsx
import React from "react";
// *** Import data from the new file ***
import { row1Logos, row2Logos, BrandLogo } from "../../data/brands"; // Adjust path if needed

// Helper component for rendering a scrolling row
const ScrollingRow: React.FC<{
  logos: BrandLogo[];
  direction?: "left" | "right";
  duration?: string;
}> = ({ logos, direction = "left", duration = "40s" }) => {
  if (!logos || logos.length === 0) return null;
  // Duplicate logos for seamless looping animation
  const duplicatedLogos = [...logos, ...logos];
  const animationClass =
    direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  const animationDurationStyle = { animationDuration: duration };

  return (
    // Outer container controls hover pause and hides overflow
    <div className="w-full overflow-hidden hover:animation-pause">
      {/* Inner container holds duplicated logos and applies animation */}
      {/* Apply dynamic duration */}
      <div
        className={`flex ${animationClass} w-max`}
        style={animationDurationStyle}
      >
        {duplicatedLogos.map((brand, index) => (
          // Individual logo container
          <div
            key={`${brand.id}-${index}-${direction}`} // More unique key
            // Spacing between items using margin
            className="flex-shrink-0 px-4 py-2 mr-6 md:mr-8" // Adjust spacing (mr-*)
          >
            {/* UPDATED STYLING: Pill shape, padding, height */}
            <div className="bg-white rounded-full shadow-md px-6 md:px-8 py-4 flex items-center justify-center h-[60px] md:h-[70px]">
              {" "}
              {/* Adjusted padding/height */}
              <img
                src={brand.logoSrc} // Use logoSrc from data
                alt={`${brand.name} logo`}
                // Adjust max height for logo inside pill
                className="max-h-6 md:max-h-8 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BrandsSection: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt mb-3">
            Top Brands
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-dark">
            Shop from the best in the business. Premium quality and style from
            your favorite brands.
          </p>
        </div>

        {/* Scrolling Logos Container */}
        <div className="space-y-6 md:space-y-8">
          {" "}
          {/* Space between the two rows */}
          {/* Render Row 1 (Scrolling Left, potentially slower) */}
          <ScrollingRow logos={row1Logos} direction="left" duration="50s" />
          {/* Render Row 2 (Scrolling Right, potentially faster) */}
          <ScrollingRow logos={row2Logos} direction="right" duration="45s" />
        </div>
      </div>
    </div>
  );
};

// Reminder: Ensure scroll animations & pause utility are in tailwind.config.js
// and restart your dev server after config changes.

export default BrandsSection;
