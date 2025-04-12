// src/components/landing/TestimonialsSection.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
// Ensure you have installed react-icons: npm install react-icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// Ensure you have installed framer-motion: npm install framer-motion
import { motion, AnimatePresence } from "framer-motion";

// --- Import Actual Testimonial Images ---
// *** ENSURE THESE PATHS AND FILENAMES ARE CORRECT ***
import testimonialImg1 from "../../assets/images/Testimonials/testimonial-author-1.webp";
import testimonialImg2 from "../../assets/images/Testimonials/testimonial-author-2.webp";
import testimonialImg3 from "../../assets/images/Testimonials/testimonial-author-3.webp";
import testimonialImg4 from "../../assets/images/Testimonials/testimonial-author-4.webp";
import testimonialImg5 from "../../assets/images/Testimonials/testimonial-author-5.webp";
// --- End Image Imports ---

// --- Testimonial Data Structure ---
interface Testimonial {
  id: number;
  name: string;
  text: string;
  imageUrl: string; // Actual image for the center avatar
}
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Admiral Canadian",
    text: "Lorem ipsum dolor sit amet consectetur. Non vitae tincidunt facilisi pretium metus et. Nisl convallis turpis eget nullam amet id. Rhoncus massa nulla eget facilisi.",
    imageUrl: testimonialImg1,
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "Absolutely fantastic service and quality! The team went above and beyond. Highly recommended.",
    imageUrl: testimonialImg2,
  },
  {
    id: 3,
    name: "John Smith",
    text: "A truly seamless experience from start to finish. The attention to detail was impeccable.",
    imageUrl: testimonialImg3,
  },
  {
    id: 4,
    name: "Maria Garcia",
    text: "I was hesitant at first, but they delivered exactly what was promised. Great communication.",
    imageUrl: testimonialImg4,
  },
  {
    id: 5,
    name: "Ken Adams",
    text: "Excellent value and the support team is incredibly responsive. Will definitely use again!",
    imageUrl: testimonialImg5,
  },
];
// --- End Testimonial Data ---

// --- Data Structure & Data for Side Images ---
interface SidePlaceholder {
  id: string; // Unique key for mapping
  classes: string;
  src: string;
  alt: string;
}
// Use images from other testimonials for variety
const sidePlaceholders: SidePlaceholder[] = [
  {
    id: `side-${testimonialsData[1].id}`,
    src: testimonialImg2,
    alt: testimonialsData[1].name,
    classes:
      "absolute top-[15%] -left-4 md:left-0 w-24 h-24 lg:w-28 lg:h-28 transform -rotate-12 z-10 hidden sm:block",
  },
  {
    id: `side-${testimonialsData[2].id}`,
    src: testimonialImg3,
    alt: testimonialsData[2].name,
    classes:
      "absolute bottom-[10%] -right-8 md:right-0 w-20 h-20 lg:w-24 lg:h-24 transform rotate-12 z-10 hidden sm:block",
  },
  {
    id: `side-${testimonialsData[3].id}`,
    src: testimonialImg4,
    alt: testimonialsData[3].name,
    classes:
      "absolute bottom-[15%] -left-8 md:left-0 w-16 h-16 lg:w-20 lg:h-20 transform rotate-6 z-10 hidden sm:block",
  },
  {
    id: `side-${testimonialsData[4].id}`,
    src: testimonialImg5,
    alt: testimonialsData[4].name,
    classes:
      "absolute top-[10%] -right-4 md:right-0 w-24 h-24 lg:w-32 lg:h-32 transform -rotate-6 z-10 hidden sm:block",
  },
];
// --- End Side Images Data ---

// --- Animation Variants for Framer Motion ---
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }), // Slide slightly from side
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};
const avatarVariants = {
  enter: { scale: 0.5, opacity: 0 },
  center: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
};
// --- End Animation Variants ---

const AUTOPLAY_DELAY = 5000; // Autoplay interval in milliseconds

