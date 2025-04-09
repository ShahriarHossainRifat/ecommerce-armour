// src/components/landing/CategoriesSection.tsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  linkQuery: string;
  imageUrl: string;
  gradient: string;
}

// Example data (ensure this matches your needs)
const categoriesData: Category[] = [
  {
    id: 1,
    name: "Casual Wear",
    linkQuery: "tag=Casual Wear",
    imageUrl: "https://via.placeholder.com/262x361/a8b5c6/46525e?text=Casual",
    gradient: "from-[#A8B5C6] to-[#46525E]",
  },
  {
    id: 2,
    name: "Hoodies & Sweaters",
    linkQuery: "subCategory=Hoodies",
    imageUrl: "https://via.placeholder.com/262x361/b8a8c6/5e4652?text=Hoodie",
    gradient: "from-[#b8a8c6] to-[#5e4652]",
  },
  {
    id: 3,
    name: "Activewear",
    linkQuery: "tag=Activewear",
    imageUrl: "https://via.placeholder.com/262x361/a8c6b5/465e52?text=Active",
    gradient: "from-[#a8c6b5] to-[#465e52]",
  },
  {
    id: 4,
    name: "Jackets & Vests",
    linkQuery: "subCategory=Jackets",
    imageUrl: "https://via.placeholder.com/262x361/c6b5a8/5e5246?text=Jacket",
    gradient: "from-[#c6b5a8] to-[#5e5246]",
  },
  {
    id: 5,
    name: "Shoes",
    linkQuery: "category=Shoes",
    imageUrl: "https://via.placeholder.com/262x361/a8b5c6/46525e?text=Shoes",
    gradient: "from-[#A8B5C6] to-[#46525E]",
  },
  {
    id: 6,
    name: "Accessories",
    linkQuery: "category=Accessories",
    imageUrl:
      "https://via.placeholder.com/262x361/b8a8c6/5e4652?text=Accessorize",
    gradient: "from-[#b8a8c6] to-[#5e4652]",
  },
];

const CategoriesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container

  // Scroll Functionality
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8; // Scroll by 80% of visible width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  // Define base button styles for consistency & better hover/focus
  const arrowButtonBaseStyles =
    "flex items-center justify-center bg-white shadow-md rounded-lg border border-transparent hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 transition-all duration-200 ease-in-out group"; // Added group for potential icon hover
  const arrowIconStyles =
    "text-brand-primary group-hover:scale-110 transition-transform"; // Icon color + hover effect

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header with Title and Navigation */}
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt">
          Shop by Categories
        </h2>
        {/* Desktop Navigation Arrows - UPDATED STYLES */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Category"
            className={`${arrowButtonBaseStyles} w-[55px] h-[57px]`} // Use base + size
          >
            <FiChevronLeft size={26} className={arrowIconStyles} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next Category"
            className={`${arrowButtonBaseStyles} w-[55px] h-[57px]`} // Use base + size
          >
            <FiChevronRight size={26} className={arrowIconStyles} />
          </button>
        </div>
      </div>

      {/* Category Cards - Scrollable Container */}
      {/* Added ref and scrollbar-hide (requires tailwind-scrollbar-hide plugin or custom CSS) */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {categoriesData.map((category) => (
          <Link
            key={category.id}
            to={`/products?${category.linkQuery.replace(/\s+/g, "%20")}`} // URL encode spaces
            className="flex-shrink-0 w-[262px] h-[361px] relative group rounded-2xl overflow-hidden block transition-transform duration-200 ease-in-out hover:-translate-y-1"
            title={`Shop ${category.name}`}
          >
            {/* Background Gradient & Image */}
            <div
              className={`absolute inset-0 bg-gradient-radial ${category.gradient}`}
            ></div>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-contain mix-blend-overlay group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ objectPosition: "bottom center" }}
            />
            {/* Text Button Overlay */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] max-w-[219px] bg-white text-black text-center text-lg h-[49px] rounded-lg shadow-md opacity-90 group-hover:opacity-100 transition-all duration-200 ease-in-out flex items-center justify-center font-medium group-hover:shadow-lg">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
      {/* Mobile Navigation Arrows - UPDATED STYLES */}
      <div className="md:hidden flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous Category"
          className={`${arrowButtonBaseStyles} w-12 h-12`} // Use base + size
        >
          <FiChevronLeft size={24} className={arrowIconStyles} />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next Category"
          className={`${arrowButtonBaseStyles} w-12 h-12`} // Use base + size
        >
          <FiChevronRight size={24} className={arrowIconStyles} />
        </button>
      </div>
    </div>
  );
};

// Add this plugin to your tailwind.config.js if you haven't already:
// npm install --save-dev tailwind-scrollbar-hide
// plugins: [ require('tailwind-scrollbar-hide') ]

// Or add manually to src/index.css:
/*
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
*/

// Reminder: Add bg-gradient-radial utility if needed in tailwind.config.js
// plugins: [ function ({ addUtilities }) { addUtilities({ '.bg-gradient-radial': { 'background-image': 'radial-gradient(71.45% 50% at 50% 50%, var(--tw-gradient-stops))' } }) }, ],

export default CategoriesSection;
