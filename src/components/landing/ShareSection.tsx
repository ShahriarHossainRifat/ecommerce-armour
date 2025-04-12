// src/components/landing/ShareSection.tsx
import React from "react";
// *** Import react-masonry-css ***
// Ensure you have installed it: npm install react-masonry-css
// Ensure you have added the necessary CSS to src/index.css
import Masonry from "react-masonry-css";

// --- Import Content Images ---
// *** ENSURE THESE ARE YOUR ACTUAL IMAGE IMPORTS AND PATHS ***
import shareImg1 from "../../assets/images/share/share-1.webp";
import shareImg2 from "../../assets/images/share/share-2.webp";
import shareImg3 from "../../assets/images/share/share-3.webp";
import shareImg4 from "../../assets/images/share/share-4.webp";
import shareImg5 from "../../assets/images/share/share-5.webp";
import shareImg6 from "../../assets/images/share/share-6.webp";
// --- End Content Imports ---

// --- REMOVED Decorative Image Imports ---
// import decorShelfSrc from '../../assets/images/decor/decor-shelf.png';
// import decorChairSrc from '../../assets/images/decor/decor-chair.png';
// --- End Decorative Imports ---

// Combine images and add specific alt text
const shareImageData = [
  { src: shareImg3, alt: "Close up of person wearing beige trousers" },
  { src: shareImg1, alt: "Group of friends in colorful outfits" },
  { src: shareImg4, alt: "Two women posing outdoors in fall fashion" },
  { src: shareImg5, alt: "Man wearing white shirt and black tie" },
  { src: shareImg6, alt: "Man posing in colorful puffer jacket" },
  { src: shareImg2, alt: "Three children sitting outdoors in winter clothes" },
];

const ShareSection: React.FC = () => {
  // Define breakpoints for Masonry columns
  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    640: 2,
  };

  return (
    // Removed relative positioning here as it's no longer needed for side images
    <div className="py-16 md:py-24 bg-white">
      {/* Removed overflow-hidden as well, unless needed for other reasons */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-base font-medium text-brand-gray-dark mb-2">
            Share your outfit with
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold text-brand-dark-alt">
            #ShopKing
          </h2>
        </div>

        {/* --- Decorative Side Images REMOVED --- */}

        {/* --- Masonry Layout --- */}
        <div className="max-w-5xl mx-auto">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid" // Defined in index.css
            columnClassName="my-masonry-grid_column" // Defined in index.css
          >
            {/* Map over your images */}
            {shareImageData.map((imgData, index) => (
              <div
                key={index}
                className="mb-4 group rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                {" "}
                {/* Added mb-4 here directly */}
                <img
                  src={imgData.src}
                  alt={imgData.alt}
                  className="w-full h-auto object-cover block transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </Masonry>
        </div>
        {/* --- End Masonry Layout --- */}
      </div>
    </div>
  );
};

export default ShareSection;
