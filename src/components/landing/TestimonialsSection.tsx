// src/components/landing/TestimonialsSection.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// *** Ensure you install Framer Motion: npm install framer-motion ***
import { motion, AnimatePresence } from "framer-motion";

// --- Testimonial Data ---
interface Testimonial {
  id: number;
  name: string;
  text: string;
  color: string; // Tailwind bg color class for placeholder avatar
  initials: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Admiral Canadian",
    text: "Lorem ipsum dolor sit amet consectetur. Non vitae tincidunt facilisi pretium metus et. Nisl convallis turpis eget nullam amet id. Rhoncus massa nulla eget facilisi.",
    color: "bg-amber-500",
    initials: "AC",
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "Absolutely fantastic service and quality! The team went above and beyond. Highly recommended.",
    color: "bg-purple-500",
    initials: "JD",
  },
  {
    id: 3,
    name: "John Smith",
    text: "A truly seamless experience from start to finish. The attention to detail was impeccable.",
    color: "bg-green-500",
    initials: "JS",
  },
  {
    id: 4,
    name: "Maria Garcia",
    text: "I was hesitant at first, but they delivered exactly what was promised. Great communication.",
    color: "bg-red-500",
    initials: "MG",
  },
  {
    id: 5,
    name: "Ken Adams",
    text: "Excellent value and the support team is incredibly responsive. Will definitely use again!",
    color: "bg-blue-500",
    initials: "KA",
  },
];
// --- End Testimonial Data ---

// --- Static Decorative Placeholders ---
// Uses colors/initials from other testimonials for visual variety, doesn't change with slider
const sidePlaceholders = [
  {
    classes:
      "absolute top-5 -left-10 lg:left-0 w-24 h-24 md:w-32 md:h-32 transform -rotate-12 z-10 hidden sm:block",
    color: testimonialsData[1].color,
    initials: testimonialsData[1].initials,
    size: "text-4xl",
  },
  {
    classes:
      "absolute bottom-0 -left-5 lg:left-5 w-16 h-16 md:w-24 md:h-24 transform rotate-12 z-10 hidden sm:block",
    color: testimonialsData[2].color,
    initials: testimonialsData[2].initials,
    size: "text-3xl",
  },
  {
    classes:
      "absolute bottom-10 -right-10 lg:right-0 w-20 h-20 md:w-28 md:h-28 transform rotate-6 z-10 hidden sm:block",
    color: testimonialsData[3].color,
    initials: testimonialsData[3].initials,
    size: "text-4xl",
  },
  {
    classes:
      "absolute top-10 -right-5 lg:right-5 w-20 h-20 md:w-28 md:h-28 transform -rotate-6 z-10 hidden sm:block",
    color: testimonialsData[4].color,
    initials: testimonialsData[4].initials,
    size: "text-4xl",
  },
  // { classes: 'absolute -bottom-8 left-1/3 w-16 h-16 md:w-20 md:h-20 transform rotate-3 z-10 hidden sm:block', color: testimonialsData[0].color, initials: testimonialsData[0].initials, size: 'text-2xl' }, // Optional 5th one
];
// --- End Placeholders ---

