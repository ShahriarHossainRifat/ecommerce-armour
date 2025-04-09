// src/components/landing/BannerSection.tsx
import React from "react";
import Button from "../ui/Button"; // Import Button component

// Placeholder Images
const bigBannerImageUrl =
  "https://via.placeholder.com/720x600/cccccc/969696?text=Big+Banner+Image";
const wideSquareImageUrl =
  "https://via.placeholder.com/720x328/cccccc/969696?text=Wide+Square+Banner";
const square1ImageUrl =
  "https://via.placeholder.com/360x272/cccccc/969696?text=Square+Banner+1";
const square2ImageUrl =
  "https://via.placeholder.com/360x272/cccccc/969696?text=Square+Banner+2";

const BannerSection: React.FC = () => {
  return (
    // Using py-0 here if Banners are directly adjacent to other sections with padding
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {" "}
      {/* Or adjust padding as needed */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column (Smaller Banners) */}
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2">
          {/* Wide Square Banner */}
          <div className="relative h-[328px] bg-brand-bg rounded-lg overflow-hidden flex items-center justify-end p-8 text-right group">
            <img
              src={wideSquareImageUrl}
              alt="Kids Special"
              className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="relative z-10 max-w-xs">
              <h3 className="text-4xl lg:text-5xl font-normal text-brand-dark-alt mb-4 leading-tight">
                Kid’s Special
              </h3>
              <p className="text-sm text-brand-gray-dark mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Senectus elementum donec
                neque at. Sed quis felis proin sit vulputate.
              </p>
              {/* Example Button */}
              {/* <Button to="/products?category=Kids" variant='dark' size='md'>Shop Kids</Button> */}
            </div>
          </div>
          {/* Two Square Banners */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            {/* Square Banner 1 */}
            <div className="relative flex-1 h-[272px] bg-[#EDEDED] rounded-lg overflow-hidden flex items-center p-6 group">
              <img
                src={square1ImageUrl}
                alt="Men's Denim"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[120%] w-auto max-w-[60%] object-contain -z-10 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="relative z-10 max-w-[60%] space-y-2">
                <h4 className="text-3xl font-normal text-brand-dark-alt leading-tight">
                  Men’s Denim Jeans
                </h4>
                <p className="text-sm text-brand-gray-dark leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                {/* <Button to="/products?category=Men&subCategory=Jeans" variant='dark' size='sm'>Shop Men</Button> */}
              </div>
            </div>
            {/* Square Banner 2 */}
            <div className="relative flex-1 h-[272px] bg-[#353535] rounded-lg overflow-hidden flex items-center p-6 group">
              <img
                src={square2ImageUrl}
                alt="Women Winter"
                className="absolute right-0 top-0 h-full w-auto max-w-[60%] object-contain -z-10 scale-x-[-1] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="relative z-10 max-w-[60%] space-y-2">
                <h4 className="text-3xl font-normal text-white leading-tight">
                  Women Winter Collection
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Dignissim.
                </p>
                {/* <Button to="/products?category=Women&tag=Winter" variant='light' size='sm'>Shop Women</Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Big Banner) */}
        <div className="lg:w-1/2 h-[600px] bg-[#EDEDED] rounded-lg overflow-hidden flex items-center p-8 lg:p-12 relative group">
          <img
            src={bigBannerImageUrl}
            alt="Exclusive for Woman"
            className="absolute right-0 top-0 h-full w-[55%] object-contain -z-10 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="relative z-10 max-w-sm space-y-4">
            <h2 className="text-5xl lg:text-6xl font-extralight text-brand-dark-alt leading-tight">
              Exclusive for Woman
            </h2>
            <p className="text-sm text-brand-gray-dark leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Gravida cum imperdiet
              feugiat venenatis.
            </p>
            {/* UPDATED: Added 'to' prop to Button */}
            <Button
              to="/products?category=Women" // Link to PLP filtered for Women
              variant="outline"
              size="lg"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary-light focus:ring-brand-primary" // Added focus ring
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
