// src/components/landing/DealsSection.tsx
import React, { useState, useRef, useCallback } from "react";
// Swiper imports
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
// Swiper styles (ensure swiper-css.d.ts exists)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// Other imports
import Timer from "../ui/Timer";
import Button from "../ui/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// Data and Types (ensure paths are correct)
import { dealsData } from "../../data/deals";

const AUTOPLAY_DELAY = 4000;

const DealsSection: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasInteracted = useRef(false);

  // Autoplay control functions
  const stopAutoplay = useCallback(() => {
    swiperRef.current?.swiper?.autoplay?.stop();
  }, []);
  const startAutoplay = useCallback(() => {
    if (!hasInteracted.current) {
      swiperRef.current?.swiper?.autoplay?.start();
    }
  }, []);

  // Navigation Handlers
  const handlePrev = useCallback(() => {
    hasInteracted.current = true;
    stopAutoplay();
    swiperRef.current?.swiper.slidePrev();
  }, [stopAutoplay]);
  const handleNext = useCallback(() => {
    hasInteracted.current = true;
    stopAutoplay();
    swiperRef.current?.swiper.slideNext();
  }, [stopAutoplay]);
  const handleDotClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      hasInteracted.current = true;
      stopAutoplay();
      swiperRef.current?.swiper.slideToLoop(index);
    },
    [activeIndex, stopAutoplay]
  );

  // Timer date
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 2);

  // Don't render if no data (or handle loading state if data is async)
  if (!dealsData || dealsData.length === 0) {
    // Optionally return a placeholder or null
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
        {/* Left Side */}
        <div className="lg:w-2/5 text-center lg:text-left flex-shrink-0 order-last lg:order-first">
          {/* ... Title, Description, Buy Now Button, Timer ... */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt mb-4">
            {" "}
            Deals Of The Month{" "}
          </h2>
          <p className="text-base text-brand-gray-dark mb-6 lg:mb-8 leading-relaxed">
            {" "}
            Discover exclusive discounts available only this month. Grab your
            favorites before they're gone!{" "}
          </p>
          <Button
            variant="primary"
            size="lg"
            className="h-[46px] mb-8 lg:mb-10"
            to="/products?tag=Sale"
          >
            {" "}
            Shop Deals{" "}
          </Button>
          <div className="space-y-3">
            <h3 className="text-2xl font-medium text-brand-gray-dark">
              {" "}
              Hurry, Before It’s Too Late!{" "}
            </h3>
            <div className="flex justify-center lg:justify-start">
              {" "}
              <Timer targetDate={saleEndDate} />{" "}
            </div>
          </div>
        </div>

        {/* Right Side: Swiper Slider */}
        <div
          className="lg:w-3/5 w-full relative flex flex-col items-center"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Swiper Container */}
          <div className="relative w-full max-w-[450px] lg:max-w-full h-[520px] md:h-[560px] lg:h-[481px]">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"} // Show partial prev/next slides
              loop={true} // Enable looping
              coverflowEffect={{
                rotate: 20,
                stretch: -10, // Negative value creates overlap/closer slides
                depth: 100,
                modifier: 1,
                slideShadows: false, // Disable default shadows
              }}
              autoplay={{
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: true, // Stop autoplay after user interaction
                pauseOnMouseEnter: true, // Swiper handles pause on hover
              }}
              // Update state based on Swiper's 'realIndex' for loop compatibility
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full w-full"
            >
              {dealsData.map((deal) => (
                // Set slide width and add group class for Tailwind variant
                <SwiperSlide
                  key={deal.id}
                  style={{ width: "70%", maxWidth: "334px" }}
                  className="!flex items-center justify-center group"
                >
                  {/* No render prop needed here */}
                  {/* Inner div: Apply inactive styles by default, use group variant for active */}
                  <div
                    className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-300 ease-out scale-85 opacity-60 group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:opacity-100`}
                  >
                    <img
                      src={deal.imageUrl}
                      alt={deal.altText}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Discount Overlay: Conditionally display based on group active state */}
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-md text-left w-auto max-w-[180px] hidden group-[.swiper-slide-active]:block">
                      <p className="text-xs md:text-sm text-brand-gray-dark">
                        {deal.tagline}
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-brand-gray-dark">
                        {deal.discount}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Below Slider */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous Deal"
              className="w-11 h-11 flex items-center justify-center bg-white border border-brand-primary rounded-full shadow-md hover:bg-gray-100 transition-colors text-brand-primary disabled:opacity-50"
            >
              {" "}
              <FiChevronLeft size={24} />{" "}
            </button>
            {/* Pagination Dots */}
            <div className="flex items-center space-x-2 h-3">
              {dealsData.map((_, index) => (
                <button
                  key={`deal-dot-${index}`}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 ease-in-out rounded-full ${
                    // Use activeIndex state for styling
                    activeIndex === index
                      ? "w-5 h-2 bg-brand-primary"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to deal ${index + 1}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                ></button>
              ))}
            </div>
            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next Deal"
              className="w-11 h-11 flex items-center justify-center bg-white border border-brand-primary rounded-full shadow-md hover:bg-gray-100 transition-colors text-brand-primary disabled:opacity-50"
            >
              {" "}
              <FiChevronRight size={24} />{" "}
            </button>
          </div>
        </div>
        {/* End Right Side */}
      </div>
    </div>
  );
};

export default DealsSection;