// --- Animation Variants for Framer Motion ---
const slideVariants = {
  // Direction comes from 'custom' prop passed to motion.div
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50, // Start off-screen based on direction
    opacity: 0,
  }),
  center: {
    x: 0, // Animate to center
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50, // Exit off-screen based on direction
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

const AUTOPLAY_DELAY = 5000; // Delay in milliseconds (e.g., 5 seconds)

const TestimonialsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to track swipe/button direction for animation: 0 initial, 1 next, -1 prev
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref for autoplay interval

  const activeTestimonial = testimonialsData[currentSlide];
  const totalSlides = testimonialsData.length;

  // --- Autoplay Logic ---
  const startAutoplay = useCallback(() => {
    stopAutoplay(); // Clear existing interval first
    console.log("Starting autoplay");
    intervalRef.current = setInterval(() => {
      console.log("Autoplay tick - moving next");
      setDirection(1); // Autoplay always moves "next"
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);
  }, [totalSlides]); // Recreate if totalSlides changes

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      console.log("Stopping autoplay");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start autoplay on mount and clear on unmount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Cleanup on unmount
  }, [startAutoplay, stopAutoplay]);
  // --- End Autoplay Logic ---

  // --- Navigation Handlers (Updated to reset timer) ---
  const paginate = (newDirection: number) => {
    stopAutoplay(); // Stop timer on manual interaction
    setDirection(newDirection);
    if (newDirection > 0) {
      // Next
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    } else {
      // Prev
      setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    }
    // Restart autoplay after a short delay following manual interaction
    setTimeout(startAutoplay, AUTOPLAY_DELAY * 1.5); // Restart after 1.5x delay
  };

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    stopAutoplay();
    setDirection(index > currentSlide ? 1 : -1); // Set direction
    setCurrentSlide(index);
    setTimeout(startAutoplay, AUTOPLAY_DELAY * 1.5); // Restart timer
  };
  // --- End Navigation Handlers ---

  return (
    <div className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
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
          className="relative max-w-4xl mx-auto"
          // Pause autoplay when mouse is over the slider area
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* --- Surrounding Decorative Placeholders (Static) --- */}
          {sidePlaceholders.map((ph, index) => (
            <div
              key={`side-${index}`}
              aria-hidden="true"
              className={`${ph.classes} ${ph.color} rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold ${ph.size}`}
            >
              {" "}
              {ph.initials}{" "}
            </div>
          ))}

          {/* --- Main Testimonial Card Container --- */}
          <div className="relative pt-16 md:pt-20">
            {/* Main Avatar Placeholder - Animated */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 md:w-36 md:h-36">
              {/* AnimatePresence handles enter/exit animations */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`avatar-${currentSlide}`} // Key change triggers animation
                  className={`w-full h-full rounded-full border-4 border-white shadow-lg ${activeTestimonial.color} flex items-center justify-center text-white font-bold text-4xl md:text-5xl`}
                  variants={avatarVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction} // Pass direction to variants if needed by them
                >
                  {activeTestimonial.initials}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The Card */}
            <div className="relative bg-white rounded-[40px] shadow-xl p-8 pt-20 md:pt-24 lg:pt-28 pb-16 text-center max-w-3xl mx-auto z-10 min-h-[380px] md:min-h-[400px] overflow-hidden">
              {" "}
              {/* Increased bottom padding for dots */}
              {/* Decorative Quote Marks */}
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
              {/* mode="wait" waits for exit before enter */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`content-${currentSlide}`} // Key change triggers animation
                  className="relative z-10"
                  variants={slideVariants} // Use defined slide variants
                  custom={direction} // Pass direction to variants
                  initial="enter" // Initial state for entering element
                  animate="center" // Animation target state
                  exit="exit" // Animation state for exiting element
                  aria-live="polite" // Announce changes to screen readers
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-dark-alt mb-4">
                    {activeTestimonial.name}
                  </h3>
                  <p className="text-base md:text-lg text-brand-gray-dark leading-relaxed mb-8 min-h-[96px] md:min-h-[72px]">
                    {activeTestimonial.text}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Pagination Indicator - Positioned absolute at bottom */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-2 h-3 z-10">
                {testimonialsData.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => handleDotClick(index)} // Use specific handler
                    className={`transition-all duration-300 ease-in-out rounded-full ${
                      currentSlide === index
                        ? "w-8 h-1.5 bg-brand-primary"
                        : "w-3 h-3 bg-brand-primary opacity-30 hover:opacity-60"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={currentSlide === index ? "step" : undefined}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          {/* --- End Main Card Container --- */}

          {/* --- Navigation Arrows --- */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous Testimonial"
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-brand-primary text-white rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
          >
            {" "}
            <FiChevronLeft size={28} />{" "}
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next Testimonial"
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-brand-primary text-white rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
          >
            {" "}
            <FiChevronRight size={28} />{" "}
          </button>
          {/* --- End Navigation Arrows --- */}
        </div>
        {/* End Testimonial Slider Area */}
      </div>
    </div>
  );
};

export default TestimonialsSection;