const TestimonialsSection: React.FC = () => {
  // --- State ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // Animation direction
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInteracted = useRef(false); // Stop autoplay resume if user interacted
  // --- End State ---

  const totalSlides = testimonialsData.length;
  // Safely get the active testimonial data
  const activeTestimonial =
    testimonialsData[currentSlide] || testimonialsData[0];

  // --- Autoplay Logic ---
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // console.log("Autoplay stopped");
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (hasInteracted.current) return; // Don't restart if user manually navigated
    stopAutoplay(); // Clear previous interval first
    // console.log("Starting autoplay");
    intervalRef.current = setInterval(() => {
      // console.log("Autoplay advancing slide");
      setDirection(1); // Autoplay moves to the next slide
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);
  }, [totalSlides, stopAutoplay]); // Dependency needs to be stable

  // Effect to manage starting/stopping autoplay on mount/unmount
  useEffect(() => {
    startAutoplay(); // Start on mount
    return () => stopAutoplay(); // Cleanup on unmount
  }, [startAutoplay, stopAutoplay]);
  // --- End Autoplay Logic ---

  // --- Navigation Handlers (Defined BEFORE return statement) ---
  const handlePrev = useCallback(() => {
    stopAutoplay(); // Stop timer
    hasInteracted.current = true; // Mark user interaction
    setDirection(-1); // Set animation direction
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1)); // Go to previous slide
  }, [stopAutoplay, totalSlides]);

  const handleNext = useCallback(() => {
    stopAutoplay(); // Stop timer
    hasInteracted.current = true; // Mark user interaction
    setDirection(1); // Set animation direction
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1)); // Go to next slide
  }, [stopAutoplay, totalSlides]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentSlide) return; // Do nothing if clicking active dot
      stopAutoplay(); // Stop timer
      hasInteracted.current = true; // Mark user interaction
      setDirection(index > currentSlide ? 1 : -1); // Determine animation direction
      setCurrentSlide(index); // Go to the clicked slide index
    },
    [currentSlide, stopAutoplay]
  ); // Dependency needed
  // --- End Navigation Handlers ---

  // --- Render ---
  return (
    <div className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-nunito font-medium text-brand-dark-alt mb-3">
            {" "}
            Customer Testimonials{" "}
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-dark font-sans">
            {" "}
            Hear from our happy customers! Real stories of satisfaction and
            style.{" "}
          </p>
        </div>

        {/* Testimonial Slider Area */}
        <div
          className="relative max-w-3xl mx-auto px-10 md:px-16 lg:px-20"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {" "}
          {/* Pause/Resume on hover */}
          {/* Surrounding Decorative Images */}
          {sidePlaceholders.map((imgData) => (
            <img
              key={imgData.id}
              src={imgData.src}
              alt=""
              aria-hidden="true"
              className={`${imgData.classes} rounded-full object-cover border-4 border-white shadow-lg hidden sm:block`}
              loading="lazy"
            />
          ))}
          {/* Main Testimonial Card Container */}
          <div className="relative pt-16 md:pt-20 pb-10">
            {/* Main Avatar */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-32 h-32 md:w-36 md:h-36">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={`avatar-${currentSlide}`}
                  src={activeTestimonial.imageUrl}
                  alt={activeTestimonial.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  variants={avatarVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                />
              </AnimatePresence>
            </div>

            {/* The Card */}
            <div className="relative bg-white rounded-[60px] shadow-xl p-8 pt-24 md:pt-28 pb-16 text-center z-10 min-h-[360px] md:min-h-[380px] overflow-hidden">
              {/* Quote Marks */}
              <span
                className="absolute top-8 left-8 text-8xl text-gray-100 font-serif opacity-80 z-0"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <span
                className="absolute bottom-8 right-8 text-8xl text-gray-100 font-serif opacity-80 z-0"
                aria-hidden="true"
              >
                &rdquo;
              </span>
              {/* Animated Content Wrapper */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`content-${currentSlide}`}
                  className="relative z-10"
                  variants={slideVariants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  aria-live="polite"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-dark-alt mb-4">
                    {" "}
                    {activeTestimonial.name}{" "}
                  </h3>
                  <p className="text-base md:text-lg text-brand-gray-dark leading-relaxed mb-8 min-h-[72px] md:min-h-[48px]">
                    {" "}
                    {activeTestimonial.text}{" "}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Pagination Indicator */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-2 h-3 z-10">
                {testimonialsData.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 ease-in-out rounded-full ${
                      currentSlide === index
                        ? "w-6 h-2 bg-brand-primary"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={currentSlide === index ? "step" : undefined}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          {/* End Main Card Container */}
          {/* Navigation Arrows */}
          {/* Using the correctly defined handlers */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-8 md:-translate-x-12 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white text-brand-dark-alt rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-8 md:translate-x-12 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-brand-primary text-white rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all"
          >
            <FiChevronRight size={28} />
          </button>
          {/* End Navigation Arrows */}
        </div>
        {/* End Testimonial Slider Area */}
      </div>
    </div>
  );
};

export default TestimonialsSection;
