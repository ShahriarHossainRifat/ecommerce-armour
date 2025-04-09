// src/components/pdp/ImageGallery.tsx
import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    // Render a default placeholder if no images are provided
    images = [
      "https://via.placeholder.com/453x600/e0e0e0/969696?text=No+Image",
    ];
  }

  const mainImage = images[activeIndex];
  // Assuming the first image is the largest/main one and others are potential thumbnails
  // The CSS structure suggests vertical thumbnails, let's implement that.
  const thumbnails = images.slice(1).length > 0 ? images.slice(1) : images; // Use all if only one provided

  return (
    <div className="flex gap-4 h-[600px]">
      {" "}
      {/* Fixed height based on main image container */}
      {/* Thumbnails Column */}
      <div className="w-[62px] flex-shrink-0 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)} // Note: index might need adjustment if thumbnails array excludes main image initially
            className={`block w-full aspect-[51/68] rounded border overflow-hidden transition-all duration-150 ${
              // Aspect ratio based on thumb CSS (51x68 approx)
              index === activeIndex
                ? "border-black ring-1 ring-black ring-offset-1"
                : "border-gray-300 hover:border-gray-500"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={img}
              alt={`${alt} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="flex-grow h-full rounded-lg overflow-hidden bg-brand-placeholder-bg">
        <img
          src={mainImage}
          alt={alt}
          className="w-full h-full object-cover object-center" // Use cover to fill
        />
        {/* TODO: Add Zoom functionality if needed */}
      </div>
    </div>
  );
};

export default ImageGallery;
