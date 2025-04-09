// src/components/landing/BrandsSection.tsx
import React from "react";

// Placeholder brand logos (use more logos for a better scrolling effect)
const brandLogos = [
  {
    id: 1,
    name: "Calvin Klein",
    url: "https://via.placeholder.com/170x40/ffffff/000000?text=Calvin+Klein",
  },
  {
    id: 2,
    name: "Gucci",
    url: "https://via.placeholder.com/120x40/ffffff/000000?text=GUCCI",
  },
  {
    id: 3,
    name: "Prada",
    url: "https://via.placeholder.com/140x40/ffffff/000000?text=PRADA",
  },
  {
    id: 4,
    name: "Nike",
    url: "https://via.placeholder.com/100x40/ffffff/000000?text=NIKE",
  },
  {
    id: 5,
    name: "Puma",
    url: "https://via.placeholder.com/130x40/ffffff/000000?text=PUMA",
  },
  {
    id: 6,
    name: "Levis",
    url: "https://via.placeholder.com/110x40/ffffff/000000?text=Levi's",
  },
  {
    id: 7,
    name: "Zara",
    url: "https://via.placeholder.com/100x40/ffffff/000000?text=ZARA",
  },
  {
    id: 8,
    name: "H&M",
    url: "https://via.placeholder.com/90x40/ffffff/000000?text=H%26M",
  },
  {
    id: 9,
    name: "Adidas",
    url: "https://via.placeholder.com/130x40/ffffff/000000?text=Adidas",
  },
  {
    id: 10,
    name: "Fila",
    url: "https://via.placeholder.com/90x40/ffffff/000000?text=FILA",
  },
  // Add more logos if available
];

// Split logos into two rows for the layout
const row1Logos = brandLogos.slice(0, Math.ceil(brandLogos.length / 2));
const row2Logos = brandLogos.slice(Math.ceil(brandLogos.length / 2));

const BrandsSection: React.FC = () => {
  // Helper component for rendering a scrolling row
  const ScrollingRow: React.FC<{
    logos: typeof brandLogos;
    direction?: "left" | "right";
  }> = ({ logos, direction = "left" }) => {
    if (!logos || logos.length === 0) return null;
    // Duplicate logos for seamless looping animation
    const duplicatedLogos = [...logos, ...logos];
    const animationClass =
      direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

    return (
      // Outer container controls hover pause and hides overflow
      <div className="w-full overflow-hidden hover:animation-pause">
        {/* Inner container holds duplicated logos and applies animation */}
        <div className={`flex ${animationClass} w-max`}>
          {" "}
          {/* w-max prevents wrapping */}
          {duplicatedLogos.map((brand, index) => (
            // Individual logo container with spacing and styles
            <div
              key={`${brand.id}-${index}`} // Unique key for duplicated items
              // Added padding for spacing, adjust as needed (gap won't work well with infinite scroll anim)
              className="flex-shrink-0 px-4 py-2 mr-8" // Spacing using margin-right
            >
              <div className="bg-white rounded-full shadow-md px-8 py-5 flex items-center justify-center h-[80px]">
                <img
                  src={brand.url}
                  alt={`${brand.name} logo`}
                  className="max-h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      {" "}
      {/* Use a slightly different bg */}
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
        <div className="space-y-8">
          {" "}
          {/* Space between the two rows */}
          {/* Render Row 1 (Scrolling Left) */}
          <ScrollingRow logos={row1Logos} direction="left" />
          {/* Render Row 2 (Scrolling Right - Optional) */}
          {/* You can use direction="left" for both if preferred */}
          <ScrollingRow logos={row2Logos} direction="right" />
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
