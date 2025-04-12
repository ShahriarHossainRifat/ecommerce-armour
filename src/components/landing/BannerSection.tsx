// src/components/landing/BannerSection.tsx
import React from "react";
import Button from "../ui/Button"; // Import Button component

import bannerExclusiveWomanSrc from "../../assets/images/Banners/banner-exclusive-woman.webp";
import bannerKidsSpecialSrc from "../../assets/images/Banners/banner-kids-special.webp";
import bannerMenDenimSrc from "../../assets/images/Banners/banner-men-denim.webp";
import bannerWomenWinterSrc from "../../assets/images/Banners/banner-women-winter.webp";

const BannerSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column (Smaller Banners) */}
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2">
          {/* Wide Square Banner ("Kid's Special") */}
          <div className="relative h-[328px] bg-brand-bg rounded-lg overflow-hidden flex items-center justify-end p-8 text-left group">
            {/* Image Container - REMOVED fallback bg-* */}
            <div className="absolute left-0 top-0 h-full w-[55%] sm:w-[60%]">
              <img
                src={bannerKidsSpecialSrc}
                alt="Kid's Special Collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Use object-cover
                loading="lazy"
              />
            </div>
            {/* Text positioned on right */}
            <div className="relative z-10 w-[45%] sm:w-[40%] space-y-2 md:space-y-4 pl-4">
              {" "}
              {/* Ensure text stays within bounds */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-brand-dark-alt mb-2 md:mb-4 leading-tight">
                Kid’s Special
              </h3>
              <p className="text-sm text-brand-gray-dark mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                {" "}
                {/* Limit lines on smaller screens */}
                Lorem ipsum dolor sit amet consectetur. Senectus elementum donec
                neque at. Sed quis felis proin sit vulputate.
              </p>
              {/* Button hidden for now, uncomment if needed */}
              {/* <Button to="/products?category=Kids" variant='dark' size='sm' className='text-xs px-3 py-1.5 h-auto'>Shop Kids</Button> */}
            </div>
          </div>
          {/* Two Square Banners */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            {/* Square Banner 1 ("Men's Denim Jeans") */}
            <div className="relative flex-1 h-[272px] bg-[#EDEDED] rounded-lg overflow-hidden flex items-center p-6 group">
              {/* Text on Left */}
              <div className="relative z-10 w-[55%] pr-3 space-y-2">
                {" "}
                {/* Added padding right */}
                <h4 className="text-2xl lg:text-3xl font-normal text-brand-dark-alt leading-tight">
                  Men’s Denim Jeans
                </h4>
                <p className="text-sm text-brand-gray-dark leading-relaxed line-clamp-2 md:line-clamp-none">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              {/* Image Container - REMOVED fallback bg-* */}
              <div className="absolute right-0 top-0 h-full w-[45%]">
                <img
                  src={bannerMenDenimSrc}
                  alt="Man wearing denim jacket"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Use object-cover
                  loading="lazy"
                />
              </div>
            </div>
            {/* Square Banner 2 ("Women Winter Collection") */}
            <div className="relative flex-1 h-[272px] bg-[#353535] rounded-lg overflow-hidden flex items-center p-6 group">
              {/* Image Container - REMOVED fallback bg-* */}
              <div className="absolute left-0 top-0 h-full w-[45%]">
                <img
                  src={bannerWomenWinterSrc}
                  alt="Woman in winter hat"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Use object-cover
                  loading="lazy"
                />
              </div>
              {/* Text on Right */}
              <div className="relative z-10 w-[55%] ml-auto pl-3 text-right space-y-2">
                {" "}
                {/* Added padding left */}
                <h4 className="text-2xl lg:text-3xl font-normal text-white leading-tight">
                  Women Winter Collection
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none">
                  Lorem ipsum dolor sit amet consectetur. Dignissim.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Big Banner - "Exclusive for Woman") */}
        <div className="lg:w-1/2 h-[600px] bg-[#EDEDED] rounded-lg overflow-hidden flex items-center p-8 lg:p-12 relative group">
          {/* Image Container - REMOVED fallback bg-* */}
          <div className="absolute right-0 top-0 h-full w-[55%] lg:w-[60%]">
            <img
              src={bannerExclusiveWomanSrc}
              alt="Exclusive styles for women"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Use object-cover
              loading="lazy"
            />
          </div>
          {/* Text on Left */}
          <div className="relative z-10 max-w-[45%] lg:max-w-sm space-y-4">
            {" "}
            {/* Adjust max width */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-brand-dark-alt leading-tight">
              Exclusive for Woman
            </h2>
            <p className="text-sm text-brand-gray-dark leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Gravida cum imperdiet
              feugiat venenatis.
            </p>
            <Button
              to="/products?category=Women"
              variant="outline"
              size="lg"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary-light focus:ring-brand-primary"
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
