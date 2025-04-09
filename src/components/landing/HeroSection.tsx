// src/components/landing/HeroSection.tsx
import React from "react";
import Button from "../ui/Button"; // Import button component

// Placeholder image URLs
const leftImageUrl =
  "https://via.placeholder.com/357x689/e0e0e0/969696?text=Left+Hero";
const rightImageUrl =
  "https://via.placeholder.com/356x689/e0e0e0/969696?text=Right+Hero";
const topImageUrl =
  "https://via.placeholder.com/358x126/e0e0e0/969696?text=Top+Hero";
const bottomImageUrl =
  "https://via.placeholder.com/357x126/e0e0e0/969696?text=Bottom+Hero";

const HeroSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {" "}
      {/* Padding top adjusted considering navbar */}
      <div className="relative h-[689px] flex justify-center items-center">
        {" "}
        {/* Main container with fixed height */}
        {/* Left Image */}
        <div className="absolute left-0 top-0 h-full w-[357px] hidden md:block">
          <img
            src={leftImageUrl}
            alt="Hero Left"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        {/* Right Image */}
        <div className="absolute right-0 top-0 h-full w-[356px] hidden md:block">
          <img
            src={rightImageUrl}
            alt="Hero Right"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        {/* Center Content Area */}
        <div className="relative z-10 w-full max-w-[365px] h-full flex flex-col justify-between items-center text-center py-4">
          {/* Top Image (Part of Center) */}
          <div className="w-full h-[126px] mb-4">
            <img
              src={topImageUrl}
              alt="Hero Top Center"
              className="object-cover h-full w-full rounded-lg"
            />
          </div>

          {/* Text Overlay Content */}
          <div className="flex flex-col items-center justify-center flex-grow space-y-4 md:space-y-6 px-2">
            <h1 className="font-sans font-bold text-7xl md:text-8xl leading-none tracking-tighter text-brand-dark-alt uppercase">
              Ultimate
            </h1>
            {/* SALE Text - CORRECTED inline style syntax for standard text-stroke */}
            <div
              className="font-sans font-medium text-[140px] md:text-[160px] lg:text-[167px] leading-none tracking-tighter text-transparent uppercase"
              style={
                {
                  WebkitTextStroke: "1.5px #1F1F39", // Keep vendor prefix camelCased
                  "text-stroke": "1.5px #1F1F39", // Use string literal for standard property
                } as React.CSSProperties
              } // Added type assertion for clarity
            >
              SALE
            </div>
            <p className="font-sans text-xl tracking-[0.1em] uppercase text-brand-gray-dark">
              New Collection
            </p>
            <Button
              to="/products"
              variant="primary"
              size="lg"
              className="h-[50px] shadow-lg"
            >
              SHOP NOW
            </Button>
          </div>

          {/* Bottom Image (Part of Center) */}
          <div className="w-full h-[126px] mt-4">
            <img
              src={bottomImageUrl}
              alt="Hero Bottom Center"
              className="object-cover h-full w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reminder: CSS Class Alternative (Recommended) ---
// Add to src/index.css:
/*
@layer components {
  .text-stroke-custom {
    -webkit-text-stroke: 1.5px theme('colors.brand-dark-alt');
    text-stroke: 1.5px theme('colors.brand-dark-alt');
    @apply text-transparent;
  }
}
*/
// Then use className="... text-stroke-custom" instead of inline style.

export default HeroSection;
