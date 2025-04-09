// src/components/landing/DealsSection.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
// --- Import Swiper ---
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// --- Import Swiper styles ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// --- Other Imports ---
import Timer from "../ui/Timer";
import Button from "../ui/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// *** VERIFY THIS IMPORT PATH IS CORRECT RELATIVE TO THIS FILE ***
// It expects src/data/deals.ts relative to src/components/landing/DealsSection.tsx
import { DealItem, dealsData } from "../../data/deals";

// --- Animation Variants (Optional, Swiper handles main effect) ---
// const sliderVariants = { /* ... */ };

const AUTOPLAY_DELAY = 4000;

const DealsSection: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasInteracted = useRef(false);

  // Ensure dealsData is defined before calculating length/activeDeal
  const totalDeals = dealsData?.length ?? 0;
  const activeDeal =
    totalDeals > 0 ? dealsData[activeIndex % totalDeals] : null; // Handle empty data case

  // --- Autoplay Logic ---
  const stopAutoplay = useCallback(() => {
    swiperRef.current?.swiper?.autoplay?.stop();
  }, []);
  const startAutoplay = useCallback(() => {
    if (!hasInteracted.current) {
      swiperRef.current?.swiper?.autoplay?.start();
    }
  }, []);
  useEffect(() => {
    /* Autoplay managed by Swiper config */
  }, []); // Keep empty or remove
  // --- End Autoplay Logic ---

  // --- Navigation Handlers ---
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
  // --- End Navigation Handlers ---

  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 2);

  // Don't render section if no deal data
  if (!activeDeal) {
    return null; // Or some placeholder
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
        {/* Left Side: Text, Timer, Button */}
        <div className="lg:w-2/5 text-center lg:text-left flex-shrink-0 order-last lg:order-first">
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
              slidesPerView={"auto"}
              loop={true}
              coverflowEffect={{
                rotate: 25,
                stretch: -10,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full w-full"
            >
              {/* Explicitly type 'deal' parameter if inference fails after fixing import */}
              {dealsData.map((deal: DealItem) => (
                <SwiperSlide
                  key={deal.id}
                  style={{ width: "70%", maxWidth: "334px" }}
                >
                  {({ isActive }) => (
                    <div
                      className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-85 md:scale-90 opacity-60"
                      }`}
                    >
                      {/* Access properties safely now */}
                      <img
                        src={deal.imageUrl}
                        alt={deal.altText}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isActive && (
                        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-md text-left w-auto max-w-[180px]">
                          <p className="text-xs md:text-sm text-brand-gray-dark">
                            {deal.tagline}
                          </p>
                          <p className="text-xl md:text-2xl font-bold text-brand-gray-dark">
                            {deal.discount}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
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
              {/* Explicitly type parameters if needed */}
              {dealsData.map((_: DealItem, index: number) => (
                <button
                  key={`deal-dot-${index}`}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 ease-in-out rounded-full ${
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
