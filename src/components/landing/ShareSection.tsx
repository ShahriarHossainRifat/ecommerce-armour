// src/components/landing/ShareSection.tsx
import React from "react";

// Placeholder images for the grid
const shareImages = [
  "https://via.placeholder.com/300x300/cccccc/969696?text=Insta+1",
  "https://via.placeholder.com/300x300/cccccc/969696?text=Insta+2",
  "https://via.placeholder.com/300x300/cccccc/969696?text=Insta+3",
  "https://via.placeholder.com/300x300/cccccc/969696?text=Insta+4",
  "https://via.placeholder.com/300x300/cccccc/969696?text=Insta+5",
];

const ShareSection: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-lg font-semibold text-brand-gray-dark mb-2">
            Follow Us On Instagram
          </p>{" "}
          {/* Example sub title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-alt">
            #ShareYourStyle
          </h2>
        </div>

        {/* Image Grid */}
        {/* Simplified to a 5-column grid, responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
          {shareImages.map((src, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden group relative"
            >
              <img
                src={src}
                alt={`Share your style image ${index + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                {/* Can add an icon or text here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
